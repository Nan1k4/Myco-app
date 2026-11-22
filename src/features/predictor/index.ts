/**
 * @file Publiczne API modułu predykcji.
 * @module features/predictor
 */
export { FLUSH_MODEL_VERSION, predictFlush, requiredHistoryDays, type PredictFlushInput } from './predictFlush';
export { summarizeWeather, type WeatherSummary } from './weatherMetrics';
export type { ForecastKey } from './store/forecastStore';
export {
  FAVORABLE_WEATHER_MIN_SCORE,
  getFavorableSpeciesIds,
  listAvailableWeatherLocations,
  useWeatherFilter,
  type WeatherFilterData,
  type WeatherLocationOption,
} from './weatherFilter';
