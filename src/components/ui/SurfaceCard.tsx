import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { COLORS, ELEVATION, FILLS, RADIUS, SPACE } from '../../theme';

type CardVariant = 'default' | 'elevated' | 'muted' | 'warning' | 'danger';

interface SurfaceCardProps {
  readonly variant?: CardVariant;
  readonly padded?: boolean;
  readonly style?: StyleProp<ViewStyle>;
  readonly children: ReactNode;
}

/** Spójny kontener treści (MD3 Surface): hierarchia przez tło, subtelny obrys i elewację. */
export function SurfaceCard({ variant = 'default', padded = true, style, children }: SurfaceCardProps) {
  return <View style={[styles.base, padded && styles.padded, VARIANT[variant], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.m,
    overflow: 'hidden',
  },
  padded: {
    padding: SPACE.l,
  },
});

const VARIANT = StyleSheet.create({
  default: {
    backgroundColor: COLORS.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderSubtle,
  },
  elevated: {
    backgroundColor: COLORS.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.borderSubtle,
    ...ELEVATION.card,
  },
  muted: {
    backgroundColor: FILLS.neutral,
  },
  warning: {
    backgroundColor: COLORS.warningBg,
    borderWidth: 1,
    borderColor: COLORS.warningBorder,
  },
  danger: {
    backgroundColor: COLORS.dangerBg,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
} satisfies Record<CardVariant, ViewStyle>);