/**
 * Project Genesis — GLSL Shader Module
 *
 * All shaders live as inline template-literal strings because Next.js
 * cannot natively import .glsl files. Every export is a named string
 * constant consumable by THREE.RawShaderMaterial / ShaderMaterial.
 *
 * Target: WebGL2 / GLSL 300 es
 */

/* ------------------------------------------------------------------ */
/*  Helper: 3D Simplex Noise                                          */
/* ------------------------------------------------------------------ */

/**
 * Ashima Arts 3D simplex noise, condensed for inline embedding.
 * Paste this into any shader that needs organic displacement.
 */
export const simplexNoise3D: string = /* glsl */ `
// --- 3D Simplex Noise (Ashima Arts) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  // First corner
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  // Other corners
  vec3 g  = step(x0.yzx, x0.xyz);
  vec3 l  = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  // Permutations
  i = mod289(i);
  vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  // Gradients: 7x7 points over a square, mapped onto an octahedron
  float n_ = 0.142857142857; // 1.0 / 7.0
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x  = x_ * ns.x + ns.yyyy;
  vec4 y  = y_ * ns.x + ns.yyyy;
  vec4 h  = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  // Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  // Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

/* ------------------------------------------------------------------ */
/*  1. Film Grain Post-Processing Fragment Shader                     */
/* ------------------------------------------------------------------ */

export const grainFragmentShader: string = /* glsl */ `
precision highp float;

uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uGrainIntensity; // ~0.06
uniform vec2  uResolution;

in vec2 vUv;
out vec4 fragColor;

// --- Quick hash for grain ---
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

void main() {
  // --- Chromatic aberration at edges (0.3px offset) ---
  vec2 center   = vUv - 0.5;
  float distSq  = dot(center, center);
  float caStr   = distSq * 0.3 / uResolution.x; // 0.3px scaled

  float r = texture(tDiffuse, vUv + vec2( caStr, 0.0)).r;
  float g = texture(tDiffuse, vUv).g;
  float b = texture(tDiffuse, vUv + vec2(-caStr, 0.0)).b;
  vec3 color = vec3(r, g, b);

  // --- Film grain: 64x64 effective grain, quantized to every 3 frames (~20fps) ---
  float quantizedTime = floor(uTime * 20.0) / 20.0;
  vec2 grainUv = floor(vUv * uResolution / 64.0); // 64x64 block size
  float grain  = hash(grainUv + quantizedTime * 137.0) - 0.5;

  // Additive grain mix
  color += grain * uGrainIntensity;

  // --- Radial vignette (0.4 intensity) ---
  float vignette = 1.0 - distSq * 4.0 * 0.4;
  vignette = clamp(vignette, 0.0, 1.0);
  color *= vignette;

  fragColor = vec4(color, 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  2. Morph Vertex Shader (Scene 2 — Object Materialization)         */
/* ------------------------------------------------------------------ */

export const morphVertexShader: string = /* glsl */ `
precision highp float;

uniform float uProgress; // 0 = chaos, 1 = rest
uniform float uTime;
uniform float uSeed;     // per-object random seed
uniform mat4  modelMatrix;
uniform mat4  viewMatrix;
uniform mat4  projectionMatrix;
uniform mat3  normalMatrix;

in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 vNormal;
out vec3 vPosition;
out vec2 vUv;
out float vProgress;

// --- Inline 3D simplex noise ---
${simplexNoise3D}

void main() {
  // Smooth interpolation from chaos to rest
  float t = smoothstep(0.0, 1.0, uProgress);

  // Noise-based displacement when uProgress is near 0
  vec3 noiseInput = position * 0.05 + uSeed * 10.0 + uTime * 0.3;
  vec3 displacement = vec3(
    snoise(noiseInput),
    snoise(noiseInput + 100.0),
    snoise(noiseInput + 200.0)
  ) * 50.0; // amplitude ~50 units

  // Displaced position: lerp between chaotic and original
  vec3 displacedPos = mix(position + displacement, position, t);

  // Subtle vertex wobble even at rest (amplitude 0.02)
  float wobble = snoise(position * 2.0 + uTime * 1.5) * 0.02;
  displacedPos += normal * wobble;

  // Transform
  vec4 worldPos = modelMatrix * vec4(displacedPos, 1.0);
  vPosition = worldPos.xyz;
  vNormal   = normalize(normalMatrix * normal);
  vUv       = uv;
  vProgress = uProgress;

  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

/* ------------------------------------------------------------------ */
/*  3. Morph Fragment Shader (companion to morphVertex)               */
/* ------------------------------------------------------------------ */

export const morphFragmentShader: string = /* glsl */ `
precision highp float;

uniform vec3  uColor;       // material base color
uniform float uRoughness;   // PBR roughness
uniform float uMetalness;   // PBR metalness
uniform float uProgress;    // 0→1 materialization
uniform float uTime;

in vec3  vNormal;
in vec3  vPosition;
in vec2  vUv;
in float vProgress;

out vec4 fragColor;

void main() {
  // --- Simple directional light ---
  vec3 lightDir  = normalize(vec3(0.5, 1.0, 0.3));
  vec3 viewDir   = normalize(cameraPosition - vPosition);
  vec3 halfDir   = normalize(lightDir + viewDir);
  vec3 N         = normalize(vNormal);

  // Ambient
  vec3 ambient = uColor * 0.15;

  // Diffuse (Lambert)
  float NdotL  = max(dot(N, lightDir), 0.0);
  vec3 diffuse = uColor * NdotL * (1.0 - uMetalness);

  // Specular (Blinn-Phong, roughness-modulated)
  float shininess = mix(256.0, 8.0, uRoughness);
  float NdotH     = max(dot(N, halfDir), 0.0);
  float spec      = pow(NdotH, shininess);
  vec3 specColor  = mix(vec3(0.04), uColor, uMetalness);
  vec3 specular   = specColor * spec;

  vec3 color = ambient + diffuse + specular;

  // --- Edge glow during materialization (uProgress < 0.8) ---
  float edgeFactor = 1.0 - abs(dot(N, viewDir)); // Fresnel-like edge
  edgeFactor = pow(edgeFactor, 3.0);

  float glowStrength = smoothstep(0.8, 0.0, uProgress); // fades as materialization completes
  vec3 tealGlow = vec3(0.114, 0.620, 0.459); // #1d9e75 approx
  color += tealGlow * edgeFactor * glowStrength * 2.0;

  fragColor = vec4(color, 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  4. Water Surface — Vertex Shader                                  */
/* ------------------------------------------------------------------ */

export const waterVertexShader: string = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uDisplacement; // driven by breathing system
uniform mat4  modelMatrix;
uniform mat4  viewMatrix;
uniform mat4  projectionMatrix;
uniform mat3  normalMatrix;

in vec3 position;
in vec3 normal;
in vec2 uv;

out vec3 vNormal;
out vec3 vPosition;
out vec2 vUv;
out vec3 vWorldNormal;
out vec4 vScreenPos;

void main() {
  vec3 pos = position;

  // --- Dual-layer sine wave displacement ---
  // Wave 1: amplitude 0.3, frequency 2.0, speed 0.5
  float wave1 = sin(pos.x * 2.0 + uTime * 0.5) *
                cos(pos.z * 2.0 + uTime * 0.5) * 0.3;

  // Wave 2: amplitude 0.15, frequency 3.5, speed -0.3 (90° rotated)
  float wave2 = sin(pos.z * 3.5 - uTime * 0.3) *
                cos(pos.x * 3.5 - uTime * 0.3) * 0.15;

  // Combine waves with breathing displacement
  pos.y += (wave1 + wave2) * (1.0 + uDisplacement * 0.3);

  // Approximate displaced normal via partial derivatives
  float eps = 0.01;
  float hx1 = sin((pos.x + eps) * 2.0 + uTime * 0.5) * cos(pos.z * 2.0 + uTime * 0.5) * 0.3
            + sin(pos.z * 3.5 - uTime * 0.3) * cos((pos.x + eps) * 3.5 - uTime * 0.3) * 0.15;
  float hx0 = sin((pos.x - eps) * 2.0 + uTime * 0.5) * cos(pos.z * 2.0 + uTime * 0.5) * 0.3
            + sin(pos.z * 3.5 - uTime * 0.3) * cos((pos.x - eps) * 3.5 - uTime * 0.3) * 0.15;
  float hz1 = sin(pos.x * 2.0 + uTime * 0.5) * cos((pos.z + eps) * 2.0 + uTime * 0.5) * 0.3
            + sin((pos.z + eps) * 3.5 - uTime * 0.3) * cos(pos.x * 3.5 - uTime * 0.3) * 0.15;
  float hz0 = sin(pos.x * 2.0 + uTime * 0.5) * cos((pos.z - eps) * 2.0 + uTime * 0.5) * 0.3
            + sin((pos.z - eps) * 3.5 - uTime * 0.3) * cos(pos.x * 3.5 - uTime * 0.3) * 0.15;

  vec3 displacedNormal = normalize(vec3(
    -(hx1 - hx0) / (2.0 * eps),
    1.0,
    -(hz1 - hz0) / (2.0 * eps)
  ));

  vec4 worldPos = modelMatrix * vec4(pos, 1.0);

  vPosition    = worldPos.xyz;
  vNormal      = displacedNormal;
  vWorldNormal = normalize(normalMatrix * displacedNormal);
  vUv          = uv;
  vScreenPos   = projectionMatrix * viewMatrix * worldPos;

  gl_Position = vScreenPos;
}
`;

/* ------------------------------------------------------------------ */
/*  4b. Water Surface — Fragment Shader                               */
/* ------------------------------------------------------------------ */

export const waterFragmentShader: string = /* glsl */ `
precision highp float;

uniform sampler2D tDiffuse;    // scene texture for refraction
uniform float     uTime;
uniform float     uDisplacement;
uniform vec2      uResolution;

in vec3 vNormal;
in vec3 vPosition;
in vec2 vUv;
in vec3 vWorldNormal;
in vec4 vScreenPos;

out vec4 fragColor;

void main() {
  // Screen-space UVs
  vec2 screenUv = (vScreenPos.xy / vScreenPos.w) * 0.5 + 0.5;

  // --- Fresnel-based reflection / refraction blend ---
  vec3 viewDir  = normalize(cameraPosition - vPosition);
  vec3 N        = normalize(vNormal);
  float fresnel = pow(1.0 - max(dot(viewDir, N), 0.0), 4.0);
  fresnel = clamp(fresnel, 0.05, 0.95);

  // Refraction: offset screen UV by normal distortion
  vec2 refractionOffset = N.xz * 0.02;
  vec3 refractedColor   = texture(tDiffuse, screenUv + refractionOffset).rgb;

  // Deep teal base color
  vec3 deepTeal   = vec3(0.165, 0.420, 0.369); // #2a6b5e
  vec3 lightTeal  = vec3(0.286, 0.631, 0.545); // lighter edge

  // Blend base color by depth (using normal.y as proxy)
  vec3 waterColor = mix(deepTeal, lightTeal, smoothstep(0.7, 1.0, N.y));

  // Reflection color (sky approximation)
  vec3 reflectionColor = mix(waterColor * 1.3, vec3(0.6, 0.7, 0.75), 0.3);

  // Combine refraction + reflection via Fresnel
  vec3 color = mix(refractedColor * waterColor, reflectionColor, fresnel);

  // --- Foam at edges where normal is steep ---
  float foamThreshold = 0.85;
  float foam = smoothstep(foamThreshold, 1.0, N.y) * 0.4;
  color += vec3(foam);

  // Subtle depth-based opacity
  float alpha = mix(0.7, 0.9, fresnel);

  fragColor = vec4(color, alpha);
}
`;

/* ------------------------------------------------------------------ */
/*  5. Pulse Wave Shockwave — Fragment Shader (Scene 4)               */
/* ------------------------------------------------------------------ */

export const pulseWaveFragmentShader: string = /* glsl */ `
precision highp float;

uniform sampler2D tDiffuse;
uniform vec2  uCenter;     // screen-space center (0–1)
uniform float uRadius;     // current expanding radius
uniform float uIntensity;  // overall effect strength
uniform float uTime;
uniform vec2  uResolution;

in vec2 vUv;
out vec4 fragColor;

void main() {
  vec2 uv = vUv;

  // Aspect-corrected distance from center
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 diff   = (uv - uCenter) * aspect;
  float dist  = length(diff);

  // --- SDF ring with Gaussian falloff over 40-unit band ---
  // The "band" is 40px relative to resolution, normalized
  float bandWidth   = 40.0 / uResolution.y;
  float ringDist    = abs(dist - uRadius);
  float ringFalloff = exp(-ringDist * ringDist / (2.0 * bandWidth * bandWidth));

  // --- Barrel distortion behind wave ---
  float distortionStr = ringFalloff * uIntensity * 0.03;
  vec2 distortedUv    = uv + normalize(diff + 0.0001) * distortionStr;

  // Sample scene with distortion
  vec3 sceneColor = texture(tDiffuse, distortedUv).rgb;

  // --- Teal emission at wavefront (#1d9e75) ---
  vec3 tealEmission = vec3(0.114, 0.620, 0.459);
  float emissionStr = ringFalloff * uIntensity;

  // Exponential falloff behind wavefront (only where dist < uRadius)
  float behindWave = smoothstep(uRadius, uRadius - bandWidth * 4.0, dist);
  float trailFalloff = exp(-behindWave * 3.0) * uIntensity * 0.3;

  // Combine
  vec3 color = sceneColor + tealEmission * emissionStr + tealEmission * trailFalloff * 0.2;

  fragColor = vec4(color, 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  6. Energy Vein — Vertex Shader (Intelligence Core glow tubes)     */
/* ------------------------------------------------------------------ */

export const energyVeinVertexShader: string = /* glsl */ `
precision highp float;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

in vec3 position;
in vec2 uv;

out vec2 vUv;
out vec3 vPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vPosition = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`;

/* ------------------------------------------------------------------ */
/*  6b. Energy Vein — Fragment Shader                                 */
/* ------------------------------------------------------------------ */

export const energyVeinFragmentShader: string = /* glsl */ `
precision highp float;

uniform float uTime;

in vec2 vUv;
in vec3 vPosition;

out vec4 fragColor;

// Constant
const float PI = 3.14159265359;

void main() {
  // --- UV scrolling along tube length (speed ~0.8) ---
  float scrolledV = fract(vUv.y - uTime * 0.8);

  // Pulse pattern: repeating bright bands
  float pulse = smoothstep(0.0, 0.15, scrolledV) * smoothstep(0.5, 0.35, scrolledV);

  // --- Heartbeat opacity modulation at 0.8Hz ---
  // 0.6 + 0.4 * sin(uTime * 0.8 * 2π)
  float heartbeat = 0.6 + 0.4 * sin(uTime * 0.8 * 2.0 * PI);

  // --- Edge glow: brighter at tube edges (UV.x distance from center) ---
  float edgeDist = abs(vUv.x - 0.5) * 2.0; // 0 at center, 1 at edge
  float edgeGlow = pow(edgeDist, 2.0) * 0.6 + 0.4;

  // Teal color (#1d9e75)
  vec3 tealColor = vec3(0.114, 0.620, 0.459);

  // Combine: pulse * heartbeat * edge glow
  float intensity = pulse * heartbeat * edgeGlow;

  // Additive blending output (toneMapped = false for bloom trigger)
  vec3 color = tealColor * intensity * 2.5; // boost for bloom
  float alpha = intensity * heartbeat;

  fragColor = vec4(color, alpha);
}
`;

/* ------------------------------------------------------------------ */
/*  7. Color Grade Post-Process — Fragment Shader                     */
/* ------------------------------------------------------------------ */

export const colorGradeFragmentShader: string = /* glsl */ `
precision highp float;

uniform sampler2D tDiffuse;
uniform float uSceneProgress; // 0→1 over 60 seconds

in vec2 vUv;
out vec4 fragColor;

// --- Utility: RGB ↔ HSL conversion ---
vec3 rgb2hsl(vec3 c) {
  float maxC = max(c.r, max(c.g, c.b));
  float minC = min(c.r, min(c.g, c.b));
  float l    = (maxC + minC) * 0.5;
  float s    = 0.0;
  float h    = 0.0;

  if (maxC != minC) {
    float d = maxC - minC;
    s = l > 0.5 ? d / (2.0 - maxC - minC) : d / (maxC + minC);

    if (maxC == c.r)      h = (c.g - c.b) / d + (c.g < c.b ? 6.0 : 0.0);
    else if (maxC == c.g) h = (c.b - c.r) / d + 2.0;
    else                  h = (c.r - c.g) / d + 4.0;
    h /= 6.0;
  }
  return vec3(h, s, l);
}

float hue2rgb(float p, float q, float t) {
  if (t < 0.0) t += 1.0;
  if (t > 1.0) t -= 1.0;
  if (t < 1.0 / 6.0) return p + (q - p) * 6.0 * t;
  if (t < 1.0 / 2.0) return q;
  if (t < 2.0 / 3.0) return p + (q - p) * (2.0 / 3.0 - t) * 6.0;
  return p;
}

vec3 hsl2rgb(vec3 hsl) {
  float h = hsl.x, s = hsl.y, l = hsl.z;
  if (s == 0.0) return vec3(l);
  float q = l < 0.5 ? l * (1.0 + s) : l + s - l * s;
  float p = 2.0 * l - q;
  return vec3(
    hue2rgb(p, q, h + 1.0 / 3.0),
    hue2rgb(p, q, h),
    hue2rgb(p, q, h - 1.0 / 3.0)
  );
}

// --- S-curve contrast ---
vec3 sCurve(vec3 color, float strength) {
  // Attempt smooth S-curve via smoothstep centered at 0.5
  vec3 curved = smoothstep(vec3(0.0), vec3(1.0), color);
  return mix(color, curved, strength);
}

// --- Color temperature shift (approximate Kelvin white-balance) ---
vec3 applyTemperature(vec3 color, float tempK) {
  // Simplified: < 6500K = warm (boost red, reduce blue)
  float warmth = clamp((6500.0 - tempK) / 3500.0, -1.0, 1.0);
  color.r += warmth * 0.04;
  color.b -= warmth * 0.04;
  return clamp(color, 0.0, 1.0);
}

void main() {
  vec3 color = texture(tDiffuse, vUv).rgb;
  float p    = uSceneProgress;

  // Convert to HSL for manipulation
  vec3 hsl = rgb2hsl(color);

  // --- Phase 1: Scenes 1–3 (progress 0–0.37) ---
  // Desaturated 80%, shadows lifted to 8%, blue-green tint
  float phase1 = smoothstep(0.37, 0.30, p); // 1.0 during phase, fades out
  if (phase1 > 0.0) {
    // Desaturate to 20% of original
    hsl.y *= mix(1.0, 0.2, phase1);

    // Lift shadows (add to luminance floor)
    hsl.z = mix(hsl.z, max(hsl.z, 0.08), phase1);

    // Blue-green tint: shift hue toward ~0.48 (teal region)
    hsl.x = mix(hsl.x, mix(hsl.x, 0.48, 0.15), phase1);
  }

  // --- Phase 2: Scene 4 pulse (progress 0.37–0.53) ---
  // Momentary hue rotation +14°, saturation spike to 180%
  float phase2Center = 0.45;
  float phase2 = 1.0 - smoothstep(0.0, 0.08, abs(p - phase2Center));
  if (phase2 > 0.0) {
    // Hue rotation: +14° = +14/360 ≈ +0.0389
    hsl.x = fract(hsl.x + 0.0389 * phase2);

    // Saturation spike to 180%
    hsl.y *= mix(1.0, 1.8, phase2);
  }

  // --- Phase 3: Scenes 5–6 (progress 0.53–0.92) ---
  // Warm highlights 3200K, teal shadows, S-curve contrast
  float phase3 = smoothstep(0.53, 0.60, p) * smoothstep(0.92, 0.85, p);

  // Convert back to RGB for temperature/contrast ops
  color = hsl2rgb(hsl);

  if (phase3 > 0.0) {
    // Warm highlights at 3200K
    color = mix(color, applyTemperature(color, 3200.0), phase3);

    // Teal shadow tinting: add teal to dark regions
    vec3 tealShadow = vec3(0.114, 0.620, 0.459);
    float shadowMask = smoothstep(0.3, 0.0, dot(color, vec3(0.299, 0.587, 0.114)));
    color = mix(color, mix(color, tealShadow * 0.3, shadowMask), phase3);

    // S-curve contrast
    color = mix(color, sCurve(color, 0.6), phase3);
  }

  // --- Phase 4: Scene 7 (progress 0.92–1.0) ---
  // Animate toward neutral/clean UI palette
  float phase4 = smoothstep(0.92, 1.0, p);
  if (phase4 > 0.0) {
    // Gradually restore saturation and neutral white balance
    vec3 neutral = sCurve(color, 0.3);
    neutral = applyTemperature(neutral, 6500.0); // daylight neutral
    color = mix(color, neutral, phase4);
  }

  // --- Global subtle S-curve (always active) ---
  color = sCurve(color, 0.15);

  fragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  8. Grass Vertex Shader                                            */
/* ------------------------------------------------------------------ */

export const grassVertexShader: string = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uWindStrength;
uniform float uWindFrequency;
uniform vec2 uCursorPos;          // world space XZ
uniform float uCursorRadius;
uniform float uGrowthProgress;    // 0→1

attribute vec2 aGrassBase;        // world XZ of this grass blade base
attribute float aGrassPhase;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  // Height-based UV (0 at base, 1 at tip)
  float heightFactor = uv.y;
  
  // Growth: scale Y from 0 to full height
  float growthEase = 1.0 - pow(1.0 - uGrowthProgress, 3.0);
  float scaledHeight = position.y * growthEase;
  
  // Wind displacement
  float windPhase = uTime * uWindFrequency + aGrassPhase + aGrassBase.x * 0.5;
  float windX = sin(windPhase) * uWindStrength * heightFactor * heightFactor;
  float windZ = cos(windPhase * 0.7 + 1.1) * uWindStrength * 0.4 * heightFactor;
  
  // Cursor influence — magnetic bend toward cursor
  vec2 toCursor = uCursorPos - aGrassBase;
  float cursorDist = length(toCursor);
  float influence = smoothstep(uCursorRadius, 0.0, cursorDist) * heightFactor;
  vec2 cursorBend = normalize(toCursor + vec2(0.001)) * influence * 0.3;
  
  vec3 pos = vec3(
    position.x + windX + cursorBend.x,
    scaledHeight,
    position.z + windZ + cursorBend.y
  );
  
  vec4 worldPosition = modelMatrix * instanceMatrix * vec4(pos, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
}
`;

/* ------------------------------------------------------------------ */
/*  9. Grass Fragment Shader                                          */
/* ------------------------------------------------------------------ */

export const grassFragmentShader: string = /* glsl */ `
precision highp float;

uniform vec3 uColorBottom;
uniform vec3 uColorTop;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vec3 color = mix(uColorBottom, uColorTop, vUv.y);
  
  // Simple shading
  float light = clamp(dot(normalize(vec3(0.5, 1.0, 0.3)), vec3(0.0, 1.0, 0.0)), 0.0, 1.0);
  color *= mix(0.6, 1.0, light);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  10. Moss Growth Shader (Vertex Displacement)                      */
/* ------------------------------------------------------------------ */

export const mossGrowthShader: string = /* glsl */ `
uniform float uTime;
uniform float uBirthTime;
uniform vec2 uOrigin;
attribute float aGrowthDelay;

varying vec2 vUv;

void main() {
  vUv = uv;
  float age = uTime - uBirthTime - aGrowthDelay;
  float progress = clamp(age / 0.4, 0.0, 1.0);
  // Eased growth
  float ease = 1.0 - pow(1.0 - progress, 3.0);
  vec3 pos = position;
  pos.y *= ease;
  // Micro-sway after full growth
  if (progress >= 1.0) {
    float sway = sin(uTime * 1.2 + aGrowthDelay * 10.0) * 0.02;
    pos.x += sway;
  }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

/* ------------------------------------------------------------------ */
/*  11. Root Pulse Fragment Shader                                    */
/* ------------------------------------------------------------------ */

export const rootPulseFragmentShader: string = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uPulseProgress;   // 0→1 along the tube
uniform float uPulseStrength;
uniform vec3 uPulseColor;
varying vec2 vUv;

void main() {
  float dist = abs(vUv.x - uPulseProgress);
  float pulse = exp(-dist * dist * 80.0) * uPulseStrength;
  vec3 baseColor = vec3(0.08, 0.18, 0.08);
  vec3 color = mix(baseColor, uPulseColor, pulse);
  float emission = pulse * 2.0;
  gl_FragColor = vec4(color + emission * uPulseColor, 1.0);
}
`;
