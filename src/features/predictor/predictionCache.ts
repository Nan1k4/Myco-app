/**
 * @file Prognozy dla listy miejsc liczone raz na zrzut pogody (klucz: tożsamość obiektu).
 * @module features/predictor/predictionCache
 */
import { getDatabaseMeta, getPredictorSpeciesForMonth } from '../../db/repositories/speciesRepository';
import type { FlushPrediction, WeatherSnapshot } from '../../domain';
import { predictFlush } from './predictFlush';
import { targetMonth } from './weatherMetrics';

const cache = new WeakMap<WeatherSnapshot, FlushPrediction>();

export function cachedPrediction(snapshot: WeatherSnapshot): FlushPrediction {
  const cached = cache.get(snapshot);
  if (cached) return cached;

  const { days } = snapshot;
  const month = targetMonth(days[days.length - 1]?.date ?? days[0].date);
  const species = getPredictorSpeciesForMonth(month);
  const totalSpeciesCount = getDatabaseMeta().speciesCount;

  const prediction = predictFlush({ snapshot, species, totalSpeciesCount, now: new Date() });
  cache.set(snapshot, prediction);
  return prediction;
}