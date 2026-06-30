"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useLivingSystemStore } from "@/lib/store";
import { useMousePhysics } from "@/hooks/useMousePhysics";

/**
 * CameraRig — Cinematic spline-based camera system.
 * 
 * Follows a CatmullRomCurve3 through the 60-second journey.
 * Applies handheld Perlin noise, mouse-driven parallax offset,
 * lens breathing (FoV oscillation), and smooth transitions.
 */

// Simple 2D Perlin-like noise for handheld camera
function pseudoNoise(t: number, seed: number): number {
  return Math.sin(t * 1.7 + seed) * 0.3 +
         Math.sin(t * 3.1 + seed * 2.3) * 0.2 +
         Math.sin(t * 5.7 + seed * 0.7) * 0.1;
}

export default function CameraRig() {
  const { cinematicPhase, cinematicProgress, cinematicActive, genesisElapsed } = useLivingSystemStore();
  const mouseState = useMousePhysics();
  const { camera } = useThree();
  
  // Spring state for mouse offset
  const mouseSpring = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  
  // Camera path control points (80-second flythrough)
  const cameraPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(  0,   30,  400),  // t=0.00 — drop (high angle)
    new THREE.Vector3(  8,   15,  300),  // t=0.10 — growth begins
    new THREE.Vector3(-12,    5,  220),  // t=0.20 — moving through grass
    new THREE.Vector3(  6,    8,  150),  // t=0.30 — entering forest
    new THREE.Vector3( -4,   20,   90),  // t=0.45 — forest canopy
    new THREE.Vector3( 10,    5,   50),  // t=0.60 — intelligence/roots
    new THREE.Vector3( -6,   10,   30),  // t=0.70 — humanity/glass panels
    new THREE.Vector3(  2,   12,   10),  // t=0.85 — evolution/core
    new THREE.Vector3(  0,    2,  -10),  // t=0.95 — approaching end
    new THREE.Vector3(  0,    0,  -30),  // t=1.00 — transition to website
  ], false, 'catmullrom', 0.5), []);

  // LookAt target spline — what the camera focuses on
  const lookAtPath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(  0,    0,  380),  // Looking down at drop
    new THREE.Vector3(  0,    0,  280),  // Grass growing
    new THREE.Vector3(  0,    5,  200),  // Forest edge
    new THREE.Vector3(  0,   15,  100),  // Canopy focus
    new THREE.Vector3(  0,    0,   40),  // Roots glowing
    new THREE.Vector3(  0,    5,   20),  // Monoliths
    new THREE.Vector3(  0,   15,  -10),  // Core rotating
    new THREE.Vector3(  0,    0,  -40),  // Beyond
  ], false, 'catmullrom', 0.5), []);

  // Temp vectors to avoid allocation
  const tempPos = useMemo(() => new THREE.Vector3(), []);
  const tempLookAt = useMemo(() => new THREE.Vector3(), []);
  const tempTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const isComplete = cinematicPhase >= 8;

    if (cinematicActive && !isComplete) {
      // ── CINEMATIC MODE ──
      
      // Non-linear time mapping (slightly ease the middle)
      const t = cinematicProgress;
      
      // Get position and lookAt from splines
      cameraPath.getPointAt(Math.min(t, 0.999), tempPos);
      lookAtPath.getPointAt(Math.min(t, 0.999), tempLookAt);

      // Handheld camera noise
      const noiseAmp = cinematicPhase <= 2 ? 0.08 : 0.12; // Subtler in void
      const noiseFreq = 0.12;
      const noiseX = pseudoNoise(time * noiseFreq, 1.0) * noiseAmp;
      const noiseY = pseudoNoise(time * noiseFreq, 2.7) * noiseAmp;
      const noiseZ = pseudoNoise(time * noiseFreq, 4.3) * noiseAmp * 0.5;

      // Mouse-driven offset (spring physics)
      const mk = 0.008;
      const md = 0.92;
      const targetX = mouseState.mouse.x * 4; // ±4 units lateral
      const targetY = mouseState.mouse.y * 2; // ±2 units vertical
      
      const forceX = (targetX - mouseSpring.current.x) * mk;
      const forceY = (targetY - mouseSpring.current.y) * mk;
      mouseSpring.current.vx = (mouseSpring.current.vx + forceX) * md;
      mouseSpring.current.vy = (mouseSpring.current.vy + forceY) * md;
      mouseSpring.current.x += mouseSpring.current.vx;
      mouseSpring.current.y += mouseSpring.current.vy;

      // Apply all offsets
      camera.position.set(
        tempPos.x + noiseX + mouseSpring.current.x,
        tempPos.y + noiseY + mouseSpring.current.y,
        tempPos.z + noiseZ
      );

      // LookAt with slight delay (smoothed)
      tempTarget.lerp(tempLookAt, 0.05);
      camera.lookAt(tempTarget);

      // Lens breathing — FoV oscillation
      const breathingFov = 62 + Math.sin(time * (Math.PI * 2 / 4.8)) * 1.4;
      (camera as THREE.PerspectiveCamera).fov = breathingFov;
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();

    } else if (isComplete) {
      // ── POST-CINEMATIC MODE ──
      // Gentle parallax driven by mouse
      const targetX = mouseState.mouse.x * 3;
      const targetY = mouseState.mouse.y * 1.5;
      
      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY + 2, 2, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, 40, 1, delta);
      
      camera.lookAt(0, 0, 0);
      
      (camera as THREE.PerspectiveCamera).fov = THREE.MathUtils.damp(
        (camera as THREE.PerspectiveCamera).fov, 60, 2, delta
      );
      (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    }
  });

  return null; // Pure logic component
}
