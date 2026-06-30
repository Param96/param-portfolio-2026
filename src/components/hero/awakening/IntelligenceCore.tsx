"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLivingSystemStore } from "@/lib/store";

const FRAGMENT_COUNT = 80;

interface FragmentData {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: number;
  currentRadius?: number;
}

export default function IntelligenceCore() {
  const theme = useThemeColors();
  const groupRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<THREE.InstancedMesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const energyRef = useRef<THREE.Mesh>(null);

  // Pre-calculate positions for the fragmented stone shell
  const fragmentData = useMemo(() => {
    const data: FragmentData[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
    for (let i = 0; i < FRAGMENT_COUNT; i++) {
      const y = 1 - (i / (FRAGMENT_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      data.push({
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        scale: Math.random() * 0.15 + 0.1
      });
    }
    return data;
  }, []);

  const stoneMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#D4A373", 
    roughness: 0.9,
    metalness: 0.2,
  }), []);

  const bronzeMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#A0522D", 
    roughness: 0.4,
    metalness: 0.8,
  }), []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const { cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const isComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2; // Gentle levitation
      const targetScale = isComplete || cinematicPhase >= 2 ? 1 : 0.001; // Scale up in Phase 2
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1.5 * delta);
    }

    // Breathing fragments
    if (fragmentsRef.current) {
      fragmentData.forEach((data, i) => {
        // Expand and contract slightly based on time and position
        const breathOffset = Math.sin(time * 2 + i * 0.1) * 0.1;
        
        // Chaotic scatter during Phase 2 (First World), alignment during Phase 3+ (Seed)
        const scatterOffset = !isComplete && cinematicPhase === 2 ? (i % 5) * 2 : 0;
        const targetRadius = 2 + breathOffset + scatterOffset;
        
        // We calculate a running radius per fragment, lerping it for smooth transition
        if (!data.currentRadius) data.currentRadius = targetRadius;
        data.currentRadius = THREE.MathUtils.damp(data.currentRadius, targetRadius, 1.5, delta);
        
        dummy.position.copy(data.position).multiplyScalar(data.currentRadius);
        dummy.rotation.copy(data.rotation);
        
        // Very slow local rotation
        dummy.rotation.x += time * 0.1;
        dummy.rotation.y += time * 0.15;
        
        dummy.scale.setScalar(data.scale);
        dummy.updateMatrix();
        fragmentsRef.current!.setMatrixAt(i, dummy.matrix);
      });
      fragmentsRef.current.instanceMatrix.needsUpdate = true;
    }

    // Rotating mechanical locks
    if (ring1Ref.current && ring2Ref.current) {
      const rotSpeed = isComplete || cinematicPhase >= 6 ? 1.5 : 0.5; // Speeds up on Intelligence (Phase 6) and Reveal (Phase 7)
      ring1Ref.current.rotation.x += time * 0.005 * rotSpeed;
      ring1Ref.current.rotation.y += time * 0.01 * rotSpeed;
      
      ring2Ref.current.rotation.y -= time * 0.005 * rotSpeed;
      ring2Ref.current.rotation.z += time * 0.01 * rotSpeed;
    }

    // Inner Energy Pulse
    if (energyRef.current) {
      const isPulsing = isComplete || cinematicPhase >= 6; // Pulses in Phase 6 (Intelligence)
      const targetBaseScale = isComplete || cinematicPhase === 7 ? 0.001 : 1.2; // Hides inside core on reveal
      
      if (!energyRef.current.userData.currentScale) energyRef.current.userData.currentScale = 0.001;
      energyRef.current.userData.currentScale = THREE.MathUtils.damp(
        energyRef.current.userData.currentScale,
        isPulsing ? targetBaseScale : 0.001,
        2,
        delta
      );

      const pulse = isPulsing ? Math.abs(Math.sin(time * 1.5)) : 0;
      const scale = energyRef.current.userData.currentScale + (isPulsing ? pulse * 0.2 : 0);
      
      energyRef.current.scale.setScalar(scale);
      (energyRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = isPulsing ? 1 + pulse * 2 : 0;
    }
  });

  return (
    <group ref={groupRef} position={[0, 2, 0]}>
      {/* Central Energy Core */}
      <mesh ref={energyRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial 
          color={theme.accentTechnical}
          emissive={theme.accentGlow}
          emissiveIntensity={2}
          wireframe
          toneMapped={false}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Floating Stone Fragments */}
      <instancedMesh ref={fragmentsRef} args={[undefined, undefined, FRAGMENT_COUNT]} castShadow>
        <dodecahedronGeometry args={[1, 0]} />
        <primitive object={stoneMaterial} attach="material" />
      </instancedMesh>

      {/* Mechanical Bronze Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.8, 0.05, 16, 64]} />
        <primitive object={bronzeMaterial} attach="material" />
      </mesh>
      
      <mesh ref={ring2Ref}>
        <torusGeometry args={[3.2, 0.08, 16, 64]} />
        <primitive object={bronzeMaterial} attach="material" />
      </mesh>
    </group>
  );
}
