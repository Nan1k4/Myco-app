import { StyleSheet, Text, View } from 'react-native';
import { SurfaceCard } from '../../../components/ui';
import type { Month } from '../../../domain';
import { BORDER_RADIUS, COLORS, FILLS, SPACE, TYPE } from '../../../theme';
import { MONTH_SHORT_PL } from '../../atlas/copy.pl';

const MONTH_ROWS: readonly (readonly Month[])[] = [
  [1, 2, 3, 4, 5, 6],
  [7, 8, 9, 10, 11, 12],
];

interface SeasonStripProps {
  readonly months: readonly Month[];
  readonly currentMonth: Month;
}

export function SeasonStrip({ months, currentMonth }: SeasonStripProps) {
  const active = new Set(months);
  const inSeasonNow = active.has(currentMonth);

  return (
    <SurfaceCard style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          Sezon owocnikowania
        </Text>
        {inSeasonNow ? (
          <View style={styles.nowPill}>
            <Text style={styles.nowText} numberOfLines={1}>
              Owocnikuje teraz
            </Text>
          </View>
        ) : null}
      </View>

      <View style={styles.grid}>
        {MONTH_ROWS.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((month) => {
              const isFruiting = active.has(month);
              const isNow = month === currentMonth;
              return (
                <View key={month} style={[styles.cell, isFruiting && styles.cellActive, isNow && styles.cellNow]}>
                  <Text style={[styles.cellText, isFruiting && styles.cellTextActive]} numberOfLines={1}>
                    {MONTH_SHORT_PL[month]}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  card: { gap: SPACE.m },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: SPACE.s },
  title: { ...TYPE.headline, color: COLORS.text, flex: 1, flexShrink: 1 },
  nowPill: {
    backgroundColor: FILLS.primary,
    paddingHorizontal: SPACE.s + 2,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS,
    flexShrink: 0,
  },
  nowText: { ...TYPE.caption, fontWeight: '700', color: COLORS.primary },
  grid: { gap: SPACE.s },
  row: { flexDirection: 'row', gap: SPACE.s },
  cell: {
    flex: 1,
    paddingVertical: SPACE.s,
    borderRadius: BORDER_RADIUS,
    backgroundColor: FILLS.neutral,
    alignItems: 'center',
  },
  cellActive: { backgroundColor: COLORS.primary },
  cellNow: { borderWidth: 2, borderColor: COLORS.warningBorder },
  cellText: { ...TYPE.caption, color: COLORS.textMuted },
  cellTextActive: { color: COLORS.onPrimary, fontWeight: '700' },
});