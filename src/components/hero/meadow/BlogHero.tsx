"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import MeadowEnvironment from "./MeadowEnvironment";

function Campfire() {
  const fireRef = useRef<THREE.PointLight>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (fireRef.current) {
      // Flicker effect
      fireRef.current.intensity = 2 + Math.sin(time * 15) * 0.2 + Math.random() * 0.3;
    }
  });

  return (
    <group position={[0, 0, -3]}>
      {/* Logs */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8]} />
        <meshStandardMaterial color="#4a3018" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 4, Math.PI / 2.2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8]} />
        <meshStandardMaterial color="#4a3018" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.2, 0]} rotation={[0, -Math.PI / 4, Math.PI / 2.1]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8]} />
        <meshStandardMaterial color="#4a3018" roughness={0.9} />
      </mesh>

      {/* Fire Light */}
      <pointLight ref={fireRef} position={[0, 0.5, 0]} color="#ff7a00" distance={8} decay={2} />
      
      {/* Center glowing core */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color="#ff5500" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function Embers() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 30;
  
  const embersData = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 1.5,
      y: Math.random() * 2,
      z: (Math.random() - 0.5) * 1.5,
      speed: Math.random() * 1.5 + 0.5,
      wobble: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((ember, i) => {
        const data = embersData[i];
        ember.position.y += data.speed * delta;
        ember.position.x += Math.sin(time * 3 + data.wobble) * 0.01;
        
        if (ember.position.y > 3) {
          ember.position.y = 0;
          ember.position.x = data.x;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.3, -3]}>
      {embersData.map((data, i) => (
        <mesh key={i} position={[data.x, data.y, data.z]}>
          <planeGeometry args={[0.03, 0.03]} />
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function BlogSceneContent() {
  return (
    <group>
      <Campfire />
      <Embers />
    </group>
  );
}

export default function BlogHero({ featuredArticle }: { featuredArticle?: any }) {
  return (
    <div className="w-full h-screen relative bg-transparent overflow-hidden">
      <MeadowEnvironment cameraPosition={[0, 1.5, 3]} focusDistance={0.01}>
        <BlogSceneContent />
      </MeadowEnvironment>
      
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center px-6 md:px-24">
        <div className="max-w-2xl pointer-events-auto">
          <h1 className="text-6xl md:text-8xl font-inter font-bold mb-6 text-white drop-shadow-md">
            The Campfire
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light drop-shadow-md mb-8">
            Stories, insights, and musings from the frontier of building intelligent systems.
          </p>
          {featuredArticle && (
            <a href={`/blog/${featuredArticle.slug?.current}`} className="inline-block glass bg-black/20 p-6 rounded-2xl border border-white/20 hover:bg-black/40 transition-colors">
              <span className="text-[10px] uppercase tracking-widest text-[var(--moss)] font-bold block mb-2">Featured</span>
              <h3 className="text-2xl font-bold text-white mb-2">{featuredArticle.title}</h3>
              <p className="text-white/80 line-clamp-2">{featuredArticle.excerpt}</p>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
