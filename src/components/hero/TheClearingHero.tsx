"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { useLivingSystemStore } from "@/lib/store";

// Dynamically import the Canvas to avoid SSR issues with Three.js
const ClearingScene = dynamic(() => import("./clearing/ClearingScene"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#f3e4c4]" /> // Fallback sky color
});

const THEME_STYLES = {
  dawn: {
    bg: "#f3e4c4",
    gradient: "radial-gradient(circle, rgba(250, 240, 220, 0.5) 0%, rgba(250, 240, 220, 0.25) 40%, rgba(243,228,196,0) 70%)",
    textHeading: "#3a2e1e",
    textSub: "#f5efe0",
    textEyebrow: "#4a7040",
  },
  day: {
    bg: "#a3ddff",
    gradient: "radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.25) 40%, rgba(255,255,255,0) 70%)",
    textHeading: "#1a3322",
    textSub: "#ffffff",
    textEyebrow: "#264d36",
  },
  dusk: {
    bg: "#ffb380",
    gradient: "radial-gradient(circle, rgba(255, 209, 179, 0.5) 0%, rgba(255, 209, 179, 0.25) 40%, rgba(255,179,128,0) 70%)",
    textHeading: "#2b1b17",
    textSub: "#fff0e6",
    textEyebrow: "#703838",
  },
  night: {
    bg: "#0a1128",
    gradient: "radial-gradient(circle, rgba(25, 40, 70, 0.6) 0%, rgba(25, 40, 70, 0.3) 40%, rgba(10,17,40,0) 70%)",
    textHeading: "#e2f1ff",
    textSub: "#b3d4ff",
    textEyebrow: "#6699cc",
  }
};

export default function TheClearingHero() {
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const currentStyles = THEME_STYLES[timeOfDayTheme];
  return (
    <section 
      className="relative w-full h-screen min-h-[600px] overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: currentStyles.bg }}
    >
      {/* 3D Environment Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ClearingScene />
        </Suspense>
      </div>

      {/* Typography Overlay */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none">
        
        {/* Soft radial gradient strictly behind the text block for contrast without a hard box */}
        <div 
          className="absolute -left-10 top-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none transition-all duration-1000 ease-in-out"
          style={{
            background: currentStyles.gradient,
            filter: "blur(60px)"
          }}
        />

        <div className="relative z-20 max-w-2xl pointer-events-auto">
          {/* Eyebrow label */}
          <motion.div 
            className="text-xs md:text-sm font-inter uppercase tracking-[0.2em] mb-6 transition-colors duration-1000 ease-in-out"
            style={{ color: currentStyles.textEyebrow }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            Code. Intelligence. Impact.
          </motion.div>

          {/* Headline */}
          <motion.h1 
            className="font-inter font-bold text-5xl md:text-7xl lg:text-[5rem] leading-[1.05] tracking-tight mb-8 transition-colors duration-1000 ease-in-out"
            style={{ color: currentStyles.textHeading }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          >
            Building systems<br/>that grow.
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            className="font-inter text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-12 drop-shadow-sm transition-colors duration-1000 ease-in-out"
            style={{ color: currentStyles.textSub }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
          >
            I engineer agentic AI, scalable infrastructure, and intelligent products that feel alive, intuitive, and seamlessly woven into nature.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          >
            <a 
              href="#experiments" 
              className="inline-flex items-center gap-3 text-[#e0b85c] font-inter text-sm uppercase tracking-wider font-semibold group drop-shadow-sm"
            >
              <span className="relative">
                Explore my work
                <span className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-[#e0b85c] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
