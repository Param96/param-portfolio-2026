"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMousePhysics } from "@/hooks/useMousePhysics";
import { useLivingSystemStore } from "@/lib/store";

const MAX_DEPTH = 5;
const BRANCH_COUNT = Math.pow(2, MAX_DEPTH + 1) - 1; // binary tree nodes
const LEAF_COUNT = Math.pow(2, MAX_DEPTH); // leaves at the end

export default function KnowledgeTree() {
  const branchMeshRef = useRef<THREE.InstancedMesh>(null);
  const leafMeshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const mouseState = useMousePhysics();

  // Procedural Fractal Tree Generation
  const { branches, leaves } = useMemo(() => {
    const branchesData: any[] = [];
    const leavesData: any[] = [];
    const dummy = new THREE.Object3D();

    const generateTree = (
      x: number, y: number, z: number, 
      angleY: number, angleZ: number, 
      length: number, width: number, depth: number
    ) => {
      // Calculate branch vector
      const endX = x + Math.sin(angleZ) * Math.cos(angleY) * length;
      const endY = y + Math.cos(angleZ) * length;
      const endZ = z + Math.sin(angleZ) * Math.sin(angleY) * length;

      // Position is midpoint of the cylinder
      const midX = (x + endX) / 2;
      const midY = (y + endY) / 2;
      const midZ = (z + endZ) / 2;

      dummy.position.set(midX, midY, midZ);
      
      // Orient cylinder along the vector
      const direction = new THREE.Vector3(endX - x, endY - y, endZ - z).normalize();
      const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
      dummy.quaternion.copy(quaternion);
      
      // Scale is [width, length, width] because cylinder is 1 unit tall
      dummy.scale.set(width, length, width);
      dummy.updateMatrix();
      
      branchesData.push(dummy.matrix.clone());

      if (depth === MAX_DEPTH) {
        // Add a leaf at the end of the final branches
        dummy.position.set(endX, endY, endZ);
        dummy.scale.setScalar(0.4); // Leaf size
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        dummy.updateMatrix();
        leavesData.push(dummy.matrix.clone());
        return;
      }

      // Branch out (recursive)
      const newLength = length * 0.75;
      const newWidth = width * 0.6;
      
      // Two child branches, spreading out
      const spreadAngle = 0.5 + Math.random() * 0.3;
      const twistAngle = Math.PI / 2 + (Math.random() * 0.5 - 0.25);

      generateTree(endX, endY, endZ, angleY + twistAngle, angleZ + spreadAngle, newLength, newWidth, depth + 1);
      generateTree(endX, endY, endZ, angleY - twistAngle, angleZ + spreadAngle, newLength, newWidth, depth + 1);
    };

    // Start tree at origin, pointing UP (angleZ = 0)
    generateTree(0, 0, 0, 0, 0, 3, 0.3, 0);

    return { branches: branchesData, leaves: leavesData };
  }, []);

  // Materials
  const branchMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#A0522D", // Bronze
    roughness: 0.5,
    metalness: 0.8,
  }), []);

  const leafMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#FFFFFF",
    transmission: 0.9,
    opacity: 1,
    transparent: true,
    roughness: 0.2,
    metalness: 0,
    ior: 1.5,
    thickness: 0.2,
  }), []);

  const { cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const isComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

  const seedRef = useRef<THREE.Mesh>(null);
  const theme = useLivingSystemStore(state => state.timeOfDayTheme);

  // Set instance matrices on mount
  useEffect(() => {
    if (branchMeshRef.current && leafMeshRef.current) {
      branches.forEach((matrix, i) => branchMeshRef.current!.setMatrixAt(i, matrix));
      leaves.forEach((matrix, i) => leafMeshRef.current!.setMatrixAt(i, matrix));
      branchMeshRef.current.instanceMatrix.needsUpdate = true;
      leafMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [branches, leaves]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    // Subtle wind effect on the entire tree
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
      
      // Magnetic reaction to cursor
      const targetY = mouseState.mouse.x * 0.1;
      const targetX = mouseState.mouse.y * 0.1;
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 2, delta);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, -targetY, 2, delta);

      // Cinematic Growth
      // Phase 3: The Seed descends. The tree itself starts growing near the end of phase 3 or in phase 4.
      const targetScale = isComplete || cinematicPhase >= 4 ? 1 : (cinematicPhase === 3 ? 0.05 : 0.001); 
      const growthSpeed = cinematicPhase === 3 ? 0.2 : 0.5; // Slow in phase 3, normal in phase 4+
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), growthSpeed * delta);
    }

    // Seed Descent (Phase 3)
    if (seedRef.current) {
      if (!isComplete && cinematicPhase === 3) {
        // Starts high, lerps down to 0 (relative to group)
        seedRef.current.position.y = THREE.MathUtils.damp(seedRef.current.position.y, 0, 1.5, delta);
        const pulse = (Math.sin(time * 4) + 1) * 0.5;
        (seedRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + pulse;
      } else if (isComplete || cinematicPhase > 3) {
        seedRef.current.position.y = 0;
        (seedRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0; // Hides inside tree
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, -5]} scale={[0.001, 0.001, 0.001]}>
      {/* The Seed */}
      <mesh ref={seedRef} position={[0, 20, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial 
          color="#ffffff"
          emissive="#D4A373"
          emissiveIntensity={0}
          toneMapped={false}
        />
      </mesh>

      {/* Branches */}
      <instancedMesh 
        ref={branchMeshRef} 
        args={[undefined, undefined, branches.length]} 
        castShadow 
        receiveShadow
      >
        <cylinderGeometry args={[1, 1, 1, 8]} />
        <primitive object={branchMaterial} attach="material" />
      </instancedMesh>

      {/* Leaves (Frosted Glass Polygons) */}
      <instancedMesh 
        ref={leafMeshRef} 
        args={[undefined, undefined, leaves.length]} 
        castShadow
      >
        <icosahedronGeometry args={[1, 0]} />
        <primitive object={leafMaterial} attach="material" />
      </instancedMesh>
    </group>
  );
}
