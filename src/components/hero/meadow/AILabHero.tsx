"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

function NexusPool() {
  const waterRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (waterRef.current) {
      // Simulate ripples by rotating slightly or we could use a custom shader.
      // For now, we'll just have a highly reflective surface.
    }
  });

  return (
    <group position={[0, 0.02, -3]}>
      {/* Stone border for the pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[2, 2.3, 32]} />
        <meshStandardMaterial color="#4a504d" roughness={0.9} flatShading />
      </mesh>
      
      {/* Water surface */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[2.0, 32]} />
        <meshPhysicalMaterial 
          color="#a8d5d0" 
          transmission={0.8} 
          roughness={0.05} 
          ior={1.33} 
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function Fireflies() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 15;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((fly, i) => {
        // Orbit and bob around
        fly.position.y = Math.sin(time * 2 + i) * 0.5 + 1;
        fly.position.x = Math.cos(time * 0.5 + i) * 1.5;
        fly.position.z = Math.sin(time * 0.7 + i) * 1.5 - 3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#a3ddff" />
          <pointLight color="#a3ddff" intensity={0.1} distance={1} />
        </mesh>
      ))}
    </group>
  );
}

function AILabSceneContent() {
  return (
    <group>
      <NexusPool />
      <Fireflies />
    </group>
  );
}

export default function AILabHero() {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 4]} focusDistance={0.02}>
        <AILabSceneContent />
      </MeadowEnvironment>
      
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
            The Nexus Pool
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light drop-shadow-md">
            Agentic environments, autonomous orchestration, and exploratory AI workflows.
          </p>
        </div>
      </div>
    </div>
  );
}
