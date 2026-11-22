/**
 * @file Rekord gatunku: purchawka chropowata (Lycoperdon perlatum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const lycoperdonPerlatum: Mushroom = {
  id: mushroomId('lycoperdon-perlatum'),
  scientificName: 'Lycoperdon perlatum',
  scientificSynonyms: ['Lycoperdon gemmatum'],
  polishName: 'Purchawka chropowata',
  vernacularNames: [],
  features: {
    hymenophore: ['none'],
    gillAttachment: ['not_applicable'],
    capColor: ['white', 'cream', 'brown_light'], 
    capShape: ['pear_shaped'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['spiny'], 
    capMargin: ['none'],
    capPeelability: ['none'],
    hymenophoreColor: ['none'],
    sporePrint: ['olive', 'brown'],
    capFleshColor: ['white', 'olive'], 
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate'],
    stipeInterior: ['chambered'],
    stipeSurface: ['spiny'],
    stipeColor: ['white', 'cream'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['none', 'mushroomy'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko owocniki o jednolicie białym, jędrnym miąższu. Każdy przekroić wzdłuż, by wykluczyć młode muchomory i tęgoskóry.',
    },
    notes: 'Po zżółknięciu lub zbrunatnieniu miąższu (dojrzewanie zarodników) niejadalny.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil', 'litter', 'wood_dead'],
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'meadow', 'park'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10, 11],
    optimalMeanTempC: { min: 10, max: 20 },
    minPrecipitationMm: 15,
    lagDays: { min: 4, max: 10 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('scleroderma-citrinum'),
      distinguishingFeatures: ['capSurface'],
      note: 'Tęgoskór (trujący) ma grubą, łuskowatą skórkę i miąższ szybko ciemniejący do fioletowoczarnego, bez bezpłodnej podstawy. Purchawka ma cienką, kolczastą skórkę i jednolicie biały miąższ.',
    },
    {
      mushroomId: mushroomId('amanita-phalloides'),
      distinguishingFeatures: ['hymenophore'],
      note: 'Młode „jajo” muchomora (śmiertelnie trujące) po przekrojeniu pokazuje zarys kapelusza, blaszek i trzonu. U purchawki wnętrze jest jednolicie białe, bez żadnych struktur.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['lycoperdon-perlatum-1'],
  description:
    'Gruszkowaty biały owocnik pokryty stożkowatymi kolcami, które odpadają i zostawiają siateczkę. Miąższ młodych jest biały i jędrny, starszych oliwkowobrązowy, pylący. Młody jadalny.',
};
