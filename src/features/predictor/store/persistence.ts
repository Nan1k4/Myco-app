/**
 * @file Trwały zapis zapisanych miejsc i ostatniej pogody dla każdego z nich.
 * @module features/predictor/store/persistence
 */
import {
  MAX_SAVED_PLACES,
  isValidCoordinates,
  savedPlaceId,
  toNonEmptyArray,
  type DailyWeather,
  type GeoCoordinates,
  type IsoDate,
  type IsoDateTime,
  type LocationSource,
  type NamedPlace,
  type ResolvedLocation,
  type SavedPlace,
  type WeatherSnapshot,
} from '../../../domain';

export interface KeyValueStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

export const STORAGE_KEY = 'myco.forecast';
const STORAGE_VERSION = 1;

export const DEVICE_KEY = 'device';
export const CUSTOM_KEY = 'custom';
const RESERVED_KEYS: ReadonlySet<string> = new Set([DEVICE_KEY, CUSTOM_KEY]);

export interface StoredForecast {
  readonly location: ResolvedLocation;
  readonly snapshot: WeatherSnapshot;
}

export interface StoredState {
  readonly places: readonly SavedPlace[];
  readonly customPlace: NamedPlace | null;
  /** Klucz: {@link DEVICE_KEY}, {@link CUSTOM_KEY} albo `SavedPlaceId`. */
  readonly forecasts: Readonly<Record<string, StoredForecast>>;
}

export const EMPTY_STORED_STATE: StoredState = { places: [], customPlace: null, forecasts: {} };

export function encodeStoredState(state: StoredState): string {
  return JSON.stringify({
    version: STORAGE_VERSION,
    places: state.places,
    customPlace: state.customPlace,
    forecasts: state.forecasts,
  });
}

export function decodeStoredState(raw: string | null): StoredState {
  if (raw === null) return EMPTY_STORED_STATE;
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return EMPTY_STORED_STATE;
  }
  if (!isRecord(data) || data.version !== STORAGE_VERSION) return EMPTY_STORED_STATE;

  const places = (Array.isArray(data.places) ? data.places : []).flatMap((item: unknown) => {
    const place = decodePlace(item);
    return place ? [place] : [];
  });
  const uniquePlaces = places
    .filter((place, index) => places.findIndex((p) => p.id === place.id) === index)
    .slice(0, MAX_SAVED_PLACES);

  const customPlace = decodeNamedPlace(data.customPlace);
  const validKeys = new Set<string>([DEVICE_KEY, ...uniquePlaces.map((p) => p.id)]);
  if (customPlace) validKeys.add(CUSTOM_KEY);
  const forecasts: Record<string, StoredForecast> = {};
  if (isRecord(data.forecasts)) {
    for (const [key, value] of Object.entries(data.forecasts)) {
      if (!validKeys.has(key)) continue; 
      const forecast = decodeForecast(value);
      if (forecast) forecasts[key] = forecast;
    }
  }
  return { places: uniquePlaces, customPlace, forecasts };
}

/* ------------------------------- Dekodery --------------------------------- */

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_DATE_TIME = /^\d{4}-\d{2}-\d{2}T\S+$/;
const LOCATION_SOURCES: readonly LocationSource[] = ['gps', 'last_known', 'manual'];

function decodeNamedPlace(value: unknown): NamedPlace | null {
  if (!isRecord(value)) return null;
  const { name, detail } = value;
  const coords = decodeCoords(value.coords);
  if (!isNonEmptyString(name) || !coords || (detail !== null && typeof detail !== 'string')) return null;
  return { name, detail, coords };
}

function decodePlace(value: unknown): SavedPlace | null {
  const named = decodeNamedPlace(value);
  if (!named || !isRecord(value)) return null;
  const { id, createdAt } = value;
  if (typeof id !== 'string' || RESERVED_KEYS.has(id) || !isIsoDateTime(createdAt)) return null;
  try {
    return { ...named, id: savedPlaceId(id), createdAt };
  } catch {
    return null;
  }
}

function decodeForecast(value: unknown): StoredForecast | null {
  if (!isRecord(value)) return null;
  const location = decodeLocation(value.location);
  const snapshot = decodeSnapshot(value.snapshot);
  return location && snapshot ? { location, snapshot } : null;
}

function decodeLocation(value: unknown): ResolvedLocation | null {
  if (!isRecord(value) || value.status !== 'resolved') return null;
  const coords = decodeCoords(value.coords);
  const { accuracyM, source, label, timestamp } = value;
  if (!coords || !isIsoDateTime(timestamp)) return null;
  if (!isNullableNumber(accuracyM) || (label !== null && typeof label !== 'string')) return null;
  const knownSource = LOCATION_SOURCES.find((s) => s === source);
  if (!knownSource) return null;
  return { status: 'resolved', coords, accuracyM, source: knownSource, label, timestamp };
}

function decodeSnapshot(value: unknown): WeatherSnapshot | null {
  if (!isRecord(value)) return null;
  const coords = decodeCoords(value.coords);
  const { timezone, fetchedAt } = value;
  if (!coords || typeof timezone !== 'string' || !isIsoDateTime(fetchedAt) || !Array.isArray(value.days)) return null;

  const days: DailyWeather[] = [];
  for (const item of value.days) {
    const day = decodeDay(item);
    if (!day) return null; 
    days.push(day);
  }
  const nonEmpty = toNonEmptyArray(days);
  return nonEmpty ? { coords, timezone, days: nonEmpty, fetchedAt } : null;
}

function decodeDay(value: unknown): DailyWeather | null {
  if (!isRecord(value) || typeof value.date !== 'string' || !ISO_DATE.test(value.date)) return null;
  const { precipitationMm, tempMinC, tempMaxC, tempMeanC, soilMoisture } = value;
  if (![precipitationMm, tempMinC, tempMaxC, tempMeanC, soilMoisture].every(isNullableNumber)) return null;
  return {
    date: value.date as IsoDate,
    precipitationMm: precipitationMm as number | null,
    tempMinC: tempMinC as number | null,
    tempMaxC: tempMaxC as number | null,
    tempMeanC: tempMeanC as number | null,
    soilMoisture: soilMoisture as number | null,
  };
}

function decodeCoords(value: unknown): GeoCoordinates | null {
  if (!isRecord(value)) return null;
  const { latitude, longitude } = value;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') return null;
  const coords = { latitude, longitude };
  return isValidCoordinates(coords) ? coords : null;
}

function isIsoDateTime(value: unknown): value is IsoDateTime {
  return typeof value === 'string' && ISO_DATE_TIME.test(value) && Number.isFinite(Date.parse(value));
}

function isNullableNumber(value: unknown): value is number | null {
  return value === null || (typeof value === 'number' && Number.isFinite(value));
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
