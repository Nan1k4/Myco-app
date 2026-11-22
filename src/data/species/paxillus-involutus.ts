/**
 * @file Rekord gatunku: krowiak podwinięty (Paxillus involutus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const paxillusInvolutus: Mushroom = {
  id: mushroomId('paxillus-involutus'),
  scientificName: 'Paxillus involutus',
  scientificSynonyms: ['Agaricus involutus', 'Rhymovis involuta'],
  polishName: 'Krowiak podwinięty',
  vernacularNames: ['krowiak'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['decurrent'], 
    capColor: ['brown_light', 'brown', 'olive'], 
    capShape: ['convex', 'flat', 'depressed'], 
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['velvety', 'smooth', 'slimy'], 
    capMargin: ['inrolled', 'striate'], 
    capPeelability: ['to_half'],
    hymenophoreColor: ['yellow', 'brown_light', 'olive'],
    sporePrint: ['brown'],
    capFleshColor: ['cream', 'yellow'],
    capFleshColorChange: ['brown'], 
    bruising: ['brown'], 
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth'],
    stipeColor: ['brown_light', 'yellow', 'brown'],
    stipeFleshColor: ['cream', 'yellow'],
    stipeFleshColorChange: ['brown'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'grouped'],
    smell: ['none', 'mushroomy'],
    taste: ['mild', 'sour'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['immunohemolytic', 'gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Silnie trujący. Powtarzane spożycie uczula - zespół krowiakowy (autoimmunohemolityczna anemia, niewydolność nerek), możliwy zgon także po wcześniejszych „bezproblemowych” posiłkach. Nie zbierać do jedzenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'picea', 'pinus', 'quercus', 'populus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['paxillus-involutus-1'],
  description:
    'Rdzawobrązowy kapelusz z silnie podwiniętym, wełnistym brzegiem, zbiegające żółtobrązowe blaszki łatwo oddzielające się od kapelusza i brunatniejące po dotknięciu. Pospolity pod brzozami i sosnami. Trujący - zespół krowiakowy.',
};
