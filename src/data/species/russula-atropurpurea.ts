/**
 * @file Rekord gatunku: gołąbek ciemnopurpurowy (Russula atropurpurea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const russulaAtropurpurea: Mushroom = {
  id: mushroomId('russula-atropurpurea'),
  scientificName: 'Russula atropurpurea',
  scientificSynonyms: ['Russula krombholzii', 'Russula undulata'],
  polishName: 'Gołąbek ciemnopurpurowy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnexed', 'free'],
    capColor: ['purple', 'red', 'black'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['smooth', 'striate'],
    capPeelability: ['to_half'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['cream'],
    capFleshColor: ['white', 'purple'],
    capFleshColorChange: ['none'],
    bruising: ['none', 'grey'], 
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'grey', 'pink'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none', 'grey'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fruity', 'none'],
    taste: ['mild', 'acrid'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: false,
      notes: 'Na surowo ostrawy - tylko po ugotowaniu.',
    },
    notes: 'Wymaga pewnego oznaczenia; łatwo pomylić z ostrymi, trującymi gołąbkami.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus', 'fagus', 'pinus'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('russula-sardonia'),
      distinguishingFeatures: ['hymenophoreColor'],
      note: 'Czerwonofioletowy ma cytrynowożółte blaszki, fioletowy trzon i bardzo palący smak; rośnie pod sosnami.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['russula-atropurpurea-1'],
  description:
    'Pod dębami i bukami na kwaśnych glebach. Kapelusz ciemnopurpurowy, w środku prawie czarny, często z żółtawymi plamami; trzon biały, z wiekiem szarzeje. Smak łagodny do lekko ostrego.',
};
