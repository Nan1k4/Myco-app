import { useState, type Dispatch } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../../components/Button';
import {
  HABITATS,
  SUBSTRATE_GROUPS,
  TREE_GENERA,
  toNonEmptyArray,
  type FilterSelections,
  type Habitat,
  type NonEmptyArray,
  type SubstrateGroup,
  type TreeGenus,
} from '../../../domain';
import { FILTER_KEY_LABELS_PL, HABITAT_LABELS_PL, SUBSTRATE_GROUP_LABELS_PL, TREE_LABELS_PL } from '../../../i18n/pl';
import { SPACE } from '../../../theme';
import { DEFER_COPY_PL, REVIEW_COPY_PL, STAGE_COPY_PL, STAGE_SKIP_PL } from '../copy.pl';
import {
  CARRY_OVER,
  answerHabitat,
  answerSubstrate,
  answerTrees,
  cutPerformed,
  hasStipe,
  hiddenStages,
  isKeySkippable,
  isStageSkippable,
  pendingDigQuestion,
  remainingInStage,
  reviewableIn,
  revisitStage,
  skippedOverview,
  stageOf,
  type EnvironmentKey,
  type IndexedSpecies,
  type QuizAction,
  type QuizKey,
  type QuizQuestion,
  type QuizStage,
  type QuizState,
} from '../engine';
import { BottomPanel } from './BottomPanel';
import { FeatureQuestion } from './FeatureQuestion';
import { OptionRow } from './OptionRow';
import { QuestionLayout, type QuestionFrame, type StageSkipOffer } from './QuestionLayout';

interface QuestionViewProps {
  readonly question: QuizQuestion;
  readonly state: QuizState;
  /** Widoczni kandydaci – kolejność opcji. */
  readonly pool: readonly IndexedSpecies[];
  readonly dispatch: Dispatch<QuizAction>;
}

export function QuestionView({ question, state, pool, dispatch }: QuestionViewProps) {
  const frame = buildFrame(question, state, dispatch);
  const { selections } = state;

  switch (question.kind) {
    case 'environment':
      return <EnvironmentQuestion environmentKey={question.key} frame={frame} selections={selections} onAnswer={dispatch} />;
    case 'safety':
    case 'narrowing':
      return (
        <FeatureQuestion
          featureKey={question.key}
          stage={question.stage}
          check={question.kind === 'safety' ? question.check : null}
          current={selections.features[question.key]}
          pool={pool}
          onAnswer={dispatch}
          frame={frame}
        />
      );
  }
}

/** Wszystko, co ekran pytania wie o przebiegu quizu – w jednym miejscu, bez logiki w widokach. */
function buildFrame(question: QuizQuestion, state: QuizState, dispatch: Dispatch<QuizAction>): QuestionFrame {
  const { key, stage } = question;
  const { selections, singleSkipStages } = state;
  const hidden = hiddenStages(state.skippedStages);
  const remaining = remainingInStage(stage, state);
  const cutDone = cutPerformed(state);
  const cutVisited = cutDone || [...state.skipped.values()].includes('cut');
  const revisit = (target: QuizKey, at: QuizStage = revisitStage(target, state)) =>
    dispatch({ type: 'revisit', key: target, stage: at });

  const deferTo = CARRY_OVER[key];
  const deferCopy = DEFER_COPY_PL[key];
  const reviewKey = reviewableIn(stage, state).find((candidate) => candidate !== key);
  const reviewCopy = reviewKey ? REVIEW_COPY_PL[reviewKey] : undefined;

  return {
    key,
    stage,
    remaining: remaining.length,
    onSkip: isKeySkippable(key) ? () => dispatch({ type: 'skip', key, stage }) : null,
    onSkipSingle: () => dispatch({ type: 'skip_single', key, stage }),
    stageSkip: isStageSkippable(stage) ? stageSkipOffer(stage, remaining, cutDone, hidden, !singleSkipStages.has(stage), dispatch) : null,
    skipped: skippedOverview(state)
      .map((group) => ({ ...group, keys: group.keys.filter((skippedKey) => skippedKey !== key) }))
      .filter((group) => group.whole || group.keys.length > 0),
    onRevisit: (target) => revisit(target),
    onRevisitStage: (target) => dispatch({ type: 'revisit_stage', stage: target }),
    cutDone,
    cutVisited,
    stipe: hasStipe(selections.features),
    pendingDig: pendingDigQuestion(state),
    defer:
      deferCopy && deferTo && stage === stageOf(key) && !hidden.has(deferTo)
        ? { text: deferCopy.note, label: deferCopy.action, onPress: () => dispatch({ type: 'skip', key, stage }) }
        : null,
    review:
      reviewKey && reviewCopy
        ? { text: reviewCopy.text, label: reviewCopy.action, onPress: () => revisit(reviewKey, stage) }
        : null,
  };
}

function stageSkipOffer(
  stage: QuizStage,
  remaining: readonly QuizKey[],
  cutDone: boolean,
  hidden: ReadonlySet<QuizStage>,
  offerOnSkip: boolean,
  dispatch: Dispatch<QuizAction>,
): StageSkipOffer {
  const { skipEffect } = STAGE_COPY_PL[stage];
  // „Zapach i wysyp bez przekroju” nie ma sensu, gdy przekrój już zrobiono.
  const effect = skipEffect && !(stage === 'cut' && cutDone) ? [skipEffect] : [];
  const carried = remaining.flatMap((key) => {
    const target = CARRY_OVER[key];
    return target && target !== stage && !hidden.has(target) ? [STAGE_SKIP_PL.carried(FILTER_KEY_LABELS_PL[key], target)] : [];
  });
  const effects = [...effect, ...carried];
  return {
    keys: remaining,
    effects,
    // Przy jednym pytaniu bez skutków ubocznych „cały etap” = „to pytanie” – nie pytamy.
    onQuestionSkip: offerOnSkip && (remaining.length > 1 || effects.length > 0),
    onSkipStage: () => dispatch({ type: 'skip_stage', stage }),
  };
}

function EnvironmentQuestion({
  environmentKey,
  frame,
  selections,
  onAnswer,
}: {
  readonly environmentKey: EnvironmentKey;
  readonly frame: QuestionFrame;
  readonly selections: FilterSelections;
  readonly onAnswer: (action: QuizAction) => void;
}) {
  switch (environmentKey) {
    case 'habitat':
      return <HabitatQuestion frame={frame} current={selections.habitat} onAnswer={onAnswer} />;
    case 'substrate':
      return <SubstrateQuestion frame={frame} current={selections.substrate} onAnswer={onAnswer} />;
    case 'trees':
      return <TreesQuestion frame={frame} current={selections.trees} onAnswer={onAnswer} />;
  }
}

interface EnvironmentProps<T> {
  readonly frame: QuestionFrame;
  readonly current: T | undefined;
  readonly onAnswer: (action: QuizAction) => void;
}

function HabitatQuestion({ frame, current, onAnswer }: EnvironmentProps<Habitat>) {
  return (
    <QuestionLayout frame={frame}>
      <View style={styles.list} accessibilityRole="radiogroup">
        {HABITATS.map((habitat) => (
          <OptionRow
            key={habitat}
            label={HABITAT_LABELS_PL[habitat]}
            selected={habitat === current}
            onPress={() => onAnswer(answerHabitat(habitat))}
          />
        ))}
      </View>
    </QuestionLayout>
  );
}

function SubstrateQuestion({ frame, current, onAnswer }: EnvironmentProps<SubstrateGroup>) {
  return (
    <QuestionLayout frame={frame}>
      <View style={styles.list} accessibilityRole="radiogroup">
        {SUBSTRATE_GROUPS.map((group) => (
          <OptionRow
            key={group}
            label={SUBSTRATE_GROUP_LABELS_PL[group]}
            selected={group === current}
            onPress={() => onAnswer(answerSubstrate(group))}
          />
        ))}
      </View>
    </QuestionLayout>
  );
}

/** Wielokrotny wybór: siatka 2 kolumn + „Dalej” w panelu u dołu. */
function TreesQuestion({ frame, current, onAnswer }: EnvironmentProps<NonEmptyArray<TreeGenus>>) {
  const [picked, setPicked] = useState<readonly TreeGenus[]>(current ?? []);
  const trees = toNonEmptyArray(picked);
  // „Brak drzew” wyklucza się z drzewami – zaznaczenie jednego odznacza drugie.
  const toggle = (tree: TreeGenus) =>
    setPicked((list) => {
      if (list.includes(tree)) return list.filter((t) => t !== tree);
      return tree === 'none' ? ['none'] : [...list.filter((t) => t !== 'none'), tree];
    });

  const footer = (
    <BottomPanel>
      <Button
        label={trees ? `Dalej · ${trees.length}` : 'Zaznacz co najmniej jedno'}
        disabled={!trees}
        onPress={() => {
          if (trees) onAnswer(answerTrees(trees));
        }}
      />
    </BottomPanel>
  );

  return (
    <QuestionLayout frame={frame} footer={footer}>
      <View style={styles.grid}>
        {TREE_GENERA.map((tree) => (
          <OptionRow
            key={tree}
            label={TREE_LABELS_PL[tree]}
            selected={picked.includes(tree)}
            multiple
            compact
            onPress={() => toggle(tree)}
          />
        ))}
      </View>
    </QuestionLayout>
  );
}

const styles = StyleSheet.create({
  list: { gap: SPACE.s },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.s },
});
