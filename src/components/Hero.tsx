"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// --- Cinematic Evolving Geometry ---
function EvolvingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
    
    // Slow breathing effect
    const scale = 1 + Math.sin(t * 0.5) * 0.05;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshPhysicalMaterial 
        color="#2F3E46" 
        wireframe={true}
        transparent
        opacity={0.3}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

// --- Atmospheric Particles ---
function AtmosphericParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particleCount = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.03;
    pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial transparent color="#D4A373" size={0.02} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
    </points>
  );
}

function CinematicEnvironment() {
  return (
    <>
      <ambientLight intensity={1} color="#FAEDCD" />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#D4A373" />
      <directionalLight position={[-5, -5, -5]} intensity={1} color="#84A98C" />
      
      <EvolvingGeometry />
      <AtmosphericParticles />
      
      <Environment preset="city" />
      <fog attach="fog" args={["#FEFAE0", 3, 10]} />
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#FEFAE0]">
      
      {/* Background Abstract WebGL Environment */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-80 pointer-events-none hidden lg:block">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <CinematicEnvironment />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Minimal Editorial Typography */}
        <div className="lg:col-span-8 flex flex-col items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-12 h-[1px] bg-[#D4A373]/50" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#84A98C] font-jetbrains">
              Experimental Engineering
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-[5rem] font-bold tracking-[-0.03em] text-[#2F3E46] leading-[1.1] mb-8"
          >
            Building intelligent <br className="hidden md:block" />
            <span className="text-[#354F52] italic font-light">systems,</span> experimental <br className="hidden md:block" />
            AI workflows, and evolving <br className="hidden md:block" />
            <span className="text-[#D4A373]">research infrastructure.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[#52796F] font-medium leading-relaxed max-w-2xl mb-12"
          >
            AI/ML, agentic systems, automation experiments, research workflows, and startup-driven engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link
              href="/projects"
              className="px-8 py-4 rounded-none border border-[#2F3E46]/20 bg-[#2F3E46] text-[#FEFAE0] font-bold text-xs tracking-[0.2em] uppercase hover:bg-transparent hover:text-[#2F3E46] transition-all flex items-center gap-3 group"
            >
              Explore Systems
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/research"
              className="px-8 py-4 rounded-none border border-[#D4A373]/30 text-[#D4A373] font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#D4A373]/10 transition-colors"
            >
              Research &amp; Projects
            </Link>
          </motion.div>

        </div>
        
        {/* The right side is left empty to allow the background 3D canvas to breathe and act as the visual focus */}
        <div className="lg:col-span-4 hidden lg:block"></div>

      </div>
    </section>
  );
}