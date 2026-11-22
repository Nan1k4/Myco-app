/**
 * @file Rekord gatunku: mleczaj paskudnik (Lactarius turpis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactariusTurpis: Mushroom = {
  id: mushroomId('lactarius-turpis'),
  scientificName: 'Lactarius turpis',
  scientificSynonyms: ['Lactarius necator', 'Lactarius plumbeus', 'Agaricus turpis', 'Galorrheus turpis', 'Lactifluus turpis'],
  polishName: 'Mleczaj paskudnik',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'subdecurrent'],
    capColor: ['olive', 'brown_dark', 'black'], 
    capShape: ['convex', 'depressed', 'funnel'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['slimy', 'velvety'], 
    capMargin: ['inrolled', 'woolly'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['cream'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['brown'],
    bruising: ['olive', 'brown'],
    latex: ['white'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid', 'hollow'],
    stipeSurface: ['slimy', 'pitted'], 
    stipeColor: ['olive', 'brown_light'], 
    stipeFleshColor: ['white', 'cream'],
    stipeFleshColorChange: ['brown'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Zawiera mutagenną necatorynę (gotowanie ją osłabia, ale nie usuwa). W Rosji solony po moczeniu i obróbce - w Polsce niezalecany.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula', 'picea', 'pinus'],
    substrates: ['soil', 'moss'],
    habitats: ['mixed_forest', 'deciduous_forest', 'coniferous_forest'], 
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 5, max: 14 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: false, 
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['lactarius-turpis-1'],
  description:
    'Duży, oliwkowobrązowy do czarniawego, lepki kapelusz z kutnerowatym, podwiniętym brzegiem. Białe, ostre mleczko brudzi blaszki na oliwkowobrązowo. Pospolity pod brzozami.',
};
