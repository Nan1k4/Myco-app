/**
 * @file Rekord gatunku: łuskwiak nastroszony (Pholiota squarrosa).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const pholiotaSquarrosa: Mushroom = {
  id: mushroomId('pholiota-squarrosa'),
  scientificName: 'Pholiota squarrosa',
  scientificSynonyms: ['Agaricus squarrosus', 'Dryophila squarrosa'],
  polishName: 'Łuskwiak nastroszony',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'sinuate'],
    capColor: ['yellow', 'brown_light', 'brown'], 
    capShape: ['convex', 'campanulate', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['scaly'],
    capMargin: ['inrolled', 'appendiculate'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'olive', 'brown'], 
    sporePrint: ['brown'],
    capFleshColor: ['yellow', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['scaly'], 
    stipeColor: ['yellow', 'brown_light', 'brown'],
    stipeFleshColor: ['yellow', 'brown_light'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['fibrous', 'none'], 
    growthHabit: ['clustered'],
    smell: ['radish', 'unpleasant'], 
    taste: ['mild', 'bitter'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 4 }, 
    notes: 'Dolegliwości żołądkowo-jelitowe, nasilane przez alkohol; mechanizm inny niż w zatruciu kołpakiem czernidłakowym (opóźnione objawy).',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'park'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['pholiota-squarrosa-1'],
  description:
    'Kępy żółtawych grzybów z odstającymi rdzawymi łuskami na kapeluszu i trzonie, u podstawy drzew i na pniach. Pachnie rzodkiewką, wysyp brązowy. Niezalecany do jedzenia, zwłaszcza z alkoholem.',
};
