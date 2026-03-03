/**
 * Centralized animation configuration for Villa Aurea.
 * All easing curves, spring presets, durations, and viewport settings.
 */

// Cubic bezier easing curves (Framer Motion format: [x1, y1, x2, y2])
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 0.1, 0.25, 1];
export const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_MASK_REVEAL: [number, number, number, number] = [0.77, 0, 0.175, 1];

// Spring presets (mass, stiffness, damping)
export const SPRING_BOUNCY = { type: 'spring' as const, stiffness: 300, damping: 20, mass: 0.8 };
export const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 30, mass: 1 };
export const SPRING_MAGNETIC = { type: 'spring' as const, stiffness: 150, damping: 15, mass: 0.5 };
export const SPRING_GENTLE = { type: 'spring' as const, stiffness: 80, damping: 25, mass: 1.2 };

// Duration constants (seconds)
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.4,
  heroSequence: 2.5,
} as const;

// Stagger delays (seconds)
export const STAGGER = {
  fast: 0.06,
  normal: 0.1,
  slow: 0.15,
  word: 0.08,
  character: 0.03,
} as const;

// Viewport trigger configuration
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;
export const VIEWPORT_REPEAT = { once: false, amount: 0.2 } as const;

// Hero sequence timings (seconds from page load)
export const HERO_TIMING = {
  background: 0,
  goldLine: 0.3,
  titleFirst: 0.6,
  titleSecond: 0.8,
  tagline: 1.1,
  cta: 1.4,
  badge: 1.8,
  scrollIndicator: 2.2,
} as const;
