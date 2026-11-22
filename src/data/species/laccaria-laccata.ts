/**
 * @file Rekord gatunku: lakówka pospolita (Laccaria laccata).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const laccariaLaccata: Mushroom = {
  id: mushroomId('laccaria-laccata'),
  scientificName: 'Laccaria laccata',
  scientificSynonyms: ['Agaricus laccatus', 'Clitocybe laccata'],
  polishName: 'Lakówka pospolita',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['brown_light', 'orange', 'pink'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'scaly'], 
    capMargin: ['wavy', 'striate'], 
    capPeelability: ['none'],
    hymenophoreColor: ['pink'], 
    sporePrint: ['white'],
    capFleshColor: ['pink', 'brown_light'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow', 'stuffed'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['brown_light', 'pink'],
    stipeFleshColor: ['brown_light'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Mało wartościowy, drobny. Może gromadzić metale ciężkie i arsen, nie zbierać przy drogach i na terenach skażonych.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'betula', 'quercus', 'fagus'],
    substrates: ['soil', 'litter', 'sand'],
    habitats: ['coniferous_forest', 'deciduous_forest', 'mixed_forest', 'heath', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 9 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('hebeloma-crustuliniforme'),
      distinguishingFeatures: ['sporePrint', 'capSurface'],
      note: 'Hebeloma crustuliniforme (trujący): wysyp brunatny, zapach rzodkiewki, kapelusz śliski, blaszki bladobrązowe i „płaczące”; lakówka ma wysyp biały i różowawe grube blaszki.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['laccaria-laccata-1'],
  description:
    'Mały, rdzawo-ceglasty do różowawobrązowego kapelusz, grube rzadkie różowawe blaszki, długi włóknisty trzon. Wysyp biały. Bardzo pospolita w lasach wszelkiego typu.',
};
