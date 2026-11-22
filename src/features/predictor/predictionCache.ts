/**
 * @file Prognozy dla listy miejsc liczone z TTL oraz unieważnieniem na progach pewności (klucz: tożsamość obiektu).
 * @module features/predictor/predictionCache
 */
import { getDatabaseMeta, getPredictorSpeciesForMonth } from '../../db/repositories/speciesRepository';
import type { FlushPrediction, WeatherSnapshot } from '../../domain';
import { CONFIDENCE, predictFlush } from './predictFlush';
import { targetMonth } from './weatherMetrics';

const CACHE_TTL_MS = 15 * 60 * 1000;
const HOUR_MS = 3_600_000;

interface CacheEntry {
  readonly prediction: FlushPrediction;
  readonly computedAtMs: number;
  readonly expiresAtMs: number;
}

const cache = new WeakMap<WeatherSnapshot, CacheEntry>();

function computeExpiresAtMs(fetchedAt: string, nowMs: number): number {
  let expiry = nowMs + CACHE_TTL_MS;
  const fetchedMs = Date.parse(fetchedAt);
  if (!Number.isFinite(fetchedMs)) return expiry;

  const highBoundary = fetchedMs + CONFIDENCE.highMaxAgeH * HOUR_MS + 1;
  const mediumBoundary = fetchedMs + CONFIDENCE.mediumMaxAgeH * HOUR_MS + 1;
  if (highBoundary > nowMs && highBoundary < expiry) expiry = highBoundary;
  if (mediumBoundary > nowMs && mediumBoundary < expiry) expiry = mediumBoundary;
  return expiry;
}

export function cachedPrediction(snapshot: WeatherSnapshot, now: Date = new Date()): FlushPrediction {
  const nowMs = now.getTime();
  const cached = cache.get(snapshot);
  if (cached && nowMs >= cached.computedAtMs && nowMs < cached.expiresAtMs) {
    return cached.prediction;
  }

  const { days } = snapshot;
  const month = targetMonth(days[days.length - 1]?.date ?? days[0].date);
  const species = getPredictorSpeciesForMonth(month);
  const totalSpeciesCount = getDatabaseMeta().speciesCount;

  const prediction = predictFlush({ snapshot, species, totalSpeciesCount, now });
  if (Number.isFinite(nowMs)) {
    cache.set(snapshot, {
      prediction,
      computedAtMs: nowMs,
      expiresAtMs: computeExpiresAtMs(snapshot.fetchedAt, nowMs),
    });
  }
  return prediction;
}