/**
 * @file Rekord gatunku: boczniak ostrygowaty (Pleurotus ostreatus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const pleurotusOstreatus: Mushroom = {
  id: mushroomId('pleurotus-ostreatus'),
  scientificName: 'Pleurotus ostreatus',
  scientificSynonyms: ['Agaricus ostreatus'],
  polishName: 'Boczniak ostrygowaty',
  vernacularNames: ['boczniak'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['decurrent'],
    capColor: ['grey', 'brown', 'brown_dark', 'cream'], 
    capShape: ['fan_shaped', 'convex', 'depressed'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['smooth'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'grey'],
    sporePrint: ['white', 'grey'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'], 
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'hairy'], 
    stipeColor: ['white', 'cream', 'grey'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['clustered'], 
    smell: ['mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Surowy niezalecany. Jest powszechnie cenionym grzybem; zarodniki mogą uczulać (uciążliwe dla osób wrażliwych przy zbiorze lub uprawie).',
  },
  ecology: {
    trophicModes: ['saprotrophic', 'parasitic'],
    mycorrhizalPartners: [],
    substrates: ['wood_dead', 'wood_living'], 
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [9, 10, 11, 12, 1, 2, 3, 4],
    optimalMeanTempC: { min: 2, max: 14 },
    minPrecipitationMm: 10,
    lagDays: { min: 3, max: 7 },
    frostSensitive: false,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['pleurotus-ostreatus-1'],
  description:
    'Szarobrązowe, małżowate kapelusze w dachówkowatych kępach na pniach i martwym drewnie liściastym; blaszki białe, zbiegające, trzon krótki i boczny. Owocuje głównie jesienią i zimą, także w odwilże. Jadalny.',
};
