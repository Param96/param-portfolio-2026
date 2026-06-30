"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLivingSystemStore } from "@/lib/store";

export default function AwakeningPlatform() {
  const theme = useThemeColors();
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Materials designed for cinematic "Museum Installation" feel
  const stoneMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#D4A373", // Warm Sandstone base, we'll tint it by theme light later
    roughness: 0.9,
    metalness: 0.1,
    clearcoat: 0.1,
  }), []);

  const bronzeMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#A0522D", // Bronze
    roughness: 0.3,
    metalness: 0.8,
    clearcoat: 0.5,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#FFFFFF",
    transmission: 0.9,
    opacity: 1,
    metalness: 0,
    roughness: 0.1,
    ior: 1.5,
    thickness: 0.5,
  }), []);

  const { cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const isComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Very slow mechanism rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.05;
    }
    
    // Cinematic Orchestration
    if (groupRef.current) {
      const targetScale = isComplete || cinematicPhase >= 2 ? 1 : 0.001; // Scale up in Phase 2
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1.5 * delta);
    }

    // Moss Growth (Phase 2 -> 3)
    if (!isComplete && cinematicPhase >= 2) {
      // Lerp stone towards a subtle mossy green
      const targetColor = new THREE.Color("#556B2F");
      stoneMaterial.color.lerp(targetColor, 0.1 * delta);
    } else if (isComplete) {
      // Instantly set if complete
      stoneMaterial.color.set("#556B2F");
    }

    // Soft pulsing energy through carved channels
    if (glowRef.current) {
      const baseIntensity = isComplete || cinematicPhase >= 6 ? 0.5 : 0; // Starts glowing in Phase 6 (Intelligence)
      const pulse = (Math.sin(time * 0.5) + 1) * 0.5;
      const currentIntensity = (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity;
      const targetIntensity = baseIntensity > 0 ? baseIntensity + pulse * 1.5 : 0;
      
      (glowRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = THREE.MathUtils.damp(currentIntensity, targetIntensity, 2, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.001, 0.001, 0.001]}>
      {/* Massive Outer Stone Base */}
      <mesh receiveShadow position={[0, 0, -0.5]}>
        <cylinderGeometry args={[8, 8.5, 1, 64]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Inner Stepped Bronze Platform */}
      <mesh receiveShadow position={[0, 0, 0.1]}>
        <cylinderGeometry args={[5, 5, 0.2, 64]} />
        <primitive object={bronzeMaterial} attach="material" />
      </mesh>

      {/* Transparent Glass Layer over Mechanisms */}
      <mesh position={[0, 0, 0.25]}>
        <cylinderGeometry args={[4.5, 4.5, 0.1, 64]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* Rotating Mechanical Rings underneath glass */}
      <mesh ref={ringRef} position={[0, 0, 0.15]}>
        <torusGeometry args={[3.8, 0.05, 16, 64]} />
        <primitive object={bronzeMaterial} attach="material" />
      </mesh>

      {/* Glowing Energy Channels */}
      <mesh ref={glowRef} position={[0, 0, 0.2]}>
        <torusGeometry args={[4.2, 0.02, 16, 64]} />
        <meshStandardMaterial 
          color={theme.accentTechnical} 
          emissive={theme.accentGlow} 
          emissiveIntensity={1} 
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
