/**
 * @file Rekord gatunku: koślarz babka (Leccinum scabrum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const leccinumScabrum: Mushroom = {
  id: mushroomId('leccinum-scabrum'),
  scientificName: 'Leccinum scabrum',
  scientificSynonyms: ['Boletus scaber', 'Krombholziella scabra'],
  polishName: 'Koźlarz babka',
  vernacularNames: ['babka', 'kozak', 'brzozak'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'],
    capColor: ['grey', 'brown_light', 'brown', 'brown_dark'],
    capShape: ['hemispherical', 'convex', 'flat'],
    capSize: ['under_5', '5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'], 
    capMargin: ['smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'grey', 'brown_light'], 
    sporePrint: ['brown'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none', 'pink'], 
    bruising: ['none', 'brown'], 
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid', 'fibrous'],
    stipeSurface: ['scabrous'], 
    stipeColor: ['white', 'grey'], 
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny grzyb jadalny o łagodnym smaku i miękkim miąższu. Trzony bywają włókniste; dobry do zup, sosów i suszenia.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 13, max: 22 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 9 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['leccinum-scabrum-1'],
  description:
    'Zawsze pod brzozami. Trzon białawy, gęsto pokryty ciemnymi kosmkami. Miąższ nie zmienia barwy lub lekko różowieje. Goryczak żółciowy ma siateczkę zamiast kosmków i różowe rurki.',
};
