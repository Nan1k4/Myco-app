/**
 * @file Współrzędne: wpisywanie ręczne, formatowanie i miejsca bez nazwy (z mapy).
 * Format: szerokość, długość – `52.2297, 21.0122`.
 * @module features/location/coordinates
 */
import { isValidCoordinates, type GeoCoordinates, type NamedPlace } from '../../domain';

/** Liczba dziesiętna z kropką albo przecinkiem: „52.2297” i „52,2297” to to samo. */
const DECIMAL = /-?\d+(?:[.,]\d+)?/g;

/**
 * Prostokąt opisany na Polsce. Obejmuje też skrawki krajów sąsiednich (np. Pragę), więc służy
 * tylko do ostrzeżeń i wykrywania zamienionej kolejności – nigdy do odrzucania punktu.
 */
const POLAND_BOUNDS = { minLat: 49.0, maxLat: 54.9, minLon: 14.1, maxLon: 24.2 } as const;

export type CoordinatesParseResult =
  | { readonly ok: true; readonly coords: GeoCoordinates }
  | { readonly ok: false; readonly reason: 'format' | 'range' };

/**
 * Akceptuje dokładnie dwie liczby (szerokość, długość) z dowolnym separatorem.
 * Odrzuca stopnie/minuty/sekundy (`52°13'47"`) – dają 3+ liczby, więc nie zostaną źle odczytane.
 * Niejednoznaczne „52,21” (jedna liczba z przecinkiem dziesiętnym) też jest odrzucane.
 */
export function parseCoordinates(input: string): CoordinatesParseResult {
  const numbers = input.match(DECIMAL);
  if (!numbers || numbers.length !== 2) return { ok: false, reason: 'format' };
  const [latitude, longitude] = numbers.map((n) => Number(n.replace(',', '.'))) as [number, number];
  const coords = { latitude, longitude };
  return isValidCoordinates(coords) ? { ok: true, coords } : { ok: false, reason: 'range' };
}

/** Czy punkt leży w prostokącie {@link POLAND_BOUNDS} (nie: czy na pewno w Polsce). */
export function isWithinPolandBounds({ latitude, longitude }: GeoCoordinates): boolean {
  const b = POLAND_BOUNDS;
  return latitude >= b.minLat && latitude <= b.maxLat && longitude >= b.minLon && longitude <= b.maxLon;
}

/**
 * Typowa pomyłka: kolejność „długość, szerokość” (tak zapisuje m.in. GeoJSON).
 * Dla Polski oba zakresy są rozłączne, więc zamianę da się wykryć.
 */
export function looksSwapped(coords: GeoCoordinates): boolean {
  return !isWithinPolandBounds(coords) && isWithinPolandBounds({ latitude: coords.longitude, longitude: coords.latitude });
}

/** `52.2297, 21.0122` – kropka dziesiętna, bo przecinek rozdziela liczby. */
export function formatCoordinates({ latitude, longitude }: GeoCoordinates): string {
  return `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
}

/** Miejsce bez nazwy (współrzędne wpisane albo wskazane na mapie). */
export function placeFromCoordinates(coords: GeoCoordinates, detail: string): NamedPlace {
  return { name: formatCoordinates(coords), detail, coords };
}
