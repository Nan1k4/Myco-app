/**
 * @file Słowniki ekologii: drzewa, troficzność, podłoże, siedlisko.
 * @module domain/vocabulary/ecology
 */

/** Rodzaje drzew (rodzaj, nie gatunek – tyle realnie rozpozna grzybiarz). */
export const TREE_GENERA = [
  'pinus', // sosna
  'picea', // świerk
  'abies', // jodła
  'larix', // modrzew
  'quercus', // dąb
  'fagus', // buk
  'betula', // brzoza
  'carpinus', // grab
  'populus', // topola, osika
  'salix', // wierzba
  'alnus', // olsza
  'tilia', // lipa
  'tsuga',
  'corylus', // leszczyna
  'castanea', // kasztan jadalny
  'none'
] as const;
/** @see TREE_GENERA */
export type TreeGenus = (typeof TREE_GENERA)[number];

/** Sposób odżywiania. Gatunek może mieć kilka. */
export const TROPHIC_MODES = [
  'mycorrhizal', 
  'saprotrophic', 
  'parasitic'
] as const;
/** @see TROPHIC_MODES */
export type TrophicMode = (typeof TROPHIC_MODES)[number];

export const SUBSTRATES = [
  'soil',
  'sand', 
  'litter',
  'moss',
  'dung',
  'burnt_ground',
  'wood_living',
  'wood_dead', // także pniaki
  'wood_buried', // zakopane drewno, korzenie – z wierzchu wygląda jak ziemia
] as const;
/** @see SUBSTRATES */
export type Substrate = (typeof SUBSTRATES)[number];

export const SUBSTRATE_GROUPS = [
  'ground', 
  'wood'
] as const;
/** @see SUBSTRATE_GROUPS */
export type SubstrateGroup = (typeof SUBSTRATE_GROUPS)[number];

export const SUBSTRATE_GROUP_OF: Readonly<Record<Substrate, SubstrateGroup>> = {
  soil: 'ground',
  sand: 'ground',
  litter: 'ground',
  moss: 'ground',
  dung: 'ground',
  burnt_ground: 'ground',
  wood_living: 'wood',
  wood_dead: 'wood',
  // Grzybiarz widzi ziemię, więc zaznaczy „ziemia”; grupa `wood` wykluczyłaby gatunek błędnie.
  wood_buried: 'ground',
};

/** Typ siedliska. */
export const HABITATS = [
  'coniferous_forest',
  'deciduous_forest',
  'mixed_forest',
  'forest_edge',
  'meadow',
  'heath', 
  'park',
  'roadside', 
  'bog',
] as const;
/** @see HABITATS */
export type Habitat = (typeof HABITATS)[number];
