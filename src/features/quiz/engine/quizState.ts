/**
 * @file Stan quizu (czysty reducer dla `useReducer`): odpowiedzi, pominięcia, cofanie, próg.
 *
 * Akcja `answer` niesie funkcję `apply` zamiast surowej pary klucz–wartość: tylko kreatory
 * ({@link answerFeature} itd.) wiążą typ wartości z kluczem, więc reducer nie potrzebuje rzutowań.
 * To akcje lokalnego `useReducer` – nie są serializowane.
 *
 * @module features/quiz/engine/quizState
 */
import {
  type FeatureObservation,
  type FeatureValueMap,
  type FilterSelections,
  type Habitat,
  type NonEmptyArray,
  type SubstrateGroup,
  type TreeGenus,
} from '../../../domain';
import { EMPTY_SELECTIONS, withFeature } from '../../filter/selections';
import { STAGE_HIDES, type QuizFeatureKey, type QuizKey, type QuizPin, type QuizProgressView, type QuizStage, type SkipLog } from './quizEngine';
import { THRESHOLD, normalizeThreshold } from './similarity';

export type QuizPhase = 'intro' | 'questions' | 'results';
/** Kierunek ostatniego ruchu – animacja przejścia („Wstecz” wjeżdża z lewej). */
export type QuizDirection = 'forward' | 'back';

/** Część stanu cofana przez „Wstecz”. Próg i faza nie są historią odpowiedzi. */
interface QuizProgress extends QuizProgressView {
  readonly pinned: QuizPin | null;
  /** Etapy, w których użytkownik wybrał „Tylko to pytanie” – nie proponujemy mu już pominięcia etapu. */
  readonly singleSkipStages: ReadonlySet<QuizStage>;
}

export interface QuizState extends QuizProgress {
  readonly phase: QuizPhase;
  /** [0,5; 1], krok 0,05. Dotyczy wyłącznie listy częściowych dopasowań. */
  readonly threshold: number;
  readonly direction: QuizDirection;
  readonly history: readonly QuizProgress[];
}

export type QuizAction =
  | { readonly type: 'start' }
  | {
      readonly type: 'answer';
      readonly key: QuizKey;
      readonly stage: QuizStage;
      readonly apply: (selections: FilterSelections) => FilterSelections;
    }
  /** Pytanie pominięte w etapie `stage` (przyczep blaszek „Sprawdź przy przekroju” – też). */
  | { readonly type: 'skip'; readonly key: QuizKey; readonly stage: QuizStage }
  /** „Tylko to pytanie” w etapie, w którym zaproponowano pominięcie całego etapu. */
  | { readonly type: 'skip_single'; readonly key: QuizKey; readonly stage: QuizStage }
  /** Cały etap – jeden krok „Wstecz”. */
  | { readonly type: 'skip_stage'; readonly stage: QuizStage }
  | { readonly type: 'undo' }
  | { readonly type: 'show_results' }
  | { readonly type: 'resume' }
  | { readonly type: 'revisit'; readonly key: QuizKey; readonly stage: QuizStage }
  /** „Wróć do etapu”: etap (i ukryte przez niego) wraca razem z pytaniami pominiętymi w nim pojedynczo. */
  | { readonly type: 'revisit_stage'; readonly stage: QuizStage }
  | { readonly type: 'set_threshold'; readonly value: number }
  | { readonly type: 'reset' };

const NO_SKIPS: SkipLog = new Map();

export const INITIAL_QUIZ_STATE: QuizState = {
  phase: 'intro',
  selections: EMPTY_SELECTIONS,
  skipped: NO_SKIPS,
  skippedStages: new Set(),
  reopened: new Set(),
  answeredIn: new Map(),
  pinned: null,
  threshold: THRESHOLD.default,
  direction: 'forward',
  singleSkipStages: new Set(),
  history: [],
};

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'start':
      return { ...state, phase: 'questions', direction: 'forward' };
    case 'answer':
      return {
        ...withCheckpoint(state),
        phase: 'questions',
        direction: 'forward',
        selections: action.apply(state.selections),
        answeredIn: new Map(state.answeredIn).set(action.key, action.stage),
        skipped: without(state.skipped, action.key),
        pinned: null,
      };
    case 'skip':
      return {
        ...withCheckpoint(state),
        direction: 'forward',
        skipped: new Map(state.skipped).set(action.key, action.stage),
        pinned: null,
      };
    case 'skip_single':
      return {
        ...quizReducer(state, { type: 'skip', key: action.key, stage: action.stage }),
        singleSkipStages: new Set([...state.singleSkipStages, action.stage]),
      };
    case 'skip_stage':
      return {
        ...withCheckpoint(state),
        direction: 'forward',
        skippedStages: new Set([...state.skippedStages, action.stage]),
        reopened: withoutAll(state.reopened, [action.stage]),
        pinned: null,
      };
    case 'undo': {
      const previous = state.history[state.history.length - 1];
      if (!previous) return state;
      return { ...state, ...previous, phase: 'questions', direction: 'back', history: state.history.slice(0, -1) };
    }
    case 'show_results':
      return { ...state, phase: 'results', direction: 'forward', pinned: null };
    case 'resume':
      return { ...state, phase: 'questions', direction: 'back' };
    case 'revisit':
      return {
        ...withCheckpoint(state),
        phase: 'questions',
        direction: 'forward',
        pinned: { key: action.key, stage: action.stage },
      };
    case 'revisit_stage': {
      const { stage } = action;
      const skipped = new Map([...state.skipped].filter(([, at]) => at !== stage));
      return {
        ...withCheckpoint(state),
        phase: 'questions',
        direction: 'forward',
        skippedStages: withoutAll(state.skippedStages, [stage]),
        skipped,
        reopened: new Set([...state.reopened, stage, ...(STAGE_HIDES[stage] ?? [])]),
        singleSkipStages: withoutAll(state.singleSkipStages, [stage]),
        pinned: null,
      };
    }
    case 'set_threshold':
      return { ...state, threshold: normalizeThreshold(action.value) };
    case 'reset':
      // Próg to preferencja użytkownika, nie odpowiedź – zostaje. Wstęp już przeczytany – pomijamy.
      return { ...INITIAL_QUIZ_STATE, phase: 'questions', threshold: state.threshold };
  }
}

/* ------------------------------- Kreatory ---------------------------------- */

export function answerFeature<K extends QuizFeatureKey>(
  key: K,
  observation: FeatureObservation<FeatureValueMap[K]>,
  stage: QuizStage,
): QuizAction {
  return { type: 'answer', key, stage, apply: (selections) => withFeature(selections, key, observation) };
}

export function answerHabitat(habitat: Habitat): QuizAction {
  return { type: 'answer', key: 'habitat', stage: 'place', apply: (selections) => ({ ...selections, habitat }) };
}

export function answerSubstrate(substrate: SubstrateGroup): QuizAction {
  return { type: 'answer', key: 'substrate', stage: 'place', apply: (selections) => ({ ...selections, substrate }) };
}

export function answerTrees(trees: NonEmptyArray<TreeGenus>): QuizAction {
  return { type: 'answer', key: 'trees', stage: 'place', apply: (selections) => ({ ...selections, trees }) };
}

/* -------------------------------- Narzędzia -------------------------------- */

function withCheckpoint(state: QuizState): QuizState {
  const { selections, skipped, skippedStages, reopened, answeredIn, pinned, singleSkipStages } = state;
  return {
    ...state,
    history: [...state.history, { selections, skipped, skippedStages, reopened, answeredIn, pinned, singleSkipStages }],
  };
}

function without(log: SkipLog, key: QuizKey): SkipLog {
  if (!log.has(key)) return log;
  const next = new Map(log);
  next.delete(key);
  return next;
}

function withoutAll<T>(set: ReadonlySet<T>, items: readonly T[]): ReadonlySet<T> {
  if (!items.some((item) => set.has(item))) return set;
  return new Set([...set].filter((item) => !items.includes(item)));
}
