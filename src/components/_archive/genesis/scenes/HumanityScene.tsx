"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";

export default function HumanityScene() {
  const { cinematicPhase, sceneLocalTime } = useLivingSystemStore();
  const groupRef = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Mesh[]>([]);

  const panelGeo = useMemo(() => new THREE.BoxGeometry(4, 8, 0.2), []);
  const panelMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    transmission: 0.95,
    roughness: 0.1,
    ior: 1.5,
    color: "#ffffff",
    transparent: true,
  }), []);

  const panels = useMemo(() => [
    { pos: new THREE.Vector3(-8, 4, 10), rot: 0.2 },
    { pos: new THREE.Vector3(8, 6, 5), rot: -0.3 },
    { pos: new THREE.Vector3(0, 5, 15), rot: 0.1 },
  ], []);

  useFrame((state) => {
    const isActive = cinematicPhase >= 5;
    if (!groupRef.current) return;
    groupRef.current.visible = isActive;
    
    if (isActive) {
      // Emerge from ground effect
      const t = sceneLocalTime;
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const targetY = panels[i].pos.y;
        // Ease up over 2 seconds
        const progress = Math.min(1.0, Math.max(0, t - i * 0.5) / 2.0);
        const ease = 1.0 - Math.pow(1.0 - progress, 3.0);
        panel.position.y = (targetY - 10) + ease * 10;
        
        // Slight hover after emergence
        if (progress >= 1.0) {
          panel.position.y += Math.sin(state.clock.elapsedTime + i) * 0.05;
        }
      });
    }
  });

  if (cinematicPhase < 5) return null;

  return (
    <group ref={groupRef}>
      {panels.map((p, i) => (
        <mesh 
          key={i}
          ref={(el) => {
            if (el) panelsRef.current[i] = el;
          }}
          geometry={panelGeo}
          material={panelMat}
          position={[p.pos.x, p.pos.y - 10, p.pos.z]} // start below ground
          rotation={[0, p.rot, 0]}
        />
      ))}
    </group>
  );
}
