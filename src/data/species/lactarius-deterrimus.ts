/**
 * @file Rekord gatunku: mleczaj świerkowy (Lactarius deterrimus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactariusDeterrimus: Mushroom = {
  id: mushroomId('lactarius-deterrimus'),
  scientificName: 'Lactarius deterrimus',
  scientificSynonyms: [],
  polishName: 'Mleczaj świerkowy',
  vernacularNames: ['rydz świerkowy'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'subdecurrent'],
    capColor: ['orange', 'brown_light', 'green'],
    capShape: ['convex', 'depressed', 'funnel'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['orange'],
    sporePrint: ['cream'],
    capFleshColor: ['cream', 'orange'],
    capFleshColorChange: ['red', 'green'], 
    bruising: ['green'],
    latex: ['orange', 'red'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'pitted'],
    stipeColor: ['orange', 'cream'],
    stipeFleshColor: ['cream', 'orange'],
    stipeFleshColorChange: ['red', 'green'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fruity'],
    taste: ['mild', 'bitter'], 
  },
  edibility: {
    category: 'edible',
    notes: 'Smaczny; nieco bardziej gorzkawy od rydza. Po zjedzeniu mocz może się zabarwić na czerwono - nieszkodliwe.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 6, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('lactarius-torminosus'),
      distinguishingFeatures: ['latex', 'capSurface'],
      note: 'Wełnianka ma białe mleczko i wełnisty, brodaty brzeg; świerkowy ma pomarańczowe mleczko, które po pewnym czasie czerwienieje, i gładki brzeg.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['lactarius-deterrimus-1'],
  description:
    'Pomarańczowy kapelusz, który szybko zielenieje; pomarańczowe mleczko po pewnym czasie czerwienieje. Rośnie pod świerkami. Smaczny grzyb jadalny.',
};
