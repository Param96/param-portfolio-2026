"use client";

import { useEffect, useState } from "react";
import { useLivingSystemStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicDirector() {
  const { cinematicPhase, hasSeenCinematic, startCinematic, skipCinematic, setCinematicPhase, setCinematicProgress } = useLivingSystemStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // If they have seen it before, skip immediately
    if (useLivingSystemStore.getState().hasSeenCinematic && useLivingSystemStore.getState().cinematicPhase === 0) {
      skipCinematic();
    }
  }, [skipCinematic]);

  useEffect(() => {
    if (!mounted || cinematicPhase === 0 || cinematicPhase === 7) return;

    let startTime = Date.now();
    let animationFrameId: number;

    const timeline = [
      { phase: 1, duration: 8000 },  // 0-8s: Big Bang
      { phase: 2, duration: 10000 }, // 8-18s: First World
      { phase: 3, duration: 10000 }, // 18-28s: The Seed
      { phase: 4, duration: 12000 }, // 28-40s: Evolution
      { phase: 5, duration: 10000 }, // 40-50s: Human Curiosity
      { phase: 6, duration: 6000 },  // 50-56s: Intelligence
      { phase: 7, duration: 4000 },  // 56-60s: Reveal
    ];

    const updateTimeline = () => {
      const elapsed = Date.now() - startTime;
      
      let accumulatedTime = 0;
      let currentPhase = 1;
      let localProgress = 0;
      let globalProgress = elapsed / 60000; // 60 seconds total

      for (let i = 0; i < timeline.length; i++) {
        if (elapsed < accumulatedTime + timeline[i].duration) {
          currentPhase = timeline[i].phase;
          localProgress = (elapsed - accumulatedTime) / timeline[i].duration;
          break;
        }
        accumulatedTime += timeline[i].duration;
      }

      if (elapsed >= 60000) {
        setCinematicPhase(7);
        setCinematicProgress(1);
        return;
      }

      if (useLivingSystemStore.getState().cinematicPhase !== currentPhase) {
        setCinematicPhase(currentPhase);
      }
      setCinematicProgress(globalProgress);

      animationFrameId = requestAnimationFrame(updateTimeline);
    };

    animationFrameId = requestAnimationFrame(updateTimeline);

    return () => cancelAnimationFrame(animationFrameId);
  }, [mounted, cinematicPhase, setCinematicPhase, setCinematicProgress]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {cinematicPhase === 0 && !hasSeenCinematic && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center cursor-pointer"
          onClick={startCinematic}
        >
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="w-12 h-[1px] bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-inter">
              Click to Initialize System
            </span>
          </motion.div>
        </motion.div>
      )}

      {/* Debug Scrubber (Only visible during dev, you can remove later) */}
      {process.env.NODE_ENV === 'development' && cinematicPhase > 0 && cinematicPhase < 7 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] font-inter text-[10px] text-white/50 bg-black/50 px-4 py-2 rounded">
          PHASE: {cinematicPhase} | {(useLivingSystemStore.getState().cinematicProgress * 100).toFixed(1)}%
          <button className="ml-4 underline" onClick={skipCinematic}>SKIP</button>
        </div>
      )}
    </AnimatePresence>
  );
}
