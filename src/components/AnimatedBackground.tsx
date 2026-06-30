"use client";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import { useMousePhysics } from "@/hooks/useMousePhysics";
import { useThemeColors } from "@/hooks/useThemeColors";

import AwakeningPlatform from "./hero/awakening/AwakeningPlatform";
import IntelligenceCore from "./hero/awakening/IntelligenceCore";
import KnowledgeTree from "./hero/awakening/KnowledgeTree";
import HolographicArchives from "./hero/awakening/HolographicArchives";
import LivingEcosystem from "./hero/awakening/LivingEcosystem";

export default function AnimatedBackground() {
  const { timeOfDayTheme, cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const themeColors = useThemeColors();
  const groupRef = useRef<THREE.Group>(null);
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 15)); // Start far back
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isLight = timeOfDayTheme === 'dawn' || timeOfDayTheme === 'day';

  useFrame((state, delta) => {
    if (!mounted) return;

    // Determine if cinematic is complete
    const isComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

    // ── CAMERA ORCHESTRATION ──
    if (!isComplete) {
      // Phase 1 (0-8s): Big Bang - Camera far away
      if (cinematicPhase === 1) {
        cameraTarget.current.set(0, 0, 25);
      }
      // Phase 2-5: Slowly drift forward
      else if (cinematicPhase > 1 && cinematicPhase <= 5) {
        cameraTarget.current.z = THREE.MathUtils.damp(cameraTarget.current.z, 12, 0.2, delta);
        cameraTarget.current.y = THREE.MathUtils.damp(cameraTarget.current.y, 2, 0.2, delta);
      }
      // Phase 6: Core inspection (Intelligence)
      else if (cinematicPhase === 6) {
        cameraTarget.current.z = THREE.MathUtils.damp(cameraTarget.current.z, 8, 0.5, delta);
      }
      // Phase 7: The Reveal (Push through into the light)
      else if (cinematicPhase === 7) {
        cameraTarget.current.z = THREE.MathUtils.damp(cameraTarget.current.z, 0.5, 1.5, delta); // Push into the core
        cameraTarget.current.y = THREE.MathUtils.damp(cameraTarget.current.y, 2, 1.5, delta);
      }
      
      // Apply camera position
      state.camera.position.lerp(cameraTarget.current, 0.02);
      state.camera.lookAt(0, 2, 0); // Always look at the core
    } else {
      // Cinematic is over, allow mouse-driven parallax
      const mouseState = useMousePhysics.getState();
      const newTargetX = THREE.MathUtils.damp(mouseState.target.x, mouseState.mouse.x, 3, delta);
      const newTargetY = THREE.MathUtils.damp(mouseState.target.y, mouseState.mouse.y, 3, delta);
      
      useMousePhysics.setState({ target: { x: newTargetX, y: newTargetY } });

      if (groupRef.current) {
        const rotX = newTargetY * 0.05; 
        const rotY = newTargetX * 0.05; 
        groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, rotX, 4, delta);
        groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, rotY, 4, delta);
      }

      // Camera gently settles to default viewing distance (as if we passed through to the other side)
      state.camera.position.lerp(new THREE.Vector3(0, 1, 10), 0.02);
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={isLight ? 0.8 : 0.2} color={themeColors.bgMain} />
      
      {/* Primary Key Light */}
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={isLight ? 2 : 0.8} 
        color={themeColors.accentTechnical} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      {/* Secondary Fill Light */}
      <directionalLight 
        position={[-10, 10, -10]} 
        intensity={isLight ? 1 : 0.4} 
        color={themeColors.accentGlow} 
      />

      <AwakeningPlatform />
      <IntelligenceCore />
      <KnowledgeTree />
      <HolographicArchives />
      <LivingEcosystem />
    </group>
  );
}
