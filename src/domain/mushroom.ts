/**
 * @file Kontrakt rekordu gatunku i całej bazy wiedzy.
 * @module domain/mushroom
 */
import type { Brand, Month, NonEmptyArray, NumericRange } from './common';
import type { GateFeatureKey, SpeciesFeatureProfile } from './features';
import type { Habitat, InedibilityReason, Substrate, ToxicCategory, ToxicSyndrome, TreeGenus, TrophicMode } from './vocabulary';

/* ------------------------------ Identyfikator ----------------------------- */

export type MushroomId = Brand<string, 'MushroomId'>;

const MUSHROOM_ID_PATTERN = /^[a-z]+(?:-[a-z]+)+$/;

export function mushroomId(raw: string): MushroomId {
  if (!MUSHROOM_ID_PATTERN.test(raw)) {
    throw new Error(`Invalid MushroomId: "${raw}"`);
  }
  return raw as MushroomId;
}

/* -------------------------------- Jadalność ------------------------------- */

/** Warunki, przy których gatunek warunkowo jadalny nie szkodzi. */
export interface EdibilityConditions {
  readonly requiresCooking: boolean;
  readonly alcoholInteraction: boolean;
  readonly youngSpecimensOnly: boolean;
  readonly notes?: string;
}

interface EdibilityBase {
  readonly notes?: string;
}

/**
 * Status jadalności (unia dyskryminowana) – każda kategoria ma tylko swoje pola, więc dane
 * niespójne nie skompilują się
 */
export type Edibility = EdibilityBase &
  (
    | { readonly category: 'edible' }
    | { readonly category: 'conditionally_edible'; readonly conditions: EdibilityConditions }
    | { readonly category: 'inedible'; readonly reasons: NonEmptyArray<InedibilityReason> }
    | { readonly category: 'unknown' }
    | {
        readonly category: ToxicCategory;
        readonly syndromes: NonEmptyArray<ToxicSyndrome>;
        readonly symptomOnsetHours: NumericRange;
      }
  );

/* ------------------------------ Ekologia ---------------------------------- */

/** Ekologia gatunku. */
export interface Ecology {
  readonly trophicModes: NonEmptyArray<TrophicMode>;
  /** Niepuste wtedy i tylko wtedy, gdy `trophicModes` zawiera `mycorrhizal` (`validateDatabase`). */
  readonly mycorrhizalPartners: readonly TreeGenus[];
  readonly substrates: NonEmptyArray<Substrate>;
  readonly habitats: NonEmptyArray<Habitat>;
}

/** Profil owocnikowania*/
export interface FruitingProfile {
  readonly months: NonEmptyArray<Month>;
  readonly optimalMeanTempC: NumericRange;
  readonly minPrecipitationMm: number;
  readonly lagDays: NumericRange;
  readonly frostSensitive: boolean;
}

/* -------------------------------- Gatunek --------------------------------- */

/**
 * Niebezpieczny sobowtór i cechy go odróżniające. Relacja kierunkowa:
 * zapisywana przy gatunku jadalnym/niegroźnym, wskazuje gatunek trujący.
 * Bramka wylicza możliwe sprawdzenia z profili cech (działa też dla par, których nikt nie opisał);
 * relacja nadaje sprawdzeniu priorytet i opis (`CriticalCheck.notes`).
 *
 * Niezmienniki (`validateDatabase`):
 *  - wskazany gatunek istnieje i ma kategorię niebezpieczną; relacja nie stoi przy gatunku niebezpiecznym,
 *  - dla każdej cechy z `distinguishingFeatures` gatunek niegroźny ma wartość, której sobowtór
 *    nie ma (E \ D ≠ ∅) – jej obserwacja `certain` wyklucza sobowtóra. Pełna rozłączność nie jest
 *    wymagana: zanikający pierścień daje `none` u obu gatunków. Odwrotnie: jeśli E ⊆ D, cecha
 *    niczego nie dowodzi (np. brak zasnówki nie wyklucza zasłonaka – zasnówka zanika).
 */
export interface DangerousLookalike {
  readonly mushroomId: MushroomId;
  /** `GateFeatureKey` – próba smaku nie może być cechą rozstrzygającą (błąd kompilacji). */
  readonly distinguishingFeatures: NonEmptyArray<GateFeatureKey>;
  /** Opis różnic dla człowieka. */
  readonly note: string;
}

/** Rekord gatunku w lokalnej bazie wiedzy. */
export interface Mushroom {
  readonly id: MushroomId;
  readonly scientificName: string;
  readonly scientificSynonyms: readonly string[];
  readonly polishName: string;
  readonly vernacularNames: readonly string[];
  readonly features: SpeciesFeatureProfile;
  readonly edibility: Edibility;
  readonly ecology: Ecology;
  readonly fruiting: FruitingProfile;
  readonly dangerousLookalikes: readonly DangerousLookalike[];
  readonly legallyProtected: boolean;
  readonly imageKeys: readonly string[];
  readonly description: string;
}

/* ---------------------------------- Baza ---------------------------------- */

/**
 * Wersja schematu typów. Podbijana przy zmianie niekompatybilnej –
 * dane z inną wersją nie skompilują się z {@link MushroomDatabase}.
 */
export const SCHEMA_VERSION = 1;

/** Opakowanie całej bazy – umożliwia migracje i śledzenie wersji treści. */
export interface MushroomDatabase {
  readonly schemaVersion: typeof SCHEMA_VERSION;
  readonly dataVersion: string;
  readonly species: readonly Mushroom[];
}
