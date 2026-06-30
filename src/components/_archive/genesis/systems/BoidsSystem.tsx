"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import { useMousePhysics } from "@/hooks/useMousePhysics";

interface BoidsSystemProps {
  count?: number;
  type?: 'birds' | 'fireflies';
  visiblePhaseStart?: number;
}

export default function BoidsSystem({
  count = 15,
  type = 'birds',
  visiblePhaseStart = 3, // Forest scene
}: BoidsSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { cinematicPhase } = useLivingSystemStore();
  const { mouse: mousePos } = useMousePhysics();

  const boidData = useMemo(() =>
    Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        type === 'birds' ? 40 + Math.random() * 20 : 10 + Math.random() * 30,
        (Math.random() - 0.5) * 80 + 100
      ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * (type === 'birds' ? 0.1 : 0.5),
        (Math.random() - 0.5) * 0.5
      ),
      phase: Math.random() * Math.PI * 2,
      freq: 0.3 + Math.random() * 0.5,
    })), [count, type]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const isActive = cinematicPhase >= visiblePhaseStart;
    meshRef.current.visible = isActive;
    if (!isActive) return;

    const time = state.clock.getElapsedTime();
    const center = new THREE.Vector3(0, type === 'birds' ? 40 : 20, 100);
    
    // Project mouse for interaction
    const vector = new THREE.Vector3(mousePos.x, mousePos.y, 0.5);
    vector.unproject(state.camera);
    const dir = vector.sub(state.camera.position).normalize();
    const distance = -state.camera.position.y / dir.y;
    const cursorWorldPos = state.camera.position.clone().add(dir.multiplyScalar(distance));

    for (let i = 0; i < count; i++) {
      const boid = boidData[i];
      
      if (type === 'birds') {
        // Cohesion: steer toward center
        const toCenter = center.clone().sub(boid.pos).multiplyScalar(0.0005);
        boid.vel.add(toCenter);

        // Separation
        for (let j = 0; j < count; j++) {
          if (i === j) continue;
          const diff = boid.pos.clone().sub(boidData[j].pos);
          const dist = diff.length();
          if (dist < 8) {
            diff.normalize().multiplyScalar(0.01 / Math.max(0.1, dist));
            boid.vel.add(diff);
          }
        }

        // Speed limit
        if (boid.vel.length() > 0.8) boid.vel.setLength(0.8);
        boid.pos.add(boid.vel);
        
        dummy.position.copy(boid.pos);
        dummy.lookAt(boid.pos.clone().add(boid.vel));
      } else {
        // Fireflies
        boid.pos.y += Math.sin(time * boid.freq + boid.phase) * delta * 2;
        
        // Cursor attraction (simplified, assume stationary if distance < 150)
        const toCursor = cursorWorldPos.clone().sub(boid.pos);
        const dist = toCursor.length();
        if (dist < 150) {
          toCursor.normalize().multiplyScalar(delta * 8 * (1 - dist / 150));
          boid.vel.add(toCursor);
        }
        
        boid.vel.multiplyScalar(0.95); // dampening
        boid.pos.add(boid.vel);
        
        dummy.position.copy(boid.pos);
        
        // Pulsing glow
        const glow = 0.4 + 0.6 * Math.sin(time * boid.freq * Math.PI * 2 + boid.phase);
        dummy.scale.setScalar(glow);
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      {type === 'birds' ? (
        <coneGeometry args={[0.3, 1.2, 3]} />
      ) : (
        <sphereGeometry args={[0.2, 8, 8]} />
      )}
      <meshStandardMaterial 
        color={type === 'birds' ? "#2a2a2a" : "#d4ff99"} 
        emissive={type === 'fireflies' ? "#88cc33" : "#000000"}
        emissiveIntensity={type === 'fireflies' ? 2 : 0}
        roughness={type === 'birds' ? 0.9 : 0.2} 
      />
    </instancedMesh>
  );
}
