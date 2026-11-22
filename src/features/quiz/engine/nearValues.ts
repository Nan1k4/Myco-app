/**
 * @file Tolerancja percepcji barw: wartość sąsiednia daje częściowe zaliczenie w wyniku %.
 *
 * Barwa oceniana „na oko” zależy od światła, wieku i wilgotności owocnika (brązowy ↔ ciemnobrązowy).
 * Tolerancja działa WYŁĄCZNIE na wynik % - nigdy na wykluczanie (to robi tylko niezgodność dokładna)
 * ani na Bramkę.
 * @module features/quiz/engine/nearValues
 */
import { COLORS, type Color, type FeatureKey } from '../../../domain';
import { bitOf } from '../../filter/engine/featureBits';

/** Relacja symetryczna (pilnuje test). */
export const COLOR_NEIGHBOURS: Readonly<Record<Color, readonly Color[]>> = {
  none: [],
  white: ['cream', 'grey'],
  cream: ['white', 'yellow', 'ochre', 'brown_light'],
  yellow: ['cream', 'ochre', 'orange', 'olive'],
  ochre: ['cream', 'yellow', 'orange', 'brown_light', 'rust'],
  orange: ['yellow', 'ochre', 'red', 'brown_light', 'rust'],
  red: ['orange', 'pink', 'burgundy', 'red_brown'],
  burgundy: ['red', 'purple', 'red_brown'],
  pink: ['red', 'violet'],
  violet: ['pink', 'purple', 'blue'],
  purple: ['violet', 'burgundy'],
  blue: ['violet', 'grey'],
  rust: ['ochre', 'orange', 'brown_light', 'brown', 'red_brown'],
  brown_light: ['cream', 'ochre', 'orange', 'brown', 'rust'],
  brown: ['brown_light', 'brown_dark', 'red_brown', 'olive', 'rust'],
  brown_dark: ['brown', 'red_brown', 'black'],
  red_brown: ['red', 'burgundy', 'rust', 'brown', 'brown_dark'],
  olive: ['yellow', 'green', 'brown'],
  green: ['olive'],
  grey: ['white', 'blue', 'black'],
  black: ['grey', 'brown_dark'],
};

/** Cechy barwne - ich słownik zaczyna się od `COLORS` w tej samej kolejności (pilnuje test). */
export const TOLERANT_FEATURES: ReadonlySet<FeatureKey> = new Set<FeatureKey>([
  'capColor',
  'hymenophoreColor',
  'stipeColor',
  'capFleshColor',
  'stipeFleshColor',
]);

/** Maska sąsiadów; indeks = pozycja barwy w `COLORS` (= numer bitu). */
const NEAR_MASK_BY_BIT: readonly number[] = COLORS.map((color) =>
  COLOR_NEIGHBOURS[color].reduce((mask, near) => mask | bitOf('capColor', near), 0),
);

/**
 * Maska wartości sąsiednich dla obserwacji (`bit`); 0, gdy cecha nie ma tolerancji albo wartość
 * leży poza paletą (np. „brak trzonu” - tablica masek ma tylko pozycje `COLORS`).
 */
export function nearMask(key: FeatureKey, bit: number): number {
  if (!TOLERANT_FEATURES.has(key)) return 0;
  return NEAR_MASK_BY_BIT[31 - Math.clz32(bit)] ?? 0;
}
