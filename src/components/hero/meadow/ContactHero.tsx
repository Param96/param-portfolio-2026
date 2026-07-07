"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

import { useLivingSystemStore } from "@/lib/store";

function VintageTelephoneBooth() {
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);

  useFrame((state, delta) => {
    let targetIntensity = timeOfDayTheme === "day" ? 0 : (timeOfDayTheme === "night" ? 1.0 : 0.5);
    
    if (lightRef.current) lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity * 1.5, delta * 2);
    if (glowRef.current) glowRef.current.opacity = THREE.MathUtils.lerp(glowRef.current.opacity, targetIntensity * 0.8, delta * 2);
  });

  const frameColor = "#A6552E"; // Rust accent

  return (
    <group position={[-3.2, 0, -4.2]} rotation={[0, 0.5, 0]}>
      {/* Base */}
      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      
      {/* Corner Pillars */}
      <mesh position={[-0.45, 1.3, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.2, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 1.3, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.2, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      <mesh position={[-0.45, 1.3, 0.45]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.2, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      <mesh position={[0.45, 1.3, 0.45]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 2.2, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      
      {/* Solid Back Wall */}
      <mesh position={[0, 1.3, -0.45]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 2.2, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>

      {/* Roof Base */}
      <mesh position={[0, 2.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.1, 1.05]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>
      
      {/* Roof Dome */}
      <mesh position={[0, 2.65, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.45, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} />
      </mesh>

      {/* Glass Panes */}
      <mesh position={[-0.45, 1.3, 0]}>
        <boxGeometry args={[0.05, 2.0, 0.8]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={0.3} transparent roughness={0.1} ior={1.5} />
      </mesh>
      <mesh position={[0.45, 1.3, 0]}>
        <boxGeometry args={[0.05, 2.0, 0.8]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={0.3} transparent roughness={0.1} ior={1.5} />
      </mesh>
      <mesh position={[0, 1.3, 0.45]}>
        <boxGeometry args={[0.8, 2.0, 0.05]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={0.3} transparent roughness={0.1} ior={1.5} />
      </mesh>

      {/* Telephone Unit mounted on the back wall */}
      <group position={[0, 1.4, -0.35]}>
        {/* Phone Box */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.3, 0.4, 0.1]} />
          <meshStandardMaterial color="#222222" roughness={0.6} />
        </mesh>
        {/* Phone Receiver */}
        <mesh position={[-0.2, 0, 0.05]} castShadow receiveShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.25]} />
          <meshStandardMaterial color="#111111" roughness={0.5} />
        </mesh>
        {/* Coin Slot / Dial */}
        <mesh position={[0, 0.05, 0.06]} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.02]} />
          <meshStandardMaterial color="#555555" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Glowing Light inside */}
      <mesh position={[0, 2.2, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial ref={glowRef} color="#ffcc66" transparent opacity={0.8} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 2.2, 0]} color="#ffcc66" intensity={1.5} distance={4} decay={2} />
    </group>
  );
}

function Lantern() {
  const lanternRef = useRef<THREE.Group>(null);
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (lanternRef.current) {
      // Gentle swing in the wind
      lanternRef.current.rotation.z = Math.sin(time * 1.5) * 0.05;
      lanternRef.current.rotation.x = Math.cos(time * 1.2) * 0.03;
    }
    
    let targetIntensity = timeOfDayTheme === "day" ? 0 : (timeOfDayTheme === "night" ? 1.0 : 0.5);
    
    if (lightRef.current) lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity * 1.5, delta * 2);
    if (glowRef.current) glowRef.current.opacity = THREE.MathUtils.lerp(glowRef.current.opacity, targetIntensity * 1.0, delta * 2);
  });

  return (
    <group ref={lanternRef} position={[-0.8, 2.1, -3]}>
      {/* Lantern Cap */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <coneGeometry args={[0.25, 0.2, 4]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.6} />
      </mesh>
      
      {/* Lantern Base */}
      <mesh position={[0, -0.25, 0]} castShadow>
        <boxGeometry args={[0.3, 0.1, 0.3]} />
        <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.6} />
      </mesh>
      
      {/* Glass Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.4]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transmission={0.9} 
          opacity={0.8} 
          transparent 
          roughness={0.1} 
          ior={1.5}
        />
      </mesh>
      
      {/* Glowing Light inside */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial ref={glowRef} color="#ffcc66" />
      </mesh>
      <pointLight ref={lightRef} color="#ffcc66" intensity={1.5} distance={5} decay={2} />
    </group>
  );
}

function SignPost() {
  return (
    <group position={[-1.5, 0, -3]}>
      {/* Main Post */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 3, 0.2]} />
        <meshStandardMaterial color="#4a3b2c" roughness={0.9} />
      </mesh>
      
      {/* Arm for lantern */}
      <mesh position={[0.4, 2.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.15, 0.15]} />
        <meshStandardMaterial color="#4a3b2c" roughness={0.9} />
      </mesh>
      
      {/* Chain/Hook */}
      <mesh position={[0.7, 2.45, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.3]} />
        <meshStandardMaterial color="#222222" roughness={0.7} metalness={0.5} />
      </mesh>
    </group>
  );
}

function Moths() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 5;
  
  const mothsData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      orbitSpeed: Math.random() * 2 + 1,
      orbitRadius: Math.random() * 0.2 + 0.2,
      wobbleSpeed: Math.random() * 5 + 5,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((moth, i) => {
        const data = mothsData[i];
        moth.position.x = Math.cos(time * data.orbitSpeed + data.offset) * data.orbitRadius;
        moth.position.z = Math.sin(time * data.orbitSpeed + data.offset) * data.orbitRadius;
        moth.position.y = Math.sin(time * data.wobbleSpeed) * 0.1;
        moth.rotation.y = -(time * data.orbitSpeed + data.offset); // face direction of travel roughly
      });
    }
  });

  return (
    <group ref={groupRef} position={[-0.8, 2.1, -3]}>
      {mothsData.map((_, i) => (
        <mesh key={i}>
          <planeGeometry args={[0.04, 0.04]} />
          <meshBasicMaterial color="#dcdcdc" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function ContactSceneContent() {
  return (
    <group>
      <VintageTelephoneBooth />
      <SignPost />
      <Lantern />
      <Moths />
    </group>
  );
}

export default function ContactHero() {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 3]} focusDistance={0.02}>
        <ContactSceneContent />
      </MeadowEnvironment>
      
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto ml-auto text-right">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
            The Signal
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light drop-shadow-md">
            Reach out to discuss new projects, system architectures, or experimental ideas.
          </p>
        </div>
      </div>
    </div>
  );
}
