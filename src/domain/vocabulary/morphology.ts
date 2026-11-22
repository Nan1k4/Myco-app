/**
 * @file Słowniki ogólnych cech morfologicznych.
 * @module domain/vocabulary/morphology
 */

export const HYMENOPHORE_TYPES = [
  'none',
  'gills', // blaszki
  'tubes', // rurki 
  'pores', // pory bez wyodrębnionej warstwy rurek
  'teeth', // kolce
  'ridges', // listewki 
  'smooth', 
  'gleba', // wnętrze owocnika 
] as const;
/** @see HYMENOPHORE_TYPES */
export type HymenophoreType = (typeof HYMENOPHORE_TYPES)[number];

export const GILL_ATTACHMENTS = [
  'free', // wolne
  'adnexed', // wąsko przyrośnięte
  'adnate', // szeroko przyrośnięte
  'sinuate', // wycięte ząbkiem
  'subdecurrent', // lekko zbiegające
  'decurrent', // zbiegające
  'not_applicable', 
] as const;
/** @see GILL_ATTACHMENTS */
export type GillAttachment = (typeof GILL_ATTACHMENTS)[number];

export const COLORS = [
  'none',
  'white',
  'cream',
  'yellow',
  'ochre', 
  'orange',
  'red',
  'burgundy', 
  'pink',
  'violet', 
  'purple', 
  'blue',
  'rust',
  'brown_light',
  'brown',
  'brown_dark',
  'red_brown',
  'olive',
  'green',
  'grey',
  'black',
] as const;
/** @see COLORS */
export type Color = (typeof COLORS)[number];

/** Barwa wysypu zarodników – jedna z najbardziej niezawodnych cech. */
export const SPORE_PRINT_COLORS = [
  'white',
  'cream',
  'yellow',
  'pink',
  'pink_brown', 
  'rust',
  'brown',
  'purple_brown',
  'violet',
  'grey', 
  'black',
  'olive',
  'olive_brown',
  'brown_dark',
] as const;
/** @see SPORE_PRINT_COLORS */
export type SporePrintColor = (typeof SPORE_PRINT_COLORS)[number];

export const COLOR_REACTIONS = [
  'none',
  'blue',
  'red',
  'pink',
  'orange',
  'yellow',
  'ochre',
  'brown',
  'olive',
  'green',
  'violet', 
  'grey',
  'black',
] as const;
/** @see COLOR_REACTIONS */
export type ColorReaction = (typeof COLOR_REACTIONS)[number];

export const CAP_SURFACES = [
  'smooth',
  'slimy',
  'greasy', // tłusty, „maślany” w dotyku (monetka maślana)
  'velvety',
  'pruinose', // jakby oprószony
  'hairy',
  'woolly', // kutnerowaty (mleczaj wełnianka)
  'fibrillose',
  'scaly',
  'warts',
  'spiny', // kolce purchawek
  'granular',
  'wrinkled', // pomarszczony
  'reticulate', // siateczkowato dołkowany (sromotnik)
  'zonate', // koncentryczne strefy (huby)
  'crust', // twarda skorupa (huby)
  'cracked',
] as const;
/** @see CAP_SURFACES */
export type CapSurface = (typeof CAP_SURFACES)[number];

export const CAP_SHAPES = [
  'hemispherical', // półkulisty
  'convex', // wypukły
  'flat', // płaski
  'depressed', // wklęsły
  'funnel', // lejkowaty
  'umbonate', // z garbkiem
  'conical', // stożkowaty
  'campanulate', // dzwonkowaty
  'ovate', // jajowaty
  'cylindrical', // walcowaty
  'spherical', // kulisty 
  'pear_shaped', // gruszkowaty
  'ear_shaped', // uszkowaty 
  'fan_shaped', // wachlarzowaty, muszlowaty 
  'shelf', // konsolowaty 
  'hoof_shaped', // kopytowaty 
  'cauliflower_shaped', //kalafiorowaty
] as const;
/** @see CAP_SHAPES */
export type CapShape = (typeof CAP_SHAPES)[number];

export const CAP_SIZES = [
  'under_5',
  '5_to_10',
  '10_to_20',
  'over_20',
] as const;
/** @see CAP_SIZES */
export type CapSize = (typeof CAP_SIZES)[number];

export const CAP_MARGINS = [
  'none',
  'smooth',
  'striate', // prążkowany
  'inrolled', // podwinięty
  'appendiculate', // zwisające strzępki osłony
  'woolly', // wełnisty, brodaty
  'overhanging', // skórka wystaje poza brzeg
  'cuticle_short', // skórka nie sięga brzegu
  'wavy',
  'lobed', // klapowany
  'rounded', // zaokrąglony, tępy
  'sharp', // ostry, cienki
  'deliquescent', // rozpływa się w czarną ciecz
] as const;
/** @see CAP_MARGINS */
export type CapMargin = (typeof CAP_MARGINS)[number];

export const CAP_PEELABILITY = [
  'full',
  'to_half',
  'to_third',
  'none',
] as const;
/** @see CAP_PEELABILITY */
export type CapPeelability = (typeof CAP_PEELABILITY)[number];

export const LATEX_TYPES = [
  'none',
  'white',
  'white_to_yellow',
  'orange',
  'red',
  'watery',
] as const;
/** @see LATEX_TYPES */
export type LatexType = (typeof LATEX_TYPES)[number];

export const STIPE_SHAPES = [
  'cylindrical',
  'clavate', // maczugowaty
  'ventricose', // brzuchaty (borowik szatański)
  'tapering_down', // zwężający się ku dołowi
  'tapering_up', // zwężający się ku górze
  'lateral',
  'absent',
] as const;
/** @see STIPE_SHAPES */
export type StipeShape = (typeof STIPE_SHAPES)[number];

export const STIPE_COLORS = [
  ...COLORS,
  'not_applicable',
] as const;
/** @see STIPE_COLORS */
export type StipeColor = (typeof STIPE_COLORS)[number];

export const STIPE_COLOR_REACTIONS = [
  ...COLOR_REACTIONS,
  'not_applicable',
] as const;
/** @see STIPE_COLOR_REACTIONS */
export type StipeColorReaction = (typeof STIPE_COLOR_REACTIONS)[number];

export const STIPE_INTERIORS = [
  'solid',
  'stuffed',
  'hollow',
  'chambered',
  'fibrous',
  'not_applicable',
] as const;
/** @see STIPE_INTERIORS */
export type StipeInterior = (typeof STIPE_INTERIORS)[number];

export const STIPE_SURFACES = [
  'smooth',
  'slimy',
  'velvety', // aksamitny 
  'hairy', // owłosiony 
  'wrinkled', // pomarszczony 
  'reticulate', // siateczka
  'scabrous', // kosmki 
  'fibrillose',
  'scaly',
  'snakeskin',
  'punctate', // kropkowany 
  'glandular_dots', // gruczołki 
  'pitted', // dołeczki 
  'porous', // gąbczasty 
  'spiny', // kolce 
  'not_applicable',
] as const;
/** @see STIPE_SURFACES */
export type StipeSurface = (typeof STIPE_SURFACES)[number];

export const GROWTH_HABITS = [
  'solitary', // pojedynczo
  'scattered', // rozproszone
  'grouped', // w grupach, osobne owocniki blisko siebie
  'clustered', // kępami, ze wspólnej podstawy
  'tiered', // dachówkowato (huby, boczniaki)
  'fairy_ring', // w kręgach
] as const;
/** @see GROWTH_HABITS */
export type GrowthHabit = (typeof GROWTH_HABITS)[number];
