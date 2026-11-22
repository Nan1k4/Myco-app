/**
 * @file Bramka Bezpieczeństwa: sprawdzenia, które mogą wykluczyć gatunki niebezpieczne z puli.
 *
 * Wykonalność liczona z PROFILI, nie tylko z relacji w danych: cecha f może wykluczyć gatunek
 * niebezpieczny D, gdy któryś gatunek niegroźny w puli ma wartość, której D nie ma
 * (OR masek niegroźnych & ~maska D ≠ 0). Działa więc także dla par, których nikt nie opisał
 * (borowik vs muchomor plamisty – rozstrzyga hymenofor). Relacje `DangerousLookalike` dają priorytet i opisy.
 *
 * Złożoność O(F·(n + d·e)) operacji na maskach, d/e – liczba gatunków niebezpiecznych/niegroźnych w puli.
 */
import {
  FEATURE_PROCEDURES,
  GATE_FEATURE_KEYS,
  procedureCost,
  toNonEmptyArray,
  type CriticalCheck,
  type FeatureKey,
  type GateFeatureKey,
  type MushroomId,
} from '../../../domain';
import type { IndexedSpecies } from './filterIndex';

interface RankedCheck {
  readonly check: CriticalCheck;
  /** Pary (niegroźny, niebezpieczny) o rozłącznych wartościach – te cecha rozstrzyga zawsze. */
  readonly separatedPairs: number;
  readonly cost: number;
  readonly curated: boolean;
  readonly deadlyResolved: number;
  readonly order: number;
}

/**
 * Sprawdzenia w kolejności zadawania. Pomija cechy już obserwowane `certain` (`decisiveKeys`) –
 * ich wynik jest już uwzględniony w puli.
 */
export function buildCriticalChecks(
  pool: readonly IndexedSpecies[],
  decisiveKeys: ReadonlySet<FeatureKey>,
): CriticalCheck[] {
  const harmless = pool.filter((species) => !species.dangerous);
  const dangerous = pool.filter((species) => species.dangerous);
  const dangerousIds: ReadonlySet<MushroomId> = new Set(dangerous.map((species) => species.id));

  return GATE_FEATURE_KEYS.flatMap((feature, order) => {
    if (decisiveKeys.has(feature)) return [];
    const ranked = rankCheck(feature, order, harmless, dangerous, dangerousIds);
    return ranked ? [ranked] : [];
  })
    .sort(compareChecks)
    .map((ranked) => ranked.check);
}

function rankCheck(
  feature: GateFeatureKey,
  order: number,
  harmless: readonly IndexedSpecies[],
  dangerous: readonly IndexedSpecies[],
  dangerousIds: ReadonlySet<MushroomId>,
): RankedCheck | null {
  const harmlessUnion = harmless.reduce((mask, species) => mask | species.masks[feature], 0);
  const resolved = dangerous.filter((species) => (harmlessUnion & ~species.masks[feature]) !== 0);
  const resolvesCandidateIds = toNonEmptyArray(resolved.map((species) => species.id));
  if (!resolvesCandidateIds) return null;

  const { curated, notes } = curatedNotes(feature, harmless, dangerousIds);
  return {
    check: { feature, resolvesCandidateIds, notes },
    separatedPairs: countSeparatedPairs(feature, harmless, resolved),
    cost: procedureCost(FEATURE_PROCEDURES[feature]),
    curated,
    deadlyResolved: resolved.filter((species) => species.deadly).length,
    order,
  };
}

function countSeparatedPairs(
  feature: GateFeatureKey,
  harmless: readonly IndexedSpecies[],
  resolved: readonly IndexedSpecies[],
): number {
  let pairs = 0;
  for (const danger of resolved) {
    for (const safe of harmless) {
      if ((danger.masks[feature] & safe.masks[feature]) === 0) pairs++;
    }
  }
  return pairs;
}

/** Relacje z danych dla tej cechy, w których oba gatunki są w puli. */
function curatedNotes(
  feature: GateFeatureKey,
  harmless: readonly IndexedSpecies[],
  dangerousIds: ReadonlySet<MushroomId>,
): { readonly curated: boolean; readonly notes: readonly string[] } {
  const relations = harmless
    .flatMap((species) => species.lookalikes)
    .filter((l) => dangerousIds.has(l.mushroomId) && l.distinguishingFeatures.includes(feature));
  const notes = [...new Set(relations.map((l) => l.note).filter((note) => note.length > 0))];
  return { curated: relations.length > 0, notes };
}

/**
 * Najpierw sprawdzenia, które rozstrzygają z pewnością choć jedną parę; wśród nich najtańsze
 * (bez czekania, bez niszczenia), potem najsilniejsze, opisane w danych, rozstrzygające gatunki śmiertelne.
 */
function compareChecks(a: RankedCheck, b: RankedCheck): number {
  return (
    Number(a.separatedPairs === 0) - Number(b.separatedPairs === 0) ||
    a.cost - b.cost ||
    b.separatedPairs - a.separatedPairs ||
    Number(b.curated) - Number(a.curated) ||
    b.deadlyResolved - a.deadlyResolved ||
    a.order - b.order
  );
}
