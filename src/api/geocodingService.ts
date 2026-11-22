/**
 * @file Wyszukiwanie miejsc po nazwie (Open-Meteo Geocoding API, dane GeoNames).
 * Nigdy nie rzuca. Pojedynczy uszkodzony rekord jest pomijany, nie psuje całej listy.
 *
 * Ograniczenie: GeoNames dobrze pokrywa miejscowości; nazwanych lasów może nie znaleźć.
 * Dlatego UI daje też wpisanie współrzędnych (np. z Map Google).
 *
 * @module api/geocodingService
 */
import { isValidCoordinates, type NamedPlace, type NetworkErrorKind } from '../domain';
import { buildQuery, fetchJson } from './http';
import { extractErrorReason, isRecord } from './openMeteo';

export const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

/** Minimalna długość zapytania – krótsze nie trafiają do sieci. */
export const MIN_QUERY_LENGTH = 2;

/** Zakres kraju: baza gatunków i heurystyka są dla Polski, a bez filtra „Lipa” zwraca pół świata. */
const COUNTRY_CODE = 'PL';
const MAX_RESULTS = 10;
const DEFAULT_TIMEOUT_MS = 10_000;

export type PlaceSearchResult =
  | { readonly ok: true; readonly places: readonly NamedPlace[] }
  | { readonly ok: false; readonly kind: NetworkErrorKind; readonly message: string };

export interface SearchPlacesOptions {
  readonly timeoutMs?: number;
  readonly fetchFn?: typeof fetch;
}

/** Miejsca pasujące do nazwy. Zapytanie krótsze niż {@link MIN_QUERY_LENGTH} → pusta lista bez żądania. */
export async function searchPlaces(query: string, options: SearchPlacesOptions = {}): Promise<PlaceSearchResult> {
  const name = query.trim();
  if (name.length < MIN_QUERY_LENGTH) return { ok: true, places: [] };

  const url = `${GEOCODING_URL}?${buildQuery({
    name,
    count: String(MAX_RESULTS),
    language: 'pl',
    format: 'json',
    countryCode: COUNTRY_CODE,
  })}`;
  const response = await fetchJson(url, {
    timeoutMs: options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
    serviceLabel: 'Wyszukiwarka miejsc',
    extractErrorReason,
    ...(options.fetchFn ? { fetchFn: options.fetchFn } : {}),
  });
  if (!response.ok) return response;

  const places = parsePlaces(response.body);
  return places
    ? { ok: true, places }
    : { ok: false, kind: 'invalid_response', message: 'Wyszukiwarka miejsc zwróciła nieprawidłowe dane.' };
}

/**
 * `null` = niepoprawny kształt odpowiedzi. Brak pola `results` to „nic nie znaleziono”
 * (tak API sygnalizuje pusty wynik), nie błąd.
 */
function parsePlaces(body: unknown): readonly NamedPlace[] | null {
  if (!isRecord(body)) return null;
  if (body.results === undefined) return [];
  if (!Array.isArray(body.results)) return null;
  return body.results.flatMap((item: unknown): NamedPlace[] => {
    const place = toPlace(item);
    return place ? [place] : [];
  });
}

function toPlace(item: unknown): NamedPlace | null {
  if (!isRecord(item) || typeof item.name !== 'string' || item.name.trim() === '') return null;
  const { latitude, longitude } = item;
  if (typeof latitude !== 'number' || typeof longitude !== 'number') return null;
  const coords = { latitude, longitude };
  if (!isValidCoordinates(coords)) return null;
  return { name: item.name.trim(), detail: describeRegion(item), coords };
}

/** „powiat · województwo”, bez pustych i powtórzonych członów. */
function describeRegion(item: Record<string, unknown>): string | null {
  const parts = [item.admin2, item.admin1].filter((p): p is string => typeof p === 'string' && p.trim() !== '');
  const unique = [...new Set(parts.map((p) => p.trim()))];
  return unique.length > 0 ? unique.join(' · ') : null;
}
