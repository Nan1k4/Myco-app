/**
 * @file Rekord gatunku: mleczaj wełnianka (Lactarius torminosus)..
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactariusTorminosus: Mushroom = {
  id: mushroomId('lactarius-torminosus'),
  scientificName: 'Lactarius torminosus',
  scientificSynonyms: ['Agaricus torminosus', 'Galorrheus torminosus'],
  polishName: 'Mleczaj wełnianka',
  vernacularNames: ['wełnianka'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'decurrent'],
    capColor: ['pink', 'cream'], 
    capShape: ['convex', 'depressed', 'funnel'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['woolly'],
    capMargin: ['inrolled', 'woolly'],
    capPeelability: ['none'],
    hymenophoreColor: ['cream', 'pink'],
    sporePrint: ['cream'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['white'], 
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth'],
    stipeColor: ['pink', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['none', 'fruity'],
    taste: ['acrid'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Ostry sok silnie drażni przewód pokarmowy (nudności, wymioty, biegunka). Bywa mylony z rydzem - ma białe, nie pomarańczowe mleczko.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['betula'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'park'],
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
  imageKeys: ['lactarius-torminosus-1'],
  description:
    'Różowawy kapelusz z ciemniejszymi strefami i bujnym, białym, wełnistym brzegiem; białe, bardzo ostre mleczko. Rośnie pod brzozami. Trujący.',
};
