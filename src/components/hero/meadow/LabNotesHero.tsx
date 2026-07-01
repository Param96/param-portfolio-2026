"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

function WoodenDesk() {
  return (
    <mesh position={[0, 0.4, -3]} receiveShadow castShadow>
      <boxGeometry args={[2, 0.1, 1.2]} />
      <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
    </mesh>
  );
}

function FieldJournal() {
  const leftPageRef = useRef<THREE.Mesh>(null);
  const rightPageRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (rightPageRef.current) {
      // Subtle flutter
      rightPageRef.current.rotation.z = Math.sin(time * 3) * 0.05 - 0.05;
    }
  });

  return (
    <group position={[0, 0.46, -3]} rotation={[0, -0.2, 0]}>
      {/* Leather Cover */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.02, 0.6]} />
        <meshStandardMaterial color="#2c1a0e" roughness={0.8} />
      </mesh>
      
      {/* Left Page (Static) */}
      <mesh position={[-0.22, 0, 0]}>
        <boxGeometry args={[0.4, 0.01, 0.55]} />
        <meshStandardMaterial color="#f0e6d2" roughness={0.9} />
      </mesh>
      
      {/* Right Page (Fluttering) */}
      <mesh ref={rightPageRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.01, 0.55]} />
        <meshStandardMaterial color="#f0e6d2" roughness={0.9} />
      </mesh>
    </group>
  );
}

function DustMotes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 50;
  
  const dustData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 4,
      y: Math.random() * 2,
      z: (Math.random() - 0.5) * 4 - 3,
      speed: Math.random() * 0.2 + 0.1,
      wobble: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((dust, i) => {
        const data = dustData[i];
        dust.position.y += Math.sin(time * data.speed + data.wobble) * 0.005;
        dust.position.x += Math.cos(time * data.speed + data.wobble) * 0.005;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {dustData.map((data, i) => (
        <mesh key={i} position={[data.x, data.y, data.z]}>
          <planeGeometry args={[0.015, 0.015]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function LabNotesSceneContent() {
  return (
    <group>
      <WoodenDesk />
      <FieldJournal />
      <DustMotes />
    </group>
  );
}

export default function LabNotesHero() {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 1]} focusDistance={0.015}>
        <LabNotesSceneContent />
      </MeadowEnvironment>
      
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto mt-32">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-inter font-bold mb-6 text-[#2b1b17] drop-shadow-sm">
            The Field Journal
          </h1>
          <p className="text-xl md:text-2xl text-[#4a2c26] leading-relaxed font-light">
            Raw notes, experimental observations, and unpolished thoughts from ongoing builds.
          </p>
        </div>
      </div>
    </div>
  );
}
