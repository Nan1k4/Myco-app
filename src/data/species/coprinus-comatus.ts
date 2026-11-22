/**
 * @file Rekord gatunku: czernidłak kołpakowaty (Coprinus comatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const coprinusComatus: Mushroom = {
  id: mushroomId('coprinus-comatus'),
  scientificName: 'Coprinus comatus',
  scientificSynonyms: ['Agaricus comatus', 'Coprinus ovatus'],
  polishName: 'Czernidłak kołpakowaty',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['free'],
    capColor: ['white', 'brown_light', 'cream'], 
    capShape: ['cylindrical', 'ovate', 'campanulate'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['scaly'], 
    capMargin: ['smooth', 'deliquescent'], 
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'pink', 'black'],
    sporePrint: ['black'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'],
    ring: ['membranous_skirt', 'movable', 'none'], 
    growthHabit: ['scattered', 'grouped', 'clustered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'W odróżnieniu od czernidłaka szarego (Coprinopsis atramentaria) nie zawiera koprynu, jednak pojedyncze źródła zalecają ostrożność i unikanie alkoholu przy posiłku.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil'],
    habitats: ['meadow', 'park', 'roadside'],
  },
  fruiting: {
    months: [5, 6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 3, max: 8 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('coprinopsis-atramentaria'),
      distinguishingFeatures: ['capSurface', 'stipeSurface'],
      note: 'Czernidłak szary (Coprinopsis atramentaria): kapelusz szary, jajowaty, gładki lub z drobnymi łuseczkami tylko na szczycie; w połączeniu z alkoholem (do kilku dni) wywołuje zatrucie koprynowe. Kołpakowaty jest walcowaty i silnie łuskowaty.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['coprinus-comatus-1'],
  description:
    'Wysoki, walcowaty biały kapelusz z odstającymi brązowawymi łuskami, cienki ruchomy pierścień. Dojrzewając, rozpływa się od brzegu w czarną ciecz. Rośnie na trawnikach, poboczach i ziemi nawiezionej.',
};
