import { StyleSheet, Text, View } from 'react-native';
import { memo } from 'react';
import { Icon, type IconName } from '../../../components/icons/Icon';
import { SurfaceCard } from '../../../components/ui';
import type { FlushPrediction, ResolvedLocation } from '../../../domain';
import { CONFIDENCE_LABELS_PL, FLUSH_LEVEL_LABELS_PL } from '../../../i18n/pl';
import { BORDER_RADIUS, COLORS, FLUSH_LEVEL_COLORS, SPACE, TYPE } from '../../../theme';
import { describeLocation, formatTime } from '../format';
import { FlushGaugeSvg } from './FlushGaugeSvg';

interface FlushIndexCardProps {
  readonly prediction: FlushPrediction;
  readonly location: ResolvedLocation;
}

export const FlushIndexCard = memo(function FlushIndexCard({ prediction, location }: FlushIndexCardProps) {
  const color = FLUSH_LEVEL_COLORS[prediction.level];

  return (
    <SurfaceCard variant="elevated" style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.caption} numberOfLines={1} ellipsizeMode="tail">
          Indeks warunków do wysypu
        </Text>
        <View style={[styles.levelPill, { backgroundColor: color }]}>
          <Text style={styles.levelText} numberOfLines={1}>
            {FLUSH_LEVEL_LABELS_PL[prediction.level]}
          </Text>
        </View>
      </View>

      <FlushGaugeSvg index={prediction.index} color={color} />

      <View style={styles.metaList}>
        <MetaRow icon="shield" text={`Pewność oceny: ${CONFIDENCE_LABELS_PL[prediction.confidence]}`} />
        <MetaRow icon="pin" text={describeLocation(location)} />
        <MetaRow icon="time" text={`Pogoda pobrana o ${formatTime(prediction.weatherFetchedAt)}`} />
      </View>

      <Text style={styles.disclaimer}>
        Heurystyka oparta na pogodzie.
      </Text>
    </SurfaceCard>
  );
});

function MetaRow({ icon, text }: { readonly icon: IconName; readonly text: string }) {
  return (
    <View style={styles.metaRow}>
      <Icon name={icon} size={15} color={COLORS.textMuted} />
      <Text style={styles.metaText} numberOfLines={2}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: SPACE.m },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: SPACE.s },
  caption: { ...TYPE.footnote, color: COLORS.textMuted, flex: 1, flexShrink: 1 },
  levelPill: { borderRadius: BORDER_RADIUS, paddingHorizontal: SPACE.m, paddingVertical: SPACE.xs },
  levelText: { ...TYPE.caption, color: COLORS.onPrimary, fontWeight: '700' },
  metaList: {
    gap: SPACE.s,
    paddingTop: SPACE.m,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderSubtle,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.s },
  metaText: { ...TYPE.footnote, color: COLORS.textMuted, flex: 1, flexShrink: 1 },
  disclaimer: { ...TYPE.caption, color: COLORS.textSubtle },
});