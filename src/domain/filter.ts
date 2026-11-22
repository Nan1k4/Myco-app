/**
 * @file Kontrakty filtra cech (klucz wielodostępny) i Bramki Bezpieczeństwa.
 * @module domain/filter
 */
import type { NonEmptyArray } from './common';
import type { FeatureKey, FeatureValueMap, GateFeatureKey } from './features';
import type { MushroomId } from './mushroom';
import type { Habitat, SubstrateGroup, TreeGenus } from './vocabulary';

export type ObservationCertainty = 'certain' | 'uncertain';

export interface FeatureObservation<T> {
  readonly value: T;
  readonly certainty: ObservationCertainty;
}

export type FeatureSelections = {
  readonly [K in FeatureKey]?: FeatureObservation<FeatureValueMap[K]> | undefined;
};

/**
 * Wybory użytkownika. Obserwacje otoczenia nie mają `certainty`: działają zawsze jak `uncertain`
 * (korzenie sięgają kilkudziesięciu metrów, drewno bywa zakopane), więc NIGDY nie wykluczają
 * gatunku niebezpiecznego.
 */
export interface FilterSelections {
  readonly features: FeatureSelections;
  readonly trees?: NonEmptyArray<TreeGenus> | undefined;
  readonly substrate?: SubstrateGroup | undefined;
  readonly habitat?: Habitat | undefined;
}

export type FilterKey = FeatureKey | 'trees' | 'substrate' | 'habitat';

export interface EliminatedSpecies {
  readonly mushroomId: MushroomId;
  readonly conflictingFeatures: NonEmptyArray<FilterKey>;
}

export interface CriticalCheck {
  readonly feature: GateFeatureKey;
  readonly resolvesCandidateIds: NonEmptyArray<MushroomId>;
  readonly notes: readonly string[];
}

interface FilterResultBase {
  readonly eliminated: readonly EliminatedSpecies[];
  readonly dataVersion: string;
}

export type FilterResult = FilterResultBase &
  (
    | {
        readonly status: 'clear';
        readonly matchingIds: NonEmptyArray<MushroomId>;
        readonly suggestedNextFeature: FeatureKey | null;
      }
    | {
        readonly status: 'verification_required';
        readonly dangerousCandidateIds: NonEmptyArray<MushroomId>;
        readonly unresolvedCandidateIds: readonly MushroomId[];
        readonly pendingChecks: NonEmptyArray<CriticalCheck>;
      }
    | {
        readonly status: 'dangerous_match';
        readonly dangerousCandidateIds: NonEmptyArray<MushroomId>;
        readonly matchingIds: NonEmptyArray<MushroomId>;
      }
    | {
        readonly status: 'no_match';
      }
  );
