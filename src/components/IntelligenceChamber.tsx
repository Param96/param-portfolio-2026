"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, Sphere, Torus, Environment } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

// ── Abstract Sculptural Elements ──

function CoreIntelligence() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Extremely slow, gravitational rotation
    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.5;
    meshRef.current.rotation.y = t * 0.1;
    
    // Subtle breathing scale
    const scale = 1 + Math.sin(t * 0.5) * 0.02;
    meshRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
      <meshPhysicalMaterial 
        color="#2F3E46" // Charcoal Blue core
        roughness={0.2}
        metalness={0.9}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={1.5}
      />
    </Sphere>
  );
}

function OrbitalRings() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 4 nested rings with different radii and rotations
  const rings = useMemo(() => {
    return Array.from({ length: 4 }).map((_, i) => ({
      radius: 3 + i * 1.5,
      tube: 0.02 + (Math.random() * 0.03),
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      speedZ: (Math.random() - 0.5) * 0.1,
      color: i % 2 === 0 ? "#D4A373" : "#84A98C" // Alternate Light Bronze & Muted Teal
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    
    // Rotate the entire orbital group slowly
    groupRef.current.rotation.y = t * 0.05;
    groupRef.current.rotation.z = Math.sin(t * 0.02) * 0.2;

    // Rotate individual rings
    groupRef.current.children.forEach((child: any, i) => {
      const ring = rings[i];
      child.rotation.x += ring.speedX * 0.05;
      child.rotation.y += ring.speedY * 0.05;
      child.rotation.z += ring.speedZ * 0.05;
    });
  });

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <Torus key={i} args={[ring.radius, ring.tube, 16, 100]}>
          <meshPhysicalMaterial 
            color={ring.color}
            roughness={0.3}
            metalness={0.8}
            emissive={ring.color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Torus>
      ))}
    </group>
  );
}

function FlowingDataParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create a massive spherical field of flowing points
  const particleCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const r = 4 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    // Flowing orbital rotation for the particle field
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.1;
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
      <pointsMaterial 
        size={0.03}
        color="#D4A373"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CinematicCamera() {
  const { camera, mouse } = useThree();
  const target = new THREE.Vector3();

  useFrame(({ clock }) => {
    // Cinematic parallax tracking mouse, highly dampened
    target.x = (mouse.x * 2);
    target.y = (mouse.y * 2);
    
    // Add a very slow autonomic drift to the camera even without mouse movement
    const t = clock.getElapsedTime();
    target.x += Math.sin(t * 0.1) * 0.5;
    target.y += Math.cos(t * 0.1) * 0.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x, 0.01);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, target.y, 0.01);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function ChamberEnvironment() {
  return (
    <>
      <CinematicCamera />
      
      {/* ── Intense Volumetric Fog & Atmospheric Depth ── */}
      <fog attach="fog" args={["#FEFAE0", 8, 30]} />
      
      {/* ── Cinematic Lighting ── */}
      <ambientLight intensity={1.5} color="#FEFAE0" />
      {/* Key Light: Muted Teal from top right */}
      <directionalLight position={[10, 10, 5]} intensity={2.5} color="#84A98C" />
      {/* Fill Light: Light Bronze from bottom left */}
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#D4A373" />
      {/* Core Backlight */}
      <pointLight position={[0, 0, -5]} intensity={2} color="#E9EDC9" />

      {/* ── Environment Reflections ── */}
      <Environment preset="city" />

      {/* ── The Living Infrastructure ── */}
      <CoreIntelligence />
      <OrbitalRings />
      
      {/* Massive particle fields to represent data flow/subconscious */}
      <FlowingDataParticles />
      <Sparkles count={200} scale={20} size={3} speed={0.1} opacity={0.15} color="#CAD2C5" />
    </>
  );
}

// ── Main Layout Component ──
export default function IntelligenceChamber() {
  return (
    <section className="relative w-full h-[120vh] min-h-[900px] overflow-hidden bg-[#FEFAE0]">
      {/* Deep Top/Bottom Atmospheric Fades */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#FEFAE0] via-[#FEFAE0]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#FEFAE0] via-[#FEFAE0]/80 to-transparent z-20 pointer-events-none" />
      
      {/* Extremely Soft Minimal Intro Text (Fades out quickly on scroll) */}
      <div className="absolute top-32 left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="opacity-50"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#84A98C] mb-4 block opacity-70">
            System Orchestration
          </span>
        </motion.div>
      </div>

      {/* Pure 3D Visual Experience */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas camera={{ position: [0, 0, 12], fov: 40 }}>
          <ChamberEnvironment />
        </Canvas>
      </div>
      
    </section>
  );
}
