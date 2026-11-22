/**
 * @file Polskie etykiety WARTOŚCI cech (dotąd UI pokazywał surowe `brown_light`, `adnexed`).
 * Typ mapowany wymusza etykietę dla każdej wartości każdego słownika - nowa wartość bez
 * etykiety to błąd kompilacji.
 */
import type {
  CapMargin,
  CapPeelability,
  CapShape,
  CapSize,
  CapSurface,
  Color,
  ColorReaction,
  FeatureKey,
  FeatureValueMap,
  GillAttachment,
  GrowthHabit,
  HymenophoreType,
  LatexType,
  Presence,
  RingType,
  Smell,
  SporePrintColor,
  StipeBase,
  StipeInterior,
  StipeColor,
  StipeColorReaction,
  StipeShape,
  StipeSurface,
  Taste,
} from '../domain';

const HYMENOPHORE: Record<HymenophoreType, string> = {
  none: 'Brak - spód gładki jak skórka',
  gills: 'Blaszki',
  tubes: 'Rurki (gąbka)',
  pores: 'Pory w twardym miąższu (huba)',
  teeth: 'Kolce',
  ridges: 'Listewki - grube, rozwidlone fałdy',
  smooth: 'Gładki lub lekko pomarszczony',
  gleba: 'Wnętrze jednolite jak u purchawki',
};

const GILL_ATTACHMENT: Record<GillAttachment, string> = {
  free: 'Wolne - nie dochodzą do trzonu',
  adnexed: 'Wąsko przyrośnięte',
  adnate: 'Szeroko przyrośnięte',
  sinuate: 'Wycięte ząbkiem przy trzonie',
  subdecurrent: 'Lekko zbiegające',
  decurrent: 'Zbiegające na trzon',
  not_applicable: 'Brak blaszek',
};

const COLOR: Record<Color, string> = {
  none: 'Brak barwy',
  white: 'Biały',
  cream: 'Kremowy',
  yellow: 'Żółty',
  ochre: 'Ochrowy, żółtobrązowy',
  orange: 'Pomarańczowy',
  red: 'Czerwony',
  burgundy: 'Bordowy, winnoczerwony',
  pink: 'Różowy',
  violet: 'Fioletowy, liliowy',
  purple: 'Purpurowy',
  blue: 'Niebieski',
  rust: 'Rdzawy',
  brown_light: 'Jasnobrązowy',
  brown: 'Brązowy',
  brown_dark: 'Ciemnobrązowy',
  red_brown: 'Czerwonobrązowy',
  olive: 'Oliwkowy',
  green: 'Zielony',
  grey: 'Szary',
  black: 'Czarny',
};

const SPORE_PRINT: Record<SporePrintColor, string> = {
  white: 'Biały',
  cream: 'Kremowy',
  yellow: 'Żółty',
  pink: 'Różowy',
  pink_brown: 'Różowobrązowy',
  rust: 'Rdzawy',
  brown: 'Brązowy',
  purple_brown: 'Purpurowobrązowy',
  violet: 'Fioletowoczarny',
  grey: 'Szaroliliowy',
  black: 'Czarny',
  olive: 'Oliwkowy',
  olive_brown: 'Oliwkowobrązowy',
  brown_dark: 'Ciemnobrązowy',
};

const COLOR_REACTION: Record<ColorReaction, string> = {
  none: 'Bez zmian',
  blue: 'Sinieje',
  red: 'Czerwienieje',
  pink: 'Różowieje',
  orange: 'Pomarańczowieje',
  yellow: 'Żółknie',
  ochre: 'Ochrowieje',
  brown: 'Brązowieje',
  olive: 'Oliwkowieje',
  green: 'Zielenieje',
  violet: 'Fioletowieje',
  grey: 'Szarzeje',
  black: 'Czernieje',
};

/** `not_applicable` w barwie trzonu = „brak trzonu” - w quizie to odpowiedź ukrywająca pytania o trzon. */
const STIPE_COLOR: Record<StipeColor, string> = { ...COLOR, not_applicable: 'Brak trzonu' };
const STIPE_COLOR_REACTION: Record<StipeColorReaction, string> = { ...COLOR_REACTION, not_applicable: 'Brak trzonu' };

const CAP_SURFACE: Record<CapSurface, string> = {
  smooth: 'Gładka',
  slimy: 'Śliska, lepka',
  greasy: 'Tłusta, „maślana” w dotyku',
  velvety: 'Zamszowa',
  pruinose: 'Jakby oprószona',
  hairy: 'Owłosiona',
  woolly: 'Wełnista, kutnerowata',
  fibrillose: 'Włóknista',
  scaly: 'Łuskowata',
  warts: 'Z łatkami lub brodawkami',
  spiny: 'Z kolcami (purchawki)',
  granular: 'Ziarnista',
  wrinkled: 'Pomarszczona',
  reticulate: 'Siateczkowato dołkowana',
  zonate: 'Ze strefami (koncentryczne pasy)',
  crust: 'Twarda skorupa',
  cracked: 'Spękana',
};

/** Kształt zmienia się z wiekiem - etykiety opisują to, co widać teraz, nie „typowy” kształt gatunku. */
const CAP_SHAPE: Record<CapShape, string> = {
  hemispherical: 'Półkulisty',
  convex: 'Wypukły',
  flat: 'Płaski',
  depressed: 'Wklęsły',
  funnel: 'Lejkowaty',
  umbonate: 'Z garbkiem',
  conical: 'Stożkowaty',
  campanulate: 'Dzwonkowaty',
  ovate: 'Jajowaty',
  cylindrical: 'Walcowaty',
  spherical: 'Kulisty',
  pear_shaped: 'Gruszkowaty',
  ear_shaped: 'Uszkowaty',
  fan_shaped: 'Wachlarzowaty, muszlowaty',
  shelf: 'Konsolowaty (huba)',
  hoof_shaped: 'Kopytowaty (huba)',
  cauliflower_shaped: 'Kalafiorowaty'
};

const CAP_SIZE: Record<CapSize, string> = {
  under_5: 'Poniżej 5 cm',
  '5_to_10': '5-10 cm',
  '10_to_20': '10-20 cm',
  over_20: 'Powyżej 20 cm',
};

const CAP_MARGIN: Record<CapMargin, string> = {
  none: 'Brak wyraźnego brzegu',
  smooth: 'Gładki',
  striate: 'Prążkowany',
  inrolled: 'Podwinięty',
  appendiculate: 'Z resztkami osłony',
  woolly: 'Wełnisty, brodaty',
  overhanging: 'Skórka wystaje poza brzeg',
  cuticle_short: 'Skórka nie sięga brzegu',
  wavy: 'Falisty',
  lobed: 'Klapowany',
  rounded: 'Zaokrąglony, tępy',
  sharp: 'Ostry, cienki',
  deliquescent: 'Rozpływa się w czarną ciecz',
};

const CAP_PEELABILITY: Record<CapPeelability, string> = {
  full: 'Schodzi w całości',
  to_half: 'Schodzi do połowy',
  to_third: 'Schodzi do 1/3',
  none: 'Nie schodzi',
};

const LATEX: Record<LatexType, string> = {
  none: 'Brak',
  white: 'Białe',
  white_to_yellow: 'Białe, potem żółknie',
  orange: 'Pomarańczowe',
  red: 'Czerwone',
  watery: 'Wodniste',
};

const STIPE_SHAPE: Record<StipeShape, string> = {
  cylindrical: 'Walcowaty',
  clavate: 'Maczugowaty - grubszy u dołu',
  ventricose: 'Brzuchaty - najgrubszy w środku',
  tapering_down: 'Zwężony ku dołowi',
  tapering_up: 'Zwężony ku górze',
  lateral: 'Boczny lub mimośrodowy',
  absent: 'Brak trzonu',
};

const STIPE_INTERIOR: Record<StipeInterior, string> = {
  solid: 'Pełny',
  stuffed: 'Watowaty - miękki rdzeń',
  hollow: 'Pusty',
  chambered: 'Komorowy',
  fibrous: 'Włóknisty',
  not_applicable: 'Brak trzonu',
};

const STIPE_SURFACE: Record<StipeSurface, string> = {
  smooth: 'Gładka',
  slimy: 'Śliska, lepka',
  velvety: 'Aksamitna',
  hairy: 'Owłosiona',
  wrinkled: 'Pomarszczona',
  reticulate: 'Siateczka',
  scabrous: 'Ciemne kosmki',
  fibrillose: 'Włóknista',
  scaly: 'Łuskowata',
  snakeskin: 'Wężowy, zygzakowaty wzór',
  punctate: 'Kropkowana',
  glandular_dots: 'Gruczołki (drobne ciemne kropki)',
  pitted: 'Dołeczki',
  porous: 'Gąbczasta',
  spiny: 'Z kolcami',
  not_applicable: 'Brak trzonu',
};

const GROWTH_HABIT: Record<GrowthHabit, string> = {
  solitary: 'Pojedynczo',
  scattered: 'W rozproszeniu',
  grouped: 'Grupą - osobne owocniki blisko siebie',
  clustered: 'Kępą ze wspólnej podstawy',
  tiered: 'Dachówkowato, jeden nad drugim',
  fairy_ring: 'W kręgu',
};

const PRESENCE: Record<Presence, string> = {
  present: 'Jest',
  absent: 'Brak',
};

const RING: Record<RingType, string> = {
  none: 'Brak',
  membranous_skirt: 'Błoniasty, zwisający',
  membranous_striate: 'Błoniasty, prążkowany od góry',
  membranous_thin: 'Błoniasty, cienki, nietrwały',
  movable: 'Ruchomy - przesuwa się po trzonie',
  cortina: 'Pajęczynowata zasnówka',
  fibrous: 'Włóknisty',
  fibrous_zone: 'Włóknista strefa',
};

const STIPE_BASE: Record<StipeBase, string> = {
  plain: 'Bez zgrubienia',
  rounded_bulb: 'Okrągła bulwa',
  marginate_bulb: 'Bulwa z wyraźnym obrzeżeniem',
  rooting: 'Korzeniasta',
  tapering: 'Zwężona, zaostrzona',
  not_applicable: 'Brak trzonu',
};

const SMELL: Record<Smell, string> = {
  none: 'Brak lub słaby',
  mushroomy: 'Grzybowy',
  anise: 'Anyżowy',
  aromatic: 'Aromatyczny, przyprawowy',
  bitter_almond: 'Gorzkich migdałów',
  carrion: 'Padliny',
  earthy: 'Ziemisty',
  fruity: 'Owocowy - morela',
  fishy: 'Rybi',
  floral: 'Kwiatowy',
  flour: 'Mączny - świeża mąka',
  mealy: 'Mączysty, ogórkowy',
  garlic: 'Czosnkowy',
  gas: 'Gazu świetlnego',
  iodine: 'Jodyny',
  musty: 'Stęchły',
  nutty: 'Orzechowy',
  oily: 'Oleisty',
  phenol: 'Karbolowy - atrament, szpital',
  radish: 'Rzodkiewkowy',
  raw_potato: 'Surowego ziemniaka',
  sweet: 'Słodkawy',
  sour: 'Kwaśny',
  soapy: 'Mydlany',
  unpleasant: 'Nieprzyjemny',
};

const TASTE: Record<Taste, string> = {
  mild: 'Łagodny',
  bitter: 'Gorzki',
  acrid: 'Ostry, piekący',
  astringent: 'Cierpki',
  flour: 'Mączny',
  mealy: 'Mączysty',
  nutty: 'Orzechowy',
  peppery: 'Pieprzny',
  radish: 'Rzodkiewkowy',
  sour: 'Kwaśny',
  sweet: 'Słodkawy',
  soapy: 'Mydlany',
  unpleasant: 'Nieprzyjemny',
};

export const FEATURE_VALUE_LABELS_PL: { readonly [K in FeatureKey]: Readonly<Record<FeatureValueMap[K], string>> } = {
  hymenophore: HYMENOPHORE,
  gillAttachment: GILL_ATTACHMENT,
  capColor: COLOR,
  capShape: CAP_SHAPE,
  capSize: CAP_SIZE,
  capSurface: CAP_SURFACE,
  capMargin: CAP_MARGIN,
  capPeelability: CAP_PEELABILITY,
  hymenophoreColor: COLOR,
  sporePrint: SPORE_PRINT,
  capFleshColor: COLOR,
  capFleshColorChange: COLOR_REACTION,
  bruising: COLOR_REACTION,
  latex: LATEX,
  stipeColor: STIPE_COLOR,
  stipeShape: STIPE_SHAPE,
  stipeFleshColor: STIPE_COLOR,
  stipeFleshColorChange: STIPE_COLOR_REACTION,
  stipeInterior: STIPE_INTERIOR,
  stipeSurface: STIPE_SURFACE,
  volva: PRESENCE,
  stipeBase: STIPE_BASE,
  ring: RING,
  growthHabit: GROWTH_HABIT,
  smell: SMELL,
  taste: TASTE,
};

/** Etykieta wartości z zachowaniem powiązania klucz → typ wartości (bez rzutowań). */
export function featureValueLabel<K extends FeatureKey>(key: K, value: FeatureValueMap[K]): string {
  const labels: Readonly<Record<FeatureValueMap[K], string>> = FEATURE_VALUE_LABELS_PL[key];
  return labels[value];
}
