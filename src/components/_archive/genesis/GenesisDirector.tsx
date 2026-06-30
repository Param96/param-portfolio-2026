"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLivingSystemStore } from "@/lib/store";

/**
 * Scene timeline definition.
 * Each scene has a start time, end time, and name.
 */
const SCENES = [
  { id: 1, name: "drop",         start: 0,  end: 8  },
  { id: 2, name: "growth",       start: 8,  end: 22 },
  { id: 3, name: "forest",       start: 22, end: 38 },
  { id: 4, name: "intelligence", start: 38, end: 52 },
  { id: 5, name: "humanity",     start: 52, end: 62 },
  { id: 6, name: "evolution",    start: 62, end: 73 },
  { id: 7, name: "website",      start: 73, end: 80 },
] as const;

const TOTAL_DURATION = 80; // seconds

export default function GenesisDirector() {
  const {
    hasSeenCinematic,
    cinematicActive,
    startCinematic,
    setCinematicPhase,
    setCinematicProgress,
    setSceneLocalTime,
    setGenesisElapsed,
    setCinematicActive,
    skipCinematic,
  } = useLivingSystemStore();

  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);
  const [showInitOverlay, setShowInitOverlay] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);

  // Determine if we should show the cinematic or skip it
  useEffect(() => {
    if (hasSeenCinematic) {
      // Returning visitor — skip instantly
      skipCinematic();
    } else {
      // First visit — show "Click to begin" overlay
      setShowInitOverlay(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Master animation loop
  const tick = useCallback((timestamp: number) => {
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    const elapsed = (timestamp - startTimeRef.current) / 1000;
    const clamped = Math.min(elapsed, TOTAL_DURATION);
    const progress = clamped / TOTAL_DURATION;

    // Determine current scene
    let currentScene: (typeof SCENES)[number] = SCENES[0];
    for (const scene of SCENES) {
      if (clamped >= scene.start && clamped < scene.end) {
        currentScene = scene;
        break;
      }
    }

    // If we've passed the last scene
    if (clamped >= TOTAL_DURATION) {
      setCinematicPhase(8); // 8 = complete
      setCinematicProgress(1);
      setSceneLocalTime(0);
      setGenesisElapsed(TOTAL_DURATION);
      setCinematicActive(false);
      return; // Stop the loop
    }

    const sceneLocalTime = clamped - currentScene.start;

    setCinematicPhase(currentScene.id);
    setCinematicProgress(progress);
    setSceneLocalTime(sceneLocalTime);
    setGenesisElapsed(clamped);

    rafRef.current = requestAnimationFrame(tick);
  }, [setCinematicPhase, setCinematicProgress, setSceneLocalTime, setGenesisElapsed, setCinematicActive]);

  // Start the cinematic when activated
  useEffect(() => {
    if (cinematicActive) {
      startTimeRef.current = null;
      rafRef.current = requestAnimationFrame(tick);

      // Show skip hint after 3 seconds
      const hintTimer = setTimeout(() => setShowSkipHint(true), 3000);
      // Hide skip hint after 8 seconds
      const hideTimer = setTimeout(() => setShowSkipHint(false), 8000);

      return () => {
        cancelAnimationFrame(rafRef.current);
        clearTimeout(hintTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [cinematicActive, tick]);

  // Skip handler (Escape or Space key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        e.preventDefault();
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const handleSkip = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    skipCinematic();
    setShowInitOverlay(false);
    setShowSkipHint(false);
  }, [skipCinematic]);

  const handleInit = useCallback(() => {
    setShowInitOverlay(false);
    startCinematic();
  }, [startCinematic]);

  return (
    <>
      {/* Init overlay — "Click to begin" for first-time visitors */}
      <AnimatePresence>
        {showInitOverlay && (
          <motion.div
            key="genesis-init"
            className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer"
            style={{ backgroundColor: "#030302" }}
            onClick={handleInit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 2 }}
            >
              <motion.div
                className="w-[1px] h-12 bg-white/20 mx-auto mb-8"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <p
                className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-inter"
              >
                Click anywhere to begin
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip hint — appears during cinematic */}
      <AnimatePresence>
        {showSkipHint && cinematicActive && (
          <motion.button
            key="skip-hint"
            onClick={handleSkip}
            className="fixed bottom-8 right-8 z-[9998] text-[9px] uppercase tracking-[0.3em] text-white/20 font-inter hover:text-white/50 transition-colors cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Press ESC to skip
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
