/**
 * @file Fikcyjne gatunki do testów (poza `__tests__`, żeby Jest nie traktował pliku jak testu).
 * Profil bazowy spełnia wszystkie reguły `validateDatabase`.
 */
import {
  SCHEMA_VERSION,
  mushroomId,
  type Edibility,
  type Mushroom,
  type MushroomDatabase,
  type SpeciesFeatureProfile,
} from '..';

export const EDIBLE: Edibility = { category: 'edible' };
export const DEADLY: Edibility = { category: 'deadly', syndromes: ['phalloidin'], symptomOnsetHours: { min: 6, max: 24 } };

const BASE_FEATURES: SpeciesFeatureProfile = {
  hymenophore: ['gills'],
  gillAttachment: ['free'],
  capColor: ['white'],
  capShape: ['convex'],
  capSize: ['5_to_10'],
  capSurface: ['smooth'],
  capMargin: ['smooth'],
  capPeelability: ['full'],
  hymenophoreColor: ['white'],
  sporePrint: ['white'],
  capFleshColor: ['white'],
  capFleshColorChange: ['none'],
  stipeColor: ['white'],
  stipeFleshColor: ['white'],
  stipeFleshColorChange: ['none'],
  bruising: ['none'],
  latex: ['none'],
  stipeShape: ['cylindrical'],
  stipeInterior: ['solid'],
  stipeSurface: ['smooth'],
  volva: ['absent'],
  stipeBase: ['plain'],
  ring: ['none'],
  growthHabit: ['solitary'],
  smell: ['none'],
  taste: ['mild'],
};

/** Gatunek o profilu bazowym z nadpisanymi cechami/polami; id z nazwy naukowej. */
export function testSpecies(
  scientificName: string,
  edibility: Edibility,
  features: Partial<SpeciesFeatureProfile> = {},
  overrides: Partial<Mushroom> = {},
): Mushroom {
  return {
    id: mushroomId(scientificName.toLowerCase().split(' ').join('-')),
    scientificName,
    scientificSynonyms: [],
    polishName: scientificName,
    vernacularNames: [],
    features: { ...BASE_FEATURES, ...features },
    edibility,
    ecology: { trophicModes: ['saprotrophic'], mycorrhizalPartners: [], substrates: ['soil'], habitats: ['meadow'] },
    fruiting: {
      months: [8],
      optimalMeanTempC: { min: 10, max: 20 },
      minPrecipitationMm: 10,
      lagDays: { min: 3, max: 7 },
      frostSensitive: true,
    },
    dangerousLookalikes: [],
    legallyProtected: false,
    imageKeys: [],
    description: '',
    ...overrides,
  };
}

export function testDatabase(species: readonly Mushroom[]): MushroomDatabase {
  return { schemaVersion: SCHEMA_VERSION, dataVersion: 'test', species };
}
