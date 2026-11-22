/**
 * @file Definicje filtrów atlasu (faset) – jak w sklepie: każda faseta to lista opcji, w obrębie
 * fasety można zaznaczyć dowolnie wiele, gatunek pasuje, jeśli ma którąkolwiek z zaznaczonych.
 * Między fasetami – gatunek musi pasować do każdej. Bez Bramki i bez „pewności” – to przeglądanie,
 * nie rozpoznawanie (od rozpoznawania jest Klucz).
 *
 * Wszystkie fasety mają jeden kształt (`Facet`), więc panel, liczniki, pigułki i zapis są generyczne.
 * Wartości opcji to stringi ze słowników domeny; zapis z dysku jest walidowany względem opcji.
 *
 * @module features/atlas/engine/facets
 */
import {
  EDIBILITY_CATEGORIES,
  FEATURE_VOCABULARIES,
  HABITATS,
  SUBSTRATE_GROUPS,
  SUBSTRATE_GROUP_OF,
  TREE_GENERA,
  type FeatureKey,
  type Mushroom,
} from '../../../domain';
import { featureValueLabel } from '../../../i18n/featureValues.pl';
import {
  EDIBILITY_LABELS_PL,
  FEATURE_LABELS_PL,
  HABITAT_LABELS_PL,
  SUBSTRATE_GROUP_LABELS_PL,
  TREE_LABELS_PL,
} from '../../../i18n/pl';
import { swatchOf } from '../swatches';

/** Smaku nie ma w filtrach: atlas nie podsuwa „spróbuj, czy gorzki”. */
export type AtlasFeatureKey = Exclude<FeatureKey, 'taste'>;
export type FacetId = 'edibility' | 'legal' | 'habitat' | 'trees' | 'substrate' | AtlasFeatureKey;
/** `season` nie ma faset z opcjami – ma suwak zakresu miesięcy i „Owocnikuje teraz”. */
export type FacetGroupId = 'edibility' | 'season' | 'habitat' | 'underside' | 'cap' | 'stipe' | 'veil' | 'reactions' | 'smell';

export interface FacetOption {
  readonly value: string;
  readonly label: string;
  /** Kolor próbki (cechy barwne) albo `null`. */
  readonly swatch: string | null;
}

export interface Facet {
  readonly id: FacetId;
  readonly label: string;
  readonly options: readonly FacetOption[];
  /** Wartości gatunku dla tej fasety. */
  readonly valuesOf: (species: Mushroom) => readonly string[];
}

/** Kolejność grup w panelu (od najczęściej używanych). Każda faseta w dokładnie jednej grupie (test). */
export const FACET_GROUPS: readonly { readonly id: FacetGroupId; readonly facets: readonly FacetId[] }[] = [
  { id: 'edibility', facets: ['edibility', 'legal'] },
  { id: 'season', facets: [] },
  { id: 'habitat', facets: ['habitat', 'trees', 'substrate', 'growthHabit'] },
  { id: 'underside', facets: ['hymenophore', 'hymenophoreColor', 'gillAttachment'] },
  { id: 'cap', facets: ['capColor', 'capShape', 'capSize', 'capSurface', 'capMargin', 'capPeelability'] },
  { id: 'stipe', facets: ['stipeColor', 'stipeShape', 'stipeSurface', 'stipeInterior', 'stipeBase'] },
  { id: 'veil', facets: ['ring', 'volva'] },
  { id: 'reactions', facets: ['sporePrint', 'capFleshColor', 'capFleshColorChange', 'stipeFleshColor', 'stipeFleshColorChange', 'bruising', 'latex'] },
  { id: 'smell', facets: ['smell'] },
];

const PROTECTED = 'protected';

function featureFacet<K extends AtlasFeatureKey>(key: K): Facet {
  return {
    id: key,
    label: FEATURE_LABELS_PL[key],
    options: FEATURE_VOCABULARIES[key].map((value) => ({
      value,
      label: featureValueLabel(key, value),
      swatch: swatchOf(key, value),
    })),
    valuesOf: (species) => species.features[key],
  };
}

const plain = (value: string, label: string): FacetOption => ({ value, label, swatch: null });

/** Wszystkie fasety. `Record` wymusza definicję dla każdego `FacetId`. */
export const FACETS: Readonly<Record<FacetId, Facet>> = {
  edibility: {
    id: 'edibility',
    label: 'Kategoria',
    options: EDIBILITY_CATEGORIES.map((c) => plain(c, EDIBILITY_LABELS_PL[c])),
    valuesOf: (s) => [s.edibility.category],
  },
  legal: {
    id: 'legal',
    label: 'Ochrona',
    options: [plain(PROTECTED, 'Gatunek chroniony')],
    valuesOf: (s) => (s.legallyProtected ? [PROTECTED] : []),
  },
  habitat: {
    id: 'habitat',
    label: 'Typ siedliska',
    options: HABITATS.map((h) => plain(h, HABITAT_LABELS_PL[h])),
    valuesOf: (s) => s.ecology.habitats,
  },
  trees: {
    id: 'trees',
    label: 'Rośnie przy drzewach (mikoryza)',
    options: TREE_GENERA.map((t) => plain(t, TREE_LABELS_PL[t])),
    valuesOf: (s) => s.ecology.mycorrhizalPartners,
  },
  substrate: {
    id: 'substrate',
    label: 'Podłoże',
    options: SUBSTRATE_GROUPS.map((g) => plain(g, SUBSTRATE_GROUP_LABELS_PL[g])),
    valuesOf: (s) => [...new Set(s.ecology.substrates.map((sub) => SUBSTRATE_GROUP_OF[sub]))],
  },
  hymenophore: featureFacet('hymenophore'),
  gillAttachment: featureFacet('gillAttachment'),
  capColor: featureFacet('capColor'),
  capShape: featureFacet('capShape'),
  capSize: featureFacet('capSize'),
  capSurface: featureFacet('capSurface'),
  capMargin: featureFacet('capMargin'),
  capPeelability: featureFacet('capPeelability'),
  hymenophoreColor: featureFacet('hymenophoreColor'),
  sporePrint: featureFacet('sporePrint'),
  capFleshColor: featureFacet('capFleshColor'),
  capFleshColorChange: featureFacet('capFleshColorChange'),
  bruising: featureFacet('bruising'),
  latex: featureFacet('latex'),
  stipeColor: featureFacet('stipeColor'),
  stipeShape: featureFacet('stipeShape'),
  stipeFleshColor: featureFacet('stipeFleshColor'),
  stipeFleshColorChange: featureFacet('stipeFleshColorChange'),
  stipeInterior: featureFacet('stipeInterior'),
  stipeSurface: featureFacet('stipeSurface'),
  volva: featureFacet('volva'),
  stipeBase: featureFacet('stipeBase'),
  ring: featureFacet('ring'),
  growthHabit: featureFacet('growthHabit'),
  smell: featureFacet('smell'),
};

export const FACET_IDS = Object.keys(FACETS) as readonly FacetId[];

/** Rekord z wartością dla każdej fasety. Kompletność kluczy gwarantuje `FACET_IDS` (jedyne rzutowanie). */
export function recordByFacet<V>(valueOf: (id: FacetId) => V): Readonly<Record<FacetId, V>> {
  return Object.fromEntries(FACET_IDS.map((id) => [id, valueOf(id)])) as Record<FacetId, V>;
}

