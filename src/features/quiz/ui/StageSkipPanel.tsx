import { StyleSheet, Text } from 'react-native';
import { Button } from '../../../components/Button';
import { FILTER_KEY_LABELS_PL } from '../../../i18n/pl';
import { COLORS, SPACE, TYPE } from '../../../theme';
import { STAGE_SKIP_PL } from '../copy.pl';
import type { QuizKey, QuizStage } from '../engine';
import { BottomPanel } from './BottomPanel';

interface StageSkipPanelProps {
  readonly stage: QuizStage;
  readonly keys: readonly QuizKey[];
  readonly effects: readonly string[];
  readonly onSkipStage: () => void;
  readonly onSkipOne: (() => void) | null;
  readonly onCancel: () => void;
}

export function StageSkipPanel({ stage, keys, effects, onSkipStage, onSkipOne, onCancel }: StageSkipPanelProps) {
  return (
    <BottomPanel backdrop onDismiss={onCancel}>
      <Text style={styles.title} accessibilityRole="header">
        {STAGE_SKIP_PL.title(stage)}
      </Text>
      {keys.length > 0 ? <Text style={styles.caption}>{keys.map((key) => FILTER_KEY_LABELS_PL[key]).join(' · ')}</Text> : null}
      {effects.map((effect) => (
        <Text key={effect} style={styles.effect}>
          {effect}
        </Text>
      ))}
      <Button label={STAGE_SKIP_PL.skipStage} onPress={onSkipStage} />
      {onSkipOne ? <Button label={STAGE_SKIP_PL.skipOne} variant="surface" onPress={onSkipOne} /> : null}
      <Button label={STAGE_SKIP_PL.cancel} variant="plain" onPress={onCancel} />
    </BottomPanel>
  );
}

const styles = StyleSheet.create({
  title: { ...TYPE.title3, color: COLORS.text },
  caption: { ...TYPE.footnote, color: COLORS.textMuted },
  effect: { ...TYPE.subhead, color: COLORS.text, marginBottom: SPACE.xs },
});