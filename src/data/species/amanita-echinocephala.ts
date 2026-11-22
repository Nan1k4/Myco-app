/**
 * @file Rekord gatunku: muchomor jeżowaty (Amanita echinocephala).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaEchinocephala: Mushroom = {
  id: mushroomId('amanita-echinocephala'),
  scientificName: 'Amanita echinocephala',
  scientificSynonyms: ['Amanita solitaria', 'Agaricus echinocephalus'],
  polishName: 'Muchomor jeżowaty',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['white', 'cream', 'grey'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['warts', 'smooth'], 
    capMargin: ['appendiculate', 'smooth'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream', 'green'], 
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['scaly'], 
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white', 'cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent', 'present'], 
    stipeBase: ['rounded_bulb', 'rooting'], 
    ring: ['membranous_skirt', 'none'], 
    growthHabit: ['solitary', 'scattered'],
    smell: ['unpleasant'],
    taste: ['mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['allenic_norleucine'],
    symptomOnsetHours: { min: 0.5, max: 12 },
    notes: 'Doniesienia o zatruciach z uszkodzeniem nerek, dane ograniczone.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'tilia', 'carpinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 16, max: 24 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['amanita-echinocephala-1'],
  description:
    'Duży, białawy, kapelusz pokryty ostrymi piramidalnymi brodawkami, blaszki z zielonkawym odcieniem, nieprzyjemny zapach. Korzeniasta bulwa z pierścieniami łusek. Bardzo rzadki, na wapiennych glebach.',
};
