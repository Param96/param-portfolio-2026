"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import { useThemeColors } from "@/hooks/useThemeColors";

const PARTICLE_COUNT = 300;

export default function LivingEcosystem() {
  const { timeOfDayTheme, cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const theme = useThemeColors();
  const pointsRef = useRef<THREE.Points>(null);
  const isComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

  // Generate random positions
  const particles = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Cylinder distribution around the tree/core
      const radius = 1 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.2) * 15; // Range -3 to 12
      
      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius;
      
      speeds[i] = Math.random() * 0.5 + 0.1;
    }
    return { pos, speeds };
  }, []);

  // Determine behavior based on theme
  const particleConfig = useMemo(() => {
    switch (timeOfDayTheme) {
      case "dawn":
        return { size: 0.05, speedMult: 1.5, color: "#FFA07A" }; // Birds / morning insects (fast, orange)
      case "day":
        return { size: 0.03, speedMult: 2.0, color: "#D4A373" }; // Tiny fast insects / dust
      case "dusk":
        return { size: 0.08, speedMult: 0.5, color: "#FFD700" }; // Fireflies (slow, yellow)
      case "night":
      default:
        return { size: 0.06, speedMult: 0.2, color: theme.particleColor }; // Lanterns/data particles (very slow, teal)
    }
  }, [timeOfDayTheme, theme]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      
      // Cinematic Speed Modifier
      const cinematicSpeedMult = isComplete || cinematicPhase >= 5 ? 1 : 0.1;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        
        // Big Bang Explosion Logic (Phase 1)
        if (!isComplete && cinematicPhase === 1) {
          // Particles start at 0 and blast outwards
          const explodeRadius = Math.min(time * 15, 20); // Expand rapidly
          const originalDist = Math.sqrt(particles.pos[i3] ** 2 + particles.pos[i3+2] ** 2);
          
          if (originalDist > 0) {
            const ratio = explodeRadius / originalDist;
            // Lerp towards the exploded position
            positions[i3] = THREE.MathUtils.damp(positions[i3], particles.pos[i3] * ratio, 2, delta);
            positions[i3+1] = THREE.MathUtils.damp(positions[i3+1], particles.pos[i3+1] * ratio, 2, delta);
            positions[i3+2] = THREE.MathUtils.damp(positions[i3+2], particles.pos[i3+2] * ratio, 2, delta);
          }
        } 
        else {
          // Standard ambient orbit and drift
          const speed = particles.speeds[i] * particleConfig.speedMult * cinematicSpeedMult;
          
          // If we just transitioned from Big Bang, smoothly lerp back to their original defined radius
          if (!isComplete && cinematicPhase === 2) {
             positions[i3] = THREE.MathUtils.damp(positions[i3], particles.pos[i3], 1, delta);
             positions[i3+1] = THREE.MathUtils.damp(positions[i3+1], particles.pos[i3+1], 1, delta);
             positions[i3+2] = THREE.MathUtils.damp(positions[i3+2], particles.pos[i3+2], 1, delta);
          }

          // Gentle upward drift and swirling
          positions[i3 + 1] += Math.sin(time * 0.5 + i) * 0.01 * speed; // bob up and down
          
          // Orbit
          const currentX = positions[i3];
          const currentZ = positions[i3 + 2];
          const angle = 0.005 * speed;
          
          positions[i3] = currentX * Math.cos(angle) - currentZ * Math.sin(angle);
          positions[i3 + 2] = currentX * Math.sin(angle) + currentZ * Math.cos(angle);
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.pos.length / 3}
          array={particles.pos}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleConfig.size}
        color={particleConfig.color}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
