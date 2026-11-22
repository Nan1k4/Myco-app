/**
 * @file Rekord gatunku: borowik szlachetny (Boletus edulis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const boletusEdulis: Mushroom = {
  id: mushroomId('boletus-edulis'),
  scientificName: 'Boletus edulis',
  scientificSynonyms: [],
  polishName: 'Borowik szlachetny',
  vernacularNames: ['prawdziwek', 'grzyb prawdziwy'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['cream', 'brown_light', 'brown', 'brown_dark'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20', 'over_20'],
    capSurface: ['smooth'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'yellow', 'olive'],
    sporePrint: ['olive_brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate'],
    stipeColor: ['white', 'cream', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jeden z najcenniejszych grzybów jadalnych.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'fagus', 'quercus', 'betula'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 25,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['boletus-edulis-1'],
  description:
    'Jasna siateczka na trzonie, rurki białe, potem oliwkowe. Mylony z goryczakiem (różowe rurki, ciemna siateczka, gorzki) - niegroźny, ale psuje potrawę.',
};
