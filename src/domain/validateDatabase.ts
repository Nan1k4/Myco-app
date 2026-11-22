/**
 * @file Walidator niezmienników bazy wiedzy, których nie wyrazi system typów: zależności między
 * polami rekordu i między rekordami. Poprawność wartości ze słowników sprawdza kompilator.
 * Narzędzie testowe: uruchamiany przez `src/data/__tests__/database.test.ts`. Celowo poza barrelem
 * `domain/index.ts`, żeby nie trafiał do paczki aplikacji (dane są statyczne, sprawdza je CI).
 * @module domain/validateDatabase
 */
import type { NumericRange } from './common';
import { FEATURE_KEYS } from './features';
import type { Mushroom, MushroomDatabase, MushroomId } from './mushroom';
import { isDangerousCategory } from './vocabulary';

/** Naruszona reguła (stabilny kod - testy i raport odwołują się do niego, nie do treści komunikatu). */
export type DatabaseRule =
  | 'duplicate_id'
  | 'id_mismatch'
  | 'duplicate_value'
  | 'invalid_number'
  | 'mycorrhizal_partners'
  | 'ring_without_none'
  | 'warts_without_smooth'
  | 'gill_attachment'
  | 'stipe_not_applicable'
  | 'lookalike_on_dangerous'
  | 'lookalike_unknown'
  | 'lookalike_not_dangerous'
  | 'lookalike_duplicate'
  | 'lookalike_feature_indistinct';

export interface DatabaseIssue {
  readonly mushroomId: MushroomId;
  readonly rule: DatabaseRule;
  readonly detail: string;
}

type Report = (rule: DatabaseRule, detail: string) => void;

/** Sprawdza całą bazę. Pusta tablica = baza spójna. */
export function validateDatabase(db: MushroomDatabase): readonly DatabaseIssue[] {
  const issues: DatabaseIssue[] = [];
  const byId = new Map<MushroomId, Mushroom>();

  for (const species of db.species) {
    const report: Report = (rule, detail) => issues.push({ mushroomId: species.id, rule, detail });
    if (byId.has(species.id)) report('duplicate_id', 'identyfikator występuje więcej niż raz');
    byId.set(species.id, species);
  }

  for (const species of db.species) {
    const report: Report = (rule, detail) => issues.push({ mushroomId: species.id, rule, detail });
    checkIdentity(species, report);
    checkDuplicates(species, report);
    checkNumbers(species, report);
    checkMorphology(species, report);
    checkEcology(species, report);
    checkLookalikes(species, byId, report);
  }

  return issues;
}

/**
 * Id musi pochodzić od nazwy naukowej LUB synonimu: po zmianie taksonomicznej stara nazwa trafia
 * do `scientificSynonyms`, a id zostaje (zależą od niego historia i ulubione).
 */
function checkIdentity(species: Mushroom, report: Report): void {
  const names = [species.scientificName, ...species.scientificSynonyms];
  const ids = names.map((name) => name.trim().toLowerCase().split(/\s+/).join('-'));
  if (!ids.includes(species.id)) report('id_mismatch', `"${species.id}" nie pasuje do nazwy ani synonimu`);
}

function checkDuplicates(species: Mushroom, report: Report): void {
  const lists: readonly (readonly [string, readonly unknown[]])[] = [
    ...FEATURE_KEYS.map((key) => [`features.${key}`, species.features[key]] as const),
    ['scientificSynonyms', species.scientificSynonyms],
    ['vernacularNames', species.vernacularNames],
    ['ecology.trophicModes', species.ecology.trophicModes],
    ['ecology.mycorrhizalPartners', species.ecology.mycorrhizalPartners],
    ['ecology.substrates', species.ecology.substrates],
    ['ecology.habitats', species.ecology.habitats],
    ['fruiting.months', species.fruiting.months],
    ['imageKeys', species.imageKeys],
    ...('reasons' in species.edibility ? [['edibility.reasons', species.edibility.reasons] as const] : []),
  ];
  for (const [field, values] of lists) {
    if (new Set(values).size !== values.length) report('duplicate_value', field);
  }
}

function checkNumbers(species: Mushroom, report: Report): void {
  const { fruiting, edibility } = species;
  checkRange('fruiting.optimalMeanTempC', fruiting.optimalMeanTempC, false, report);
  checkRange('fruiting.lagDays', fruiting.lagDays, true, report);
  if (!isNonNegative(fruiting.minPrecipitationMm)) report('invalid_number', 'fruiting.minPrecipitationMm < 0');

  if ('symptomOnsetHours' in edibility) {
    checkRange('edibility.symptomOnsetHours', edibility.symptomOnsetHours, true, report);
  }
}

function checkRange(field: string, range: NumericRange, nonNegative: boolean, report: Report): void {
  const finite = Number.isFinite(range.min) && Number.isFinite(range.max);
  if (!finite || range.min > range.max) report('invalid_number', `${field}: [${range.min}, ${range.max}]`);
  else if (nonNegative && range.min < 0) report('invalid_number', `${field}: min < 0`);
}

function isNonNegative(value: number): boolean {
  return Number.isFinite(value) && value >= 0;
}

function checkMorphology(species: Mushroom, report: Report): void {
  const f = species.features;

  if (f.ring.some((ring) => ring !== 'none') && !f.ring.includes('none')) {
    report('ring_without_none', 'pierścień bywa zniszczony - dodaj "none"');
  }
  if (f.capSurface.includes('warts') && !f.capSurface.includes('smooth')) {
    report('warts_without_smooth', 'deszcz zmywa łatki - dodaj "smooth"');
  }

  const lamellar = f.hymenophore.some((type) => type === 'gills' || type === 'ridges');
  if (lamellar === f.gillAttachment.includes('not_applicable')) {
    report('gill_attachment', 'gillAttachment "not_applicable" ⇔ brak blaszek i listewek');
  }

  const stipeless = f.stipeShape.includes('absent');
  const stipeFeatures: readonly (readonly [string, readonly string[]])[] = [
    ['stipeInterior', f.stipeInterior],
    ['stipeSurface', f.stipeSurface],
    ['stipeBase', f.stipeBase],
    ['stipeColor', f.stipeColor],
    ['stipeFleshColor', f.stipeFleshColor],
    ['stipeFleshColorChange', f.stipeFleshColorChange],
  ];
  for (const [field, values] of stipeFeatures) {
    if (stipeless !== values.includes('not_applicable')) {
      report('stipe_not_applicable', `${field}: "not_applicable" ⇔ stipeShape "absent"`);
    }
  }
}

function checkEcology(species: Mushroom, report: Report): void {
  const { trophicModes, mycorrhizalPartners } = species.ecology;
  if (trophicModes.includes('mycorrhizal') !== mycorrhizalPartners.length > 0) {
    report('mycorrhizal_partners', 'mycorrhizalPartners niepuste ⇔ trophicModes zawiera "mycorrhizal"');
  }
}

function checkLookalikes(species: Mushroom, byId: ReadonlyMap<MushroomId, Mushroom>, report: Report): void {
  const { dangerousLookalikes } = species;
  if (dangerousLookalikes.length === 0) return;

  if (isDangerousCategory(species.edibility.category)) {
    report('lookalike_on_dangerous', 'relację zapisuje się przy gatunku niegroźnym');
  }
  if (new Set(dangerousLookalikes.map((l) => l.mushroomId)).size !== dangerousLookalikes.length) {
    report('lookalike_duplicate', 'ten sam sobowtór wskazany więcej niż raz');
  }

  for (const lookalike of dangerousLookalikes) {
    const target = byId.get(lookalike.mushroomId);
    if (!target) {
      report('lookalike_unknown', lookalike.mushroomId);
      continue;
    }
    if (!isDangerousCategory(target.edibility.category)) {
      report('lookalike_not_dangerous', `${target.id}: ${target.edibility.category}`);
    }
    if (new Set(lookalike.distinguishingFeatures).size !== lookalike.distinguishingFeatures.length) {
      report('duplicate_value', `dangerousLookalikes[${target.id}].distinguishingFeatures`);
    }
    for (const key of lookalike.distinguishingFeatures) {
      const own: readonly string[] = species.features[key];
      const theirs: readonly string[] = target.features[key];
      if (own.every((value) => theirs.includes(value))) {
        report('lookalike_feature_indistinct', `${target.id}.${key}: żadna wartość nie wyklucza sobowtóra`);
      }
    }
  }
}
