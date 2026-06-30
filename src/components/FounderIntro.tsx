"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, Float, Environment, MeshTransmissionMaterial, Ring } from "@react-three/drei";
import * as THREE from "three";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════
// COMPACT CINEMATIC FOUNDER INTRO SECTION
// A horizontal asymmetrical cinematic layout balancing a 3D R3F
// portrait environment with minimal editorial typography.
// ═══════════════════════════════════════════════════════════════

export default function FounderIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects for right column
  const yContent = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={containerRef} className="relative bg-[var(--bg-page)] w-full py-32 md:py-40 overflow-hidden border-t border-border-strong/10">
      
      {/* ── CINEMATIC ATMOSPHERE ── */}
      <div className="absolute inset-0 pointer-events-none z-0 mix-blend-multiply opacity-60">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-accent-sage/15 rounded-full blur-[150px]" />
      </div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none z-0" />

      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* ════ LEFT SIDE: 3D PORTRAIT ENVIRONMENT ════ */}
          <div className="w-full lg:w-5/12 relative h-[500px] lg:h-[700px] rounded-[2rem] overflow-hidden group shadow-[0_30px_80px_-20px_rgba(47,62,70,0.2)] bg-[var(--bark)]">
            
            {/* Base Image fallback (while loading 3D or if R3F fails) */}
            <div className="absolute inset-0 pointer-events-none">
               <Image 
                src="/founder.png"
                alt="Param Patel - Founder & Engineer"
                fill
                className="object-cover object-center opacity-40 blur-md scale-110"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* R3F Canvas */}
            <div className="absolute inset-0 z-10">
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 45 }}
                dpr={[1, 1.5]}
                frameloop="demand" // Only renders on change (parallax/float)
                gl={{ antialias: false, alpha: true }}
              >
                <Suspense fallback={null}>
                  <PortraitScene />
                </Suspense>
              </Canvas>
            </div>

            {/* Soft Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#354F52]/40 via-transparent to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#FEFAE0]/90 via-[#FEFAE0]/20 to-transparent z-20 pointer-events-none" />
            
            {/* Cinematic Border Frame */}
            <div className="absolute inset-0 border border-accent-primary/20 rounded-[2rem] z-30 pointer-events-none group-hover:border-accent-primary/40 transition-colors duration-1000" />
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
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[var(--moss)] font-inter">
                About The Builder
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-[var(--text-main)] leading-[1.05] mb-10"
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
            >
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[1.3] text-[var(--text-dim)]">
                “I like building systems that survive{" "}
                <span className="text-[var(--amber)] italic">real-world chaos.”</span>
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
  const texture = useTexture("/founder.png");
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

        {/* Cinematic Orbital Topology Ring */}
        <Float speed={1} rotationIntensity={2} floatIntensity={0.5}>
          <mesh position={[0, -0.5, 0.5]} rotation={[Math.PI / 2.5, 0, 0]}>
            <torusGeometry args={[2.5, 0.02, 16, 100]} />
            <meshStandardMaterial color="#FEFAE0" opacity={0.6} transparent />
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
  { text: "Agentic AI", delay: 0 },
  { text: "Startup Systems", delay: 0.1 },
  { text: "Experimental Interfaces", delay: 0.2 },
  { text: "Automation Workflows", delay: 0.3 },
  { text: "Applied ML", delay: 0.4 },
  { text: "Intelligent Infrastructure", delay: 0.5 },
];

function FocusFragments() {
  return (
    <div className="relative w-full h-[180px]">
      <div className="absolute -inset-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A373]/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative w-full h-full">
        {FOCUS_AREAS.map((item, i) => {
          // Generate somewhat randomized positions for the floating effect
          const xPos = [10, 40, 70, 20, 60, 85][i] + "%";
          const yPos = [20, 10, 30, 70, 60, 80][i] + "%";
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: item.delay, ease: "easeOut" }}
              className="absolute"
              style={{ left: xPos, top: yPos }}
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                <div className="group cursor-default relative px-4 py-2">
                  {/* Cinematic Aura */}
                  <div className="absolute inset-0 bg-accent-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Text Fragment */}
                  <div className="relative text-sm md:text-base font-bold tracking-tight text-[var(--moss)] group-hover:text-[var(--amber)] transition-colors duration-700 whitespace-nowrap">
                    {item.text}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
