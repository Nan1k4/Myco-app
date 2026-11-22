import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button } from '../../components/Button';
import {
  computeAtlasFacets,
  getAvailableAtlasFacets,
  getDatabaseMeta,
  queryAtlasSpecies,
} from '../../db/repositories/speciesRepository';
import type { AtlasQueryParams, AtlasSpeciesRow as AtlasSpeciesItem } from '../../db/types';
import { toIsoDateTime, type Month, type MushroomId } from '../../domain';
import { COLORS, SPACE, TYPE } from '../../theme';
import { ATLAS_COPY_PL } from './copy.pl';
import { activeFilterCount } from './engine';
import { ActivePills } from './ui/ActivePills';
import { AtlasHeader } from './ui/AtlasHeader';
import { AtlasSpeciesRow } from './ui/AtlasSpeciesRow';
import { FilterPanel } from './ui/FilterPanel';
import { useAtlasState } from './useAtlasState';
import { useWeatherFilter, type ForecastKey } from '../predictor';

export function AtlasScreen() {
  const [selectedWeatherKey, setSelectedWeatherKey] = useState<ForecastKey | null>(null);
  const weather = useWeatherFilter(selectedWeatherKey);
  const [state, dispatch] = useAtlasState();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const router = useRouter();
  const currentMonth = (new Date().getMonth() + 1) as Month;
  const deferredSearch = useDeferredValue(state.search);

  const availableFacets = useMemo(() => getAvailableAtlasFacets(), []);
  const totalCount = useMemo(() => getDatabaseMeta().speciesCount, []);

  const queryParams = useMemo<AtlasQueryParams>(
    () => ({
      search: deferredSearch,
      months: state.filters.months,
      inSeasonNow: state.filters.inSeasonNow,
      currentMonth,
      facets: state.filters.facets,
      favorableWeather: state.filters.favorableWeather && weather.available,
      favorableIds: weather.favorableIds,
    }),
    [
      deferredSearch,
      state.filters.months,
      state.filters.inSeasonNow,
      currentMonth,
      state.filters.facets,
      state.filters.favorableWeather,
      weather.available,
      weather.favorableIds,
    ],
  );

  const speciesList = useMemo(
    () => queryAtlasSpecies(queryParams, state.sort),
    [queryParams, state.sort],
  );

  // Liczniki faset obliczane wyłącznie wtedy, gdy panel filtrów jest otwarty
  const facetsResult = useMemo(
    () => (filtersOpen ? computeAtlasFacets(queryParams) : null),
    [filtersOpen, queryParams],
  );

  const activeCount = activeFilterCount(state.filters, weather.available);
  const closeFilters = useCallback(() => setFiltersOpen(false), []);
  const openFilters = useCallback(() => setFiltersOpen(true), []);

  const handlePressSpecies = useCallback(
    (id: MushroomId) => {
      router.push({ pathname: '/species/[id]', params: { id } });
    },
    [router],
  );

  const renderItem = useCallback<ListRenderItem<AtlasSpeciesItem>>(
    ({ item }) => (
      <AtlasSpeciesRow species={item} currentMonth={currentMonth} onPress={handlePressSpecies} />
    ),
    [currentMonth, handlePressSpecies],
  );

  const keyExtractor = useCallback((item: AtlasSpeciesItem) => item.id, []);

  const savePreset = useCallback(
    (name: string) =>
      dispatch({
        type: 'save_preset',
        preset: {
          id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
          name,
          filters: state.filters,
          sort: state.sort,
          createdAt: toIsoDateTime(new Date()),
        },
      }),
    [dispatch, state.filters, state.sort],
  );

  return (
    <View style={styles.screen}>
      <AtlasHeader
        search={state.search}
        sort={state.sort}
        activeCount={activeCount}
        dispatch={dispatch}
        onOpenFilters={openFilters}
      />
      <ActivePills facets={availableFacets} filters={state.filters} dispatch={dispatch} weatherAvailable={weather.available} />

      <FlashList
        data={speciesList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.note}>
            <Text style={styles.noteText}>
              {ATLAS_COPY_PL.browsingNote}{' '}
              <Text style={styles.link} onPress={() => router.push('/filter')} accessibilityRole="link">
                {ATLAS_COPY_PL.recognizeLink} →
              </Text>
            </Text>
            <Text style={styles.count} numberOfLines={1}>
              {speciesList.length} z {totalCount}
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>{ATLAS_COPY_PL.empty}</Text>
            {activeCount > 0 ? (
              <Button
                label={ATLAS_COPY_PL.clearAll}
                variant="tinted"
                onPress={() => dispatch({ type: 'clear_all' })}
              />
            ) : null}
          </View>
        }
      />

      <Modal visible={filtersOpen} animationType="slide" onRequestClose={closeFilters}>
        <GestureHandlerRootView style={styles.screen}>
          {facetsResult ? (
            <FilterPanel
              facets={availableFacets}
              state={state}
              facetsResult={facetsResult}
              matchCount={speciesList.length}
              totalCount={totalCount}
              currentMonth={currentMonth}
              dispatch={dispatch}
              onClose={closeFilters}
              onSavePreset={savePreset}
              weatherAvailable={weather.available}
              weatherLocationLabel={weather.locationLabel}
              weatherLocations={weather.locations}
              selectedWeatherKey={weather.activeKey}
              onSelectWeatherKey={setSelectedWeatherKey}
            />
          ) : null}
        </GestureHandlerRootView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  list: { paddingBottom: SPACE.xxl },
  note: { flexDirection: 'row', alignItems: 'baseline', gap: SPACE.m, paddingHorizontal: SPACE.l, paddingVertical: SPACE.m },
  noteText: { ...TYPE.footnote, color: COLORS.textMuted, flex: 1, flexShrink: 1 },
  link: { color: COLORS.primary, fontWeight: '700' },
  count: { ...TYPE.footnote, color: COLORS.textMuted, fontVariant: ['tabular-nums'], fontWeight: '600', flexShrink: 0 },
  empty: { padding: SPACE.xl, gap: SPACE.m, alignItems: 'stretch' },
  emptyText: { ...TYPE.body, color: COLORS.textMuted, textAlign: 'center' },
});