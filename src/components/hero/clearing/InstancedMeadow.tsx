"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

// Grass blade geometry (a simple curved triangle)
const GRASS_WIDTH = 0.05;
const GRASS_HEIGHT = 0.6;
const GRASS_SEGMENTS = 3;

// Simplex noise implementation for the shader
const noiseShader = `
// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2011-10-11
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation polynomials and a gradient
// based on random circles.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license.

vec3 mod289(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x) {
     return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

// First corner
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

// Other corners
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  //   x0 = x0 - 0.0 + 0.0 * C.xxx;
  //   x1 = x0 - i1  + 1.0 * C.xxx;
  //   x2 = x0 - i2  + 2.0 * C.xxx;
  //   x3 = x0 - 1.0 + 3.0 * C.xxx;
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y
  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y

// Permutations
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

// Gradients: 7x7 points over a square, mapped onto an octahedron.
// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
  float n_ = 0.142857142857; // 1.0/7.0
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;
  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

//Normalise gradients
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

// Mix final noise value
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}
`;

// Helper to create a single grass blade geometry
function createGrassGeometry() {
  const geometry = new THREE.PlaneGeometry(GRASS_WIDTH, GRASS_HEIGHT, 1, GRASS_SEGMENTS);
  geometry.translate(0, GRASS_HEIGHT / 2, 0); // Origin at the bottom
  
  // Curve the geometry slightly so it's not completely flat
  const posAttribute = geometry.attributes.position;
  for (let i = 0; i < posAttribute.count; i++) {
    const y = posAttribute.getY(i);
    const fraction = y / GRASS_HEIGHT;
    // Bend forwards slightly based on height
    posAttribute.setZ(i, Math.pow(fraction, 2) * -0.1);
  }
  
  geometry.computeVertexNormals();
  return geometry;
}

export default function InstancedMeadow() {
  const grassCount = 6000; // Reduced density for better performance
  const flowerCount = 14;

  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Memoize flower positions so they don't jump around on re-renders
  const flowersData = useMemo(() => {
    return Array.from({ length: flowerCount }).map(() => {
      const radius = 1 + Math.random() * 12;
      const angle = (Math.random() - 0.5) * Math.PI;
      const x = Math.sin(angle) * radius;
      const z = -Math.cos(angle) * radius + 1;
      const scale = 0.5 + Math.random() * 0.5;
      const offset = Math.random() * 10;
      
      return { x, z, scale, offset };
    });
  }, [flowerCount]);
  
  // Custom uniforms for the wind shader
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWindSpeed: { value: 0.8 },
    uWindIntensity: { value: 0.15 }, // displacement scale
    uColorNear: { value: new THREE.Color("#7a9450") }, // Warm olive-green
    uColorFar: { value: new THREE.Color("#a8b890") }, // Muted sage
  }), []);

  const { grassGeometry, instancedGrassMatrix } = useMemo(() => {
    const geom = createGrassGeometry();
    const instancedMatrix = new Float32Array(grassCount * 16);
    
    const dummy = new THREE.Object3D();
    
    for (let i = 0; i < grassCount; i++) {
      // Scatter in a semicircle/ellipse in front of camera
      const radius = 0.5 + Math.random() * 25; // 0.5 to 25 units away
      const angle = (Math.random() - 0.5) * Math.PI * 1.5; // -135 to 135 degrees
      
      const x = Math.sin(angle) * radius;
      const z = -Math.cos(angle) * radius + 2; // Offset center slightly forward
      
      dummy.position.set(x, 0, z);
      
      // Random rotation
      dummy.rotation.y = Math.random() * Math.PI * 2;
      
      // Random scale, smaller towards the edges/far
      const scaleVariation = 0.5 + Math.random() * 0.8;
      const distanceScale = Math.max(0.2, 1 - (radius / 30));
      dummy.scale.setScalar(scaleVariation * distanceScale);
      
      dummy.updateMatrix();
      dummy.matrix.toArray(instancedMatrix, i * 16);
    }
    
    return { grassGeometry: geom, instancedGrassMatrix: instancedMatrix };
  }, [grassCount]);

  // Handle Shader modifications for grass wind
  const onBeforeCompile = (shader: any) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.uniforms.uWindSpeed = uniforms.uWindSpeed;
    shader.uniforms.uWindIntensity = uniforms.uWindIntensity;
    shader.uniforms.uColorNear = uniforms.uColorNear;
    shader.uniforms.uColorFar = uniforms.uColorFar;

    // Inject Simplex noise and uniforms
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      uniform float uTime;
      uniform float uWindSpeed;
      uniform float uWindIntensity;
      varying vec2 vUv;
      varying float vDistance;
      
      ${noiseShader}
      `
    );

    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      
      vUv = uv;
      
      // Extract world position of the instance
      vec4 worldPos = instanceMatrix * vec4(position, 1.0);
      
      // Calculate wind noise based on world position and time
      // Optimized to single noise lookup to reduce time complexity
      float windNoise = snoise(vec3(worldPos.x * 0.2, worldPos.z * 0.2, uTime * uWindSpeed));
      
      // Bend only the upper parts of the grass
      float bendFactor = uv.y * uv.y; // Non-linear bend so it curls
      
      // Apply wind displacement
      vec3 windDir = vec3(1.0, 0.0, 0.5); // Wind blows generally to the right and slightly back
      transformed += windDir * windNoise * uWindIntensity * bendFactor;
      
      // Pass distance for color mixing
      vDistance = length(worldPos.xyz);
      `
    );

    // Color gradient based on distance
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `
      #include <common>
      uniform vec3 uColorNear;
      uniform vec3 uColorFar;
      varying vec2 vUv;
      varying float vDistance;
      `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `
      #include <color_fragment>
      
      // Mix from near to far color
      float mixFactor = smoothstep(2.0, 20.0, vDistance);
      vec3 baseColor = mix(uColorNear, uColorFar, mixFactor);
      
      // Add slight vertical gradient so tips are brighter/more yellow
      baseColor = mix(baseColor * 0.6, baseColor * 1.2, vUv.y);
      
      diffuseColor.rgb = baseColor;
      `
    );
  };

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <group>
      {/* Ground plane to ensure no gaps */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -10]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#6a8244" roughness={1} />
      </mesh>

      {/* The instanced grass mesh */}
      <instancedMesh
        ref={meshRef}
        args={[grassGeometry, undefined, grassCount]}
        castShadow
        receiveShadow
      >
        <instancedBufferAttribute
          attach="instanceMatrix"
          args={[instancedGrassMatrix, 16]}
        />
        <meshStandardMaterial
          ref={materialRef}
          roughness={0.8}
          side={THREE.DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </instancedMesh>

      {/* Simple Wildflowers scattered */}
      {flowersData.map((flower, i) => (
        <Flower 
          key={i} 
          position={[flower.x, 0, flower.z]} 
          scale={flower.scale} 
          offset={flower.offset} 
        />
      ))}
    </group>
  );
}

// Individual animated flower component
function Flower({ position, scale, offset }: { position: [number, number, number], scale: number, offset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() + offset;
    
    // Slower, heavier sway compared to grass
    const swayX = Math.sin(t * 0.5) * 0.1;
    const swayZ = Math.cos(t * 0.4) * 0.1;
    
    groupRef.current.rotation.x = swayZ;
    groupRef.current.rotation.z = -swayX;
  });

  return (
    <group position={position} scale={scale}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Stem */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.01, 0.015, 0.6, 5]} />
          <meshStandardMaterial color="#7a9450" />
        </mesh>
        
        {/* Flower Head */}
        <group position={[0, 0.6, 0]} rotation={[0.3, 0, 0]}>
          {/* Center */}
          <mesh>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#e0b85c" roughness={0.9} />
          </mesh>
          {/* Petals */}
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]} position={[0, 0, -0.01]}>
              <mesh position={[0, 0.06, 0]}>
                <planeGeometry args={[0.06, 0.12]} />
                <meshStandardMaterial color="#f5efe0" side={THREE.DoubleSide} roughness={0.7} />
              </mesh>
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
