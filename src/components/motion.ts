/**
 * @file Presety animacji quizu (Reanimated). Jedno miejsce na czasy i kierunki.
 * `ReduceMotion.System` – przy włączonym „Ogranicz ruch” animacje są pomijane (HIG, a11y).
 * Uwaga: metody instancji builderów (`.delay()`) MUTUJĄ instancję – presetów nie modyfikujemy,
 * warianty tworzymy z metod statycznych (patrz {@link staggeredRise}).
 */
import {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  LinearTransition,
  ReduceMotion,
} from 'react-native-reanimated';
import { MOTION } from '../theme';

const SYSTEM = ReduceMotion.System;

export const TRANSITIONS = {
  forward: {
    in: FadeInRight.duration(MOTION.base).reduceMotion(SYSTEM),
    out: FadeOutLeft.duration(MOTION.fast).reduceMotion(SYSTEM),
  },
  back: {
    in: FadeInLeft.duration(MOTION.base).reduceMotion(SYSTEM),
    out: FadeOutRight.duration(MOTION.fast).reduceMotion(SYSTEM),
  },
} as const;

export const APPEAR = FadeIn.duration(MOTION.fast).reduceMotion(SYSTEM);
export const DISAPPEAR = FadeOut.duration(MOTION.fast).reduceMotion(SYSTEM);
export const RISE = FadeInDown.duration(MOTION.base).reduceMotion(SYSTEM);
export const REFLOW = LinearTransition.duration(MOTION.base).reduceMotion(SYSTEM);

export function staggeredList(index: number) {
  return FadeInDown.duration(MOTION.fast).delay(Math.min(index, 8) * 35).reduceMotion(SYSTEM);
}

export function staggeredRise(index: number) {
  return FadeInDown.duration(MOTION.base).delay(index * 60).reduceMotion(SYSTEM);
}
