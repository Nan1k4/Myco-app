/**
 * @file Rekord gatunku: gąska siarkowa (Tricholoma sulphureum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const tricholomaSulphureum: Mushroom = {
  id: mushroomId('tricholoma-sulphureum'),
  scientificName: 'Tricholoma sulphureum',
  scientificSynonyms: ['Agaricus sulphureus', 'Gyrophila sulphurea'],
  polishName: 'Gąska siarkowa',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate', 'adnexed'], 
    capColor: ['yellow', 'olive'], 
    capShape: ['convex', 'flat', 'umbonate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'fibrillose'], 
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow'],
    sporePrint: ['white'],
    capFleshColor: ['yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['fibrillose'],
    stipeColor: ['yellow'],
    stipeFleshColor: ['yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['gas'], 
    taste: ['bitter'],
  },
  edibility: {
    category: 'poisonous',
    
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Powoduje zatrucie żołądkowo-jelitowe (nudności, wymioty, biegunka). Silny, niemiły zapach gazu chroni przed zjedzeniem. Nie zbierać do jedzenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'betula', 'carpinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['tricholoma-sulphureum-1'],
  description:
    'Cały siarkowożółty grzyb z rzadkimi grubymi blaszkami, jednobarwnym trzonem i charakterystycznym, drażniącym zapachem gazu świetlnego. Rośnie w lasach liściastych i mieszanych, zwłaszcza dębowych. Trujący.',
};
