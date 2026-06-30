"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLivingSystemStore } from "@/lib/store";

const ARCHIVE_COUNT = 15;

interface ArchiveData {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  scale: THREE.Vector3;
  speed: number;
  currentScale?: number;
}

export default function HolographicArchives() {
  const theme = useThemeColors();
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const isComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

  const archiveData = useMemo(() => {
    const data: ArchiveData[] = [];
    for (let i = 0; i < ARCHIVE_COUNT; i++) {
      const radius = 5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 8 + 2;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      data.push({
        position: new THREE.Vector3(x, y, z),
        rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        scale: new THREE.Vector3(1 + Math.random(), 1.414 + Math.random(), 1), // A4-ish ratio
        speed: (Math.random() - 0.5) * 0.2,
      });
    }
    return data;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      archiveData.forEach((data, i) => {
        // Orbit around the center slowly
        const angle = time * data.speed;
        const radius = Math.sqrt(data.position.x * data.position.x + data.position.z * data.position.z);
        const startTheta = Math.atan2(data.position.z, data.position.x);
        
        const newX = Math.cos(startTheta + angle) * radius;
        const newZ = Math.sin(startTheta + angle) * radius;
        const newY = data.position.y + Math.sin(time * 0.5 + i) * 0.5; // Bobbing

        dummy.position.set(newX, newY, newZ);
        
        // Face the center (or orbit path)
        dummy.lookAt(0, newY, 0);
        
        // Add individual rotation (like tumbling paper)
        dummy.rotateX(Math.sin(time * 0.2 + i) * 0.2);
        dummy.rotateZ(Math.cos(time * 0.1 + i) * 0.1);

        // Cinematic Scale
        // Phase 5: Human Curiosity (Architects sketching blueprints, etc)
        const targetScale = isComplete || cinematicPhase >= 5 ? 1 : 0.001; 
        if (data.currentScale === undefined) data.currentScale = 0.001;
        data.currentScale = THREE.MathUtils.damp(data.currentScale, targetScale, 2, delta);

        dummy.scale.copy(data.scale).multiplyScalar(data.currentScale);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, ARCHIVE_COUNT]}>
      <planeGeometry args={[1, 1, 4, 4]} />
      <meshBasicMaterial 
        color={theme.accentTechnical}
        transparent
        opacity={0.15}
        wireframe
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
