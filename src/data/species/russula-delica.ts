/**
 * @file Rekord gatunku: gołąbek smaczny (Russula delica).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaDelica: Mushroom = {
  id: mushroomId('russula-delica'),
  scientificName: 'Russula delica',
  scientificSynonyms: [],
  polishName: 'Gołąbek smaczny',
  vernacularNames: ['gołąbek białawy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['white', 'cream', 'brown_light'], 
    capShape: ['convex', 'depressed', 'funnel'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'fibrillose', 'cracked'], 
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'], 
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none', 'brown'],
    bruising: ['brown'],
    latex: ['none'],
    stipeShape: ['cylindrical', 'tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'brown'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fruity', 'fishy'],
    taste: ['mild', 'acrid'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko młode owocniki, po obróbce termicznej.',
    },
    notes: 'Mało smaczny, wbrew nazwie. blaszki bywają ostre.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'betula', 'pinus', 'picea'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-virosa'),
      distinguishingFeatures: ['volva', 'gillAttachment'],
      note: 'Muchomor jadowity ma pierścień, workowatą pochwę u bulwiastej podstawy i wolne blaszki; gołąbek smaczny - lejkowaty, krępy, bez pierścienia i pochwy, blaszki przyrośnięte do zbiegających.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-delica-1'],
  description:
    'Biały, krępy, lejkowaty, często do połowy schowany w ściółce, z ziemią na kapeluszu. Nie wydziela mleczka (to odróżnia go od białych mleczajów). Ostrza blaszek bywają niebieskawozielone.',
};
