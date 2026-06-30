"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import { grassVertexShader, grassFragmentShader } from "../shaders";
import { useMousePhysics } from "@/hooks/useMousePhysics";

interface InstancedGrassProps {
  count?: number;
  width?: number;
  depth?: number;
  baseColor?: string;
  tipColor?: string;
  visiblePhaseStart?: number;
}

export default function InstancedGrass({
  count = 8000,
  width = 60,
  depth = 60,
  baseColor = "#3d6b2a",
  tipColor = "#7ab840",
  visiblePhaseStart = 2, // Scene 2 (Growth)
}: InstancedGrassProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { cinematicPhase, sceneLocalTime } = useLivingSystemStore();
  const { mouse: mousePos } = useMousePhysics();

  // Create grass blade geometry
  const geometry = useMemo(() => {
    // simple tapering triangle blade, curved slightly
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array([
      // Base
      -0.05, 0.0, 0.0,
       0.05, 0.0, 0.0,
      // Mid
      -0.03, 0.5, 0.02,
       0.03, 0.5, 0.02,
      // Tip
       0.0,  1.2, 0.1,
    ]);
    const uvs = new Float32Array([
      0, 0,
      1, 0,
      0, 0.5,
      1, 0.5,
      0.5, 1,
    ]);
    const indices = new Uint16Array([
      0, 1, 2,  2, 1, 3,  // Bottom segment
      2, 3, 4             // Top segment
    ]);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Place instances and set custom attributes
  const { matrices, colors, bases, phases } = useMemo(() => {
    const matrices = new Float32Array(count * 16);
    const colors = new Float32Array(count * 3);
    const bases = new Float32Array(count * 2);
    const phases = new Float32Array(count);
    
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * width;
      const z = (Math.random() - 0.5) * depth;
      const y = 0; // terrain height can be added later

      dummy.position.set(x, y, z);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      // Random scale for variety
      const scale = 0.5 + Math.random() * 0.8;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();

      dummy.matrix.toArray(matrices, i * 16);
      
      // We can use instanced colors if we want per-blade variation
      color.setHex(0xffffff * Math.random());
      color.toArray(colors, i * 3);

      bases[i * 2] = x;
      bases[i * 2 + 1] = z;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { matrices, colors, bases, phases };
  }, [count, width, depth]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uWindStrength: { value: 0.12 },
    uWindFrequency: { value: 1.4 },
    uCursorPos: { value: new THREE.Vector2(0, 0) },
    uCursorRadius: { value: 8.0 },
    uGrowthProgress: { value: 0 },
    uColorBottom: { value: new THREE.Color(baseColor) },
    uColorTop: { value: new THREE.Color(tipColor) },
  }), [baseColor, tipColor]);

  useFrame((state) => {
    if (!materialRef.current || !meshRef.current) return;
    
    const isActive = cinematicPhase >= visiblePhaseStart;
    
    // Visibility toggle
    meshRef.current.visible = isActive;
    if (!isActive) return;

    // Growth logic (0 to 1 over first 2 seconds of the phase)
    let growth = 1.0;
    if (cinematicPhase === visiblePhaseStart) {
      growth = Math.min(1.0, sceneLocalTime / 2.0);
    }
    
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uGrowthProgress.value = growth;
    
    // Raycast/Cursor logic: project normalized mouse coords to world XZ plane (y=0)
    // For a fixed camera at Z=800, this is just a quick approx. 
    // Real implementation would use raycaster against a plane.
    const vector = new THREE.Vector3(mousePos.x, mousePos.y, 0.5);
    vector.unproject(state.camera);
    const dir = vector.sub(state.camera.position).normalize();
    const distance = -state.camera.position.y / dir.y;
    const pos = state.camera.position.clone().add(dir.multiplyScalar(distance));
    
    materialRef.current.uniforms.uCursorPos.value.set(pos.x, pos.z);
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, undefined, count]}
      castShadow
      receiveShadow
      frustumCulled={false}
    >
      <instancedBufferAttribute attach="instanceMatrix" args={[matrices, 16]} />
      <instancedBufferAttribute attach="attributes-aGrassBase" args={[bases, 2]} />
      <instancedBufferAttribute attach="attributes-aGrassPhase" args={[phases, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={grassVertexShader}
        fragmentShader={grassFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </instancedMesh>
  );
}
