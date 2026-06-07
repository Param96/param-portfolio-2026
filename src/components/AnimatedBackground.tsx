"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function AnimatedBackground() {
  const pathname = usePathname();

  // Define route-specific palettes
  const palette = useMemo(() => {
    if (pathname === "/projects") {
      return {
        blob1: "#D4A373", // Light Bronze
        blob2: "#FAEDCD", // Papaya Whip
        blob3: "#CCD5AE", // Tea Green
        base: "#FEFAE0"
      };
    }
    if (pathname === "/research") {
      return {
        blob1: "#354F52", // Dark Slate Grey
        blob2: "#52796F", // Deep Teal
        blob3: "#84A98C", // Muted Teal
        base: "#FAEDCD"
      };
    }
    if (pathname === "/blog") {
      return {
        blob1: "#2F3E46", // Charcoal Blue
        blob2: "#CCD5AE", // Tea Green
        blob3: "#84A98C", // Muted Teal
        base: "#FEFAE0"
      };
    }
    if (pathname === "/lab-notes") {
      return {
        blob1: "#E9EDC9", // Beige
        blob2: "#2F3E46", // Charcoal Blue
        blob3: "#52796F", // Deep Teal
        base: "#FAEDCD"
      };
    }
    // Default / Homepage
    return {
      blob1: "#D4A373", // Light Bronze
      blob2: "#84A98C", // Muted Teal
      blob3: "#CCD5AE", // Tea Green
      base: "#FEFAE0"
    };
  }, [pathname]);

  return (
    <motion.div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]"
      animate={{ backgroundColor: palette.base }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* Blob 1 */}
      <motion.div
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-30 mix-blend-multiply"
        animate={{
          background: `radial-gradient(circle, ${palette.blob1} 0%, transparent 70%)`,
          x: [0, 50, -20, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          background: { duration: 1.5, ease: "easeInOut" },
          x: { duration: 40, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 40, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 40, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Blob 2 */}
      <motion.div
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-30 mix-blend-multiply"
        animate={{
          background: `radial-gradient(circle, ${palette.blob2} 0%, transparent 70%)`,
          x: [0, -60, 30, 0],
          y: [0, 40, -50, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          background: { duration: 1.5, ease: "easeInOut" },
          x: { duration: 50, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 50, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 50, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Blob 3 */}
      <motion.div
        className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-20 mix-blend-multiply"
        animate={{
          background: `radial-gradient(circle, ${palette.blob3} 0%, transparent 70%)`,
          x: [0, 100, -80, 0],
          y: [0, 100, -40, 0],
        }}
        transition={{
          background: { duration: 1.5, ease: "easeInOut" },
          x: { duration: 60, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 60, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Heavy Noise Overlay */}
      <div className="absolute inset-0 noise-overlay opacity-40 mix-blend-overlay" />
    </motion.div>
  );
}
