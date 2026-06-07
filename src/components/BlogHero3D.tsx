"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, Text } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowDown } from "lucide-react";

export default function BlogHero3D() {
  return (
    <div className="relative w-full min-h-screen bg-[#F6F1E3] overflow-hidden flex flex-col md:flex-row items-center">
      
      {/* ── ATMOSPHERIC LIGHTING (HTML layer) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-[#D4A373]/10 rounded-full blur-[150px] translate-x-1/4" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#CCD5AE]/20 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* ── LEFT: EDITORIAL TYPOGRAPHY ── */}
      <div className="w-full md:w-1/2 relative z-20 px-6 md:pl-20 lg:pl-32 pt-32 md:pt-0 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#D4A373] mb-8 block">
            Editorial Intelligence
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-light tracking-tighter text-[#2F3E46] leading-[0.9] mb-8">
            Thought <br />
            <span className="font-serif italic text-[#84A98C]">Systems.</span>
          </h1>
          <p className="text-lg text-[#52796F] leading-relaxed max-w-md font-medium mb-12">
            Research notes, engineering ideas, startup observations, and intelligent workflows.
          </p>
          
          <div className="inline-flex items-center gap-4 group cursor-pointer">
            <span className="text-sm font-bold uppercase tracking-widest text-[#2F3E46] opacity-50">
              Read Articles
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
          <ambientLight intensity={0.6} color="#FFFFFF" />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#FEFAE0" />
          <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#D4A373" />
          
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
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      
      // Gentle parallax based on mouse
      const targetX = (state.pointer.y * 0.1);
      const targetY = (state.pointer.x * 0.1);
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Translucent Editorial Planes */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <group rotation={[Math.PI / 6, -Math.PI / 6, 0]}>
          
          {/* Plane 1 (Back) */}
          <mesh position={[0, 0, -2]}>
            <planeGeometry args={[5, 6.5]} />
            <meshStandardMaterial color="#E9EDC9" transparent opacity={0.3} roughness={0.2} side={THREE.DoubleSide} />
          </mesh>

          {/* Plane 2 (Middle) */}
          <mesh position={[0.5, -0.5, -0.5]} rotation={[0, 0, 0.1]}>
            <planeGeometry args={[5, 6.5]} />
            <meshStandardMaterial color="#FEFAE0" transparent opacity={0.5} roughness={0.1} side={THREE.DoubleSide} />
            <Text
              position={[-1.5, 2, 0.01]}
              fontSize={0.2}
              color="#84A98C"
              anchorX="left"
              anchorY="top"
              font="https://fonts.gstatic.com/s/playfairdisplay/v29/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
            >
              System.Logic
            </Text>
          </mesh>

          {/* Plane 3 (Front) */}
          <mesh position={[1, -1, 1]} rotation={[0, 0, -0.05]}>
            <planeGeometry args={[5, 6.5]} />
            <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} roughness={0.1} side={THREE.DoubleSide} />
            <Text
              position={[-1.5, 2, 0.01]}
              fontSize={0.3}
              color="#2F3E46"
              anchorX="left"
              anchorY="top"
              font="https://fonts.gstatic.com/s/playfairdisplay/v29/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtM.woff"
              maxWidth={3}
            >
              Architecture
            </Text>
            <Text
              position={[-1.5, 1.2, 0.01]}
              fontSize={0.15}
              color="#52796F"
              anchorX="left"
              anchorY="top"
              maxWidth={3.5}
            >
              The geometry of thought dictates the scalability of the resulting infrastructure. We build not to contain, but to channel.
            </Text>
          </mesh>
          
        </group>
      </Float>

      {/* Very faint atmospheric dust */}
      <Sparkles count={40} scale={10} size={2} speed={0.2} opacity={0.15} color="#D4A373" />
    </group>
  );
}
