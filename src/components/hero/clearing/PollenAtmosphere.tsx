"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function PollenAtmosphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 25; // Sparse, just atmosphere
  
  // Custom points material for soft pollen
  const pollenMaterial = useMemo(() => {
    // Create a soft radial gradient texture programmatically
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.2, "rgba(255,240,200,0.8)");
      gradient.addColorStop(1, "rgba(255,240,200,0)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(canvas);
    
    return new THREE.PointsMaterial({
      size: 0.1, // Small specs
      map: texture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      color: "#ffecd1",
    });
  }, []);

  // Initialize random positions and phase offsets
  const { positions, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const phs = new Float32Array(count * 3); // random offset values per particle

    for (let i = 0; i < count; i++) {
      // Scatter in a box around the camera's view
      pos[i * 3] = (Math.random() - 0.5) * 15;     // x
      pos[i * 3 + 1] = Math.random() * 4;          // y (height)
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2; // z (depth)

      phs[i * 3] = Math.random() * Math.PI * 2;
      phs[i * 3 + 1] = Math.random() * Math.PI * 2;
      phs[i * 3 + 2] = Math.random() * 2 + 0.5; // drift speed multiplier
    }

    return { positions: pos, phases: phs };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    for (let i = 0; i < count; i++) {
      // Very slow upward and sideways drift
      const speed = phases[i * 3 + 2];
      
      // Drift upward constantly but slowly
      positions[i * 3 + 1] += 0.05 * speed * delta;
      
      // Drift sideways with sine waves for organic motion
      positions[i * 3] += Math.sin(time * 0.2 + phases[i * 3]) * 0.02 * speed * delta;
      positions[i * 3 + 2] += Math.cos(time * 0.15 + phases[i * 3 + 1]) * 0.02 * speed * delta;
      
      // If a particle drifts too high, reset it to the bottom with a new random X/Z
      if (positions[i * 3 + 1] > 4) {
        positions[i * 3 + 1] = -0.5; // Start slightly below ground
        positions[i * 3] = (Math.random() - 0.5) * 15;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={pollenMaterial} attach="material" />
    </points>
  );
}
