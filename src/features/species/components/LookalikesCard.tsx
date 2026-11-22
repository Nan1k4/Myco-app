import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EdibilityBadge } from '../../../components/EdibilityBadge';
import { Icon } from '../../../components/icons/Icon';
import { PressableScale, SurfaceCard } from '../../../components/ui';
import { getSpeciesBasicByIds } from '../../../db/repositories/speciesRepository';
import type { DangerousLookalike } from '../../../domain';
import { FEATURE_LABELS_PL } from '../../../i18n/pl';
import { COLORS, MIN_TOUCH, SPACE, TYPE } from '../../../theme';

interface LookalikesCardProps {
  readonly lookalikes: readonly DangerousLookalike[];
}

export function LookalikesCard({ lookalikes }: LookalikesCardProps) {
  const router = useRouter();
  const targetsById = useMemo(
    () => getSpeciesBasicByIds(lookalikes.map((item) => item.mushroomId)),
    [lookalikes],
  );

  if (lookalikes.length === 0) return null;

  return (
    <SurfaceCard variant="danger" padded={false}>
      <View style={styles.header}>
        <Icon name="warning" size={18} color={COLORS.danger} />
        <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
          Uwaga na trujące sobowtóry
        </Text>
      </View>

      {lookalikes.map((item) => {
        const target = targetsById.get(item.mushroomId);
        const features = item.distinguishingFeatures.map((key) => FEATURE_LABELS_PL[key]).join(' · ');

        return (
          <PressableScale
            key={item.mushroomId}
            haptic="selection"
            scaleTo={0.99}
            onPress={() => router.push({ pathname: '/species/[id]', params: { id: item.mushroomId } })}
            style={styles.row}
          >
            <View style={styles.body}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{target?.polishName ?? item.mushroomId}</Text>
                {target ? <EdibilityBadge category={target.edibilityCategory} compact /> : null}
              </View>
              {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
              <Text style={styles.features}>Odróżnia: {features}</Text>
            </View>
            <Icon name="chevron-forward" size={16} color={COLORS.dangerText} />
          </PressableScale>
        );
      })}
    </SurfaceCard>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.s,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(180, 35, 24, 0.22)',
  },
  headerTitle: { ...TYPE.headline, color: COLORS.dangerText, flex: 1, flexShrink: 1 },
  row: {
    minHeight: MIN_TOUCH + 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(180, 35, 24, 0.16)',
  },
  body: { flex: 1, flexShrink: 1, gap: SPACE.xs },
  nameRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: SPACE.s },
  name: { ...TYPE.headline, color: COLORS.text, flexShrink: 1 },
  note: { ...TYPE.subhead, color: COLORS.text },
  features: { ...TYPE.caption, color: COLORS.dangerText, fontWeight: '600' },
});