/**
 * @file Rekord gatunku: gołąbek wymiotny (Russula emetica).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaEmetica: Mushroom = {
  id: mushroomId('russula-emetica'),
  scientificName: 'Russula emetica',
  scientificSynonyms: ['Agaricus emeticus'],
  polishName: 'Gołąbek wymiotny',
  vernacularNames: ['gorzkówka', 'serojeszka mierzliwa'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['red', 'pink'],
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['striate'],
    capPeelability: ['full'],
    hymenophoreColor: ['white'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'pink'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'wrinkled'],
    stipeColor: ['white', 'pink'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'fruity'],
    taste: ['acrid'], // bardzo piekący
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Silnie drażni przewód pokarmowy: nudności, wymioty, biegunka. Zwykle bez następstw, ale nie nadaje się do jedzenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'betula'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest', 'bog'], 
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['russula-emetica-1'],
  description:
    'Jaskrawoczerwony, błyszczący i lepki kapelusz z prążkowanym brzegiem; blaszki, trzon i miąższ białe. Smak bardzo piekący. Pospolity w wilgotnych borach i na torfowiskach. Trujący.',
};
