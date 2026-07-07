"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";

function SmokeWisps({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 8;
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      x: (Math.random() - 0.5) * 0.1,
      y: Math.random() * 2,
      z: (Math.random() - 0.5) * 0.1,
      speed: Math.random() * 0.5 + 0.2,
      wobble: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.2 + 0.1
    }));
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((p, i) => {
        const data = particles[i];
        p.position.y += data.speed * delta;
        p.position.x += Math.sin(time + data.wobble) * 0.005;
        p.position.z += Math.cos(time + data.wobble) * 0.005;

        const progress = p.position.y / 2;
        p.scale.setScalar(data.scale + progress * 0.3);

        const mat = (p as THREE.Mesh).material as THREE.MeshBasicMaterial;
        let baseOpacity = 0.4 * (1 - progress);
        
        let targetOpacity = timeOfDayTheme === "day" ? baseOpacity * 0.8 : baseOpacity;
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, Math.max(0, targetOpacity), delta * 2);

        if (p.position.y > 2) {
          p.position.y = 0;
          p.position.x = data.x;
          p.position.z = data.z;
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {particles.map((data, i) => (
        <mesh key={i} position={[data.x, data.y, data.z]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial color="#555555" transparent opacity={0.6} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export default function DistantHut({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: { position?: [number, number, number], rotation?: [number, number, number], scale?: number }) {
  const windowMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);

  useFrame((state, delta) => {
    let targetIntensity = 0.25; // Dimly visible at day
    if (timeOfDayTheme === "night") targetIntensity = 1.0;
    else if (timeOfDayTheme === "dawn" || timeOfDayTheme === "dusk") targetIntensity = 0.6;

    if (windowMaterialRef.current) {
      windowMaterialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        windowMaterialRef.current.emissiveIntensity,
        targetIntensity,
        delta * 2
      );
      
      const baseColor = new THREE.Color(targetIntensity > 0.3 ? "#ffcc66" : "#4a3b2c");
      windowMaterialRef.current.color.lerp(baseColor, delta * 2);
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Hut Body - Warm wood/stone tone */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.0, 1.4]} />
        <meshStandardMaterial color="#6a4f3b" roughness={0.9} />
      </mesh>
      
      {/* Pitched Roof */}
      <mesh position={[0, 1.0, 0]} rotation={[0, 0, Math.PI / 4]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.95, 1.5]} />
        <meshStandardMaterial color="#3a2a1a" roughness={0.9} />
      </mesh>

      {/* Door */}
      <mesh position={[0.2, 0.35, 0.72]}>
        <boxGeometry args={[0.3, 0.6, 0.1]} />
        <meshStandardMaterial color="#2a1a0a" roughness={0.9} />
      </mesh>

      {/* Lit Window */}
      <mesh position={[-0.3, 0.5, 0.72]}>
        <boxGeometry args={[0.3, 0.3, 0.1]} />
        <meshStandardMaterial 
          ref={windowMaterialRef}
          color="#ffcc66" 
          emissive="#ffaa33"
          emissiveIntensity={0.25}
          roughness={0.2}
        />
      </mesh>

      {/* Chimney */}
      <mesh position={[0.3, 1.4, -0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.2, 0.8, 0.2]} />
        <meshStandardMaterial color="#5a4a4a" roughness={0.9} />
      </mesh>
      
      {/* Smoke */}
      <SmokeWisps position={[0.3, 1.8, -0.4]} />
    </group>
  );
}
