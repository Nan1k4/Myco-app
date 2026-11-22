/**
 * @file Czyste agregaty na dniach pogodowych + podsumowanie „surowych danych” dla UI.
 * Konwencja wieku dnia: 1 = ostatni pełny dzień (wczoraj), rośnie w przeszłość.
 * @module features/predictor/weatherMetrics
 */
import type { DailyWeather, IsoDate, Month, WeatherSnapshot } from '../../domain';

export function daysInAgeWindow(days: readonly DailyWeather[], minAge: number, maxAge: number): readonly DailyWeather[] {
  const from = Math.max(0, days.length - Math.floor(maxAge));
  const to = days.length - Math.max(1, Math.ceil(minAge)) + 1;
  return from < to ? days.slice(from, to) : [];
}

export function lastDays(days: readonly DailyWeather[], count: number): readonly DailyWeather[] {
  return daysInAgeWindow(days, 1, count);
}

export function sumPrecipitation(days: readonly DailyWeather[]): number | null {
  const values = present(days.map((d) => d.precipitationMm));
  return values.length === 0 ? null : values.reduce((sum, v) => sum + v, 0);
}

export function meanTemperature(days: readonly DailyWeather[]): number | null {
  return mean(present(days.map((d) => d.tempMeanC)));
}

export function meanSoilMoisture(days: readonly DailyWeather[]): number | null {
  return mean(present(days.map((d) => d.soilMoisture)));
}

export function countFrostDays(days: readonly DailyWeather[]): number {
  return days.filter((d) => d.tempMinC !== null && d.tempMinC < 0).length;
}

export function completeness(days: readonly DailyWeather[]): number {
  if (days.length === 0) return 0;
  const fields = days.flatMap((d) => [d.precipitationMm, d.tempMinC, d.tempMeanC]);
  return present(fields).length / fields.length;
}

export function targetMonth(lastDate: IsoDate): Month {
  const [y, m, d] = lastDate.split('-').map(Number) as [number, number, number];
  return (new Date(Date.UTC(y, m - 1, d + 1)).getUTCMonth() + 1) as Month;
}

/* ---------------------------- Podsumowanie UI ------------------------------ */

/** „Surowe dane” prezentowane użytkownikowi obok indeksu. */
export interface WeatherSummary {
  readonly periodDays: number;
  readonly firstDate: IsoDate;
  readonly lastDate: IsoDate;
  readonly totalPrecipitationMm: number | null;
  /** Dni z opadem ≥ 1 mm. */
  readonly rainyDays: number;
  readonly meanTempC: number | null;
  readonly minTempC: number | null;
  readonly maxTempC: number | null;
  readonly frostDays: number;
  readonly latestSoilMoisture: number | null;
  readonly days: WeatherSnapshot['days'];
}

const RAINY_DAY_THRESHOLD_MM = 1;

export function summarizeWeather(snapshot: WeatherSnapshot): WeatherSummary {
  const { days } = snapshot;
  const mins = present(days.map((d) => d.tempMinC));
  const maxs = present(days.map((d) => d.tempMaxC));
  const soil = present(days.map((d) => d.soilMoisture));

  return {
    periodDays: days.length,
    firstDate: days[0].date,
    lastDate: days[days.length - 1]?.date ?? days[0].date,
    totalPrecipitationMm: sumPrecipitation(days),
    rainyDays: days.filter((d) => (d.precipitationMm ?? 0) >= RAINY_DAY_THRESHOLD_MM).length,
    meanTempC: meanTemperature(days),
    minTempC: mins.length ? Math.min(...mins) : null,
    maxTempC: maxs.length ? Math.max(...maxs) : null,
    frostDays: countFrostDays(days),
    latestSoilMoisture: soil[soil.length - 1] ?? null,
    days,
  };
}

/* -------------------------------- Narzędzia ------------------------------- */

function present(values: readonly (number | null)[]): number[] {
  return values.filter((v): v is number => v !== null);
}

function mean(values: readonly number[]): number | null {
  return values.length === 0 ? null : values.reduce((sum, v) => sum + v, 0) / values.length;
}
