import type { Dispatch } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../../components/icons/Icon';
import { PressableScale } from '../../../components/ui';
import { BORDER_RADIUS, COLORS, FILLS, SPACE, TYPE } from '../../../theme';
import { ATLAS_COPY_PL, formatMonthRange } from '../copy.pl';
import {
  FACET_IDS,
  type AtlasAction,
  type AtlasFilters,
  type Facet,
  type FacetId,
  type FacetOption,
} from '../engine';

interface ActivePillsProps {
  readonly facets: Readonly<Record<FacetId, Facet>>;
  readonly filters: AtlasFilters;
  readonly dispatch: Dispatch<AtlasAction>;
  readonly weatherAvailable: boolean;
}

function collectActiveOptions(
  facets: Readonly<Record<FacetId, Facet>>,
  filters: AtlasFilters,
): readonly { readonly facet: FacetId; readonly option: FacetOption }[] {
  return FACET_IDS.flatMap((facet) => {
    const selected = new Set(filters.facets[facet] ?? []);
    if (selected.size === 0) return [];
    return facets[facet].options
      .filter((option) => selected.has(option.value))
      .map((option) => ({ facet, option }));
  });
}

export function ActivePills({ facets, filters, dispatch, weatherAvailable }: ActivePillsProps) {
  const options = collectActiveOptions(facets, filters);
  const showWeather = filters.favorableWeather && weatherAvailable;
  if (options.length === 0 && !filters.months && !filters.inSeasonNow && !showWeather) return null;

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
        style={styles.scroll}
      >
        {showWeather ? (
          <Pill
            label={ATLAS_COPY_PL.favorableWeather}
            onRemove={() => dispatch({ type: 'set_favorable_weather', value: false })}
          />
        ) : null}
        {filters.inSeasonNow ? (
          <Pill
            label={ATLAS_COPY_PL.inSeasonNow}
            onRemove={() => dispatch({ type: 'set_in_season_now', value: false })}
          />
        ) : null}
        {filters.months ? (
          <Pill
            label={`Sezon: ${formatMonthRange(filters.months.from, filters.months.to)}`}
            onRemove={() => dispatch({ type: 'set_months', months: null })}
          />
        ) : null}
        {options.map(({ facet, option }) => (
          <Pill
            key={`${facet}:${option.value}`}
            label={option.label}
            swatch={option.swatch}
            onRemove={() => dispatch({ type: 'toggle', facet, value: option.value })}
          />
        ))}
        <PressableScale
          onPress={() => dispatch({ type: 'clear_all' })}
          haptic="selection"
          hitSlop={4}
          style={styles.clear}
        >
          <Text style={styles.clearText} numberOfLines={1}>
            {ATLAS_COPY_PL.clearAll}
          </Text>
        </PressableScale>
      </ScrollView>
    </View>
  );
}

function Pill({
  label,
  swatch = null,
  onRemove,
}: {
  readonly label: string;
  readonly swatch?: string | null;
  readonly onRemove: () => void;
}) {
  return (
    <PressableScale
      onPress={onRemove}
      haptic="selection"
      hitSlop={4}
      accessibilityLabel={`Usuń filtr: ${label}`}
      style={styles.pill}
    >
      {swatch ? <View style={[styles.swatch, { backgroundColor: swatch }]} /> : null}
      <Text style={styles.pillText} numberOfLines={1}>
        {label}
      </Text>
      <Icon name="close" size={14} color={COLORS.onPrimary} />
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  swatch: { width: 12, height: 12, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.45)' },
  pillText: { ...TYPE.footnote, color: COLORS.onPrimary, fontWeight: '600' },
  clearText: { ...TYPE.footnote, color: COLORS.primary, fontWeight: '700' },
  wrapper: { flexShrink: 0 },
  scroll: { flexGrow: 0, flexShrink: 0 },
  row: {
    gap: SPACE.s,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.s,
    alignItems: 'center',
  },
  pill: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.primary,
  },
  clear: {
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
  },
});