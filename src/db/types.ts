import type { EdibilityCategory, Month, MushroomId } from '../domain';
import type { FacetId } from '../features/atlas/engine/facets';

/** Lekki rekord wiersza listy w Atlasie — bez ciężkiego `details_json`. */
export interface AtlasSpeciesRow {
  readonly id: MushroomId;
  readonly polishName: string;
  readonly scientificName: string;
  readonly vernacularShort: string;
  readonly edibilityCategory: EdibilityCategory;
  readonly dangerous: boolean;
  readonly legallyProtected: boolean;
  readonly monthsMask: number;
  readonly monthsLabel: string;
}

/** Wynik obliczenia faset Atlasu (wywoływane wyłącznie gdy `filtersOpen === true`). */
export interface AtlasFacetsResult {
  readonly counts: Readonly<Record<FacetId, Readonly<Record<string, number>>>>;
  readonly inSeasonNowCount: number;
  readonly favorableWeatherCount: number;
}

/** Podstawowe dane gatunku do wyświetlania nazw/etykiet (Quiz, Sobowtóry, Predyktor). */
export interface SpeciesBasicInfo {
  readonly id: MushroomId;
  readonly polishName: string;
  readonly scientificName: string;
  readonly edibilityCategory: EdibilityCategory;
}

/** Lekki rekord gatunku dla Predyktora owocnikowania (pobierany tylko dla aktywnego miesiąca). */
export interface PredictorSpeciesRow {
  readonly id: MushroomId;
  readonly polishName: string;
  readonly scientificName: string;
  readonly edibilityCategory: EdibilityCategory;
  readonly monthsMask: number;
  readonly optTempMin: number;
  readonly optTempMax: number;
  readonly minPrecipMm: number;
  readonly lagMin: number;
  readonly lagMax: number;
  readonly frostSensitive: boolean;
}

export interface DatabaseMeta {
  readonly schemaVersion: string;
  readonly dataVersion: string;
  readonly speciesCount: number;
}

export interface AtlasQueryParams {
  readonly search: string;
  readonly months: { readonly from: Month; readonly to: Month } | null;
  readonly inSeasonNow: boolean;
  readonly currentMonth: Month;
  readonly facets: { readonly [F in FacetId]?: readonly string[] };
  readonly favorableWeather: boolean;
  readonly favorableIds: ReadonlySet<MushroomId> | null;
}