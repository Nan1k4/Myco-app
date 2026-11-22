/**
 * @file Pobieranie danych pogodowych z Open-Meteo. Nigdy nie rzuca dla błędów I/O –
 * zwraca wynik z {@link WeatherErrorKind}; store decyduje o fallbacku na cache.
 * @module api/weatherService
 */
import { isValidCoordinates, type GeoCoordinates, type WeatherErrorKind, type WeatherSnapshot } from '../domain';
import { fetchJson } from './http';
import { OPEN_METEO_MAX_PAST_DAYS, buildForecastUrl, extractErrorReason, parseForecastResponse } from './openMeteo';

/** Domyślne okno historii. Predyktor może zażądać więcej – patrz `requiredHistoryDays`. */
export const DEFAULT_HISTORY_DAYS = 10;

const DEFAULT_TIMEOUT_MS = 15_000;

/**
 * Precyzja współrzędnych wysyłanych do API: 2 miejsca ≈ 1,1 km.
 * Siatki modeli mają ≥ 1–2 km, więc bez straty jakości; zysk: prywatność
 * (nie wysyłamy dokładnej pozycji ulubionego stanowiska) i stabilny klucz cache.
 */
const COORDINATE_DECIMALS = 2;

/** Domyślny próg „nieświeżych” danych dla `WeatherState.isStale`. */
export const WEATHER_STALE_AFTER_MS = 6 * 60 * 60 * 1000;

export type WeatherFetchResult =
  | { readonly ok: true; readonly data: WeatherSnapshot }
  | { readonly ok: false; readonly kind: WeatherErrorKind; readonly message: string };

export interface FetchWeatherOptions {
  /** Liczba pełnych dni historii, 1–92. */
  readonly pastDays?: number;
  readonly timeoutMs?: number;
  /** Wstrzykiwany zegar i `fetch` – deterministyczne testy. */
  readonly now?: () => Date;
  readonly fetchFn?: typeof fetch;
}

/**
 * Pobiera dzienną historię pogody dla lokalizacji.
 * @throws {RangeError} wyłącznie przy błędzie programisty (niepoprawne współrzędne / `pastDays`).
 */
export async function fetchWeatherSnapshot(
  coords: GeoCoordinates,
  options: FetchWeatherOptions = {},
): Promise<WeatherFetchResult> {
  const {
    pastDays = DEFAULT_HISTORY_DAYS,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    now = () => new Date(),
    fetchFn = fetch,
  } = options;

  if (!isValidCoordinates(coords)) {
    throw new RangeError(`Invalid coordinates: ${coords.latitude}, ${coords.longitude}`);
  }
  if (!Number.isInteger(pastDays) || pastDays < 1 || pastDays > OPEN_METEO_MAX_PAST_DAYS) {
    throw new RangeError(`pastDays must be an integer in [1, ${OPEN_METEO_MAX_PAST_DAYS}], got ${pastDays}`);
  }

  const requestCoords = roundCoordinates(coords);
  const response = await fetchJson(buildForecastUrl(requestCoords, pastDays), {
    timeoutMs,
    fetchFn,
    serviceLabel: 'Serwer pogody',
    extractErrorReason,
  });
  if (!response.ok) return response;

  const parsed = parseForecastResponse(response.body, { coords: requestCoords, fetchedAt: now() });
  return parsed.ok
    ? { ok: true, data: parsed.value }
    : { ok: false, kind: 'invalid_response', message: `Nieprawidłowe dane pogodowe: ${parsed.error}.` };
}

/** Czy zrzut jest starszy niż próg (dla `WeatherState.success.isStale`). */
export function isSnapshotStale(snapshot: WeatherSnapshot, now: Date, maxAgeMs = WEATHER_STALE_AFTER_MS): boolean {
  const fetchedAtMs = Date.parse(snapshot.fetchedAt);
  return !Number.isFinite(fetchedAtMs) || now.getTime() - fetchedAtMs > maxAgeMs;
}

function roundCoordinates({ latitude, longitude }: GeoCoordinates): GeoCoordinates {
  const factor = 10 ** COORDINATE_DECIMALS;
  return { latitude: Math.round(latitude * factor) / factor, longitude: Math.round(longitude * factor) / factor };
}
