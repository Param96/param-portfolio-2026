"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Volume2, Target, Cpu, Activity } from "lucide-react";
import { useLivingSystemStore } from "@/lib/store";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const { timeOfDayTheme } = useLivingSystemStore();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-transparent">
      
      {/* ── Cinematic Vignette ── */}
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ── Typography Overlay ── */}
      <div className="relative z-20 h-full flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">

            {/* System label */}
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.77, 0, 0.17, 1] }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-10 h-[1px] bg-[var(--accent-primary)]/40" />
              <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent-primary)] font-inter flex items-center gap-2">
                <Target className="w-3 h-3" />
                Experimental Engineering
              </span>
            </motion.div>

            {/* Interactive Headline */}
            <div className="mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.05] perspective-[1000px]">
                <InteractiveWord word="Building" delay={0.5} />{" "}
                <InteractiveWord word="Intelligent" delay={0.7} />
                <br className="hidden md:block" />
                <span className="text-[var(--text-secondary)] italic font-light hover:text-[var(--accent-primary)] transition-colors duration-500 cursor-pointer pointer-events-auto inline-block">
                  Systems
                </span>{" "}
                &amp;{" "}
                <br className="hidden md:block" />
                <InteractiveWord word="Experimental" delay={0.9} />
                <span className="text-[var(--accent-secondary)] px-3 inline-block">AI</span>
                <br className="hidden md:block" />
                <InteractiveWord word="Infrastructure." delay={1.1} />
              </h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-[var(--text-secondary)] font-medium leading-relaxed max-w-xl mb-12"
            >
              Building the Future with AI and Software
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 md:gap-6 pointer-events-auto"
            >
              <Link
                href="/projects"
                className="px-6 md:px-8 py-3 md:py-4 rounded-none border border-[var(--text-primary)]/20 bg-[var(--bg-main)] text-[var(--text-primary)] font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase hover:bg-transparent hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all duration-500 flex items-center gap-3 group"
              >
                Explore Systems
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Dynamic HUD Overlay ── */}
      <HUDOverlay mousePos={mousePos} timeOfDayTheme={timeOfDayTheme} />

    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// INTERACTIVE WORD COMPONENT (Mechanical Assembly)
// ═══════════════════════════════════════════════════════════════
function InteractiveWord({ word, delay = 0 }: { word: string, delay?: number }) {
  return (
    <span className="inline-block relative group pointer-events-auto cursor-crosshair whitespace-nowrap">
      {word.split("").map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block origin-bottom"
          initial={{ rotateX: 90, y: 20, z: -50, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, z: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            delay: delay + i * 0.04,
          }}
          whileHover={{
            y: -4,
            rotateZ: Math.random() * 4 - 2,
            scale: 1.05,
            color: "var(--accent-primary)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// HUD OVERLAY (Dynamic Data Readouts)
// ═══════════════════════════════════════════════════════════════
function HUDOverlay({ mousePos, timeOfDayTheme }: { mousePos: { x: number, y: number }, timeOfDayTheme: string }) {
  const [dataStream, setDataStream] = useState<string[]>([]);
  const [memUsage, setMemUsage] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      const hashes = [
        "SYS.OP.0X" + Math.floor(Math.random() * 9999).toString(16).toUpperCase(),
        "MEM.ALLOC." + Math.floor(Math.random() * 100) + "GB",
        "SYNC: " + (Math.random() > 0.5 ? "STABLE" : "RECALIBRATING"),
      ];
      setDataStream(prev => [hashes[Math.floor(Math.random() * hashes.length)], ...prev].slice(0, 5));
      setMemUsage(prev => Math.max(10, Math.min(90, prev + (Math.random() * 10 - 5))));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-30 font-inter overflow-hidden">
      
      {/* Top Right: System Status */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-8 right-8 flex flex-col items-end gap-2 text-right"
      >
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            Core Temp
          </span>
          <span className="text-[10px] font-bold text-[var(--accent-secondary)]">32.4°C</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
            Mem Usage
          </span>
          <span className="text-[10px] font-bold text-[var(--text-primary)]">{memUsage.toFixed(1)}%</span>
        </div>
        <div className="h-[2px] w-24 bg-[var(--text-primary)]/10 mt-2 overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--accent-primary)]"
            animate={{ width: `${memUsage}%` }}
            transition={{ ease: "linear", duration: 0.8 }}
          />
        </div>
      </motion.div>

      {/* Bottom Left: Data Stream */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-8 flex flex-col gap-1"
      >
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-3 h-3 text-[var(--accent-primary)] animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-primary)] font-bold">
            Live Telemetry
          </span>
        </div>
        <AnimatePresence>
          {dataStream.map((data, i) => (
            <motion.div
              key={data + i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1 - i * 0.2, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-[9px] text-[var(--text-secondary)] tracking-widest uppercase"
            >
              {data}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Right: Coordinates mapped to Mouse */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-8 flex flex-col items-end gap-1"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--text-secondary)]">
          Target Vector
        </span>
        <span className="text-[10px] font-bold text-[var(--text-primary)]">
          X: {mousePos.x.toFixed(0).padStart(4, '0')} Y: {mousePos.y.toFixed(0).padStart(4, '0')}
        </span>
      </motion.div>

    </div>
  );
}