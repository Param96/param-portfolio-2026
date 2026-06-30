"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, DepthOfField, Noise } from "@react-three/postprocessing";
import { Environment, Sky } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";
import InstancedMeadow from "./InstancedMeadow";
import PollenAtmosphere from "./PollenAtmosphere";
import BackgroundLandscape from "./BackgroundLandscape";
import { useLivingSystemStore } from "@/lib/store";
import { THEME_PALETTES } from "./ThemeColors";

function SceneContent() {
  const { camera, mouse, size } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(0, 1.5, 4));
  
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);

  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);
  const fogRef = useRef<THREE.Fog>(null);
  const skyRef = useRef<any>(null); // For Sky component material if needed
  
  useFrame((state, delta) => {
    // Gentle mouse parallax
    // Calculate aspect-ratio independent mouse offsets
    const targetX = (mouse.x * 0.5);
    const targetY = 1.5 + (mouse.y * 0.2); // Keep height mostly around 1.5
    
    targetCameraPos.current.x = THREE.MathUtils.lerp(targetCameraPos.current.x, targetX, delta * 2);
    targetCameraPos.current.y = THREE.MathUtils.lerp(targetCameraPos.current.y, targetY, delta * 2);
    
    state.camera.position.x = targetCameraPos.current.x;
    state.camera.position.y = targetCameraPos.current.y;
    state.camera.lookAt(0, 1.0, 0); // Always look towards the center of the clearing

    // Animate Lighting based on Theme
    const palette = THEME_PALETTES[timeOfDayTheme];
    const lerpSpeed = delta * 1.5;
    const tempColor = new THREE.Color();

    if (ambientLightRef.current) ambientLightRef.current.color.lerp(tempColor.set(palette.lightAmbient), lerpSpeed);
    if (dirLightRef.current) dirLightRef.current.color.lerp(tempColor.set(palette.lightDir), lerpSpeed);
    if (hemiLightRef.current) {
      hemiLightRef.current.color.lerp(tempColor.set(palette.lightHemiSky), lerpSpeed);
      hemiLightRef.current.groundColor.lerp(tempColor.set(palette.lightHemiGround), lerpSpeed);
    }
    if (fogRef.current) fogRef.current.color.lerp(tempColor.set(palette.fog), lerpSpeed);
  });

  return (
    <>
      <fog ref={fogRef} attach="fog" args={["#f3e4c4", 15, 45]} />
      {/* Lighting */}
      <ambientLight ref={ambientLightRef} intensity={0.4} color="#f5efe0" />
      <directionalLight 
        ref={dirLightRef}
        position={[10, 5, -5]} 
        intensity={1.2} 
        color="#ffecd1" 
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      <hemisphereLight ref={hemiLightRef} color="#f3e4c4" groundColor="#7a9450" intensity={0.6} />

      {/* Sky Background */}
      {/* A warm golden hour sky gradient */}
      <Sky 
        sunPosition={[10, 1, -5]} // Low sun
        turbidity={1.5} 
        rayleigh={2} 
        mieCoefficient={0.005} 
        mieDirectionalG={0.8}
      />
      
      {/* Distant Hills, Mountains, River Background */}
      <BackgroundLandscape />
      
      {/* Instanced Grass & Wildflowers */}
      <InstancedMeadow />

      {/* Drifting Pollen */}
      <PollenAtmosphere />

      {/* Post-Processing */}
      <EffectComposer multisampling={4}>
        {/* Real bokeh depth of field */}
        <DepthOfField 
          focusDistance={0.015} // focus on the mid-ground grass where the text sits
          focalLength={0.05} 
          bokehScale={4} 
          height={1080} 
        />
        {/* Very subtle noise to reduce banding in the sky and add film grain */}
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  );
}

export default function ClearingScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 4], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: false, alpha: false }}
    >
      <SceneContent />
    </Canvas>
  );
}
