import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { ActivityIndicator, StyleSheet, Text, type TextStyle, type ViewStyle } from 'react-native';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../theme';
import { PressableScale } from './ui/PressableScale';

type Variant = 'filled' | 'tinted' | 'surface' | 'plain' | 'danger';
type IconName = ComponentProps<typeof Ionicons>['name'];

interface ButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly variant?: Variant;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly icon?: IconName;
}

export function Button({ label, onPress, variant = 'filled', disabled = false, loading = false, icon }: ButtonProps) {
  const isDisabled = disabled || loading;
  const ink = INK[variant];

  return (
    <PressableScale
      onPress={onPress}
      disabled={isDisabled}
      haptic={variant === 'filled' || variant === 'danger' ? 'light' : 'selection'}
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[styles.base, CONTAINER[variant]]}
    >
      {loading ? (
        <ActivityIndicator color={ink} size="small" />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={18} color={ink} /> : null}
          <Text style={[styles.label, LABEL[variant]]} numberOfLines={1} ellipsizeMode="tail">
            {label}
          </Text>
        </>
      )}
    </PressableScale>
  );
}

const INK: Readonly<Record<Variant, string>> = {
  filled: COLORS.onPrimary,
  tinted: COLORS.primary,
  plain: COLORS.primary,
  danger: COLORS.dangerText,
  surface: COLORS.text,
};

const styles = StyleSheet.create({
  base: {
    minHeight: MIN_TOUCH,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACE.s,
  },
  label: { ...TYPE.headline, textAlign: 'center', flexShrink: 1 },
});

const CONTAINER = StyleSheet.create({
  filled: { backgroundColor: COLORS.primary },
  tinted: { backgroundColor: FILLS.primary },
  plain: { backgroundColor: 'transparent' },
  danger: { backgroundColor: FILLS.danger },
  surface: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
} satisfies Record<Variant, ViewStyle>);

const LABEL = StyleSheet.create({
  filled: { color: COLORS.onPrimary },
  tinted: { color: COLORS.primary },
  plain: { color: COLORS.primary, fontWeight: '600' },
  danger: { color: COLORS.dangerText },
  surface: { color: COLORS.text },
} satisfies Record<Variant, TextStyle>);