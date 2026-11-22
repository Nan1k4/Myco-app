/**
 * @file Eliminacja gatunków z asymetrią dowodową. O(n·k), k = liczba obserwacji.
 */
import {
  FEATURE_KEYS,
  isGateFeatureKey,
  toNonEmptyArray,
  type EliminatedSpecies,
  type FeatureKey,
  type FeatureSelections,
  type FilterKey,
  type FilterSelections,
} from '../../../domain';
import { bitOf } from './featureBits';
import type { IndexedSpecies } from './filterIndex';

/** Obserwacja cechy zredukowana do bitu. */
export interface BitObservation {
  readonly key: FeatureKey;
  readonly bit: number;
  /** Obserwacja po wykonaniu wymaganych czynności (waga w rankingu podobieństwa). */
  readonly certain: boolean;
  /** Czy może wykluczyć gatunek niebezpieczny: `certain` i cecha Bramki (nie smak, nie subiektywna). */
  readonly excludesDangerous: boolean;
}

export interface Partition {
  readonly pool: readonly IndexedSpecies[];
  readonly eliminated: readonly EliminatedSpecies[];
}

/** Obserwacje cech w kolejności `FEATURE_KEYS`. */
export function collectObservations(features: FeatureSelections): readonly BitObservation[] {
  return FEATURE_KEYS.flatMap((key) => {
    const observation = toBitObservation(features, key);
    return observation ? [observation] : [];
  });
}

function toBitObservation<K extends FeatureKey>(features: FeatureSelections, key: K): BitObservation | null {
  const observation = features[key];
  if (!observation) return null;
  const certain = observation.certainty === 'certain';
  return {
    key,
    bit: bitOf(key, observation.value),
    certain,
    excludesDangerous: certain && isGateFeatureKey(key),
  };
}

/** Dzieli gatunki na pulę i wykluczone (z przyczynami). Zachowuje kolejność indeksu. */
export function partitionSpecies(
  species: readonly IndexedSpecies[],
  observations: readonly BitObservation[],
  selections: FilterSelections,
): Partition {
  const pool: IndexedSpecies[] = [];
  const eliminated: EliminatedSpecies[] = [];

  for (const candidate of species) {
    const conflicts = toNonEmptyArray(conflictsOf(candidate, observations, selections));
    if (conflicts) eliminated.push({ mushroomId: candidate.id, conflictingFeatures: conflicts });
    else pool.push(candidate);
  }
  return { pool, eliminated };
}

/** Obserwacje, które wykluczają gatunek. Gatunku niebezpiecznego nie wyklucza nic poza pewną cechą Bramki. */
function conflictsOf(
  candidate: IndexedSpecies,
  observations: readonly BitObservation[],
  { trees, substrate, habitat }: FilterSelections,
): FilterKey[] {
  const conflicts: FilterKey[] = observations
    .filter((o) => (candidate.masks[o.key] & o.bit) === 0 && (!candidate.dangerous || o.excludesDangerous))
    .map((o) => o.key);

  if (candidate.dangerous) return conflicts;

  const partners = candidate.treePartners;
  if (trees && partners && !trees.some((tree) => partners.has(tree))) conflicts.push('trees');
  if (substrate && !candidate.substrateGroups.has(substrate)) conflicts.push('substrate');
  if (habitat && !candidate.habitats.has(habitat)) conflicts.push('habitat');
  return conflicts;
}
