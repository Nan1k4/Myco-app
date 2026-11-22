import type { FlushLevel } from '../domain';

export const COLORS = {
  // 60% — dominujące tło (matowe, czytelne w pełnym słońcu)
  background: '#F4F3EF',

  // 30% — powierzchnie, karty, kontenery, nawigacja, pola tekstowe
  surface: '#FFFFFF',
  surfaceMuted: '#E9E7DF',
  border: '#D4D1C7',
  borderSubtle: '#E5E2D9',

  // 10% — kolor akcentujący (główne CTA, aktywne stany)
  primary: '#1B4D2E',
  primaryPressed: '#143B23',
  onPrimary: '#FFFFFF',

  // Typografia (WCAG AA/AAA)
  text: '#141B16',
  textMuted: '#4A544C',
  textSubtle: '#616B63',
  inactive: '#646E66',

  // Semantyka bezpieczeństwa i pogody
  warningBg: '#FBF4DE',
  warningBorder: '#C79200',
  warningText: '#5C4000',
  dangerBg: '#FCEAEA',
  danger: '#B42318',
  dangerText: '#7A1710',
  positive: '#1B5E32',
  negative: '#B42318',
  frost: '#1458A8',
  track: '#E1DED5',
} as const;

export const FILLS = {
  neutral: '#EAE8E0',
  primary: '#DCE9E0',
  warning: '#FBF4DE',
  danger: '#FCEAEA',
  frost: '#E8F0FA',
} as const;

export const FLUSH_LEVEL_COLORS: Record<FlushLevel, string> = {
  very_low: '#5C655E',
  low: '#8C6223',
  moderate: '#8A6B00',
  high: '#2E7029',
  very_high: '#1B4D2E',
};