import { EMPTY_SELECTIONS, withFeature, withSubstrateToggled, withTreeToggled } from '../selections';

describe('selections', () => {
  it('ustawia i czyści obserwację cechy bez mutowania wejścia', () => {
    const set = withFeature(EMPTY_SELECTIONS, 'volva', { value: 'absent', certainty: 'certain' });
    expect(set.features.volva).toEqual({ value: 'absent', certainty: 'certain' });
    expect(EMPTY_SELECTIONS.features).toEqual({});
    expect(withFeature(set, 'volva', undefined).features.volva).toBeUndefined();
  });

  it('przełącza drzewa; ostatnie usunięte = brak obserwacji', () => {
    const one = withTreeToggled(EMPTY_SELECTIONS, 'pinus');
    expect(withTreeToggled(one, 'fagus').trees).toEqual(['pinus', 'fagus']);
    expect(withTreeToggled(one, 'pinus').trees).toBeUndefined();
  });

  it('ponowny wybór tego samego podłoża je czyści', () => {
    const wood = withSubstrateToggled(EMPTY_SELECTIONS, 'wood');
    expect(wood.substrate).toBe('wood');
    expect(withSubstrateToggled(wood, 'wood').substrate).toBeUndefined();
  });
});