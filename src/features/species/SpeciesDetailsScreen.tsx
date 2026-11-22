import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EdibilityBadge } from '../../components/EdibilityBadge';
import { Icon } from '../../components/icons/Icon';
import { SegmentedControl, StatusBanner, SurfaceCard, type SegmentOption } from '../../components/ui';
import { getSpeciesDetailsById } from '../../db/repositories/speciesRepository';
import { SUBSTRATE_GROUP_OF, type Month, type Mushroom } from '../../domain';
import { HABITAT_LABELS_PL, SUBSTRATE_GROUP_LABELS_PL, TREE_LABELS_PL } from '../../i18n/pl';
import { BORDER_RADIUS, COLORS, FILLS, SPACE, TYPE } from '../../theme';
import { FeatureGroupsCard } from './components/FeatureGroupsCard';
import { LookalikesCard } from './components/LookalikesCard';
import { SeasonStrip } from './components/SeasonStrip';

type SpeciesTab = 'overview' | 'features';

const SPECIES_TABS: readonly SegmentOption<SpeciesTab>[] = [
  { value: 'overview', label: 'Przegląd' },
  { value: 'features', label: 'Cechy morfologiczne' },
];

export function SpeciesDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const speciesId = Array.isArray(id) ? id[0] : id;
  const [tab, setTab] = useState<SpeciesTab>('overview');
  const insets = useSafeAreaInsets();
  const mushroom = useMemo(() => (speciesId ? getSpeciesDetailsById(speciesId) : null), [speciesId]);
  const currentMonth = (new Date().getMonth() + 1) as Month;

  if (!mushroom) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: 'Gatunek' }} />
        <Text style={styles.empty}>Nie znaleziono gatunku w bazie.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: SPACE.xxl + insets.bottom }]}
    >
      <Stack.Screen options={{ title: mushroom.polishName }} />

      <SurfaceCard variant="elevated" style={styles.hero}>
        <Text style={styles.name}>{mushroom.polishName}</Text>
        <Text style={styles.latin}>{mushroom.scientificName}</Text>
        {mushroom.vernacularNames.length > 0 ? (
          <Text style={styles.aliases}>Inne nazwy: {mushroom.vernacularNames.join(', ')}</Text>
        ) : null}

        <View style={styles.badges}>
          <EdibilityBadge category={mushroom.edibility.category} />
          {mushroom.legallyProtected ? (
            <View style={styles.protectedBadge}>
              <Icon name="shield" size={13} color={COLORS.frost} />
              <Text style={styles.protectedText}>Chroniony</Text>
            </View>
          ) : null}
        </View>
      </SurfaceCard>

      <EdibilityNotice mushroom={mushroom} />

      <SegmentedControl options={SPECIES_TABS} value={tab} onChange={setTab} />

      {tab === 'overview' ? (
        <>
          {mushroom.description ? (
            <SurfaceCard>
              <Text style={styles.description}>{mushroom.description}</Text>
            </SurfaceCard>
          ) : null}
          <SeasonStrip months={mushroom.fruiting.months} currentMonth={currentMonth} />
          <EcologyCard mushroom={mushroom} />
          <LookalikesCard lookalikes={mushroom.dangerousLookalikes} />
        </>
      ) : (
        <FeatureGroupsCard species={mushroom} />
      )}
    </ScrollView>
  );
}

function EdibilityNotice({ mushroom }: { readonly mushroom: Mushroom }) {
  const { edibility } = mushroom;
  if (edibility.category === 'poisonous' || edibility.category === 'deadly') {
    const { min, max } = edibility.symptomOnsetHours;
    return (
      <StatusBanner
        tone="danger"
        title={edibility.category === 'deadly' ? 'Gatunek śmiertelnie trujący' : 'Gatunek trujący'}
        message={`Nie zbieraj i nie próbuj smaku. Objawy zatrucia pojawiają się po ok. ${min}–${max} h.${edibility.notes ? ` ${edibility.notes}` : ''}`}
      />
    );
  }
  if (edibility.category === 'conditionally_edible') {
    const { requiresCooking, alcoholInteraction, youngSpecimensOnly, notes } = edibility.conditions;
    const parts = [
      requiresCooking ? 'wymaga obróbki termicznej' : null,
      alcoholInteraction ? 'nie łączyć z alkoholem' : null,
      youngSpecimensOnly ? 'tylko młode owocniki' : null,
      notes ?? null,
    ].filter((part): part is string => part !== null);
    if (parts.length > 0) {
      return <StatusBanner tone="warning" title="Warunkowo jadalny" message={parts.join(' · ')} />;
    }
  }
  return null;
}

function EcologyCard({ mushroom }: { readonly mushroom: Mushroom }) {
  const habitats = mushroom.ecology.habitats.map((h) => HABITAT_LABELS_PL[h]).join(', ');
  const substrates = [
    ...new Set(mushroom.ecology.substrates.map((s) => SUBSTRATE_GROUP_LABELS_PL[SUBSTRATE_GROUP_OF[s]])),
  ].join(', ');
  const trees = mushroom.ecology.mycorrhizalPartners.map((t) => TREE_LABELS_PL[t]).join(', ');

  return (
    <SurfaceCard style={styles.ecoCard}>
      <Text style={styles.ecoTitle}>Siedlisko i ekologia</Text>
      <EcoRow label="Siedliska" value={habitats} />
      <EcoRow label="Podłoże" value={substrates} />
      {trees ? <EcoRow label="Drzewa (mikoryza)" value={trees} /> : null}
    </SurfaceCard>
  );
}

function EcoRow({ label, value }: { readonly label: string; readonly value: string }) {
  return (
    <View style={styles.ecoRow}>
      <Text style={styles.ecoLabel}>{label}</Text>
      <Text style={styles.ecoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACE.xl, backgroundColor: COLORS.background },
  empty: { ...TYPE.body, color: COLORS.textMuted },
  content: { padding: SPACE.l, gap: SPACE.m },
  hero: { gap: SPACE.xs },
  name: { ...TYPE.title2, color: COLORS.text },
  latin: { ...TYPE.body, fontStyle: 'italic', color: COLORS.textMuted },
  aliases: { ...TYPE.footnote, color: COLORS.textSubtle, marginTop: 2 },
  badges: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: SPACE.s, marginTop: SPACE.s },
  protectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs,
    backgroundColor: FILLS.frost,
    paddingHorizontal: SPACE.s + 2,
    paddingVertical: SPACE.xs,
    borderRadius: BORDER_RADIUS,
  },
  protectedText: { ...TYPE.caption, fontWeight: '700', color: COLORS.frost },
  description: { ...TYPE.body, color: COLORS.text },
  ecoCard: { gap: SPACE.s },
  ecoTitle: { ...TYPE.headline, color: COLORS.text },
  ecoRow: { gap: 2 },
  ecoLabel: { ...TYPE.caption, color: COLORS.textMuted },
  ecoValue: { ...TYPE.subhead, color: COLORS.text },
});