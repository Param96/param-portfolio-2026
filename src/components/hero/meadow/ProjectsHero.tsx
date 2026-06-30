"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

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

function Crystals({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Subtle pulsating glow
      const scale = 1 + Math.sin(time * 2) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <pointLight color="#e0b85c" intensity={1.5} distance={3} />
      <mesh position={[0, 0.2, 0]} rotation={[0.2, 0.5, 0.1]}>
        <coneGeometry args={[0.15, 0.6, 4]} />
        <meshPhysicalMaterial color="#e0b85c" transmission={0.9} roughness={0.1} ior={1.76} transparent opacity={0.9} emissive="#e0b85c" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.2, 0.1, 0.2]} rotation={[-0.2, -0.3, 0.4]}>
        <coneGeometry args={[0.1, 0.4, 4]} />
        <meshPhysicalMaterial color="#e0b85c" transmission={0.9} roughness={0.1} ior={1.76} transparent opacity={0.9} emissive="#e0b85c" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[-0.2, 0.1, -0.1]} rotation={[0.1, 0.1, -0.3]}>
        <coneGeometry args={[0.12, 0.5, 4]} />
        <meshPhysicalMaterial color="#e0b85c" transmission={0.9} roughness={0.1} ior={1.76} transparent opacity={0.9} emissive="#e0b85c" emissiveIntensity={0.5} />
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
          <h1 className="text-6xl md:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
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
