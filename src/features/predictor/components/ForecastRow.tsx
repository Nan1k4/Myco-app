import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from '../../../components/icons/Icon';
import { PressableScale } from '../../../components/ui';
import { FLUSH_LEVEL_LABELS_PL } from '../../../i18n/pl';
import { BORDER_RADIUS, COLORS, ELEVATION, FLUSH_LEVEL_COLORS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { formatUpdatedAt } from '../format';
import { cachedPrediction } from '../predictionCache';
import type { ForecastEntry } from '../store/forecastStore';

interface ForecastRowProps {
  readonly title: string;
  readonly subtitle: string | null;
  readonly entry: ForecastEntry | undefined;
  readonly onPress: () => void;
}

export function ForecastRow({ title, subtitle, entry, onPress }: ForecastRowProps) {
  const snapshot = entry?.stored?.snapshot ?? null;
  const prediction = snapshot ? cachedPrediction(snapshot) : null;
  const loading = entry?.status.kind === 'loading';
  const isError = entry?.status.kind === 'error';
  const accent = prediction ? FLUSH_LEVEL_COLORS[prediction.level] : COLORS.textSubtle;

  return (
    <PressableScale
      onPress={onPress}
      haptic="selection"
      accessibilityLabel={prediction ? `${title}: indeks ${prediction.index} na 100` : title}
      style={styles.card}
    >
      <View style={styles.text}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        {subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
            {subtitle}
          </Text>
        ) : null}
        <View style={styles.statusRow}>
          {isError ? <Icon name="alert" size={13} color={COLORS.danger} /> : null}
          <Text style={[styles.status, isError && styles.statusError]} numberOfLines={1} ellipsizeMode="tail">
            {statusLine(entry)}
          </Text>
        </View>
      </View>

      <View style={styles.side}>
        {prediction ? (
          <>
            <View style={styles.scoreRow}>
              <View style={[styles.dot, { backgroundColor: accent }]} />
              <Text style={[styles.index, { color: accent }]}>{prediction.index}</Text>
            </View>
            <Text style={styles.level} numberOfLines={1}>
              {FLUSH_LEVEL_LABELS_PL[prediction.level]}
            </Text>
          </>
        ) : loading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <Text style={styles.placeholder}>—</Text>
        )}
      </View>

      <Icon name="chevron-forward" size={16} color={COLORS.textSubtle} />
    </PressableScale>
  );
}

function statusLine(entry: ForecastEntry | undefined): string {
  const fetchedAt = entry?.stored?.snapshot.fetchedAt;
  switch (entry?.status.kind) {
    case 'loading':
      return 'Odświeżanie…';
    case 'error':
      return fetchedAt ? `Błąd odświeżania · ${formatUpdatedAt(fetchedAt)}` : entry.status.message;
    case 'idle':
    case undefined:
      return fetchedAt ? `Dane: ${formatUpdatedAt(fetchedAt)}` : 'Dotknij, aby sprawdzić';
  }
}

const styles = StyleSheet.create({
  card: {
    minHeight: MIN_TOUCH + 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.borderSubtle,
    ...ELEVATION.card,
  },
  text: { flex: 1, flexShrink: 1, gap: 2 },
  title: { ...TYPE.headline, color: COLORS.text },
  subtitle: { ...TYPE.footnote, color: COLORS.textMuted },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.xs, marginTop: 2 },
  status: { ...TYPE.caption, color: COLORS.textSubtle, flexShrink: 1 },
  statusError: { color: COLORS.dangerText },
  side: { alignItems: 'flex-end', minWidth: 72 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: SPACE.xs },
  dot: { width: 8, height: 8, borderRadius: 4 },
  index: { fontSize: 24, lineHeight: 28, fontWeight: '800', fontVariant: ['tabular-nums'] },
  level: { ...TYPE.caption, color: COLORS.textMuted },
  placeholder: { ...TYPE.title2, color: COLORS.textSubtle },
});