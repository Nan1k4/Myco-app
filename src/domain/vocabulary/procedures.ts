/**
 * @file Czynności potrzebne do wiarygodnej obserwacji cechy – podstawa asymetrii dowodowej
 * @module domain/vocabulary/procedures
 */

export const OBSERVATION_PROCEDURES = [
  'look',
  'touch',
  'cut',
  'dig_base',
  'spore_print',
  'smell', 
  'taste', 
] as const;
/** @see OBSERVATION_PROCEDURES */
export type ObservationProcedure = (typeof OBSERVATION_PROCEDURES)[number];

/** Właściwości czynności istotne dla Bramki i UI. */
export interface ProcedureProfile {
  readonly destructive: boolean;
  readonly minWaitMinutes: number;
  readonly forbiddenWithDangerousCandidate: boolean;
}

export const PROCEDURE_PROFILES = {
  look: { destructive: false, minWaitMinutes: 0, forbiddenWithDangerousCandidate: false },
  touch: { destructive: false, minWaitMinutes: 0, forbiddenWithDangerousCandidate: false },
  cut: { destructive: true, minWaitMinutes: 1, forbiddenWithDangerousCandidate: false },
  dig_base: { destructive: true, minWaitMinutes: 0, forbiddenWithDangerousCandidate: false },
  spore_print: { destructive: true, minWaitMinutes: 120, forbiddenWithDangerousCandidate: false },
  smell: { destructive: false, minWaitMinutes: 0, forbiddenWithDangerousCandidate: false },
  taste: { destructive: false, minWaitMinutes: 0, forbiddenWithDangerousCandidate: true },
} as const satisfies Readonly<Record<ObservationProcedure, ProcedureProfile>>;

export function procedureCost(procedure: ObservationProcedure): number {
  const { minWaitMinutes, destructive } = PROCEDURE_PROFILES[procedure];
  return minWaitMinutes * 2 + (destructive ? 1 : 0);
}
