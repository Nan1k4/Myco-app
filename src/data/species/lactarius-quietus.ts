/**
 * @file Rekord gatunku: mleczaj dębowy (Lactarius quietus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactariusQuietus: Mushroom = {
  id: mushroomId('lactarius-quietus'),
  scientificName: 'Lactarius quietus',
  scientificSynonyms: ['Agaricus quietus', 'Galorrheus quietus', 'Lactifluus quietus'],
  polishName: 'Mleczaj dębowy',
  vernacularNames: ['mleczaj miły'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'subdecurrent'],
    capColor: ['brown_light', 'brown'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth'], 
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['cream', 'ochre'],
    sporePrint: ['cream'],
    capFleshColor: ['cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['white'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['brown_light', 'brown'], 
    stipeFleshColor: ['cream'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['oily'],
    taste: ['mild', 'bitter'], 
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Wymaga obgotowania z odlaniem wody dla usunięcia goryczy i ostrości; najlepiej po zamarynowaniu lub ukiszeniu, wyłącznie młode owocniki.',
    },
    notes: 'Mało wartościowy; w części atlasów uznawany za niejadalny z powodu zapachu i gorzkawego posmaku.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['quercus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['lactarius-quietus-1'],
  description:
    'Suchy, matowy kapelusz z koncentrycznymi, ciemniejszymi strefami; oleisty zapach, białe mleczko. Rośnie wyłącznie pod dębami.',
};
