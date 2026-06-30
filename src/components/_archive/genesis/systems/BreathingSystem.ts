/**
 * BreathingSystem — the "pulse" of the entire scene.
 *
 * A single sine wave (3.2 s period) that every visual system
 * samples each frame. Because everything breathes together the
 * scene feels alive and unified rather than randomly noisy.
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface BreathingEffects {
  /** Core monolith / pillar scale factor (0.97 – 1.03) */
  coreScale: number;
  /** Water surface displacement multiplier (0.4 – 1.0) */
  waterDisplacement: number;
  /** Leaf wind noise amplitude (0.3 – 0.7) */
  leafWindAmplitude: number;
  /** Boids cohesion weight (0.8 – 1.2) */
  boidsCohesion: number;
  /** Glass panel vibration offset (0.01 – 0.025) */
  glassVibration: number;
  /** Ambient light intensity (0.22 – 0.28) */
  ambientLight: number;
  /** Bronze ring rotation speed multiplier (0.9 – 1.1) */
  ringSpeedMultiplier: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

/** Period of the breathing cycle in seconds. */
const PERIOD = 3.2;

/** Angular frequency for the sine wave. */
const OMEGA = (Math.PI * 2) / PERIOD;

/* ------------------------------------------------------------------ */
/*  Core phase function                                                */
/* ------------------------------------------------------------------ */

/**
 * Return the current breathing phase as a 0–1 value.
 *
 * - 0.0 → full "exhale" (trough)
 * - 0.5 → midpoint (crossing upward)
 * - 1.0 → full "inhale" (peak)
 *
 * @param elapsedTime - seconds since the experience started
 */
export function getBreathingPhase(elapsedTime: number): number {
  return 0.5 + 0.5 * Math.sin(elapsedTime * OMEGA);
}

/* ------------------------------------------------------------------ */
/*  Effect mapper                                                      */
/* ------------------------------------------------------------------ */

/** Linearly map phase (0–1) into [min, max]. */
function lerp(min: number, max: number, t: number): number {
  return min + (max - min) * t;
}

/**
 * Convert a raw 0–1 phase into concrete per-system effect values.
 *
 * Each range is intentionally subtle — the breathing should be
 * *felt* more than consciously noticed.
 */
export function getBreathingEffects(phase: number): BreathingEffects {
  return {
    coreScale: lerp(0.97, 1.03, phase),
    waterDisplacement: lerp(0.4, 1.0, phase),
    leafWindAmplitude: lerp(0.3, 0.7, phase),
    boidsCohesion: lerp(0.8, 1.2, phase),
    glassVibration: lerp(0.01, 0.025, phase),
    ambientLight: lerp(0.22, 0.28, phase),
    ringSpeedMultiplier: lerp(0.9, 1.1, phase),
  };
}

/* ------------------------------------------------------------------ */
/*  Convenience                                                        */
/* ------------------------------------------------------------------ */

/**
 * One-call shorthand: get effects directly from elapsed time.
 *
 * ```ts
 * useFrame(({ clock }) => {
 *   const fx = getBreathingEffectsAtTime(clock.elapsedTime);
 * });
 * ```
 */
export function getBreathingEffectsAtTime(elapsedTime: number): BreathingEffects {
  return getBreathingEffects(getBreathingPhase(elapsedTime));
}
