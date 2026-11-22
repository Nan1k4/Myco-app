import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SurfaceCard } from '../../../components/ui';
import { COLORS, FILLS, RADIUS, SPACE, TYPE } from '../../../theme';
import { thresholdCaption } from '../copy.pl';
import { THRESHOLD } from '../engine';

interface ThresholdControlProps {
  readonly value: number;
  readonly reliable: boolean;
  readonly onChange: (value: number) => void;
}

const MIN = Math.round(THRESHOLD.min * 100);
const STEP = Math.round(THRESHOLD.step * 100);

export function ThresholdControl({ value, reliable, onChange }: ThresholdControlProps) {
  const committed = Math.round(value * 100);
  const [draft, setDraft] = useState(committed);
  const dragging = useRef(false);
  const lastHaptic = useRef(committed);

  useEffect(() => {
    if (!dragging.current) {
      setDraft(committed);
      lastHaptic.current = committed;
    }
  }, [committed]);

  const handleValueChange = (raw: number) => {
    const next = Math.round(raw);
    setDraft(next);
    if (next !== lastHaptic.current) {
      lastHaptic.current = next;
      void Haptics.selectionAsync();
    }
  };

  const handleSlidingComplete = (raw: number) => {
    dragging.current = false;
    const next = Math.round(raw);
    setDraft(next);
    if (next !== committed) onChange(next / 100);
  };

  return (
    <SurfaceCard variant={draft < 80 ? 'warning' : 'default'} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Tolerancja dopasowania</Text>
        <View style={styles.valuePill}>
          <Text style={styles.value}>≥ {draft}%</Text>
        </View>
      </View>

      <Slider
        minimumValue={MIN}
        maximumValue={100}
        step={STEP}
        value={committed}
        onSlidingStart={() => {
          dragging.current = true;
        }}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.track}
        {...(Platform.OS === 'android' ? { thumbTintColor: COLORS.primary } : {})}
        accessibilityLabel="Tolerancja dopasowania"
        style={styles.slider}
      />

      <View style={styles.scale}>
        <Text style={styles.tick}>{MIN}%</Text>
        <Text style={styles.tick}>100%</Text>
      </View>

      <Text style={styles.caption}>{thresholdCaption(draft)}</Text>
      {reliable ? null : <Text style={styles.caption}>Mało odpowiedzi — procenty są orientacyjne (~).</Text>}
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: SPACE.xs, marginTop: SPACE.l },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { ...TYPE.headline, color: COLORS.text },
  valuePill: {
    backgroundColor: FILLS.primary,
    paddingHorizontal: SPACE.s + 2,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  value: { ...TYPE.footnote, fontWeight: '700', color: COLORS.primary, fontVariant: ['tabular-nums'] },
  slider: { height: 38 },
  scale: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -SPACE.xs },
  tick: { ...TYPE.caption, color: COLORS.textSubtle, fontVariant: ['tabular-nums'] },
  caption: { ...TYPE.footnote, color: COLORS.textMuted },
});