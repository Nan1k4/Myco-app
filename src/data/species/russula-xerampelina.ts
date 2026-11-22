/**
 * @file Rekord gatunku: gołąbek śledziowy (Russula xerampelina).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaXerampelina: Mushroom = {
  id: mushroomId('russula-xerampelina'),
  scientificName: 'Russula xerampelina',
  scientificSynonyms: ['Russula erythropoda', 'Russula erythropus'],
  polishName: 'Gołąbek śledziowy',
  vernacularNames: ['gołąbek winny'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['purple', 'red', 'brown', 'olive'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth'],
    capPeelability: ['none', 'to_half'],
    hymenophoreColor: ['cream', 'yellow'], 
    sporePrint: ['yellow'],
    capFleshColor: ['white'],
    capFleshColorChange: ['brown'],
    bruising: ['brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'pink', 'red'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['brown'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fishy'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Rybi zapach nie znika całkowicie po ugotowaniu.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus', 'picea'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('russula-sardonia'),
      distinguishingFeatures: ['hymenophoreColor'],
      note: 'Czerwonofioletowy ma cytrynowożółte blaszki, fioletowy trzon i palący smak.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-xerampelina-1'],
  description:
    'Kapelusz winnoczerwony do brązowego, trzon często z czerwonym nalotem. Zapach śledzia/skorupiaków, wyraźniejszy u starszych okazów; miąższ brązowieje. Siarczan żelaza barwi miąższ na zielono.',
};
