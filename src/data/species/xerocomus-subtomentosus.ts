/**
 * @file Rekord gatunku: Podgrzybek zajączek (Xerocomus subtomentosus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const xerocomusSubtomentosus: Mushroom = {
  id: mushroomId('xerocomus-subtomentosus'),
  scientificName: 'Xerocomus subtomentosus',
  scientificSynonyms: ['Boletus subtomentosus'],
  polishName: 'Podgrzybek zajączek',
  vernacularNames: ['zajączek'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['olive', 'yellow', 'brown_light', 'brown'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['velvety', 'cracked'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow', 'olive'], 
    sporePrint: ['olive_brown'],
    capFleshColor: ['white', 'cream', 'yellow'],
    capFleshColorChange: ['none', 'blue'], 
    bruising: ['blue', 'none'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'smooth'], 
    stipeColor: ['yellow', 'brown_light'],
    stipeFleshColor: ['cream', 'yellow'],
    stipeFleshColorChange: ['none', 'blue'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny grzyb jadalny o łagodnym smaku, ale miękkim i szybko wiotczejącym miąższu. Bardzo podatny na robaczywienie oraz pleśnienie, dlatego do spożycia nadają się wyłącznie młode, zwięzłe owocniki.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'betula', 'picea', 'pinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
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
  imageKeys: ['xerocomus-subtomentosus-1'],
  description:
    'Kapelusz zamszowy, oliwkowobrązowy; pory jaskrawożółte, duże i kanciaste, po uciśnięciu słabo sinieją. Mylony z maślaczkiem pieprzowym (rdzawe pory, piekący smak).',
};
