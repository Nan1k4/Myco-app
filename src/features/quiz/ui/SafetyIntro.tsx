import { Icon, type IconName } from '../../../components/icons/Icon';
import { useMemo, type ComponentProps } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../../components/Button';
import { staggeredRise } from '../../../components/motion';
import { SurfaceCard } from '../../../components/ui';
import { getDatabaseMeta } from '../../../db/repositories/speciesRepository';
import { COLORS, FILLS, RADIUS, SPACE, TYPE } from '../../../theme';
import { INTRO_PL } from '../copy.pl';

type PointIcon = (typeof INTRO_PL.points)[number]['icon'];

const ICONS: Readonly<Record<PointIcon, IconName>> = {
  shovel: 'pin',
  tongue: 'close',
  list: 'shield',
};

export function SafetyIntro({ onStart }: { readonly onStart: () => void }) {
  const insets = useSafeAreaInsets();
  const meta = useMemo(() => getDatabaseMeta(), []);

  return (
    <View style={[styles.root, { paddingTop: insets.top + SPACE.l }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.overline}>Klucz rozpoznawania</Text>
          <Text style={styles.title} accessibilityRole="header">
            {INTRO_PL.title}
          </Text>
        </View>

        <View style={styles.cards}>
          {INTRO_PL.points.map((point, index) => (
            <Animated.View key={point.icon} entering={staggeredRise(index)}>
              <SurfaceCard variant="elevated" style={styles.point}>
                <View style={styles.icon}>
                  <Icon name={ICONS[point.icon]} size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.text}>{point.text}</Text>
              </SurfaceCard>
            </Animated.View>
          ))}
        </View>

        <Text style={styles.meta}>
          Lokalna baza: {meta.speciesCount} gatunków · wersja {meta.dataVersion}
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Button label={INTRO_PL.start} icon="arrow-forward" onPress={onStart} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: SPACE.l, paddingBottom: SPACE.xl, gap: SPACE.l },
  hero: { gap: SPACE.xs },
  overline: { ...TYPE.overline, color: COLORS.primary },
  title: { ...TYPE.largeTitle, color: COLORS.text },
  cards: { gap: SPACE.m },
  point: {
    alignItems: 'center',
    gap: SPACE.m,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.s,
    backgroundColor: FILLS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...TYPE.subhead,
    color: COLORS.text,
    textAlign: 'center',
  },
  meta: { ...TYPE.caption, color: COLORS.textSubtle, textAlign: 'center' },
  footer: {
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.m,
    paddingBottom: SPACE.l,
    backgroundColor: COLORS.background,
  },
});