"use client";

import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useEffect, useState } from "react";
import { useMousePhysics } from "@/hooks/useMousePhysics";

import CameraRig from "./systems/CameraRig";
import DropScene from "./scenes/DropScene";
import GrowthScene from "./scenes/GrowthScene";
import ForestScene from "./scenes/ForestScene";
import IntelligenceScene from "./scenes/IntelligenceScene";
import HumanityScene from "./scenes/HumanityScene";
import EvolutionScene from "./scenes/EvolutionScene";
import WebsiteScene from "./scenes/WebsiteScene";

/**
 * GenesisCanvas — The fixed, full-viewport Three.js canvas.
 * 
 * Architecture:
 * - position:fixed, z-index:0, always behind DOM content
 * - Contains all 7 scene components (they self-gate based on cinematicPhase)
 * - CameraRig handles spline-based camera movement
 * - Post-processing: Bloom + Noise + Vignette
 * - Canvas NEVER stops rendering (ambient background after reveal)
 */
export default function GenesisCanvas() {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const setMouse = useMousePhysics((s) => s.setMouse);

  useEffect(() => {
    setEventSource(document.body);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMouse]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        eventSource={eventSource || undefined}
        className="pointer-events-none"
        camera={{ position: [0, 0, 800], fov: 62, near: 0.1, far: 5000 }}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        shadows
      >
        {/* Camera System */}
        <CameraRig />

        {/* Ambient Light (very low, breathing-driven) */}
        <ambientLight intensity={0.15} color="#d4c4a8" />

        {/* All 7 Scenes (self-gating based on cinematicPhase) */}
        <DropScene />
        <GrowthScene />
        <ForestScene />
        <IntelligenceScene />
        <HumanityScene />
        <EvolutionScene />
        <WebsiteScene />

        {/* Post-Processing */}
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.9}
            luminanceSmoothing={0.3}
            mipmapBlur
            intensity={1.2}
          />
          <Noise opacity={0.04} />
          <Vignette eskil={false} offset={0.1} darkness={0.4} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
