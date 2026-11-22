import { validateDatabase } from '../../domain/validateDatabase';
import { MUSHROOM_DB } from '..';

describe('MUSHROOM_DB', () => {
  it('spełnia niezmienniki bazy (przy błędzie diff pokazuje listę naruszeń)', () => {
    expect(validateDatabase(MUSHROOM_DB)).toEqual([]);
  });
});
