import { Slider } from '@miblanchard/react-native-slider';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Month } from '../../../domain';
import { BORDER_RADIUS, COLORS, FILLS, SPACE, TYPE } from '../../../theme';
import type { ForecastKey, WeatherLocationOption } from '../../predictor';
import { ATLAS_COPY_PL, MONTH_LONG_PL, MONTH_SHORT_PL, formatMonthRange } from '../copy.pl';
import type { MonthRange } from '../engine';
import { FilterChip } from './FilterChip';

interface SeasonFilterProps {
  readonly months: MonthRange | null;
  readonly inSeasonNow: boolean;
  readonly inSeasonNowCount: number;
  readonly favorableWeather: boolean;
  readonly favorableWeatherCount: number;
  readonly weatherAvailable: boolean;
  readonly weatherLocationLabel: string | null;
  readonly weatherLocations: readonly WeatherLocationOption[];
  readonly selectedWeatherKey: ForecastKey | null;
  readonly currentMonth: Month;
  readonly onMonths: (range: MonthRange | null) => void;
  readonly onInSeasonNow: (value: boolean) => void;
  readonly onFavorableWeather: (value: boolean) => void;
  readonly onSelectWeatherKey: (key: ForecastKey) => void;
  readonly onDragging: (dragging: boolean) => void;
}

export function SeasonFilter({
  months,
  inSeasonNow,
  inSeasonNowCount,
  favorableWeather,
  favorableWeatherCount,
  weatherAvailable,
  weatherLocationLabel,
  weatherLocations,
  selectedWeatherKey,
  currentMonth,
  onMonths,
  onInSeasonNow,
  onFavorableWeather,
  onSelectWeatherKey,
  onDragging,
}: SeasonFilterProps) {
  const committed: readonly [number, number] = months ? [months.from, months.to] : [1, 12];
  const [draft, setDraft] = useState<readonly [number, number]>(committed);
  const last = useRef(committed);

  useEffect(() => {
    setDraft(committed);
    last.current = committed;
  }, [committed[0], committed[1]]);

  const [from, to] = toRange(draft);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.label}>Miesiące owocnikowania</Text>
        <Text style={styles.value}>
          {from === 1 && to === 12 ? ATLAS_COPY_PL.wholeYear : formatMonthRange(from, to)}
        </Text>
      </View>

      <Slider
        value={[...draft]}
        minimumValue={1}
        maximumValue={12}
        step={1}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.track}
        thumbTintColor={COLORS.primary}
        onSlidingStart={() => onDragging(true)}
        onValueChange={(values) => {
          const next = pair(values);
          if (next[0] !== last.current[0] || next[1] !== last.current[1]) void Haptics.selectionAsync();
          last.current = next;
          setDraft(next);
        }}
        onSlidingComplete={(values) => {
          onDragging(false);
          const [start, end] = toRange(pair(values));
          onMonths({ from: start, to: end });
        }}
      />

      <View style={styles.scale}>
        <Text style={styles.tick}>{MONTH_SHORT_PL[1]}</Text>
        <Text style={styles.tick}>{MONTH_SHORT_PL[12]}</Text>
      </View>

      <View style={styles.now}>
        <FilterChip
          label={`${ATLAS_COPY_PL.inSeasonNow} (${MONTH_LONG_PL[currentMonth]})`}
          selected={inSeasonNow}
          count={inSeasonNowCount}
          swatch={null}
          onPress={() => onInSeasonNow(!inSeasonNow)}
        />
      </View>

      <View style={styles.weatherWrap}>
        <FilterChip
          label={
            weatherAvailable && weatherLocationLabel
              ? `${ATLAS_COPY_PL.favorableWeather} (${weatherLocationLabel})`
              : ATLAS_COPY_PL.favorableWeather
          }
          selected={favorableWeather}
          count={weatherAvailable ? favorableWeatherCount : 0}
          swatch={null}
          onPress={() => {
            if (weatherAvailable) onFavorableWeather(!favorableWeather);
          }}
        />
        {weatherAvailable && weatherLocations.length > 1 ? (
          <View style={styles.locationChips}>
            {weatherLocations.map((loc) => {
              const active = loc.key === selectedWeatherKey;
              return (
                <Pressable
                  key={loc.key}
                  onPress={() => {
                    onSelectWeatherKey(loc.key);
                    if (!favorableWeather) onFavorableWeather(true);
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: active }}
                  style={[styles.locationChip, active && styles.locationChipActive]}
                >
                  <Text
                    style={[styles.locationChipText, active && styles.locationChipTextActive]}
                    numberOfLines={1}
                  >
                    {loc.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ) : null}
        {!weatherAvailable ? (
          <Text style={styles.weatherHint}>{ATLAS_COPY_PL.favorableWeatherUnavailable}</Text>
        ) : null}
      </View>
    </View>
  );
}

function pair(values: readonly number[]): readonly [number, number] {
  const [a = 1, b = 12] = values;
  return [Math.round(Math.min(a, b)), Math.round(Math.max(a, b))];
}

function toRange([a, b]: readonly [number, number]): readonly [Month, Month] {
  const clamp = (n: number) => Math.min(12, Math.max(1, n)) as Month;
  return [clamp(a), clamp(b)];
}

const styles = StyleSheet.create({
  root: { gap: SPACE.xs },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  label: { ...TYPE.subhead, color: COLORS.textMuted },
  value: { ...TYPE.headline, color: COLORS.primary },
  scale: { flexDirection: 'row', justifyContent: 'space-between' },
  tick: { ...TYPE.caption, color: COLORS.textSubtle },
  now: { flexDirection: 'row', marginTop: SPACE.s },
  weatherWrap: { gap: SPACE.xs, marginTop: SPACE.s, alignItems: 'flex-start' },
  weatherHint: { ...TYPE.caption, color: COLORS.textMuted },
  locationChips: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.xs, marginTop: SPACE.xs },
  locationChip: {
    minHeight: 36,
    justifyContent: 'center',
    paddingHorizontal: SPACE.m,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
  },
  locationChipActive: { backgroundColor: FILLS.primary, borderWidth: 1, borderColor: COLORS.primary },
  locationChipText: { ...TYPE.caption, fontWeight: '600', color: COLORS.textMuted },
  locationChipTextActive: { color: COLORS.primary, fontWeight: '700' },
});