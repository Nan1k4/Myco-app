import type { Dispatch } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../../components/icons/Icon';
import { PressableScale, SegmentedControl, type SegmentOption } from '../../../components/ui';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { ATLAS_COPY_PL, SORT_LABELS_PL } from '../copy.pl';
import type { AtlasAction, AtlasSort } from '../engine';

interface AtlasHeaderProps {
  readonly search: string;
  readonly sort: AtlasSort;
  readonly activeCount: number;
  readonly dispatch: Dispatch<AtlasAction>;
  readonly onOpenFilters: () => void;
}

const SORT_OPTIONS: readonly SegmentOption<AtlasSort>[] = [
  { value: 'alpha', label: SORT_LABELS_PL.alpha },
  { value: 'edible_first', label: SORT_LABELS_PL.edible_first },
  { value: 'dangerous_first', label: SORT_LABELS_PL.dangerous_first },
];

export function AtlasHeader({ search, sort, activeCount, dispatch, onOpenFilters }: AtlasHeaderProps) {
  const insets = useSafeAreaInsets();
  const hasFilters = activeCount > 0;

  return (
    <View style={[styles.root, { paddingTop: insets.top + SPACE.s }]}>
      <Text style={styles.title} accessibilityRole="header">
        {ATLAS_COPY_PL.title}
      </Text>

      <View style={styles.searchRow}>
        <View style={styles.search}>
          <Icon name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            value={search}
            onChangeText={(value) => dispatch({ type: 'set_search', search: value })}
            placeholder={ATLAS_COPY_PL.searchPlaceholder}
            placeholderTextColor={COLORS.textSubtle}
            autoCorrect={false}
            returnKeyType="search"
            style={styles.input}
          />
          {search ? (
            <Pressable
              onPress={() => dispatch({ type: 'set_search', search: '' })}
              accessibilityLabel="Wyczyść wyszukiwanie"
              hitSlop={8}
            >
              <Icon name="close" size={16} color={COLORS.textMuted} />
            </Pressable>
          ) : null}
        </View>

        <PressableScale
          onPress={onOpenFilters}
          haptic="selection"
          accessibilityLabel={hasFilters ? `${ATLAS_COPY_PL.filters}, aktywne: ${activeCount}` : ATLAS_COPY_PL.filters}
          style={[styles.filterButton, hasFilters && styles.filterActive]}
        >
          <Icon name="sliders" size={18} color={hasFilters ? COLORS.onPrimary : COLORS.primary} />
          <Text style={[styles.filterText, hasFilters && styles.filterTextActive]} numberOfLines={1}>
            {hasFilters ? `${ATLAS_COPY_PL.filters} · ${activeCount}` : ATLAS_COPY_PL.filters}
          </Text>
        </PressableScale>
      </View>

      <SegmentedControl
        options={SORT_OPTIONS}
        value={sort}
        onChange={(next) => dispatch({ type: 'set_sort', sort: next })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: SPACE.m, paddingHorizontal: SPACE.l, paddingBottom: SPACE.s },
  title: { ...TYPE.largeTitle, color: COLORS.text },
  searchRow: { flexDirection: 'row', gap: SPACE.s },
  search: {
    flex: 1,
    flexShrink: 1,
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  input: { ...TYPE.body, flex: 1, flexShrink: 1, color: COLORS.text, paddingVertical: 0 },
  filterButton: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs + 2,
    paddingHorizontal: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.primary,
    flexShrink: 0,
  },
  filterActive: { backgroundColor: COLORS.primary },
  filterText: { ...TYPE.footnote, fontWeight: '700', color: COLORS.primary },
  filterTextActive: { color: COLORS.onPrimary },
});