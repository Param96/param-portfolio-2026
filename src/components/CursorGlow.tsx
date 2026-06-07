"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Disable on touch devices
    if ("ontouchstart" in window) {
      glow.style.display = "none";
      return;
    }

    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Smooth follow with lerp
    const animate = () => {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      glow.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed z-[9999] w-[400px] h-[400px] rounded-full opacity-20"
      style={{
        background:
          "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
