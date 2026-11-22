/**
 * @file Rekord gatunku: gołąbek pierwiosnkowy (Russula sardonia).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaSardonia: Mushroom = {
  id: mushroomId('russula-sardonia'),
  scientificName: 'Russula sardonia',
  scientificSynonyms: ['Russula drimeia', 'Russula chrysodacryon'],
  polishName: 'Gołąbek czerwonofioletowy',
  vernacularNames: ['gołąbek pierwiosnkowy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'adnate'],
    capColor: ['purple', 'violet', 'red', 'green'],
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['cream', 'yellow'], 
    sporePrint: ['cream'],
    capFleshColor: ['white', 'purple'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth'],
    stipeColor: ['purple', 'violet', 'white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['fruity', 'none'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Trujący - wywołuje dolegliwości żołądkowo-jelitowe (nudności, wymioty, biegunkę). Bardzo ostry, piekący smak.'
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 7, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['russula-sardonia-1'],
  description:
    'Pod sosnami na piaszczystych glebach, późnym latem i jesienią. Kapelusz purpurowofioletowy, w środku prawie czarny; trzon z fioletowym nalotem, blaszki cytrynowożółte.',
};
