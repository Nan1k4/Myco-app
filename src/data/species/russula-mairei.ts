/**
 * @file Rekord gatunku: gołąbek buczynowy (Russula mairei).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaMairei: Mushroom = {
  id: mushroomId('russula-mairei'),
  scientificName: 'Russula mairei',
  scientificSynonyms: ['Russula nobilis', 'Russula fageticola'],
  polishName: 'Gołąbek buczynowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['red', 'pink', 'white'],
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth'], 
    capMargin: ['smooth'],
    capPeelability: ['to_third'], 
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'pink'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fruity'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Niejadalny z powodu bardzo ostrego, piekącego smaku. Może wywoływać podrażnienia żołądkowo-jelitowe.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['russula-mairei-1'],
  description:
    'Wyłącznie pod bukami. Mały, twardy, kapelusz matowy, czerwony; blaszki i trzon białe. Młode pachną kokosem. Smak bardzo ostry - „wymiotny gołąbek buczyn”.',
};
