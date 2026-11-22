/**
 * @file Kolejność pytań quizu. Czysta funkcja: (Bramka, ranking, odpowiedzi) → następne pytanie.
 * @module features/quiz/engine/quizEngine
 */
import {
  FEATURE_KEYS,
  FEATURE_PROCEDURES,
  FEATURE_VOCABULARIES,
  HABITATS,
  SUBSTRATE_GROUPS,
  TREE_GENERA,
  VALUE_PROCEDURE_OVERRIDES,
  requiredProcedures,
  type CriticalCheck,
  type FeatureKey,
  type FeatureSelections,
  type FeatureValueMap,
  type FilterKey,
  type FilterResult,
  type FilterSelections,
  type GateFeatureKey,
  type ObservationProcedure,
  isGateFeatureKey,
} from '../../../domain';
import type { IndexedSpecies } from '../../filter/engine/filterIndex';
import { worstCaseRemaining } from '../../filter/engine/nextFeature';
import { visibleSpecies, type SimilarityRanking } from './similarity';

/** Wszystko, o co quiz może zapytać. Smak - nigdy (błąd kompilacji przy próbie). */
export type QuizKey = Exclude<FilterKey, 'taste'>;
export type QuizFeatureKey = Exclude<FeatureKey, 'taste'>;
export type EnvironmentKey = Extract<QuizKey, 'habitat' | 'substrate' | 'trees'>;

/** Etap = miejsce albo czynność potrzebna do odpowiedzi. */
export type QuizStage = 'place' | (typeof FEATURE_PROCEDURES)[QuizFeatureKey];

/**
 * Pytania etapów w kolejności zadawania (etap „domowy” pytania). `Record` wymusza listę dla każdego
 * etapu; test pilnuje, że każde pytanie występuje dokładnie raz, a etap cechy zgadza się
 * z `FEATURE_PROCEDURES` albo z etapem, do którego pytanie przechodzi ({@link CARRY_OVER}).
 */
export const STAGE_SEQUENCE: Readonly<Record<QuizStage, readonly QuizKey[]>> = {
  place: ['habitat', 'substrate', 'trees'],
  look: [
    'growthHabit',
    'capColor',
    'capShape',
    'capSize',
    'capMargin',
    'hymenophore',
    'hymenophoreColor',
    'stipeColor', // bramka trzonu: „brak trzonu” ukrywa pytania o trzon
    'stipeShape',
    'stipeSurface',
    'ring',
  ],
  touch: ['capSurface', 'capPeelability', 'latex', 'bruising'],
  dig_base: ['volva', 'stipeBase', 'gillAttachment'],
  cut: ['capFleshColor', 'stipeFleshColor', 'stipeInterior', 'capFleshColorChange', 'stipeFleshColorChange'],
  smell: ['smell'],
  spore_print: ['sporePrint'],
};

export const STAGE_ORDER: readonly QuizStage[] = ['place', 'look', 'touch', 'dig_base', 'cut', 'smell', 'spore_print'];
export const CARRY_OVER: { readonly [K in QuizKey]?: QuizStage } = { gillAttachment: 'cut', latex: 'cut' };
export const STAGE_HIDES: { readonly [S in QuizStage]?: readonly QuizStage[] } = { dig_base: ['cut', 'spore_print'] };
const SKIPPABLE_STAGES: ReadonlySet<QuizStage> = new Set<QuizStage>(['touch', 'dig_base', 'cut', 'smell', 'spore_print']);
const REQUIRED_KEYS: ReadonlySet<QuizKey> = new Set<QuizKey>(['habitat', 'substrate']);
const STAGE_RANK: ReadonlyMap<QuizStage, number> = new Map(STAGE_ORDER.map((stage, rank) => [stage, rank]));
const STAGE_BY_NAME: ReadonlyMap<string, QuizStage> = new Map(STAGE_ORDER.map((stage) => [stage, stage]));
const STAGE_OF: ReadonlyMap<QuizKey, QuizStage> = new Map(
  STAGE_ORDER.flatMap((stage) => STAGE_SEQUENCE[stage].map((key) => [key, stage] as const)),
);
const OVERRIDE_PROCEDURES: ReadonlyMap<string, ReadonlyMap<string, readonly ObservationProcedure[]>> = new Map(
  Object.entries(VALUE_PROCEDURE_OVERRIDES).map(([key, valueMap]) => [
    key,
    new Map(Object.entries(valueMap ?? {}).flatMap(([value, procs]) => (procs ? [[value, procs] as const] : []))),
  ]),
);
const CARRY_KEYS = Object.keys(CARRY_OVER) as QuizKey[];
export const REVIEW_IN: { readonly [K in QuizKey]?: QuizStage } = Object.fromEntries(
  STAGE_ORDER.flatMap((stage) =>
    STAGE_SEQUENCE[stage].flatMap((key) => {
      if (isEnvironmentKey(key)) return [];
      const procedure: QuizStage = FEATURE_PROCEDURES[key];
      return stageRank(procedure) > stageRank(stage) ? [[key, procedure] as const] : [];
    }),
  ),
);
const POSSIBLE_REVIEW_STAGES: ReadonlyMap<QuizKey, ReadonlySet<QuizStage>> = new Map(
  STAGE_ORDER.flatMap((stage) =>
    STAGE_SEQUENCE[stage].flatMap((key) => {
      if (isEnvironmentKey(key)) return [];
      const stages = new Set<QuizStage>();
      const base = REVIEW_IN[key];
      if (base) stages.add(base);
      const overrides = OVERRIDE_PROCEDURES.get(key);
      if (overrides) {
        for (const procs of overrides.values()) {
          const required = maxStageOfProcedures(procs, stage);
          if (stageRank(required) > stageRank(stage)) stages.add(required);
        }
      }
      return stages.size > 0 ? [[key, stages] as const] : [];
    }),
  ),
);
const POSSIBLE_REVIEW_KEYS = [...POSSIBLE_REVIEW_STAGES.keys()];

export function isStageSkippable(stage: QuizStage): boolean {
  return SKIPPABLE_STAGES.has(stage);
}

export function isKeySkippable(key: QuizKey): boolean {
  return !REQUIRED_KEYS.has(key);
}

/** Etapy bez zrywania i dotykania grzyba. */
export function isNoContactStage(stage: QuizStage): boolean {
  return stage === 'place' || stage === 'look';
}

function keysAskedIn(stage: QuizStage): readonly QuizKey[] {
  const carried = [...CARRY_KEYS, ...POSSIBLE_REVIEW_KEYS].filter(
    (key) => CARRY_OVER[key] === stage || POSSIBLE_REVIEW_STAGES.get(key)?.has(stage),
  );
  return [...new Set([...carried, ...STAGE_SEQUENCE[stage]])];
}

export type QuizQuestion =
  | { readonly kind: 'environment'; readonly key: EnvironmentKey; readonly stage: 'place' }
  | { readonly kind: 'safety'; readonly key: GateFeatureKey; readonly stage: QuizStage; readonly check: CriticalCheck }
  | { readonly kind: 'narrowing'; readonly key: QuizFeatureKey; readonly stage: QuizStage };

export type SkipLog = ReadonlyMap<QuizKey, QuizStage>;

export interface QuizPin {
  readonly key: QuizKey;
  readonly stage: QuizStage;
}

export interface QuizProgressView {
  readonly selections: FilterSelections;
  readonly skipped: SkipLog;
  readonly skippedStages: ReadonlySet<QuizStage>;
  readonly reopened: ReadonlySet<QuizStage>;
  readonly answeredIn: ReadonlyMap<QuizKey, QuizStage>;
}

export const EMPTY_PROGRESS: QuizProgressView = {
  selections: { features: {} },
  skipped: new Map(),
  skippedStages: new Set(),
  reopened: new Set(),
  answeredIn: new Map(),
};

export interface NextQuestionInput {
  readonly gate: FilterResult;
  readonly ranking: SimilarityRanking;
  readonly progress: QuizProgressView;
  readonly pinned: QuizPin | null;
}

export function isQuizFeatureKey(key: FeatureKey): key is QuizFeatureKey {
  return key !== 'taste';
}

export function isEnvironmentKey(key: QuizKey): key is EnvironmentKey {
  return key === 'habitat' || key === 'substrate' || key === 'trees';
}

/** Etap domowy pytania. */
export function stageOf(key: QuizKey): QuizStage {
  return STAGE_OF.get(key) ?? 'look';
}

export function hiddenStages(skippedStages: ReadonlySet<QuizStage>): ReadonlySet<QuizStage> {
  return new Set([...skippedStages].flatMap((stage) => [stage, ...(STAGE_HIDES[stage] ?? [])]));
}

/* ------------------------------- Warunki ----------------------------------- */

/**
 * Trzon jest, dopóki użytkownik nie odpowiedział „brak trzonu” w barwie trzonu (`not_applicable` -
 * w danych gatunek bez trzonu ma je w barwie trzonu i `absent` w kształcie). Brak odpowiedzi ≠ brak trzonu.
 */
export function hasStipe({ stipeColor }: FeatureSelections): boolean {
  return stipeColor?.value !== 'not_applicable';
}

/** Blaszki - albo jeszcze nie wiadomo (pytamy raczej o jedno pytanie za dużo niż za mało). */
function mayHaveGills({ hymenophore }: FeatureSelections): boolean {
  return hymenophore === undefined || hymenophore.value === 'gills';
}

const CONDITIONS: { readonly [K in QuizKey]?: (features: FeatureSelections) => boolean } = {
  hymenophoreColor: ({ hymenophore }) => hymenophore?.value !== 'none',
  stipeShape: hasStipe,
  stipeSurface: hasStipe,
  ring: hasStipe,
  stipeBase: hasStipe,
  stipeFleshColor: hasStipe,
  stipeInterior: hasStipe,
  stipeFleshColorChange: hasStipe,
  latex: mayHaveGills,
  gillAttachment: (features) => mayHaveGills(features) && hasStipe(features),
};

export function isApplicable(key: QuizKey, { features }: FilterSelections): boolean {
  return CONDITIONS[key]?.(features) ?? true;
}

export function canConfirmIn<K extends QuizFeatureKey>(key: K, stage: QuizStage, value?: FeatureValueMap[K]): boolean {
  if (!isGateFeatureKey(key)) return false;
  const procedures: readonly ObservationProcedure[] =
    value !== undefined ? requiredProcedures(key, value) : [FEATURE_PROCEDURES[key]];
  return stageRank(stage) >= Math.max(...procedures.map(procedureRank));
}

function stageRank(stage: QuizStage): number {
  return STAGE_RANK.get(stage) ?? 0;
}

function procedureRank(procedure: ObservationProcedure): number {
  const stage = STAGE_BY_NAME.get(procedure);
  return stage !== undefined ? stageRank(stage) : Number.POSITIVE_INFINITY;
}

function maxStageOfProcedures(procedures: readonly ObservationProcedure[], fallback: QuizStage): QuizStage {
  let best = fallback;
  let bestRank = -1;
  for (const procedure of procedures) {
    const stage = STAGE_BY_NAME.get(procedure);
    if (stage !== undefined && stageRank(stage) > bestRank) {
      best = stage;
      bestRank = stageRank(stage);
    }
  }
  return best;
}

function reviewStageFor(key: QuizKey, selections: FilterSelections): QuizStage | undefined {
  if (isEnvironmentKey(key)) return undefined;
  const observation = selections.features[key];
  if (!observation) return REVIEW_IN[key];
  const procedures = OVERRIDE_PROCEDURES.get(key)?.get(observation.value) ?? [FEATURE_PROCEDURES[key]];
  const home = stageOf(key);
  const required = maxStageOfProcedures(procedures, home);
  return stageRank(required) > stageRank(home) ? required : undefined;
}

/* ------------------------------ Następne pytanie --------------------------- */

export function nextQuestion({ gate, ranking, progress, pinned }: NextQuestionInput): QuizQuestion | null {
  if (pinned) return questionFor(pinned, gate);

  const reached = reachedRank(progress);
  const hidden = hiddenStages(progress.skippedStages);
  const context: StageContext = {
    gate,
    progress,
    hidden,
    harmless: [...ranking.exact, ...ranking.partial].map((entry) => entry.species),
    pool: visibleSpecies(ranking),
  };
  for (const stage of STAGE_ORDER) {
    if (hidden.has(stage)) continue;
    const narrowingAllowed = stageRank(stage) >= reached || progress.reopened.has(stage);
    const question = questionInStage(stage, context, narrowingAllowed);
    if (question) return question;
  }
  return null;
}

export function pendingStage(key: QuizKey, progress: QuizProgressView, hidden = hiddenStages(progress.skippedStages)): QuizStage | null {
  if (answeredKeys(progress.selections).has(key)) return null;
  const home = stageOf(key);
  const skippedAt = progress.skipped.get(key);
  if (!hidden.has(home) && skippedAt === undefined) return home;
  const carry = CARRY_OVER[key];
  return carry !== undefined && !hidden.has(carry) && skippedAt !== carry ? carry : null;
}


export function remainingInStage(stage: QuizStage, progress: QuizProgressView): readonly QuizKey[] {
  const hidden = hiddenStages(progress.skippedStages);
  return keysAskedIn(stage).filter((key) => pendingStage(key, progress, hidden) === stage && isApplicable(key, progress.selections));
}

export interface SkippedGroup {
  readonly stage: QuizStage;
  readonly whole: boolean;
  readonly hides: readonly QuizStage[];
  readonly keys: readonly QuizKey[];
}

export function skippedOverview(progress: QuizProgressView): readonly SkippedGroup[] {
  const hidden = hiddenStages(progress.skippedStages);
  return STAGE_ORDER.flatMap((stage): SkippedGroup[] => {
    if (progress.skippedStages.has(stage)) {
      return [{ stage, whole: true, hides: STAGE_HIDES[stage] ?? [], keys: [] }];
    }
    if (hidden.has(stage)) return [];
    const keys = keysAskedIn(stage).filter(
      (key) => progress.skipped.get(key) === stage && isApplicable(key, progress.selections),
    );
    return keys.length > 0 ? [{ stage, whole: false, hides: [], keys }] : [];
  });
}

export function skippedCount(groups: readonly SkippedGroup[], except: QuizKey | null = null): number {
  return groups.reduce((sum, group) => sum + (group.whole ? 1 : group.keys.filter((key) => key !== except).length), 0);
}

export function revisitStage(key: QuizKey, progress: QuizProgressView): QuizStage {
  const carry = CARRY_OVER[key];
  const hidden = hiddenStages(progress.skippedStages);
  if (carry !== undefined && !hidden.has(carry) && reachedRank(progress) >= stageRank(carry)) return carry;
  return progress.skipped.get(key) ?? stageOf(key);
}

export function confirmStage(key: QuizKey, progress: QuizProgressView): QuizStage {
  const review = reviewStageFor(key, progress.selections);
  return review !== undefined && !hiddenStages(progress.skippedStages).has(review) ? review : stageOf(key);
}

export function cutPerformed(progress: Pick<QuizProgressView, 'selections' | 'answeredIn'>): boolean {
  const answered = answeredKeys(progress.selections);
  return (
    STAGE_SEQUENCE.cut.some((key) => answered.has(key)) ||
    [...progress.answeredIn].some(([key, stage]) => stage === 'cut' && answered.has(key))
  );
}

export function pendingDigQuestion(progress: QuizProgressView): QuizKey | null {
  if (!hasStipe(progress.selections.features) || hiddenStages(progress.skippedStages).has('dig_base')) return null;
  return (['volva', 'stipeBase'] as const).find((key) => progress.skipped.get(key) === 'dig_base') ?? null;
}

export function reviewableIn(stage: QuizStage, progress: QuizProgressView): readonly QuizKey[] {
  const answered = answeredKeys(progress.selections);
  return POSSIBLE_REVIEW_KEYS.filter(
    (key) =>
      !isEnvironmentKey(key) &&
      reviewStageFor(key, progress.selections) === stage &&
      answered.has(key) &&
      progress.selections.features[key]?.certainty === 'uncertain' &&
      progress.answeredIn.get(key) !== stage &&
      isApplicable(key, progress.selections),
  );
}

export function answeredKeys({ features, trees, substrate, habitat }: FilterSelections): ReadonlySet<FilterKey> {
  const keys = new Set<FilterKey>(FEATURE_KEYS.filter((key) => features[key] !== undefined));
  if (trees) keys.add('trees');
  if (substrate) keys.add('substrate');
  if (habitat) keys.add('habitat');
  return keys;
}

const DATA_ONLY_VALUES: { readonly [K in FeatureKey]?: ReadonlySet<FeatureValueMap[K]> } = {
  capColor: new Set(['none']),
  hymenophoreColor: new Set(['none']),
  stipeColor: new Set(['none']),
  capFleshColor: new Set(['none']),
  stipeFleshColor: new Set(['none', 'not_applicable']),
  stipeShape: new Set(['absent']),
  stipeSurface: new Set(['not_applicable']),
  stipeInterior: new Set(['not_applicable']),
  stipeBase: new Set(['not_applicable']),
  stipeFleshColorChange: new Set(['not_applicable']),
  gillAttachment: new Set(['not_applicable']),
};

export function orderedOptions<K extends FeatureKey>(
  key: K,
  pool: readonly IndexedSpecies[],
): { readonly likely: readonly FeatureValueMap[K][]; readonly other: readonly FeatureValueMap[K][] } {
  const union = pool.reduce((mask, species) => mask | species.masks[key], 0);
  const vocabulary: readonly FeatureValueMap[K][] = FEATURE_VOCABULARIES[key];
  const hidden: ReadonlySet<FeatureValueMap[K]> | undefined = DATA_ONLY_VALUES[key];
  const offered = (value: FeatureValueMap[K]) => !hidden?.has(value);
  return {
    likely: vocabulary.filter((value, bit) => offered(value) && (union & (1 << bit)) !== 0),
    other: vocabulary.filter((value, bit) => offered(value) && (union & (1 << bit)) === 0),
  };
}

/* -------------------------------- Kroki ----------------------------------- */

interface StageContext {
  readonly gate: FilterResult;
  readonly progress: QuizProgressView;
  readonly hidden: ReadonlySet<QuizStage>;
  readonly harmless: readonly IndexedSpecies[];
  readonly pool: readonly IndexedSpecies[];
}

function questionInStage(stage: QuizStage, context: StageContext, narrowingAllowed: boolean): QuizQuestion | null {
  const { gate, progress, hidden, harmless, pool } = context;
  const { selections } = progress;
  for (const key of keysAskedIn(stage)) {
    if (!isApplicable(key, selections)) continue;

    if (reviewableIn(stage, progress).includes(key) && !isEnvironmentKey(key)) {
      const check = pendingCheck(gate, key);
      if (check && selections.features[key]?.certainty === 'uncertain') return { kind: 'safety', key: check.feature, stage, check };
      continue;
    }
    if (pendingStage(key, progress, hidden) !== stage) continue;

    if (isEnvironmentKey(key)) {
      if (narrowingAllowed && narrowsEnvironment(key, harmless)) return { kind: 'environment', key, stage: 'place' };
      continue;
    }

    const check = pendingCheck(gate, key);
    if (check) return { kind: 'safety', key: check.feature, stage, check };
    if (narrowingAllowed && narrows(key, pool)) return { kind: 'narrowing', key, stage };
  }
  return null;
}

function pendingCheck(gate: FilterResult, key: QuizKey): CriticalCheck | undefined {
  return gate.status === 'verification_required' ? gate.pendingChecks.find((check) => check.feature === key) : undefined;
}

function questionFor({ key, stage }: QuizPin, gate: FilterResult): QuizQuestion {
  if (isEnvironmentKey(key)) return { kind: 'environment', key, stage: 'place' };
  const check = pendingCheck(gate, key);
  return check ? { kind: 'safety', key: check.feature, stage, check } : { kind: 'narrowing', key, stage };
}

function reachedRank({ selections, skipped, skippedStages, answeredIn }: QuizProgressView): number {
  const answered = answeredKeys(selections);
  const stages = [
    ...[...answered].filter(isQuizKey).map((key) => answeredIn.get(key) ?? stageOf(key)),
    ...skipped.values(),
    ...skippedStages,
  ];
  return Math.max(0, ...stages.map(stageRank));
}

function narrowsEnvironment(key: EnvironmentKey, harmless: readonly IndexedSpecies[]): boolean {
  switch (key) {
    case 'habitat':
      return HABITATS.some((habitat) => harmless.some((species) => !species.habitats.has(habitat)));
    case 'substrate':
      return SUBSTRATE_GROUPS.some((group) => harmless.some((species) => !species.substrateGroups.has(group)));
    case 'trees':
      return harmless.some((species) => species.treePartners !== null && species.treePartners.size < TREE_GENERA.length);
  }
}

function narrows(key: QuizFeatureKey, pool: readonly IndexedSpecies[]): boolean {
  return pool.length >= 2 && worstCaseRemaining(pool, key) < pool.length;
}

function isQuizKey(key: FilterKey): key is QuizKey {
  return key !== 'taste';
}
