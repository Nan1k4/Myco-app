import { StyleSheet, Text, View } from 'react-native';
import { SurfaceCard } from '../../../components/ui';
import type { FeatureKey, Mushroom } from '../../../domain';
import { featureValueLabel } from '../../../i18n/featureValues.pl';
import { FEATURE_LABELS_PL } from '../../../i18n/pl';
import { COLORS, FILLS, RADIUS, SPACE, TYPE } from '../../../theme';
import { swatchOf } from '../../atlas/swatches';

const GROUPS: readonly { readonly title: string; readonly keys: readonly FeatureKey[] }[] = [
  { title: 'Spód kapelusza', keys: ['hymenophore', 'hymenophoreColor', 'gillAttachment', 'sporePrint'] },
  { title: 'Kapelusz', keys: ['capColor', 'capShape', 'capSize', 'capSurface', 'capMargin', 'capPeelability'] },
  { title: 'Trzon i osłony', keys: ['stipeColor', 'stipeShape', 'stipeSurface', 'stipeInterior', 'stipeBase', 'ring', 'volva'] },
  { title: 'Miąższ i reakcje', keys: ['capFleshColor', 'capFleshColorChange', 'stipeFleshColor', 'stipeFleshColorChange', 'bruising', 'latex'] },
  { title: 'Wzrost i zapach', keys: ['growthHabit', 'smell'] },
];

interface FeatureValueItem {
  readonly value: string;
  readonly label: string;
  readonly swatch: string | null;
}

function formatValues<K extends FeatureKey>(species: Mushroom, key: K): readonly FeatureValueItem[] {
  const values = species.features[key];

  if (key === 'ring') {
    const ringValues = values as readonly Mushroom['features']['ring'][number][];
    if (ringValues.includes('none') && ringValues.length > 1) {
      const present = ringValues
        .filter((v) => v !== 'none')
        .map((v) => featureValueLabel('ring', v));
      return [{ value: 'ring_optional', label: `${present.join(', ')} lub brak`, swatch: null }];
    }
  }

  if (key === 'capSurface') {
    const surfaceValues = values as readonly Mushroom['features']['capSurface'][number][];
    if (surfaceValues.includes('warts') && surfaceValues.includes('smooth')) {
      const rest = surfaceValues
        .filter((v) => v !== 'warts' && v !== 'smooth')
        .map((v) => ({
          value: String(v),
          label: featureValueLabel('capSurface', v),
          swatch: swatchOf('capSurface', String(v)),
        }));
      return [
        {
          value: 'warts_washable',
          label: 'Z łatkami lub brodawkami (po deszczu może być gładka)',
          swatch: null,
        },
        ...rest,
      ];
    }
  }

  return values.map((value) => ({
    value: String(value),
    label: featureValueLabel(key, value),
    swatch: swatchOf(key, String(value)),
  }));
}

export function FeatureGroupsCard({ species }: { readonly species: Mushroom }) {
  return (
    <View style={styles.root}>
      {GROUPS.map((group) => (
        <SurfaceCard key={group.title} padded={false}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          {group.keys.map((key) => {
            const items = formatValues(species, key);
            return (
              <View key={key} style={styles.row}>
                <Text style={styles.label}>{FEATURE_LABELS_PL[key]}</Text>
                <View style={styles.values}>
                  {items.map((item) => (
                    <View key={item.value} style={styles.chip}>
                      {item.swatch ? <View style={[styles.swatch, { backgroundColor: item.swatch }]} /> : null}
                      <Text style={styles.chipText}>{item.label}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </SurfaceCard>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: SPACE.m },
  groupTitle: {
    ...TYPE.overline,
    color: COLORS.primary,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.m,
    paddingBottom: SPACE.s,
  },
  row: {
    gap: SPACE.s,
    paddingHorizontal: SPACE.l,
    paddingVertical: SPACE.m,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.borderSubtle,
  },
  label: { ...TYPE.footnote, color: COLORS.textMuted },
  values: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACE.xs + 2 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.xs + 2,
    backgroundColor: FILLS.neutral,
    paddingHorizontal: SPACE.s + 2,
    paddingVertical: 5,
    borderRadius: RADIUS.s,
  },
  swatch: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(22, 31, 24, 0.22)',
  },
  chipText: { ...TYPE.footnote, color: COLORS.text, fontWeight: '500' },
});