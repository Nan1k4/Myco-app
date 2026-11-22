/**
 * @file Magazyn prognoz: pozycja urządzenia, miejsce sprawdzane bez zapisywania i zapisane miejsca,
 * każde z ostatnią pobraną pogodą.
 * @module features/predictor/store/forecastStore
 */
import { manualLocation, type SettledLocationState } from '../../../api/locationService';
import type { WeatherFetchResult } from '../../../api/weatherService';
import {
  MAX_PLACE_NAME_LENGTH,
  MAX_SAVED_PLACES,
  savedPlaceId,
  toIsoDateTime,
  type GeoCoordinates,
  type LocationState,
  type NamedPlace,
  type ResolvedLocation,
  type SavedPlace,
  type SavedPlaceId,
} from '../../../domain';
import {
  CUSTOM_KEY,
  DEVICE_KEY,
  STORAGE_KEY,
  decodeStoredState,
  encodeStoredState,
  type KeyValueStorage,
  type StoredForecast,
} from './persistence';

export { CUSTOM_KEY, DEVICE_KEY };

export type ForecastKey = typeof DEVICE_KEY | typeof CUSTOM_KEY | SavedPlaceId;

export type FetchStatus =
  | { readonly kind: 'idle' }
  | { readonly kind: 'loading' }
  | { readonly kind: 'error'; readonly message: string };

export interface ForecastEntry {
  readonly stored: StoredForecast | null;
  readonly status: FetchStatus;
}

export interface ForecastState {
  readonly hydrated: boolean;
  readonly places: readonly SavedPlace[];
  readonly customPlace: NamedPlace | null;
  readonly entries: Readonly<Record<string, ForecastEntry>>;
  readonly deviceLocation: LocationState;
}

export type AddPlaceResult =
  | { readonly ok: true; readonly id: SavedPlaceId }
  | { readonly ok: false; readonly reason: 'empty_name' | 'name_too_long' | 'duplicate_name' | 'limit' }
  | { readonly ok: false; readonly reason: 'duplicate'; readonly existing: SavedPlace };

export interface ForecastStoreDeps {
  readonly storage: KeyValueStorage;
  readonly fetchWeather: (coords: GeoCoordinates) => Promise<WeatherFetchResult>;
  readonly resolveDeviceLocation: () => Promise<SettledLocationState>;
  readonly now: () => Date;
  readonly newId: () => string;
  readonly onPersistError?: (error: unknown) => void;
}

export interface ForecastStore {
  readonly refreshAll: () => Promise<void>;
  readonly getState: () => ForecastState;
  readonly subscribe: (listener: () => void) => () => void;
  readonly hydrate: () => Promise<void>;
  readonly checkPlace: (place: NamedPlace) => void;
  readonly clearCustomPlace: () => void;
  readonly addPlace: (place: NamedPlace, name: string) => AddPlaceResult;
  readonly removePlace: (id: SavedPlaceId) => void;
  readonly refresh: (key: ForecastKey) => Promise<void>;
  readonly refreshStale: (maxAgeMs: number) => Promise<void>;
}

const INITIAL_STATE: ForecastState = {
  hydrated: false,
  places: [],
  customPlace: null,
  entries: {},
  deviceLocation: { status: 'idle' },
};

const IDLE: FetchStatus = { kind: 'idle' };
const LOADING_ENTRY: ForecastEntry = { stored: null, status: { kind: 'loading' } };

const WEATHER_CELL_DECIMALS = 2;

export function sameWeatherCell(a: GeoCoordinates, b: GeoCoordinates): boolean {
  const round = (value: number) => Math.round(value * 10 ** WEATHER_CELL_DECIMALS);
  return round(a.latitude) === round(b.latitude) && round(a.longitude) === round(b.longitude);
}

export function createForecastStore(deps: ForecastStoreDeps): ForecastStore {
  let state = INITIAL_STATE;
  const listeners = new Set<() => void>();
  const inFlight = new Set<string>();
  let hydration: Promise<void> | null = null;
  let writeChain: Promise<void> = Promise.resolve();
  let staleRunActive = false;
  let customGeneration = 0;
  let customPlaceDirty = false;
  let pendingPersist = false;
  const removedPlaceIds = new Set<SavedPlaceId>();

  const setState = (update: (current: ForecastState) => ForecastState) => {
    state = update(state);
    listeners.forEach((listener) => listener());
  };

  const findPlace = (key: string): SavedPlace | undefined => state.places.find((p) => p.id === key);
  const keyExists = (key: string): boolean =>
    key === DEVICE_KEY || (key === CUSTOM_KEY ? state.customPlace !== null : findPlace(key) !== undefined);

  const withoutEntry = (entries: ForecastState['entries'], key: string) => {
    const { [key]: _removed, ...rest } = entries;
    return rest;
  };

  const setStatus = (key: string, status: FetchStatus) => {
    setState((s) => ({ ...s, entries: { ...s.entries, [key]: { stored: s.entries[key]?.stored ?? null, status } } }));
  };

  const persist = () => {
    if (!state.hydrated) {
      pendingPersist = true;
      void hydrate();
      return;
    }
    const forecasts: Record<string, StoredForecast> = {};
    for (const [key, entry] of Object.entries(state.entries)) {
      if (entry.stored) forecasts[key] = entry.stored;
    }
    const payload = encodeStoredState({ places: state.places, customPlace: state.customPlace, forecasts });
    writeChain = writeChain
      .then(() => deps.storage.setItem(STORAGE_KEY, payload))
      .catch((error: unknown) => deps.onPersistError?.(error));
  };

  const hydrate = (): Promise<void> => {
    hydration ??= (async () => {
      let raw: string | null = null;
      try {
        raw = await deps.storage.getItem(STORAGE_KEY);
      } catch (error) {
        deps.onPersistError?.(error);
      }
      const stored = decodeStoredState(raw);
      setState((s) => {
        const survivingStored = stored.places.filter((p) => !removedPlaceIds.has(p.id));
        const survivingIds = new Set(survivingStored.map((p) => p.id));
        const preAdded = s.places.filter((p) => !removedPlaceIds.has(p.id) && !survivingIds.has(p.id));
        const places = [...survivingStored, ...preAdded].slice(0, MAX_SAVED_PLACES);
        const customPlace = customPlaceDirty ? s.customPlace : stored.customPlace;

        const validKeys = new Set<string>([DEVICE_KEY, ...places.map((p) => p.id)]);
        if (customPlace) validKeys.add(CUSTOM_KEY);

        const entries: Record<string, ForecastEntry> = {};
        for (const [key, forecast] of Object.entries(stored.forecasts)) {
          if (!validKeys.has(key)) continue;
          if (key === CUSTOM_KEY && customPlaceDirty) continue;
          entries[key] = { stored: forecast, status: IDLE };
        }
        if (customPlaceDirty && customPlace && s.entries[CUSTOM_KEY]) {
          entries[CUSTOM_KEY] = s.entries[CUSTOM_KEY];
        }
        for (const place of preAdded) {
          const entry = s.entries[place.id];
          if (entry && validKeys.has(place.id)) entries[place.id] = entry;
        }

        return { ...s, hydrated: true, places, customPlace, entries };
      });
      removedPlaceIds.clear();
      if (pendingPersist) {
        pendingPersist = false;
        persist();
      }
    })();
    return hydration;
  };

  const resolveTarget = async (key: string): Promise<ResolvedLocation | { readonly error: string }> => {
    if (key === CUSTOM_KEY) {
      return state.customPlace ? manualLocation(state.customPlace, deps.now()) : { error: 'Nie wybrano miejsca.' };
    }
    if (key !== DEVICE_KEY) {
      const place = findPlace(key);
      return place ? manualLocation(place, deps.now()) : { error: 'Miejsce zostało usunięte.' };
    }
    setState((s) => ({ ...s, deviceLocation: { status: 'requesting' } }));
    const settled = await deps.resolveDeviceLocation();
    setState((s) => ({ ...s, deviceLocation: settled }));
    switch (settled.status) {
      case 'resolved':
        return settled;
      case 'permission_denied':
        return { error: 'Brak dostępu do lokalizacji.' };
      case 'error':
        return { error: settled.message };
    }
  };

  const refresh = async (key: ForecastKey): Promise<void> => {
    await hydrate();
    if (!keyExists(key)) return;
    const generation = customGeneration;
    const flightKey = key === CUSTOM_KEY ? `${CUSTOM_KEY}#${generation}` : key;
    if (inFlight.has(flightKey)) return;
    const isCurrent = () => keyExists(key) && (key !== CUSTOM_KEY || generation === customGeneration);

    inFlight.add(flightKey);
    setStatus(key, { kind: 'loading' });
    try {
      const target = await resolveTarget(key);
      if (!isCurrent()) return;
      if ('error' in target) {
        setStatus(key, { kind: 'error', message: target.error });
        return;
      }
      const result = await deps.fetchWeather(target.coords);
      if (!isCurrent()) return;
      if (!result.ok) {
        setStatus(key, { kind: 'error', message: result.message });
        return;
      }
      setState((s) => ({
        ...s,
        entries: { ...s.entries, [key]: { stored: { location: target, snapshot: result.data }, status: IDLE } },
      }));
      persist();
    } catch (error) {
      if (isCurrent()) setStatus(key, { kind: 'error', message: `Błąd wewnętrzny: ${String(error)}` });
    } finally {
      inFlight.delete(flightKey);
    }
  };

  const nonDeviceKeys = (): ForecastKey[] => {
    const keys: ForecastKey[] = state.places.map((place) => place.id);
    if (state.customPlace) keys.unshift(CUSTOM_KEY);
    return keys;
  };

  const refreshStale = async (maxAgeMs: number): Promise<void> => {
    if (staleRunActive) return;
    staleRunActive = true;
    try {
      await hydrate();
      const nowMs = deps.now().getTime();
      const isStale = (key: string) => {
        const fetchedAt = state.entries[key]?.stored?.snapshot.fetchedAt;
        return fetchedAt === undefined || nowMs - Date.parse(fetchedAt) > maxAgeMs;
      };
      for (const key of nonDeviceKeys().filter(isStale)) {
        if (isStale(key)) await refresh(key);
      }
    } finally {
      staleRunActive = false;
    }
  };

  const refreshAll = async (): Promise<void> => {
    await hydrate();
    const keys: readonly ForecastKey[] = [DEVICE_KEY, ...nonDeviceKeys()];
    for (const key of keys) {
      await refresh(key);
    }
  };

  const checkPlace = (place: NamedPlace) => {
    customGeneration += 1;
    if (!state.hydrated) customPlaceDirty = true;
    setState((s) => ({ ...s, customPlace: place, entries: { ...s.entries, [CUSTOM_KEY]: LOADING_ENTRY } }));
    persist();
    void refresh(CUSTOM_KEY);
  };

  const clearCustomPlace = () => {
    customGeneration += 1;
    if (!state.hydrated) customPlaceDirty = true;
    setState((s) => ({ ...s, customPlace: null, entries: withoutEntry(s.entries, CUSTOM_KEY) }));
    persist();
  };

  const addPlace = (place: NamedPlace, rawName: string): AddPlaceResult => {
    const name = rawName.trim();
    if (name === '') return { ok: false, reason: 'empty_name' };
    if (name.length > MAX_PLACE_NAME_LENGTH) return { ok: false, reason: 'name_too_long' };
    const normalizedName = name.toLocaleLowerCase('pl');
    if (state.places.some((p) => p.name.trim().toLocaleLowerCase('pl') === normalizedName)) {
      return { ok: false, reason: 'duplicate_name' };
    }
    const existing = state.places.find((p) => sameWeatherCell(p.coords, place.coords));
    if (existing) return { ok: false, reason: 'duplicate', existing };
    if (state.places.length >= MAX_SAVED_PLACES) return { ok: false, reason: 'limit' };

    const id = savedPlaceId(deps.newId());
    const saved: SavedPlace = { id, name, detail: place.detail, coords: place.coords, createdAt: toIsoDateTime(deps.now()) };

    const fromCustom = state.customPlace !== null && sameWeatherCell(state.customPlace.coords, place.coords);
    const reusable = fromCustom ? state.entries[CUSTOM_KEY]?.stored : undefined;
    if (fromCustom) {
      customGeneration += 1;
      if (!state.hydrated) customPlaceDirty = true;
    }

    setState((s) => {
      const entries: Record<string, ForecastEntry> = fromCustom ? withoutEntry(s.entries, CUSTOM_KEY) : { ...s.entries };
      entries[id] = reusable
        ? { stored: { location: manualLocation(saved, deps.now()), snapshot: reusable.snapshot }, status: IDLE }
        : LOADING_ENTRY;
      return { ...s, places: [...s.places, saved], customPlace: fromCustom ? null : s.customPlace, entries };
    });
    persist();
    if (!reusable) void refresh(id);
    return { ok: true, id };
  };

  const removePlace = (id: SavedPlaceId) => {
    if (!state.hydrated) {
      removedPlaceIds.add(id);
      setState((s) => ({ ...s, places: s.places.filter((p) => p.id !== id), entries: withoutEntry(s.entries, id) }));
      persist();
      return;
    }
    if (!findPlace(id)) return;
    setState((s) => ({ ...s, places: s.places.filter((p) => p.id !== id), entries: withoutEntry(s.entries, id) }));
    persist();
  };

  return {
    getState: () => state,
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    hydrate,
    checkPlace,
    clearCustomPlace,
    addPlace,
    removePlace,
    refresh,
    refreshStale,
    refreshAll
  };
}
