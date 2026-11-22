import { Ionicons } from '@expo/vector-icons';
import { FlashList, type ListRenderItem } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState, type Dispatch } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons/Icon';
import type { SpeciesBasicInfo } from '../../../db/types';
import type { FilterResult, MushroomId } from '../../../domain';
import { FILTER_KEY_LABELS_PL } from '../../../i18n/pl';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, RADIUS, SPACE, TYPE } from '../../../theme';
import { useWeatherFilter, type ForecastKey } from '../../predictor';
import { STAGE_SKIP_PL } from '../copy.pl';
import {
  confirmStage,
  revisitStage,
  skippedOverview,
  type QuizAction,
  type QuizKey,
  type QuizProgressView,
  type QuizStage,
  type SimilarityRanking,
} from '../engine';
import { GateBanner } from './GateBanner';
import { GroupedCell } from './GroupedCell';
import { buildResultRows, summarizeVisibility, type ResultRow } from './resultRows';
import { SpeciesResultRow } from './SpeciesResultRow';
import { ThresholdControl } from './ThresholdControl';

interface ResultsViewProps {
  readonly gate: FilterResult;
  readonly ranking: SimilarityRanking;
  readonly speciesById: ReadonlyMap<MushroomId, SpeciesBasicInfo>;
  readonly progress: QuizProgressView;
  readonly threshold: number;
  readonly hasMoreQuestions: boolean;
  readonly dispatch: Dispatch<QuizAction>;
}

export function ResultsView({
  gate,
  ranking,
  speciesById,
  progress,
  threshold,
  hasMoreQuestions,
  dispatch,
}: ResultsViewProps) {
  const router = useRouter();
  const [selectedWeatherKey, setSelectedWeatherKey] = useState<ForecastKey | null>(null);
  const weather = useWeatherFilter(selectedWeatherKey);
  const [onlyFavorableWeather, setOnlyFavorableWeather] = useState(false);
  const weatherFilterActive = onlyFavorableWeather && weather.favorableIds !== null;

  const effectiveRanking = useMemo<SimilarityRanking>(() => {
    if (!weatherFilterActive || !weather.favorableIds) return ranking;
    const ids = weather.favorableIds;
    return {
      ...ranking,
      exact: ranking.exact.filter((entry) => ids.has(entry.species.id)),
      partial: ranking.partial.filter((entry) => ids.has(entry.species.id)),
    };
  }, [ranking, weatherFilterActive, weather.favorableIds]);

  const rows = useMemo(
    () => buildResultRows({ ranking: effectiveRanking, skipped: skippedOverview(progress) }),
    [effectiveRanking, progress],
  );

  const openSpecies = useCallback(
    (id: MushroomId) => {
      router.push({ pathname: '/species/[id]', params: { id } });
    },
    [router],
  );
  const revisit = useCallback(
    (key: QuizKey) => dispatch({ type: 'revisit', key, stage: revisitStage(key, progress) }),
    [dispatch, progress],
  );
  const check = useCallback(
    (key: QuizKey) => dispatch({ type: 'revisit', key, stage: confirmStage(key, progress) }),
    [dispatch, progress],
  );
  const revisitStageRow = useCallback((stage: QuizStage) => dispatch({ type: 'revisit_stage', stage }), [dispatch]);
  const setThreshold = useCallback((value: number) => dispatch({ type: 'set_threshold', value }), [dispatch]);

  const keyExtractor = useCallback((row: ResultRow) => row.id, []);
  const getItemType = useCallback((row: ResultRow) => row.kind, []);

  const renderItem = useCallback<ListRenderItem<ResultRow>>(
    ({ item }) => (
      <Row
        row={item}
        speciesById={speciesById}
        threshold={threshold}
        reliable={ranking.reliable}
        onOpenSpecies={openSpecies}
        onRevisit={revisit}
        onRevisitStage={revisitStageRow}
        onThreshold={setThreshold}
      />
    ),
    [speciesById, threshold, ranking.reliable, openSpecies, revisit, revisitStageRow, setThreshold],
  );

  return (
    <FlashList
      data={rows}
      keyExtractor={keyExtractor}
      getItemType={getItemType}
      renderItem={renderItem}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        <View style={styles.header}>
          <GateBanner
            gate={gate}
            totalSpecies={ranking.total}
            hiddenDangerous={ranking.hiddenDangerous}
            onCheck={check}
            onLowerThreshold={setThreshold}
          />
          <Text style={styles.summary}>{summarizeVisibility(effectiveRanking)}</Text>
          <Pressable
            disabled={!weather.available}
            onPress={() => setOnlyFavorableWeather((v) => !v)}
            accessibilityRole="switch"
            accessibilityState={{ checked: weatherFilterActive, disabled: !weather.available }}
            style={({ pressed }) => [
              styles.weatherChip,
              weatherFilterActive && styles.weatherChipActive,
              !weather.available && styles.weatherChipDisabled,
              pressed && styles.pressed,
            ]}
          >
            <Icon
              name="rain"
              size={16}
              color={weatherFilterActive ? COLORS.onPrimary : weather.available ? COLORS.primary : COLORS.textSubtle}
            />
            <View style={styles.weatherTextWrap}>
              <Text
                style={[styles.weatherLabel, weatherFilterActive && styles.weatherLabelActive]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {weather.available
                  ? `Sprzyjająca pogoda · ${weather.locationLabel}`
                  : 'Sprzyjająca pogoda (brak danych)'}
              </Text>
              {!weather.available ? (
                <Text style={styles.weatherHint} numberOfLines={1} ellipsizeMode="tail">
                  Pobierz pogodę w zakładce Wysyp (działa potem offline)
                </Text>
              ) : weatherFilterActive ? (
                <Text style={styles.weatherHintActive} numberOfLines={1} ellipsizeMode="tail">
                  Gatunki trujące pozostają zawsze widoczne
                </Text>
              ) : null}
            </View>
            {weatherFilterActive ? <Icon name="check" size={16} color={COLORS.onPrimary} /> : null}
          </Pressable>
          {weatherFilterActive && weather.locations.length > 1 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.locationRow}>
              {weather.locations.map((loc) => {
                const active = loc.key === weather.activeKey;
                return (
                  <Pressable
                    key={loc.key}
                    onPress={() => setSelectedWeatherKey(loc.key)}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: active }}
                    style={[styles.locationPill, active && styles.locationPillActive]}
                  >
                    <Text style={[styles.locationPillText, active && styles.locationPillTextActive]} numberOfLines={1}>
                      {loc.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          ) : null}
        </View>
      }
      ListFooterComponent={
        <View style={styles.footer}>
          {hasMoreQuestions ? (
            <Button label="Wróć do pytań" variant="tinted" onPress={() => dispatch({ type: 'resume' })} />
          ) : null}
          <Button label="Zacznij od nowa" variant="plain" onPress={() => dispatch({ type: 'reset' })} />
          <Text style={styles.disclaimer}>Nie jedz grzyba na podstawie wskazań aplikacji.</Text>
        </View>
      }
    />
  );
}

interface RowProps {
  readonly row: ResultRow;
  readonly speciesById: ReadonlyMap<MushroomId, SpeciesBasicInfo>;
  readonly threshold: number;
  readonly reliable: boolean;
  readonly onOpenSpecies: (id: MushroomId) => void;
  readonly onRevisit: (key: QuizKey) => void;
  readonly onRevisitStage: (stage: QuizStage) => void;
  readonly onThreshold: (value: number) => void;
}

function Row({
  row,
  speciesById,
  threshold,
  reliable,
  onOpenSpecies,
  onRevisit,
  onRevisitStage,
  onThreshold,
}: RowProps) {
  switch (row.kind) {
    case 'header':
      return (
        <Text style={styles.sectionHeader} accessibilityRole="header">
          {row.title}
        </Text>
      );
    case 'species':
      return (
        <GroupedCell position={row.position}>
          <SpeciesResultRow
            entry={row.entry}
            species={speciesById.get(row.entry.species.id)}
            approximate={!reliable}
            onPress={onOpenSpecies}
          />
        </GroupedCell>
      );
    case 'empty':
      return (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{row.text}</Text>
        </View>
      );
    case 'threshold':
      return <ThresholdControl value={threshold} reliable={reliable} onChange={onThreshold} />;
    case 'skipped':
      return (
        <GroupedCell position={row.position}>
          <SkippedRow
            title={FILTER_KEY_LABELS_PL[row.key]}
            detail="Wróć do pytania"
            onPress={() => onRevisit(row.key)}
          />
        </GroupedCell>
      );
    case 'skipped_stage':
      return (
        <GroupedCell position={{ first: true, last: true }}>
          <SkippedRow
            title={STAGE_SKIP_PL.wholeStage}
            detail={[
              STAGE_SKIP_PL.revisitStage,
              ...(row.hides.length > 0 ? [STAGE_SKIP_PL.hides(row.hides)] : []),
            ].join(' · ')}
            onPress={() => onRevisitStage(row.stage)}
          />
        </GroupedCell>
      );
  }
}

function SkippedRow({
  title,
  detail,
  onPress,
}: {
  readonly title: string;
  readonly detail: string;
  readonly onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <View style={styles.itemText}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemReason}>{detail}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.textSubtle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: { padding: SPACE.l, paddingBottom: SPACE.xxl },
  header: { gap: SPACE.s },
  summary: { ...TYPE.footnote, color: COLORS.textMuted, paddingHorizontal: SPACE.xs, fontVariant: ['tabular-nums'] },
  sectionHeader: {
    ...TYPE.overline,
    color: COLORS.textMuted,
    paddingHorizontal: SPACE.xs,
    marginTop: SPACE.l,
    marginBottom: SPACE.s,
  },
  empty: { backgroundColor: COLORS.surface, borderRadius: RADIUS.m, padding: SPACE.l },
  emptyText: { ...TYPE.subhead, color: COLORS.textMuted },
  footer: { gap: SPACE.s, marginTop: SPACE.xl },
  disclaimer: { ...TYPE.footnote, color: COLORS.textSubtle, textAlign: 'center', marginTop: SPACE.s },
  item: {
    minHeight: MIN_TOUCH + 8,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: { backgroundColor: FILLS.neutral },
  itemText: { flex: 1, gap: 2 },
  itemTitle: { ...TYPE.body, color: COLORS.text },
  itemReason: { ...TYPE.footnote, color: COLORS.textMuted },
  weatherChip: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    paddingVertical: SPACE.s,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
  },
  weatherChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  weatherChipDisabled: {
    opacity: 0.65,
    backgroundColor: FILLS.neutral,
  },
  weatherTextWrap: { flex: 1, flexShrink: 1, gap: 2 },
  weatherLabel: { ...TYPE.footnote, fontWeight: '600', color: COLORS.text },
  weatherLabelActive: { color: COLORS.onPrimary },
  weatherHint: { ...TYPE.caption, color: COLORS.textMuted },
  weatherHintActive: { ...TYPE.caption, color: COLORS.onPrimary, opacity: 0.85 },
  locationRow: { gap: SPACE.xs, paddingVertical: SPACE.xs },
  locationPill: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
  },
  locationPillActive: { backgroundColor: FILLS.primary, borderWidth: 1, borderColor: COLORS.primary },
  locationPillText: { ...TYPE.caption, fontWeight: '600', color: COLORS.textMuted },
  locationPillTextActive: { color: COLORS.primary, fontWeight: '700' },
});