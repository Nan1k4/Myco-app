import { Platform, type ViewStyle } from 'react-native';

export const SPACE = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
} as const;

export const BORDER_RADIUS = 12;

export const RADIUS = {
  s: BORDER_RADIUS,
  m: BORDER_RADIUS,
  l: BORDER_RADIUS,
  pill: BORDER_RADIUS,
} as const;

export const MIN_TOUCH = 48;

export const MOTION = {
  press: 90,
  fast: 160,
  base: 240,
  bar: 420,
} as const;

export const ELEVATION = {
  none: {},
  card: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#141B16',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
    default: {},
  }) ?? {},
  floating: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#141B16',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 16,
    },
    android: { elevation: 6 },
    default: {},
  }) ?? {},
} as const satisfies Record<string, ViewStyle>;