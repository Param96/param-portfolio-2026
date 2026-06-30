/**
 * SpringPhysics — universal damped-spring animator.
 *
 * Every animated value in Project Genesis flows through these functions
 * so that nothing ever moves linearly or with CSS easing.
 *
 * The model is a critically-under-damped spring:
 *   acceleration = -k * (current - target)
 *   velocity     = (velocity + acceleration) * damping
 *   value        = current + velocity
 */
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface SpringState {
  value: number;
  velocity: number;
}

export interface SpringVec3State {
  value: THREE.Vector3;
  velocity: THREE.Vector3;
}

/* ------------------------------------------------------------------ */
/*  Weight-class presets                                               */
/* ------------------------------------------------------------------ */

/** Spring constant (k) and damping (d) tuned per perceived mass. */
export const SPRING_PRESETS = {
  /** Large travertine blocks, pillars */
  massive: { k: 0.006, d: 0.95 },
  /** Bronze rings, smaller stone elements */
  heavy: { k: 0.012, d: 0.92 },
  /** Glass panels, bridge segments */
  medium: { k: 0.022, d: 0.87 },
  /** Leaves, dust, water surface ripples */
  light: { k: 0.038, d: 0.82 },
  /** Drone hover, bird wingbeat */
  micro: { k: 0.055, d: 0.76 },
} as const;

export type SpringPreset = keyof typeof SPRING_PRESETS;

/* ------------------------------------------------------------------ */
/*  Default constants                                                  */
/* ------------------------------------------------------------------ */

const DEFAULT_K = 0.018;
const DEFAULT_D = 0.88;

/* ------------------------------------------------------------------ */
/*  Scalar spring                                                      */
/* ------------------------------------------------------------------ */

/**
 * Advance a single scalar spring one tick.
 *
 * @param current  - current value
 * @param target   - target value to converge toward
 * @param velocity - current velocity (mutated each frame)
 * @param k        - spring constant (stiffness), default 0.018
 * @param d        - damping ratio (0–1, higher = more damped), default 0.88
 * @returns the new {@link SpringState}
 */
export function springUpdate(
  current: number,
  target: number,
  velocity: number,
  k: number = DEFAULT_K,
  d: number = DEFAULT_D,
): SpringState {
  const acceleration = -k * (current - target);
  const nextVelocity = (velocity + acceleration) * d;
  const nextValue = current + nextVelocity;

  return { value: nextValue, velocity: nextVelocity };
}

/* ------------------------------------------------------------------ */
/*  Vec3 spring                                                        */
/* ------------------------------------------------------------------ */

// Scratch vectors so we never allocate per frame
const _acc = new THREE.Vector3();
const _outVal = new THREE.Vector3();
const _outVel = new THREE.Vector3();

/**
 * Advance a THREE.Vector3 spring one tick.
 *
 * The returned vectors are **new instances** so the caller can store
 * them safely (but the intermediate math reuses scratch vectors).
 *
 * @param current  - current position
 * @param target   - target position
 * @param velocity - current velocity
 * @param k        - spring constant, default 0.018
 * @param d        - damping ratio, default 0.88
 */
export function springUpdateVec3(
  current: THREE.Vector3,
  target: THREE.Vector3,
  velocity: THREE.Vector3,
  k: number = DEFAULT_K,
  d: number = DEFAULT_D,
): SpringVec3State {
  // acceleration = -k * (current - target)
  _acc.copy(current).sub(target).multiplyScalar(-k);

  // velocity = (velocity + acceleration) * damping
  _outVel
    .copy(velocity)
    .add(_acc)
    .multiplyScalar(d);

  // value = current + velocity
  _outVal.copy(current).add(_outVel);

  return {
    value: _outVal.clone(),
    velocity: _outVel.clone(),
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

/**
 * Convenience: apply a preset by name.
 *
 * ```ts
 * const s = springUpdateWithPreset(cur, tgt, vel, 'heavy');
 * ```
 */
export function springUpdateWithPreset(
  current: number,
  target: number,
  velocity: number,
  preset: SpringPreset,
): SpringState {
  const { k, d } = SPRING_PRESETS[preset];
  return springUpdate(current, target, velocity, k, d);
}

/**
 * Vec3 version of {@link springUpdateWithPreset}.
 */
export function springUpdateVec3WithPreset(
  current: THREE.Vector3,
  target: THREE.Vector3,
  velocity: THREE.Vector3,
  preset: SpringPreset,
): SpringVec3State {
  const { k, d } = SPRING_PRESETS[preset];
  return springUpdateVec3(current, target, velocity, k, d);
}
