/**
 * @file Rekord gatunku: mleczaj zielonawy (Lactarius blennius).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactariusBlennius: Mushroom = {
  id: mushroomId('lactarius-blennius'),
  scientificName: 'Lactarius blennius',
  scientificSynonyms: ['Agaricus blennius', 'Galorrheus blennius'],
  polishName: 'Mleczaj zielonawy',
  vernacularNames: ['mleczaj śluzowaty'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'subdecurrent'],
    capColor: ['olive', 'green', 'grey'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10'],
    capSurface: ['slimy'], 
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['to_third'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['grey'],
    latex: ['white'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid', 'hollow'],
    stipeSurface: ['smooth', 'slimy'],
    stipeColor: ['cream', 'grey'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'inedible',
    reasons: ['acrid'],
    notes: 'Bardzo ostry smak; surowy lub niedogotowany może wywołać dolegliwości żołądkowe.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest'], 
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['lactarius-blennius-1'],
  description:
    'Szarozielonkawy, śluzowaty kapelusz z ciemniejszymi plamami, białe, ostre mleczko. Rośnie głównie w buczynach.',
};
