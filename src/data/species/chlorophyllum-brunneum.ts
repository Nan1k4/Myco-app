/**
 * @file Rekord gatunku: czubajnik brązowy (Chlorophyllum brunneum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const chlorophyllumBrunneum: Mushroom = {
  id: mushroomId('chlorophyllum-brunneum'),
  scientificName: 'Chlorophyllum brunneum',
  scientificSynonyms: ['Macrolepiota rachodes var. bohemica'],
  polishName: 'Czubajnik brązowy',
  vernacularNames: ['czubajnik wielkopierścieniowy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['brown', 'brown_light', 'cream'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['scaly'],
    capMargin: ['smooth', 'appendiculate'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['orange', 'red', 'brown'],
    bruising: ['orange', 'red', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'cream', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['orange', 'red', 'brown'],
    volva: ['absent'],
    stipeBase: ['marginate_bulb'],
    ring: ['membranous_skirt', 'movable', 'none'],
    growthHabit: ['scattered', 'grouped', 'clustered'],
    smell: ['mushroomy', 'none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 4 },
    notes: 'U części osób wywołuje silne dolegliwości żołądkowo-jelitowe (nudności, wymioty, biegunka), szczególnie na surowo lub po niedokładnej obróbce; zbiór odradzany.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil', 'litter'],
    habitats: ['park', 'roadside', 'meadow', 'deciduous_forest'],
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
  imageKeys: ['chlorophyllum-brunneum-1'],
  description:
    'Duży czubajnik z brązowymi łuskami na kapeluszu, gładkim trzonem (bez wzoru wężowej skóry), wyraźnie obrzeżoną bulwą u podstawy i miąższem czerwieniejącym po przekrojeniu.',
};
