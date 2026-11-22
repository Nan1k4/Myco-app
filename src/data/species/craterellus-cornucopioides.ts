/**
 * @file Rekord gatunku: lejkowiec dęty (Craterellus cornucopioides).
 */
import { mushroomId, type Mushroom } from '../../domain';

export const craterellusCornucopioides: Mushroom = {
  id: mushroomId('craterellus-cornucopioides'),
  scientificName: 'Craterellus cornucopioides',
  scientificSynonyms: ['Cantharellus cornucopioides', 'Peziza cornucopioides'],
  polishName: 'Lejkowiec dęty',
  vernacularNames: ['trąbka śmierci', 'róg obfitości'],
  features: {
    hymenophore: ['smooth'],
    gillAttachment: ['not_applicable'],
    capColor: ['black', 'grey', 'brown_dark'], 
    capShape: ['funnel'],
    capSize: ['under_5', '5_to_10'],
    capSurface: ['scaly'],
    capMargin: ['wavy', 'inrolled'],
    capPeelability: ['none'],
    hymenophoreColor: ['grey'], 
    sporePrint: ['white', 'cream'],
    capFleshColor: ['grey'],
    capFleshColorChange: ['none'],
    bruising: ['none'],
    latex: ['none'],
    stipeShape: ['tapering_down'],
    stipeInterior: ['hollow'], 
    stipeSurface: ['smooth'],
    stipeColor: ['grey', 'black'],
    stipeFleshColor: ['grey'],
    stipeFleshColorChange: ['none'],
    volva: ['absent'],
    stipeBase: ['plain'],
    ring: ['none'],
    growthHabit: ['clustered', 'scattered'], 
    smell: ['fruity', 'mushroomy'], 
    taste: ['mild'],
  },
  edibility: {
    category: 'edible',
    notes: 'Bardzo aromatyczny; świetny po wysuszeniu (przyprawa do sosów i zup). Nazwa potoczna „trąbka śmierci” nie oznacza trujących właściwości.',
  },
  ecology: {
    trophicModes: ['mycorrhizal'],
    mycorrhizalPartners: ['fagus', 'quercus', 'carpinus'],
    substrates: ['soil', 'litter'],
    habitats: ['deciduous_forest', 'mixed_forest'],
  },
  fruiting: {
    months: [8, 9, 10, 11],
    optimalMeanTempC: { min: 8, max: 18 },
    minPrecipitationMm: 20,
    lagDays: { min: 7, max: 14 },
    frostSensitive: true,
  },
  dangerousLookalikes: [], 
  legallyProtected: false,
  imageKeys: ['craterellus-cornucopioides-1'],
  description:
    'Czarnobrązowy do szarego, cienki, lejkowaty, pusty w środku owocnik bez blaszek; wewnętrzna powierzchnia drobno łuseczkowata, zewnętrzna popielatoszara, gładka. Pachnie owocowo. Rośnie w grupach w lasach liściastych.',
};
