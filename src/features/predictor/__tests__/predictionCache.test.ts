jest.mock('../../../db/repositories/speciesRepository', () => ({
  getDatabaseMeta: () => ({ speciesCount: 146 }),
  getPredictorSpeciesForMonth: () => [],
}));

import { toIsoDateTime, toNonEmptyArray, type IsoDate, type WeatherSnapshot } from '../../../domain';
import { cachedPrediction } from '../predictionCache';

function makeSnapshot(fetchedAt: string): WeatherSnapshot {
  const days = toNonEmptyArray(
    Array.from({ length: 12 }, (_, idx) => {
      const day = String(idx + 1).padStart(2, '0');
      return {
        date: `2026-10-${day}` as IsoDate,
        precipitationMm: 5,
        tempMinC: 8,
        tempMaxC: 16,
        tempMeanC: 12,
        soilMoisture: 0.3,
      };
    }),
  );
  if (!days) throw new Error('Expected non-empty days');
  return {
    coords: { latitude: 52.23, longitude: 21.01 },
    timezone: 'Europe/Warsaw',
    days,
    fetchedAt: toIsoDateTime(new Date(fetchedAt)),
  };
}

describe('cachedPrediction', () => {
  it('zwraca zapamiętany wynik w ramach TTL i odświeża po jego upływie', () => {
    const snapshot = makeSnapshot('2026-10-13T10:00:00.000Z');
    const t0 = new Date('2026-10-13T10:30:00.000Z');
    const tWithinTtl = new Date('2026-10-13T10:40:00.000Z');
    const tAfterTtl = new Date('2026-10-13T10:46:00.000Z');

    const p0 = cachedPrediction(snapshot, t0);
    const p1 = cachedPrediction(snapshot, tWithinTtl);
    const p2 = cachedPrediction(snapshot, tAfterTtl);

    expect(p1).toBe(p0);
    expect(p2).not.toBe(p0);
    expect(p2.computedAt).toBe(toIsoDateTime(tAfterTtl));
  });

  it('unieważnia cache na progach pewności 6 h i 24 h nawet przed upływem TTL', () => {
    const snapshot = makeSnapshot('2026-10-13T00:00:00.000Z');

    const before6h = cachedPrediction(snapshot, new Date('2026-10-13T05:55:00.000Z'));
    expect(before6h.confidence).toBe('high');

    // 6 minut później (poniżej 15 min TTL), ale przekroczony próg 6 h
    const after6h = cachedPrediction(snapshot, new Date('2026-10-13T06:01:00.000Z'));
    expect(after6h.confidence).toBe('medium');

    const before24h = cachedPrediction(snapshot, new Date('2026-10-13T23:55:00.000Z'));
    expect(before24h.confidence).toBe('medium');

    // 6 minut później przekroczony próg 24 h
    const after24h = cachedPrediction(snapshot, new Date('2026-10-14T00:01:00.000Z'));
    expect(after24h.confidence).toBe('low');
  });
});
