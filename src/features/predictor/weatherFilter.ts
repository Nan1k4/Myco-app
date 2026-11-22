import { useMemo } from 'react';
import type { IsoDateTime, MushroomId, WeatherSnapshot } from '../../domain';
import { cachedPrediction } from './predictionCache';
import { CUSTOM_KEY, DEVICE_KEY, type ForecastKey, type ForecastState } from './store/forecastStore';
import { useForecastState } from './store/hooks';

export const FAVORABLE_WEATHER_MIN_SCORE = 50;

export interface WeatherLocationOption {
  readonly key: ForecastKey;
  readonly label: string;
  readonly snapshot: WeatherSnapshot;
  readonly fetchedAt: IsoDateTime;
}

export interface WeatherFilterData {
  readonly hydrated: boolean;
  readonly available: boolean;
  readonly locations: readonly WeatherLocationOption[];
  readonly activeKey: ForecastKey | null;
  readonly locationLabel: string | null;
  readonly fetchedAt: IsoDateTime | null;
  readonly favorableIds: ReadonlySet<MushroomId> | null;
}

export function listAvailableWeatherLocations(state: ForecastState): readonly WeatherLocationOption[] {
  const list: WeatherLocationOption[] = [];

  const device = state.entries[DEVICE_KEY]?.stored;
  if (device) {
    list.push({ key: DEVICE_KEY, label: 'Twoja okolica', snapshot: device.snapshot, fetchedAt: device.snapshot.fetchedAt });
  }

  const custom = state.entries[CUSTOM_KEY]?.stored;
  if (custom && state.customPlace) {
    list.push({ key: CUSTOM_KEY, label: state.customPlace.name, snapshot: custom.snapshot, fetchedAt: custom.snapshot.fetchedAt });
  }

  for (const place of state.places) {
    const stored = state.entries[place.id]?.stored;
    if (stored) {
      list.push({ key: place.id, label: place.name, snapshot: stored.snapshot, fetchedAt: stored.snapshot.fetchedAt });
    }
  }

  return list;
}

export function getFavorableSpeciesIds(snapshot: WeatherSnapshot): ReadonlySet<MushroomId> {
  const prediction = cachedPrediction(snapshot);
  const ids = new Set<MushroomId>();
  for (const candidate of prediction.candidates) {
    if (candidate.score >= FAVORABLE_WEATHER_MIN_SCORE) {
      ids.add(candidate.mushroomId);
    }
  }
  return ids;
}

export function useWeatherFilter(selectedKey: ForecastKey | null = null): WeatherFilterData {
  const state = useForecastState();

  return useMemo(() => {
    const locations = listAvailableWeatherLocations(state);
    const active = (selectedKey ? locations.find((l) => l.key === selectedKey) : undefined) ?? locations[0] ?? null;

    if (!active) {
      return {
        hydrated: state.hydrated,
        available: false,
        locations,
        activeKey: null,
        locationLabel: null,
        fetchedAt: null,
        favorableIds: null,
      };
    }

    return {
      hydrated: state.hydrated,
      available: true,
      locations,
      activeKey: active.key,
      locationLabel: active.label,
      fetchedAt: active.fetchedAt,
      favorableIds: getFavorableSpeciesIds(active.snapshot),
    };
  }, [state, selectedKey]);
}