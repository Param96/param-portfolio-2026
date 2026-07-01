"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLivingSystemStore, TimeOfDayTheme } from "@/lib/store";

// ─────────────────────────────────────────────────────────
// TIME OF DAY THEME MAPPING for Trigger
// ─────────────────────────────────────────────────────────
const THEMES = {
  dawn: { idle: "#8b5a2b", hover: "#654321", glow: "rgba(139, 90, 43, 0.3)", bg: "rgba(255, 255, 255, 0.6)", hoverBg: "rgba(255, 255, 255, 0.9)" },
  day: { idle: "#1c2e26", hover: "#000000", glow: "rgba(28, 46, 38, 0.3)", bg: "rgba(255, 255, 255, 0.7)", hoverBg: "rgba(255, 255, 255, 1)" },
  dusk: { idle: "#7a3f41", hover: "#502628", glow: "rgba(122, 63, 65, 0.3)", bg: "rgba(255, 255, 255, 0.4)", hoverBg: "rgba(255, 255, 255, 0.8)" },
  night: { idle: "#b0d2ba", hover: "#ffffff", glow: "rgba(176, 210, 186, 0.3)", bg: "rgba(0, 0, 0, 0.5)", hoverBg: "rgba(0, 0, 0, 0.8)" },
};

interface OracleRootTriggerProps {
  timeOfDayTheme: TimeOfDayTheme;
  onOpen: () => void;
  isOpen: boolean;
}

export function OracleRootTrigger({ timeOfDayTheme, onOpen, isOpen }: OracleRootTriggerProps) {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isSparking, setIsSparking] = useState(false);
  const colors = THEMES[timeOfDayTheme] || THEMES.night;

  const handleClick = () => {
    if (reducedMotion) {
      onOpen();
      return;
    }
    
    setIsSparking(true);
    setTimeout(() => {
      setIsSparking(false);
      onOpen();
    }, 200); // 200ms spark
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-6 md:bottom-12 right-6 md:right-12 z-[110]"
        >
          {/* Tooltip (Desktop Only) */}
          <AnimatePresence>
            {isHovered && !isSparking && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md pointer-events-none hidden md:block"
                style={{ backgroundColor: "rgba(0,0,0,0.8)", color: colors.hover, border: `1px solid ${colors.glow}` }}
              >
                Oracle Root — press ~ or tap to open
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            aria-label="Open Oracle Root terminal"
            className="w-14 h-14 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent relative group backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-black/10 dark:border-white/10 transition-colors duration-300"
            style={{ 
              backgroundColor: isHovered ? (colors as any).hoverBg : (colors as any).bg,
              color: isHovered || isSparking ? colors.hover : colors.idle,
              boxShadow: isHovered ? `0 0 15px ${colors.glow}` : "none",
            }}
            whileHover={reducedMotion ? {} : { scale: 1.05 }}
            whileTap={reducedMotion ? {} : { scale: 0.95 }}
          >
            {/* Ambient Idle Pulse */}
            {!reducedMotion && !isHovered && !isSparking && (
              <motion.div 
                className="absolute inset-0 rounded-full bg-current opacity-0 pointer-events-none"
                animate={{ opacity: [0, 0.15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
              />
            )}

            {/* Spark Flash overlay */}
            <AnimatePresence>
              {isSparking && !reducedMotion && (
                <motion.div 
                  className="absolute inset-0 rounded-full bg-white z-10"
                  initial={{ opacity: 0.8, scale: 0.8 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>

            {/* Sigil SVG */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 relative z-20">
              <path d="M12 4v4" />
              <path d="M12 8c-3 2-5 5-6 10" />
              <path d="M12 8c3 2 5 5 6 10" />
              <path d="M12 8c0 3-1 6-2 10" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Connected container to easily drop into layout.tsx without breaking server components
export default function ConnectedOracleRootTrigger() {
  const { timeOfDayTheme, toggleTerminal, terminalOpen } = useLivingSystemStore();
  return <OracleRootTrigger timeOfDayTheme={timeOfDayTheme} onOpen={toggleTerminal} isOpen={terminalOpen} />;
}
