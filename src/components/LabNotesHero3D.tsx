"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowDown } from "lucide-react";

export default function LabNotesHero3D() {
  return (
    <div className="relative w-full min-h-screen bg-[#F6F1E3] overflow-hidden flex flex-col md:flex-row items-center">
      
      {/* ── ATMOSPHERIC LIGHTING (HTML layer) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#84A98C]/10 rounded-full blur-[150px] -translate-x-1/4" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#D4A373]/10 rounded-full blur-[120px] translate-x-1/4" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* ── LEFT: EDITORIAL TYPOGRAPHY ── */}
      <div className="w-full md:w-1/2 relative z-20 px-6 md:pl-20 lg:pl-32 pt-32 md:pt-0 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#84A98C] mb-8 block">
            Experimental Environment
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tighter text-[#2F3E46] leading-[0.9] mb-8">
            Active <br />
            <span className="font-mono text-[#52796F] tracking-tight text-5xl md:text-7xl lg:text-[6rem]">EXPERIMENTS_</span>
          </h1>
          <p className="text-lg text-[#52796F] leading-relaxed max-w-md font-medium mb-12">
            Exploring evolving systems, AI workflows, infrastructure ideas, and unfinished concepts.
          </p>
          
          <div className="inline-flex items-center gap-4 group cursor-pointer">
            <span className="text-sm font-bold uppercase tracking-widest text-[#2F3E46] opacity-50">
              View Feed
            </span>
            <div className="w-10 h-10 rounded-full border border-[#2F3E46]/10 flex items-center justify-center opacity-50">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── RIGHT: MINIMAL 3D OBJECT ── */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative z-10 mt-10 md:mt-0">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }} 
        >
          <ambientLight intensity={0.5} color="#FFFFFF" />
          
          <Scene />
        </Canvas>
      </div>
      
    </div>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Extremely slow, elegant rotation
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.z += 0.001;
      
      // Gentle parallax based on mouse
      const targetX = (state.pointer.y * 0.1);
      const targetY = (state.pointer.x * 0.1);
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Unstable Topology Field */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <UnstableMesh />
      </Float>

      {/* Very faint atmospheric dust */}
      <Sparkles count={50} scale={10} size={1} speed={0.1} opacity={0.3} color="#84A98C" />
    </group>
  );
}

function UnstableMesh() {
  const meshRef = useRef<THREE.Points>(null);
  const count = 1000;

  // Generate a sphere of points
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2.5 + Math.random() * 0.5;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count]);

  const initialPositions = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.elapsedTime;
      const positionsAttr = meshRef.current.geometry.attributes.position;
      
      // Gentle, calm mutation of the sphere
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Base coordinate
        const ix = initialPositions[i3];
        const iy = initialPositions[i3 + 1];
        const iz = initialPositions[i3 + 2];

        // Soft, elegant noise
        const dx = Math.sin(t * 0.5 + iy) * 0.2;
        const dy = Math.cos(t * 0.4 + iz) * 0.2;
        const dz = Math.sin(t * 0.6 + ix) * 0.2;

        positionsAttr.array[i3] = ix + dx;
        positionsAttr.array[i3 + 1] = iy + dy;
        positionsAttr.array[i3 + 2] = iz + dz;
      }
      
      positionsAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.03} 
        color="#52796F" 
        transparent 
        opacity={0.6} 
        sizeAttenuation 
      />
    </points>
  );
}
