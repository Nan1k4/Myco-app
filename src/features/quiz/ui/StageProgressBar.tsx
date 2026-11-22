import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FILLS, RADIUS, SPACE, TYPE } from '../../../theme';
import { QUESTION_FORMS, STAGE_COPY_PL, pluralPl } from '../copy.pl';
import { STAGE_ORDER, type QuizStage } from '../engine';

interface StageProgressBarProps {
  readonly current: QuizStage;
  readonly remaining: number;
}

/** 7-segmentowy pasek etapów quizu — orientacja bez fałszywej liczby pytań. */
export function StageProgressBar({ current, remaining }: StageProgressBarProps) {
  const activeIndex = STAGE_ORDER.indexOf(current);

  return (
    <View style={styles.root}>
      <View style={styles.segments} accessibilityRole="progressbar" accessibilityValue={{ min: 1, max: STAGE_ORDER.length, now: activeIndex + 1 }}>
        {STAGE_ORDER.map((stage, index) => {
          const isCurrent = index === activeIndex;
          const isDone = index < activeIndex;
          return (
            <View
              key={stage}
              style={[styles.segment, isDone && styles.done, isCurrent && styles.current]}
            />
          );
        })}
      </View>
      <View style={styles.meta}>
        <Text style={styles.eyebrow}>{STAGE_COPY_PL[current].eyebrow}</Text>
        {remaining > 1 ? (
          <Text style={styles.remaining}>
            {remaining} {pluralPl(remaining, QUESTION_FORMS)}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: SPACE.s },
  segments: { flexDirection: 'row', gap: SPACE.xs },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: RADIUS.pill,
    backgroundColor: FILLS.neutral,
  },
  done: { backgroundColor: FILLS.primary, opacity: 1 },
  current: { backgroundColor: COLORS.primary },
  meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: SPACE.s },
  eyebrow: { ...TYPE.overline, color: COLORS.primary },
  remaining: { ...TYPE.caption, color: COLORS.textMuted, fontVariant: ['tabular-nums'] },
});