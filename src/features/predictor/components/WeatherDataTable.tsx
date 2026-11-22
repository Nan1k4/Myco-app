import { StyleSheet, Text, View } from 'react-native';
import { memo, useMemo } from 'react';
import { Icon, type IconName } from '../../../components/icons/Icon';
import { SurfaceCard } from '../../../components/ui';
import { BORDER_RADIUS, COLORS, FILLS, SPACE, TYPE } from '../../../theme';
import { formatDayLabel, formatNumber, formatSoilMoisture } from '../format';
import type { WeatherSummary } from '../weatherMetrics';

interface WeatherDataTableProps {
  readonly summary: WeatherSummary;
}

export const WeatherDataTable = memo(function WeatherDataTable({ summary }: WeatherDataTableProps) {
  const days = useMemo(() => [...summary.days].reverse(), [summary.days]);

  return (
    <SurfaceCard style={styles.card}>
      <View style={styles.stats}>
        <StatTile
          icon="rain"
          label={`Opady (${summary.periodDays} dni)`}
          value={formatNumber(summary.totalPrecipitationMm, 1, 'mm')}
        />
        <StatTile icon="droplet" label="Dni z deszczem" value={String(summary.rainyDays)} />
        <StatTile icon="thermometer" label="Średnia temp." value={formatNumber(summary.meanTempC, 1, '°C')} />
        <StatTile
          icon="snow"
          label="Przymrozki"
          value={String(summary.frostDays)}
          accent={summary.frostDays > 0 ? COLORS.frost : undefined}
        />
      </View>

      <View style={styles.table}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.dateCell, styles.headerText]} numberOfLines={1} ellipsizeMode="tail">
            Dzień
          </Text>
          <Text style={[styles.cell, styles.headerText, styles.num]} numberOfLines={1} ellipsizeMode="tail">
            Opad
          </Text>
          <Text style={[styles.cell, styles.headerText, styles.num]} numberOfLines={1} ellipsizeMode="tail">
            Min / max
          </Text>
          <Text style={[styles.cell, styles.headerText, styles.num]} numberOfLines={1} ellipsizeMode="tail">
            Gleba
          </Text>
        </View>
        {days.map((day) => {
          const frost = day.tempMinC !== null && day.tempMinC < 0;
          return (
            <View key={day.date} style={styles.row}>
              <Text style={[styles.cell, styles.dateCell, styles.dayText]} numberOfLines={1} ellipsizeMode="tail">
                {formatDayLabel(day.date)}
              </Text>
              <Text style={[styles.cell, styles.num]} numberOfLines={1} ellipsizeMode="tail">
                {formatNumber(day.precipitationMm, 1, 'mm')}
              </Text>
              <Text style={[styles.cell, styles.num]} numberOfLines={1} ellipsizeMode="tail">
                <Text style={frost ? styles.frost : undefined}>{formatNumber(day.tempMinC, 0)}</Text>
                {' / '}
                {formatNumber(day.tempMaxC, 0, '°C')}
              </Text>
              <Text style={[styles.cell, styles.num]} numberOfLines={1} ellipsizeMode="tail">
                {formatSoilMoisture(day.soilMoisture)}
              </Text>
            </View>
          );
        })}
      </View>

      <Text style={styles.source}>Dane: Open-Meteo (model pogodowy)</Text>
    </SurfaceCard>
  );
});

function StatTile({
  icon,
  label,
  value,
  accent,
}: {
  readonly icon: IconName;
  readonly label: string;
  readonly value: string;
  readonly accent?: string;
}) {
  return (
    <View style={styles.stat}>
      <Icon name={icon} size={16} color={accent ?? COLORS.primary} />
      <Text style={[styles.statValue, accent ? { color: accent } : null]} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </Text>
      <Text style={styles.statLabel} numberOfLines={1} ellipsizeMode="tail">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: SPACE.m },
  stats: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.s },
  stat: {
    flexBasis: '47%',
    flexGrow: 1,
    backgroundColor: FILLS.neutral,
    borderRadius: BORDER_RADIUS,
    padding: SPACE.m,
    gap: SPACE.xs,
  },
  statValue: { ...TYPE.title3, color: COLORS.text, fontVariant: ['tabular-nums'] },
  statLabel: { ...TYPE.caption, color: COLORS.textMuted },
  table: { marginTop: SPACE.xs },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
    paddingVertical: SPACE.s,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.borderSubtle,
  },
  headerRow: { borderBottomColor: COLORS.border, paddingBottom: SPACE.s },
  headerText: { ...TYPE.caption, fontWeight: '700', color: COLORS.textMuted },
  cell: { ...TYPE.footnote, flex: 1, flexShrink: 1, color: COLORS.text },
  dateCell: { flex: 1.15 },
  dayText: { fontWeight: '600' },
  num: { textAlign: 'right', fontVariant: ['tabular-nums'] },
  frost: { color: COLORS.frost, fontWeight: '700' },
  source: { ...TYPE.caption, color: COLORS.textSubtle },
});