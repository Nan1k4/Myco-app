/**
 * @file Rekord gatunku: mleczaj rydz (Lactarius deliciosus).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lactariusDeliciosus: Mushroom = {
  id: mushroomId('lactarius-deliciosus'),
  scientificName: 'Lactarius deliciosus',
  scientificSynonyms: ['Agaricus deliciosus'],
  polishName: 'Mleczaj rydz',
  vernacularNames: ['rydz'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['adnate', 'subdecurrent'],
    capColor: ['orange', 'brown_light', 'green'], 
    capShape: ['convex', 'depressed', 'funnel'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['smooth', 'slimy'],
    capMargin: ['inrolled', 'smooth'],
    capPeelability: ['none'],
    hymenophoreColor: ['orange'],
    sporePrint: ['cream'],
    capFleshColor: ['cream', 'orange'],
    capFleshColorChange: ['orange', 'green'], 
    bruising: ['green'],
    latex: ['orange'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['stuffed', 'hollow'],
    stipeSurface: ['smooth', 'pitted'],
    stipeColor: ['orange', 'cream'],
    stipeFleshColor: ['cream', 'orange'],
    stipeFleshColorChange: ['green'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['fruity'],
    taste: ['mild', 'bitter'], 
  },
  edibility: {
    category: 'edible',
    notes: 'Ceniony grzyb jadalny. Po zjedzeniu mocz może przybrać czerwonawy kolor - jest to nieszkodliwe.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus'],
    substrates: ['soil'],
    habitats: ['coniferous_forest', 'mixed_forest'], 
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('lactarius-torminosus'),
      distinguishingFeatures: ['latex', 'capSurface'],
      note: 'Wełnianka ma białe, niezmienne mleczko, wełnisty brzeg i bladoróżowy kapelusz; rydz ma marchewkowe mleczko, gładki brzeg i pomarańczowe barwy. Piekący smak wełnianki odróżnia ją od łagodnego rydza.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['lactarius-deliciosus-1'],
  description:
    'Pomarańczowy, strefowany kapelusz z lejkiem pośrodku; pomarańczowe mleczko i blaszki, które po uszkodzeniu zielenieją. Pod sosnami. Smaczny grzyb jadalny.',
};
