import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Icon, type IconName } from '../../../components/icons/Icon';
import type { CriticalCheck } from '../../../domain';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { STAGE_COPY_PL, STAGE_SKIP_PL } from '../copy.pl';
import type { QuizStage } from '../engine';

const ICONS: Readonly<Record<QuizStage, IconName>> = {
  place: 'info',
  look: 'eye',
  touch: 'hand',
  dig_base: 'pin',
  cut: 'cut',
  smell: 'droplet',
  spore_print: 'time',
};

export interface CardAction {
  readonly text: string;
  readonly label: string;
  readonly onPress: () => void;
}

interface StageCardProps {
  readonly stage: QuizStage;
  readonly cutDone: boolean;
  readonly cutVisited: boolean;
  readonly check: CriticalCheck | null;
  readonly review: CardAction | null;
  readonly onSkipStage: (() => void) | null;
}

export function StageCard({ stage, cutDone, cutVisited, check, review, onSkipStage }: StageCardProps) {
  const isSafety = check !== null;
  const [expanded, setExpanded] = useState(stage === 'dig_base' || (stage === 'cut' && !cutVisited));
  const { card, info, name } = STAGE_COPY_PL[stage];
  const how = card ? (cutDone && card.howAfterCut ? card.howAfterCut : card.how) : null;
  const heading = card?.title ?? `Etap: ${name}`;

  return (
    <View style={styles.card}>
      {isSafety ? <SafetyNotice /> : null}

      <Pressable
        onPress={() => setExpanded((v) => !v)}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        style={styles.header}
      >
        <View style={styles.iconWrap}>
          <Icon name={ICONS[stage]} size={18} color={COLORS.primary} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {heading}
          </Text>
          {card?.meta ? (
            <Text style={styles.meta} numberOfLines={1} ellipsizeMode="tail">
              {card.meta}
            </Text>
          ) : null}
        </View>
        <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={COLORS.textMuted} />
      </Pressable>

      {expanded ? (
        <View style={styles.bodyWrap}>
          {card?.lead ? <Text style={styles.lead}>{card.lead}</Text> : null}
          {how ? <Text style={styles.body}>{how}</Text> : null}
          {info ? <Text style={styles.body}>{info}</Text> : null}
          {review ? <Text style={styles.body}>{review.text}</Text> : null}
          {review ? <Button label={review.label} variant="tinted" onPress={review.onPress} /> : null}
          {onSkipStage ? <Button label={STAGE_SKIP_PL.skipStage} variant="plain" onPress={onSkipStage} /> : null}
        </View>
      ) : null}
    </View>
  );
}

function SafetyNotice() {
  return (
    <View style={styles.context}>
      <View style={styles.eyebrowRow}>
        <Icon name="shield" size={14} color={COLORS.primary} />
        <Text style={styles.eyebrow}>Ważne dla bezpieczeństwa</Text>
      </View>
      <Text style={styles.contextBody}>
        Pewna odpowiedź pozwala wykluczyć wiele groźnych i trujących gatunków grzybów.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    padding: SPACE.m,
    gap: SPACE.m,
  },
  header: {
    minHeight: MIN_TOUCH - 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerText: { flex: 1, flexShrink: 1, gap: 2 },
  title: { ...TYPE.headline, color: COLORS.text },
  meta: { ...TYPE.caption, color: COLORS.textMuted },
  bodyWrap: { gap: SPACE.s, paddingTop: SPACE.xs },
  lead: { ...TYPE.subhead, fontWeight: '600', color: COLORS.text },
  body: { ...TYPE.subhead, color: COLORS.text },
  context: {
    gap: SPACE.xs,
    padding: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
  },
  eyebrowRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.xs },
  eyebrow: { ...TYPE.overline, color: COLORS.textMuted },
  contextBody: { ...TYPE.footnote, color: COLORS.textMuted },
});