"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, TorusKnot, Wireframe } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProjectsHero3D() {
  return (
    <div className="relative w-full min-h-screen bg-[#F6F1E3] overflow-hidden flex flex-col md:flex-row items-center">
      
      {/* ── ATMOSPHERIC LIGHTING (HTML layer) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E9EDC9]/40 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#CCD5AE]/20 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />
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
            Systems Architecture
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tighter text-[#2F3E46] leading-[0.9] mb-8">
            Systems <br />
            <span className="font-serif italic text-[#52796F]">In Motion.</span>
          </h1>
          <p className="text-lg text-[#52796F] leading-relaxed max-w-md font-medium mb-12">
            Building intelligent products, automation systems, and evolving infrastructure.
          </p>
          
          <Link href="#work" className="inline-flex items-center gap-4 group">
            <span className="text-sm font-bold uppercase tracking-widest text-[#2F3E46] group-hover:text-[#84A98C] transition-colors">
              Explore Projects
            </span>
            <div className="w-10 h-10 rounded-full border border-[#2F3E46]/20 flex items-center justify-center group-hover:border-[#84A98C] group-hover:bg-[#84A98C] group-hover:text-white transition-all duration-500">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* ── RIGHT: MINIMAL 3D OBJECT ── */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative z-10 mt-10 md:mt-0">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }} // Transparent background
        >
          {/* Subtle minimal lighting */}
          <ambientLight intensity={0.4} color="#FEFAE0" />
          <directionalLight position={[5, 10, 5]} intensity={1.5} color="#FEFAE0" />
          <directionalLight position={[-5, -10, -5]} intensity={0.5} color="#84A98C" />
          
          <Scene />
        </Canvas>
      </div>
      
    </div>
  );
}

function Scene() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Extremely slow, elegant rotation
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Gentle parallax based on mouse
      const targetX = (state.pointer.y * 0.1);
      const targetY = (state.pointer.x * 0.1);
      
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {/* One single evolving architectural object */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group scale={1.2}>
          {/* Inner solid core */}
          <mesh>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial 
              color="#FDFBF7" 
              roughness={0.1} 
              metalness={0.8}
            />
          </mesh>
          
          {/* Outer wireframe architecture */}
          <mesh>
            <icosahedronGeometry args={[2.5, 1]} />
            <meshStandardMaterial 
              color="#84A98C" 
              wireframe 
              transparent 
              opacity={0.3}
            />
          </mesh>
          
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[3.2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#D4A373" transparent opacity={0.6} />
          </mesh>
          
          <mesh rotation={[-Math.PI / 4, -Math.PI / 4, 0]}>
            <torusGeometry args={[3.2, 0.02, 16, 100]} />
            <meshStandardMaterial color="#52796F" transparent opacity={0.4} />
          </mesh>
        </group>
      </Float>

      {/* Very faint, slow atmospheric particles */}
      <Sparkles count={50} scale={15} size={1} speed={0.2} opacity={0.2} color="#84A98C" />
    </group>
  );
}
