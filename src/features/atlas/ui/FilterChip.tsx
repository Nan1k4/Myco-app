import * as Haptics from 'expo-haptics';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../../components/icons/Icon';
import { BORDER_RADIUS, COLORS, FILLS, SPACE, TYPE } from '../../../theme';

interface FilterChipProps {
  readonly label: string;
  readonly selected: boolean;
  readonly count: number;
  readonly swatch: string | null;
  readonly onPress: () => void;
}

export function FilterChip({ label, selected, count, swatch, onPress }: FilterChipProps) {
  const empty = count === 0 && !selected;
  return (
    <Pressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${label}, ${count}`}
      style={({ pressed }) => [styles.chip, selected && styles.selected, empty && styles.empty, pressed && styles.pressed]}
    >
      {swatch ? <View style={[styles.swatch, { backgroundColor: swatch }]} /> : null}
      <Text style={[styles.label, selected && styles.selectedText]} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
      <Text style={[styles.count, selected && styles.selectedText]}>{count}</Text>
      {selected ? <Icon name="check" size={14} color={COLORS.onPrimary} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 44,
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
  },
  selected: { backgroundColor: COLORS.primary },
  empty: { opacity: 0.45 },
  pressed: { opacity: 0.7 },
  swatch: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(20, 27, 22, 0.2)',
    flexShrink: 0,
  },
  label: { ...TYPE.subhead, color: COLORS.text, flexShrink: 1 },
  count: { ...TYPE.footnote, color: COLORS.textMuted, fontVariant: ['tabular-nums'], flexShrink: 0 },
  selectedText: { color: COLORS.onPrimary },
});