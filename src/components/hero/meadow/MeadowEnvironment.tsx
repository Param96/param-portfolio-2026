"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, DepthOfField, Noise } from "@react-three/postprocessing";
import { Sky } from "@react-three/drei";
import * as THREE from "three";
import { useRef, ReactNode } from "react";
import InstancedMeadow from "../clearing/InstancedMeadow";
import BackgroundLandscape from "../clearing/BackgroundLandscape";
import { useLivingSystemStore } from "@/lib/store";
import { THEME_PALETTES } from "../clearing/ThemeColors";

interface MeadowSceneProps {
  children?: ReactNode;
  isGoldenHourOverride?: boolean; // For Resume page
  cameraPosition?: [number, number, number];
  focusDistance?: number;
}

function SceneContent({ children, isGoldenHourOverride, cameraPosition, focusDistance }: MeadowSceneProps) {
  const { mouse, size } = useThree();
  const targetCameraPos = useRef(new THREE.Vector3(...(cameraPosition || [0, 1.5, 4])));
  
  // Use golden hour (dusk) if override is set, otherwise use global store
  const globalTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const activeTheme = isGoldenHourOverride ? "dusk" : globalTheme;

  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const hemiLightRef = useRef<THREE.HemisphereLight>(null);
  const fogRef = useRef<THREE.Fog>(null);
  
  useFrame((state, delta) => {
    // Gentle mouse parallax
    const targetX = (cameraPosition?.[0] || 0) + (mouse.x * 0.5);
    const targetY = (cameraPosition?.[1] || 1.5) + (mouse.y * 0.2); 
    
    targetCameraPos.current.x = THREE.MathUtils.lerp(targetCameraPos.current.x, targetX, delta * 2);
    targetCameraPos.current.y = THREE.MathUtils.lerp(targetCameraPos.current.y, targetY, delta * 2);
    
    state.camera.position.x = targetCameraPos.current.x;
    state.camera.position.y = targetCameraPos.current.y;
    state.camera.lookAt(0, (cameraPosition?.[1] || 1.5) - 0.5, 0);

    // Animate Lighting based on Theme
    const palette = THEME_PALETTES[activeTheme];
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
      <ambientLight ref={ambientLightRef} intensity={0.4} color="#f5efe0" />
      <directionalLight 
        ref={dirLightRef}
        position={[10, 5, -5]} 
        intensity={1.2} 
        color="#ffecd1" 
        castShadow 
        shadow-mapSize={[512, 512]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      <hemisphereLight ref={hemiLightRef} color="#f3e4c4" groundColor="#7a9450" intensity={0.6} />

      <Sky 
        sunPosition={activeTheme === "night" ? [-10, 1, -5] : [10, 1, -5]} 
        turbidity={1.5} 
        rayleigh={2} 
        mieCoefficient={0.005} 
        mieDirectionalG={0.8}
      />
      
      <BackgroundLandscape overrideTheme={activeTheme} />
      <InstancedMeadow />

      {/* Page specific content inserted here */}
      {children}

      <EffectComposer multisampling={0}>
        <DepthOfField 
          focusDistance={focusDistance !== undefined ? focusDistance : 0.015} 
          focalLength={0.05} 
          bokehScale={2} 
          height={480} 
        />
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  );
}

export default function MeadowEnvironment({ children, isGoldenHourOverride, cameraPosition, focusDistance, className = "" }: MeadowSceneProps & { className?: string }) {
  return (
    <div className={`w-full h-full absolute inset-0 ${className}`}>
      <Canvas
        shadows
        dpr={[1, 1]}
        camera={{ position: cameraPosition || [0, 1.5, 4], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      >
        <SceneContent isGoldenHourOverride={isGoldenHourOverride} cameraPosition={cameraPosition} focusDistance={focusDistance}>
          {children}
        </SceneContent>
      </Canvas>
    </div>
  );
}
