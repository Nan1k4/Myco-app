/**
 * @file Heurystyka wysypu. Czysta funkcja: (pogoda, baza, zegar) → {@link FlushPrediction}.
 * @module features/predictor/predictFlush
 */
import { OPEN_METEO_MAX_PAST_DAYS } from '../../api/openMeteo';
import { DEFAULT_HISTORY_DAYS } from '../../api/weatherService';
import type { PredictorSpeciesRow } from '../../db/types';
import {
  toIsoDateTime,
  type DailyWeather,
  type EdibilityCategory,
  type FlushLevel,
  type FlushPrediction,
  type Month,
  type Mushroom,
  type MushroomId,
  type NumericRange,
  type PredictionConfidence,
  type PredictionFactor,
  type SpeciesCandidate,
  type WeatherSnapshot,
} from '../../domain';
import {
  completeness,
  countFrostDays,
  daysInAgeWindow,
  lastDays,
  meanSoilMoisture,
  meanTemperature,
  sumPrecipitation,
  targetMonth,
} from './weatherMetrics';

export const FLUSH_MODEL_VERSION = 'heuristic-1';

export type PredictableSpecies = Mushroom | PredictorSpeciesRow;

/* -------------------------------- Parametry ------------------------------- */

type WeightedFactorKind = Exclude<PredictionFactor['kind'], 'frost'>;

const WEIGHTS: Readonly<Record<WeightedFactorKind, number>> = {
  precipitation: 0.4,
  temperature: 0.25,
  season: 0.2,
  soil_moisture: 0.15,
};

const PRECIPITATION = { windowDays: 10, neutralMm: 20, spanMm: 20 } as const;
const TEMPERATURE = { windowDays: 7, optimalC: { min: 10, max: 20 }, falloffC: 8 } as const;
const SOIL_MOISTURE = { windowDays: 3, neutral: 0.25, span: 0.1 } as const;
const FROST = { windowDays: 5, daysForFullPenalty: 3 } as const;

const SPECIES = {
  precipitationWeight: 0.6,
  temperatureWeight: 0.4,
  temperatureFalloffC: 5,
  unknownScore: 0.5,
  frostWindowDays: 3,
  frostMultiplier: 0.2,
} as const;

const LEVEL_THRESHOLDS: readonly (readonly [number, FlushLevel])[] = [
  [80, 'very_high'],
  [60, 'high'],
  [40, 'moderate'],
  [20, 'low'],
];

const CONFIDENCE = {
  highMinCompleteness: 0.95,
  mediumMinCompleteness: 0.75,
  highMaxAgeH: 6,
  mediumMaxAgeH: 24,
} as const;

/* --------------------------------- API ------------------------------------ */

export interface PredictFlushInput {
  readonly snapshot: WeatherSnapshot;
  /** Gatunki do oceny (pełna lista lub wstępnie przefiltrowana po miesiącu z SQLite). */
  readonly species: readonly PredictableSpecies[];
  /** Łączna liczba gatunków w bazie — wymagana dla poprawnego `seasonFactor`, gdy `species` jest przefiltrowane po miesiącu. */
  readonly totalSpeciesCount?: number;
  /** Wstrzykiwany zegar - determinizm i testowalność. */
  readonly now: Date;
}

export function requiredHistoryDaysFromMaxLag(maxLag: number): number {
  return Math.min(OPEN_METEO_MAX_PAST_DAYS, Math.max(DEFAULT_HISTORY_DAYS, PRECIPITATION.windowDays, Math.ceil(maxLag)));
}

export function requiredHistoryDays(species: readonly PredictableSpecies[]): number {
  const maxLag = species.reduce((max, s) => Math.max(max, extractParams(s).lagMax), 0);
  return requiredHistoryDaysFromMaxLag(maxLag);
}

export function predictFlush({ snapshot, species, totalSpeciesCount, now }: PredictFlushInput): FlushPrediction {
  const { days } = snapshot;
  const month = targetMonth(days[days.length - 1]?.date ?? days[0].date);

  const weighted = [
    precipitationFactor(days),
    temperatureFactor(days),
    seasonFactor(species, month, totalSpeciesCount),
    soilMoistureFactor(days),
  ].filter((f): f is PredictionFactor & { kind: WeightedFactorKind } => f !== null);
  const frost = frostFactor(days);

  const totalWeight = weighted.reduce((sum, f) => sum + WEIGHTS[f.kind], 0);
  const combined =
    totalWeight === 0
      ? -1
      : weighted.reduce((sum, f) => sum + WEIGHTS[f.kind] * f.contribution, 0) / totalWeight;
  const index = Math.round(clamp((50 + 50 * combined) * (1 + frost.contribution), 0, 100));

  const candidates = rankCandidates(species, days, month);

  return {
    index,
    level: toLevel(index),
    confidence: assessConfidence(snapshot, species, month, now, weighted),
    factors: [...weighted, frost],
    candidates,
    coords: snapshot.coords,
    computedAt: toIsoDateTime(now),
    weatherFetchedAt: snapshot.fetchedAt,
    modelVersion: FLUSH_MODEL_VERSION,
  };
}

/* -------------------------------- Adapter --------------------------------- */

interface SpeciesFruitingParams {
  readonly id: MushroomId;
  readonly edibilityCategory: EdibilityCategory;
  readonly optTempRange: NumericRange;
  readonly minPrecipMm: number;
  readonly lagMin: number;
  readonly lagMax: number;
  readonly frostSensitive: boolean;
}

function isPredictorRow(species: PredictableSpecies): species is PredictorSpeciesRow {
  return 'monthsMask' in species;
}

function isInMonth(species: PredictableSpecies, month: Month): boolean {
  return isPredictorRow(species)
    ? (species.monthsMask & (1 << (month - 1))) !== 0
    : species.fruiting.months.includes(month);
}

function extractParams(species: PredictableSpecies): SpeciesFruitingParams {
  if (isPredictorRow(species)) {
    return {
      id: species.id,
      edibilityCategory: species.edibilityCategory,
      optTempRange: { min: species.optTempMin, max: species.optTempMax },
      minPrecipMm: species.minPrecipMm,
      lagMin: species.lagMin,
      lagMax: species.lagMax,
      frostSensitive: species.frostSensitive,
    };
  }
  return {
    id: species.id,
    edibilityCategory: species.edibility.category,
    optTempRange: species.fruiting.optimalMeanTempC,
    minPrecipMm: species.fruiting.minPrecipitationMm,
    lagMin: species.fruiting.lagDays.min,
    lagMax: species.fruiting.lagDays.max,
    frostSensitive: species.fruiting.frostSensitive,
  };
}

/* -------------------------------- Czynniki -------------------------------- */

function precipitationFactor(days: readonly DailyWeather[]): PredictionFactor | null {
  const window = lastDays(days, PRECIPITATION.windowDays);
  const total = sumPrecipitation(window);
  if (total === null) return null;
  return {
    kind: 'precipitation',
    contribution: linear(total, PRECIPITATION.neutralMm, PRECIPITATION.spanMm),
    description: `Opady z ${window.length} dni: ${total.toFixed(1)} mm`,
  };
}

function temperatureFactor(days: readonly DailyWeather[]): PredictionFactor | null {
  const window = lastDays(days, TEMPERATURE.windowDays);
  const meanC = meanTemperature(window);
  if (meanC === null) return null;
  const distance = distanceToRange(meanC, TEMPERATURE.optimalC);
  return {
    kind: 'temperature',
    contribution: clamp(1 - (2 * distance) / TEMPERATURE.falloffC, -1, 1),
    description: `Średnia temperatura z ${window.length} dni: ${meanC.toFixed(1)} °C (optimum ${TEMPERATURE.optimalC.min}-${TEMPERATURE.optimalC.max} °C)`,
  };
}

function seasonFactor(
  species: readonly PredictableSpecies[],
  month: Month,
  totalSpeciesCount?: number,
): PredictionFactor | null {
  const total = totalSpeciesCount ?? species.length;
  if (total === 0) return null;
  const inSeason = species.filter((s) => isInMonth(s, month)).length;
  return {
    kind: 'season',
    contribution: (2 * inSeason) / total - 1,
    description: `Sezon: owocnikuje ${inSeason} z ${total} gatunków w bazie`,
  };
}

function soilMoistureFactor(days: readonly DailyWeather[]): PredictionFactor | null {
  const value = meanSoilMoisture(lastDays(days, SOIL_MOISTURE.windowDays));
  if (value === null) return null;
  return {
    kind: 'soil_moisture',
    contribution: linear(value, SOIL_MOISTURE.neutral, SOIL_MOISTURE.span),
    description: `Wilgotność gleby (0-9 cm): ${(value * 100).toFixed(0)}% obj.`,
  };
}

function frostFactor(days: readonly DailyWeather[]): PredictionFactor {
  const window = lastDays(days, FROST.windowDays);
  const frostDays = countFrostDays(window);
  return {
    kind: 'frost',
    contribution: -Math.min(1, frostDays / FROST.daysForFullPenalty),
    description:
      frostDays === 0
        ? `Brak przymrozków w ostatnich ${window.length} dniach`
        : `Przymrozek w ${frostDays} z ${window.length} ostatnich dni`,
  };
}

/* -------------------------------- Gatunki --------------------------------- */

function rankCandidates(
  species: readonly PredictableSpecies[],
  days: readonly DailyWeather[],
  month: Month,
): SpeciesCandidate[] {
  return species
    .flatMap((s): SpeciesCandidate[] => {
      const score = scoreSpecies(s, days, month);
      if (score <= 0) return [];
      const { id, edibilityCategory } = extractParams(s);
      return [{ mushroomId: id, score, edibilityCategory }];
    })
    .sort((a, b) => b.score - a.score || a.mushroomId.localeCompare(b.mushroomId));
}

function scoreSpecies(species: PredictableSpecies, days: readonly DailyWeather[], month: Month): number {
  if (!isInMonth(species, month)) return 0;
  const params = extractParams(species);

  const rain = sumPrecipitation(daysInAgeWindow(days, params.lagMin, params.lagMax));
  const rainScore =
    rain === null ? SPECIES.unknownScore : params.minPrecipMm <= 0 ? 1 : clamp(rain / params.minPrecipMm, 0, 1);

  const temp = meanTemperature(lastDays(days, TEMPERATURE.windowDays));
  const tempScore =
    temp === null
      ? SPECIES.unknownScore
      : clamp(1 - distanceToRange(temp, params.optTempRange) / SPECIES.temperatureFalloffC, 0, 1);

  const frostHit = params.frostSensitive && countFrostDays(lastDays(days, SPECIES.frostWindowDays)) > 0;
  const raw =
    (SPECIES.precipitationWeight * rainScore + SPECIES.temperatureWeight * tempScore) *
    (frostHit ? SPECIES.frostMultiplier : 1);
  return Math.round(100 * raw);
}

/* ------------------------------- Pewność ---------------------------------- */

function assessConfidence(
  snapshot: WeatherSnapshot,
  species: readonly PredictableSpecies[],
  month: Month,
  now: Date,
  weighted: readonly PredictionFactor[],
): PredictionConfidence {
  const window = lastDays(snapshot.days, PRECIPITATION.windowDays);
  const ratio = completeness(window);
  const ageH = (now.getTime() - Date.parse(snapshot.fetchedAt)) / 3_600_000;
  const hasHistory = window.length >= PRECIPITATION.windowDays;
  const hasCoreFactors =
    weighted.some((f) => f.kind === 'precipitation') && weighted.some((f) => f.kind === 'temperature');
  const hasSoil = weighted.some((f) => f.kind === 'soil_moisture');
  const lagCovered = species
    .filter((s) => isInMonth(s, month))
    .every((s) => extractParams(s).lagMax <= snapshot.days.length);

  if (!hasCoreFactors || !Number.isFinite(ageH)) return 'low';
  if (ratio >= CONFIDENCE.highMinCompleteness && ageH <= CONFIDENCE.highMaxAgeH && hasHistory && hasSoil && lagCovered) {
    return 'high';
  }
  if (ratio >= CONFIDENCE.mediumMinCompleteness && ageH <= CONFIDENCE.mediumMaxAgeH) return 'medium';
  return 'low';
}

/* -------------------------------- Narzędzia ------------------------------- */

function toLevel(index: number): FlushLevel {
  return LEVEL_THRESHOLDS.find(([threshold]) => index >= threshold)?.[1] ?? 'very_low';
}

function linear(value: number, neutral: number, span: number): number {
  return clamp((value - neutral) / span, -1, 1);
}

function distanceToRange(value: number, range: NumericRange): number {
  return value < range.min ? range.min - value : value > range.max ? value - range.max : 0;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}