import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  requiredProcedures,
  type CriticalCheck,
  type FeatureObservation,
  type FeatureValueMap,
} from '../../../domain';
import { featureValueLabel } from '../../../i18n/featureValues.pl';
import { SPACE } from '../../../theme';
import { swatchOf } from '../../atlas/swatches';
import {
  answerFeature,
  canConfirmIn,
  orderedOptions,
  type IndexedSpecies,
  type QuizAction,
  type QuizFeatureKey,
  type QuizStage,
} from '../engine';
import { CertaintyStep } from './CertaintyStep';
import { OptionRow } from './OptionRow';
import { QuestionLayout, type QuestionFrame } from './QuestionLayout';

const PINNED_FIRST: { readonly [K in QuizFeatureKey]?: FeatureValueMap[K] } = {
  smell: 'none',
  stipeInterior: 'hollow',
  stipeColor: 'not_applicable',
};

interface FeatureQuestionProps<K extends QuizFeatureKey> {
  readonly featureKey: K;
  readonly stage: QuizStage;
  readonly check: CriticalCheck | null;
  readonly current: FeatureObservation<FeatureValueMap[K]> | undefined;
  readonly pool: readonly IndexedSpecies[];
  readonly onAnswer: (action: QuizAction) => void;
  readonly frame: QuestionFrame;
}

export function FeatureQuestion<K extends QuizFeatureKey>({
  featureKey,
  stage,
  check,
  current,
  pool,
  onAnswer,
  frame,
}: FeatureQuestionProps<K>) {
  const [pending, setPending] = useState<FeatureValueMap[K] | null>(current?.value ?? null);

  const options = useMemo(() => {
    const { likely, other } = orderedOptions(featureKey, pool);
    const merged = [...likely, ...other];
    const pinned = PINNED_FIRST[featureKey];
    if (!pinned || !merged.includes(pinned)) return merged;
    return [pinned, ...merged.filter((value) => value !== pinned)];
  }, [featureKey, pool]);

  const choose = (value: FeatureValueMap[K]) => {
    if (canConfirmIn(featureKey, stage, value)) {
      setPending(value);
    } else {
      setPending(null);
      onAnswer(answerFeature(featureKey, { value, certainty: 'uncertain' }, stage));
    }
  };

  const footer =
    pending !== null && canConfirmIn(featureKey, stage, pending) ? (
      <CertaintyStep
        procedures={requiredProcedures(featureKey, pending)}
        onAnswer={(certainty) => onAnswer(answerFeature(featureKey, { value: pending, certainty }, stage))}
      />
    ) : null;

  return (
    <QuestionLayout frame={frame} check={check} footer={footer}>
      <View style={styles.options} accessibilityRole="radiogroup">
        {options.map((value) => (
          <OptionRow
            key={value}
            label={featureValueLabel(featureKey, value)}
            swatch={swatchOf(featureKey, value)}
            selected={value === pending}
            onPress={() => choose(value)}
          />
        ))}
      </View>
    </QuestionLayout>
  );
}

const styles = StyleSheet.create({
  options: { gap: SPACE.s },
});