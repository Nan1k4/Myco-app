/**
 * @file Rekord gatunku: muchomor porfirowy (Amanita porphyria).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const amanitaPorphyria: Mushroom = {
  id: mushroomId('amanita-porphyria'),
  scientificName: 'Amanita porphyria',
  scientificSynonyms: ['Agaricus porphyrius'],
  polishName: 'Muchomor porfirowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['grey', 'brown', 'brown_dark'],
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'warts'], 
    capMargin: ['smooth'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['white', 'grey'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['marginate_bulb'],
    ring: ['membranous_skirt', 'none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['raw_potato', 'radish'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['minor_toxins'],
    notes: 'Zawiera bufoteninę; uznawany za niejadalny, prawdopodobnie słabo trujący.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'betula'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest'], 
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['amanita-porphyria-1'],
  description:
    'Szarobrązowy kapelusz z fioletowym odcieniem, szary pierścień, bulwa z ostro odgiętym brzegiem pochwy. Zapach surowych ziemniaków. W borach na kwaśnych glebach.',
};
