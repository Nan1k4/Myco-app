/**
 * @file Rekord gatunku: pieprznik jadalny (Cantharellus cibarius), kurka.
 */
import { mushroomId, type Mushroom } from '../../domain';

export const cantharellusCibarius: Mushroom = {
  id: mushroomId('cantharellus-cibarius'),
  scientificName: 'Cantharellus cibarius',
  scientificSynonyms: ['Merulius cantharellus'],
  polishName: 'Pieprznik jadalny',
  vernacularNames: ['kurka', 'lisica', 'lisiczka', 'liszka', 'stągiewka', 'kurza noga'],
  features: {
    hymenophore: ['ridges'],
    gillAttachment: ['decurrent'],
    capColor: ['yellow', 'orange'], 
    capShape: ['convex', 'flat', 'depressed', 'funnel'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['smooth'], 
    capMargin: ['wavy', 'inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['yellow'], 
    sporePrint: ['cream'],
    capFleshColor: ['white', 'yellow'], 
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['tapering_down'],
    stipeInterior: ['solid'],
    stipeSurface: ['smooth'],
    stipeColor: ['yellow'],
    stipeFleshColor: ['white'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['scattered', 'clustered'],
    smell: ['fruity'], 
    taste: ['mild', 'peppery'], 
  },
  edibility: {
    category: 'edible',
    notes: 'Jeden z najbardziej cenionych grzybów jadalnych w Polsce.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['picea', 'pinus', 'fagus', 'quercus', 'betula', 'carpinus'],
    substrates: ['soil', 'moss'],
    habitats: ['coniferous_forest', 'mixed_forest', 'deciduous_forest'],
  },
  fruiting: {
    months: [6, 7, 8, 9, 10],
    optimalMeanTempC: { min: 12, max: 20 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [
    {
      mushroomId: mushroomId('omphalotus-olearius'),
      distinguishingFeatures: ['hymenophore'],
      note: 'Głowieniak pomarańczowy (trujący; w Polsce raczej nie występuje) rośnie gęstymi kępami na drewnie, ma prawdziwe, cienkie, niewidlaste blaszki i pomarańczowy miąższ trzonu. Pieprznik ma rozwidlone listewki, biały miąższ i rośnie na ziemi.',
    },
  ],
  legallyProtected: false,
  imageKeys: ['cantharellus-cibarius-1'],
  description:
    'Jajeczno-żółty, lejkowaty owocnik z rozwidlonymi listewkami zbiegającymi na trzon (bez blaszek), morelowy zapach, biały miąższ. W lasach iglastych i liściastych, na ziemi.',
};
