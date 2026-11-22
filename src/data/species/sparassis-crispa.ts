/**
 * @file Rekord gatunku: siedzuń sosnowy (Sparassis crispa).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const sparassisCrispa: Mushroom = {
  id: mushroomId('sparassis-crispa'),
  scientificName: 'Sparassis crispa',
  scientificSynonyms: ['Clavaria crispa', 'Sparassis ramosa'],
  polishName: 'Siedzuń sosnowy',
  vernacularNames: ['szmaciak gałęzisty', 'kozia broda', 'sorokop', 'płaskosz sorokop', 'siedź', 'sieduń', 'strzępiak kędzierzawy'],
  features: {
    hymenophore: ['smooth'], 
    gillAttachment: ['not_applicable'],
    capColor: ['cream', 'yellow', 'brown_light'], 
    capShape: ['spherical', 'cauliflower_shaped'], 
    capSize: ['10_to_20', 'over_20'], 
    capSurface: ['smooth'],
    capMargin: ['wavy'], 
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'cream'],
    sporePrint: ['white', 'cream'],
    capFleshColor: ['white', 'cream'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['white', 'cream', 'yellow'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['rooting'], 
    ring: ['none'],
    growthHabit: ['solitary'],
    smell: ['nutty', 'mushroomy'], 
    taste: ['mild', 'nutty'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Zbierać młode, jędrne, jasne owocniki; starsze brązowieją i twardnieją. Dokładnie oczyścić zagłębienia z piasku i igieł.',
    },
    notes: 'Bardzo ceniony; nadaje się do zup, smażenia i suszenia. Łamliwy - źle znosi transport.',
  },
  ecology: {
    trophicModes: ['parasitic', 'saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['wood_living', 'wood_dead'], 
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10],
    optimalMeanTempC: { min: 8, max: 16 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['sparassis-crispa-1'],
  description:
    'Duży (zwykle 10-40 cm), kremowożółty, kalafiorowaty owocnik z licznych pofałdowanych, spłaszczonych płatów wyrastających z grubej, korzeniastej podstawy. Rośnie u podstawy sosen i innych drzew iglastych.',
};
