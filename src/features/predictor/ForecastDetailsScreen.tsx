import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { SegmentedControl, StatusBanner, SurfaceCard, type SegmentOption } from '../../components/ui';
import { getDatabaseMeta, getPredictorSpeciesForMonth } from '../../db/repositories/speciesRepository';
import type { SpeciesBasicInfo } from '../../db/types';
import type { MushroomId, SpeciesCandidate } from '../../domain';
import { COLORS, SPACE, TYPE } from '../../theme';
import { CandidateRow, CandidatesEmpty, CandidatesNoteRow } from './components/CandidateList';
import { FactorList } from './components/FactorList';
import { FlushIndexCard } from './components/FlushIndexCard';
import { WeatherDataTable } from './components/WeatherDataTable';
import { formatUpdatedAt } from './format';
import { predictFlush } from './predictFlush';
import { CUSTOM_KEY, DEVICE_KEY, type ForecastKey } from './store/forecastStore';
import { useForecastState } from './store/hooks';
import { forecastStore } from './store/instance';
import { summarizeWeather, targetMonth } from './weatherMetrics';

type DetailTab = 'factors' | 'candidates' | 'weather';

const DETAIL_TABS: readonly SegmentOption<DetailTab>[] = [
  { value: 'factors', label: 'Czynniki' },
  { value: 'candidates', label: 'Gatunki' },
  { value: 'weather', label: 'Pogoda' },
];

type DetailRow =
  | { readonly kind: 'factors'; readonly id: 'factors' }
  | { readonly kind: 'weather'; readonly id: 'weather' }
  | { readonly kind: 'candidates_empty'; readonly id: 'candidates_empty' }
  | { readonly kind: 'candidates_note'; readonly id: 'candidates_note' }
  | {
      readonly kind: 'candidate';
      readonly id: string;
      readonly candidate: SpeciesCandidate;
      readonly isLast: boolean;
    };

export function ForecastDetailsScreen() {
  const params = useLocalSearchParams<{ key?: string | string[] }>();
  const rawKey = Array.isArray(params.key) ? params.key[0] : params.key;
  const state = useForecastState();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<DetailTab>('factors');
  const deferredTab = useDeferredValue(tab);

  const place = state.places.find((p) => p.id === rawKey);
  const key = resolveKey(rawKey, state.customPlace !== null, place?.id ?? null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    if (!key) return;
    setRefreshing(true);
    try {
      await forecastStore.refresh(key);
    } finally {
      setRefreshing(false);
    }
  }, [key]);

  const entry = key ? state.entries[key] : undefined;
  const stored = entry?.stored ?? null;

  const { prediction, speciesById } = useMemo(() => {
    if (!stored) {
      return { prediction: null, speciesById: new Map<MushroomId, SpeciesBasicInfo>() };
    }
    const { days } = stored.snapshot;
    const month = targetMonth(days[days.length - 1]?.date ?? days[0].date);
    const monthSpecies = getPredictorSpeciesForMonth(month);
    const totalSpeciesCount = getDatabaseMeta().speciesCount;

    const map = new Map<MushroomId, SpeciesBasicInfo>();
    for (const sp of monthSpecies) {
      map.set(sp.id, {
        id: sp.id,
        polishName: sp.polishName,
        scientificName: sp.scientificName,
        edibilityCategory: sp.edibilityCategory,
      });
    }

    return {
      prediction: predictFlush({
        snapshot: stored.snapshot,
        species: monthSpecies,
        totalSpeciesCount,
        now: new Date(),
      }),
      speciesById: map,
    };
  }, [stored]);

  const summary = useMemo(() => (stored ? summarizeWeather(stored.snapshot) : null), [stored]);

  const rows = useMemo<readonly DetailRow[]>(() => {
    if (!stored || !prediction || !summary) return [];
    if (deferredTab === 'factors') return [{ kind: 'factors', id: 'factors' }];
    if (deferredTab === 'weather') return [{ kind: 'weather', id: 'weather' }];
    if (prediction.candidates.length === 0) return [{ kind: 'candidates_empty', id: 'candidates_empty' }];
    return [
      { kind: 'candidates_note', id: 'candidates_note' },
      ...prediction.candidates.map((candidate, index) => ({
        kind: 'candidate' as const,
        id: candidate.mushroomId,
        candidate,
        isLast: index === prediction.candidates.length - 1,
      })),
    ];
  }, [stored, prediction, summary, deferredTab]);

  const openSpecies = useCallback(
    (id: MushroomId) => {
      router.push({ pathname: '/species/[id]', params: { id } });
    },
    [router],
  );

  const handleRefresh = useCallback(() => {
    if (key) void forecastStore.refresh(key);
  }, [key]);

  const confirmRemove = useCallback(() => {
    if (!place) return;
    Alert.alert('Usunąć miejsce?', `„${place.name}” zniknie z listy zapisanych.`, [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        style: 'destructive',
        onPress: () => {
          forecastStore.removePlace(place.id);
          router.back();
        },
      },
    ]);
  }, [place, router]);

  const keyExtractor = useCallback((row: DetailRow) => row.id, []);
  const getItemType = useCallback((row: DetailRow) => row.kind, []);

  const renderItem = useCallback<ListRenderItem<DetailRow>>(
    ({ item }) => {
      switch (item.kind) {
        case 'factors':
          return prediction ? <FactorList factors={prediction.factors} /> : null;
        case 'weather':
          return summary ? <WeatherDataTable summary={summary} /> : null;
        case 'candidates_empty':
          return <CandidatesEmpty />;
        case 'candidates_note':
          return <CandidatesNoteRow />;
        case 'candidate':
          return (
            <CandidateRow
              candidate={item.candidate}
              species={speciesById.get(item.candidate.mushroomId)}
              isLast={item.isLast}
              onPress={openSpecies}
            />
          );
      }
    },
    [prediction, summary, speciesById, openSpecies],
  );

  const loading = entry?.status.kind === 'loading';

  const listHeader = useMemo(
    () => (
      <View style={styles.header}>
        {entry?.status.kind === 'error' ? (
          <StatusBanner
            tone="warning"
            message={`${entry.status.message}${stored ? ` Pokazuję dane z ${formatUpdatedAt(stored.snapshot.fetchedAt)}.` : ''}`}
          />
        ) : null}

        <Button
          label={loading ? 'Odświeżanie…' : 'Odśwież pogodę'}
          icon="refresh-outline"
          variant="tinted"
          loading={loading}
          onPress={handleRefresh}
        />

        {stored && prediction ? (
          <>
            <FlushIndexCard prediction={prediction} location={stored.location} />
            <SegmentedControl options={DETAIL_TABS} value={tab} onChange={setTab} />
          </>
        ) : !loading ? (
          <SurfaceCard variant="muted">
            <Text style={styles.muted}>Brak danych pogodowych. Dotknij „Odśwież pogodę”.</Text>
          </SurfaceCard>
        ) : null}
      </View>
    ),
    [entry?.status, stored, loading, handleRefresh, prediction, tab],
  );

  const listFooter = useMemo(
    () =>
      place ? (
        <View style={styles.dangerZone}>
          <Button label="Usuń z zapisanych" icon="trash-outline" variant="danger" onPress={confirmRemove} />
        </View>
      ) : null,
    [place, confirmRemove],
  );

  if (!state.hydrated) {
    return (
      <View style={[styles.screen, styles.center]}>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </View>
    )
  }

  if (!key) {
    return (
      <View style={[styles.screen, styles.center]}>
        <Stack.Screen options={{ title: 'Prognoza' }} />
        <Text style={styles.muted}>Nie znaleziono miejsca. Mogło zostać usunięte.</Text>
      </View>
    );
  }

  const title =
    place?.name ?? (key === CUSTOM_KEY ? (state.customPlace?.name ?? 'Wybrane miejsce') : 'Twoja okolica');

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title }} />
      <FlashList
        data={rows}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        renderItem={renderItem}
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        contentContainerStyle={[styles.content, { paddingBottom: SPACE.xxl + insets.bottom }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      />
    </View>
  );
}

function resolveKey(raw: string | undefined, hasCustomPlace: boolean, savedId: ForecastKey | null): ForecastKey | null {
  if (raw === DEVICE_KEY) return DEVICE_KEY;
  if (raw === CUSTOM_KEY) return hasCustomPlace ? CUSTOM_KEY : null;
  return savedId;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  center: { alignItems: 'center', justifyContent: 'center', padding: SPACE.xl },
  content: { padding: SPACE.l },
  header: { gap: SPACE.l, marginBottom: SPACE.l },
  muted: { ...TYPE.subhead, color: COLORS.textMuted, textAlign: 'center' },
  dangerZone: { marginTop: SPACE.l },
});