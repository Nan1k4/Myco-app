/**
 * @file Rekord gatunku: gołąbek słodkawy (Russula integra).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaIntegra: Mushroom = {
  id: mushroomId('russula-integra'),
  scientificName: 'Russula integra',
  scientificSynonyms: ['Russula adulterina', 'Russula substiptica'],
  polishName: 'Gołąbek słodkawy',
  vernacularNames: ['gołąbek różnobarwny'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'adnate', 'free'],
    capColor: ['purple', 'red', 'brown', 'olive'], 
    capShape: ['hemispherical', 'convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth', 'striate'], 
    capPeelability: ['to_half'],
    hymenophoreColor: ['cream', 'yellow'], 
    sporePrint: ['yellow'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'clavate'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Wyborny grzyb jadalny o łagodnym, orzechowym smaku i zwięzłym miąższu.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus'],
    substrates: ['soil', 'litter'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('russula-sardonia'),
      distinguishingFeatures: ['sporePrint'],
      note: 'Czerwonofioletowy ma cytrynowożółte blaszki, fioletowy trzon, kremowy wysyp i palący smak; słodkawy - biały trzon, ochrowe blaszki i żółty wysyp, smak łagodny.',
    },
    {
      mushroomId: mushroomId('russula-queletii'),
      distinguishingFeatures: ['sporePrint'],
      note: 'Agrestowy ma purpurowy trzon, kremowy wysyp, owocowy zapach i ostry smak.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-integra-1'],
  description:
    'Pospolity w borach świerkowych i sosnowych. Kapelusz winnobrązowy do purpurowobrązowego, trzon czysto biały, blaszki z wiekiem ochrowożółte, wysyp żółty. Smak łagodny, orzechowy.',
};
