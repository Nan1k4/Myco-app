import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../theme';
import { Icon, type IconName } from '../icons/Icon';

type BannerTone = 'info' | 'warning' | 'danger';

interface BannerAction {
  readonly label: string;
  readonly onPress: () => void;
}

interface StatusBannerProps {
  readonly tone: BannerTone;
  readonly title?: string;
  readonly message: string;
  readonly action?: BannerAction;
  readonly secondaryAction?: BannerAction;
}

const TONE_SPEC: Readonly<
  Record<BannerTone, { readonly bg: string; readonly border: string; readonly ink: string; readonly icon: IconName }>
> = {
  info: { bg: FILLS.primary, border: COLORS.primary, ink: COLORS.text, icon: 'info' },
  warning: { bg: COLORS.warningBg, border: COLORS.warningBorder, ink: COLORS.warningText, icon: 'warning' },
  danger: { bg: COLORS.dangerBg, border: COLORS.danger, ink: COLORS.dangerText, icon: 'alert' },
};

export function StatusBanner({ tone, title, message, action, secondaryAction }: StatusBannerProps) {
  const spec = TONE_SPEC[tone];
  return (
    <View
      style={[styles.container, { backgroundColor: spec.bg, borderColor: spec.border }]}
      accessibilityRole="alert"
    >
      <View style={styles.iconWrap}>
        <Icon name={spec.icon} size={18} color={spec.border} />
      </View>
      <View style={styles.body}>
        {title ? <Text style={[styles.title, { color: spec.ink }]}>{title}</Text> : null}
        <Text style={[styles.message, { color: spec.ink }]}>{message}</Text>
        {action || secondaryAction ? (
          <View style={styles.actions}>
            {action ? (
              <Pressable
                onPress={action.onPress}
                accessibilityRole="button"
                hitSlop={8}
                style={({ pressed }) => [styles.action, pressed && styles.pressed]}
              >
                <Text style={[styles.actionText, { color: spec.ink }]} numberOfLines={1} ellipsizeMode="tail">
                  {action.label}
                </Text>
                <Icon name="arrow-forward" size={14} color={spec.ink} />
              </Pressable>
            ) : null}
            {secondaryAction ? (
              <Pressable
                onPress={secondaryAction.onPress}
                accessibilityRole="button"
                hitSlop={8}
                style={({ pressed }) => [styles.action, pressed && styles.pressed]}
              >
                <Text style={[styles.actionText, { color: spec.ink }]} numberOfLines={1} ellipsizeMode="tail">
                  {secondaryAction.label}
                </Text>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACE.m,
    padding: SPACE.m,
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
  },
  iconWrap: { paddingTop: 2 },
  body: { flex: 1, flexShrink: 1, gap: SPACE.xs },
  title: { ...TYPE.headline },
  message: { ...TYPE.subhead },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: SPACE.l,
    rowGap: SPACE.xs,
    marginTop: SPACE.xs,
  },
  action: {
    minHeight: MIN_TOUCH - 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: SPACE.xs,
  },
  pressed: { opacity: 0.65 },
  actionText: { ...TYPE.footnote, fontWeight: '700', textDecorationLine: 'underline', flexShrink: 1 },
});