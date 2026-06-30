/**
 * MaterialLibrary — factory functions for every Project Genesis material.
 *
 * All materials are procedural (no external textures). Each function
 * returns a **new instance** so that per-component uniforms and shader
 * patches never collide.
 *
 * Visual language: ancient craftsmanship, warm stone, bronze, frosted
 * glass, titanium, nature. Never neon, never default-3D-software.
 */
import * as THREE from 'three';

/* ================================================================== */
/*  Shared GLSL noise (injected via onBeforeCompile)                  */
/* ================================================================== */

/**
 * Simplex-style 3-D value noise (compact, good enough for stone grain).
 * This string is prepended to fragment shaders that need procedural detail.
 */
const NOISE_GLSL = /* glsl */ `
  // --- procedural noise (hash-based) ---
  vec3 _mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 _mod289v4(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 _permute(vec4 x) { return _mod289v4(((x * 34.0) + 1.0) * x); }
  vec4 _taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = _mod289(i);
    vec4 p = _permute(
      _permute(
        _permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 xx = x_ * ns.x + ns.yyyy;
    vec4 yy = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(xx) - abs(yy);

    vec4 b0 = vec4(xx.xy, yy.xy);
    vec4 b1 = vec4(xx.zw, yy.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = _taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

/**
 * Fragment-shader patch for travertine stone:
 * - multi-octave noise for color variation (warm ↔ cool streaks)
 * - sharp ridges for micro-crack lines
 * - slight roughness variation
 */
const TRAVERTINE_FRAGMENT_PATCH = /* glsl */ `
  // --- travertine surface variation ---
  vec3 wsPos = vWorldPosition;
  float scale = 2.8;

  // base noise layers
  float n1 = snoise(wsPos * scale);
  float n2 = snoise(wsPos * scale * 3.1 + 42.0) * 0.4;
  float n3 = snoise(wsPos * scale * 7.7 + 91.0) * 0.15;
  float grain = n1 + n2 + n3;

  // micro-crack lines (sharp ridges)
  float cracks = 1.0 - smoothstep(0.0, 0.06, abs(snoise(wsPos * vec3(4.0, 12.0, 4.0))));
  cracks *= 0.12;

  // color modulation: shift toward cooler or warmer tones
  vec3 warmTint  = vec3(0.90, 0.82, 0.68);  // sandy warm
  vec3 coolTint  = vec3(0.78, 0.76, 0.72);  // grey cool
  vec3 tinted = mix(warmTint, coolTint, grain * 0.5 + 0.5);

  // apply to diffuse
  diffuseColor.rgb *= mix(vec3(1.0), tinted, 0.35);
  diffuseColor.rgb -= cracks;

  // roughness micro-variation
  roughnessFactor += grain * 0.06;
  roughnessFactor = clamp(roughnessFactor, 0.0, 1.0);
`;

/* ================================================================== */
/*  Stone materials                                                    */
/* ================================================================== */

/**
 * Travertine — warm, porous stone with procedural micro-cracks.
 *
 * Uses `onBeforeCompile` to inject simplex noise into the fragment
 * shader for surface variation that makes each instance feel unique.
 */
export function createTravertineMaterial(): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#d4c4a8'),
    roughness: 0.88,
    metalness: 0.0,
    envMapIntensity: 0.6,
  });

  mat.onBeforeCompile = (shader) => {
    // Inject world-position varying (needed by noise)
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `#include <common>
       varying vec3 vWorldPosition;`,
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <worldpos_vertex>',
      `#include <worldpos_vertex>
       vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;`,
    );

    // Inject noise functions + travertine patch into fragment
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `#include <common>
       varying vec3 vWorldPosition;
       ${NOISE_GLSL}`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `#include <color_fragment>
       ${TRAVERTINE_FRAGMENT_PATCH}`,
    );
  };

  return mat;
}

/**
 * Limestone — cooler, slightly smoother cousin of travertine.
 * No onBeforeCompile noise — keeps it visually distinct.
 */
export function createLimestoneMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b8b0a0'),
    roughness: 0.82,
    metalness: 0.0,
    envMapIntensity: 0.5,
  });
}

/* ================================================================== */
/*  Metal materials                                                    */
/* ================================================================== */

/** Brushed bronze — warm, lightly polished. */
export function createBrushedBronzeMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#6e4e28'),
    roughness: 0.42,
    metalness: 0.96,
    envMapIntensity: 1.2,
  });
}

/** Dark (patinated) bronze — deep, near-mirror. */
export function createDarkBronzeMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3d2b14'),
    roughness: 0.28,
    metalness: 0.98,
    envMapIntensity: 1.4,
  });
}

/** Titanium — cool neutral metal. */
export function createTitaniumMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#8a8a90'),
    roughness: 0.18,
    metalness: 1.0,
    envMapIntensity: 1.0,
  });
}

/* ================================================================== */
/*  Glass / crystal materials                                          */
/* ================================================================== */

/** Frosted glass — translucent with slight blue tint. */
export function createFrostedGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#e8f0f4'),
    roughness: 0.12,
    metalness: 0.0,
    transmission: 0.92,
    ior: 1.52,
    thickness: 0.4,
    transparent: true,
    envMapIntensity: 0.8,
    side: THREE.DoubleSide,
  });
}

/** Crystal — near-perfect clarity, high IOR sparkle. */
export function createCrystalMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#ffffff'),
    roughness: 0.01,
    metalness: 0.0,
    transmission: 0.98,
    ior: 1.76,
    transparent: true,
    envMapIntensity: 1.5,
  });
}

/* ================================================================== */
/*  Special / emissive materials                                       */
/* ================================================================== */

/**
 * Energy vein — teal glow, toneMapped false so post-processing
 * bloom can pick it up.
 */
export function createEnergyVeinMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color('#1d9e75'),
    transparent: true,
    opacity: 0.9,
    toneMapped: false,
  });
}

/* ================================================================== */
/*  Water                                                              */
/* ================================================================== */

/** Shallow water — translucent teal, glass-like surface. */
export function createWaterMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#a8d5d0'),
    roughness: 0.05,
    metalness: 0.0,
    transmission: 0.8,
    ior: 1.33,
    thickness: 0.6,
    transparent: true,
    envMapIntensity: 0.7,
    side: THREE.DoubleSide,
  });
}
