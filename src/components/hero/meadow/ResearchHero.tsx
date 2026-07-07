"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

import { useLivingSystemStore } from "@/lib/store";

// Stone pillar/ruin component
function RuinPillar({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  // A rough box geometry that looks like a weathered pillar
  const geom = useMemo(() => new THREE.BoxGeometry(1, 4, 1, 4, 4, 4), []);
  
  // Use a noise or displacement in a real project, here we just deform it a bit
  useMemo(() => {
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setX(i, pos.getX(i) + (Math.random() - 0.5) * 0.1);
      pos.setZ(i, pos.getZ(i) + (Math.random() - 0.5) * 0.1);
    }
    geom.computeVertexNormals();
  }, [geom]);

  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow receiveShadow geometry={geom}>
      <meshStandardMaterial color="#5a615e" roughness={0.9} flatShading />
    </mesh>
  );
}

function LaboratoryHouse({ position, rotation, scale = 1 }: { position: [number, number, number], rotation: [number, number, number], scale?: number }) {
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const flashMatRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (flashMatRef.current) {
      // flash every ~15 seconds
      const cycle = time % 15;
      // Flash lasts for 0.5s
      let isFlashing = cycle < 0.5;
      
      let targetOpacity = 0;
      if (isFlashing) {
         targetOpacity = timeOfDayTheme === "day" ? 0.3 : (timeOfDayTheme === "night" ? 1.0 : 0.7);
      }
      
      flashMatRef.current.opacity = THREE.MathUtils.lerp(flashMatRef.current.opacity, targetOpacity, 0.2);
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#4a504d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.75, 0]} rotation={[0, Math.PI/4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0, 1.2, 0.8, 4]} />
        <meshStandardMaterial color="#3a403d" roughness={0.8} />
      </mesh>
      
      {/* Lit Window that flashes */}
      <mesh position={[0, 0.8, 0.76]}>
        <boxGeometry args={[0.5, 0.4, 0.02]} />
        <meshBasicMaterial 
          ref={flashMatRef}
          color="#1d9e75" 
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}

function FloatingRunes() {
  const groupRef = useRef<THREE.Group>(null);
  const rune1 = useRef<THREE.Mesh>(null);
  const rune2 = useRef<THREE.Mesh>(null);
  const rune3 = useRef<THREE.Mesh>(null);
  
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const lightRef = useRef<THREE.PointLight>(null);
  const mat1 = useRef<THREE.MeshBasicMaterial>(null);
  const mat2 = useRef<THREE.MeshBasicMaterial>(null);
  const mat3 = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
    if (rune1.current) rune1.current.rotation.x = time * 0.2;
    if (rune2.current) rune2.current.rotation.y = time * 0.3;
    if (rune3.current) rune3.current.rotation.z = time * 0.1;
    
    let targetIntensity = timeOfDayTheme === "day" ? 0 : (timeOfDayTheme === "night" ? 1.0 : 0.5);
    if (lightRef.current) lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, targetIntensity * 2.0, delta * 2);
    
    if (mat1.current) mat1.current.opacity = THREE.MathUtils.lerp(mat1.current.opacity, targetIntensity * 0.8, delta * 2);
    if (mat2.current) mat2.current.opacity = THREE.MathUtils.lerp(mat2.current.opacity, targetIntensity * 0.6, delta * 2);
    if (mat3.current) mat3.current.opacity = THREE.MathUtils.lerp(mat3.current.opacity, targetIntensity * 0.9, delta * 2);
  });

  return (
    <group ref={groupRef} position={[0.5, 2.0, -4.5]}>
      <pointLight ref={lightRef} color="#1d9e75" intensity={2} distance={5} />
      <mesh ref={rune1} position={[-0.5, 0, 0]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial ref={mat1} color="#1d9e75" transparent opacity={0.8} />
      </mesh>
      <mesh ref={rune2} position={[0.5, 0.2, 0]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshBasicMaterial ref={mat2} color="#1d9e75" transparent opacity={0.6} />
      </mesh>
      <mesh ref={rune3} position={[0, -0.3, 0.2]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial ref={mat3} color="#1d9e75" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function FloatingScroll() {
  const scrollRef = useRef<THREE.Group>(null);
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const glowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (scrollRef.current) {
      scrollRef.current.position.y = 1.0 + Math.sin(time * 0.8) * 0.15;
      scrollRef.current.rotation.y = time * 0.1;
      scrollRef.current.rotation.z = Math.sin(time * 0.5) * 0.05;
    }
    
    let targetIntensity = timeOfDayTheme === "day" ? 0 : (timeOfDayTheme === "night" ? 1.0 : 0.5);
    if (glowMatRef.current) glowMatRef.current.opacity = THREE.MathUtils.lerp(glowMatRef.current.opacity, targetIntensity * 0.6, delta * 2);
  });

  return (
    <group ref={scrollRef} position={[1.5, 1.0, -4.5]} rotation={[0.2, -0.4, 0]}>
      {/* Scroll Paper */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <planeGeometry args={[0.6, 0.8]} />
        <meshStandardMaterial color="#e8dfce" roughness={0.7} side={THREE.DoubleSide} />
      </mesh>
      {/* Left Roll */}
      <mesh position={[-0.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#e8dfce" roughness={0.7} />
      </mesh>
      {/* Right Roll */}
      <mesh position={[0.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 8]} />
        <meshStandardMaterial color="#e8dfce" roughness={0.7} />
      </mesh>
      {/* Magical Glow on scroll (matching runes) */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 0.6]} />
        <meshBasicMaterial ref={glowMatRef} color="#1d9e75" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ResearchSceneContent() {
  return (
    <group>
      <RuinPillar position={[-3, 1.5, -4]} rotation={[0.1, 0.5, 0.1]} scale={1.2} />
      <RuinPillar position={[3.5, 1.0, -3]} rotation={[-0.1, -0.3, -0.1]} scale={0.9} />
      <RuinPillar position={[-1, 0.5, -6]} rotation={[0, 0.8, 0.2]} scale={1.5} />
      <RuinPillar position={[2, 2.0, -5]} rotation={[0.2, -0.4, -0.1]} scale={1.1} />
      
      <LaboratoryHouse position={[0.5, 0.1, -5.5]} rotation={[0, -0.4, 0]} scale={0.8} />

      <FloatingRunes />
      <FloatingScroll />
    </group>
  );
}

export default function ResearchHero() {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 4]} focusDistance={0.02}>
        <ResearchSceneContent />
      </MeadowEnvironment>
      
      {/* HTML Content Overlay (Below 3D scene z-index, but pointer events handled) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
            The Ancient Library
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light drop-shadow-md">
            Research, publications, and deep dives into AI verification, systems architecture, and scalable intelligence.
          </p>
        </div>
      </div>
    </div>
  );
}
