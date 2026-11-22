/**
 * @file Testy typów Bramki. Sprawdzane przez `npm run typecheck` (nie jest wykonywany w runtime).
 */
import { mushroomId, type DangerousLookalike, type FeatureKey, type FilterResult, type GateFeatureKey } from '../domain';

// 1. Smak i cechy subiektywne nie mogą rozstrzygać o gatunku niebezpiecznym.
const taste: DangerousLookalike = {
  mushroomId: mushroomId('amanita-phalloides'),
  // @ts-expect-error – 'taste' nie jest GateFeatureKey
  distinguishingFeatures: ['taste'],
  note: '',
};
const subjective: DangerousLookalike = {
  mushroomId: mushroomId('amanita-phalloides'),
  // @ts-expect-error – 'capColor' (cecha subiektywna) nie jest GateFeatureKey
  distinguishingFeatures: ['volva', 'capColor'],
  note: '',
};
const ok: DangerousLookalike = {
  mushroomId: mushroomId('amanita-phalloides'),
  distinguishingFeatures: ['volva', 'sporePrint'],
  note: '',
};

// 2. GateFeatureKey = wszystkie cechy poza smakiem i cechami subiektywnymi (dokładnie).
//    Dwie osobne asercje zamiast jednej „true/false”: przy błędzie kompilator pokazuje KTÓRE cechy
//    się nie zgadzają, np. „Type 'true' is not assignable to type '"capShape"'”.
type Expected = Exclude<
  FeatureKey,
  | 'taste'
  | 'capColor'
  | 'capShape'
  | 'capFleshColor'
  | 'stipeColor'
  | 'stipeFleshColor'
  | 'smell'
  | 'growthHabit'
  | 'capPeelability'
>;
/** `true`, gdy `T` jest pusty; w przeciwnym razie – sam `T` (lista nadmiarowych/brakujących kluczy). */
type AssertNever<T> = [T] extends [never] ? true : T;
/** Cechy w GateFeatureKey, których być tam nie powinno (np. smak) – oczekiwane: brak. */
const noExtraKeys: AssertNever<Exclude<GateFeatureKey, Expected>> = true;
/** Cechy, których brakuje w GateFeatureKey – oczekiwane: brak. */
const noMissingKeys: AssertNever<Exclude<Expected, GateFeatureKey>> = true;

// 3. Bez zawężenia po `status` nie ma dostępu do listy dopasowań.
declare const r: FilterResult;
// @ts-expect-error – matchingIds nie istnieje na wszystkich wariantach
void r.matchingIds;
if (r.status === 'clear') void r.matchingIds[0];
if (r.status === 'verification_required') void r.pendingChecks[0].feature;

// 4. Wyczerpujący switch – nowy wariant = błąd kompilacji.
function render(x: FilterResult): string {
  switch (x.status) {
    case 'clear':
      return 'c';
    case 'verification_required':
      return 'v';
    case 'dangerous_match':
      return 'd';
    case 'no_match':
      return 'n';
  }
}

void taste;
void subjective;
void ok;
void noExtraKeys;
void noMissingKeys;
void render;
