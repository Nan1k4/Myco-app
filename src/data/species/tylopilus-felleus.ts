/**
 * @file Rekord gatunku: Goryczak żółciowy (Tylopilus felleus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const tylopilusFelleus: Mushroom = {
  id: mushroomId('tylopilus-felleus'),
  scientificName: 'Tylopilus felleus',
  scientificSynonyms: ['Boletus felleus'],
  polishName: 'Goryczak żółciowy',
  vernacularNames: ['goryczak'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['cream', 'brown_light', 'brown', 'olive'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['velvety', 'smooth'],
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'pink'], 
    sporePrint: ['pink_brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none', 'pink'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['reticulate'], 
    stipeColor: ['cream', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['bitter'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['bitter'],
    notes: 'Nie jest trujący, ale goryczka nie znika po obróbce i psuje całą potrawę.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'fagus', 'quercus', 'betula'],
    substrates: ['soil', 'moss', 'wood_dead'], 
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 22 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['tylopilus-felleus-1'],
  description:
    'Rurki białe, potem różowe; trzon z grubą, ciemnobrązową siateczką. Skrajnie gorzki - jeden owocnik psuje całą potrawę. Mylony z borowikiem szlachetnym (jasna siateczka, rurki białe → oliwkowe) i koźlarzem babką (kosmki zamiast siateczki).',
};
