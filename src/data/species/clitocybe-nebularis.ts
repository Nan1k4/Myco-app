/**
 * @file Rekord gatunku: lejkówka szarawa (Clitocybe nebularis).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const clitocybeNebularis: Mushroom = {
  id: mushroomId('clitocybe-nebularis'),
  scientificName: 'Clitocybe nebularis',
  scientificSynonyms: ['Lepista nebularis', 'Agaricus nebularis'],
  polishName: 'Lejkówka szarawa',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['decurrent', 'adnate'], 
    capColor: ['grey', 'brown_light', 'cream'], 
    capShape: ['convex', 'flat', 'depressed'],
    capSize: ['5_to_10', '10_to_20', 'over_20'],
    capSurface: ['smooth'], 
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['cream', 'white'],
    sporePrint: ['cream'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid', 'stuffed'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['grey', 'cream', 'white'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain', 'rounded_bulb'],
    ring: ['none'],
    growthHabit: ['grouped', 'fairy_ring', 'scattered'], 
    smell: ['sweet', 'unpleasant'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: true,
      youngSpecimensOnly: true,
      notes: 'Obgotować (wywar odlać) lub dokładnie usmażyć; młode kapelusze. Na surowo i niedogotowany powoduje dolegliwości.',
    },
    notes: 'U części osób wywołuje zaburzenia żołądkowo-jelitowe nawet po obróbce. Jeść ostrożnie, pierwszy raz małą porcję. Starsze okazy mają ciężki zapach i bywają porażone przez pleśniaki.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['litter', 'soil'],
    habitats: ['deciduous_forest', 'coniferous_forest', 'mixed_forest', 'park'],
  },
  fruiting: {
    months: [9, 10, 11],
    optimalMeanTempC: { min: 4, max: 14 },
    minPrecipitationMm: 15,
    lagDays: { min: 5, max: 12 },
    frostSensitive: false,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('entoloma-sinuatum'),
      distinguishingFeatures: ['sporePrint', 'hymenophoreColor'],
      note: 'Entoloma sinuatum (silnie trujący): wysyp różowy, blaszki żółtawe → różowe, nie zbiegają, zapach mączno-ogórkowy; lejkówka ma wysyp kremowy i blaszki zbiegające.',
    },
    {
      mushroomId: mushroomId('tricholoma-pardinum'),
      distinguishingFeatures: ['capSurface', 'gillAttachment'],
      note: 'Tricholoma pardinum (trujący): kapelusz z wyraźnymi, ciemnoszarymi łuskami, blaszki nie zbiegają, zapach mączny.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['clitocybe-nebularis-1'],
  description:
    'Duży, szary kapelusz z szronowatym nalotem i podwiniętym brzegiem, gęste kremowe zbiegające blaszki, maczugowaty trzon o ciężkim, słodkawym zapachu. Późną jesienią tworzy kręgi. Warunkowo jadalna - tylko po obróbce cieplnej.',
};
