import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EdibilityBadge } from '../../../components/EdibilityBadge';
import { Icon } from '../../../components/icons/Icon';
import { SurfaceCard } from '../../../components/ui';
import type { SpeciesBasicInfo } from '../../../db/types';
import type { MushroomId, SpeciesCandidate } from '../../../domain';
import { COLORS, MIN_TOUCH, RADIUS, SPACE, TYPE } from '../../../theme';

export const CandidatesEmpty = memo(function CandidatesEmpty() {
  return (
    <SurfaceCard variant="muted">
      <Text style={styles.empty}>Żaden gatunek z bazy nie ma teraz sprzyjających warunków.</Text>
    </SurfaceCard>
  );
});

export const CandidatesNoteRow = memo(function CandidatesNoteRow() {
  return (
    <View style={styles.noteBox}>
      <Text style={styles.note}>Lista pomaga zaplanować wyjście. Nie służy do rozpoznawania grzybów.</Text>
    </View>
  );
});

interface CandidateRowProps {
  readonly candidate: SpeciesCandidate;
  readonly species: SpeciesBasicInfo | undefined;
  readonly isLast: boolean;
  readonly onPress: (id: MushroomId) => void;
}

export const CandidateRow = memo(function CandidateRow({
  candidate,
  species,
  isLast,
  onPress,
}: CandidateRowProps) {
  if (!species) return null;
  const dangerous = candidate.edibilityCategory === 'poisonous' || candidate.edibilityCategory === 'deadly';
  const fillWidth = `${Math.min(100, Math.max(0, candidate.score))}%` as const;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(candidate.mushroomId)}
      style={({ pressed }) => [
        styles.row,
        isLast && styles.rowLast,
        dangerous && styles.rowDanger,
        pressed && styles.rowPressed,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.text}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {species.polishName}
            </Text>
            <Text style={styles.latin} numberOfLines={1} ellipsizeMode="tail">
              {species.scientificName}
            </Text>
          </View>
          <EdibilityBadge category={candidate.edibilityCategory} compact />
        </View>

        <View style={styles.meterRow}>
          <View style={styles.barWrap}>
            <View style={styles.barTrack}>
              <View
                style={[
                  styles.barFill,
                  { width: fillWidth, backgroundColor: dangerous ? COLORS.danger : COLORS.primary },
                ]}
              />
            </View>
          </View>
          <Text style={styles.score} numberOfLines={1}>
            {candidate.score}/100
          </Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={16} color={COLORS.textSubtle} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  noteBox: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.m,
    borderTopRightRadius: RADIUS.m,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderSubtle,
  },
  note: {
    ...TYPE.caption,
    color: COLORS.textMuted,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
  },
  empty: { ...TYPE.subhead, color: COLORS.textMuted },
  row: {
    minHeight: MIN_TOUCH + 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    backgroundColor: COLORS.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderSubtle,
  },
  rowLast: {
    borderBottomLeftRadius: RADIUS.m,
    borderBottomRightRadius: RADIUS.m,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowDanger: { backgroundColor: COLORS.dangerBg },
  rowPressed: { opacity: 0.78 },
  content: { flex: 1, flexShrink: 1, gap: SPACE.s },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: SPACE.s },
  text: { flex: 1, flexShrink: 1, gap: 2 },
  name: { ...TYPE.headline, color: COLORS.text },
  latin: { ...TYPE.caption, fontStyle: 'italic', color: COLORS.textMuted },
  meterRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.m },
  barWrap: { flex: 1 },
  barTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.track,
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 3 },
  score: {
    ...TYPE.caption,
    color: COLORS.textMuted,
    fontVariant: ['tabular-nums'],
    fontWeight: '600',
    minWidth: 50,
    textAlign: 'right',
  },
});