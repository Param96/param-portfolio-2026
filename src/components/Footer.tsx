"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Faint grain/noise overlay component
const NoiseOverlay = () => (
  <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay z-0" xmlns="http://www.w3.org/2000/svg">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

export default function Footer() {
  const pathname = usePathname();

  // Route-based configuration
  const getFooterProps = () => {
    if (pathname === "/projects" || pathname === "/work") {
      return {
        locationTheme: "daylight" as const,
        signatureLabel: "DAYLIGHT — FIELD",
        quotePool: [
          "Building evolving systems.",
          "Experimental engineering at scale.",
          "Rapid iteration over perfection."
        ]
      };
    }
    if (pathname === "/research") {
      return {
        locationTheme: "dusk" as const,
        signatureLabel: "DUSK — RIDGE",
        quotePool: [
          "Curiosity is the engine of progress.",
          "Reflecting on the architecture of thought.",
          "The best systems feel organic."
        ]
      };
    }
    if (pathname === "/ai-lab") {
      return {
        locationTheme: "night" as const, 
        signatureLabel: "NIGHT — CORE",
        quotePool: [
          "MODELS: 3 ACTIVE",
          "STATUS: EXPERIMENTING",
          "SYSTEM: NOMINAL"
        ]
      };
    }
    if (pathname === "/contact") {
      return {
        locationTheme: "night" as const,
        signatureLabel: "NIGHT — HOLLOW",
        quotePool: [
          "Open to ambitious ideas.",
          "Send a signal into the void.",
          "Looking for weird experiments."
        ]
      };
    }
    // Default (Home)
    return {
      locationTheme: "morning" as const,
      signatureLabel: "MORNING — MEADOW",
      quotePool: [
        "Building systems that feel slightly impossible.",
        "Agentic loops and quiet interfaces.",
        "Engineering the next paradigm."
      ]
    };
  };

  const { locationTheme, signatureLabel, quotePool } = getFooterProps();

  const getThemeConfig = () => {
    switch (locationTheme) {
      case "morning":
        return {
          bg: "bg-[var(--cream)]",
          text: "text-[var(--text-main)]",
          muted: "text-[var(--moss)]",
        };
      case "daylight":
        return {
          bg: "bg-[var(--bark)]",
          text: "text-[var(--cream)]",
          muted: "text-white/40",
        };
      case "dusk":
        return {
          bg: "bg-gradient-to-b from-[var(--cream)] to-[var(--graphite)]",
          text: "text-[var(--text-main)]",
          muted: "text-black/40",
        };
      case "night":
        return {
          bg: "bg-[var(--void)]",
          text: "text-[var(--silver)]",
          muted: "text-white/40",
        };
      default:
        return { bg: "bg-[var(--cream)]", text: "text-[var(--text-main)]", muted: "text-[var(--moss)]" };
    }
  };

  const config = getThemeConfig();
  
  const [quote, setQuote] = useState(quotePool[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(prev => {
        const currentIndex = quotePool.indexOf(prev);
        const nextIndex = (currentIndex + 1) % quotePool.length;
        return quotePool[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [quotePool]);

  return (
    <footer className={cn("relative w-full overflow-hidden transition-colors duration-1000 ease-[var(--ease-organic)] mt-24", config.bg, config.text)}>
      <NoiseOverlay />
      
      {/* Subtle top hairline gradient */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-current opacity-10 to-transparent mix-blend-overlay" />
      
      {/* Large Focal Element (Coordinate / Abstract mark) */}
      <div className="absolute -bottom-16 -left-12 opacity-[0.03] pointer-events-none select-none z-0">
        <span className="font-fraunces text-[22vw] leading-none whitespace-nowrap tracking-tighter">
          40° 42' N
        </span>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 md:pb-32 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-8"
      >
        
        {/* Left Side: Signature & Live Status */}
        <div className="flex flex-col items-start gap-12 w-full md:w-auto">
          {/* Live Status Module */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amber)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--amber)]"></span>
              </span>
              <span className={cn("font-inter text-[10px] tracking-widest uppercase", config.muted)}>
                {signatureLabel}
              </span>
            </div>
            {/* Rotating Quote */}
            <div className="h-4 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={quote}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={cn("font-inter text-[10px] tracking-wide", config.muted)}
                >
                  {quote}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Signature Name */}
          <div className="mt-8">
            <h2 className="font-fraunces text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.85] font-light">
              Param<br/>Patel<span className="text-[var(--amber)]">.</span>
            </h2>
          </div>
        </div>

        {/* Right Side: Stacked Nav Links */}
        <div className="flex flex-col items-start md:items-end gap-5 mt-8 md:mt-0 relative z-20">
          {[
            { name: "Home", href: "/" },
            { name: "Research", href: "/research" },
            { name: "Projects", href: "/projects" },
            { name: "AI Lab", href: "/ai-lab" },
            { name: "Contact", href: "/contact" }
          ].map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={cn(
                "group flex items-center gap-3 md:gap-4 transition-all duration-300 transform hover:-translate-y-[2px]", 
                config.text,
                "hover:text-[var(--amber)]"
              )}
            >
              {/* Glyph (hidden on mobile, or just kept small) */}
              <span className={cn("font-inter text-xs opacity-40 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-[var(--amber)]")}>
                —
              </span>
              
              {/* Text with center-underline */}
              <div className="relative font-inter text-sm md:text-base uppercase tracking-widest">
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[var(--amber)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </div>
            </Link>
          ))}
          
          {/* Spacer for floating trigger buttons so they don't overlap links on small screens */}
          <div className="h-24 w-full md:hidden" />
        </div>

      </motion.div>
    </footer>
  );
}
