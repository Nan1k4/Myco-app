import {
  savedPlaceId,
  toIsoDateTime,
  toNonEmptyArray,
  type DailyWeather,
  type GeoCoordinates,
  type NamedPlace,
  type SavedPlace,
  type WeatherSnapshot,
} from '../../../domain';
import { CUSTOM_KEY, DEVICE_KEY, createForecastStore, type ForecastStoreDeps } from '../store/forecastStore';
import { encodeStoredState, type KeyValueStorage } from '../store/persistence';

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const COORDS_A: GeoCoordinates = { latitude: 52.23, longitude: 21.01 };
const COORDS_B: GeoCoordinates = { latitude: 50.06, longitude: 19.94 };
const COORDS_C: GeoCoordinates = { latitude: 54.35, longitude: 18.65 };

function makeSnapshot(coords: GeoCoordinates, fetchedAt: string): WeatherSnapshot {
  const days = toNonEmptyArray<DailyWeather>([
    {
      date: '2026-10-01',
      precipitationMm: 10,
      tempMinC: 8,
      tempMaxC: 16,
      tempMeanC: 12,
      soilMoisture: 0.3,
    },
  ]);
  if (!days) throw new Error('Expected non-empty days');
  return { coords, timezone: 'Europe/Warsaw', days, fetchedAt: toIsoDateTime(new Date(fetchedAt)) };
}

function makeSavedPlace(id: string, name: string, coords: GeoCoordinates): SavedPlace {
  return {
    id: savedPlaceId(id),
    name,
    detail: null,
    coords,
    createdAt: toIsoDateTime(new Date('2026-10-01T10:00:00.000Z')),
  };
}

describe('forecastStore', () => {
  it('checkPlace wywołany podczas trwającej hydracji nie nadpisuje zapisanych miejsc ani nie traci customPlace', async () => {
    const existingPlace = makeSavedPlace('place-1', 'Puszcza', COORDS_A);
    const oldCustom: NamedPlace = { name: 'Stare', detail: null, coords: COORDS_B };
    const newCustom: NamedPlace = { name: 'Nowe', detail: null, coords: COORDS_C };

    const getItemGate = deferred<string | null>();
    let persistedPayload: string | null = encodeStoredState({
      places: [existingPlace],
      customPlace: oldCustom,
      forecasts: {
        [existingPlace.id]: {
          location: {
            status: 'resolved',
            coords: COORDS_A,
            accuracyM: null,
            source: 'manual',
            label: 'Puszcza',
            timestamp: toIsoDateTime(new Date('2026-10-01T10:00:00.000Z')),
          },
          snapshot: makeSnapshot(COORDS_A, '2026-10-01T10:00:00.000Z'),
        },
      },
    });

    const setItemCalls: string[] = [];
    const storage: KeyValueStorage = {
      getItem: () => getItemGate.promise,
      setItem: async (_key, value) => {
        setItemCalls.push(value);
        persistedPayload = value;
      },
    };

    const now = new Date('2026-10-02T12:00:00.000Z');
    const deps: ForecastStoreDeps = {
      storage,
      fetchWeather: async (coords) => ({ ok: true, data: makeSnapshot(coords, now.toISOString()) }),
      resolveDeviceLocation: async () => ({
        status: 'resolved',
        coords: COORDS_A,
        accuracyM: 20,
        source: 'gps',
        label: null,
        timestamp: toIsoDateTime(now),
      }),
      now: () => now,
      newId: () => 'new-1',
    };

    const store = createForecastStore(deps);
    const hydratePromise = store.hydrate();

    // Mutacja przed zakończeniem getItem
    store.checkPlace(newCustom);
    expect(setItemCalls).toHaveLength(0);

    getItemGate.resolve(persistedPayload);
    await hydratePromise;
    await new Promise((r) => setTimeout(r, 0));

    const state = store.getState();
    expect(state.hydrated).toBe(true);
    expect(state.places).toEqual([existingPlace]);
    expect(state.customPlace).toEqual(newCustom);
    expect(state.entries[existingPlace.id]?.stored).toBeDefined();
    expect(state.entries[CUSTOM_KEY]?.stored?.snapshot.coords).toEqual(COORDS_C);
    expect(setItemCalls.length).toBeGreaterThan(0);
    expect(persistedPayload).toContain('Puszcza');
    expect(persistedPayload).toContain('Nowe');
  });

  it('clearCustomPlace, addPlace i removePlace przed hydracją scalają się bez utraty danych', async () => {
    const place1 = makeSavedPlace('place-1', 'Las 1', COORDS_A);
    const place2 = makeSavedPlace('place-2', 'Las 2', COORDS_B);
    const oldCustom: NamedPlace = { name: 'Tymczasowe', detail: null, coords: COORDS_C };

    const getItemGate = deferred<string | null>();
    let persistedPayload: string | null = encodeStoredState({
      places: [place1, place2],
      customPlace: oldCustom,
      forecasts: {},
    });

    const storage: KeyValueStorage = {
      getItem: () => getItemGate.promise,
      setItem: async (_key, value) => {
        persistedPayload = value;
      },
    };

    const now = new Date('2026-10-02T12:00:00.000Z');
    const store = createForecastStore({
      storage,
      fetchWeather: async (coords) => ({ ok: true, data: makeSnapshot(coords, now.toISOString()) }),
      resolveDeviceLocation: async () => ({ status: 'error', message: 'brak gps' }),
      now: () => now,
      newId: () => 'place-3',
    });

    const hydratePromise = store.hydrate();
    store.clearCustomPlace();
    store.removePlace(place1.id);
    const added = store.addPlace({ name: 'Las 3', detail: null, coords: { latitude: 53.1, longitude: 17.5 } }, 'Las 3');
    expect(added).toEqual({ ok: true, id: savedPlaceId('place-3') });

    getItemGate.resolve(persistedPayload);
    await hydratePromise;
    await new Promise((r) => setTimeout(r, 0));

    const state = store.getState();
    expect(state.customPlace).toBeNull();
    expect(state.places.map((p) => p.id)).toEqual([place2.id, savedPlaceId('place-3')]);
    expect(persistedPayload).toContain('Las 2');
    expect(persistedPayload).toContain('Las 3');
    expect(persistedPayload).not.toContain('Las 1');
  });

  it('refreshAll nie jest blokowany przez trwający refreshStale i deduplikuje inFlight', async () => {
    const place1 = makeSavedPlace('place-1', 'Las 1', COORDS_A);
    const place2 = makeSavedPlace('place-2', 'Las 2', COORDS_B);
    const staleAt = '2026-10-01T00:00:00.000Z';
    const freshAt = '2026-10-02T11:30:00.000Z';
    const now = new Date('2026-10-02T12:00:00.000Z');

    const stored = encodeStoredState({
      places: [place1, place2],
      customPlace: null,
      forecasts: {
        [place1.id]: {
          location: {
            status: 'resolved',
            coords: COORDS_A,
            accuracyM: null,
            source: 'manual',
            label: 'Las 1',
            timestamp: toIsoDateTime(new Date(staleAt)),
          },
          snapshot: makeSnapshot(COORDS_A, staleAt),
        },
        [place2.id]: {
          location: {
            status: 'resolved',
            coords: COORDS_B,
            accuracyM: null,
            source: 'manual',
            label: 'Las 2',
            timestamp: toIsoDateTime(new Date(freshAt)),
          },
          snapshot: makeSnapshot(COORDS_B, freshAt),
        },
      },
    });

    const place1Gate = deferred<WeatherSnapshot>();
    const fetchedCoords: GeoCoordinates[] = [];
    let deviceResolvedCount = 0;

    const store = createForecastStore({
      storage: {
        getItem: async () => stored,
        setItem: async () => undefined,
      },
      fetchWeather: async (coords) => {
        fetchedCoords.push(coords);
        if (coords.latitude === COORDS_A.latitude) {
          return { ok: true, data: await place1Gate.promise };
        }
        return { ok: true, data: makeSnapshot(coords, now.toISOString()) };
      },
      resolveDeviceLocation: async () => {
        deviceResolvedCount += 1;
        return {
          status: 'resolved',
          coords: COORDS_C,
          accuracyM: 15,
          source: 'gps',
          label: null,
          timestamp: toIsoDateTime(now),
        };
      },
      now: () => now,
      newId: () => 'unused',
    });

    await store.hydrate();

    // Uruchamiamy refreshStale — zatrzymuje się na przeterminowanym place-1
    const stalePromise = store.refreshStale(60 * 60 * 1000);
    await new Promise((r) => setTimeout(r, 0));

    // W trakcie trwania refreshStale użytkownik wywołuje ręczne refreshAll()
    const allPromise = store.refreshAll();
    await allPromise;

    expect(deviceResolvedCount).toBe(1);
    expect(store.getState().entries[DEVICE_KEY]?.stored?.snapshot.coords).toEqual(COORDS_C);
    expect(store.getState().entries[place2.id]?.stored?.snapshot.fetchedAt).toBe(toIsoDateTime(now));
    // place-1 był już inFlight z refreshStale, więc nie został pobrany podwójnie
    expect(fetchedCoords.filter((c) => c.latitude === COORDS_A.latitude)).toHaveLength(1);

    place1Gate.resolve(makeSnapshot(COORDS_A, now.toISOString()));
    await stalePromise;
    expect(store.getState().entries[place1.id]?.stored?.snapshot.fetchedAt).toBe(toIsoDateTime(now));
  });
});
