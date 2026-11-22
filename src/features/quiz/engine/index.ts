/**
 * @file Publiczne API silnika quizu.
 *
 * Użycie (ekran):
 *   gate     = evaluateFilter(index, selections)                 – zależy tylko od odpowiedzi
 *   ranking  = rankBySimilarity(index.species, selections, próg)  – zależy też od suwaka
 *   question = nextQuestion({ gate, ranking, progress: state, pinned: state.pinned })
 */
export { evaluateFilter, buildFilterIndex, type FilterIndex } from '../../filter/engine';
export type { IndexedSpecies } from '../../filter/engine/filterIndex';
export {
  CARRY_OVER,
  EMPTY_PROGRESS,
  STAGE_HIDES,
  STAGE_ORDER,
  STAGE_SEQUENCE,
  answeredKeys,
  canConfirmIn,
  confirmStage,
  cutPerformed,
  hasStipe,
  hiddenStages,
  isApplicable,
  isEnvironmentKey,
  isKeySkippable,
  isNoContactStage,
  isQuizFeatureKey,
  isStageSkippable,
  nextQuestion,
  orderedOptions,
  pendingDigQuestion,
  remainingInStage,
  reviewableIn,
  revisitStage,
  skippedCount,
  skippedOverview,
  stageOf,
  type EnvironmentKey,
  type QuizPin,
  type QuizProgressView,
  type SkipLog,
  type SkippedGroup,
  type QuizStage,
  type QuizFeatureKey,
  type QuizKey,
  type QuizQuestion,
} from './quizEngine';
export {
  INITIAL_QUIZ_STATE,
  answerFeature,
  answerHabitat,
  answerSubstrate,
  answerTrees,
  quizReducer,
  type QuizAction,
  type QuizDirection,
  type QuizPhase,
  type QuizState,
} from './quizState';
export {
  SIMILARITY,
  THRESHOLD,
  hiddenCount,
  normalizeThreshold,
  rankBySimilarity,
  visibleSpecies,
  type SimilarityEntry,
  type SimilarityRanking,
} from './similarity';
