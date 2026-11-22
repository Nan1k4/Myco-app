/**
 * @file Ewaluacja filtra: eliminacja → status Bramki → następne pytanie. Czysta funkcja.
 */
import { toNonEmptyArray, type FilterResult, type FilterSelections } from '../../../domain';
import type { FilterIndex } from './filterIndex';
import { collectObservations, partitionSpecies } from './matching';
import { suggestNextFeature } from './nextFeature';
import { buildCriticalChecks } from './safetyGate';

/** Jedyne źródło {@link FilterResult}. */
export function evaluateFilter(index: FilterIndex, selections: FilterSelections): FilterResult {
  const observations = collectObservations(selections.features);
  const { pool, eliminated } = partitionSpecies(index.species, observations, selections);
  const base = { eliminated, dataVersion: index.dataVersion };

  const matchingIds = toNonEmptyArray(pool.map((species) => species.id));
  if (!matchingIds) return { ...base, status: 'no_match' };

  const dangerousCandidateIds = toNonEmptyArray(pool.filter((s) => s.dangerous).map((s) => s.id));
  if (!dangerousCandidateIds) {
    const observedKeys = new Set(observations.map((o) => o.key));
    return { ...base, status: 'clear', matchingIds, suggestedNextFeature: suggestNextFeature(pool, observedKeys) };
  }

  const decisiveKeys = new Set(observations.filter((o) => o.excludesDangerous).map((o) => o.key));
  const pendingChecks = toNonEmptyArray(buildCriticalChecks(pool, decisiveKeys));
  if (!pendingChecks) return { ...base, status: 'dangerous_match', dangerousCandidateIds, matchingIds };

  return {
    ...base,
    status: 'verification_required',
    dangerousCandidateIds,
    unresolvedCandidateIds: pool.filter((s) => !s.dangerous).map((s) => s.id),
    pendingChecks,
  };
}
