/**
 * @file Rekord gatunku: płomiennica zimowa (Flammulina velutipes).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const flammulinaVelutipes: Mushroom = {
  id: mushroomId('flammulina-velutipes'),
  scientificName: 'Flammulina velutipes',
  scientificSynonyms: ['Collybia velutipes', 'Gymnopus velutipes', 'Agaricus velutipes'],
  polishName: 'Płomiennica zimowa',
  vernacularNames: ['zimówka aksamitnotrzonowa'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'sinuate'],
    capColor: ['orange', 'yellow', 'brown_light'],
    capShape: ['convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy'], 
    capMargin: ['smooth', 'inrolled'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'], 
    stipeSurface: ['velvety'],
    stipeColor: ['yellow', 'brown_dark', 'black'],
    stipeFleshColor: ['cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['clustered'], 
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny zimowy grzyb, mrozoodporny - po rozmrożeniu nadaje się do zbioru.',
  },
  ecology: {
    trophicModes: ['saprotrophic', 'parasitic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'wood_living'],
    habitats: ['deciduous_forest', 'park'],
  },
  fruiting: {
    months: [1, 2, 3, 10, 11, 12],
    optimalMeanTempC: { min: 0, max: 8 },
    minPrecipitationMm: 10,
    lagDays: { min: 7, max: 14 },
    frostSensitive: false,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('galerina-marginata'),
      distinguishingFeatures: ['sporePrint', 'stipeSurface'],
      note: 'Hełmówka obrzeżona (śmiertelnie trująca - amatoksyny) ma rdzawobrązowy wysyp, resztki pierścienia na trzonie i trzon bez aksamitnego, czarniejącego dołu; płomiennica ma biały wysyp, brak pierścienia i aksamitny, ciemny trzon. Obie rosną na drewnie.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['flammulina-velutipes-1'],
  description:
    'Pomarańczowożółty, śluzowaty kapelusz, białe blaszki i aksamitny, ku dołowi ciemnobrązowy do czarnego trzon bez pierścienia. Rośnie kępami na drewnie liściastych drzew jesienią i zimą, nawet po przymrozkach.',
};
