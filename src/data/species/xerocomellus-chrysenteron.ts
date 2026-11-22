/**
 * @file Rekord gatunku: Podgrzybek złotawy (Xerocomellus chrysenteron).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const xerocomellusChrysenteron: Mushroom = {
  id: mushroomId('xerocomellus-chrysenteron'),
  scientificName: 'Xerocomellus chrysenteron',
  scientificSynonyms: ['Xerocomus chrysenteron', 'Boletus chrysenteron'],
  polishName: 'Podgrzybek złotawy',
  vernacularNames: [],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['brown_light', 'brown', 'brown_dark', 'olive'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['velvety', 'cracked'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'olive'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['cream', 'yellow'], 
    capFleshColorChange: ['blue', 'none'], 
    bruising: ['blue'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['fibrillose'], 
    stipeColor: ['yellow', 'red'], 
    stipeFleshColor: ['yellow', 'red'], 
    stipeFleshColorChange: ['blue', 'none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Nie zbierać owocników porośniętych pleśnią.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'carpinus', 'betula', 'picea', 'pinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['xerocomellus-chrysenteron-1'],
  description:
    'Spękany kapelusz odsłania różowoczerwony miąższ, trzon u dołu czerwonawy, pory sinieją. Starsze owocniki często porasta złotożółta pleśń – takich nie zbierać.',
};
