/**
 * @file DTO Open-Meteo Forecast API (`/v1/forecast` z `past_days`) i czyste mapowanie na domenę.
 *
 * Dlaczego Forecast, a nie Archive API: Archive (ERA5) ma kilkudniowe opóźnienie, a dla
 * predykcji wysypu najważniejsze są właśnie ostatnie dni. Forecast API z `past_days`
 * zwraca dane modelowe aż do dziś.
 *
 * @module api/openMeteo
 */
import { toIsoDateTime, type DailyWeather, type GeoCoordinates, type IsoDate, type NonEmptyArray, type WeatherSnapshot } from '../domain';
import { buildQuery } from './http';

export const OPEN_METEO_FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

/** Limit `past_days` w Forecast API. */
export const OPEN_METEO_MAX_PAST_DAYS = 92;

const DAILY_VARS = ['precipitation_sum', 'temperature_2m_min', 'temperature_2m_max'] as const;
type DailyVar = (typeof DAILY_VARS)[number];

/**
 * Średnią temperaturę liczymy z danych godzinowych – nie zależymy od zmiennej dobowej
 * `temperature_2m_mean`, której nieobsługiwanie skończyłoby się 400 dla całego żądania.
 */
const SOIL_LAYERS = [
  { key: 'soil_moisture_0_to_1cm', thicknessCm: 1 },
  { key: 'soil_moisture_1_to_3cm', thicknessCm: 2 },
  { key: 'soil_moisture_3_to_9cm', thicknessCm: 6 },
] as const;
const HOURLY_VARS = ['temperature_2m', ...SOIL_LAYERS.map((layer) => layer.key)] as const;
type HourlyVar = (typeof HOURLY_VARS)[number];

const EXPECTED_UNITS = {
  daily: { precipitation_sum: 'mm', temperature_2m_min: '°C', temperature_2m_max: '°C' },
  hourly: { temperature_2m: '°C' },
} as const;

/** Min. udział godzin z danymi, by średnia dobowa z danych godzinowych była wiarygodna. */
const MIN_HOURLY_COVERAGE = 0.75;

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const ISO_HOUR_PATTERN = /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}$/;

/* ---------------------------------- DTO ----------------------------------- */

type NullableSeries = readonly (number | null)[];

/** Odpowiedź sukcesu (tablice równoległe – nie wychodzą poza ten moduł). */
interface OpenMeteoForecastDto {
  readonly utc_offset_seconds: number;
  readonly timezone: string;
  readonly daily: { readonly time: readonly string[] } & Readonly<Record<DailyVar, NullableSeries>>;
  readonly hourly: { readonly time: readonly string[] } & Readonly<Record<HourlyVar, NullableSeries>>;
}

export type ParseResult<T> = { readonly ok: true; readonly value: T } | { readonly ok: false; readonly error: string };

/* --------------------------------- Request -------------------------------- */

/** `forecast_days=1` + odcięcie dnia bieżącego w parserze – dziś to częściowo prognoza. */
export function buildForecastUrl(coords: GeoCoordinates, pastDays: number): string {
  const query = buildQuery({
    latitude: String(coords.latitude),
    longitude: String(coords.longitude),
    daily: DAILY_VARS.join(','),
    hourly: HOURLY_VARS.join(','),
    past_days: String(pastDays),
    forecast_days: '1',
    timezone: 'auto',
  });
  return `${OPEN_METEO_FORECAST_URL}?${query}`;
}

/**
 * Wyciąga `reason` z odpowiedzi błędu Open-Meteo (`{ "error": true, "reason": "…" }`).
 * Ten sam format zwracają Forecast i Geocoding API.
 */
export function extractErrorReason(body: unknown): string | null {
  return isRecord(body) && body.error === true && typeof body.reason === 'string' ? body.reason : null;
}

/* --------------------------------- Parsing -------------------------------- */

export interface ParseContext {
  /** Współrzędne z żądania (zaokrąglone) – klucz cache, nie komórka siatki modelu. */
  readonly coords: GeoCoordinates;
  readonly fetchedAt: Date;
}

/**
 * Waliduje surowy JSON i mapuje go na {@link WeatherSnapshot}.
 * Zwraca wyłącznie PEŁNE dni (sprzed dzisiejszej daty lokalnej lokalizacji).
 */
export function parseForecastResponse(body: unknown, context: ParseContext): ParseResult<WeatherSnapshot> {
  try {
    const dto = validateDto(body);
    const todayLocal = localIsoDate(context.fetchedAt, dto.utc_offset_seconds);
    const hourlyByDate = aggregateHourly(dto.hourly);

    const days: DailyWeather[] = [];
    dto.daily.time.forEach((date, i) => {
      if (date >= todayLocal) return;
      const tempMinC = dto.daily.temperature_2m_min[i] ?? null;
      const tempMaxC = dto.daily.temperature_2m_max[i] ?? null;
      const hourly = hourlyByDate.get(date);
      days.push({
        date: date as IsoDate,
        precipitationMm: dto.daily.precipitation_sum[i] ?? null,
        tempMinC,
        tempMaxC,
        tempMeanC: hourly?.tempMeanC ?? midpoint(tempMinC, tempMaxC),
        soilMoisture: hourly?.soilMoisture ?? null,
      });
    });

    const [first, ...rest] = days;
    invariant(first !== undefined, 'Brak pełnych dni w odpowiedzi');
    const nonEmptyDays: NonEmptyArray<DailyWeather> = [first, ...rest];

    return {
      ok: true,
      value: { coords: context.coords, timezone: dto.timezone, days: nonEmptyDays, fetchedAt: toIsoDateTime(context.fetchedAt) },
    };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) };
  }
}

/* ------------------------------- Walidacja -------------------------------- */

function validateDto(body: unknown): OpenMeteoForecastDto {
  invariant(isRecord(body), 'Odpowiedź nie jest obiektem');
  invariant(typeof body.utc_offset_seconds === 'number', 'Brak utc_offset_seconds');
  invariant(typeof body.timezone === 'string', 'Brak timezone');
  invariant(isRecord(body.daily) && isRecord(body.daily_units), 'Brak sekcji daily');
  invariant(isRecord(body.hourly) && isRecord(body.hourly_units), 'Brak sekcji hourly');

  assertUnits(body.daily_units, EXPECTED_UNITS.daily);
  assertUnits(body.hourly_units, EXPECTED_UNITS.hourly);

  const dailyTime = readTimeAxis(body.daily, ISO_DATE_PATTERN, 'daily');
  const hourlyTime = readTimeAxis(body.hourly, ISO_HOUR_PATTERN, 'hourly');

  // Sekcje budowane jawnie – bez rzutowania całego `body`.
  const daily = {
    time: dailyTime,
    precipitation_sum: readSeries(body.daily, 'precipitation_sum', dailyTime.length),
    temperature_2m_min: readSeries(body.daily, 'temperature_2m_min', dailyTime.length),
    temperature_2m_max: readSeries(body.daily, 'temperature_2m_max', dailyTime.length),
  };
  const hourly = {
    time: hourlyTime,
    temperature_2m: readSeries(body.hourly, 'temperature_2m', hourlyTime.length),
    soil_moisture_0_to_1cm: readSeries(body.hourly, 'soil_moisture_0_to_1cm', hourlyTime.length),
    soil_moisture_1_to_3cm: readSeries(body.hourly, 'soil_moisture_1_to_3cm', hourlyTime.length),
    soil_moisture_3_to_9cm: readSeries(body.hourly, 'soil_moisture_3_to_9cm', hourlyTime.length),
  };
  return { utc_offset_seconds: body.utc_offset_seconds, timezone: body.timezone, daily, hourly };
}

function assertUnits(units: Record<string, unknown>, expected: Readonly<Record<string, string>>): void {
  for (const [key, unit] of Object.entries(expected)) {
    invariant(units[key] === unit, `Nieoczekiwana jednostka ${key}: ${String(units[key])} (oczekiwano ${unit})`);
  }
}

function readTimeAxis(section: Record<string, unknown>, pattern: RegExp, name: string): readonly string[] {
  const time = section.time;
  invariant(Array.isArray(time) && time.length > 0, `Pusta oś czasu ${name}`);
  invariant(
    time.every((t): t is string => typeof t === 'string' && pattern.test(t)),
    `Niepoprawny format czasu w ${name} (wymagane timeformat=iso8601)`,
  );
  return time;
}

function readSeries(section: Record<string, unknown>, key: string, expectedLength: number): NullableSeries {
  const series = section[key];
  invariant(Array.isArray(series), `Brak serii ${key}`);
  invariant(series.length === expectedLength, `Seria ${key} ma długość ${series.length}, oczekiwano ${expectedLength}`);
  invariant(
    series.every((v): v is number | null => v === null || (typeof v === 'number' && Number.isFinite(v))),
    `Seria ${key} zawiera wartości nieliczbowe`,
  );
  return series;
}

/* ------------------------------- Agregacja -------------------------------- */

interface HourlyDailyAggregate {
  readonly tempMeanC: number | null;
  readonly soilMoisture: number | null;
}

/** Średnie dobowe z danych godzinowych. Mianownik = liczba godzin danej daty (23/25 przy DST). */
function aggregateHourly(hourly: OpenMeteoForecastDto['hourly']): ReadonlyMap<string, HourlyDailyAggregate> {
  const totalSoilThickness = SOIL_LAYERS.reduce((sum, layer) => sum + layer.thicknessCm, 0);
  const buckets = new Map<string, { hours: number; temps: number[]; soils: number[] }>();

  hourly.time.forEach((timestamp, i) => {
    const date = ISO_HOUR_PATTERN.exec(timestamp)?.[1];
    if (date === undefined) return; // wykluczone przez walidację
    const bucket = buckets.get(date) ?? { hours: 0, temps: [], soils: [] };
    bucket.hours += 1;

    const temp = hourly.temperature_2m[i];
    if (temp != null) bucket.temps.push(temp);

    // Wartość ważona tylko, gdy znane są wszystkie warstwy – inaczej zaniżylibyśmy średnią.
    let weighted = 0;
    let complete = true;
    for (const layer of SOIL_LAYERS) {
      const value = hourly[layer.key][i];
      if (value == null) {
        complete = false;
        break;
      }
      weighted += value * layer.thicknessCm;
    }
    if (complete) bucket.soils.push(weighted / totalSoilThickness);

    buckets.set(date, bucket);
  });

  const result = new Map<string, HourlyDailyAggregate>();
  for (const [date, { hours, temps, soils }] of buckets) {
    result.set(date, {
      tempMeanC: temps.length / hours >= MIN_HOURLY_COVERAGE ? mean(temps) : null,
      soilMoisture: soils.length / hours >= MIN_HOURLY_COVERAGE ? mean(soils) : null,
    });
  }
  return result;
}

/* -------------------------------- Narzędzia ------------------------------- */

/** Dzisiejsza data w strefie lokalizacji – z `utc_offset_seconds`, bez zależności od `Intl` (Hermes). */
function localIsoDate(instant: Date, utcOffsetSeconds: number): string {
  return new Date(instant.getTime() + utcOffsetSeconds * 1000).toISOString().slice(0, 10);
}

function midpoint(a: number | null, b: number | null): number | null {
  return a !== null && b !== null ? (a + b) / 2 : null;
}

function mean(values: readonly number[]): number | null {
  return values.length === 0 ? null : values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** Obiekt JSON (nie `null`, nie tablica). */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function invariant(condition: boolean, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
