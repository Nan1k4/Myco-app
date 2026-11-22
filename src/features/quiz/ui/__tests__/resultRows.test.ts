import { MUSHROOM_DB } from '../../../../data';
import type { FeatureSelections } from '../../../../domain';
import { buildFilterIndex } from '../../../filter/engine';
import { EMPTY_PROGRESS, rankBySimilarity, skippedOverview, type QuizKey, type QuizStage } from '../../engine';
import { buildResultRows, summarizeVisibility } from '../resultRows';

const index = buildFilterIndex(MUSHROOM_DB);
const features: FeatureSelections = {
  hymenophore: { value: 'gills', certainty: 'uncertain' },
  hymenophoreColor: { value: 'white', certainty: 'uncertain' },
  ring: { value: 'membranous_skirt', certainty: 'uncertain' },
  volva: { value: 'absent', certainty: 'uncertain' },
};

describe('resultRows', () => {
  it('podsumowanie liczy widoczne, ukryte (z trującymi) i wykluczone względem całej bazy', () => {
    for (const threshold of [0.5, 0.8, 1]) {
      const r = rankBySimilarity(index.species, { features }, threshold);
      const visible = r.exact.length + r.partial.length + r.dangerous.length;
      const hidden = r.hiddenHarmlessCount + r.hiddenDangerous.length;
      expect(visible + hidden + r.excludedIds.length).toBe(MUSHROOM_DB.species.length);
      expect(summarizeVisibility(r)).toContain(`Widoczne: ${visible} z ${MUSHROOM_DB.species.length}`);
      if (r.hiddenDangerous.length > 0) expect(summarizeVisibility(r)).toContain(`w tym trujące: ${r.hiddenDangerous.length}`);
    }
  });

  it('podsumowanie z filtrem pogody wykazuje gatunki odfiltrowane poza pogodą i zachowuje bilans', () => {
    const r = rankBySimilarity(index.species, { features }, 0.5);
    const keepHalf = new Set(
      [...r.exact, ...r.partial].filter((_, idx) => idx % 2 === 0).map((e) => e.species.id),
    );
    const exact = r.exact.filter((e) => keepHalf.has(e.species.id));
    const partial = r.partial.filter((e) => keepHalf.has(e.species.id));
    const weatherHidden = (r.exact.length - exact.length) + (r.partial.length - partial.length);
    const filtered = { ...r, exact, partial };
    const summary = summarizeVisibility(filtered, weatherHidden);
    const visible = filtered.exact.length + filtered.partial.length + filtered.dangerous.length;
    const hidden = filtered.hiddenHarmlessCount + filtered.hiddenDangerous.length;
    expect(visible + hidden + weatherHidden + filtered.excludedIds.length).toBe(MUSHROOM_DB.species.length);
    if (weatherHidden > 0) expect(summary).toContain(`poza pogodą: ${weatherHidden}`);
  });

  it('wiersze: grupy mają pierwszy i ostatni element; pominięte etapy i pytania w kolejności quizu', () => {
    const selections = { features };
    const ranking = rankBySimilarity(index.species, selections, 0.5);
    const skipped = new Map<QuizKey, QuizStage>([
      ['smell', 'smell'],
      ['stipeInterior', 'cut'],
      ['latex', 'touch'],
      ['habitat', 'place'],
    ]);
    const rows = buildResultRows({
      ranking,
      skipped: skippedOverview({ ...EMPTY_PROGRESS, selections, skipped, skippedStages: new Set<QuizStage>(['spore_print']) }),
    });
    const species = rows.filter((row) => row.kind === 'species');
    expect(species.filter((row) => row.position.first).length).toBeGreaterThan(0);
    const skippedHeaders = rows.filter((row) => row.kind === 'header' && row.id.startsWith('h-skipped-')).map((row) => row.id);
    expect(skippedHeaders).toEqual(['h-skipped-place', 'h-skipped-touch', 'h-skipped-cut', 'h-skipped-smell', 'h-skipped-spore_print']);
    // Odpowiedzi „na oko” (hymenophoreColor, volva) nie trafiają na listę – obsługuje je baner Bramki.
    expect(rows.filter((row) => row.kind === 'skipped').map((row) => row.key)).toEqual(['habitat', 'latex', 'stipeInterior', 'smell']);
    expect(rows.filter((row) => row.kind === 'skipped_stage').map((row) => row.stage)).toEqual(['spore_print']);
    expect(new Set(rows.map((row) => row.id)).size).toBe(rows.length); // klucze FlatList unikalne
  });
});
