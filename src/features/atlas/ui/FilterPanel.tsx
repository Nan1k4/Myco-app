import { Ionicons } from '@expo/vector-icons';
import { useState, type Dispatch } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import type { AtlasFacetsResult } from '../../../db/types';
import type { Month } from '../../../domain';
import { COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import type { ForecastKey, WeatherLocationOption } from '../../predictor';
import { ATLAS_COPY_PL, GROUP_TITLES_PL } from '../copy.pl';
import {
  FACET_GROUPS,
  activeFilterCount,
  type AtlasAction,
  type AtlasState,
  type Facet,
  type FacetGroupId,
  type FacetId,
} from '../engine';
import { FilterChip } from './FilterChip';
import { FilterGroup } from './FilterGroup';
import { PresetBar } from './PresetBar';
import { SeasonFilter } from './SeasonFilter';

interface FilterPanelProps {
  readonly facets: Readonly<Record<FacetId, Facet>>;
  readonly state: AtlasState;
  readonly facetsResult: AtlasFacetsResult;
  readonly matchCount: number;
  readonly totalCount: number;
  readonly currentMonth: Month;
  readonly weatherAvailable: boolean;
  readonly weatherLocationLabel: string | null;
  readonly weatherLocations: readonly WeatherLocationOption[];
  readonly selectedWeatherKey: ForecastKey | null;
  readonly onSelectWeatherKey: (key: ForecastKey) => void;
  readonly dispatch: Dispatch<AtlasAction>;
  readonly onClose: () => void;
  readonly onSavePreset: (name: string) => void;
  readonly onSliderDragging: (dragging: boolean) => void;
}

const INITIALLY_EXPANDED: ReadonlySet<FacetGroupId> = new Set(['edibility', 'season']);

export function FilterPanel({
  facets,
  state,
  facetsResult,
  matchCount,
  totalCount,
  currentMonth,
  weatherAvailable,
  weatherLocationLabel,
  weatherLocations,
  selectedWeatherKey,
  onSelectWeatherKey,
  dispatch,
  onClose,
  onSavePreset,
  onSliderDragging,
}: FilterPanelProps) {
  const [expanded, setExpanded] = useState<ReadonlySet<FacetGroupId>>(INITIALLY_EXPANDED);
  const { filters } = state;
  const active = activeFilterCount(filters);

  const toggleGroup = (id: FacetGroupId) =>
    setExpanded((set) => {
      const next = new Set(set);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const groupActiveCount = (id: FacetGroupId, groupFacets: readonly FacetId[]) =>
    id === 'season'
      ? (filters.months ? 1 : 0) +
        (filters.inSeasonNow ? 1 : 0) +
        (filters.favorableWeather && weatherAvailable ? 1 : 0)
      : groupFacets.reduce((sum, facet) => sum + (filters.facets[facet]?.length ?? 0), 0);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {ATLAS_COPY_PL.filters}
        </Text>
        {active > 0 ? (
          <Pressable onPress={() => dispatch({ type: 'clear_all' })} accessibilityRole="button" hitSlop={8}>
            <Text style={styles.clear}>{ATLAS_COPY_PL.clearAll}</Text>
          </Pressable>
        ) : null}
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel="Zamknij filtry"
          hitSlop={8}
          style={styles.close}
        >
          <Ionicons name="close" size={24} color={COLORS.text} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <PresetBar
          presets={state.presets}
          canSave={active > 0}
          onApply={(id) => dispatch({ type: 'apply_preset', id })}
          onSave={onSavePreset}
          onDelete={(id) => dispatch({ type: 'delete_preset', id })}
        />

        {FACET_GROUPS.map((group) => (
          <View key={group.id} style={styles.separated}>
            <FilterGroup
              title={GROUP_TITLES_PL[group.id]}
              activeCount={groupActiveCount(group.id, group.facets)}
              expanded={expanded.has(group.id)}
              onToggle={() => toggleGroup(group.id)}
            >
              {group.id === 'season' ? (
                <SeasonFilter
                  months={filters.months}
                  inSeasonNow={filters.inSeasonNow}
                  inSeasonNowCount={facetsResult.inSeasonNowCount}
                  favorableWeather={filters.favorableWeather && weatherAvailable}
                  favorableWeatherCount={facetsResult.favorableWeatherCount}
                  weatherAvailable={weatherAvailable}
                  weatherLocationLabel={weatherLocationLabel}
                  weatherLocations={weatherLocations}
                  selectedWeatherKey={selectedWeatherKey}
                  currentMonth={currentMonth}
                  onMonths={(months) => dispatch({ type: 'set_months', months })}
                  onInSeasonNow={(value) => dispatch({ type: 'set_in_season_now', value })}
                  onFavorableWeather={(value) => dispatch({ type: 'set_favorable_weather', value })}
                  onSelectWeatherKey={onSelectWeatherKey}
                  onDragging={onSliderDragging}
                />
              ) : (
                group.facets.map((facetId) => {
                  const facet = facets[facetId];
                  const selected = new Set(filters.facets[facetId] ?? []);
                  return (
                    <View key={facetId} style={styles.facet}>
                      <Text style={styles.facetLabel}>{facet.label}</Text>
                      <View style={styles.chips}>
                        {facet.options.map((option) => (
                          <FilterChip
                            key={option.value}
                            label={option.label}
                            swatch={option.swatch}
                            selected={selected.has(option.value)}
                            count={facetsResult.counts[facetId][option.value] ?? 0}
                            onPress={() => dispatch({ type: 'toggle', facet: facetId, value: option.value })}
                          />
                        ))}
                      </View>
                    </View>
                  );
                })
              )}
            </FilterGroup>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button label={`Pokaż ${matchCount} z ${totalCount}`} onPress={onClose} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  header: {
    minHeight: MIN_TOUCH + 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.l,
    paddingHorizontal: SPACE.l,
  },
  title: { ...TYPE.title2, color: COLORS.text, flex: 1 },
  clear: { ...TYPE.body, color: COLORS.primary },
  close: { minWidth: MIN_TOUCH, minHeight: MIN_TOUCH, alignItems: 'center', justifyContent: 'center' },
  content: { paddingBottom: SPACE.xl, gap: SPACE.s },
  separated: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: FILLS.neutral },
  facet: { gap: SPACE.s },
  facetLabel: { ...TYPE.subhead, color: COLORS.textMuted },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.s },
  footer: { paddingHorizontal: SPACE.l, paddingTop: SPACE.m, paddingBottom: SPACE.l, backgroundColor: COLORS.surface },
});