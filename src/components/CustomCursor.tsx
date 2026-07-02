"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorVariant = "default" | "interactive" | "text" | "system";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [label, setLabel] = useState("View");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Graceful degradation for mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement | null;
      let newVariant: CursorVariant = "default";
      let newLabel = "View";

      // Nearest ancestor wins using native DOM traversal
      const closestElement = target?.closest('a, button, [role="button"], input, select, textarea, [data-cursor]');
      
      if (closestElement) {
        if (closestElement.hasAttribute('data-cursor')) {
          const type = closestElement.getAttribute('data-cursor');
          if (type === "text" || type === "system") {
            newVariant = type as CursorVariant;
            newLabel = closestElement.getAttribute('data-cursor-label') || (type === "text" ? "View" : "");
          }
        } else {
          // It's a standard interactive element
          newVariant = "interactive";
        }
      } else if (target && window.getComputedStyle(target).cursor === "pointer") {
        // Fallback for custom components using only CSS cursor: pointer
        newVariant = "interactive";
      }

      setVariant(newVariant);
      if (newLabel) setLabel(newLabel);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isVisible) return null;

  // Unchanged spring config for consistent trailing physics
  const springConfig = { type: "spring", stiffness: 150, damping: 15, mass: 0.5 };
  const tweenConfig = { type: "tween", ease: "backOut", duration: 0.15 };
  
  // Transition settings for smooth cross-fades
  const fadeTransition = { duration: 0.2, ease: "easeInOut" };

  // Glow logic (Yellowish-orange)
  const glowColor = variant === "interactive" ? "#FF9500" : "#FFC840";
  const isTextOrSystem = variant === "text" || variant === "system";

  return (
    <>
      {/* 1. Soft Glow Layer (Lowest Z, NO blend mode, tracks variant accent) */}
      <motion.div
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[9997]"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
        }}
        animate={{
          x: mousePos.x - 64, // Center of 128px
          y: mousePos.y - 64,
          opacity: variant === "interactive" ? 0.25 : 0.15,
          scale: variant === "interactive" ? 1.2 : 1,
        }}
        transition={springConfig}
      />

      {/* 2. Default & Interactive: Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-[var(--moss)] rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: variant === "interactive" ? 0.5 : 1,
          opacity: isTextOrSystem ? 0 : 1,
        }}
        transition={{ ...tweenConfig, opacity: fadeTransition }}
      />
      
      {/* 3. Default & Interactive: Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--moss)] rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: variant === "interactive" ? 1.5 : 1,
          borderColor: variant === "interactive" ? "var(--amber)" : "var(--moss)",
          opacity: isTextOrSystem ? 0 : 1,
        }}
        transition={{ ...springConfig, opacity: fadeTransition }}
      />

      {/* 4. Text Variant: Capsule */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: variant === "text" ? 1 : 0,
          scale: variant === "text" ? 1 : 0.8,
        }}
        transition={{ ...springConfig, opacity: fadeTransition }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center px-4 py-1.5 border border-[var(--moss)] rounded-full bg-transparent whitespace-nowrap">
          <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-[var(--moss)] font-semibold mt-[1px]">
            {label}
          </span>
        </div>
      </motion.div>

      {/* 5. System Variant: Line-art Crosshair */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference text-[var(--moss)]"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          opacity: variant === "system" ? 1 : 0,
          scale: variant === "system" ? 1 : 0.5,
          rotate: variant === "system" ? 90 : 0,
        }}
        transition={{ ...springConfig, opacity: fadeTransition }}
      >
        <div className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v6 M12 16v6 M2 12h6 M16 12h6" />
          </svg>
        </div>
      </motion.div>
    </>
  );
}
