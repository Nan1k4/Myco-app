/**
 * @file Rekord gatunku: Maślak sitarz (Suillus bovinus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const suillusBovinus: Mushroom = {
  id: mushroomId('suillus-bovinus'),
  scientificName: 'Suillus bovinus',
  scientificSynonyms: ['Boletus bovinus'],
  polishName: 'Maślak sitarz',
  vernacularNames: ['sitarz'],
  features: {
    hymenophore: ['tubes'],
    gillAttachment: ['not_applicable'], 
    capColor: ['brown_light', 'orange', 'rust', 'pink'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['slimy', 'smooth'],
    capMargin: ['smooth'], 
    capPeelability: ['full', 'to_half'],
    hymenophoreColor: ['yellow', 'olive', 'brown_light'], 
    sporePrint: ['olive_brown', 'brown'],
    capFleshColor: ['cream', 'yellow'],
    capFleshColorChange: ['none', 'pink'],
    bruising: ['none', 'brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['yellow', 'orange', 'brown_light'],
    stipeFleshColor: ['yellow', 'pink'],
    stipeFleshColorChange: ['none', 'pink'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['none', 'fruity'],
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Jadalny, niskiej wartości; po ugotowaniu różowofioletowy i gumowaty.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['suillus-bovinus-1'],
  description:
    'Gromadnie w suchych, ubogich borach sosnowych. Pory duże, kanciaste, złożone (sitkowate). Często rośnie razem z klejówką różową. Po ugotowaniu przybiera różowofioletową barwę.',
};
