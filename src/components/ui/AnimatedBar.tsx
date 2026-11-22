import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS, MOTION } from '../../theme';

interface AnimatedBarProps {
  /** Wartość w przedziale [0, 1]. */
  readonly progress: number;
  readonly color: string;
  readonly height?: number;
  readonly trackColor?: string;
}

/** Płynnie animowany pasek postępu/udziału (GPU-friendly, respektuje ReduceMotion). */
export function AnimatedBar({ progress, color, height = 8, trackColor = COLORS.track }: AnimatedBarProps) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.min(1, Math.max(0, progress));
  const value = useSharedValue(reduceMotion ? clamped : 0);

  useEffect(() => {
    value.value = reduceMotion
      ? clamped
      : withTiming(clamped, { duration: MOTION.bar, easing: Easing.out(Easing.cubic) });
  }, [clamped, reduceMotion, value]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${value.value * 100}%`,
  }));

  const radius = height / 2;

  return (
    <View style={[styles.track, { height, borderRadius: radius, backgroundColor: trackColor }]}>
      <Animated.View style={[styles.fill, { borderRadius: radius, backgroundColor: color }, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%' },
});