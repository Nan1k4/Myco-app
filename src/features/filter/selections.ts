/**
 * @file Niemutowalne aktualizacje wyborów filtra (czyste funkcje dla `useState`).
 */
import {
  toNonEmptyArray,
  type FeatureKey,
  type FeatureObservation,
  type FeatureValueMap,
  type FilterSelections,
  type SubstrateGroup,
  type TreeGenus,
} from '../../domain';

export const EMPTY_SELECTIONS: FilterSelections = { features: {} };

/** Ustawia obserwację cechy; `undefined` = cecha nieobserwowana (silnik ją pomija). */
export function withFeature<K extends FeatureKey>(
  selections: FilterSelections,
  key: K,
  observation: FeatureObservation<FeatureValueMap[K]> | undefined,
): FilterSelections {
  return { ...selections, features: { ...selections.features, [key]: observation } };
}

/** Dodaje drzewo albo je usuwa, jeśli już jest wybrane. */
export function withTreeToggled(selections: FilterSelections, tree: TreeGenus): FilterSelections {
  const current: readonly TreeGenus[] = selections.trees ?? [];
  const next = current.includes(tree) ? current.filter((t) => t !== tree) : [...current, tree];
  return { ...selections, trees: toNonEmptyArray(next) ?? undefined };
}

/** Ustawia podłoże; ponowny wybór tego samego je czyści. */
export function withSubstrateToggled(selections: FilterSelections, substrate: SubstrateGroup): FilterSelections {
  return { ...selections, substrate: selections.substrate === substrate ? undefined : substrate };
}