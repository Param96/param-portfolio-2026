"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Float, Line, Sphere, Sparkles, Stars, Environment } from "@react-three/drei";
import { motion as framerMotion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { Award, BrainCircuit } from "lucide-react";

// --- 3D NODE POSITIONS ---
const NODES = [
  { id: "root", title: "Root Foundation", color: "#CAD2C5", pos: [0, -3.5, 0], techs: ["Python", "JavaScript / TypeScript", "Data Structures", "System Thinking"] },
  { id: "db", title: "Database Systems", color: "#D4A373", pos: [-3, -1.5, 1.5], techs: ["PostgreSQL", "MongoDB", "Vector Databases", "Architecture"] },
  { id: "lang", title: "Languages", color: "#52796F", pos: [3.5, -1, 0.5], techs: ["Python", "TypeScript", "SQL"] },
  { id: "infra", title: "Cloud Infrastructure", color: "#84A98C", pos: [-3.5, 1.5, -1], techs: ["Docker", "Kubernetes", "CI/CD", "Microservices"] },
  { id: "fullstack", title: "Full Stack Ecosystem", color: "#FEFAE0", pos: [3, 2.5, 1.5], techs: ["React", "Next.js", "Node.js", "Express", "System Auth"] },
  { id: "ai", title: "AI & Machine Learning", color: "#D4A373", pos: [-1.5, 4.5, 2], techs: ["Neural Networks", "Deep Learning", "Agentic AI", "LLM Workflows"] },
  { id: "soft", title: "Leadership & Execution", color: "#FEFAE0", pos: [2, 4.5, -1.5], techs: ["E-Cell Presidency", "Team Management", "Startup Coordination"] }
];

export default function SystemsGrowthArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  const fogY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-bg-page overflow-hidden transition-colors duration-1000 ease-in-out"
    >
      {/* ── ATMOSPHERIC FOG BACKGROUND ── */}
      <framerMotion.div 
        style={{ y: fogY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-text-body/40 rounded-full blur-[120px] mix-blend-screen transition-colors duration-1000 ease-in-out" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-accent-technical/20 rounded-full blur-[150px] mix-blend-screen transition-colors duration-1000 ease-in-out" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </framerMotion.div>

      {/* ── 3D TREE SECTION (Header + Canvas) ── */}
      <div className="relative z-10 w-full flex flex-col bg-[#2F3E46] pt-24 pb-10">
        {/* ── HEADER ── */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 text-center" data-cursor="text">
          <framerMotion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white mb-6 drop-shadow-md"
          >
            Systems Growth <br />
            <span className="font-bold italic text-[var(--amber)]">Architecture</span>
          </framerMotion.h2>
          <framerMotion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#00FFCC] text-sm tracking-[0.2em] uppercase font-bold drop-shadow-md"
          >
            Evolving Intelligence Ecosystem
          </framerMotion.p>
        </div>

        {/* ── CANVAS ── */}
        <div className="w-full h-[80vh] min-h-[600px] mt-10">

        <Canvas 
          camera={{ position: [0, 0, 14], fov: 45 }}
          className="w-full h-full"
          dpr={[1, 2]} // Performance optimization
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <color attach="background" args={["#2F3E46"]} />
          <fog attach="fog" args={["#2F3E46", 10, 25]} />
          
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#FEFAE0" />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#52796F" />

          {/* Interactive Tree Scene */}
          <Scene />
        </Canvas>
        </div>
      </div>

      {/* ── CERTIFICATIONS ENVIRONMENT (2D) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-32 mt-20">
        <div className="text-center mb-20" data-cursor="text">
          <h3 className="text-3xl md:text-5xl font-light tracking-tight text-text-main mb-4 transition-colors duration-1000 ease-in-out">
            Learning Infrastructure
          </h3>
          <p className="text-[var(--moss)] text-sm tracking-[0.2em] uppercase font-bold">
            Technical Foundations & Certifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* IBM Full Stack */}
          <framerMotion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="system"
            className="group relative bg-text-body/30 border border-[#52796F]/30 p-10 lg:p-14 rounded-3xl overflow-hidden transition-colors duration-1000 ease-in-out"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FEFAE0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <Award className="w-10 h-10 text-[var(--amber)] mb-8" />
            <h4 className="text-2xl font-bold text-text-main mb-2 transition-colors duration-1000 ease-in-out">IBM Full Stack Software Developer</h4>
            <p className="text-[var(--text-dim)] mb-8 text-sm leading-relaxed">
              Comprehensive architectural certification spanning cloud native deployment, microservices, and modern frontend frameworks.
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Docker", "Kubernetes", "CI/CD"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-[var(--bark)] border border-[#52796F]/30 text-xs text-[var(--moss)] font-bold tracking-wider uppercase rounded-sm transition-colors duration-1000 ease-in-out">
                  {tech}
                </span>
              ))}
            </div>
          </framerMotion.div>

          {/* Andrew Ng ML */}
          <framerMotion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="system"
            className="group relative bg-text-body/30 border border-[#52796F]/30 p-10 lg:p-14 rounded-3xl overflow-hidden transition-colors duration-1000 ease-in-out"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <BrainCircuit className="w-10 h-10 text-[var(--moss)] mb-8" />
            <h4 className="text-2xl font-bold text-text-main mb-2 transition-colors duration-1000 ease-in-out">Machine Learning Specialization</h4>
            <p className="text-[var(--text-dim)] mb-8 text-sm leading-relaxed">
              Foundational intelligence systems certification by Stanford / Andrew Ng covering deep learning, neural networks, and model optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Neural Networks", "Supervised Learning", "TensorFlow"].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-[var(--bark)] border border-[#52796F]/30 text-xs text-[var(--amber)] font-bold tracking-wider uppercase rounded-sm transition-colors duration-1000 ease-in-out">
                  {tech}
                </span>
              ))}
            </div>
          </framerMotion.div>
        </div>
      </div>
    </section>
  );
}

// ── 3D COMPONENTS ──

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { viewport } = useThree();
  const scale = viewport.width < 8 ? viewport.width / 8 : 1;

  // Camera parallax tied to mouse
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow cinematic idle rotation
      groupRef.current.rotation.y += 0.001;
      
      // Target rotation based on mouse
      const targetX = (state.pointer.y * 0.1);
      const targetY = (state.pointer.x * 0.2);
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Central Trunk */}
      <Trunk />

      {/* Nodes & Connecting Branches */}
      {NODES.map((node, i) => (
        <group key={node.id}>
          {/* Branch Line connecting trunk to node */}
          <Line 
            points={[[0, node.pos[1] * 0.5, 0], node.pos as [number, number, number]]}
            color={node.color}
            opacity={0.15}
            transparent
            lineWidth={1.5}
          />
          {/* Interactive Node */}
          <SystemNode data={node} delay={i * 0.1} />
        </group>
      ))}

      {/* Atmospheric Particles */}
      <Sparkles count={150} scale={12} size={2} speed={0.2} opacity={0.2} color="#FEFAE0" />
      <Stars radius={20} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
}

function Trunk() {
  // An abstract vertical architecture representing the trunk
  return (
    <group>
      {/* Main thick pillar */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.4, 12, 6]} />
        <meshStandardMaterial 
          color="#52796F" 
          transparent 
          opacity={0.3} 
          wireframe
        />
      </mesh>
      
      {/* Inner glowing core */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 10, 8]} />
        <meshBasicMaterial color="#FEFAE0" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function SystemNode({ data, delay }: { data: typeof NODES[0], delay: number }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const currentScale = useRef(1);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      // Gentle floating (local offset only, because group is already positioned)
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + delay) * 0.2;
      
      // Smooth scale interpolation via lerp
      const targetScale = hovered ? 1.5 : 1;
      currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.1);
      meshRef.current.scale.set(currentScale.current, currentScale.current, currentScale.current);
    }
  });

  return (
    <group position={data.pos as [number, number, number]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            setHovered(!hovered);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = 'none'; // Ensure custom cursor persists if needed
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
          }}
        >
          {/* Abstract geometric node (Dodecahedron looks highly technical) */}
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial 
            color={hovered ? "#FEFAE0" : data.color} 
            emissive={hovered ? data.color : "#000000"} 
            emissiveIntensity={hovered ? 0.8 : 0}
            wireframe={!hovered}
            transparent
            opacity={hovered ? 1 : 0.6}
          />
        </mesh>
      </Float>

      {/* HTML Overlay rendering standard DOM for crisp text */}
      <Html 
        position={[0, -0.6, 0]} 
        center 
        style={{ pointerEvents: "none" }}
        zIndexRange={[100, 0]}
      >
        <framerMotion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: hovered ? 1 : 0.3, 
            y: hovered ? 0 : 10,
            scale: hovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center whitespace-nowrap"
        >
          <h4 className="text-white font-bold text-sm tracking-widest uppercase bg-[#232A2E]/80 backdrop-blur-md px-4 py-2 border border-[#52796F]/50 shadow-[0_0_20px_rgba(47,62,70,0.5)] transition-colors duration-1000 ease-in-out">
            {data.title}
          </h4>
          
          {hovered && (
            <div className="flex flex-col items-center gap-1 mt-3">
              {data.techs.map((tech, i) => (
                <framerMotion.span 
                  key={tech}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-[#FEFAE0] text-[10px] uppercase tracking-widest font-inter drop-shadow-md"
                >
                  {tech}
                </framerMotion.span>
              ))}
            </div>
          )}
        </framerMotion.div>
      </Html>
    </group>
  );
}
