/**
 * @file Kontrakty Predyktora: lokalizacja, pogoda, wynik.
 * Surowe DTO Open-Meteo (tablice równoległe) należą do `src/api/`, nie tutaj.
 * @module domain/predictor
 */
import type { IsoDate, IsoDateTime, NonEmptyArray } from './common';
import type { MushroomId } from './mushroom';
import type { EdibilityCategory } from './vocabulary';

/* ------------------------------- Lokalizacja ------------------------------ */

/** Współrzędne WGS84: `latitude ∈ [-90, 90]`, `longitude ∈ [-180, 180]`. */
export interface GeoCoordinates {
  readonly latitude: number;
  readonly longitude: number;
}

/** Strażnik niezmiennika {@link GeoCoordinates} (odrzuca też `NaN`/`Infinity`). */
export function isValidCoordinates(coords: GeoCoordinates): boolean {
  const { latitude, longitude } = coords;
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

/** Źródło pozycji. W lesie GPS bywa niedostępny – fallback musi być jawny. */
export type LocationSource = 'gps' | 'last_known' | 'manual';

/** Miejsce wybrane ręcznie (wynik wyszukiwania albo wpisane współrzędne). */
export interface NamedPlace {
  readonly name: string;
  /** Doprecyzowanie, np. „powiat warszawski zachodni · mazowieckie”; `null`, gdy brak. */
  readonly detail: string | null;
  readonly coords: GeoCoordinates;
}

/** Stan lokalizacji (cykl `expo-location`). */
export type LocationState =
  | { readonly status: 'idle' }
  | { readonly status: 'requesting' }
  | { readonly status: 'permission_denied'; readonly canAskAgain: boolean }
  | {
      readonly status: 'resolved';
      readonly coords: GeoCoordinates;
      /** Dokładność w metrach (`null`, gdy źródło jej nie podaje). */
      readonly accuracyM: number | null;
      readonly source: LocationSource;
      /** Nazwa miejsca do wyświetlenia (źródło `manual`); `null` dla pozycji urządzenia. */
      readonly label: string | null;
      readonly timestamp: IsoDateTime;
    }
  | { readonly status: 'error'; readonly message: string };

/** Lokalizacja ustalona – jedyny stan, z którym można pobrać pogodę. */
export type ResolvedLocation = Extract<LocationState, { readonly status: 'resolved' }>;

/** Kategoria błędu żądania sieciowego (wspólna dla pogody i wyszukiwania miejsc). */
export type NetworkErrorKind = 'offline' | 'timeout' | 'http' | 'invalid_response';

/* --------------------------------- Pogoda --------------------------------- */

/** Dane dobowe (rekordy zamiast tablic równoległych). `null` = brak pomiaru w Open-Meteo. */
export interface DailyWeather {
  readonly date: IsoDate;
  readonly precipitationMm: number | null;
  readonly tempMinC: number | null;
  readonly tempMaxC: number | null;
  readonly tempMeanC: number | null;
  /**
   * Średnia dobowa wilgotności gleby 0–9 cm (m³/m³), ważona grubością warstw
   * Forecast API (0–1, 1–3, 3–9 cm). Warstwa 0–7 cm istnieje tylko w Archive API (ERA5).
   */
  readonly soilMoisture: number | null;
}

/** Zrzut danych pogodowych dla lokalizacji. */
export interface WeatherSnapshot {
  readonly coords: GeoCoordinates;
  /** Strefa czasowa IANA dat (`timezone=auto`). */
  readonly timezone: string;
  /** Rosnąco po dacie; ostatni element = dzień najbliższy dzisiejszemu. */
  readonly days: NonEmptyArray<DailyWeather>;
  readonly fetchedAt: IsoDateTime;
}

/** Kategoria błędu pobierania pogody. */
export type WeatherErrorKind = NetworkErrorKind;

/** Stan pogody; warianty niosą ostatni zapisany zrzut, bo w lesie zwykle nie ma sieci. */
export type WeatherState =
  | { readonly status: 'idle' }
  | { readonly status: 'loading'; readonly cached: WeatherSnapshot | null }
  | { readonly status: 'success'; readonly data: WeatherSnapshot; readonly isStale: boolean }
  | {
      readonly status: 'error';
      readonly kind: WeatherErrorKind;
      readonly message: string;
      readonly cached: WeatherSnapshot | null;
    };

/* ---------------------------------- Wynik --------------------------------- */

/** Słowny poziom indeksu wysypu. */
export type FlushLevel = 'very_low' | 'low' | 'moderate' | 'high' | 'very_high';

/** Pewność predykcji – zależy od kompletności i świeżości danych. */
export type PredictionConfidence = 'low' | 'medium' | 'high';

/** Czynnik składowy wyniku (wyjaśnienie „dlaczego”). */
export interface PredictionFactor {
  readonly kind: 'precipitation' | 'temperature' | 'frost' | 'season' | 'soil_moisture';
  /** Wkład w indeks w [-1, 1] (ujemny = hamuje wysyp). */
  readonly contribution: number;
  readonly description: string;
}

/** Gatunek prawdopodobny w bieżących warunkach. */
export interface SpeciesCandidate {
  readonly mushroomId: MushroomId;
  /** Dopasowanie warunków do profilu owocnikowania, 0–100. */
  readonly score: number;
  /** Kopia z bazy dla UI – gatunki trujące też są pokazywane, wyraźnie oznaczone. */
  readonly edibilityCategory: EdibilityCategory;
}

/** Wynik Predyktora. `index` to heurystyka 0–100, NIE prawdopodobieństwo. */
export interface FlushPrediction {
  readonly index: number;
  readonly level: FlushLevel;
  readonly confidence: PredictionConfidence;
  readonly factors: readonly PredictionFactor[];
  /** Malejąco po `score`. */
  readonly candidates: readonly SpeciesCandidate[];
  readonly coords: GeoCoordinates;
  readonly computedAt: IsoDateTime;
  readonly weatherFetchedAt: IsoDateTime;
  /** Zmiana wag algorytmu unieważnia zapisane wyniki. */
  readonly modelVersion: string;
}
