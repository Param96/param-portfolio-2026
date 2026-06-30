"use client";

import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useMousePhysics } from "@/hooks/useMousePhysics";
import AnimatedBackground from "../AnimatedBackground";
import { EffectComposer, Bloom, DepthOfField, Noise } from "@react-three/postprocessing";

export default function GlobalCanvas() {
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const setMouse = useMousePhysics((state) => state.setMouse);

  useEffect(() => {
    // Attach event source to the body or main container so the Canvas 
    // receives events even if it is behind other DOM elements.
    setEventSource(document.body);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -1 to 1
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
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <AnimatedBackground />
        
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
          <Noise opacity={0.03} />
        </EffectComposer>


      </Canvas>
    </div>
  );
}
