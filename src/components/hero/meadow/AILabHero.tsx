"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

function NexusPool() {
  const waterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (waterRef.current) {
      // Simulate ripples by rotating slightly or we could use a custom shader.
      // For now, we'll just have a highly reflective surface.
    }
  });

  return (
    <group position={[1, 0.02, -3.5]}>
      {/* Stone border for the pool */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.5, 1.8, 32]} />
        <meshStandardMaterial color="#4a504d" roughness={0.9} flatShading />
      </mesh>

      {/* Water surface */}
      <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[1.5, 32]} />
        <meshPhysicalMaterial
          color="#a8d5d0"
          transmission={0.8}
          roughness={0.05}
          ior={1.33}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

function Fireflies() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 15;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((fly, i) => {
        // Orbit and bob around
        fly.position.y = Math.sin(time * 2 + i) * 0.5 + 1;
        fly.position.x = Math.cos(time * 0.5 + i) * 1.5 + 1;
        fly.position.z = Math.sin(time * 0.7 + i) * 1.5 - 3.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color="#a3ddff" />
          <pointLight color="#a3ddff" intensity={0.1} distance={1} />
        </mesh>
      ))}
    </group>
  );
}

function WoodenDesk() {
  const length = 1.8;
  const width = 1.0;
  const height = 0.1;
  const legHeight = 0.6;
  const legThickness = 0.1;

  return (
    <group position={[-2.0, 0.6, -3.8]} rotation={[0, 0.4, 0]}>
      {/* Table Top */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[length, height, width]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
      </mesh>
      {/* Legs */}
      {/* Front Left */}
      <mesh position={[-length / 2 + 0.1, -legHeight / 2, width / 2 - 0.1]} receiveShadow castShadow>
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
      </mesh>
      {/* Front Right */}
      <mesh position={[length / 2 - 0.1, -legHeight / 2, width / 2 - 0.1]} receiveShadow castShadow>
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
      </mesh>
      {/* Back Left */}
      <mesh position={[-length / 2 + 0.1, -legHeight / 2, -width / 2 + 0.1]} receiveShadow castShadow>
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
      </mesh>
      {/* Back Right */}
      <mesh position={[length / 2 - 0.1, -legHeight / 2, -width / 2 + 0.1]} receiveShadow castShadow>
        <boxGeometry args={[legThickness, legHeight, legThickness]} />
        <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
      </mesh>
    </group>
  );
}

function FieldJournal() {
  const leftPageRef = useRef<THREE.Mesh>(null);
  const rightPageRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (rightPageRef.current) {
      // Subtle flutter
      rightPageRef.current.rotation.z = Math.sin(time * 3) * 0.05 - 0.05;
    }
  });

  return (
    <group position={[-2.3, 0.66, -4.0]} rotation={[0, 0.1, 0]}>
      {/* Leather Cover */}
      <mesh position={[0, -0.02, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.02, 0.6]} />
        <meshStandardMaterial color="#2c1a0e" roughness={0.8} />
      </mesh>

      {/* Left Page (Static) */}
      <mesh position={[-0.22, 0, 0]}>
        <boxGeometry args={[0.4, 0.01, 0.55]} />
        <meshStandardMaterial color="#f0e6d2" roughness={0.9} />
      </mesh>

      {/* Right Page (Fluttering) */}
      <mesh ref={rightPageRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.4, 0.01, 0.55]} />
        <meshStandardMaterial color="#f0e6d2" roughness={0.9} />
      </mesh>
    </group>
  );
}

import { useLivingSystemStore } from "@/lib/store";

function Computer() {
  const globalTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const isNight = globalTheme === "night";
  const glowIntensity = isNight ? 3.0 : 0.5;
  const glowDistance = isNight ? 3.0 : 1.5;

  return (
    <group position={[-1.7, 0.66, -3.6]} rotation={[0, 0.4, 0]} scale={[1.4, 1.4, 1.4]}>
      {/* Laptop Base */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[0.35, 0.02, 0.25]} />
        <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Laptop Screen */}
      <mesh position={[0, 0.12, -0.12]} rotation={[0.2, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.35, 0.25, 0.02]} />
        <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Screen Glow */}
      <mesh position={[0, 0.12, -0.11]} rotation={[0.2, 0, 0]}>
        <planeGeometry args={[0.33, 0.23]} />
        <meshBasicMaterial color="#a3ddff" />
        <pointLight color="#a3ddff" intensity={glowIntensity} distance={glowDistance} position={[0, 0, 0.1]} />
      </mesh>
    </group>
  );
}

function WoodenChair() {
  return (
    <group position={[-1.6, 0, -3.2]} rotation={[0, 3.5, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.4, 0.05, 0.4]} />
        <meshStandardMaterial color="#2d1b0f" roughness={0.9} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.55, 0.18]} receiveShadow castShadow>
        <boxGeometry args={[0.4, 0.4, 0.05]} />
        <meshStandardMaterial color="#2d1b0f" roughness={0.9} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.15, 0.175, -0.15]} receiveShadow castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#2d1b0f" roughness={0.9} />
      </mesh>
      <mesh position={[0.15, 0.175, -0.15]} receiveShadow castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#2d1b0f" roughness={0.9} />
      </mesh>
      <mesh position={[-0.15, 0.175, 0.15]} receiveShadow castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#2d1b0f" roughness={0.9} />
      </mesh>
      <mesh position={[0.15, 0.175, 0.15]} receiveShadow castShadow>
        <boxGeometry args={[0.05, 0.35, 0.05]} />
        <meshStandardMaterial color="#2d1b0f" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Person() {
  const headRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (headRef.current) {
      // Slight head bobbing / thinking movement
      headRef.current.rotation.x = Math.sin(time * 0.5) * 0.1 + 0.1;
      headRef.current.rotation.y = Math.sin(time * 0.3) * 0.1;
    }
  });

  return (
    <group position={[-1.6, 0.35, -3.2]} rotation={[0, 3.5, 0]}>
      {/* Torso */}
      <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.35, 0.4, 0.2]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} /> {/* Dark hoodie */}
      </mesh>

      {/* Head */}
      <group position={[0, 0.55, 0]} ref={headRef}>
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#fcd5ce" roughness={0.5} /> {/* Skin tone */}
        </mesh>
      </group>

      {/* Arms reaching towards computer */}
      {/* Left arm */}
      <mesh position={[-0.2, 0.25, -0.1]} rotation={[-1.0, 0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>
      {/* Right arm */}
      <mesh position={[0.2, 0.25, -0.1]} rotation={[-1.0, -0.3, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color="#1f2937" roughness={0.8} />
      </mesh>

      {/* Legs down the chair */}
      <mesh position={[-0.1, -0.15, -0.1]} rotation={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#111827" roughness={0.9} /> {/* Pants */}
      </mesh>
      <mesh position={[0.1, -0.15, -0.1]} rotation={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#111827" roughness={0.9} />
      </mesh>
    </group>
  );
}

function DustMotes() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 50;

  const dustData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 4 - 1,
      y: Math.random() * 2,
      z: (Math.random() - 0.5) * 4 - 2.5,
      speed: Math.random() * 0.2 + 0.1,
      wobble: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((dust, i) => {
        const data = dustData[i];
        dust.position.y += Math.sin(time * data.speed + data.wobble) * 0.005;
        dust.position.x += Math.cos(time * data.speed + data.wobble) * 0.005;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {dustData.map((data, i) => (
        <mesh key={i} position={[data.x, data.y, data.z]}>
          <planeGeometry args={[0.015, 0.015]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function Fishes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((fish, i) => {
        const angle = time * 0.5 + i * (Math.PI * 2 / 3);
        const radius = 0.8 + Math.sin(time * 0.2 + i) * 0.2;
        fish.position.x = Math.cos(angle) * radius;
        fish.position.z = Math.sin(angle) * radius;
        fish.rotation.y = -angle;
      });
    }
  });

  return (
    <group position={[1, 0.03, -3.5]}>
      {Array.from({ length: 3 }).map((_, i) => (
        <group key={i}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
            <meshStandardMaterial color="#ff7e67" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function StreetLight() {
  const globalTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const isNight = globalTheme === "night";
  const lightIntensity = isNight ? 2.5 : 0.0;

  return (
    <group position={[-2.8, 0, -3.8]}>
      {/* Pole */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.04, 2.4, 8]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Arm */}
      <mesh position={[0.3, 2.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Light housing */}
      <mesh position={[0.6, 2.4, 0]} castShadow>
        <boxGeometry args={[0.2, 0.05, 0.15]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Bulb/Glow */}
      <mesh position={[0.6, 2.37, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshBasicMaterial color={isNight ? "#ffecd1" : "#555555"} />
        {isNight && <pointLight color="#ffecd1" intensity={lightIntensity} distance={6} position={[0, 0, 0.1]} castShadow />}
      </mesh>
    </group>
  );
}

function PoolStones() {
  const stonesData = useMemo(() => {
    const stones = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + (Math.random() * 0.1);
      const r = 1.45 + Math.random() * 0.15;
      stones.push({
        x: Math.cos(angle) * r,
        z: Math.sin(angle) * r,
        scale: 0.06 + Math.random() * 0.06,
        rotY: Math.random() * Math.PI,
        color: Math.random() > 0.5 ? "#555b57" : "#4a504d"
      });
    }
    return stones;
  }, []);

  return (
    <group position={[1, 0.02, -3.5]}>
      {stonesData.map((stone, i) => (
        <mesh key={i} position={[stone.x, 0.03, stone.z]} rotation={[0, stone.rotY, 0]} receiveShadow castShadow>
          <dodecahedronGeometry args={[stone.scale, 1]} />
          <meshStandardMaterial color={stone.color} roughness={0.9} flatShading />
        </mesh>
      ))}
    </group>
  );
}

function PoolGlows() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((glow, i) => {
        const material = (glow as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = (Math.sin(time * 1.5 + i * 2.5) + 1) * 0.15 + 0.1;
      });
    }
  });

  return (
    <group position={[1, 0.015, -3.5]} ref={groupRef}>
      {/* Glow 1 */}
      <mesh position={[0.5, 0, 0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.3, 16]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Glow 2 */}
      <mesh position={[-0.4, 0, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.25, 16]} />
        <meshBasicMaterial color="#00ffaa" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* Glow 3 */}
      <mesh position={[0.2, 0, -0.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 16]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Frogs() {
  const frogsData = [
    { x: 1.5, z: 0.2, rotY: -Math.PI / 4 },
    { x: -0.2, z: 1.45, rotY: Math.PI / 2 + 0.2 }
  ];

  return (
    <group position={[1, 0.08, -3.5]}>
      {frogsData.map((f, i) => (
        <group key={i} position={[f.x, 0, f.z]} rotation={[0, f.rotY, 0]}>
          {/* Frog Body */}
          <mesh position={[0, 0.1, 0]} castShadow>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshStandardMaterial color="#4d7c3b" roughness={0.7} />
          </mesh>
          {/* Frog Eyes */}
          <mesh position={[0.08, 0.2, 0.08]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#2d4c1b" roughness={0.6} />
          </mesh>
          <mesh position={[-0.08, 0.2, 0.08]} castShadow>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#2d4c1b" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AILabSceneContent() {
  return (
    <group>
      <NexusPool />
      <PoolStones />
      <PoolGlows />
      <Fireflies />
      <Fishes />
      <Frogs />
      <WoodenDesk />
      <FieldJournal />
      <Computer />
      <WoodenChair />
      <Person />
      <StreetLight />
      <DustMotes />
    </group>
  );
}

export default function AILabHero() {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 4]} focusDistance={0.02}>
        <AILabSceneContent />
      </MeadowEnvironment>

      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-inter font-bold mb-6 text-[#FFFFFF] drop-shadow-sm">
            The Nexus Pool
          </h1>
          <p className="text-xl md:text-2xl text-[#FFFFFF] leading-relaxed font-light">
            Agentic environments, autonomous orchestration, and exploratory AI workflows.
          </p>
        </div>
      </div>
    </div>
  );
}
