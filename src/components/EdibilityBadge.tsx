import { StyleSheet, Text, View } from 'react-native';
import type { EdibilityCategory } from '../domain';
import { EDIBILITY_LABELS_PL } from '../i18n/pl';
import { BORDER_RADIUS, SPACE, TYPE } from '../theme';
import { Icon, type IconName } from './icons/Icon';

interface BadgeSpec {
  readonly bg: string;
  readonly ink: string;
  readonly border?: string;
  readonly icon: IconName;
}

const SPEC: Readonly<Record<EdibilityCategory, BadgeSpec>> = {
  edible: { bg: '#E5F3E8', ink: '#17542A', icon: 'check-circle' },
  conditionally_edible: { bg: '#FBF4DE', ink: '#6B4E00', icon: 'flame' },
  inedible: { bg: '#EAEBE8', ink: '#464E48', icon: 'close' },
  unknown: { bg: '#EFEAF5', ink: '#57367A', icon: 'help' },
  poisonous: { bg: '#FCE6D9', ink: '#8F3200', border: '#D35400', icon: 'warning' },
  deadly: { bg: '#B42318', ink: '#FFFFFF', icon: 'alert' },
};

interface EdibilityBadgeProps {
  readonly category: EdibilityCategory;
  readonly compact?: boolean;
}

export function EdibilityBadge({ category, compact = false }: EdibilityBadgeProps) {
  const spec = SPEC[category];
  return (
    <View
      style={[
        styles.badge,
        compact && styles.compact,
        { backgroundColor: spec.bg },
        spec.border ? { borderWidth: 1, borderColor: spec.border } : null,
      ]}
      accessibilityLabel={`Jadalność: ${EDIBILITY_LABELS_PL[category]}`}
    >
      <Icon name={spec.icon} size={compact ? 12 : 14} color={spec.ink} />
      <Text
        style={[styles.text, compact && styles.textCompact, { color: spec.ink }]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {EDIBILITY_LABELS_PL[category]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: SPACE.s + 2,
    paddingVertical: 4,
    flexShrink: 1,
  },
  compact: {
    paddingHorizontal: SPACE.s,
    paddingVertical: 3,
  },
  text: { ...TYPE.caption, fontWeight: '700', flexShrink: 1 },
  textCompact: { fontSize: 11, lineHeight: 14 },
});