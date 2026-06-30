"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

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

function FloatingRunes() {
  const groupRef = useRef<THREE.Group>(null);
  const rune1 = useRef<THREE.Mesh>(null);
  const rune2 = useRef<THREE.Mesh>(null);
  const rune3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
    if (rune1.current) rune1.current.rotation.x = time * 0.2;
    if (rune2.current) rune2.current.rotation.y = time * 0.3;
    if (rune3.current) rune3.current.rotation.z = time * 0.1;
  });

  return (
    <group ref={groupRef} position={[0, 1.5, -2]}>
      <pointLight color="#1d9e75" intensity={2} distance={5} />
      <mesh ref={rune1} position={[-0.5, 0, 0]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshBasicMaterial color="#1d9e75" transparent opacity={0.8} />
      </mesh>
      <mesh ref={rune2} position={[0.5, 0.2, 0]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshBasicMaterial color="#1d9e75" transparent opacity={0.6} />
      </mesh>
      <mesh ref={rune3} position={[0, -0.3, 0.2]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial color="#1d9e75" transparent opacity={0.9} />
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
      
      <FloatingRunes />
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
          <h1 className="text-6xl md:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
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
