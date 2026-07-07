"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

import { useLivingSystemStore } from "@/lib/store";
import DistantHut from "./DistantHut";

function StandingStone({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  const geom = useMemo(() => new THREE.BoxGeometry(1, 3.5, 1.2, 2, 2, 2), []);
  
  useMemo(() => {
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.15);
      pos.setY(i, pos.getY(i) + (Math.random() - 0.5) * 0.15);
      pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.15);
    }
    geom.computeVertexNormals();
  }, [geom]);

  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow geometry={geom}>
      <meshStandardMaterial color="#6a6a6a" roughness={0.9} flatShading />
    </mesh>
  );
}

function Anvil({ position, rotation }: { position: [number, number, number], rotation: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation} castShadow receiveShadow>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.4, 4]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.8} metalness={0.2} flatShading />
      </mesh>
      {/* Top */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.3]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.8} metalness={0.2} flatShading />
      </mesh>
      {/* Horn */}
      <mesh position={[0.55, 0.5, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.8} metalness={0.2} flatShading />
      </mesh>
      {/* Hammer */}
      <group position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0.2]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.4]} />
          <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.15]} />
          <meshStandardMaterial color="#333" roughness={0.7} metalness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

function Crystals({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const lightRef = useRef<THREE.PointLight>(null);
  const mat1Ref = useRef<THREE.MeshPhysicalMaterial>(null);
  const mat2Ref = useRef<THREE.MeshPhysicalMaterial>(null);
  const mat3Ref = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Subtle pulsating glow
      const scale = 1 + Math.sin(time * 2) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
    
    let targetIntensity = timeOfDayTheme === "day" ? 0 : (timeOfDayTheme === "night" ? 1.0 : 0.5);
    
    if (lightRef.current) lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity * 1.5, delta * 2);
    if (mat1Ref.current) mat1Ref.current.emissiveIntensity = THREE.MathUtils.lerp(mat1Ref.current.emissiveIntensity, targetIntensity * 0.5, delta * 2);
    if (mat2Ref.current) mat2Ref.current.emissiveIntensity = THREE.MathUtils.lerp(mat2Ref.current.emissiveIntensity, targetIntensity * 0.5, delta * 2);
    if (mat3Ref.current) mat3Ref.current.emissiveIntensity = THREE.MathUtils.lerp(mat3Ref.current.emissiveIntensity, targetIntensity * 0.5, delta * 2);
  });

  return (
    <group ref={groupRef} position={position}>
      <pointLight ref={lightRef} color="#e0b85c" intensity={1.5} distance={3} />
      <mesh position={[0, 0.2, 0]} rotation={[0.2, 0.5, 0.1]}>
        <coneGeometry args={[0.15, 0.6, 4]} />
        <meshPhysicalMaterial ref={mat1Ref} color="#e0b85c" transmission={0.9} roughness={0.1} ior={1.76} transparent opacity={0.9} emissive="#e0b85c" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 0.1, 0.2]} rotation={[-0.2, -0.3, 0.4]}>
        <coneGeometry args={[0.1, 0.4, 4]} />
        <meshPhysicalMaterial ref={mat2Ref} color="#e0b85c" transmission={0.9} roughness={0.1} ior={1.76} transparent opacity={0.9} emissive="#e0b85c" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.2, 0.1, -0.1]} rotation={[0.1, 0.1, -0.3]}>
        <coneGeometry args={[0.12, 0.5, 4]} />
        <meshPhysicalMaterial ref={mat3Ref} color="#e0b85c" transmission={0.9} roughness={0.1} ior={1.76} transparent opacity={0.9} emissive="#e0b85c" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function ProjectsSceneContent() {
  return (
    <group>
      <StandingStone position={[-2, 1.5, -4]} rotation={[0.1, 0.5, 0.05]} scale={1.2} />
      <StandingStone position={[1.5, 1.2, -4.5]} rotation={[-0.05, -0.3, -0.1]} scale={1.0} />
      <StandingStone position={[0, 1.8, -6]} rotation={[0.02, 0.1, 0.02]} scale={1.4} />
      
      <Crystals position={[-1.5, 0, -3.5]} />
      <Crystals position={[1, 0, -4]} />

      <Anvil position={[-1.0, 0, -3.0]} rotation={[0, 0.4, 0]} />
      <DistantHut position={[4, 0.2, -9]} rotation={[0, -0.8, 0]} scale={0.6} />
    </group>
  );
}

export default function ProjectsHero() {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 4]} focusDistance={0.02}>
        <ProjectsSceneContent />
      </MeadowEnvironment>
      
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
            The Workshop
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light drop-shadow-md">
            Foundational architecture, deployed applications, and scalable products built from the ground up.
          </p>
        </div>
      </div>
    </div>
  );
}
