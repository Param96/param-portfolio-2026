"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import { rootPulseFragmentShader } from "../shaders";

interface Node {
  id: number;
  pos: THREE.Vector3;
  type: 'tree' | 'junction' | 'tip';
}

interface Edge {
  from: number;
  to: number;
  curve: THREE.CatmullRomCurve3;
  length: number;
}

export default function RootNetwork() {
  const { cinematicPhase, sceneLocalTime } = useLivingSystemStore();
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Generate roots procedurally
  const { nodes, edges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    let nodeIdCounter = 0;

    // Start with a few "tree bases"
    const bases = [
      new THREE.Vector3(-10, 0, 80),
      new THREE.Vector3(10, 0, 90),
      new THREE.Vector3(0, 0, 70),
    ];

    bases.forEach(base => {
      const startId = nodeIdCounter++;
      nodes.push({ id: startId, pos: base.clone(), type: 'tree' });
      
      // Recursive L-system down
      const grow = (parentId: number, startPos: THREE.Vector3, dir: THREE.Vector3, depth: number, maxDepth: number) => {
        if (depth >= maxDepth) return;
        
        const numBranches = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < numBranches; i++) {
          const length = 5 + Math.random() * 5;
          const currentDir = dir.clone().add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.2) * 0.5, // bias downwards
            (Math.random() - 0.5) * 0.5
          )).normalize();
          
          const endPos = startPos.clone().add(currentDir.multiplyScalar(length));
          const newId = nodeIdCounter++;
          nodes.push({ id: newId, pos: endPos, type: depth === maxDepth - 1 ? 'tip' : 'junction' });
          
          // Generate curve
          const midPos = startPos.clone().lerp(endPos, 0.5);
          midPos.x += (Math.random() - 0.5) * 2;
          midPos.z += (Math.random() - 0.5) * 2;
          
          const curve = new THREE.CatmullRomCurve3([startPos, midPos, endPos]);
          edges.push({
            from: parentId,
            to: newId,
            curve,
            length: curve.getLength()
          });
          
          grow(newId, endPos, new THREE.Vector3(0, -1, 0), depth + 1, maxDepth);
        }
      };
      
      grow(startId, base, new THREE.Vector3(0, -1, 0), 0, 4);
    });

    return { nodes, edges };
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uPulseProgress: { value: 0 },
    uPulseStrength: { value: 1.0 },
    uPulseColor: { value: new THREE.Color("#1d9e75") },
  }), []);

  useFrame((state) => {
    if (!materialRef.current || !groupRef.current) return;
    
    // Scene 4 (Intelligence)
    const isActive = cinematicPhase >= 4;
    groupRef.current.visible = isActive;
    if (!isActive) return;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    
    // Simulate pulse propagation across all tubes for now (simplified)
    // The pulse moves 0->1 along the tube
    const pulsePhase = (state.clock.elapsedTime * 0.5) % 1.0;
    materialRef.current.uniforms.uPulseProgress.value = pulsePhase;
  });

  return (
    <group ref={groupRef} position={[0, -5, 0]}>
      {edges.map((edge, i) => (
        <mesh key={i}>
          <tubeGeometry args={[edge.curve, 20, 0.2, 8, false]} />
          <shaderMaterial
            ref={i === 0 ? materialRef : undefined} // share uniforms for simplicity in this demo, real app would use unique uniforms per active pulse
            vertexShader={`
              varying vec2 vUv;
              void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={rootPulseFragmentShader}
            uniforms={uniforms}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}
