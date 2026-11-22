/**
 * @file Rekord gatunku: kielichowiec pomarańczowy (Omphalotus olearius).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const omphalotusOlearius: Mushroom = {
  id: mushroomId('omphalotus-olearius'),
  scientificName: 'Omphalotus olearius',
  scientificSynonyms: ['Clitocybe olearia', 'Pleurotus olearius'],
  polishName: 'Kielichowiec pomarańczowy',
  vernacularNames: ['głowieniak pomarańczowy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['decurrent'],
    capColor: ['orange', 'red_brown', 'yellow'],
    capShape: ['convex', 'flat', 'depressed', 'funnel'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'fibrillose'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['orange', 'yellow'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['orange', 'yellow'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['tapering_down', 'cylindrical'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['orange', 'yellow'],
    stipeFleshColor: ['orange', 'yellow'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['tapering', 'plain'],
    ring: ['none'],
    growthHabit: ['clustered'],
    smell: ['none', 'unpleasant'],
    taste: ['unpleasant', 'mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 4 },
    notes: 'Silnie trujący - powoduje gwałtowne wymioty, biegunkę i skurcze brzucha. W Polsce skrajnie rzadki, rośnie głównie w cieplejszych regionach Europy.',
  },
  ecology: {
    trophicModes: ['saprotrophic', 'parasitic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'wood_living'],
    habitats: ['deciduous_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 15, max: 24 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['omphalotus-olearius-1'],
  description:
    'Pomarańczowy grzyb rosnący kępami na drewnie drzew liściastych; ma prawdziwe, gęste, cienkie blaszki (a nie listewki jak pieprznik jadalny) oraz pomarańczowy miąższ.',
};
