/**
 * @file Rekord gatunku: purchawka gruszkowata (Apioperdon pyriforme, dawniej Lycoperdon pyriforme).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const apioperdonPyriforme: Mushroom = {
  id: mushroomId('apioperdon-pyriforme'),
  scientificName: 'Apioperdon pyriforme',
  scientificSynonyms: ['Lycoperdon pyriforme', 'Morganella pyriformis'],
  polishName: 'Purchawka gruszkowata',
  vernacularNames: [],
  features: {
    hymenophore: ['none'],
    gillAttachment: ['not_applicable'],
    capColor: ['cream', 'brown_light', 'brown'], 
    capShape: ['pear_shaped'],
    capSize: ['under_5'],
    capSurface: ['granular'], 
    capMargin: ['none'],
    capPeelability: ['none'],
    hymenophoreColor: ['none'],
    sporePrint: ['olive', 'brown'],
    capFleshColor: ['white', 'olive'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['absent'],
    stipeInterior: ['not_applicable'],
    stipeSurface: ['not_applicable'],
    stipeColor: ['not_applicable'],
    stipeFleshColor: ['not_applicable'],
    stipeFleshColorChange: ['not_applicable'],
    volva: ['absent'],
    stipeBase: ['not_applicable'],
    ring: ['none'],
    growthHabit: ['clustered', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko owocniki o jednolicie białym, jędrnym miąższu. Każdy przekroić wzdłuż.',
    },
    notes: 'Po zżółknięciu lub zbrunatnieniu miąższu niejadalny. Skórka mało smaczna.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead'], 
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 6, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: false, 
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['apioperdon-pyriforme-1'],
  description:
    'Gruszkowaty, drobny owocnik, gładki do ziarnistego, na zbutwiałym drewnie, w gęstych kępach. Wyróżnia go podłoże drewniane i białe sznury grzybni u podstawy. Młody, biały w środku jadalny.',
};
