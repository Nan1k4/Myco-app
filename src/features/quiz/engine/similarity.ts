/**
 * @file Ranking podobieństwa (wynik %). WARSTWA PREZENTACJI – niezależna od Bramki.
 *
 * Dwie warstwy, dwa kontrakty:
 *  - Bramka (`evaluateFilter`) – ścisła; jedyne źródło werdyktu bezpieczeństwa. Próg % go nie zmienia.
 *  - Ranking – decyduje o WIDOCZNOŚCI na liście, także gatunków niebezpiecznych:
 *     · wykluczenie twarde (znika z puli) – wyłącznie pewna obserwacja cechy Bramki, dla wszystkich,
 *     · ukrycie progiem – gatunek z wynikiem poniżej progu. Ukryte niebezpieczne trafiają do
 *       {@link SimilarityRanking.hiddenDangerous}: UI ich nie wyświetla na liście, ale baner je nazywa
 *       (Bramka nadal je liczy – próg ukrywa, nie wyklucza).
 *
 * Wynik gatunku = Σ(waga · zaliczenie) / Σ waga po obserwacjach, które go dotyczą.
 * Pominięte pytania nie wchodzą do licznika ani mianownika (pominięcie ≠ niezgodność).
 * Złożoność O(n·k), n – gatunki, k – obserwacje.
 *
 * @module features/quiz/engine/similarity
 */
import {
  isGateFeatureKey,
  type FilterKey,
  type FilterSelections,
  type MushroomId,
} from '../../../domain';
import type { IndexedSpecies } from '../../filter/engine/filterIndex';
import { collectObservations, type BitObservation } from '../../filter/engine/matching';
import { nearMask } from './nearValues';

export const SIMILARITY = {
  /** Waga obserwacji wg wiarygodności cechy. Subiektywne (barwa kapelusza, zapach…) i otoczenie – połowa. */
  weight: { objective: 1, subjective: 0.5, environment: 0.5 },
  /** Mnożnik wagi obserwacji „na oko” (bez wykonanej czynności): jej niezgodność mniej karze. */
  uncertainFactor: 0.6,
  /** Zaliczenie wartości sąsiedniej (barwa). */
  nearCredit: 0.5,
  /**
   * Suma wag, od której wynik uznajemy za wiarygodny (≈ 2 pewne cechy albo 4 „na oko”).
   * Poniżej – procent jest pokazywany i próg działa, ale UI oznacza wynik jako orientacyjny.
   */
  minEvidence: 2,
} as const;

/** Suwak: 50–100%, krok 5 pkt, domyślnie 80%. */
export const THRESHOLD = { min: 0.5, max: 1, step: 0.05, default: 0.8 } as const;

const EPSILON = 1e-9;

/** Przycina do [min, max] i przyciąga do kroku – wartość z suwaka nigdy nie jest „dziwna”. */
export function normalizeThreshold(value: number): number {
  if (!Number.isFinite(value)) return THRESHOLD.default;
  const snapped = Math.round(value / THRESHOLD.step) * THRESHOLD.step;
  return Math.min(THRESHOLD.max, Math.max(THRESHOLD.min, Math.round(snapped * 100) / 100));
}

export interface SimilarityEntry {
  readonly species: IndexedSpecies;
  /** [0, 1]; 1 = brak sprzeczności z obserwacjami. */
  readonly score: number;
  /** Obserwacje w pełni zgodne / wszystkie, które dotyczą gatunku. */
  readonly matched: number;
  readonly considered: number;
  /** Obserwacje niezgodne albo tylko zbliżone (barwa sąsiednia) – „co się nie zgadza”. */
  readonly mismatches: readonly FilterKey[];
}

export interface SimilarityRanking {
  /** Suma wag wszystkich obserwacji. */
  readonly evidence: number;
  /** `false` – mało odpowiedzi; procent jest orientacyjny (1/2 = 50%, 2/2 = 100%). */
  readonly reliable: boolean;
  readonly threshold: number;
  /** Liczba gatunków w bazie – „ukryto N z {total}”. */
  readonly total: number;
  /** Niegroźne bez żadnej sprzeczności (100%). */
  readonly exact: readonly SimilarityEntry[];
  /** Niegroźne z wynikiem w [próg, 100%), malejąco. */
  readonly partial: readonly SimilarityEntry[];
  /** Niebezpieczne niewykluczone, z wynikiem ≥ próg, malejąco. */
  readonly dangerous: readonly SimilarityEntry[];
  /** Niebezpieczne niewykluczone, ale poniżej progu – Bramka je liczy, baner je nazywa. */
  readonly hiddenDangerous: readonly SimilarityEntry[];
  /** Niegroźne poniżej progu. */
  readonly hiddenHarmlessCount: number;
  /** Wykluczone twardo: pewna obserwacja cechy Bramki niezgodna z profilem. */
  readonly excludedIds: readonly MushroomId[];
}

export function rankBySimilarity(
  species: readonly IndexedSpecies[],
  selections: FilterSelections,
  threshold: number,
): SimilarityRanking {
  const limit = normalizeThreshold(threshold);
  const observations = collectObservations(selections.features);
  const evidence = totalEvidence(observations, selections);

  const exact: SimilarityEntry[] = [];
  const partial: SimilarityEntry[] = [];
  const dangerous: SimilarityEntry[] = [];
  const hiddenDangerous: SimilarityEntry[] = [];
  const excludedIds: MushroomId[] = [];
  let hiddenHarmlessCount = 0;

  for (const candidate of species) {
    const entry = assess(candidate, observations, selections);
    if (!entry) excludedIds.push(candidate.id);
    else if (candidate.dangerous) (entry.score >= limit - EPSILON ? dangerous : hiddenDangerous).push(entry);
    else if (entry.mismatches.length === 0) exact.push(entry);
    else if (entry.score >= limit - EPSILON) partial.push(entry);
    else hiddenHarmlessCount += 1;
  }

  return {
    evidence,
    reliable: evidence >= SIMILARITY.minEvidence,
    threshold: limit,
    total: species.length,
    exact,
    partial: partial.sort(byScore),
    dangerous: dangerous.sort(byDanger),
    hiddenDangerous: hiddenDangerous.sort(byDanger),
    hiddenHarmlessCount,
    excludedIds,
  };
}

/** `null` = gatunek wykluczony twardo (ta sama reguła co Bramka dla gatunków niebezpiecznych). */
function assess(
  candidate: IndexedSpecies,
  observations: readonly BitObservation[],
  { trees, substrate, habitat }: FilterSelections,
): SimilarityEntry | null {
  let weightSum = 0;
  let creditSum = 0;
  let matched = 0;
  let considered = 0;
  const mismatches: FilterKey[] = [];

  const add = (key: FilterKey, weight: number, credit: number) => {
    weightSum += weight;
    creditSum += weight * credit;
    considered += 1;
    if (credit === 1) matched += 1;
    else mismatches.push(key);
  };

  for (const observation of observations) {
    const mask = candidate.masks[observation.key];
    const exact = (mask & observation.bit) !== 0;
    // Pewna obserwacja cechy Bramki to dowód, nie wskazówka – nie podlega tolerancji.
    if (!exact && observation.excludesDangerous) return null;
    const near = !exact && (mask & nearMask(observation.key, observation.bit)) !== 0;
    add(observation.key, observationWeight(observation), exact ? 1 : near ? SIMILARITY.nearCredit : 0);
  }

  // Drzewa dotyczą tylko gatunków wyłącznie mikoryzowych; dla pozostałych nie są dowodem.
  const partners = candidate.treePartners;
  if (trees && partners) add('trees', SIMILARITY.weight.environment, trees.some((t) => partners.has(t)) ? 1 : 0);
  if (substrate) add('substrate', SIMILARITY.weight.environment, candidate.substrateGroups.has(substrate) ? 1 : 0);
  if (habitat) add('habitat', SIMILARITY.weight.environment, candidate.habitats.has(habitat) ? 1 : 0);

  return {
    species: candidate,
    score: weightSum === 0 ? 1 : creditSum / weightSum,
    matched,
    considered,
    mismatches,
  };
}

function observationWeight({ key, certain }: BitObservation): number {
  const base = isGateFeatureKey(key) ? SIMILARITY.weight.objective : SIMILARITY.weight.subjective;
  return certain ? base : base * SIMILARITY.uncertainFactor;
}

function totalEvidence(observations: readonly BitObservation[], { trees, substrate, habitat }: FilterSelections): number {
  const environment = (trees ? 1 : 0) + (substrate ? 1 : 0) + (habitat ? 1 : 0);
  return observations.reduce((sum, o) => sum + observationWeight(o), environment * SIMILARITY.weight.environment);
}

/** Gatunki widoczne na liście (pula pytań i kolejności opcji). */
export function visibleSpecies(ranking: SimilarityRanking): readonly IndexedSpecies[] {
  return [...ranking.dangerous, ...ranking.exact, ...ranking.partial].map((entry) => entry.species);
}

/** Ukryte progiem (niegroźne + niebezpieczne). */
export function hiddenCount(ranking: SimilarityRanking): number {
  return ranking.hiddenHarmlessCount + ranking.hiddenDangerous.length;
}

function byDanger(a: SimilarityEntry, b: SimilarityEntry): number {
  return byScore(a, b) || Number(b.species.deadly) - Number(a.species.deadly);
}

/** Malejąco po wyniku, przy remisie – więcej zgodnych obserwacji wyżej. */
function byScore(a: SimilarityEntry, b: SimilarityEntry): number {
  return b.score - a.score || b.matched - a.matched;
}
