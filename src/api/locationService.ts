/**
 * @file Ustalanie pozycji przez `expo-location`. Nigdy nie rzuca – zwraca końcowy
 * {@link LocationState}. Kolejność: GPS (z timeoutem) → ostatnia znana pozycja → błąd
 * z jasnym komunikatem (UI proponuje wybór ręczny).
 * @module api/locationService
 */
import * as Location from 'expo-location';
import {
  isValidCoordinates,
  toIsoDateTime,
  type GeoCoordinates,
  type LocationSource,
  type LocationState,
  type NamedPlace,
  type ResolvedLocation,
} from '../domain';

/** Stan po zakończeniu próby (bez `idle`/`requesting`, które ustawia store). */
export type SettledLocationState = Exclude<LocationState, { readonly status: 'idle' | 'requesting' }>;

export interface ResolveLocationOptions {
  /** `expo-location` nie ma timeoutu – pod koroną drzew fix GPS może nie przyjść nigdy. */
  readonly timeoutMs?: number;
  /** Maks. wiek ostatniej znanej pozycji. Dla pogody (siatka km) godzina jest w pełni akceptowalna. */
  readonly lastKnownMaxAgeMs?: number;
  /** Maks. niedokładność ostatniej znanej pozycji (m). */
  readonly lastKnownMaxAccuracyM?: number;
}

const DEFAULTS = {
  timeoutMs: 20_000,
  lastKnownMaxAgeMs: 60 * 60 * 1000,
  lastKnownMaxAccuracyM: 5_000,
} as const satisfies Required<ResolveLocationOptions>;

const TIMEOUT = Symbol('timeout');

type FixOutcome =
  | { readonly kind: 'fix'; readonly location: Location.LocationObject }
  | { readonly kind: 'timeout' }
  | { readonly kind: 'services_disabled' }
  | { readonly kind: 'error'; readonly message: string };

/** Uprawnienia → pozycja bieżąca → fallback. */
export async function resolveLocation(options: ResolveLocationOptions = {}): Promise<SettledLocationState> {
  const config = { ...DEFAULTS, ...options };

  const denied = await ensureForegroundPermission();
  if (denied) return denied;

  const outcome = await requestCurrentFix(config.timeoutMs);
  if (outcome.kind === 'fix') {
    const resolved = toResolved(outcome.location, 'gps');
    if (resolved) return resolved;
  }

  const lastKnown = await readLastKnown(config.lastKnownMaxAgeMs, config.lastKnownMaxAccuracyM);
  if (lastKnown) return lastKnown;

  return { status: 'error', message: describeFailure(outcome) };
}

/**
 * Pozycja wybrana ręcznie (wyszukane miejsce albo wpisane współrzędne).
 * Nie wymaga uprawnień ani GPS – planowanie wyjścia z domu.
 * @throws {RangeError} gdy współrzędne łamią niezmiennik {@link GeoCoordinates}.
 */
export function manualLocation(place: NamedPlace, now: Date = new Date()): ResolvedLocation {
  const { coords, name, detail } = place;
  if (!isValidCoordinates(coords)) {
    throw new RangeError(`Invalid coordinates: ${coords.latitude}, ${coords.longitude}`);
  }
  return { status: 'resolved', coords, accuracyM: null, source: 'manual', label: detail ? `${name} (${detail})` : name, timestamp: toIsoDateTime(now) };
}

/* -------------------------------- Kroki ----------------------------------- */

/** `null` = uprawnienie przyznane. Pozycja przybliżona (Android 12+) wystarcza – nie żądamy dokładnej. */
async function ensureForegroundPermission(): Promise<SettledLocationState | null> {
  try {
    const current = await Location.getForegroundPermissionsAsync();
    if (current.granted) return null;
    if (!current.canAskAgain) return { status: 'permission_denied', canAskAgain: false };

    const requested = await Location.requestForegroundPermissionsAsync();
    return requested.granted ? null : { status: 'permission_denied', canAskAgain: requested.canAskAgain };
  } catch (error) {
    return { status: 'error', message: `Nie udało się sprawdzić uprawnień lokalizacji (${describe(error)}).` };
  }
}

async function requestCurrentFix(timeoutMs: number): Promise<FixOutcome> {
  try {
    if (!(await Location.hasServicesEnabledAsync())) return { kind: 'services_disabled' };

    // Balanced (~100 m, fused provider) – szybciej i taniej niż High; pogoda nie potrzebuje więcej.
    // Uwaga: przegrany `race` nie anuluje natywnego żądania – kończy się ono samo w tle.
    const result = await withTimeout(Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }), timeoutMs);
    return result === TIMEOUT ? { kind: 'timeout' } : { kind: 'fix', location: result };
  } catch (error) {
    return { kind: 'error', message: describe(error) };
  }
}

async function readLastKnown(maxAge: number, requiredAccuracy: number): Promise<ResolvedLocation | null> {
  try {
    const location = await Location.getLastKnownPositionAsync({ maxAge, requiredAccuracy });
    return location ? toResolved(location, 'last_known') : null;
  } catch {
    return null; // fallback – jego porażka nie zmienia diagnozy pierwotnego błędu
  }
}

/* ------------------------------- Mapowanie -------------------------------- */

function toResolved(location: Location.LocationObject, source: LocationSource): ResolvedLocation | null {
  const coords: GeoCoordinates = { latitude: location.coords.latitude, longitude: location.coords.longitude };
  const timestamp = new Date(location.timestamp);
  if (!isValidCoordinates(coords) || Number.isNaN(timestamp.getTime())) return null;

  const { accuracy } = location.coords;
  return {
    status: 'resolved',
    coords,
    accuracyM: typeof accuracy === 'number' && Number.isFinite(accuracy) ? accuracy : null,
    source,
    label: null,
    timestamp: toIsoDateTime(timestamp),
  };
}

function describeFailure(outcome: FixOutcome): string {
  switch (outcome.kind) {
    case 'services_disabled':
      return 'Usługi lokalizacji są wyłączone. Włącz lokalizację lub wybierz miejsce ręcznie.';
    case 'timeout':
      return 'Brak sygnału GPS. Wyjdź na otwartą przestrzeń lub wybierz miejsce ręcznie.';
    case 'error':
      return `Nie udało się ustalić lokalizacji (${outcome.message}).`;
    case 'fix':
      return 'Urządzenie zwróciło nieprawidłowe współrzędne.';
  }
}

/* -------------------------------- Narzędzia ------------------------------- */

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | typeof TIMEOUT> {
  void promise.catch(() => undefined);
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<typeof TIMEOUT>((resolve) => {
    timer = setTimeout(() => resolve(TIMEOUT), ms);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
