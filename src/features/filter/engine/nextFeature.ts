/**
 * @file Sugestia następnego pytania, gdy w puli nie ma gatunków niebezpiecznych (status `clear`).
 */
import { FEATURE_KEYS, FEATURE_PROCEDURES, procedureCost, type FeatureKey } from '../../../domain';
import { vocabularySize } from './featureBits';
import type { IndexedSpecies } from './filterIndex';

/**
 * Cecha minimalizująca najgorszy przypadek: liczbę gatunków zgodnych z najliczniejszą odpowiedzią.
 * Remis: tańsza czynność, potem kolejność `FEATURE_KEYS`. Pomija cechy już obserwowane i takie,
 * po których żadna odpowiedź nie zawęża puli na pewno. O(F·V·n).
 */
export function suggestNextFeature(
  pool: readonly IndexedSpecies[],
  observedKeys: ReadonlySet<FeatureKey>,
): FeatureKey | null {
  let best: { readonly key: FeatureKey; readonly worst: number; readonly cost: number } | null = null;

  for (const key of FEATURE_KEYS) {
    if (observedKeys.has(key)) continue;
    const worst = worstCaseRemaining(pool, key);
    if (worst >= pool.length) continue;
    const cost = procedureCost(FEATURE_PROCEDURES[key]);
    if (!best || worst < best.worst || (worst === best.worst && cost < best.cost)) best = { key, worst, cost };
  }
  return best?.key ?? null;
}

/** Liczba gatunków zgodnych z najliczniejszą odpowiedzią na cechę `key` (najgorszy przypadek). */
export function worstCaseRemaining(pool: readonly IndexedSpecies[], key: FeatureKey): number {
  let worst = 0;
  for (let bit = 0; bit < vocabularySize(key); bit++) {
    const mask = 1 << bit;
    const matching = pool.reduce((count, species) => count + ((species.masks[key] & mask) !== 0 ? 1 : 0), 0);
    worst = Math.max(worst, matching);
  }
  return worst;
}
