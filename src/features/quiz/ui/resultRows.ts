/**
 * @file Spłaszczenie wyników do wierszy jednej wirtualizowanej listy (`FlatList`).
 * Czysta funkcja – bez React Native; sekcje „inset grouped” odtwarza `position` wiersza.
 * @module features/quiz/ui/resultRows
 */
import { STAGE_COPY_PL } from '../copy.pl';
import { hiddenCount, type QuizKey, type QuizStage, type SimilarityEntry, type SimilarityRanking, type SkippedGroup } from '../engine';

/** Miejsce wiersza w grupie – zaokrąglenia i separatory bez obrysów. */
export interface GroupPosition {
  readonly first: boolean;
  readonly last: boolean;
}

export type ResultRow =
  | { readonly kind: 'header'; readonly id: string; readonly title: string }
  | { readonly kind: 'species'; readonly id: string; readonly entry: SimilarityEntry; readonly position: GroupPosition }
  | { readonly kind: 'empty'; readonly id: string; readonly text: string }
  | { readonly kind: 'threshold'; readonly id: 'threshold' }
  /** Pominięte pytanie – dotknięcie wraca do niego. */
  | { readonly kind: 'skipped'; readonly id: string; readonly key: QuizKey; readonly position: GroupPosition }
  /** Etap pominięty w całości – dotknięcie przywraca etap (i ukryte przez niego). */
  | { readonly kind: 'skipped_stage'; readonly id: string; readonly stage: QuizStage; readonly hides: readonly QuizStage[] };

export interface ResultRowsInput {
  readonly ranking: SimilarityRanking;
  /** Pominięte etapy i pytania w kolejności quizu (`skippedOverview`). */
  readonly skipped: readonly SkippedGroup[];
}

/**
 * Kolejność = ważność: trujące → pełna zgodność → suwak → częściowa zgodność → pominięte etapy
 * i pytania (pogrupowane etapami, w kolejności quizu). Odpowiedzi „na oko” na pytania Bramki obsługuje baner („Sprawdź”). Werdykt Bramki i podsumowanie liczb są w nagłówku listy.
 */
export function buildResultRows({ ranking, skipped }: ResultRowsInput): readonly ResultRow[] {
  const percent = Math.round(ranking.threshold * 100);
  const rows: ResultRow[] = [];

  if (ranking.dangerous.length > 0) {
    rows.push({ kind: 'header', id: 'h-dangerous', title: 'Niewykluczone gatunki trujące' }, ...speciesRows(ranking.dangerous));
  }

  rows.push({ kind: 'header', id: 'h-exact', title: 'Pełna zgodność · 100%' });
  rows.push(
    ...(ranking.exact.length > 0
      ? speciesRows(ranking.exact)
      : [{ kind: 'empty', id: 'e-exact', text: 'Żaden niegroźny gatunek nie zgadza się ze wszystkimi odpowiedziami.' } as const]),
  );

  rows.push({ kind: 'threshold', id: 'threshold' });
  rows.push({ kind: 'header', id: 'h-partial', title: `Częściowa zgodność · ≥ ${percent}%` });
  rows.push(
    ...(ranking.partial.length > 0
      ? speciesRows(ranking.partial)
      : [{ kind: 'empty', id: 'e-partial', text: 'Brak gatunków w tym zakresie.' } as const]),
  );

  for (const { stage, whole, hides, keys } of skipped) {
    rows.push({ kind: 'header', id: `h-skipped-${stage}`, title: `Pominięte · ${STAGE_COPY_PL[stage].name}` });
    if (whole) rows.push({ kind: 'skipped_stage', id: `st-${stage}`, stage, hides });
    else rows.push(...keys.map((key, index) => ({ kind: 'skipped', id: `k-${key}`, key, position: at(index, keys.length) }) as const));
  }

  return rows;
}

/** „Widoczne: 6 z 13 · ukryte progiem: 5 (w tym trujące: 2) · wykluczone: 2”. */
export function summarizeVisibility(ranking: SimilarityRanking, weatherHiddenCount = 0): string {
  const visible = ranking.exact.length + ranking.partial.length + ranking.dangerous.length;
  const hiddenDangerous = ranking.hiddenDangerous.length;
  const hidden = hiddenCount(ranking);
  const parts = [
    `Widoczne: ${visible} z ${ranking.total}`,
    `ukryte progiem: ${hidden}${hiddenDangerous > 0 ? ` (w tym trujące: ${hiddenDangerous})` : ''}`,
    ...(weatherHiddenCount > 0 ? [`poza pogodą: ${weatherHiddenCount}`] : []),
    `wykluczone: ${ranking.excludedIds.length}`,
  ];
  return parts.join(' · ');
}

function speciesRows(entries: readonly SimilarityEntry[]): ResultRow[] {
  return entries.map((entry, index) => ({
    kind: 'species',
    id: `s-${entry.species.id}`,
    entry,
    position: at(index, entries.length),
  }));
}

function at(index: number, length: number): GroupPosition {
  return { first: index === 0, last: index === length - 1 };
}
