/**
 * @file Rekord gatunku: purchawica olbrzymia (Calvatia gigantea).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const calvatiaGigantea: Mushroom = {
  id: mushroomId('calvatia-gigantea'),
  scientificName: 'Calvatia gigantea',
  scientificSynonyms: ['Langermannia gigantea', 'Lycoperdon giganteum', 'Lasiosphaera gigantea', 'Bovista gigantea'],
  polishName: 'Purchawica olbrzymia',
  vernacularNames: ['czasznica olbrzymia'],
  features: {
    hymenophore: ['none'], 
    gillAttachment: ['not_applicable'],
    capColor: ['white', 'cream', 'olive'], 
    capShape: ['spherical'],
    capSize: ['over_20'], 
    capSurface: ['velvety', 'cracked'], 
    capMargin: ['none'],
    capPeelability: ['none'],
    hymenophoreColor: ['white', 'yellow', 'olive'], 
    sporePrint: ['olive', 'brown'],
    capFleshColor: ['white'], 
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['absent'],
    stipeInterior: ['not_applicable'],
    stipeSurface: ['not_applicable'],
    stipeColor: ['not_applicable'],
    stipeFleshColor: ['not_applicable'],
    stipeFleshColorChange: ['not_applicable'],
    volva: ['absent'],
    stipeBase: ['not_applicable'],
    ring: ['none'],
    growthHabit: ['solitary', 'scattered'],
    smell: ['mushroomy', 'unpleasant'],
    taste: ['mild'],
  },
  edibility: {
    category: 'conditionally_edible',
    conditions: {
      requiresCooking: true,
      alcoholInteraction: false,
      youngSpecimensOnly: true,
      notes: 'Tylko owocniki jędrne i jednolicie śnieżnobiałe w środku (przekroić!). Żółte lub oliwkowe wnętrze = niejadalna.',
    },
    notes: 'Dobry grzyb po usmażeniu w plastrach; starsze okazy mogą wywołać dolegliwości żołądkowe. Młode, białe jaja innych grzybów (np. muchomorów) wymagają przekrojenia: purchawica jest jednolita, bez zarysu trzonu i blaszek.',
  },
  ecology: {
    trophicModes: ['saprotrophic'],
    mycorrhizalPartners: [],
    substrates: ['soil'], 
    habitats: ['meadow', 'park', 'forest_edge'], 
  },
  fruiting: {
    months: [7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 25,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('amanita-virosa'),
      distinguishingFeatures: ['volva', 'hymenophore'],
      note: 'Młode „jaja” muchomorów (np. jadowitego, śmiertelnie trującego) są dużo mniejsze, ale po przekrojeniu widać zarys kapelusza, blaszek i trzonu; purchawica jest w środku jednolicie biała.',
    },
    {
      mushroomId: mushroomId('scleroderma-citrinum'),
      distinguishingFeatures: ['hymenophoreColor', 'capSize'],
      note: 'Tęgoskór cytrynowy (trujący) jest znacznie mniejszy, ma twardą, żółtobrązową, łuskowatą skórkę, a wnętrze szybko ciemnieje do fioletowoczarnego.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['calvatia-gigantea-1'],
  description:
    'Ogromny (zwykle 20-50 cm), kulisty, biały owocnik bez kapelusza i trzonu; młody jest w środku jednolicie biały i jędrny, potem żółknie i brązowieje. Rośnie na łąkach, w parkach, ogrodach i na skrajach lasów.',
};
