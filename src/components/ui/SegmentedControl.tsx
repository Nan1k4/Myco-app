import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import { BORDER_RADIUS, COLORS, ELEVATION, FILLS, MOTION, SPACE, TYPE } from '../../theme';

export interface SegmentOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

interface SegmentedControlProps<T extends string> {
  readonly options: readonly SegmentOption<T>[];
  readonly value: T;
  readonly onChange: (value: T) => void;
}

const PAD = SPACE.xs;

export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  const reduceMotion = useReducedMotion();
  const [width, setWidth] = useState(0);
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === value));
  const segmentWidth = width > 0 && options.length > 0 ? (width - PAD * 2) / options.length : 0;
  const translateX = useSharedValue(0);

  useEffect(() => {
    const target = activeIndex * segmentWidth;
    translateX.value = reduceMotion || segmentWidth === 0 ? target : withTiming(target, { duration: MOTION.fast });
  }, [activeIndex, segmentWidth, reduceMotion, translateX]);

  const thumbStyle = useAnimatedStyle(() => ({
    width: segmentWidth,
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.track} onLayout={handleLayout} accessibilityRole="radiogroup">
      {segmentWidth > 0 ? <Animated.View style={[styles.thumb, thumbStyle]} pointerEvents="none" /> : null}
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => {
              if (!selected) {
                void Haptics.selectionAsync();
                onChange(option.value);
              }
            }}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            style={styles.segment}
          >
            <Text style={[styles.label, selected && styles.labelActive]} numberOfLines={1} ellipsizeMode="tail">
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: FILLS.neutral,
    borderRadius: BORDER_RADIUS,
    padding: PAD,
    position: 'relative',
  },
  thumb: {
    position: 'absolute',
    top: PAD,
    bottom: PAD,
    left: PAD,
    borderRadius: BORDER_RADIUS - PAD,
    backgroundColor: COLORS.surface,
    ...ELEVATION.card,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACE.s,
  },
  label: { ...TYPE.footnote, color: COLORS.textMuted, flexShrink: 1 },
  labelActive: { color: COLORS.text, fontWeight: '700' },
});