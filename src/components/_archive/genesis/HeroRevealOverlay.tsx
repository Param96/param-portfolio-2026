"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLivingSystemStore } from "@/lib/store";

/**
 * HeroRevealOverlay — Typography that fades in during Scene 7 of the cinematic.
 * 
 * Positioned as a full-viewport overlay, this renders the name, role, and
 * scroll indicator at precise timestamps during the reveal sequence.
 * 
 * After the cinematic completes, this persists as the hero section.
 */
export default function HeroRevealOverlay() {
  const { cinematicPhase, sceneLocalTime, cinematicActive } = useLivingSystemStore();

  // Show when cinematic is in reveal or complete
  const isRevealing = cinematicPhase === 7;
  const isComplete = cinematicPhase >= 8;
  const showContent = isRevealing || isComplete;

  // Precise timing for reveal elements (relative to Scene 7 start at 55s)
  const showName = isComplete || (isRevealing && sceneLocalTime >= 1.5);
  const showRole = isComplete || (isRevealing && sceneLocalTime >= 2.8);
  const showScroll = isComplete || (isRevealing && sceneLocalTime >= 4.4);

  if (!showContent) return null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pointer-events-none select-none">
      <div className="text-center z-20 relative">
        <AnimatePresence>
          {showName && (
            <motion.h1
              key="hero-name"
              className="text-[clamp(2rem,8vw,5.5rem)] font-inter font-bold tracking-[-0.04em] leading-[0.95]"
              style={{ color: "var(--text-primary)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Param Patel
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showRole && (
            <motion.p
              key="hero-role"
              className="mt-4 text-[clamp(0.75rem,2vw,1.1rem)] uppercase tracking-[0.35em] font-inter"
              style={{ color: "var(--text-muted)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              AI Engineer · Full Stack Developer · Founder
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            key="hero-scroll"
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span
              className="text-[9px] uppercase tracking-[0.4em] font-inter"
              style={{ color: "var(--text-muted)", opacity: 0.4 }}
            >
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-8"
              style={{ backgroundColor: "var(--text-muted)", opacity: 0.2 }}
              animate={{ scaleY: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
