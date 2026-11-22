import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { EdibilityBadge } from '../../../components/EdibilityBadge';
import { Icon } from '../../../components/icons/Icon';
import type { AtlasSpeciesRow as AtlasSpeciesItem } from '../../../db/types';
import type { Month, MushroomId } from '../../../domain';
import { BORDER_RADIUS, COLORS, ELEVATION, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';

interface AtlasSpeciesRowProps {
  readonly species: AtlasSpeciesItem;
  readonly currentMonth: Month;
  readonly onPress: (id: MushroomId) => void;
}

export const AtlasSpeciesRow = memo(function AtlasSpeciesRow({
  species,
  currentMonth,
  onPress,
}: AtlasSpeciesRowProps) {
  const inSeason = (species.monthsMask & (1 << (currentMonth - 1))) !== 0;

  return (
    <Pressable
      onPress={() => onPress(species.id)}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        species.dangerous && styles.rowDanger,
        pressed && styles.rowPressed,
      ]}
    >
      <View style={styles.text}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {species.polishName}
        </Text>
        <Text style={styles.latin} numberOfLines={1} ellipsizeMode="tail">
          {species.scientificName}
        </Text>
        {species.vernacularShort ? (
          <Text style={styles.alias} numberOfLines={1} ellipsizeMode="tail">
            {species.vernacularShort}
          </Text>
        ) : null}
        <View style={styles.metaRow}>
          <View style={[styles.seasonPill, inSeason && styles.seasonPillActive]}>
            <Icon name="calendar" size={11} color={inSeason ? COLORS.primary : COLORS.textMuted} />
            <Text style={[styles.seasonText, inSeason && styles.seasonTextActive]} numberOfLines={1}>
              {species.monthsLabel}
            </Text>
          </View>
          {species.legallyProtected ? (
            <Text style={styles.protected} numberOfLines={1}>
              chroniony
            </Text>
          ) : null}
        </View>
      </View>

      <View style={styles.side}>
        <EdibilityBadge category={species.edibilityCategory} compact />
      </View>

      <Icon name="chevron-forward" size={16} color={COLORS.textSubtle} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_TOUCH + 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    marginHorizontal: SPACE.l,
    marginBottom: SPACE.s,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    ...ELEVATION.card,
  },
  rowDanger: {
    borderColor: COLORS.danger,
    backgroundColor: COLORS.dangerBg,
  },
  rowPressed: {
    opacity: 0.8,
  },
  text: { flex: 1, flexShrink: 1, gap: 2 },
  name: { ...TYPE.headline, color: COLORS.text },
  latin: { ...TYPE.caption, fontStyle: 'italic', color: COLORS.textMuted },
  alias: { ...TYPE.caption, color: COLORS.textSubtle },
  metaRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: SPACE.s, marginTop: SPACE.xs },
  seasonPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
    backgroundColor: FILLS.neutral,
    paddingHorizontal: SPACE.s,
    paddingVertical: 2,
    borderRadius: BORDER_RADIUS,
  },
  seasonPillActive: { backgroundColor: FILLS.primary },
  seasonText: { ...TYPE.caption, color: COLORS.textMuted },
  seasonTextActive: { color: COLORS.primary, fontWeight: '700' },
  protected: { ...TYPE.caption, color: COLORS.frost, fontWeight: '700' },
  side: { alignItems: 'flex-end', flexShrink: 0, maxWidth: '42%' },
});