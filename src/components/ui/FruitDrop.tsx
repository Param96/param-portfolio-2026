"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, AnimatePresence, Variants } from "framer-motion";

interface FruitDropProps {
  trigger: boolean;
  line: string;
}

export default function FruitDrop({ trigger, line }: FruitDropProps) {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<"hanging" | "falling" | "landed">("hanging");

  useEffect(() => {
    if (trigger && phase === "hanging") {
      setPhase(shouldReduceMotion ? "landed" : "falling");
    }
  }, [trigger, phase, shouldReduceMotion]);

  useEffect(() => {
    if (phase === "falling") {
      const timer = setTimeout(() => {
        setPhase("landed");
      }, 600); // Fruit takes 0.6s to fall
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Reset if trigger is toggled back to false (e.g. form reset and user submits again)
  useEffect(() => {
    if (!trigger) {
      setPhase("hanging");
    }
  }, [trigger]);

  // Character squash animation when fruit lands
  const characterVariants: Variants = {
    hanging: { scaleY: 1, y: 0 },
    falling: { scaleY: 1, y: 0 },
    landed: shouldReduceMotion
      ? { scaleY: 1, y: 0 }
      : {
          scaleY: [1, 0.7, 1.1, 1],
          y: [0, 5, -2, 0],
          transition: { duration: 0.4, ease: "easeOut" },
        },
  };

  const fruitVariants: Variants = {
    hanging: { y: 0, opacity: 1 },
    falling: {
      y: 98,
      rotate: 15,
      transition: { duration: 0.6, ease: "easeIn" }, // Gravity-ish ease-in
    },
    landed: shouldReduceMotion
      ? { y: 98, opacity: 1 }
      : {
          y: [98, 88, 98, 96, 98], // Small bounce on head
          rotate: [15, 25, 40, 45, 45],
          transition: { duration: 0.5, ease: "easeOut" },
        },
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <svg width="100%" height="100%" viewBox="0 0 300 300" className="overflow-visible absolute inset-0">
        {/* Environment Details (Static) */}
        <g stroke="#2F3E46" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Lantern Post */}
          <line x1="20" y1="280" x2="20" y2="200" strokeWidth="2.5" />
          <path d="M20 200 L20 195 Q30 195 30 205 L30 210" strokeWidth="2" />
          <rect x="25" y="210" width="10" height="15" rx="2" />
          <line x1="27" y1="210" x2="33" y2="205" />
          <circle cx="30" cy="217" r="4" fill="#D4A373" stroke="none" fillOpacity="0.8" />
          <circle cx="30" cy="217" r="10" fill="#D4A373" stroke="none" fillOpacity="0.2" className="animate-pulse" />

          {/* Bench */}
          <line x1="40" y1="264" x2="88" y2="264" strokeWidth="2" />
          <line x1="42" y1="267" x2="86" y2="267" strokeWidth="2" />
          <line x1="52" y1="267" x2="52" y2="280" strokeWidth="2.5" />
          <line x1="80" y1="267" x2="80" y2="280" strokeWidth="2.5" />

          {/* Grass tufts */}
          <path d="M110 280 Q108 275 105 277 M110 280 Q115 272 118 278" strokeOpacity="0.5" />
          <path d="M210 280 Q207 274 205 276 M210 280 Q213 273 216 279" strokeOpacity="0.5" />
          
          {/* Fallen leaf */}
          <path d="M100 280 Q105 276 108 280 Q105 283 100 280 Z" fill="#D4A373" fillOpacity="0.4" strokeOpacity="0.5" />
          <path d="M100 280 L108 280" strokeOpacity="0.3" />

          {/* Small Bird on right branch */}
          <g>
            <path d="M205 110 Q210 105 215 108 Q218 105 220 110 Q215 115 205 110 Z" fill="#2F3E46" stroke="none" />
            <path d="M220 108 L223 109 L220 110" />
            <path d="M205 110 L200 114" />
            <line x1="210" y1="112" x2="210" y2="116" />
            <line x1="214" y1="112" x2="214" y2="116" />
          </g>
        </g>

        {/* Character */}
        <motion.g
          variants={characterVariants}
          initial="hanging"
          animate={phase}
          className="origin-[70px_280px]"
        >
          {/* Head */}
          <circle cx="70" cy="247" r="6" stroke="#2F3E46" strokeWidth="2" fill="none" />
          {/* Torso leaning back slightly */}
          <path d="M70 253 L67 263" stroke="#2F3E46" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Legs (Thighs on bench, calves down) */}
          <path d="M67 263 L77 263 L77 280" stroke="#2F3E46" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          {/* Feet */}
          <path d="M77 280 L81 280" stroke="#2F3E46" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Arm resting on thigh */}
          <path d="M69 255 L73 262" stroke="#2F3E46" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Book on lap */}
          <path d="M72 261 L80 259 L82 263 L74 265 Z" fill="none" stroke="#2F3E46" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Satchel beside bench */}
          <path d="M32 280 L30 270 Q35 268 40 270 L38 280 Z" fill="none" stroke="#2F3E46" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M32 270 Q35 265 38 270" fill="none" stroke="#2F3E46" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Impact lines when landed */}
          <AnimatePresence>
            {phase === "landed" && !shouldReduceMotion && (
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1.5] }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="origin-[70px_240px]"
              >
                <line x1="70" y1="230" x2="70" y2="220" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
                <line x1="55" y1="240" x2="45" y2="235" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
                <line x1="85" y1="240" x2="95" y2="235" stroke="#D4A373" strokeWidth="2" strokeLinecap="round" />
              </motion.g>
            )}
          </AnimatePresence>
        </motion.g>

        {/* The Fruit */}
        <motion.g
          variants={fruitVariants}
          initial="hanging"
          animate={phase}
          className="origin-[70px_130px]"
        >
          {/* Glow Effect */}
          <circle cx="70" cy="130" r="20" fill="#D4A373" className="opacity-0 blur-md" />
          {/* Fruit Body */}
          <circle cx="70" cy="130" r="12" fill="#D4A373" className="stroke-[3px] stroke-transparent shadow-xl" />
          {/* Stem */}
          <path d="M70 118 L70 110" stroke="#2F3E46" strokeWidth="2" />
        </motion.g>
      </svg>

      {/* HTML Dialogue Bubble */}
      <AnimatePresence>
        {phase === "landed" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.5, delay: 0.2 }}
            className="absolute bottom-[25%] left-[30%] bg-white border border-[#2F3E46]/10 shadow-lg rounded-2xl rounded-bl-none px-4 py-2 w-max max-w-[140px] z-20 origin-bottom-left"
          >
            <p className="text-xs font-medium text-[#2F3E46] leading-tight text-center">
              {line}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
