import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import { type AccessibilityRole, type AccessibilityState, type StyleProp, type ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MOTION } from '../../theme';

interface PressableScaleProps {
  readonly onPress?: () => void;
  readonly onLongPress?: () => void;
  readonly disabled?: boolean;
  readonly haptic?: 'none' | 'selection' | 'light';
  readonly scaleTo?: number;
  readonly style?: StyleProp<ViewStyle>;
  readonly accessibilityRole?: AccessibilityRole;
  readonly accessibilityLabel?: string;
  readonly accessibilityHint?: string;
  readonly accessibilityState?: AccessibilityState;
  readonly hitSlop?: number;
  readonly children: ReactNode;
}

export function PressableScale({
  onPress,
  onLongPress,
  disabled = false,
  haptic = 'none',
  scaleTo = 0.975,
  style,
  accessibilityRole = 'button',
  accessibilityLabel,
  accessibilityHint,
  accessibilityState,
  hitSlop = 0,
  children,
}: PressableScaleProps) {
  const reduceMotion = useReducedMotion();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const triggerPress = () => {
    if (haptic === 'selection') void Haptics.selectionAsync();
    else if (haptic === 'light') void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.();
  };

  const triggerLongPress = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onLongPress?.();
  };

  const tap = Gesture.Tap()
    .enabled(!disabled && Boolean(onPress))
    .hitSlop(hitSlop)
    .onBegin(() => {
      if (!reduceMotion) scale.value = withTiming(scaleTo, { duration: MOTION.press });
      opacity.value = withTiming(0.88, { duration: MOTION.press });
    })
    .onFinalize((_, success) => {
      if (!reduceMotion) scale.value = withSpring(1, { damping: 18, stiffness: 320 });
      opacity.value = withTiming(1, { duration: MOTION.press });
      if (success) runOnJS(triggerPress)();
    });

  const longPress = Gesture.LongPress()
    .enabled(!disabled && Boolean(onLongPress))
    .minDuration(420)
    .onStart(() => {
      runOnJS(triggerLongPress)();
    });

  const gesture = onLongPress ? Gesture.Exclusive(longPress, tap) : tap;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: disabled ? 0.45 : opacity.value,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        accessible
        accessibilityRole={accessibilityRole}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled, ...accessibilityState }}
        style={[style, animatedStyle]}
      >
        {children}
      </Animated.View>
    </GestureDetector>
  );
}