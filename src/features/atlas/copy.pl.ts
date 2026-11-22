/**
 * @file Teksty atlasu. `Record<…>` - brak etykiety dla nowej wartości słownika to błąd kompilacji.
 * @module features/atlas/copy
 */
import type { Month, NonEmptyArray } from '../../domain';
import type { AtlasSort, FacetGroupId } from './engine';


export const MONTH_SHORT_PL: Readonly<Record<Month, string>> = {
  1: 'sty',
  2: 'lut',
  3: 'mar',
  4: 'kwi',
  5: 'maj',
  6: 'cze',
  7: 'lip',
  8: 'sie',
  9: 'wrz',
  10: 'paź',
  11: 'lis',
  12: 'gru',
};

export const MONTH_LONG_PL: Readonly<Record<Month, string>> = {
  1: 'styczeń',
  2: 'luty',
  3: 'marzec',
  4: 'kwiecień',
  5: 'maj',
  6: 'czerwiec',
  7: 'lipiec',
  8: 'sierpień',
  9: 'wrzesień',
  10: 'październik',
  11: 'listopad',
  12: 'grudzień',
};

export const SORT_LABELS_PL: Readonly<Record<AtlasSort, string>> = {
  alpha: 'A-Z',
  edible_first: 'Od jadalnych',
  dangerous_first: 'Od trujących',
};

export const GROUP_TITLES_PL: Readonly<Record<FacetGroupId, string>> = {
  edibility: 'Jadalność',
  season: 'Sezon',
  habitat: 'Siedlisko',
  underside: 'Spód kapelusza',
  cap: 'Kapelusz',
  stipe: 'Trzon',
  veil: 'Pierścień i pochwa',
  reactions: 'Wysyp, miąższ i reakcje barwne',
  smell: 'Zapach',
};

export const ATLAS_COPY_PL = {
  title: 'Atlas',
  searchPlaceholder: 'Szukaj: nazwa polska, łacińska, ludowa',
  filters: 'Filtry',
  clearAll: 'Wyczyść wszystko',
  browsingNote: 'Przeglądanie atlasu, nie rozpoznawanie.',
  recognizeLink: 'Rozpoznaj w Kluczu',
  empty: 'Żaden gatunek nie spełnia wszystkich filtrów.',
  protectedOption: 'Gatunek chroniony',
  inSeasonNow: 'Owocnikuje teraz',
  wholeYear: 'Cały rok',
  presetsTitle: 'Zapisane filtry',
  presetSave: 'Zapisz bieżące',
  presetNamePlaceholder: 'Nazwa, np. Wystawa - trujące',
  presetLimit: 'Limit zapisanych filtrów',
  presetEmptyName: 'Nadaj nazwę.',
  presetDuplicate: 'Taka nazwa już istnieje.',
  favorableWeather: 'Sprzyjająca pogoda',
  favorableWeatherUnavailable: 'Brak danych pogodowych - sprawdź pogodę w zakładce Wysyp.',
} as const;

/** „cze-wrz”; jeden miesiąc - „sie”. */
export function formatMonthRange(from: Month, to: Month): string {
  return from === to ? MONTH_SHORT_PL[from] : `${MONTH_SHORT_PL[from]}-${MONTH_SHORT_PL[to]}`;
}

/**
 * Formatuje zbiór miesięcy owocnikowania w zwięzłe przedziały na cyklu 12-miesięcznym
 * (np. `[1,2,3,10,11,12]` → `paź-mar`, `[9,10,11,12,1,2,3,4]` → `wrz-kwi`).
 */
export function formatMonthsLabel(months: NonEmptyArray<Month>): string {
  const sorted = [...new Set(months)].sort((a, b) => a - b) as Month[];
  if (sorted.length === 12) {
    return formatMonthRange(1, 12);
  }

  const ranges: [Month, Month][] = [];
  for (const month of sorted) {
    const prev = ranges[ranges.length - 1];
    if (prev && month === prev[1] + 1) {
      prev[1] = month;
    } else {
      ranges.push([month, month]);
    }
  }

  const first = ranges[0];
  const last = ranges[ranges.length - 1];
  if (ranges.length > 1 && first && last && first[0] === 1 && last[1] === 12) {
    ranges.pop();
    first[0] = last[0];
  }

  return ranges.map(([from, to]) => formatMonthRange(from, to)).join(', ');
}
