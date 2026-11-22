/**
 * @file Rekord gatunku: pieprznik trąbkowy (Craterellus tubaeformis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const craterellusTubaeformis: Mushroom = {
  id: mushroomId('craterellus-tubaeformis'),
  scientificName: 'Craterellus tubaeformis',
  scientificSynonyms: ['Cantharellus tubaeformis', 'Cantharellus infundibuliformis'],
  polishName: 'Pieprznik trąbkowy',
  vernacularNames: [],
  features: {
    hymenophore: ['ridges'], 
    gillAttachment: ['decurrent'], 
    capColor: ['brown', 'brown_light', 'grey'], 
    capShape: ['funnel', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['scaly'], 
    capMargin: ['wavy', 'inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['grey', 'yellow', 'purple'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['brown_light'], 
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['yellow', 'orange'], 
    stipeFleshColor: ['cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['clustered', 'scattered'], 
    smell: ['mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny, dobrze się suszy i mrozi; wymaga dokładnego oczyszczenia z ściółki.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'betula', 'fagus'],
    substrates: ['moss', 'soil', 'wood_dead'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [9, 10, 11],
    optimalMeanTempC: { min: 3, max: 12 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: false, 
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('galerina-marginata'),
      distinguishingFeatures: ['hymenophore', 'sporePrint'],
      note: 'Hełmówka obrzeżona (śmiertelnie trująca - amatoksyny) rośnie na butwiejącym drewnie, ma prawdziwe blaszki, często resztki pierścienia i rdzawobrązowy wysyp; pieprznik trąbkowy ma żyłkowate listewki zbiegające na trzon, brak pierścienia i biały wysyp.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['craterellus-tubaeformis-1'],
  description:
    'Mały, lejkowaty owocnik o żółtobrązowym kapeluszu, żółtopomarańczowym, pustym trzonie i żyłkowatych, żółtoszarych do liliowoszarych listewkach zamiast blaszek. Rośnie licznie w mchu i na butwiejącym drewnie w lasach iglastych, do późnej jesieni.',
};
