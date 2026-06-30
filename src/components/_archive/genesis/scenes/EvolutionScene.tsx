"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";

export default function EvolutionScene() {
  const { cinematicPhase, sceneLocalTime } = useLivingSystemStore();
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const ringGeo = useMemo(() => new THREE.TorusGeometry(8, 0.2, 16, 100), []);
  const ringMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#6e4e28", // Bronze
    metalness: 0.9,
    roughness: 0.2,
  }), []);

  useFrame((state) => {
    const isActive = cinematicPhase >= 6;
    if (!groupRef.current) return;
    groupRef.current.visible = isActive;
    
    if (isActive && coreRef.current) {
      // Rotate core rings
      const t = state.clock.elapsedTime;
      coreRef.current.rotation.x = t * 0.2;
      coreRef.current.rotation.y = t * 0.3;
      
      // Hover
      coreRef.current.position.y = 15 + Math.sin(t) * 1.5;
    }
  });

  if (cinematicPhase < 6) return null;

  return (
    <group ref={groupRef}>
      {/* Abstract technological core */}
      <group ref={coreRef} position={[0, 15, -20]}>
        {/* Inner energy sphere */}
        <mesh>
          <sphereGeometry args={[2, 32, 32]} />
          <meshBasicMaterial color="#1d9e75" />
        </mesh>
        
        {/* Orbiting rings */}
        <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI/2, 0, 0]} />
        <mesh geometry={ringGeo} material={ringMat} rotation={[0, Math.PI/2, 0]} scale={[1.2, 1.2, 1.2]} />
        <mesh geometry={ringGeo} material={ringMat} rotation={[Math.PI/4, 0, Math.PI/4]} scale={[1.4, 1.4, 1.4]} />
      </group>
    </group>
  );
}
