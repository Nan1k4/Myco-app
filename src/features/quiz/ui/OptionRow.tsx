import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { COLORS, MIN_TOUCH, MOTION, RADIUS, SPACE, TYPE } from '../../../theme';

interface OptionRowProps {
  readonly label: string;
  readonly selected: boolean;
  readonly muted?: boolean;
  readonly multiple?: boolean;
  readonly compact?: boolean;
  readonly swatch?: string | null;
  readonly onPress: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function OptionRow({
  label,
  selected,
  muted = false,
  multiple = false,
  compact = false,
  swatch = null,
  onPress,
}: OptionRowProps) {
  const reduceMotion = useReducedMotion();
  const progress = useSharedValue(selected ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const target = selected ? 1 : 0;
    progress.value = reduceMotion ? target : withTiming(target, { duration: MOTION.fast });
  }, [selected, reduceMotion, progress]);

  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], [COLORS.surface, COLORS.primary]),
    borderColor: interpolateColor(progress.value, [0, 1], [COLORS.borderSubtle, COLORS.primary]),
    transform: [{ scale: scale.value }],
  }));

  const labelStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [muted ? COLORS.textMuted : COLORS.text, COLORS.onPrimary]),
  }));

  const press = (pressed: boolean) => {
    if (!reduceMotion) scale.value = withTiming(pressed ? 0.98 : 1, { duration: MOTION.press });
  };

  return (
    <AnimatedPressable
      onPress={() => {
        void Haptics.selectionAsync();
        onPress();
      }}
      onPressIn={() => press(true)}
      onPressOut={() => press(false)}
      accessibilityRole={multiple ? 'checkbox' : 'radio'}
      accessibilityState={{ checked: selected }}
      accessibilityLabel={label}
      style={[styles.row, compact && styles.compact, containerStyle]}
    >
      {swatch ? <View style={[styles.swatch, { backgroundColor: swatch }]} /> : null}
      <Animated.Text style={[styles.label, selected && styles.labelSelected, labelStyle]}>{label}</Animated.Text>
      {selected ? (
        <Ionicons name={multiple ? 'checkbox' : 'checkmark-circle'} size={20} color={COLORS.onPrimary} />
      ) : (
        <View style={[styles.indicator, multiple && styles.indicatorSquare]} />
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: MIN_TOUCH + 6,
    borderRadius: RADIUS.m,
    borderWidth: 1,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },
  compact: { flexBasis: '48%', flexGrow: 1, paddingHorizontal: SPACE.m },
  swatch: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(22, 31, 24, 0.24)',
  },
  label: { ...TYPE.body, flex: 1 },
  labelSelected: { fontWeight: '600' },
  indicator: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  indicatorSquare: { borderRadius: 4 },
});