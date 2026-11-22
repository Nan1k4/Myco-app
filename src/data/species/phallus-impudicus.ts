/**
 * @file Rekord gatunku: sromotnik bezwstydny (Phallus impudicus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const phallusImpudicus: Mushroom = {
  id: mushroomId('phallus-impudicus'),
  scientificName: 'Phallus impudicus',
  scientificSynonyms: ['Ithyphallus impudicus', 'Phallus foetidus'],
  polishName: 'Sromotnik bezwstydny',
  vernacularNames: ['sromotnik'],
  features: {
    hymenophore: ['none'],
    gillAttachment: ['not_applicable'],
    capColor: ['olive', 'brown_dark'], 
    capShape: ['campanulate'],
    capSize: ['under_5'],
    capSurface: ['slimy', 'reticulate'], 
    capMargin: ['none'],
    capPeelability: ['none'],
    hymenophoreColor: ['none'],
    sporePrint: ['olive', 'brown_dark'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['chambered', 'hollow'], 
    stipeSurface: ['porous'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['present'], 
    stipeBase: ['rooting'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'clustered'],
    smell: ['carrion'], 
    taste: ['mild'], 
  },
  edibility: {
    category: 'inedible',
    reasons: ['unpleasant_smell', 'poor_quality'],
    notes: 'Dojrzały owocnik cuchnie padliną. W niektórych krajach jada się młode „jajo” (smak rzodkwi), ale w Polsce traktuje się go jako niejadalnego.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil', 'litter', 'wood_dead'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 14, max: 22 },
    minPrecipitationMm: 25,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['phallus-impudicus-1'],
  description:
    'Biały, gąbczasty trzon wyrastający z jajowatej pochwy, z dzwonkową główką pokrytą oliwkowym, cuchnącym śluzem. Zapach padliny czuć z daleka. Pospolity w lasach i ogrodach.',
};
