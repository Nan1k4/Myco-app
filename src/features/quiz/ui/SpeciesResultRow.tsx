import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EdibilityBadge } from '../../../components/EdibilityBadge';
import { Icon } from '../../../components/icons/Icon';
import type { SpeciesBasicInfo } from '../../../db/types';
import type { MushroomId } from '../../../domain';
import { FILTER_KEY_LABELS_PL } from '../../../i18n/pl';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import type { SimilarityEntry } from '../engine';

interface SpeciesResultRowProps {
  readonly entry: SimilarityEntry;
  readonly species: SpeciesBasicInfo | undefined;
  readonly approximate: boolean;
  readonly onPress: (id: MushroomId) => void;
}

export const SpeciesResultRow = memo(function SpeciesResultRow({
  entry,
  species,
  approximate,
  onPress,
}: SpeciesResultRowProps) {
  const name = species?.polishName ?? entry.species.id;
  const percent = Math.round(entry.score * 100);
  const showPercent = entry.score < 1;

  return (
    <Pressable
      onPress={() => onPress(entry.species.id)}
      accessibilityRole="button"
      accessibilityLabel={showPercent ? `${name}, zgodność ${approximate ? 'około ' : ''}${percent} procent` : name}
      style={({ pressed }) => [
        styles.row,
        entry.species.dangerous && styles.rowDanger,
        pressed && styles.rowPressed,
      ]}
    >
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        {species ? (
          <Text style={styles.latin} numberOfLines={1} ellipsizeMode="tail">
            {species.scientificName}
          </Text>
        ) : null}
        {entry.mismatches.length > 0 ? (
          <Text style={styles.mismatch} numberOfLines={2} ellipsizeMode="tail">
            Różnice: {entry.mismatches.map((key) => FILTER_KEY_LABELS_PL[key]).join(', ')}
          </Text>
        ) : null}
      </View>

      <View style={styles.side}>
        {entry.species.dangerous && species ? <EdibilityBadge category={species.edibilityCategory} compact /> : null}
        {showPercent ? (
          <View style={styles.scorePill}>
            <Text style={styles.score}>
              {approximate ? '~' : ''}
              {percent}%
            </Text>
            <Text style={styles.count}>
              {entry.matched}/{entry.considered}
            </Text>
          </View>
        ) : null}
      </View>

      <Icon name="chevron-forward" size={16} color={COLORS.textSubtle} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_TOUCH + 14,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },
  rowDanger: { backgroundColor: COLORS.dangerBg },
  rowPressed: { opacity: 0.78 },
  text: { flex: 1, flexShrink: 1, gap: 2 },
  name: { ...TYPE.headline, color: COLORS.text },
  latin: { ...TYPE.caption, fontStyle: 'italic', color: COLORS.textMuted },
  mismatch: { ...TYPE.caption, color: COLORS.warningText, marginTop: 2 },
  side: { alignItems: 'flex-end', gap: SPACE.xs, flexShrink: 0, maxWidth: '42%' },
  scorePill: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: SPACE.xs,
    backgroundColor: FILLS.neutral,
    paddingHorizontal: SPACE.s,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS,
  },
  score: { ...TYPE.footnote, fontWeight: '700', color: COLORS.text, fontVariant: ['tabular-nums'] },
  count: { ...TYPE.caption, color: COLORS.textMuted, fontVariant: ['tabular-nums'] },
});