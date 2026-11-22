/**
 * @file Mapa cech: wiąże klucz cechy z jej słownikiem ({@link FEATURE_VOCABULARIES}) i z czynnością
 * potrzebną do jej wiarygodnej obserwacji ({@link FEATURE_PROCEDURES}). Wspólny kontrakt dla danych
 * gatunku ({@link SpeciesFeatureProfile}) i obserwacji użytkownika (filtr).
 *
 * „Krytyczność” NIE jest globalną właściwością cechy. Zależy od pary gatunków: dla pieczarki
 * vs muchomora zielonawego rozstrzyga barwa blaszek i pochwa, dla opieńki vs hełmówki – wysyp
 * zarodników. Dlatego cechy rozstrzygające są zapisane w danych ({@link DangerousLookalike}),
 * a tutaj – koszt dowodu i to, czy cecha w ogóle może być dowodem.
 *
 * @module domain/features
 */
import type { NonEmptyArray } from './common';
import type {
  CapMargin,
  CapPeelability,
  CapShape,
  CapSize,
  CapSurface,
  Color,
  ColorReaction,
  GillAttachment,
  GrowthHabit,
  HymenophoreType,
  LatexType,
  ObservationProcedure,
  Presence,
  RingType,
  Smell,
  SporePrintColor,
  StipeBase,
  StipeColor,
  StipeColorReaction,
  StipeInterior,
  StipeShape,
  StipeSurface,
  Taste,
} from './vocabulary';
import {
  CAP_MARGINS,
  CAP_PEELABILITY,
  CAP_SHAPES,
  CAP_SIZES,
  CAP_SURFACES,
  COLOR_REACTIONS,
  COLORS,
  GILL_ATTACHMENTS,
  GROWTH_HABITS,
  HYMENOPHORE_TYPES,
  LATEX_TYPES,
  PRESENCE,
  PROCEDURE_PROFILES,
  RING_TYPES,
  SMELLS,
  SPORE_PRINT_COLORS,
  STIPE_BASES,
  STIPE_COLOR_REACTIONS,
  STIPE_COLORS,
  STIPE_INTERIORS,
  STIPE_SHAPES,
  STIPE_SURFACES,
  TASTES,
} from './vocabulary';

/** Pełna mapa: klucz cechy → typ wartości. */
export interface FeatureValueMap {
  readonly hymenophore: HymenophoreType;
  readonly gillAttachment: GillAttachment;
  readonly capColor: Color;
  readonly capShape: CapShape;
  readonly capSize: CapSize;
  readonly capSurface: CapSurface;
  readonly capMargin: CapMargin;
  readonly capPeelability: CapPeelability;
  readonly hymenophoreColor: Color;
  readonly sporePrint: SporePrintColor;
  readonly capFleshColor: Color;
  readonly capFleshColorChange: ColorReaction;
  readonly bruising: ColorReaction;
  readonly latex: LatexType;
  readonly stipeShape: StipeShape;
  readonly stipeInterior: StipeInterior;
  readonly stipeSurface: StipeSurface;
  readonly stipeColor: StipeColor;
  readonly stipeFleshColor: StipeColor;
  readonly stipeFleshColorChange: StipeColorReaction;
  readonly volva: Presence;
  readonly stipeBase: StipeBase;
  readonly ring: RingType;
  readonly growthHabit: GrowthHabit;
  readonly smell: Smell;
  readonly taste: Taste;
}

export type FeatureKey = keyof FeatureValueMap;

/**
 * Słownik każdej cechy w runtime (opcje w UI, maski filtra). Kilka cech dzieli słownik
 * (barwy, reakcje barwne). Typ mapowany pozwala czytać słownik generycznie (`FEATURE_VOCABULARIES[key]`).
 */
export const FEATURE_VOCABULARIES: { readonly [K in FeatureKey]: readonly FeatureValueMap[K][] } = {
  hymenophore: HYMENOPHORE_TYPES,
  gillAttachment: GILL_ATTACHMENTS,
  capColor: COLORS,
  capShape: CAP_SHAPES,
  capSize: CAP_SIZES,
  capSurface: CAP_SURFACES,
  capMargin: CAP_MARGINS,
  capPeelability: CAP_PEELABILITY,
  hymenophoreColor: COLORS,
  sporePrint: SPORE_PRINT_COLORS,
  capFleshColor: COLORS,
  capFleshColorChange: COLOR_REACTIONS,
  bruising: COLOR_REACTIONS,
  latex: LATEX_TYPES,
  stipeShape: STIPE_SHAPES,
  stipeInterior: STIPE_INTERIORS,
  stipeSurface: STIPE_SURFACES,
  stipeColor: STIPE_COLORS,
  stipeFleshColor: STIPE_COLORS,
  stipeFleshColorChange: STIPE_COLOR_REACTIONS,
  volva: PRESENCE,
  stipeBase: STIPE_BASES,
  ring: RING_TYPES,
  growthHabit: GROWTH_HABITS,
  smell: SMELLS,
  taste: TASTES,
};

/**
 * Czynność, po której obserwacja cechy może być `certain`.
 * `satisfies Record<FeatureKey, …>` wymusza w czasie kompilacji wpis dla KAŻDEJ cechy
 * Wyjątki dla pojedynczych wartości: {@link VALUE_PROCEDURE_OVERRIDES}.
 */
export const FEATURE_PROCEDURES = {
  hymenophore: 'look',
  gillAttachment: 'cut',
  capColor: 'look',
  capShape: 'look',
  capSize: 'look',
  capSurface: 'touch',
  capMargin: 'look',
  capPeelability: 'touch',
  hymenophoreColor: 'look',
  sporePrint: 'spore_print',
  capFleshColor: 'cut',
  capFleshColorChange: 'cut',
  bruising: 'touch',
  latex: 'cut',
  stipeShape: 'look',
  stipeInterior: 'cut',
  stipeSurface: 'look',
  stipeColor: 'look',
  stipeFleshColor: 'cut',
  stipeFleshColorChange: 'cut',
  volva: 'dig_base',
  stipeBase: 'dig_base',
  ring: 'look',
  growthHabit: 'look',
  smell: 'smell',
  taste: 'taste',
} as const satisfies Readonly<Record<FeatureKey, ObservationProcedure>>;

export const FEATURE_KEYS = Object.keys(FEATURE_PROCEDURES) as readonly FeatureKey[];

type ProcedureForbiddenWithDangerous = {
  [P in ObservationProcedure]: (typeof PROCEDURE_PROFILES)[P]['forbiddenWithDangerousCandidate'] extends true
    ? P
    : never;
}[ObservationProcedure];

/**
 * Wartości, których obserwacja `certain` wymaga innych czynności niż domyślna dla cechy
 * Typ wyklucza czynności zakazane przy gatunku niebezpiecznym.
 */
export const VALUE_PROCEDURE_OVERRIDES: {
  readonly [K in FeatureKey]?: Partial<
    Readonly<Record<FeatureValueMap[K], NonEmptyArray<Exclude<ObservationProcedure, ProcedureForbiddenWithDangerous>>>>
  >;
} = {
  hymenophore: { gleba: ['cut'] },
  stipeShape: { absent: ['cut'] },
  stipeSurface: { not_applicable: ['cut'] },
  stipeColor: { not_applicable: ['cut'] },
  stipeBase: { not_applicable: ['cut'] },
  volva: { absent: ['dig_base', 'cut'] },
};

/** Czynności (wszystkie), po których obserwacja `value` cechy `key` może być `certain`. */
export function requiredProcedures<K extends FeatureKey>(
  key: K,
  value: FeatureValueMap[K],
): NonEmptyArray<ObservationProcedure> {
  const overrides: Partial<Readonly<Record<FeatureValueMap[K], NonEmptyArray<ObservationProcedure>>>> | undefined =
    VALUE_PROCEDURE_OVERRIDES[key];
  return overrides?.[value] ?? [FEATURE_PROCEDURES[key]];
}

/**
 * Cechy, których obserwacja nigdy nie wyklucza gatunku niebezpiecznego (dla Bramki zawsze `uncertain`):
 *  - oceniane „na oko i nos” – zależą od światła, wieku owocnika i oceniającego
 *    (młody muchomor zielonawy bywa oliwkowobrązowy i pachnie „po grzybowemu”),
 *  - zależne od tego, co ktoś zauważył wokół (pojedynczy owocnik z rozbitej kępy),
 *  - zależne od wieku owocnika: kształt kapelusza (muchomor jadowity jest najpierw stożkowaty,
 *    potem płaski; garbek łatwo przeoczyć) – dane obejmują cały zakres, a obserwacja jednego owocnika nie,
 *  - barwy oceniane w lesie (biały / kremowy / żółtawy to płynne przejścia): także barwa trzonu
 *    i barwa miąższu – miąższ muchomora zielonawego bywa zielonkawy tuż pod skórką. Zmiana barwy
 *    po przekroju (sinienie, czerwienienie) jest zdarzeniem, nie odcieniem – zostaje cechą Bramki,
 *  - zawodne i obciążone mitem: zdejmowalność skórki zależy od wieku i wilgotności, a „test skórki”
 *    to znany mit grzybiarzy – Bramka nie może go utrwalać jako pierwszego pytania.
 */
export const SUBJECTIVE_FEATURES = [
  'capColor',
  'capShape',
  'capFleshColor',
  'stipeColor',
  'stipeFleshColor',
  'smell',
  'growthHabit',
  'capPeelability',
] as const satisfies readonly FeatureKey[];

const SUBJECTIVE_FEATURE_SET: ReadonlySet<FeatureKey> = new Set(SUBJECTIVE_FEATURES);

/**
 * Cechy, którymi wolno rozstrzygać o gatunku niebezpiecznym: bez czynności zakazanych
 * (próba smaku) i bez {@link SUBJECTIVE_FEATURES}. Użyte w `DangerousLookalike` i `CriticalCheck`,
 * więc dane ani Bramka nie mogą oprzeć wykluczenia trującego gatunku na smaku, barwie kapelusza
 * czy zapachu (błąd kompilacji).
 */
export type GateFeatureKey = Exclude<
  {
    [K in FeatureKey]: (typeof FEATURE_PROCEDURES)[K] extends ProcedureForbiddenWithDangerous ? never : K;
  }[FeatureKey],
  (typeof SUBJECTIVE_FEATURES)[number]
>;

/** Strażnik runtime dla {@link GateFeatureKey}. */
export function isGateFeatureKey(key: FeatureKey): key is GateFeatureKey {
  return (
    !PROCEDURE_PROFILES[FEATURE_PROCEDURES[key]].forbiddenWithDangerousCandidate && !SUBJECTIVE_FEATURE_SET.has(key)
  );
}

/** Cechy Bramki w kolejności {@link FEATURE_KEYS}. */
export const GATE_FEATURE_KEYS: readonly GateFeatureKey[] = FEATURE_KEYS.filter(isGateFeatureKey);

/**
 * Profil gatunku: dla KAŻDEJ cechy niepusty zbiór dopuszczalnych wartości.
 * Klucze wymagane – brak danych nie może cicho znaczyć „pasuje do wszystkiego”.
 */
export type SpeciesFeatureProfile = {
  readonly [K in FeatureKey]: NonEmptyArray<FeatureValueMap[K]>;
};
