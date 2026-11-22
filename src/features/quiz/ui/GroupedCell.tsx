import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS, RADIUS } from '../../../theme';
import type { GroupPosition } from './resultRows';

export function GroupedCell({ position, children }: { readonly position: GroupPosition; readonly children: ReactNode }) {
  return (
    <View style={[styles.cell, position.first ? styles.first : styles.separated, position.last ? styles.last : null]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cell: { backgroundColor: COLORS.surface, overflow: 'hidden' },
  separated: { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: COLORS.borderSubtle },
  first: { borderTopLeftRadius: RADIUS.m, borderTopRightRadius: RADIUS.m },
  last: { borderBottomLeftRadius: RADIUS.m, borderBottomRightRadius: RADIUS.m },
});
