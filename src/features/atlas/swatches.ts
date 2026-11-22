/**
 * @file Próbki barw dla filtrów (kółko obok etykiety). Przybliżenia barw grzybów, nie wzorzec –
 * jasnobrązowy kapelusz w terenie może wyglądać inaczej niż próbka.
 * @module features/atlas/swatches
 */
import type { Color, ColorReaction, FeatureKey, SporePrintColor } from '../../domain';

const COLOR_SWATCHES: Readonly<Record<Color, string | null>> = {
  none: null,
  white: '#f7f5ef',
  cream: '#eadfc4',
  yellow: '#e8c33a',
  ochre: '#c99a3e',
  orange: '#e2832c',
  red: '#c0392b',
  burgundy: '#7b2236',
  pink: '#e3a3a8',
  violet: '#8e6bae',
  purple: '#6d2f6b',
  blue: '#3b6fb6',
  rust: '#a4502a',
  brown_light: '#c49a6c',
  brown: '#8b5a2b',
  brown_dark: '#4e3420',
  red_brown: '#8a3b26',
  olive: '#7d7a3a',
  green: '#5f8f4e',
  grey: '#9a9a96',
  black: '#2a2622',
};

const SPORE_SWATCHES: Readonly<Record<SporePrintColor, string>> = {
  white: '#f7f5ef',
  cream: '#eadfc4',
  yellow: '#e8c33a',
  pink: '#e3a3a8',
  pink_brown: '#b78478',
  rust: '#a4502a',
  brown: '#8b5a2b',
  purple_brown: '#5b3a46',
  violet: '#3e2a45',
  grey: '#8f8794',
  black: '#2a2622',
  olive: '#7d7a3a',
  olive_brown: '#6b5e2e',
  brown_dark: '#4e3420',
};

/** Reakcja barwna: próbka barwy docelowej; „bez zmian” – brak próbki. */
const REACTION_SWATCHES: Readonly<Record<ColorReaction, string | null>> = {
  none: null,
  blue: '#3b6fb6',
  red: '#c0392b',
  pink: '#e3a3a8',
  orange: '#e2832c',
  yellow: '#e8c33a',
  ochre: '#c99a3e',
  brown: '#8b5a2b',
  olive: '#7d7a3a',
  green: '#5f8f4e',
  violet: '#8e6bae',
  grey: '#9a9a96',
  black: '#2a2622',
};

/** Wartości spoza palety (`none`, `not_applicable`) nie mają próbki – `swatchOf` zwraca `null`. */
const BY_FEATURE: { readonly [K in FeatureKey]?: Readonly<Record<string, string | null>> } = {
  capColor: COLOR_SWATCHES,
  hymenophoreColor: COLOR_SWATCHES,
  stipeColor: COLOR_SWATCHES,
  capFleshColor: COLOR_SWATCHES,
  stipeFleshColor: COLOR_SWATCHES,
  sporePrint: SPORE_SWATCHES,
  capFleshColorChange: REACTION_SWATCHES,
  stipeFleshColorChange: REACTION_SWATCHES,
  bruising: REACTION_SWATCHES,
};

/** Próbka dla wartości cechy albo `null`, gdy cecha nie jest barwą. */
export function swatchOf(key: FeatureKey, value: string): string | null {
  return BY_FEATURE[key]?.[value] ?? null;
}
