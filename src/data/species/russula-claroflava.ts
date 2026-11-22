/**
 * @file Rekord gatunku: gołąbek jasnożółty (Russula claroflava).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaClaroflava: Mushroom = {
  id: mushroomId('russula-claroflava'),
  scientificName: 'Russula claroflava',
  scientificSynonyms: ['Russula flava', 'Russula ochroleuca var. claroflava'],
  polishName: 'Gołąbek jasnożółty',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['yellow'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['white', 'cream', 'yellow'],
    sporePrint: ['cream', 'yellow'],
    capFleshColor: ['white'],
    capFleshColorChange: ['grey', 'black'],
    bruising: ['grey', 'black'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed'],
    stipeSurface: ['smooth'],
    stipeColor: ['white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['grey', 'black'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fruity', 'none'],
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny grzyb jadalny o łagodnym, orzechowym smaku. Jadalny po dowolnej obróbce termicznej.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula'],
    substrates: ['soil', 'moss'],
    habitats: ['bog', 'deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['russula-claroflava-1'],
  description:
    'Pod brzozami w wilgotnych, torfowych miejscach, często w mchu. Kapelusz jaskrawożółty, blaszki i trzon białe; uszkodzone i przekrojone miejsca szarzeją do czarniawych. Smak łagodny.',
};
