/**
 * @file Jedyna instancja magazynu prognoz w aplikacji: AsyncStorage + Open-Meteo + GPS.
 * @module features/predictor/store/instance
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resolveLocation } from '../../../api/locationService';
import { fetchWeatherSnapshot } from '../../../api/weatherService';
import { getMaxFruitingLagDays } from '../../../db/repositories/speciesRepository';
import { requiredHistoryDaysFromMaxLag } from '../predictFlush';
import { createForecastStore } from './forecastStore';

let cachedPastDays: number | null = null;

function getPastDays(): number {
  cachedPastDays ??= requiredHistoryDaysFromMaxLag(getMaxFruitingLagDays());
  return cachedPastDays;
}

export const forecastStore = createForecastStore({
  storage: AsyncStorage,
  fetchWeather: (coords) => fetchWeatherSnapshot(coords, { pastDays: getPastDays() }),
  resolveDeviceLocation: () => resolveLocation(),
  now: () => new Date(),
  newId: () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
  onPersistError: (error) => console.warn('[forecastStore] zapis/odczyt nie powiódł się:', error),
});