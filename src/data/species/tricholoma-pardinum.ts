/**
 * @file Rekord gatunku: gąska tygrysia (Tricholoma pardinum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const tricholomaPardinum: Mushroom = {
  id: mushroomId('tricholoma-pardinum'),
  scientificName: 'Tricholoma pardinum',
  scientificSynonyms: ['Tricholoma tigrinum', 'Agaricus pardinus'],
  polishName: 'Gąska tygrysia',
  vernacularNames: ['gąska nakrapiana'],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate'],
    capColor: ['grey', 'brown_light', 'white'],
    capShape: ['hemispherical', 'convex', 'flat', 'umbonate'],
    capSize: ['5_to_10', '10_to_20'],
    capSurface: ['scaly'],
    capMargin: ['inrolled', 'wavy'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream', 'grey'],
    sporePrint: ['white'],
    capFleshColor: ['white', 'grey'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['clavate', 'cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['fibrillose', 'smooth'],
    stipeColor: ['white', 'cream', 'brown_light'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rounded_bulb', 'plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'grouped', 'fairy_ring'],
    smell: ['mealy', 'flour'],
    taste: ['mealy', 'mild'],
  },
  edibility: {
    category: 'poisonous',
    syndromes: ['gastrointestinal'],
    symptomOnsetHours: { min: 0.5, max: 3 },
    notes: 'Silnie trująca - wywołuje gwałtowny zespół żołądkowo-jelitowy z silnymi wymiotami i biegunką mogącymi prowadzić do zapaści.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'abies', 'picea'],
    substrates: ['soil'],
    habitats: ['deciduous_forest', 'mixed_forest', 'coniferous_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 10, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 5, max: 12 },
    frostSensitive: true,
  },
  dangerousLookalikes: [],
  legallyProtected: false,
  imageKeys: ['tricholoma-pardinum-1'],
  description:
    'Masywna gąska o jasnoszarym kapeluszu pokrytym wyraźnymi, dachówkowatymi, ciemnoszarymi łuskami; blaszki wycięte ząbkiem, zapach mączny. Rośnie głównie w górskich lasach na wapieniu.',
};
