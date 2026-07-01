"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLivingSystemStore, TimeOfDayTheme } from "@/lib/store";

// ─────────────────────────────────────────────────────────
// TIME OF DAY THEME MAPPING for Trigger
// ─────────────────────────────────────────────────────────
const THEMES = {
  dawn: { idle: "rgba(212, 163, 115, 0.85)", hover: "rgba(212, 163, 115, 1)", glow: "rgba(212, 163, 115, 0.6)" },
  day: { idle: "rgba(47, 62, 70, 0.85)", hover: "rgba(47, 62, 70, 1)", glow: "rgba(47, 62, 70, 0.5)" },
  dusk: { idle: "rgba(229, 152, 155, 0.85)", hover: "rgba(229, 152, 155, 1)", glow: "rgba(229, 152, 155, 0.6)" },
  night: { idle: "rgba(132, 169, 140, 0.85)", hover: "rgba(132, 169, 140, 1)", glow: "rgba(132, 169, 140, 0.6)" },
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
          className="fixed bottom-4 md:bottom-6 left-4 md:left-6 z-40"
        >
          {/* Tooltip (Desktop Only) */}
          <AnimatePresence>
            {isHovered && !isSparking && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-mono tracking-widest uppercase px-3 py-1.5 rounded-md pointer-events-none hidden md:block"
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
            className="w-12 h-12 flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent relative group backdrop-blur-md shadow-sm border border-white/10 dark:border-white/5"
            style={{ 
              backgroundColor: isHovered ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.03)",
              color: isHovered || isSparking ? colors.hover : colors.idle,
              filter: isHovered || isSparking ? `drop-shadow(0 0 8px ${colors.glow})` : "none",
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative z-20">
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
