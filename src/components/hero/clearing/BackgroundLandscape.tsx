import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useLivingSystemStore } from "@/lib/store";
import { THEME_PALETTES } from "./ThemeColors";

export default function BackgroundLandscape({ overrideTheme }: { overrideTheme?: "dawn" | "day" | "dusk" | "night" }) {
  const globalTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const timeOfDayTheme = overrideTheme || globalTheme;

  // Materials based on the Dribbble reference (atmospheric perspective)
  const matFront = useMemo(() => new THREE.MeshStandardMaterial({ color: THEME_PALETTES.dawn.matFront, roughness: 1, flatShading: true }), []);
  const matMid = useMemo(() => new THREE.MeshStandardMaterial({ color: THEME_PALETTES.dawn.matMid, roughness: 1, flatShading: true }), []);
  const matBack = useMemo(() => new THREE.MeshStandardMaterial({ color: THEME_PALETTES.dawn.matBack, roughness: 1, flatShading: true }), []);
  const matFar = useMemo(() => new THREE.MeshStandardMaterial({ color: THEME_PALETTES.dawn.matFar, roughness: 1, flatShading: true }), []);
  
  const sunCoreMat = useMemo(() => new THREE.MeshBasicMaterial({ color: THEME_PALETTES.dawn.sun, fog: false }), []);
  const sunInnerMat = useMemo(() => new THREE.MeshBasicMaterial({ color: THEME_PALETTES.dawn.haloInner, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }), []);
  const sunOuterMat = useMemo(() => new THREE.MeshBasicMaterial({ color: THEME_PALETTES.dawn.haloOuter, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false, fog: false }), []);
  const fogMat = useMemo(() => new THREE.MeshBasicMaterial({ color: THEME_PALETTES.dawn.fog, transparent: true, opacity: 0.15, depthWrite: false, blending: THREE.AdditiveBlending }), []);

  // Shared geometry for the sharp mountain peaks (a square rotated by 45 degrees becomes a perfect sharp triangle peak)
  const mountainGeom = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  useFrame((state, delta) => {
    // Animate color transitions based on God Mode theme
    const palette = THEME_PALETTES[timeOfDayTheme];
    const lerpSpeed = delta * 1.5; // Smooth 1.5x transition speed
    const tempColor = new THREE.Color(); // Reusable color object to prevent GC overhead

    matFront.color.lerp(tempColor.set(palette.matFront), lerpSpeed);
    matMid.color.lerp(tempColor.set(palette.matMid), lerpSpeed);
    matBack.color.lerp(tempColor.set(palette.matBack), lerpSpeed);
    matFar.color.lerp(tempColor.set(palette.matFar), lerpSpeed);
    
    sunCoreMat.color.lerp(tempColor.set(palette.sun), lerpSpeed);
    sunInnerMat.color.lerp(tempColor.set(palette.haloInner), lerpSpeed);
    sunOuterMat.color.lerp(tempColor.set(palette.haloOuter), lerpSpeed);
    fogMat.color.lerp(tempColor.set(palette.fog), lerpSpeed);
  });

  return (
    <group>
      {/* 
        The V-Valley Mountains 
        We use planes rotated by 45 degrees (Math.PI/4) on Z to create perfect sharp peaks.
        They are scaled massively and layered back in Z.
      */}
      
      {/* FAR LAYER */}
      <mesh geometry={mountainGeom} material={matFar} position={[-40, -10, -80]} rotation={[0, 0, Math.PI/4]} scale={[120, 120, 1]} />
      <mesh geometry={mountainGeom} material={matFar} position={[45, -15, -82]} rotation={[0, 0, Math.PI/4]} scale={[140, 140, 1]} />
      <mesh geometry={mountainGeom} material={matFar} position={[0, -25, -85]} rotation={[0, 0, Math.PI/4]} scale={[100, 100, 1]} />

      {/* BACK LAYER */}
      <mesh geometry={mountainGeom} material={matBack} position={[-55, -20, -60]} rotation={[0, 0, Math.PI/4]} scale={[120, 120, 1]} />
      <mesh geometry={mountainGeom} material={matBack} position={[60, -10, -65]} rotation={[0, 0, Math.PI/4]} scale={[130, 130, 1]} />

      {/* MID LAYER (Forms the main V-Valley) */}
      <mesh geometry={mountainGeom} material={matMid} position={[-65, -15, -45]} rotation={[0, 0, Math.PI/4]} scale={[120, 120, 1]} />
      <mesh geometry={mountainGeom} material={matMid} position={[70, -25, -48]} rotation={[0, 0, Math.PI/4]} scale={[140, 140, 1]} />
      
      {/* Lower mid hills bridging the gap */}
      <mesh geometry={mountainGeom} material={matMid} position={[-25, -35, -46]} rotation={[0, 0, Math.PI/4]} scale={[80, 80, 1]} />
      <mesh geometry={mountainGeom} material={matMid} position={[30, -40, -47]} rotation={[0, 0, Math.PI/4]} scale={[90, 90, 1]} />

      {/* FRONT LAYER (Blends with the grass field) */}
      <mesh geometry={mountainGeom} material={matFront} position={[-75, -20, -30]} rotation={[0, 0, Math.PI/4]} scale={[120, 120, 1]} />
      <mesh geometry={mountainGeom} material={matFront} position={[80, -30, -32]} rotation={[0, 0, Math.PI/4]} scale={[140, 140, 1]} />
      
      {/* Front ground plane connecting the mountains to the grass */}
      <mesh material={matFront} position={[0, -1, -30]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[200, 50]} />
      </mesh>

      {/* GLOWING SUN */}
      <group position={[0.5, 12, -75]}>
        {/* Core */}
        <mesh material={sunCoreMat}>
          <circleGeometry args={[4, 32]} />
        </mesh>
        {/* Inner Glow */}
        <mesh position={[0, 0, -1]} material={sunInnerMat}>
          <circleGeometry args={[12, 32]} />
        </mesh>
        {/* Outer Glow */}
        <mesh position={[0, 0, -2]} material={sunOuterMat}>
          <circleGeometry args={[35, 32]} />
        </mesh>
      </group>

      {/* Very simple soft atmospheric fog clouds acting as low mist (no glitchy volumetric shaders) */}
      <mesh position={[0, 5, -50]} material={fogMat}>
        <planeGeometry args={[150, 40]} />
      </mesh>
    </group>
  );
}
