/**
 * @file Rekord gatunku: gąska niekształtna (Tricholoma portentosum).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const tricholomaPortentosum: Mushroom = {
  id: mushroomId('tricholoma-portentosum'),
  scientificName: 'Tricholoma portentosum',
  scientificSynonyms: ['Agaricus portentosus', 'Gyrophila portentosa'],
  polishName: 'Gąska niekształtna',
  vernacularNames: [],
  features: {
    hymenophore: ['gills'],
    gillAttachment: ['sinuate'],
    capColor: ['grey', 'brown_dark', 'olive'], 
    capShape: ['conical', 'convex', 'umbonate', 'flat'],
    capSize: ['5_to_10'],
    capSurface: ['slimy', 'fibrillose'], 
    capMargin: ['wavy', 'inrolled'],
    capPeelability: ['full'],
    hymenophoreColor: ['white', 'yellow'], 
    sporePrint: ['white'],
    capFleshColor: ['white'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['cylindrical'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth', 'fibrillose'],
    stipeColor: ['white', 'yellow'], 
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['mealy'],
    taste: ['mealy', 'mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Zaleca się ugotować lub usmażyć przed spożyciem. Smaczny jesienny grzyb, owocnikuje późno - nawet do pierwszych przymrozków.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['pinus', 'picea'],
    substrates: ['soil', 'litter'],
    habitats: ['coniferous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [9, 10, 11],
    optimalMeanTempC: { min: 4, max: 14 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: false,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('tricholoma-equestre'),
      distinguishingFeatures: ['hymenophoreColor'],
      note: 'Gąska zielonka (uznawana za trującą - rabdomioliza po zjedzeniu większej ilości) ma blaszki i trzon siarkowożółte, a kapelusz żółty z zielonkawym odcieniem i brązowym środkiem; gąska niekształtna ma blaszki białe, tylko lekko żółtawe, i szary kapelusz.',
    },
    {
      mushroomId: mushroomId('tricholoma-pardinum'),
      distinguishingFeatures: ['capSurface'],
      note: 'Gąska tygrysia (trująca - ostre zatrucie żołądkowo-jelitowe) ma duży, jasnoszary kapelusz pokryty wyraźnymi łuskami; gąska niekształtna jest lepka i promieniście włókienkowata, bez łusek.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['tricholoma-portentosum-1'],
  description:
    'Jesienna gąska o szarobrązowym, lepkim kapeluszu z promienistymi włókienkami (często z żółtawym lub fioletowawym odcieniem), białych blaszkach i białym trzonie. Rośnie w borach sosnowych, często późno, do przymrozków.',
};
