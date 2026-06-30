"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import { mossGrowthShader } from "../shaders";

const GRAVITY = 9.8; // m/s^2
const DROP_START_Y = 25; // start height

export default function DropScene() {
  const { cinematicPhase, sceneLocalTime } = useLivingSystemStore();
  
  const dropletRef = useRef<THREE.Mesh>(null);
  const rippleGroupRef = useRef<THREE.Group>(null);
  const mossRef = useRef<THREE.Mesh>(null);
  
  const [impactHappened, setImpactHappened] = useState(false);

  // Moss shader uniforms
  const mossUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uBirthTime: { value: 2.2 },
    uOrigin: { value: new THREE.Vector2(0, 0) },
  }), []);

  // Ripple state
  const ripples = useRef<{radius: number, amplitude: number, speed: number}[]>([]);

  useFrame((state, delta) => {
    const isActive = cinematicPhase === 1 || cinematicPhase === 2; // Keep rendering through growth scene
    if (!isActive) return;

    const t = sceneLocalTime;
    
    // Droplet physics (t=0 to t=2.2 approx)
    if (dropletRef.current && cinematicPhase === 1) {
      if (t < 2.2) {
        // Falling
        const y = DROP_START_Y - 0.5 * GRAVITY * t * t * 10; // scaled gravity
        dropletRef.current.position.y = Math.max(0, y);
        dropletRef.current.visible = true;
      } else {
        dropletRef.current.visible = false;
        if (!impactHappened) {
          setImpactHappened(true);
          // Trigger first ripple
          ripples.current.push({ radius: 0, amplitude: 1, speed: 20 });
        }
      }
    }

    // Update ripples
    if (impactHappened && rippleGroupRef.current) {
      ripples.current.forEach((ripple, i) => {
        ripple.radius += ripple.speed * delta;
        ripple.amplitude *= 0.95; // dampening
        
        const ring = rippleGroupRef.current?.children[i] as THREE.Mesh;
        if (ring) {
          ring.scale.setScalar(ripple.radius);
          (ring.material as THREE.MeshBasicMaterial).opacity = ripple.amplitude * 0.5;
        }
      });
      
      // Spawn new ripples if needed (simplified)
      if (t > 2.2 && t < 3.0 && ripples.current.length < 3 && Math.random() < 0.1) {
         ripples.current.push({ radius: 0, amplitude: 0.8, speed: 18 });
      }
    }
    
    // Update moss
    if (mossRef.current && mossRef.current.material) {
      const mat = mossRef.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = t;
    }
  });

  if (cinematicPhase > 2) return null; // Unmount after Scene 2

  return (
    <group>
      {/* Droplet */}
      <mesh ref={dropletRef} position={[0, DROP_START_Y, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshPhysicalMaterial 
          transmission={0.9} 
          roughness={0} 
          ior={1.33} 
          color="#ffffff" 
          transparent
        />
      </mesh>
      
      {/* Ripples (visualized as expanding rings for now) */}
      <group ref={rippleGroupRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {[0, 1, 2].map(i => (
          <mesh key={i}>
            <ringGeometry args={[0.9, 1, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      
      {/* Moss Patch */}
      <mesh ref={mossRef} rotation={[-Math.PI/2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[10, 10, 32, 32]} />
        <shaderMaterial 
          vertexShader={mossGrowthShader}
          fragmentShader={`
            varying vec2 vUv;
            void main() {
              float dist = length(vUv - 0.5);
              float alpha = smoothstep(0.5, 0.3, dist);
              gl_FragColor = vec4(0.1, 0.23, 0.1, alpha);
            }
          `}
          uniforms={mossUniforms}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
