import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../../components/icons/Icon';
import { APPEAR, DISAPPEAR } from '../../../components/motion';
import { PressableScale } from '../../../components/ui';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { SPECIES_FORMS, pluralPl } from '../copy.pl';

interface QuizHeaderProps {
  readonly canUndo: boolean;
  readonly onUndo: () => void;
  readonly canReset: boolean;
  readonly onReset: () => void;
  readonly candidateCount: number;
  readonly action: { readonly label: string; readonly onPress: () => void } | null;
}

export function QuizHeader({ canUndo, onUndo, canReset, onReset, candidateCount, action }: QuizHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.bar, { paddingTop: insets.top + SPACE.xs }]}>
      <Pressable
        onPress={onUndo}
        disabled={!canUndo}
        accessibilityRole="button"
        accessibilityLabel="Wstecz"
        hitSlop={8}
        style={({ pressed }) => [styles.button, !canUndo && styles.hidden, pressed && styles.pressed]}
      >
        <Icon name="chevron-back" size={20} color={COLORS.primary} />
        <Text style={styles.buttonText} numberOfLines={1}>
          Wstecz
        </Text>
      </Pressable>

      <View style={styles.pill}>
        <Animated.Text
          key={candidateCount}
          entering={APPEAR}
          style={styles.count}
          accessibilityLiveRegion="polite"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {candidateCount} {pluralPl(candidateCount, SPECIES_FORMS)}
        </Animated.Text>
      </View>

      <View style={styles.rightGroup}>
        {action ? (
          <Pressable
            onPress={action.onPress}
            accessibilityRole="button"
            hitSlop={8}
            style={({ pressed }) => [styles.actionBtn, pressed && styles.pressed]}
          >
            <View style={styles.actionPill}>
              <Text style={styles.actionText} numberOfLines={1}>
                {action.label}
              </Text>
            </View>
          </Pressable>
        ) : null}

        {canReset ? (
          <Animated.View entering={APPEAR} exiting={DISAPPEAR}>
            <PressableScale
              onPress={onReset}
              haptic="light"
              accessibilityLabel="Zacznij od nowa"
              style={styles.resetBtn}
            >
              <Icon name="refresh" size={18} color={COLORS.textMuted} />
            </PressableScale>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACE.s,
    paddingHorizontal: SPACE.m,
    paddingBottom: SPACE.s,
    backgroundColor: COLORS.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderSubtle,
  },
  button: {
    minHeight: MIN_TOUCH,
    minWidth: 76,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
    flexShrink: 0,
  },
  hidden: { opacity: 0 },
  pressed: { opacity: 0.6 },
  buttonText: { ...TYPE.subhead, fontWeight: '600', color: COLORS.primary },
  pill: {
    flexShrink: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    paddingHorizontal: SPACE.m,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS,
  },
  count: { ...TYPE.caption, fontWeight: '700', color: COLORS.textMuted, fontVariant: ['tabular-nums'] },
  actionPill: {
    backgroundColor: FILLS.primary,
    paddingHorizontal: SPACE.m,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS,
  },
  actionText: { ...TYPE.footnote, fontWeight: '700', color: COLORS.primary },
  rightGroup: {
  minHeight: MIN_TOUCH,
  minWidth: 76,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: SPACE.xs,
  flexShrink: 0,
  },
  actionBtn: {
    minHeight: MIN_TOUCH,
    justifyContent: 'center',
  },
  resetBtn: {
    width: 44,
    height: 44,
    borderRadius: BORDER_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
  },
});