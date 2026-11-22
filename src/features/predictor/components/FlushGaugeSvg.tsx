import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedProps, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { COLORS, MOTION, TYPE } from '../../../theme';

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface FlushGaugeSvgProps {
  readonly index: number;
  readonly color: string;
}

const SIZE = 160;
const STROKE = 12;
const RADIUS = (SIZE - STROKE) / 2;
const ARC_LENGTH = Math.PI * RADIUS;
const ARC_PATH = `M ${STROKE / 2} ${SIZE / 2} A ${RADIUS} ${RADIUS} 0 0 1 ${SIZE - STROKE / 2} ${SIZE / 2}`;

export function FlushGaugeSvg({ index, color }: FlushGaugeSvgProps) {
  const reduceMotion = useReducedMotion();
  const target = Math.min(1, Math.max(0, index / 100));
  const progress = useSharedValue(reduceMotion ? target : 0);

  useEffect(() => {
    progress.value = reduceMotion
      ? target
      : withTiming(target, { duration: MOTION.bar, easing: Easing.out(Easing.cubic) });
  }, [target, reduceMotion, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: ARC_LENGTH * (1 - progress.value),
  }));

  return (
    <View style={styles.container} accessibilityLabel={`Indeks wysypu ${index} na 100`}>
      <Svg width={SIZE} height={SIZE / 2 + STROKE} viewBox={`0 0 ${SIZE} ${SIZE / 2 + STROKE}`}>
        <Path d={ARC_PATH} stroke={COLORS.track} strokeWidth={STROKE} strokeLinecap="round" fill="none" />
        <AnimatedPath
          d={ARC_PATH}
          stroke={color}
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${ARC_LENGTH} ${ARC_LENGTH}`}
          animatedProps={animatedProps}
        />
      </Svg>
      <Text style={[styles.value, { color }]} numberOfLines={1}>
        {index}
        <Text style={styles.scale}>{'\u00A0'}/100</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  value: {
    ...TYPE.display,
    marginTop: -36,
    fontVariant: ['tabular-nums'],
    includeFontPadding: false,
  },
  scale: {
    ...TYPE.footnote,
    color: COLORS.textSubtle,
    fontWeight: '600',
    letterSpacing: 0,
  },
});