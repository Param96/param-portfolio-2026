"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import BoidsSystem from "../systems/BoidsSystem";

export default function ForestScene() {
  const { cinematicPhase, sceneLocalTime } = useLivingSystemStore();
  const treeGroupRef = useRef<THREE.Group>(null);
  const canopyRef = useRef<THREE.Mesh>(null);

  // Simple procedural tree geometry
  const treeGeo = useMemo(() => new THREE.CylinderGeometry(0.5, 1.5, 30, 8), []);
  const treeMat = useMemo(() => new THREE.MeshStandardMaterial({ 
    color: "#2c2a22", 
    roughness: 0.9 
  }), []);

  const trees = useMemo(() => {
    return Array.from({ length: 15 }, () => ({
      x: (Math.random() - 0.5) * 60,
      z: (Math.random() - 0.5) * 60,
      scale: 0.5 + Math.random() * 1.5
    }));
  }, []);

  useFrame((state) => {
    const isActive = cinematicPhase >= 3;
    if (treeGroupRef.current) {
      treeGroupRef.current.visible = isActive;
    }

    if (isActive && canopyRef.current) {
      // Wind sway for canopy
      const t = state.clock.elapsedTime;
      canopyRef.current.position.x = Math.sin(t * 0.5) * 2;
      canopyRef.current.position.z = Math.cos(t * 0.3) * 2;
    }
  });

  if (cinematicPhase < 3) return null;

  return (
    <group>
      {/* Trees */}
      <group ref={treeGroupRef}>
        {trees.map((tree, i) => (
          <mesh 
            key={i} 
            geometry={treeGeo} 
            material={treeMat} 
            position={[tree.x, 15 * tree.scale, tree.z]} 
            scale={[tree.scale, tree.scale, tree.scale]}
            castShadow
            receiveShadow
          />
        ))}
      </group>
      
      {/* Canopy Placeholder */}
      <mesh ref={canopyRef} position={[0, 40, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#1a2e15" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>

      {/* Boids Systems */}
      <BoidsSystem type="fireflies" count={50} visiblePhaseStart={3} />
      <BoidsSystem type="birds" count={15} visiblePhaseStart={3} />
    </group>
  );
}
