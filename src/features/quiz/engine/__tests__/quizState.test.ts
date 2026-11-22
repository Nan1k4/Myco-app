import { pluralPl, SPECIES_FORMS } from '../../copy.pl';
import { INITIAL_QUIZ_STATE, answerFeature, answerSubstrate, quizReducer, type QuizAction, type QuizState } from '../quizState';

const run = (actions: readonly QuizAction[], from: QuizState = INITIAL_QUIZ_STATE) => actions.reduce(quizReducer, from);

describe('quizReducer', () => {
  it('odpowiedź zapisuje się, „Wstecz” ją cofa', () => {
    const answered = run([{ type: 'start' }, answerSubstrate('wood'), answerFeature('volva', { value: 'present', certainty: 'certain' }, 'dig_base')]);
    expect(answered.selections.features.volva).toEqual({ value: 'present', certainty: 'certain' });
    expect(answered.direction).toBe('forward');
    const undone = quizReducer(answered, { type: 'undo' });
    expect(undone.direction).toBe('back');
    expect(undone.selections.features.volva).toBeUndefined();
    expect(undone.selections.substrate).toBe('wood');
    expect(undone.history.length).toBe(1);
    expect(answered.answeredIn.get('volva')).toBe('dig_base');
    expect(undone.answeredIn.has('volva')).toBe(false);
  });

  it('pominięcie da się cofnąć i nadpisać odpowiedzią', () => {
    const skipped = run([{ type: 'start' }, { type: 'skip', key: 'ring', stage: 'look' }]);
    expect([...skipped.skipped]).toEqual([['ring', 'look']]);
    expect([...quizReducer(skipped, { type: 'undo' }).skipped]).toEqual([]);
    expect([...quizReducer(skipped, answerFeature('ring', { value: 'none', certainty: 'uncertain' }, 'look')).skipped]).toEqual([]);
  });

  it('pominięcie etapu to jeden krok „Wstecz”', () => {
    const skipped = run([{ type: 'start' }, { type: 'skip_stage', stage: 'dig_base' }]);
    expect([...skipped.skippedStages]).toEqual(['dig_base']);
    expect(quizReducer(skipped, { type: 'undo' }).skippedStages.size).toBe(0);
  });

  it('„Wróć do etapu” przywraca etap, jego pojedyncze pominięcia i etapy, które ukrył', () => {
    const state = run([
      { type: 'start' },
      { type: 'skip', key: 'volva', stage: 'dig_base' },
      { type: 'skip', key: 'ring', stage: 'look' },
      { type: 'skip_stage', stage: 'dig_base' },
      { type: 'show_results' },
      { type: 'revisit_stage', stage: 'dig_base' },
    ]);
    expect(state.phase).toBe('questions');
    expect(state.skippedStages.size).toBe(0);
    expect([...state.skipped.keys()]).toEqual(['ring']);
    expect([...state.reopened].sort()).toEqual(['cut', 'dig_base', 'spore_print']);
  });

  it('„Tylko to pytanie” pomija jedno i zapamiętuje etap (bez ponownej propozycji pominięcia etapu)', () => {
    const state = run([{ type: 'start' }, { type: 'skip_single', key: 'latex', stage: 'touch' }]);
    expect([...state.skipped]).toEqual([['latex', 'touch']]);
    expect(state.singleSkipStages.has('touch')).toBe(true);
    expect(quizReducer(state, { type: 'reset' }).singleSkipStages.size).toBe(0);
  });

  it('powrót z podsumowania przypina pytanie w etapie i zdejmuje je z pominiętych', () => {
    const state = run([
      { type: 'start' },
      { type: 'skip', key: 'volva', stage: 'dig_base' },
      { type: 'show_results' },
      { type: 'revisit', key: 'volva', stage: 'dig_base' },
    ]);
    expect(state.phase).toBe('questions');
    expect(state.pinned).toEqual({ key: 'volva', stage: 'dig_base' });
    expect(state.skipped.has('volva')).toBe(false);
  });

  it('próg jest normalizowany i przeżywa reset', () => {
    const state = run([{ type: 'set_threshold', value: 0.63 }, { type: 'reset' }]);
    expect(state.threshold).toBe(0.65);
    expect(state.phase).toBe('questions');
    expect(state.history).toEqual([]);
  });

  it('„Wstecz” bez historii nic nie zmienia', () => {
    expect(quizReducer(INITIAL_QUIZ_STATE, { type: 'undo' })).toBe(INITIAL_QUIZ_STATE);
  });
});

describe('pluralPl', () => {
  it.each([
    [1, 'gatunek'],
    [2, 'gatunki'],
    [5, 'gatunków'],
    [12, 'gatunków'],
    [22, 'gatunki'],
    [0, 'gatunków'],
  ] as const)('%s %s', (count, form) => {
    expect(pluralPl(count, SPECIES_FORMS)).toBe(form);
  });
});
