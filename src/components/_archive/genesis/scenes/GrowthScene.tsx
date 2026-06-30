"use client";

import { useFrame } from "@react-three/fiber";
import { useLivingSystemStore } from "@/lib/store";
import InstancedGrass from "../systems/InstancedGrass";
import { useRef } from "react";
import * as THREE from "three";

export default function GrowthScene() {
  const { cinematicPhase } = useLivingSystemStore();
  const flowerGroupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const isActive = cinematicPhase >= 2 && cinematicPhase <= 3;
    if (flowerGroupRef.current) {
      flowerGroupRef.current.visible = isActive;
    }
  });

  // Keep grass and flowers visible during Scene 3 (Forest) as well
  if (cinematicPhase < 2 || cinematicPhase > 3) return null;

  return (
    <group>
      {/* Grass System */}
      <InstancedGrass count={8000} width={40} depth={40} visiblePhaseStart={2} />
      
      {/* Simple Procedural Flower (Placeholder for actual animated mesh) */}
      <group ref={flowerGroupRef} position={[2, 0, 5]}>
        {/* Stem */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.03, 1, 8]} />
          <meshStandardMaterial color="#4a7023" />
        </mesh>
        {/* Center */}
        <mesh position={[0, 1.0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#e8b830" />
        </mesh>
        {/* Petals */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh 
            key={i} 
            position={[Math.sin(i * Math.PI * 2 / 5) * 0.15, 1.0, Math.cos(i * Math.PI * 2 / 5) * 0.15]}
            rotation={[0, i * Math.PI * 2 / 5, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.05, 0.01, 0.3, 8]} />
            <meshStandardMaterial color="#f5f0e8" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
