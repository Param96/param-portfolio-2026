"use client";

import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";
import { useScroll, ScrollControls, Scroll } from "@react-three/drei";
import { ArrowUpRight, Code, TerminalSquare, FlaskConical, GitBranch, Cpu, Briefcase, Download } from "lucide-react";
import posthog from "posthog-js";

// A curved dirt path leading to the horizon
function DirtPath() {
  const curve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.01, 15),
    new THREE.Vector3(-1, 0.01, 8),
    new THREE.Vector3(2, 0.01, 0),
    new THREE.Vector3(-1, 0.01, -10),
    new THREE.Vector3(1, 0.01, -25),
    new THREE.Vector3(-2, 0.01, -40),
    new THREE.Vector3(0, 0.01, -60),
  ]), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <tubeGeometry args={[curve, 128, 1.2, 12, false]} />
      {/* Dirt colored path blending slightly */}
      <meshStandardMaterial color="#8b6b4a" roughness={0.9} flatShading />
    </mesh>
  );
}

// A simple stacked stone cairn
function Cairn({ position, scale = 1, rotation = [0,0,0] }: { position: [number, number, number], scale?: number, rotation?: [number, number, number] }) {
  return (
    <group position={position} scale={scale} rotation={rotation as any}>
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.4, 1]} />
        <meshStandardMaterial color="#7a7f7d" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.6, 0]} rotation={[0.2, 0.5, 0.1]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.25, 1]} />
        <meshStandardMaterial color="#8c918f" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.9, 0]} rotation={[-0.1, -0.3, 0.2]} castShadow receiveShadow>
        <dodecahedronGeometry args={[0.15, 1]} />
        <meshStandardMaterial color="#9ea3a1" roughness={0.8} />
      </mesh>
    </group>
  );
}

// The main animated scene for the resume
function ResumeSceneContent() {
  const scroll = useScroll();
  const cameraGroup = useRef<THREE.Group>(null);
  
  // Milestones along the path
  const cairns = [
    { pos: [-1.5, 0, 8] as [number, number, number], rot: [0, 0.5, 0] },     // Header/Intro
    { pos: [2.5, 0, 0] as [number, number, number], rot: [0, -0.2, 0] },      // Research
    { pos: [-1.8, 0, -10] as [number, number, number], rot: [0, 0.8, 0] },    // Systems 
    { pos: [1.5, 0, -25] as [number, number, number], rot: [0, -0.5, 0] },    // Operations
    { pos: [-2.5, 0, -40] as [number, number, number], rot: [0, 0.3, 0] },    // Contact
  ];

  useFrame(() => {
    if (cameraGroup.current) {
      // Scroll moves camera forward along Z axis
      // Total travel distance is about 50 units
      const zOffset = scroll.offset * 50; 
      cameraGroup.current.position.z = -zOffset;
    }
  });

  return (
    <group>
      <DirtPath />
      {cairns.map((c, i) => (
        <Cairn key={i} position={c.pos} rotation={c.rot as any} />
      ))}
      <group ref={cameraGroup}>
        {/* We place a small light attached to the camera to ensure cairns are well lit as we pass them */}
        <pointLight position={[0, 2, 2]} intensity={0.5} distance={10} color="#ffecd1" />
      </group>
    </group>
  );
}

export default function ResumeHero() {
  return (
    <div className="w-full h-screen relative bg-[#ffb380] overflow-hidden">
      <MeadowEnvironment isGoldenHourOverride={true} cameraPosition={[0, 1.5, 12]} focusDistance={0.03}>
        <ScrollControls pages={6} damping={0.15}>
          <ResumeSceneContent />
          
          <Scroll html style={{ width: '100%', height: '100%' }}>
            {/* Download PDF Button */}
            <div className="fixed top-24 right-6 md:right-12 z-50">
               <a 
                 href="/resume.pdf" 
                 target="_blank"
                 className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-accent-primary/20 text-[var(--text-main)] hover:bg-[var(--amber)] hover:text-bg-main transition-colors text-xs font-inter uppercase tracking-widest"
               >
                 <Download className="w-4 h-4" /> PDF Version
               </a>
            </div>

            {/* PAGE 1: INTRO */}
            <div className="w-full h-screen flex flex-col justify-center px-6 md:px-24">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--moss)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--moss)]"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--moss)] font-inter">
                    Founder & Systems Engineer
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] mb-8 text-[#2b1b17]">
                  Param <span className="font-serif italic text-[var(--amber)]">Patel</span>
                </h1>
                <p className="text-lg md:text-xl text-[#4a2c26] leading-relaxed font-light max-w-2xl backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20 shadow-[var(--shadow-soft)]">
                  An AI systems builder, experimental product developer, and applied ML engineer. I build intelligent infrastructure, orchestration workflows, and automation environments. A technical founder exploring the intersection of real-world deployment and scalable systems architecture.
                </p>
                <div className="flex flex-wrap gap-6 mt-8 text-sm font-bold uppercase tracking-widest text-[#703838] font-inter">
                  <a href="mailto:paramppatel100@gmail.com" className="hover:text-[#2b1b17] transition-colors flex items-center gap-2">
                    <TerminalSquare className="w-4 h-4" /> Email
                  </a>
                  <a href="https://github.com/Param96" className="hover:text-[#2b1b17] transition-colors flex items-center gap-2">
                    <Code className="w-4 h-4" /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/paramp06/" className="hover:text-[#2b1b17] transition-colors flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> LinkedIn
                  </a>
                </div>
              </div>
            </div>
            
            {/* PAGE 2: RESEARCH INFRASTRUCTURE */}
            <div className="w-full h-screen flex flex-col justify-center px-6 md:px-24 items-end text-right mt-[50vh]">
              <div className="max-w-2xl backdrop-blur-md bg-[#ffecd1]/20 p-8 md:p-12 rounded-3xl border border-white/20 shadow-[var(--shadow-soft)]">
                <div className="border-b border-accent-sage/20 pb-6 mb-8 flex items-center justify-end gap-4">
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2b1b17]">Research Infrastructure</h2>
                  <FlaskConical className="w-8 h-8 text-[var(--moss)]" />
                </div>
                <div className="flex flex-col gap-2 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--amber)] font-inter">Lead — Data Analysis & Verification</span>
                  <span className="text-sm font-bold text-[#703838]">CERT-IN Initiative</span>
                </div>
                <h3 className="text-2xl font-medium text-[#2b1b17] mb-6">Cybersecurity Educational Verification</h3>
                <p className="text-lg text-[#4a2c26] leading-relaxed font-light mb-4">
                  A government-recognized cybersecurity educational initiative focused on collecting, organizing, validating, and structuring cybersecurity learning resources across global platforms.
                </p>
                <p className="text-lg text-[#4a2c26] leading-relaxed font-light">
                  Leading the Data Analysis & Verification Team to design structured verification workflows. Responsible for building AI-assisted validation systems, structuring educational intelligence pipelines, and validating information directly from PDFs, datasets, websites, and course metadata.
                </p>
              </div>
            </div>

            {/* PAGE 3: EVOLVING SYSTEMS */}
            <div className="w-full h-screen flex flex-col justify-center px-6 md:px-24 mt-[50vh]">
              <div className="max-w-2xl backdrop-blur-md bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-[var(--shadow-soft)]">
                <div className="border-b border-accent-sage/20 pb-6 mb-8 flex items-center gap-4">
                  <Cpu className="w-8 h-8 text-[var(--amber)]" />
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2b1b17]">Evolving Systems</h2>
                </div>
                
                <div className="mb-10">
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--moss)] font-inter">Active Infrastructure</span>
                    <h3 className="text-2xl font-medium text-[#2b1b17]">AI Verify Agent</h3>
                  </div>
                  <p className="text-base text-[#4a2c26] font-light leading-relaxed">
                    An intelligent educational verification infrastructure designed to validate course-related information from unstructured datasets. Built with XGBoost-based validation workflows.
                  </p>
                </div>

                <div className="mb-10">
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--amber)] font-inter">Experimental Platform</span>
                    <h3 className="text-2xl font-medium text-[#2b1b17]">Pactify</h3>
                  </div>
                  <p className="text-base text-[#4a2c26] font-light leading-relaxed">
                    An AI-powered founder workflow platform exploring automation systems, operational productivity infrastructure, and safe generation systems.
                  </p>
                </div>
                
                <div>
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#703838] font-inter">Orchestration Engine</span>
                    <h3 className="text-2xl font-medium text-[#2b1b17]">Jarvis</h3>
                  </div>
                  <p className="text-base text-[#4a2c26] font-light leading-relaxed">
                    A modular agentic AI assistant system inspired by autonomous orchestration workflows. Built to experiment with AI copilots.
                  </p>
                </div>
              </div>
            </div>
            
            {/* PAGE 4: OPERATIONAL LEADERSHIP */}
            <div className="w-full h-screen flex flex-col justify-center px-6 md:px-24 items-end text-right mt-[50vh]">
              <div className="max-w-2xl backdrop-blur-md bg-[#ffecd1]/20 p-8 md:p-12 rounded-3xl border border-white/20 shadow-[var(--shadow-soft)]">
                <div className="border-b border-accent-sage/20 pb-6 mb-8 flex items-center justify-end gap-4">
                  <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2b1b17]">Leadership</h2>
                  <GitBranch className="w-8 h-8 text-[var(--moss)]" />
                </div>
                
                <div className="mb-10">
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--amber)] font-inter">Founder & President</span>
                    <h3 className="text-2xl font-medium text-[#2b1b17]">Entrepreneurship Cell</h3>
                  </div>
                  <p className="text-base text-[#4a2c26] font-light leading-relaxed">
                    Built and scaled a 30-member execution team focused on entrepreneurial ecosystems. Directed execution systems, secured mentorship MoUs, and organized startup-focused initiatives.
                  </p>
                </div>

                <div>
                  <div className="flex flex-col gap-1 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--moss)] font-inter">Engineering Intern</span>
                    <h3 className="text-2xl font-medium text-[#2b1b17]">YIIC 2.0</h3>
                  </div>
                  <p className="text-base text-[#4a2c26] font-light leading-relaxed">
                    Shipped production-ready features for experimental tech initiatives. Collaborated directly with technical leads to optimize backend pipelines and integrate new API endpoints.
                  </p>
                </div>
              </div>
            </div>

            {/* PAGE 5: CTA */}
            <div className="w-full h-screen flex flex-col justify-center px-6 md:px-24 mt-[50vh]">
              <div className="max-w-3xl backdrop-blur-md bg-white/20 p-12 md:p-20 rounded-3xl border border-white/30 shadow-xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#703838] mb-6 block font-inter">
                  Open For Interaction
                </span>
                <h2 className="text-4xl md:text-5xl font-light tracking-tighter leading-[1.1] mb-8 text-[#2b1b17]">
                  Actively seeking ambitious <br />
                  <span className="font-serif italic text-[var(--moss)]">startup collaborations</span> and <br />
                  <span className="font-serif italic text-[var(--amber)]">experimental engineering</span> roles.
                </h2>
                <a href="mailto:paramppatel100@gmail.com" className="inline-flex items-center gap-4 group/btn mt-4 cursor-pointer">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#4a2c26] group-hover/btn:text-[var(--amber)] transition-colors font-inter">
                    Initialize Contact
                  </span>
                  <div className="w-10 h-10 rounded-full border border-[#703838]/30 flex items-center justify-center group-hover/btn:bg-[var(--amber)] group-hover/btn:border-[var(--amber)] group-hover/btn:text-white transition-all duration-500 bg-white/40">
                    <ArrowUpRight className="w-4 h-4 text-[#2b1b17] group-hover/btn:text-white transition-colors duration-500" />
                  </div>
                </a>
              </div>
            </div>

          </Scroll>
        </ScrollControls>
      </MeadowEnvironment>
    </div>
  );
}
