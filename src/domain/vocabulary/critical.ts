/**
 * @file Słowniki cech najczęściej rozstrzygających o gatunkach trujących (pochwa, podstawa
 * trzonu, pierścień, zapach, smak). O tym, która cecha jest krytyczna dla danej pary
 * gatunków, decydują dane (`DangerousLookalike`), nie ten plik.
 * @module domain/vocabulary/critical
 */

/** Obecność cechy obserwowalnej. */
export const PRESENCE = ['present', 'absent'] as const;
/** @see PRESENCE */
export type Presence = (typeof PRESENCE)[number];

export const RING_TYPES = [
  'none',
  'membranous_skirt',
  'membranous_striate',
  'membranous_thin',
  'movable',
  'cortina',
  'fibrous',
  'fibrous_zone',
] as const;
/** @see RING_TYPES */
export type RingType = (typeof RING_TYPES)[number];

export const STIPE_BASES = [
  'plain', 
  'rounded_bulb', 
  'marginate_bulb', 
  'rooting', 
  'not_applicable',
  'tapering',
] as const;
/** @see STIPE_BASES */
export type StipeBase = (typeof STIPE_BASES)[number];

export const SMELLS = [
  'anise',
  'aromatic',
  'bitter_almond',
  'carrion',
  'earthy',
  'fruity',
  'fishy',
  'floral',
  'flour',
  'garlic',
  'gas',
  'iodine',
  'mushroomy',
  'mealy',
  'musty',
  'none',
  'nutty', 
  'oily',
  'phenol',
  'radish',
  'raw_potato',
  'sweet',
  'sour',
  'soapy',
  'unpleasant',
] as const;
/** @see SMELLS */
export type Smell = (typeof SMELLS)[number];

export const TASTES = [
  'mild',
  'bitter',
  'acrid',
  'astringent',
  'flour',
  'mealy',
  'nutty',
  'peppery',
  'radish',
  'sour',
  'sweet',
  'soapy',
  'unpleasant',
] as const;
/** @see TASTES */
export type Taste = (typeof TASTES)[number];
