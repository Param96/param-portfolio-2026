"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";
import { Download } from "lucide-react";

function FloatingDocuments({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const docGeometry = useMemo(() => new THREE.PlaneGeometry(0.8, 1.2), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh position={[-0.4, 0, 0.2]} rotation={[0, 0.2, -0.1]} castShadow>
        <planeGeometry args={[0.8, 1.2]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.3, 0.2, -0.1]} rotation={[0, -0.3, 0.1]} castShadow>
        <planeGeometry args={[0.8, 1.2]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.2} metalness={0.1} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#a3ccff" intensity={0.5} distance={3} position={[0, 0, 1]} />
    </group>
  );
}

function Fireflies({ count = 25 }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -5 + Math.random() * 10;
      const yFactor = 0.5 + Math.random() * 2;
      const zFactor = -5 + Math.random() * 10;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (meshRef.current) {
      particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
        t = particle.t += speed / 2;
        const a = Math.cos(t) + Math.sin(t * 1) / 10;
        const b = Math.sin(t) + Math.cos(t * 2) / 10;
        const s = Math.cos(t);
        
        dummy.position.set(
          xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
          yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
          zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        );
        dummy.scale.set(s, s, s);
        dummy.rotation.set(s * 5, s * 5, s * 5);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.03, 0]} />
      <meshBasicMaterial color="#d4ffb3" toneMapped={false} />
    </instancedMesh>
  );
}

function Streetlamp({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Post */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 3, 8]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.4} />
      </mesh>
      {/* Base */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.2, 8]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.4} />
      </mesh>
      {/* Light bulb / fixture */}
      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffe8b3" toneMapped={false} />
      </mesh>
      {/* Halo / Glow */}
      <mesh position={[0, 3.1, 0]}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#ffe8b3" transparent opacity={0.15} toneMapped={false} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <pointLight color="#ffe8b3" intensity={2} distance={8} position={[0, 3.1, 0]} castShadow />
      {/* Pool of light on the ground */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial color="#ffe8b3" transparent opacity={0.1} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function ResumeSceneContent() {
  return (
    <group>
      <FloatingDocuments position={[-1.5, 1.2, -3]} />
      <Streetlamp position={[2, 0, -3]} />
      <Fireflies count={40} />
    </group>
  );
}

export default function ResumeHero() {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 4]} focusDistance={0.02}>
        <ResumeSceneContent />
      </MeadowEnvironment>
      
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
            The Record
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light drop-shadow-md mb-8">
            A history of execution, architecture, and systems engineering.
          </p>
          <a 
            href="/resume.pdf" 
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white text-white hover:bg-white hover:text-black transition-colors text-sm font-inter font-bold uppercase tracking-[0.15em] backdrop-blur-sm"
          >
            <Download className="w-4 h-4" /> Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
