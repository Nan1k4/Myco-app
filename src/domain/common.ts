/**
 * @file Typy narzędziowe współdzielone przez całą domenę. Brak zależności.
 * @module domain/common
 */

export type Brand<T, B extends string> = T & { readonly __brand: B };

export type NonEmptyArray<T> = readonly [T, ...T[]];

export function toNonEmptyArray<T>(items: readonly T[]): NonEmptyArray<T> | null {
  return items.length > 0 ? (items as NonEmptyArray<T>) : null;
}

export type IsoDate = `${number}-${number}-${number}`;

export type IsoDateTime = `${number}-${number}-${number}T${string}`;

export function toIsoDateTime(date: Date): IsoDateTime {
  return date.toISOString() as IsoDateTime;
}

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface NumericRange {
  readonly min: number;
  readonly max: number;
}