import { FEATURE_KEYS, SUBJECTIVE_FEATURES, isGateFeatureKey, requiredProcedures } from '..';

describe('requiredProcedures', () => {
  it('cechy „purchawki” są pewne dopiero po przekroju (stadium „jaja” muchomora)', () => {
    expect(requiredProcedures('hymenophore', 'gleba')).toEqual(['cut']);
    expect(requiredProcedures('stipeShape', 'absent')).toEqual(['cut']);
    expect(requiredProcedures('stipeColor', 'not_applicable')).toEqual(['cut']);
    expect(requiredProcedures('stipeSurface', 'not_applicable')).toEqual(['cut']);
    expect(requiredProcedures('stipeBase', 'not_applicable')).toEqual(['cut']);
  });

  it('brak pochwy wymaga wykopania I przekroju (wykopane jajo samo jest pochwą)', () => {
    expect(requiredProcedures('volva', 'absent')).toEqual(['dig_base', 'cut']);
  });

  it('pozostałe wartości używają czynności domyślnej cechy', () => {
    expect(requiredProcedures('hymenophore', 'gills')).toEqual(['look']);
    expect(requiredProcedures('volva', 'present')).toEqual(['dig_base']);
  });
});

describe('isGateFeatureKey', () => {
  it('odrzuca dokładnie smak i cechy subiektywne (zgodnie z typem GateFeatureKey)', () => {
    const rejected = FEATURE_KEYS.filter((key) => !isGateFeatureKey(key));
    expect([...rejected].sort()).toEqual(['taste', ...SUBJECTIVE_FEATURES].sort());
  });
});
