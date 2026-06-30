"use client";

import { useEffect } from "react";
import { useLivingSystemStore } from "@/lib/store";
import { useMousePhysics } from "@/hooks/useMousePhysics";

/**
 * GenesisInteraction — Captures mouse and scroll input during the cinematic.
 * 
 * During cinematic (phases 1-7):
 *   - Mouse position feeds into the camera parallax system
 *   - Scroll is captured and suppressed
 *   - Mouse velocity triggers dust particle scatter
 * 
 * After reveal (phase 8):
 *   - Scroll resumes normal behavior
 *   - Mouse continues to drive subtle background parallax
 */
export default function GenesisInteraction() {
  const setMouse = useMousePhysics((s) => s.setMouse);
  const cinematicActive = useLivingSystemStore((s) => s.cinematicActive);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1..1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse(x, y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setMouse]);

  // Suppress scroll during cinematic
  useEffect(() => {
    if (!cinematicActive) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    // Lock scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [cinematicActive]);

  return null;
}
