/**
 * @file Rekord gatunku: borowik wiosenny (Boletus rex-veris).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const boletusRexVeris: Mushroom = {
  id: mushroomId('boletus-rex-veris'),
  scientificName: 'Boletus rex-veris',
  scientificSynonyms: [], 
  polishName: 'Borowik wiosenny',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['cream', 'pink', 'brown_light', 'brown', 'brown_dark'], 
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['5_to_10', '10_to_20', 'over_20'], 
    capSurface: ['smooth', 'slimy'], 
    capMargin: ['inrolled', 'smooth'], 
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'yellow', 'olive'],
    sporePrint: ['olive_brown'],
    capFleshColor: ['white'], 
    capFleshColorChange: ['none'], 
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'], 
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate'],
    stipeColor: ['white', 'brown_light', 'pink'], 
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered', 'clustered'], 
    smell: ['mushroomy'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Wybitny grzyb jadalny. Miąższ twardy i smaczny; nadaje się do wszechstronnego użytku kulinarnego (gotowanie, smażenie, suszenie).',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus', 'abies'],
    substrates: ['soil', 'litter'],
    habitats: ['coniferous_forest'],
  },
  fruiting: {
    months: [5, 6],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 50,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['boletus-rex-veris-1'],
  description:
    'Wiosenny krewniak prawdziwka z gór zachodniej Ameryki Płn., pod sosnami i jodłami, często przy drogach leśnych. Kapelusz czerwonawobrązowy, rurki białe, potem żółtawe; nie sinieje.',
};
