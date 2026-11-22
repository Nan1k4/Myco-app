/**
 * @file Formatowanie liczb i dat dla UI. Ręcznie, bez `Intl` - zachowanie identyczne
 * niezależnie od wsparcia `Intl` w Hermesie na danym urządzeniu.
 * @module features/predictor/format
 */
import type { IsoDate, IsoDateTime, ResolvedLocation } from '../../domain';
import { LOCATION_SOURCE_LABELS_PL } from '../../i18n/pl';

const WEEKDAYS_PL = ['nd', 'pn', 'wt', 'śr', 'cz', 'pt', 'sb'] as const;

export function formatDayLabel(date: IsoDate): string {
  const [y, m, d] = date.split('-').map(Number) as [number, number, number];
  const weekday = WEEKDAYS_PL[new Date(Date.UTC(y, m - 1, d)).getUTCDay()] ?? '';
  return `${weekday} ${pad(d)}.${pad(m)}`;
}

export function formatTime(iso: IsoDateTime): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatUpdatedAt(iso: IsoDateTime, now: Date = new Date()): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  const sameDay =
    date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
  return sameDay ? `dziś ${formatTime(iso)}` : `${pad(date.getDate())}.${pad(date.getMonth() + 1)} ${formatTime(iso)}`;
}

export function formatNumber(value: number | null, digits = 1, unit = ''): string {
  if (value === null) return '—';
  const rounded = Number(value.toFixed(digits)) || 0; 
  const text = rounded.toFixed(digits).replace('.', ',');
  return unit ? `${text} ${unit}` : text;
}

export function formatSoilMoisture(value: number | null): string {
  return value === null ? '—' : `${Math.round(value * 100)}%`;
}

export function describeLocation(location: ResolvedLocation): string {
  if (location.label) return location.label;
  const source = LOCATION_SOURCE_LABELS_PL[location.source];
  return location.accuracyM !== null ? `${source} (±${formatNumber(location.accuracyM, 0, 'm')})` : source;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

