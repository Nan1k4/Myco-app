/**
 * @file Indeks bazy dla filtra: liczony RAZ (O(n·F·V)), potem każda ewaluacja pracuje na maskach.
 */
import {
  SUBSTRATE_GROUP_OF,
  isDangerousCategory,
  type DangerousLookalike,
  type FeatureKey,
  type Habitat,
  type Mushroom,
  type MushroomDatabase,
  type MushroomId,
  type SubstrateGroup,
  type TreeGenus,
} from '../../../domain';
import { maskOf, recordByFeature } from './featureBits';

/** Gatunek w postaci gotowej do filtrowania. */
export interface IndexedSpecies {
  readonly id: MushroomId;
  /** `poisonous` lub `deadly`. */
  readonly dangerous: boolean;
  readonly deadly: boolean;
  /** Maska dopuszczalnych wartości każdej cechy. */
  readonly masks: Readonly<Record<FeatureKey, number>>;
  /** Partnerzy mikoryzowi; `null`, gdy gatunek nie jest WYŁĄCZNIE mikoryzowy (drzewa go nie wykluczają). */
  readonly treePartners: ReadonlySet<TreeGenus> | null;
  readonly substrateGroups: ReadonlySet<SubstrateGroup>;
  readonly habitats: ReadonlySet<Habitat>;
  /** Relacje z danych – priorytet i opisy sprawdzeń Bramki. */
  readonly lookalikes: readonly DangerousLookalike[];
}

export interface FilterIndex {
  readonly dataVersion: string;
  /** W kolejności bazy. */
  readonly species: readonly IndexedSpecies[];
}

/** Buduje indeks bazy (raz, przy starcie ekranu filtra). */
export function buildFilterIndex(db: MushroomDatabase): FilterIndex {
  return { dataVersion: db.dataVersion, species: db.species.map(indexSpecies) };
}

function indexSpecies(species: Mushroom): IndexedSpecies {
  const { edibility, ecology, features } = species;
  const onlyMycorrhizal = ecology.trophicModes.every((mode) => mode === 'mycorrhizal');
  return {
    id: species.id,
    dangerous: isDangerousCategory(edibility.category),
    deadly: edibility.category === 'deadly',
    masks: recordByFeature((key) => featureMask(features, key)),
    treePartners: onlyMycorrhizal ? new Set(ecology.mycorrhizalPartners) : null,
    substrateGroups: new Set(ecology.substrates.map((substrate) => SUBSTRATE_GROUP_OF[substrate])),
    habitats: new Set(ecology.habitats),
    lookalikes: species.dangerousLookalikes,
  };
}

/** Generyczny pomocnik: wiąże klucz z typem jego wartości (pętla po unii kluczy tego nie potrafi). */
function featureMask<K extends FeatureKey>(features: Mushroom['features'], key: K): number {
  return maskOf(key, features[key]);
}
