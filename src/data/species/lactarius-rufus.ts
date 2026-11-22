/**
 * @file Rekord gatunku: mleczaj rudy (Lactarius rufus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactariusRufus: Mushroom = {
  id: mushroomId('lactarius-rufus'),
  scientificName: 'Lactarius rufus',
  scientificSynonyms: ['Agaricus rufus', 'Galorrheus rufus'],
  polishName: 'Mleczaj rudy',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'subdecurrent'],
    capColor: ['brown', 'brown_dark'], 
    capShape: ['convex', 'depressed', 'umbonate'], 
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'velvety'],
    capMargin: ['inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['cream', 'brown_light'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['white'], 
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid', 'hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['brown', 'brown_light'],
    stipeFleshColor: ['cream', 'white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Piekący sok drażni przewód pokarmowy. W Skandynawii jedzony po wielokrotnym obgotowaniu, ale w Polsce nie jest zalecany.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'betula'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest', 'bog'],
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['lactarius-rufus-1'],
  description:
    'Rudobrązowy, suchy kapelusz z małym garbkiem; białe, bardzo piekące mleczko, które nie zmienia barwy. Pospolity w kwaśnych borach i na obrzeżach torfowisk.',
};
