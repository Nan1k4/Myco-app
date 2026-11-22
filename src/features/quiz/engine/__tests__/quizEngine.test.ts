import {
  COLORS,
  FEATURE_KEYS,
  FEATURE_PROCEDURES,
  HABITATS,
  type FeatureSelections,
  type FilterSelections,
  type Mushroom,
} from '../../../../domain';
import { DEADLY, EDIBLE, testDatabase, testSpecies } from '../../../../domain/__fixtures__/testSpecies';
import { buildFilterIndex, evaluateFilter } from '../../../filter/engine';
import {
  CARRY_OVER,
  EMPTY_PROGRESS,
  REVIEW_IN,
  STAGE_ORDER,
  STAGE_SEQUENCE,
  canConfirmIn,
  confirmStage,
  cutPerformed,
  isApplicable,
  isKeySkippable,
  isQuizFeatureKey,
  isStageSkippable,
  nextQuestion,
  orderedOptions,
  pendingDigQuestion,
  pendingStage,
  remainingInStage,
  reviewableIn,
  revisitStage,
  skippedOverview,
  stageOf,
  type QuizKey,
  type QuizPin,
  type QuizProgressView,
  type QuizStage,
} from '../quizEngine';
import { rankBySimilarity } from '../similarity';

const agaricus = testSpecies('Testus agaricus', EDIBLE, { hymenophoreColor: ['pink', 'brown'], sporePrint: ['purple_brown'] });
const mortalis = testSpecies('Testus mortalis', DEADLY, { volva: ['present'] });
const lignicola = testSpecies(
  'Testus lignicola',
  EDIBLE,
  { stipeInterior: ['hollow'], capFleshColorChange: ['red'], gillAttachment: ['adnate'] },
  { ecology: { trophicModes: ['saprotrophic'], mycorrhizalPartners: [], substrates: ['wood_dead'], habitats: ['meadow'] } },
);
/** Rośnie na ziemi i na drewnie, w każdym siedlisku - pytania o miejsce niczego go nie pozbawią. */
const ubiquitous: Mushroom = {
  ...agaricus,
  ecology: {
    ...agaricus.ecology,
    substrates: ['soil', 'wood_dead'],
    habitats: [...HABITATS],
  },
};

/** Przebieg z odpowiedziami i pominięciami (`skipped`: klucz → etap pominięcia). */
function progressOf(selections: FilterSelections, extra: Partial<Omit<QuizProgressView, 'selections'>> = {}): QuizProgressView {
  return { ...EMPTY_PROGRESS, selections, ...extra };
}

/** Pominięcia w etapach domowych. */
const skippedAtHome = (...keys: QuizKey[]) => new Map(keys.map((key) => [key, stageOf(key)] as const));

function ask(species: readonly Mushroom[], selections: FilterSelections, extra: Partial<Omit<QuizProgressView, 'selections'>> = {}, pinned: QuizPin | null = null) {
  const index = buildFilterIndex(testDatabase(species));
  const gate = evaluateFilter(index, selections);
  const ranking = rankBySimilarity(index.species, selections, 0.8);
  return { gate, question: nextQuestion({ gate, ranking, progress: progressOf(selections, extra), pinned }) };
}

const noStipe: FilterSelections = { features: { stipeColor: { value: 'not_applicable', certainty: 'uncertain' } } };

describe('STAGE_SEQUENCE', () => {
  it('każde pytanie quizu dokładnie raz; smaku nie ma', () => {
    const listed = STAGE_ORDER.flatMap((stage) => STAGE_SEQUENCE[stage]);
    const expected: QuizKey[] = [...FEATURE_KEYS.filter(isQuizFeatureKey), 'habitat', 'substrate', 'trees'];
    expect([...listed].sort()).toEqual([...expected].sort());
    expect(listed.length).toBe(28);
  });

  it('etap cechy = jej czynność w domenie albo etap, do którego pytanie przechodzi (przyczep blaszek)', () => {
    for (const key of FEATURE_KEYS.filter(isQuizFeatureKey)) {
      expect([stageOf(key), CARRY_OVER[key]]).toContain(FEATURE_PROCEDURES[key]);
    }
  });

  it('pewna odpowiedź tylko tam, gdzie da się ją sprawdzić: przyczep blaszek nie w wykopie', () => {
    expect(canConfirmIn('gillAttachment', 'dig_base')).toBe(false);
    expect(canConfirmIn('gillAttachment', 'cut')).toBe(true);
    expect(canConfirmIn('latex', 'touch')).toBe(false); // czynność mleczka w domenie: przekrój
    expect(canConfirmIn('latex', 'cut')).toBe(true);
    expect(REVIEW_IN).toEqual({ latex: 'cut', gillAttachment: 'cut' });
    expect(canConfirmIn('volva', 'dig_base')).toBe(true);
    expect(canConfirmIn('capColor', 'look')).toBe(false); // subiektywna - zawsze „na oko”
  });

  it('miejsca i wyglądu nie da się pominąć w całości; siedliska i podłoża - wcale', () => {
    expect(STAGE_ORDER.filter(isStageSkippable)).toEqual(['touch', 'dig_base', 'cut', 'smell', 'spore_print']);
    expect(STAGE_SEQUENCE.place.filter((key) => !isKeySkippable(key))).toEqual(['habitat', 'substrate']);
    expect(STAGE_SEQUENCE.look.every(isKeySkippable)).toBe(true);
  });

  it('dotyk (bez zrywania) przed wykopaniem', () => {
    expect(STAGE_ORDER.indexOf('touch')).toBeLessThan(STAGE_ORDER.indexOf('dig_base'));
  });
});

describe('warunki pytań', () => {
  const features = (f: FeatureSelections): FilterSelections => ({ features: f });

  it('„brak trzonu” w barwie trzonu ukrywa wszystkie pytania o trzon; pochwa zostaje', () => {
    const stipeKeys = ['stipeShape', 'stipeSurface', 'ring', 'gillAttachment', 'stipeFleshColor', 'stipeInterior', 'stipeFleshColorChange', 'stipeBase'] as const;
    for (const key of stipeKeys) {
      expect(isApplicable(key, noStipe)).toBe(false);
      expect(isApplicable(key, features({}))).toBe(true);
    }
    expect(isApplicable('volva', noStipe)).toBe(true);
    expect(isApplicable('capFleshColor', noStipe)).toBe(true);
  });

  it('mleczko i przyczep tylko przy blaszkach albo gdy hymenofor nieznany', () => {
    const tubes = features({ hymenophore: { value: 'tubes', certainty: 'uncertain' } });
    expect(isApplicable('latex', tubes)).toBe(false);
    expect(isApplicable('gillAttachment', tubes)).toBe(false);
    expect(isApplicable('latex', features({}))).toBe(true);
  });

  it('brak hymenoforu: bez pytania o kolor spodu kapelusza (gleba ma barwę wnętrza - pytanie zostaje)', () => {
    expect(isApplicable('hymenophoreColor', features({ hymenophore: { value: 'none', certainty: 'uncertain' } }))).toBe(false);
    expect(isApplicable('hymenophoreColor', features({ hymenophore: { value: 'gleba', certainty: 'uncertain' } }))).toBe(true);
  });

  it('pytanie bez sensu nie pada, nawet gdy coś by zawęziło', () => {
    const twin: Mushroom = { ...testSpecies('Testus gemellus', EDIBLE, { ring: ['membranous_skirt', 'none'] }), ecology: ubiquitous.ecology };
    expect(ask([ubiquitous, twin], noStipe).question?.key).not.toBe('ring');
  });
});

describe('nextQuestion', () => {
  it('najpierw miejsce w kolejności listy: siedlisko, podłoże, drzewa', () => {
    expect(ask([agaricus, mortalis, lignicola], { features: {} }).question).toEqual({
      kind: 'environment',
      key: 'habitat',
      stage: 'place',
    });
    expect(ask([agaricus, mortalis, lignicola], { features: {}, habitat: 'meadow' }).question).toEqual({
      kind: 'environment',
      key: 'substrate',
      stage: 'place',
    });
  });

  it('otoczenie pomijane, gdy niczego nie zawęża', () => {
    expect(ask([ubiquitous, mortalis], { features: {} }).question?.stage).toBe('look');
  });

  it('w etapie - stała kolejność z listy (pytanie Bramki nie przeskakuje wcześniejszego)', () => {
    // capSize jest w wyglądzie przed hymenophoreColor; oba coś rozstrzygają.
    const twin: Mushroom = { ...testSpecies('Testus gemellus', EDIBLE, { capSize: ['under_5'], hymenophoreColor: ['pink'] }), ecology: ubiquitous.ecology };
    expect(ask([ubiquitous, twin, mortalis], { features: {} }).question?.key).toBe('capSize');
  });

  it('pytanie Bramki z wyglądu przed wykopaniem; pochwa dopiero po wyczerpaniu wyglądu', () => {
    const { question } = ask([ubiquitous, mortalis], { features: {} });
    expect(question).toMatchObject({ kind: 'safety', stage: 'look', key: 'hymenophoreColor' });
    const looked: FilterSelections = { features: { hymenophoreColor: { value: 'pink', certainty: 'uncertain' } } };
    expect(ask([ubiquitous, mortalis], looked).question).toMatchObject({ kind: 'safety', key: 'volva', stage: 'dig_base' });
  });

  it('pominięte nie wracają samo; wraca przypięte („Wróć do pominiętego”)', () => {
    const skipped = skippedAtHome('hymenophoreColor');
    expect(ask([ubiquitous, mortalis], { features: {} }, { skipped }).question?.key).not.toBe('hymenophoreColor');
    expect(ask([ubiquitous, mortalis], { features: {} }, { skipped }, { key: 'hymenophoreColor', stage: 'look' }).question?.key).toBe(
      'hymenophoreColor',
    );
  });

  it('dangerous_match: quiz zawęża dalej wśród trujących; kończy się, gdy nie ma czego rozróżniać', () => {
    const { gate, question } = ask([mortalis], { features: {} });
    expect(gate.status).toBe('dangerous_match');
    expect(question).toBeNull();
    const other = testSpecies('Testus venenosus', DEADLY, { volva: ['present'], capSize: ['under_5'] });
    const two = ask([mortalis, other], { features: {} });
    expect(two.gate.status).toBe('dangerous_match');
    expect(two.question).toMatchObject({ kind: 'narrowing', key: 'capSize' });
  });

  it('po wejściu w etap „po zebraniu” nie wraca do miejsca, ale zaległe pytanie Bramki zadaje', () => {
    const twin = testSpecies('Testus gemellus', EDIBLE, { stipeInterior: ['hollow'], stipeBase: ['rounded_bulb'] });
    const pool = [agaricus, twin, lignicola];
    const reachedCut: FilterSelections = { features: { stipeInterior: { value: 'solid', certainty: 'uncertain' } } };
    expect(ask(pool, reachedCut).question?.stage).not.toBe('place');
    expect(ask([...pool, mortalis], reachedCut).question?.kind).toBe('safety');
  });
});

describe('pomijanie etapów i przenoszenie pytań', () => {
  /** Dwa gatunki różniące się wszystkim, co da się sprawdzić po zebraniu. */
  const twinA = { ...testSpecies('Testus alpha', EDIBLE, { latex: ['white'], gillAttachment: ['free'], capFleshColor: ['white'], sporePrint: ['white'] }), ecology: ubiquitous.ecology };
  const twinB = { ...testSpecies('Testus beta', EDIBLE, { latex: ['none'], gillAttachment: ['decurrent'], capFleshColor: ['yellow'], sporePrint: ['brown'] }), ecology: ubiquitous.ecology };
  const pool = [twinA, twinB];
  const empty: FilterSelections = { features: {} };

  it('pominięte wykopanie ukrywa przekrój i wysyp; pozostaje zapach', () => {
    const progress = progressOf(empty, { skippedStages: new Set<QuizStage>(['dig_base']) });
    expect(pendingStage('capFleshColor', progress)).toBeNull();
    expect(pendingStage('sporePrint', progress)).toBeNull();
    expect(pendingStage('smell', progress)).toBe('smell');
    const asked = ask(pool, empty, { skippedStages: new Set<QuizStage>(['touch', 'dig_base']) }).question;
    expect(asked === null || !['cut', 'spore_print', 'dig_base'].includes(asked.stage)).toBe(true);
  });

  it('mleczko pominięte w dotyku (albo z całym dotykiem) pada na początku przekroju', () => {
    const viaKey = progressOf(empty, { skipped: skippedAtHome('latex') });
    const viaStage = progressOf(empty, { skippedStages: new Set<QuizStage>(['touch']) });
    expect(pendingStage('latex', viaKey)).toBe('cut');
    expect(pendingStage('latex', viaStage)).toBe('cut');
    expect(remainingInStage('cut', viaStage)[0]).toBe('latex'); // przyczep nie pominięty - zostaje w wykopie
  });

  it('przyczep blaszek odłożony z wykopu („Sprawdź przy przekroju”) jest pierwszym pytaniem przekroju', () => {
    const answeredDig: FilterSelections = { features: { volva: { value: 'absent', certainty: 'certain' }, stipeBase: { value: 'plain', certainty: 'certain' } } };
    const skipped = new Map<QuizKey, QuizStage>([['gillAttachment', 'dig_base'], ['latex', 'touch']]);
    const { question } = ask(pool, answeredDig, { skipped, skippedStages: new Set<QuizStage>(['touch']) });
    expect(question).toMatchObject({ key: 'gillAttachment', stage: 'cut' });
    expect(remainingInStage('cut', progressOf(answeredDig, { skipped }))[0]).toBe('gillAttachment');
    expect(remainingInStage('cut', progressOf(answeredDig, { skipped }))[1]).toBe('latex');
  });

  it('pominięte drugi raz (w przekroju) już nie wraca, ale jest na liście pominiętych', () => {
    const progress = progressOf(empty, { skipped: new Map<QuizKey, QuizStage>([['latex', 'cut']]) });
    expect(pendingStage('latex', progress)).toBeNull();
    expect(skippedOverview(progress)).toEqual([{ stage: 'cut', whole: false, hides: [], keys: ['latex'] }]);
  });

  it('lista pominiętych: cały etap jako jedna pozycja; pytania z ukrytych etapów wracają razem z etapem', () => {
    const progress = progressOf(noStipe, {
      skipped: new Map<QuizKey, QuizStage>([['sporePrint', 'spore_print'], ['ring', 'look'], ['habitat', 'place'], ['volva', 'dig_base']]),
      skippedStages: new Set<QuizStage>(['dig_base']),
    });
    expect(skippedOverview(progress)).toEqual([
      { stage: 'place', whole: false, hides: [], keys: ['habitat'] },
      { stage: 'dig_base', whole: true, hides: ['cut', 'spore_print'], keys: [] },
    ]); // ring - bez sensu przy braku trzonu; sporePrint - w ukrytym wysypie
  });

  it('powrót do pominiętego: przeniesione pytanie wraca w przekroju, jeśli quiz już tam doszedł', () => {
    const inTouch = progressOf(empty, { skipped: skippedAtHome('latex') });
    expect(revisitStage('latex', inTouch)).toBe('touch');
    const afterCut = progressOf(
      { features: { capFleshColor: { value: 'white', certainty: 'certain' } } },
      { skipped: skippedAtHome('latex'), answeredIn: new Map<QuizKey, QuizStage>([['capFleshColor', 'cut']]) },
    );
    expect(revisitStage('latex', afterCut)).toBe('cut');
  });

  it('przyczep „na oko” z wykopu: Bramka dopytuje na przekroju; karta proponuje poprawkę', () => {
    const deadlyFree = testSpecies('Testus phalloides', DEADLY, { gillAttachment: ['free'], volva: ['absent'] });
    const selections: FilterSelections = {
      features: { gillAttachment: { value: 'decurrent', certainty: 'uncertain' }, volva: { value: 'absent', certainty: 'certain' } },
    };
    const answeredIn = new Map<QuizKey, QuizStage>([['gillAttachment', 'dig_base'], ['volva', 'dig_base']]);
    expect(reviewableIn('cut', progressOf(selections, { answeredIn }))).toEqual(['gillAttachment']);
    expect(confirmStage('gillAttachment', progressOf(selections, { answeredIn }))).toBe('cut');
    const { question } = ask([twinB, deadlyFree], selections, { answeredIn });
    expect(question).toMatchObject({ kind: 'safety', key: 'gillAttachment', stage: 'cut' });
    // Odpowiedź w przekroju (nawet znów „na oko”) kończy sprawę - bez pętli.
    const again = ask([twinB, deadlyFree], selections, { answeredIn: new Map<QuizKey, QuizStage>([['gillAttachment', 'cut']]) });
    expect(again.question?.key).not.toBe('gillAttachment');
  });

  it('etap otwarty ponownie zawęża, choć quiz poszedł dalej', () => {
    const smelled: FilterSelections = { features: { smell: { value: 'none', certainty: 'uncertain' } } };
    const answeredIn = new Map<QuizKey, QuizStage>([['smell', 'smell']]);
    expect(ask(pool, smelled, { answeredIn }).question?.stage).not.toBe('touch');
    expect(ask(pool, smelled, { answeredIn, reopened: new Set<QuizStage>(['touch']) }).question?.stage).toBe('touch');
  });
});

describe('pominięte i kontekst', () => {
  it('remainingInStage: kolejność listy, bez odpowiedzianych, pominiętych i bez sensu', () => {
    const selections: FilterSelections = { features: { latex: { value: 'none', certainty: 'certain' } } };
    expect(remainingInStage('touch', progressOf(selections, { skipped: skippedAtHome('capSurface') }))).toEqual(['capPeelability', 'bruising']);
  });

  it('komunikat o wykopaniu: pojedynczo pominięte wykopanie i grzyb z trzonem', () => {
    expect(pendingDigQuestion(progressOf({ features: {} }, { skipped: skippedAtHome('volva') }))).toBe('volva');
    expect(pendingDigQuestion(progressOf(noStipe, { skipped: skippedAtHome('volva') }))).toBeNull();
    expect(pendingDigQuestion(progressOf({ features: {} }))).toBeNull();
    expect(pendingDigQuestion(progressOf({ features: {} }, { skipped: skippedAtHome('gillAttachment') }))).toBeNull();
  });

  it('przekrój wykonany = odpowiedź na pytanie etapu przekroju (też przeniesione, zadane w nim)', () => {
    expect(cutPerformed(progressOf({ features: {} }))).toBe(false);
    expect(cutPerformed(progressOf({ features: { stipeInterior: { value: 'solid', certainty: 'uncertain' } } }))).toBe(true);
    const latex: FilterSelections = { features: { latex: { value: 'none', certainty: 'uncertain' } } };
    expect(cutPerformed(progressOf(latex, { answeredIn: new Map<QuizKey, QuizStage>([['latex', 'touch']]) }))).toBe(false);
    expect(cutPerformed(progressOf(latex, { answeredIn: new Map<QuizKey, QuizStage>([['latex', 'cut']]) }))).toBe(true);
  });
});

describe('orderedOptions', () => {
  it('„nie dotyczy” (dane gatunków bez trzonu) nie jest odpowiedzią w quizie', () => {
    const index = buildFilterIndex(testDatabase([agaricus]));
    const { likely, other } = orderedOptions('stipeShape', index.species);
    expect([...likely, ...other]).not.toContain('not_applicable');
    expect([...orderedOptions('stipeColor', index.species).other]).toContain('not_applicable');
  });

  it('wartości obecne u kandydatów najpierw, reszta osobno - nic nie jest ukryte', () => {
    const index = buildFilterIndex(testDatabase([agaricus, mortalis]));
    const { likely, other } = orderedOptions('volva', index.species);
    expect(likely).toEqual(['present', 'absent']);
    expect(other).toEqual([]);
    const colors = orderedOptions('hymenophoreColor', index.species);
    expect(colors.likely).toEqual(['white', 'pink', 'brown']);
    expect([...colors.likely, ...colors.other]).not.toContain('none');
    expect(colors.likely.length + colors.other.length).toBe(COLORS.length - 1);
  });
});
