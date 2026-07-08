"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float, Environment, MeshTransmissionMaterial, Ring } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";
import { useLivingSystemStore } from "@/lib/store";

// ═══════════════════════════════════════════════════════════════
// COMPACT CINEMATIC FOUNDER INTRO SECTION
// A horizontal asymmetrical cinematic layout balancing a 3D R3F
// portrait environment with minimal editorial typography.
// ═══════════════════════════════════════════════════════════════

export default function FounderIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toggleTerminal } = useLivingSystemStore();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects for right column
  const yContent = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={containerRef} className="relative bg-[var(--bg-page)] w-full py-20 md:py-40 overflow-hidden border-t border-border-strong/10">
      
      {/* ── CINEMATIC ATMOSPHERE ── */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-60">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-accent-sage/15 rounded-full blur-[150px]" />
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* ════ LEFT SIDE: 3D PORTRAIT ENVIRONMENT ════ */}
          <div className="w-full lg:w-5/12 relative h-[500px] lg:h-[700px] rounded-[20px_20px_6px_6px] overflow-hidden group shadow-[0_30px_80px_-20px_rgba(47,62,70,0.2)] bg-[var(--bark)] border border-[var(--border-line)]">
            
            {/* Base Image fallback (while loading 3D or if R3F fails) */}
            <div className="absolute inset-0 pointer-events-none" style={{ filter: 'sepia(0.15) saturate(1.08) brightness(0.98) contrast(1.05)' }}>
               <Image 
                src="/founder.jpg"
                alt="Param Patel - Founder & Engineer"
                fill
                className="object-cover object-center opacity-40 blur-md scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* R3F Canvas */}
            <div className="absolute inset-0 z-10" style={{ filter: 'sepia(0.15) saturate(1.08) brightness(0.98) contrast(1.05)' }}>
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                frameloop="demand"
                gl={{ antialias: false, alpha: true }}
              >
                <Suspense fallback={null}>
                  <PortraitScene />
                </Suspense>
              </Canvas>
            </div>

            {/* Soft Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--amber)]/10 via-transparent to-[var(--bark)]/80 z-20 pointer-events-none group-hover:from-[var(--amber)]/20 transition-colors duration-1000" />
            
            {/* Viewfinder Registration Mark */}
            <div className="absolute top-6 left-6 w-8 h-8 z-30 pointer-events-none opacity-40">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--cream)]" />
              <div className="absolute top-0 left-0 w-[1px] h-full bg-[var(--cream)]" />
            </div>
          </div>


          {/* ════ RIGHT SIDE: EDITORIAL TYPOGRAPHY & LIVE STATUS ════ */}
          <motion.div 
            style={{ y: yContent }}
            className="w-full lg:w-7/12 flex flex-col justify-center relative"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-8 h-[1px] bg-[var(--amber)]" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[var(--moss)] font-inter flex items-center gap-2 group cursor-crosshair">
                About The Builder
                <span 
                  onClick={() => toggleTerminal()}
                  className="text-[14px] opacity-30 hover:opacity-100 transition-opacity duration-1000 select-none flex items-center cursor-pointer hover:scale-110 active:scale-95"
                  title="Initialize Neural Link"
                >
                  🍎 
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ml-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[var(--moss-dim)] whitespace-nowrap">
                    ~ neural link
                  </span>
                </span>
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-fraunces text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-[var(--text-main)] leading-[1.05] mb-10"
            >
              Building Systems That Feel Like The Future
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-[var(--amber-deep)] leading-[1.6] font-medium max-w-2xl mb-16 pl-6 border-l-2 border-accent-primary/30"
            >
              Focused on building AI systems, startup products, intelligent workflows, and experimental digital environments through fast execution, continuous experimentation, and real-world iteration.
            </motion.p>

            {/* Live Status Fragments */}
            <div className="mb-20">
              <FocusFragments />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8"
            >
              {/* Organic Wavy Divider */}
              <svg className="w-16 h-3 text-[var(--amber)] opacity-30" viewBox="0 0 100 20" preserveAspectRatio="none" fill="none">
                <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 className="font-fraunces italic text-3xl md:text-[2rem] font-medium tracking-tight leading-[1.3] text-[var(--text-dim)] pr-20 md:pr-0">
                “I like building systems that survive{" "}
                <span className="text-[var(--amber)]">real-world chaos.”</span>
              </h3>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
// R3F PORTRAIT SCENE
// ─────────────────────────────────────────────────────────────────

function PortraitScene() {
  const texture = useTexture("/founder.jpg");
  const groupRef = useRef<THREE.Group>(null);

  // Cinematic Parallax based on mouse movement
  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    
    // Smooth lerping for luxurious feel
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#FEFAE0" />
      <directionalLight position={[-5, -5, 2]} intensity={1} color="#D4A373" />
      
      <Environment preset="city" />

      <group ref={groupRef}>
        
        {/* Main Portrait Plane */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[5, 6.5]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* Floating Matte Cubes */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[-2, 2, 1]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color="#84A98C" roughness={0.8} metalness={0.2} />
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
          <mesh position={[2, -1.5, 1.5]} rotation={[0, Math.PI / 4, Math.PI / 6]}>
            <boxGeometry args={[0.6, 0.6, 0.6]} />
            <meshStandardMaterial color="#D4A373" roughness={0.7} metalness={0.3} />
          </mesh>
        </Float>


        {/* Layered Glass Fragment */}
        <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[1.5, 1.5, 2]} rotation={[Math.PI / 6, Math.PI / 3, 0]}>
            <icosahedronGeometry args={[0.5, 0]} />
            <MeshTransmissionMaterial 
              backside 
              samples={4} 
              thickness={0.5} 
              roughness={0.1} 
              ior={1.5} 
              chromaticAberration={0.05} 
              transmission={1} 
              color="#CCD5AE" 
            />
          </mesh>
        </Float>

      </group>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// FLOATING LIVE STATUS FRAGMENTS
// ─────────────────────────────────────────────────────────────────

const FOCUS_AREAS = [
  { text: "Agentic AI", delay: 0, x: 20, y: 15 },
  { text: "Startup Systems", delay: 0.1, x: 70, y: 18 },
  { text: "Experimental Interfaces", delay: 0.2, x: 65, y: 70 },
  { text: "Automation Workflows", delay: 0.3, x: 25, y: 75 },
  { text: "Applied ML", delay: 0.4, x: 50, y: 85 },
  { text: "Intelligent Infrastructure", delay: 0.5, x: 45, y: 25 },
];

function FocusFragments() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="relative w-full h-[220px] md:h-[260px] -mt-6">
      {/* Central Pulsating Node */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--amber)] shadow-[0_0_15px_var(--amber)] z-10 
        animate-[pulse_3s_ease-in-out_infinite] pointer-events-none" />

      {/* SVG Constellation Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
        {FOCUS_AREAS.map((item, i) => {
          // Calculate curve control points for varied, organic lines
          const cx1 = 50 + (item.x - 50) * 0.2;
          const cy1 = item.y;
          const isHovered = hoveredIndex === i;
          return (
            <motion.path
              key={`line-${i}`}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: isHovered ? 0.8 : 0.2 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              animate={{ opacity: isHovered ? 0.8 : 0.2 }}
              d={`M 50 50 Q ${cx1} ${cy1} ${item.x} ${item.y}`}
              fill="none"
              stroke={isHovered ? "var(--amber)" : "var(--moss-dim)"}
              strokeWidth="0.4"
              className="transition-colors duration-700"
            />
          );
        })}
      </svg>
      
      <div className="relative w-full h-full">
        {FOCUS_AREAS.map((item, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <motion.div
              key={`node-${i}`}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className="group cursor-default relative px-3 py-1.5 flex items-center gap-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: isHovered ? 'translateY(-4px)' : 'translateY(0)' }}
              >
                {/* Constellation Dot */}
                <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-700 ${isHovered ? 'bg-[var(--amber)] shadow-[0_0_8px_var(--amber)]' : 'bg-[var(--moss-dim)]'}`} />
                
                {/* Text Fragment */}
                <div className={`text-xs md:text-sm font-semibold tracking-wide transition-colors duration-700 whitespace-nowrap ${isHovered ? 'text-[var(--amber)] drop-shadow-md' : 'text-[var(--moss-dim)]'}`}>
                  {item.text}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
