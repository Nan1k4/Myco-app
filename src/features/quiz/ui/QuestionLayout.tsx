import { useState, type ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { Icon } from '../../../components/icons/Icon';
import { Button } from '../../../components/Button';
import { StatusBanner } from '../../../components/ui';
import type { CriticalCheck } from '../../../domain';
import { COLORS, FILLS, RADIUS, SPACE, TYPE } from '../../../theme';
import { DIG_NOTICE_PL, QUESTION_COPY_PL, questionHint } from '../copy.pl';
import { skippedCount, type QuizKey, type QuizStage, type SkippedGroup } from '../engine';
import { SkippedPanel } from './SkippedPanel';
import { StageCard, type CardAction } from './StageCard';
import { StageProgressBar } from './StageProgressBar';
import { StageSkipPanel } from './StageSkipPanel';

export interface StageSkipOffer {
  readonly keys: readonly QuizKey[];
  readonly effects: readonly string[];
  readonly onQuestionSkip: boolean;
  readonly onSkipStage: () => void;
}

export interface QuestionFrame {
  readonly key: QuizKey;
  readonly stage: QuizStage;
  readonly remaining: number;
  readonly onSkip: (() => void) | null;
  readonly onSkipSingle: () => void;
  readonly stageSkip: StageSkipOffer | null;
  readonly skipped: readonly SkippedGroup[];
  readonly onRevisit: (key: QuizKey) => void;
  readonly onRevisitStage: (stage: QuizStage) => void;
  readonly cutDone: boolean;
  readonly cutVisited: boolean;
  readonly stipe: boolean;
  readonly pendingDig: QuizKey | null;
  readonly defer: CardAction | null;
  readonly review: CardAction | null;
}

interface QuestionLayoutProps {
  readonly frame: QuestionFrame;
  readonly check?: CriticalCheck | null;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
}

type Overlay = { readonly kind: 'none' } | { readonly kind: 'stage_skip'; readonly fromQuestion: boolean } | { readonly kind: 'skipped' };

const NONE: Overlay = { kind: 'none' };

export function QuestionLayout({ frame, check = null, children, footer = null }: QuestionLayoutProps) {
  const [overlay, setOverlay] = useState<Overlay>(NONE);
  const copy = QUESTION_COPY_PL[frame.key];
  const { stageSkip, onSkip } = frame;
  const skippedTotal = skippedCount(frame.skipped);
  const close = () => setOverlay(NONE);

  const skip = onSkip
    ? () => (stageSkip?.onQuestionSkip ? setOverlay({ kind: 'stage_skip', fromQuestion: true }) : onSkip())
    : null;

  return (
    <View style={styles.root}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <StageProgressBar current={frame.stage} remaining={frame.remaining} />

        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">
            {copy.title}
          </Text>
          <Text style={styles.hint}>{questionHint(frame.key, frame.stage, frame.stipe)}</Text>
          {copy.details ? (
            <View style={styles.details}>
              {copy.details.map((line) => (
                <Text key={line} style={styles.detail}>
                  • {line}
                </Text>
              ))}
            </View>
          ) : null}
        </View>

        {frame.stage === 'cut' && frame.pendingDig ? (
          frame.cutVisited ? (
            <Pressable
              onPress={() => frame.pendingDig && frame.onRevisit(frame.pendingDig)}
              accessibilityRole="button"
              style={({ pressed }) => [styles.digCompact, pressed && styles.pressed]}
            >
              <Icon name="info" size={15} color={COLORS.textMuted} />
              <Text style={styles.digCompactText} numberOfLines={1} ellipsizeMode="tail">
                Pominięto wykopanie podstawy · {DIG_NOTICE_PL.action}
              </Text>
              <Icon name="chevron-forward" size={14} color={COLORS.textSubtle} />
            </Pressable>
          ) : (
            <StatusBanner
              tone="warning"
              message={DIG_NOTICE_PL.text}
              action={{
                label: DIG_NOTICE_PL.action,
                onPress: () => frame.pendingDig && frame.onRevisit(frame.pendingDig),
              }}
            />
          )
        ) : null}

        <StageCard
          stage={frame.stage}
          cutDone={frame.cutDone}
          cutVisited={frame.cutVisited}
          check={check}
          review={frame.review}
          onSkipStage={stageSkip ? () => setOverlay({ kind: 'stage_skip', fromQuestion: false }) : null}
        />

        {children}

        {frame.defer ? <Text style={styles.deferHint}>{frame.defer.text}</Text> : null}

        <View style={styles.secondaryActions}>
          {frame.defer ? <Button label={frame.defer.label} variant="tinted" onPress={frame.defer.onPress} /> : null}
          {skip ? <Button label="Pomiń pytanie" variant="plain" onPress={skip} /> : null}
          {skippedTotal > 0 ? (
            <Button
              label={`Pominięte (${skippedTotal})`}
              icon="return-up-back-outline"
              variant="tinted"
              onPress={() => setOverlay({ kind: 'skipped' })}
            />
          ) : null}
        </View>
      </ScrollView>

      {overlay.kind === 'stage_skip' && stageSkip ? (
        <StageSkipPanel
          stage={frame.stage}
          keys={stageSkip.keys}
          effects={stageSkip.effects}
          onSkipStage={stageSkip.onSkipStage}
          onSkipOne={overlay.fromQuestion ? frame.onSkipSingle : null}
          onCancel={close}
        />
      ) : overlay.kind === 'skipped' ? (
        <SkippedPanel groups={frame.skipped} onRevisit={frame.onRevisit} onRevisitStage={frame.onRevisitStage} onClose={close} />
      ) : (
        footer
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { padding: SPACE.l, gap: SPACE.m, paddingBottom: SPACE.xxl },
  header: { gap: SPACE.s },
  title: { ...TYPE.title2, color: COLORS.text },
  hint: { ...TYPE.subhead, color: COLORS.textMuted },
  details: {
    gap: SPACE.xs,
    backgroundColor: FILLS.neutral,
    borderRadius: RADIUS.s,
    padding: SPACE.m,
  },
  detail: { ...TYPE.footnote, color: COLORS.text },
  digCompact: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderRadius: RADIUS.s,
    backgroundColor: FILLS.neutral,
  },
  digCompactText: { ...TYPE.footnote, color: COLORS.textMuted, flex: 1, flexShrink: 1 },
  pressed: { opacity: 0.65 },
  deferHint: { ...TYPE.subhead, color: COLORS.textMuted, marginTop: SPACE.xs },
  secondaryActions: { gap: SPACE.s },
});