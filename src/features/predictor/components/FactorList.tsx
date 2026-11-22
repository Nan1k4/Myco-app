import { Ionicons } from '@expo/vector-icons';
import { memo, useEffect, type ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useReducedMotion, useSharedValue, withTiming } from 'react-native-reanimated';
import { SurfaceCard } from '../../../components/ui';
import type { PredictionFactor } from '../../../domain';
import { FACTOR_LABELS_PL } from '../../../i18n/pl';
import { COLORS, MOTION, RADIUS, SPACE, TYPE, BORDER_RADIUS } from '../../../theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

const FACTOR_ICONS: Readonly<Record<PredictionFactor['kind'], IconName>> = {
  precipitation: 'rainy-outline',
  temperature: 'thermometer-outline',
  season: 'calendar-outline',
  soil_moisture: 'water-outline',
  frost: 'snow-outline',
};

interface FactorListProps {
  readonly factors: readonly PredictionFactor[];
}

export const FactorList = memo(function FactorList({ factors }: FactorListProps) {
  return (
    <SurfaceCard style={styles.card}>
      {factors.map((factor, index) => {
        const color = signColor(factor.contribution);
        return (
          <View key={factor.kind} style={[styles.item, index > 0 && styles.separated]}>
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Ionicons name={FACTOR_ICONS[factor.kind]} size={16} color={COLORS.primary} />
                <Text style={styles.label}>{FACTOR_LABELS_PL[factor.kind]}</Text>
              </View>
              <Text style={[styles.sign, { color }]}>{signLabel(factor.contribution)}</Text>
            </View>
            <ContributionBar value={factor.contribution} color={color} />
            <Text style={styles.description}>{factor.description}</Text>
          </View>
        );
      })}
    </SurfaceCard>
  );
});

function ContributionBar({ value, color }: { readonly value: number; readonly color: string }) {
  const reduceMotion = useReducedMotion();
  const magnitude = Math.min(1, Math.abs(value));
  const width = useSharedValue(reduceMotion ? magnitude : 0);

  useEffect(() => {
    width.value = reduceMotion
      ? magnitude
      : withTiming(magnitude, { duration: MOTION.bar, easing: Easing.out(Easing.cubic) });
  }, [magnitude, reduceMotion, width]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${width.value * 100}%` }));
  const positive = value >= 0;

  return (
    <View style={styles.track}>
      <View style={styles.halfLeft}>
        {!positive ? <Animated.View style={[styles.fill, styles.fillLeft, { backgroundColor: color }, fillStyle]} /> : null}
      </View>
      <View style={styles.center} />
      <View style={styles.halfRight}>
        {positive ? <Animated.View style={[styles.fill, styles.fillRight, { backgroundColor: color }, fillStyle]} /> : null}
      </View>
    </View>
  );
}

const NEUTRAL_EPSILON = 0.05;

function signColor(value: number): string {
  if (value > NEUTRAL_EPSILON) return COLORS.positive;
  if (value < -NEUTRAL_EPSILON) return COLORS.negative;
  return COLORS.textSubtle;
}

function signLabel(value: number): string {
  if (value > NEUTRAL_EPSILON) return 'sprzyja';
  if (value < -NEUTRAL_EPSILON) return 'hamuje';
  return 'neutralnie';
}

const styles = StyleSheet.create({
  card: { paddingVertical: SPACE.s },
  item: { paddingVertical: SPACE.m, gap: SPACE.s },
  separated: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.borderSubtle },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.s },
  label: { ...TYPE.headline, color: COLORS.text },
  sign: { ...TYPE.caption, fontWeight: '700', textTransform: 'uppercase' },
  track: { height: 7, borderRadius: RADIUS.pill, backgroundColor: COLORS.track, flexDirection: 'row', overflow: 'hidden' },
  halfLeft: { flex: 1, alignItems: 'flex-end' },
  halfRight: { flex: 1, alignItems: 'flex-start' },
  fill: { height: '100%' },
  fillLeft: {
    borderTopLeftRadius: BORDER_RADIUS,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  fillRight: {
    borderTopRightRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  center: { width: 1.5, backgroundColor: COLORS.textSubtle },
  description: { ...TYPE.footnote, color: COLORS.textMuted },
});