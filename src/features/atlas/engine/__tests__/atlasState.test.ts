import {
  INITIAL_ATLAS_STATE,
  MAX_PRESETS,
  atlasReducer,
  decodeAtlas,
  encodeAtlas,
  validatePresetName,
  type AtlasAction,
  type AtlasPreset,
  type AtlasState,
} from '..';

const run = (actions: readonly AtlasAction[], from: AtlasState = INITIAL_ATLAS_STATE) => actions.reduce(atlasReducer, from);
const preset = (id: string, name: string): AtlasPreset => ({
  id,
  name,
  filters: { facets: { edibility: ['deadly'] }, months: null, inSeasonNow: false, favorableWeather: false },
  sort: 'dangerous_first',
  createdAt: '2026-11-18T16:00:00.000Z',
});

describe('atlasReducer', () => {
  it('przełączanie opcji; odznaczenie ostatniej usuwa fasetę', () => {
    const on = run([{ type: 'toggle', facet: 'capColor', value: 'red' }, { type: 'toggle', facet: 'capColor', value: 'brown' }]);
    expect(on.filters.facets.capColor).toEqual(['red', 'brown']);
    const off = run([{ type: 'toggle', facet: 'capColor', value: 'red' }, { type: 'toggle', facet: 'capColor', value: 'brown' }], on);
    expect('capColor' in off.filters.facets).toBe(false);
  });

  it('cały rok = brak filtra sezonu', () => {
    expect(run([{ type: 'set_months', months: { from: 1, to: 12 } }]).filters.months).toBeNull();
    expect(run([{ type: 'set_months', months: { from: 6, to: 9 } }]).filters.months).toEqual({ from: 6, to: 9 });
  });

  it('zestawy: zapis, zastosowanie, odrzucenie duplikatu, usunięcie', () => {
    const saved = run([{ type: 'save_preset', preset: preset('a-1', 'Wystawa') }]);
    expect(run([{ type: 'save_preset', preset: preset('a-2', 'wystawa') }], saved).presets.length).toBe(1);
    const applied = run([{ type: 'apply_preset', id: 'a-1' }], saved);
    expect(applied.filters.facets.edibility).toEqual(['deadly']);
    expect(applied.sort).toBe('dangerous_first');
    expect(run([{ type: 'delete_preset', id: 'a-1' }], saved).presets).toEqual([]);
  });

  it('walidacja nazwy zestawu', () => {
    expect(validatePresetName('  ', [])).toBe('empty');
    expect(validatePresetName('x'.repeat(40), [])).toBe('too_long');
    const full = Array.from({ length: MAX_PRESETS }, (_, n) => preset(`p-${n}`, `Z${n}`));
    expect(validatePresetName('Nowy', full)).toBe('limit');
  });
});

describe('atlasStorage', () => {
  it('zapis i odczyt zachowują filtry, sortowanie i zestawy', () => {
    const state = {
      filters: { facets: { capColor: ['red'] }, months: { from: 6 as const, to: 9 as const }, inSeasonNow: true, favorableWeather: false },
      sort: 'edible_first' as const,
      presets: [preset('a-1', 'Wystawa')],
    };
    expect(decodeAtlas(encodeAtlas(state))).toEqual(state);
  });

  it('odrzuca nieznane fasety i opcje, uszkodzone zestawy i obce wersje', () => {
    const raw = JSON.stringify({
      version: 1,
      filters: { facets: { capColor: ['red', 'neon'], taste: ['bitter'], nonsense: ['x'] }, months: { from: 9, to: 3 } },
      sort: 'random',
      presets: [{ id: '', name: 'x' }, preset('ok-1', 'Dobry')],
    });
    const decoded = decodeAtlas(raw);
    expect(decoded.filters).toEqual({ facets: { capColor: ['red'] }, months: null, inSeasonNow: false, favorableWeather: false });
    expect(decoded.sort).toBe('alpha');
    expect(decoded.presets.map((p) => p.id)).toEqual(['ok-1']);
    expect(decodeAtlas('{nie json')).toEqual(decodeAtlas(null));
    expect(decodeAtlas(JSON.stringify({ version: 99 }))).toEqual(decodeAtlas(null));
  });
});
