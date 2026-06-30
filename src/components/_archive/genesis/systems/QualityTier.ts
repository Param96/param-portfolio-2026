/**
 * QualityTier — GPU capability detection and adaptive feature flags.
 *
 * Probes WebGL renderer strings, core count, and device memory to
 * bucket the user into one of four quality tiers, then returns a
 * feature-flag object that every visual system reads from.
 */

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type QualityTier = 'ultra' | 'high' | 'medium' | 'low';

export interface FeatureFlags {
  ssao: boolean;
  dof: boolean;
  volumetricFog: boolean;
  sssLeaves: boolean;
  particleMultiplier: number; // 1.0 | 0.5 | 0.2
  shadowCascades: number;     // 3 | 1
  postProcessing: boolean;
  staticBirds: boolean;
  simplifiedWater: boolean;
}

/* ------------------------------------------------------------------ */
/*  GPU scoring via renderer strings                                   */
/* ------------------------------------------------------------------ */

/** Known high-end desktop GPU patterns and their rough score. */
const GPU_SCORES: Array<{ pattern: RegExp; score: number }> = [
  // NVIDIA desktop / workstation
  { pattern: /RTX\s*40[89]0/i, score: 8000 },
  { pattern: /RTX\s*4070/i, score: 6000 },
  { pattern: /RTX\s*4060/i, score: 5000 },
  { pattern: /RTX\s*30[89]0/i, score: 6500 },
  { pattern: /RTX\s*3070/i, score: 5000 },
  { pattern: /RTX\s*3060/i, score: 4000 },
  { pattern: /RTX\s*20[89]0/i, score: 4000 },
  { pattern: /RTX\s*2070/i, score: 3500 },
  { pattern: /RTX\s*2060/i, score: 3000 },
  { pattern: /GTX\s*1080/i, score: 2800 },
  { pattern: /GTX\s*1070/i, score: 2400 },
  { pattern: /GTX\s*1060/i, score: 1800 },
  { pattern: /GTX\s*1650/i, score: 1600 },
  { pattern: /GTX\s*1050/i, score: 1200 },

  // AMD desktop
  { pattern: /RX\s*7900/i, score: 7500 },
  { pattern: /RX\s*7800/i, score: 5500 },
  { pattern: /RX\s*7600/i, score: 4000 },
  { pattern: /RX\s*6[89]00/i, score: 5500 },
  { pattern: /RX\s*6700/i, score: 4000 },
  { pattern: /RX\s*6600/i, score: 3000 },
  { pattern: /RX\s*5[67]00/i, score: 2800 },
  { pattern: /RX\s*580/i, score: 2000 },
  { pattern: /RX\s*570/i, score: 1700 },

  // Apple Silicon
  { pattern: /Apple\s*M[34]\s*(Max|Ultra)/i, score: 7000 },
  { pattern: /Apple\s*M[34]\s*Pro/i, score: 5500 },
  { pattern: /Apple\s*M[34]/i, score: 4000 },
  { pattern: /Apple\s*M2\s*(Max|Ultra)/i, score: 5500 },
  { pattern: /Apple\s*M2\s*Pro/i, score: 4000 },
  { pattern: /Apple\s*M2/i, score: 3200 },
  { pattern: /Apple\s*M1\s*(Max|Ultra)/i, score: 4000 },
  { pattern: /Apple\s*M1\s*Pro/i, score: 3200 },
  { pattern: /Apple\s*M1/i, score: 2500 },
  { pattern: /Apple\s*GPU/i, score: 2500 },

  // Integrated / low-end
  { pattern: /Intel.*Iris\s*Xe/i, score: 1200 },
  { pattern: /Intel.*Iris\s*Plus/i, score: 800 },
  { pattern: /Intel.*UHD/i, score: 600 },
  { pattern: /Intel.*HD\s*(Graphics|[4-6]\d{3})/i, score: 400 },
  { pattern: /Adreno\s*7/i, score: 1400 },
  { pattern: /Adreno\s*6[4-9]/i, score: 1000 },
  { pattern: /Adreno\s*6[0-3]/i, score: 600 },
  { pattern: /Adreno/i, score: 400 },
  { pattern: /Mali-G[7-9]/i, score: 900 },
  { pattern: /Mali/i, score: 400 },
  { pattern: /PowerVR/i, score: 350 },
];

/** Patterns that indicate a mobile / integrated GPU. */
const MOBILE_PATTERNS = [
  /Adreno/i,
  /Mali/i,
  /PowerVR/i,
  /Apple\s*GPU/i,
  /Intel.*HD/i,
  /Intel.*UHD/i,
  /Intel.*Iris\s*Plus/i,
];

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                   */
/* ------------------------------------------------------------------ */

/** Try to extract the unmasked renderer string from a throwaway canvas. */
function getRendererString(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      (canvas.getContext('webgl2') as WebGL2RenderingContext | null) ??
      (canvas.getContext('webgl') as WebGLRenderingContext | null);
    if (!gl) return '';

    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    if (ext) {
      return gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
    }

    return gl.getParameter(gl.RENDERER) as string;
  } catch {
    return '';
  }
}

function scoreFromRenderer(renderer: string): number {
  for (const { pattern, score } of GPU_SCORES) {
    if (pattern.test(renderer)) return score;
  }
  // Unknown — assume mid-range
  return 1500;
}

function isMobileGPU(renderer: string): boolean {
  return MOBILE_PATTERNS.some((p) => p.test(renderer));
}

function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

/**
 * Detect the quality tier for the current device.
 *
 * Call once at app startup and cache the result.
 */
export function detectQualityTier(): QualityTier {
  // Server-side fallback
  if (typeof window === 'undefined') return 'medium';

  const renderer = getRendererString();
  const gpuScore = scoreFromRenderer(renderer);
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as any).deviceMemory as number | undefined;
  const mobile = isTouchDevice() || isMobileGPU(renderer);

  // ----- Low tier -----
  if (mobile && gpuScore < 1200) return 'low';
  if (cores <= 2) return 'low';
  if (memory !== undefined && memory <= 2) return 'low';

  // ----- Medium tier -----
  if (mobile) return 'medium';
  if (gpuScore < 1000) return 'medium';
  if (memory !== undefined && memory <= 4) return 'medium';

  // ----- High tier -----
  if (gpuScore < 3000) return 'high';
  if (cores < 8) return 'high';

  // ----- Ultra tier -----
  return 'ultra';
}

/**
 * Map a quality tier to concrete feature flags consumed by
 * every visual system in Project Genesis.
 */
export function getFeatureFlags(tier: QualityTier): FeatureFlags {
  switch (tier) {
    case 'ultra':
      return {
        ssao: true,
        dof: true,
        volumetricFog: true,
        sssLeaves: true,
        particleMultiplier: 1.0,
        shadowCascades: 3,
        postProcessing: true,
        staticBirds: false,
        simplifiedWater: false,
      };

    case 'high':
      return {
        ssao: true,
        dof: true,
        volumetricFog: false,
        sssLeaves: true,
        particleMultiplier: 0.5,
        shadowCascades: 3,
        postProcessing: true,
        staticBirds: false,
        simplifiedWater: false,
      };

    case 'medium':
      return {
        ssao: false,
        dof: false,
        volumetricFog: false,
        sssLeaves: false,
        particleMultiplier: 0.2,
        shadowCascades: 1,
        postProcessing: true,
        staticBirds: true,
        simplifiedWater: true,
      };

    case 'low':
      return {
        ssao: false,
        dof: false,
        volumetricFog: false,
        sssLeaves: false,
        particleMultiplier: 0.2,
        shadowCascades: 1,
        postProcessing: false,
        staticBirds: true,
        simplifiedWater: true,
      };
  }
}
