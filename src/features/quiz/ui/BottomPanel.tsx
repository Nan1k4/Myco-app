import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolation,
  ReduceMotion,
  SlideOutDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APPEAR, DISAPPEAR, RISE } from '../../../components/motion';
import { BORDER_RADIUS, COLORS, ELEVATION, MOTION, SPACE } from '../../../theme';

const DISMISS_DISTANCE = 96;
const DISMISS_VELOCITY = 800;
const EXIT_SHEET = SlideOutDown.duration(MOTION.fast).reduceMotion(ReduceMotion.System);

interface BottomPanelProps {
  readonly children: ReactNode;
  readonly backdrop?: boolean;
  readonly onDismiss?: () => void;
  readonly withBottomInset?: boolean;
}

export function BottomPanel({
  children,
  backdrop = false,
  onDismiss,
  withBottomInset = false,
}: BottomPanelProps) {
  const insets = useSafeAreaInsets();
  const reduceMotion = useReducedMotion();
  const translateY = useSharedValue(0);
  const sheetHeight = useSharedValue(360);
  const canDismiss = backdrop && Boolean(onDismiss);
  const bottomPadding = SPACE.l + (withBottomInset ? insets.bottom : 0);
  const onDismissRef = useRef(onDismiss);

  useEffect(() => {
    onDismissRef.current = onDismiss;
  }, [onDismiss]);

  const triggerDismiss = useCallback(() => {
    onDismissRef.current?.();
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    sheetHeight.value = Math.max(1, event.nativeEvent.layout.height);
  };

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .enabled(canDismiss)
        .activeOffsetY(12)
        .failOffsetX([-24, 24])
        .onUpdate((event) => {
          translateY.value = Math.max(0, event.translationY);
        })
        .onEnd((event) => {
          const shouldDismiss = event.translationY > DISMISS_DISTANCE || event.velocityY > DISMISS_VELOCITY;
          if (shouldDismiss && canDismiss) {
            if (reduceMotion) {
              runOnJS(triggerDismiss)();
              return;
            }
            translateY.value = withTiming(
              sheetHeight.value,
              { duration: MOTION.fast, easing: Easing.out(Easing.cubic) },
              (finished) => {
                if (finished) runOnJS(triggerDismiss)();
              },
            );
            return;
          }
          translateY.value = reduceMotion ? 0 : withSpring(0, { damping: 24, stiffness: 340 });
        }),
    [canDismiss, reduceMotion, sheetHeight, translateY, triggerDismiss],
  );

  const dragStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const scrimDragStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [0, sheetHeight.value], [1, 0], Extrapolation.CLAMP),
  }));

  const innerPanel = (
    <Animated.View
      onLayout={handleLayout}
      style={[
        styles.panel,
        backdrop ? styles.sheetModal : styles.sheetInline,
        { paddingBottom: bottomPadding },
        dragStyle,
      ]}
    >
      {backdrop ? (
        <View style={styles.handleWrap}>
          <View style={styles.handle} />
        </View>
      ) : null}
      {children}
    </Animated.View>
  );

  const sheet = (
    <Animated.View entering={RISE} exiting={backdrop ? EXIT_SHEET : undefined}>
      {canDismiss ? <GestureDetector gesture={pan}>{innerPanel}</GestureDetector> : innerPanel}
    </Animated.View>
  );

  if (!backdrop) {
    return (
      <Animated.View
        entering={RISE}
        style={[styles.panel, styles.sheetInline, { paddingBottom: bottomPadding }]}
      >
        {children}
      </Animated.View>
    );
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Animated.View entering={APPEAR} exiting={DISAPPEAR} style={StyleSheet.absoluteFill}>
        <Animated.View style={[styles.scrim, scrimDragStyle]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onDismiss}
            accessibilityRole="button"
            accessibilityLabel="Zamknij panel"
          />
        </Animated.View>
      </Animated.View>
      {sheet}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'flex-end',
    zIndex: 10,
  },
  scrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(20, 27, 22, 0.42)',
  },
  panel: {
    backgroundColor: COLORS.surfaceMuted,
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.l,
    gap: SPACE.m,
  },
  sheetInline: {
    marginTop: -BORDER_RADIUS,
    paddingTop: SPACE.l,
    zIndex: 1,
  },
  sheetModal: {
    paddingTop: SPACE.s,
    ...ELEVATION.floating,
  },
  handleWrap: {
    alignItems: 'center',
    paddingVertical: SPACE.s,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
  },
});