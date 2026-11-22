import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../../components/Button';
import { Icon } from '../../../components/icons/Icon';
import { FILTER_KEY_LABELS_PL } from '../../../i18n/pl';
import { BORDER_RADIUS, COLORS, FILLS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';
import { SKIPPED_COPY_PL, STAGE_COPY_PL, STAGE_SKIP_PL } from '../copy.pl';
import type { QuizKey, QuizStage, SkippedGroup } from '../engine';
import { BottomPanel } from './BottomPanel';

interface SkippedPanelProps {
  readonly groups: readonly SkippedGroup[];
  readonly onRevisit: (key: QuizKey) => void;
  readonly onRevisitStage: (stage: QuizStage) => void;
  readonly onClose: () => void;
}

export function SkippedPanel({ groups, onRevisit, onRevisitStage, onClose }: SkippedPanelProps) {
  return (
    <BottomPanel backdrop onDismiss={onClose}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          {SKIPPED_COPY_PL.title}
        </Text>
        <Text style={styles.caption}>{SKIPPED_COPY_PL.hint}</Text>
      </View>

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent} showsVerticalScrollIndicator={false}>
        {groups.map((group) => (
          <View key={group.stage} style={styles.group}>
            <Text style={styles.groupTitle} numberOfLines={1} ellipsizeMode="tail">
              {STAGE_COPY_PL[group.stage].name}
            </Text>
            <View style={styles.groupCard}>
              {group.whole ? (
                <Row
                  label={STAGE_SKIP_PL.wholeStage}
                  detail={group.hides.length > 0 ? STAGE_SKIP_PL.hides(group.hides) : null}
                  separated={false}
                  onPress={() => onRevisitStage(group.stage)}
                />
              ) : (
                group.keys.map((key, index) => (
                  <Row
                    key={key}
                    label={FILTER_KEY_LABELS_PL[key]}
                    detail={null}
                    separated={index > 0}
                    onPress={() => onRevisit(key)}
                  />
                ))
              )}
            </View>
          </View>
        ))}
      </ScrollView>

      <Button label={SKIPPED_COPY_PL.close} variant="tinted" onPress={onClose} />
    </BottomPanel>
  );
}

function Row({
  label,
  detail,
  separated,
  onPress,
}: {
  readonly label: string;
  readonly detail: string | null;
  readonly separated: boolean;
  readonly onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.row, separated && styles.separated, pressed && styles.pressed]}
    >
      <View style={styles.rowText}>
        <Text style={styles.rowLabel} numberOfLines={1} ellipsizeMode="tail">
          {label}
        </Text>
        {detail ? (
          <Text style={styles.rowDetail} numberOfLines={2}>
            {detail}
          </Text>
        ) : null}
      </View>
      <Icon name="chevron-forward" size={16} color={COLORS.textSubtle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { gap: SPACE.xs },
  title: { ...TYPE.title3, color: COLORS.text },
  caption: { ...TYPE.subhead, color: COLORS.textMuted },
  list: { maxHeight: 320 },
  listContent: { gap: SPACE.m, paddingVertical: SPACE.xs },
  group: { gap: SPACE.xs },
  groupTitle: {
    ...TYPE.overline,
    color: COLORS.textMuted,
    paddingHorizontal: SPACE.xs,
  },
  groupCard: {
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS.surface,
    overflow: 'hidden',
  },
  row: {
    minHeight: MIN_TOUCH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
  },
  separated: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderSubtle,
  },
  pressed: { backgroundColor: FILLS.neutral },
  rowText: { flex: 1, flexShrink: 1, gap: 2 },
  rowLabel: { ...TYPE.headline, color: COLORS.text },
  rowDetail: { ...TYPE.footnote, color: COLORS.textMuted },
});