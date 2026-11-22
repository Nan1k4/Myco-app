/**
 * @file Słowniki jadalności i toksyczności.
 * @module domain/vocabulary/edibility
 */

export const EDIBILITY_CATEGORIES = [
  'edible',
  'conditionally_edible',
  'inedible',
  'unknown',
  'poisonous',
  'deadly',
] as const;
/** @see EDIBILITY_CATEGORIES */
export type EdibilityCategory = (typeof EDIBILITY_CATEGORIES)[number];

export const TOXIC_CATEGORIES = ['poisonous', 'deadly'] as const satisfies readonly EdibilityCategory[];
/** @see TOXIC_CATEGORIES */
export type ToxicCategory = (typeof TOXIC_CATEGORIES)[number];

export const DANGEROUS_CATEGORIES = [...TOXIC_CATEGORIES, 'unknown'] as const satisfies readonly EdibilityCategory[];
/** @see DANGEROUS_CATEGORIES */
export type DangerousCategory = (typeof DANGEROUS_CATEGORIES)[number];

const DANGEROUS_CATEGORY_SET: ReadonlySet<EdibilityCategory> = new Set(DANGEROUS_CATEGORIES);

export function isDangerousCategory(category: EdibilityCategory): category is DangerousCategory {
  return DANGEROUS_CATEGORY_SET.has(category);
}

/** Powód niejadalności (`inedible`). */
export const INEDIBILITY_REASONS = [
  'bitter',
  'acrid',
  'unpleasant_taste',
  'unpleasant_smell',
  'tough',
  'poor_quality', // mało wartościowy kulinarnie
  'no_nutritional_value', // nie do jedzenia
  'minor_toxins', 
  'toxins',
  'raw_toxicity', 
  'cumulative_toxicity', // szkodzi przy powtarzanym spożyciu 
  'individual_intolerance', // część osób reaguje dolegliwościami
  'allergen',
  'confusion_risk',
  'other',
] as const;
/** @see INEDIBILITY_REASONS */
export type InedibilityReason = (typeof INEDIBILITY_REASONS)[number];

export const TOXIC_SYNDROMES = [
  'phalloidin', // amatoksyny
  'orellanine', // zasłonaki – nefrotoksyczny, objawy po 2–20 dniach
  'gyromitrin', // piestrzenice
  'muscarine', // strzępiaki, lejkówki, grzybówki
  'isoxazole', // muchomor czerwony, plamisty
  'coprine', // czernidłak pospolity + alkohol
  'immunohemolytic', // krowiak podwinięty
  'rhabdomyolysis', // gąska zielonka
  'psychotropic', // łysiczki
  'gastrointestinal', // ogólny zespół żołądkowo-jelitowy
  'allenic_norleucine',
] as const;
/** @see TOXIC_SYNDROMES */
export type ToxicSyndrome = (typeof TOXIC_SYNDROMES)[number];

/** Narząd/układ atakowany przez toksynę. */
export type ToxinTarget =
  | 'liver' 
  | 'kidneys'
  | 'nervous_system'
  | 'blood' 
  | 'muscles' 
  | 'digestive_tract'
  | 'psyche';

export type WarningLevel = 'critical' | 'high' | 'moderate';

export interface SyndromeProfile {
  readonly targets: readonly ToxinTarget[];
  readonly delayedOnset: boolean;
  readonly warningLevel: WarningLevel;
}

export const SYNDROME_PROFILES: Readonly<Record<ToxicSyndrome, SyndromeProfile>> = {
  phalloidin: { targets: ['liver', 'kidneys'], delayedOnset: true, warningLevel: 'critical' },
  orellanine: { targets: ['kidneys'], delayedOnset: true, warningLevel: 'critical' },
  gyromitrin: { targets: ['liver', 'nervous_system'], delayedOnset: true, warningLevel: 'critical' },
  immunohemolytic: { targets: ['blood', 'kidneys'], delayedOnset: false, warningLevel: 'critical' },
  rhabdomyolysis: { targets: ['muscles', 'kidneys'], delayedOnset: true, warningLevel: 'high' },
  muscarine: { targets: ['nervous_system'], delayedOnset: false, warningLevel: 'high' },
  isoxazole: { targets: ['nervous_system'], delayedOnset: false, warningLevel: 'high' },
  coprine: { targets: ['nervous_system'], delayedOnset: false, warningLevel: 'moderate' },
  psychotropic: { targets: ['psyche'], delayedOnset: false, warningLevel: 'moderate' },
  gastrointestinal: { targets: ['digestive_tract'], delayedOnset: false, warningLevel: 'moderate' },
  allenic_norleucine: { targets: ['kidneys'], delayedOnset: true, warningLevel: 'moderate' },
};
