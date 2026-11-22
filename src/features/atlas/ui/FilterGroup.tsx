import { Ionicons } from '@expo/vector-icons';
import { useEffect, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS, MIN_TOUCH, MOTION, SPACE, TYPE } from '../../../theme';
import { APPEAR } from '../../../components/motion';

interface FilterGroupProps {
  readonly title: string;
  /** Liczba aktywnych filtrów w grupie – odznaka widoczna także po zwinięciu. */
  readonly activeCount: number;
  readonly expanded: boolean;
  readonly onToggle: () => void;
  readonly children: ReactNode;
}

/** Zwijana grupa filtrów (akordeon). Strzałka obraca się na wątku UI; treść wjeżdża łagodnie. */
export function FilterGroup({ title, activeCount, expanded, onToggle, children }: FilterGroupProps) {
  const reduceMotion = useReducedMotion();
  const rotation = useSharedValue(expanded ? 1 : 0);

  useEffect(() => {
    const target = expanded ? 1 : 0;
    rotation.value = reduceMotion ? target : withTiming(target, { duration: MOTION.fast });
  }, [expanded, reduceMotion, rotation]);

  const chevronStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value * 180}deg` }] }));

  return (
    <View style={styles.group}>
      <Pressable
        onPress={onToggle}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        style={({ pressed }) => [styles.header, pressed && styles.pressed]}
      >
        <Text style={styles.title}>{title}</Text>
        {activeCount > 0 ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{activeCount}</Text>
          </View>
        ) : null}
        <Animated.View style={chevronStyle}>
          <Ionicons name="chevron-down" size={20} color={COLORS.textMuted} />
        </Animated.View>
      </Pressable>
      {expanded ? (
        <Animated.View entering={APPEAR} style={styles.body}>
          {children}
        </Animated.View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { paddingHorizontal: SPACE.l },
  header: { minHeight: MIN_TOUCH + 8, flexDirection: 'row', alignItems: 'center', gap: SPACE.s },
  pressed: { opacity: 0.6 },
  title: { ...TYPE.headline, color: COLORS.text, flex: 1 },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 6,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { ...TYPE.caption, fontWeight: '700', color: COLORS.onPrimary },
  body: { gap: SPACE.l, paddingBottom: SPACE.l },
});
