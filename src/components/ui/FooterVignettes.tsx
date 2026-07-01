"use client";

import { motion } from "framer-motion";

/**
 * Shared Footer Environment
 * The constant trio: Tree, Bench, Lamp.
 * Styled with single-stroke outlines, packed canopy, and shared blush/peach accents.
 */
const SharedEnvironment = ({ children }: { children: React.ReactNode }) => (
  <svg className="w-full h-auto text-current" viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--vignette-accent)" stopOpacity="0.20" />
        <stop offset="100%" stopColor="var(--vignette-accent)" stopOpacity="0" />
      </radialGradient>
    </defs>

    {/* Ground */}
    <path d="M10 90 L190 90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
    <path d="M40 90 L160 90" stroke="currentColor" strokeWidth="1" />
    
    {/* Street Lamp */}
    <path d="M150 90 L150 25 L135 25 L135 30" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M130 30 L140 30 L138 35 L132 35 Z" fill="currentColor" opacity="0.8" />
    <circle cx="135" cy="42" r="18" fill="url(#lampGlow)" />
    <circle cx="135" cy="38" r="3" fill="var(--vignette-accent)" opacity="0.9" />
    <circle cx="132" cy="88" r="1" fill="var(--vignette-accent)" opacity="0.6" />
    <circle cx="140" cy="87" r="1.5" fill="var(--vignette-accent)" opacity="0.4" />

    {/* Tree Trunk */}
    <path d="M50 90 Q48 70 55 50 Q60 40 70 30 M55 50 Q45 45 35 40 M52 70 Q60 65 65 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    
    {/* Dense Leafy Canopy Blob Shapes */}
    <g stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.8">
      <path d="M25 40 C 15 30, 25 10, 45 15 C 60 5, 75 10, 80 25 C 90 35, 80 50, 65 55 C 50 60, 30 55, 25 40 Z" />
      <path d="M35 25 C 25 15, 40 5, 55 10 C 70 5, 85 15, 75 35 C 85 45, 65 55, 50 50 C 35 55, 25 40, 35 25 Z" />
      <path d="M50 35 C 40 25, 55 15, 70 20 C 85 15, 95 30, 85 45 C 95 55, 75 65, 60 60 C 45 65, 35 50, 50 35 Z" />
      <path d="M40 50 C 35 40, 45 30, 55 35 C 65 30, 75 45, 65 55 C 55 65, 40 60, 40 50 Z" />
    </g>

    {/* Standard Falling Blossoms (5-6 dots drifting) */}
    <g>
      <motion.circle cx="42" cy="45" r="1.5" fill="var(--vignette-accent)" animate={{ y: [0, 45], x: [0, -10] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="75" cy="38" r="2" fill="var(--vignette-accent)" animate={{ y: [0, 52], x: [0, 15] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <motion.circle cx="35" cy="50" r="1" fill="var(--vignette-accent)" animate={{ y: [0, 40], x: [0, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} />
      <motion.circle cx="65" cy="48" r="1" fill="var(--vignette-accent)" animate={{ y: [0, 42], x: [0, 8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
      <motion.circle cx="55" cy="35" r="1.2" fill="var(--vignette-accent)" animate={{ y: [0, 55], x: [0, -12] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
      <motion.circle cx="50" cy="25" r="1" fill="var(--vignette-accent)" animate={{ y: [0, 60], x: [0, -8] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
    </g>

    {/* Bench Base */}
    <path d="M92 90 L92 78 M118 90 L118 78" stroke="currentColor" strokeWidth="1" />
    <path d="M88 78 L122 78" stroke="currentColor" strokeWidth="1.5" />
    <path d="M92 78 L92 70 L118 70 L118 78" stroke="currentColor" strokeWidth="1" opacity="0.6" />

    {/* Page-Specific Content (Figure + Motifs) */}
    {children}
  </svg>
);

// 1. Home — "Evening Meadow"
const HomeVignette = () => (
  <SharedEnvironment>
    {/* Figure lying down along seat */}
    <path d="M92 76 C 96 73, 102 75, 108 76 L 118 76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Resting breath cue (optional micro-motion) */}
    <motion.path d="M95 70 Q 97 68 99 70" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
  </SharedEnvironment>
);

// 2. Research — "Old Fig, Open Scroll"
const ResearchVignette = () => (
  <SharedEnvironment>
    {/* Figure hunched forward */}
    <path d="M98 78 L 98 66 C 98 60, 102 58, 106 62 L 109 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arm reaching to lap */}
    <path d="M102 64 L 105 70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    {/* Open Scroll motif with animated turning page */}
    <path d="M 106 73 C 108 75, 112 75, 114 73 M 106 75 C 108 77, 112 77, 114 75" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <motion.path d="M 114 73 Q 112 71 110 74" stroke="currentColor" strokeWidth="0.5" fill="none" animate={{ d: ["M 114 73 Q 112 71 110 74", "M 114 73 Q 112 69 108 74", "M 114 73 Q 112 71 110 74"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
  </SharedEnvironment>
);

// 3. Project — "Sapling Through Scaffold"
const ProjectVignette = () => (
  <SharedEnvironment>
    {/* Figure tinkering (leaning forward, elbows on knees) */}
    <path d="M98 78 L 100 68 C 102 62, 106 62, 110 68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M106 65 L 108 72 L 112 72" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Scaffold Motif */}
    <path d="M 75 90 L 80 75 L 85 90 Z M 77 82 L 83 82" stroke="currentColor" strokeWidth="0.5" fill="none" />
    {/* Sapling escaping top */}
    <motion.path d="M 80 90 Q 82 70 80 65" stroke="currentColor" strokeWidth="1" fill="none" animate={{ d: ["M 80 90 Q 82 70 80 65", "M 80 90 Q 78 70 80 65", "M 80 90 Q 82 70 80 65"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
    {/* Dew dots */}
    <circle cx="79" cy="64" r="0.8" fill="var(--vignette-accent)" />
    <circle cx="82" cy="67" r="0.5" fill="var(--vignette-accent)" />
  </SharedEnvironment>
);

// 4. Blog — "Quill and Ink"
const BlogVignette = () => (
  <SharedEnvironment>
    {/* Figure relaxed cross-legged */}
    <path d="M96 78 L 96 66 C 96 60, 100 58, 104 62" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Arm resting on back rail */}
    <path d="M100 62 C 105 60, 110 60, 115 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    {/* Crossed leg */}
    <path d="M96 73 L 105 73 L 105 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Quill resting on bench */}
    <path d="M 118 78 Q 125 65 128 60 M 122 70 L 126 68 M 120 73 L 124 71" stroke="currentColor" strokeWidth="0.5" fill="none" />
    {/* Animated Ink Drop */}
    <motion.circle cx="116" cy="77" r="0.8" fill="var(--vignette-accent)" animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <circle cx="114" cy="78" r="0.5" fill="var(--vignette-accent)" />
  </SharedEnvironment>
);

// 5. AI Lab — "Circuit Branch"
const AILabVignette = () => (
  <SharedEnvironment>
    {/* Figure upright, reaching out */}
    <path d="M98 78 L 98 62 C 98 58, 100 56, 104 58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M100 60 L 90 50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    
    {/* Circuit Branches emerging from tree */}
    <path d="M70 30 L 85 30 L 85 20 M 65 40 L 95 40 L 95 45" stroke="currentColor" strokeWidth="1" fill="none" strokeLinejoin="bevel" />
    <motion.circle cx="85" cy="20" r="2" fill="none" stroke="var(--vignette-accent)" strokeWidth="1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="95" cy="45" r="1.5" fill="none" stroke="var(--vignette-accent)" strokeWidth="1" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
  </SharedEnvironment>
);

// 6. Contact — "Lantern at the Gate"
const ContactVignette = () => (
  <SharedEnvironment>
    {/* Figure turning and waving */}
    <path d="M104 78 L 104 64 C 104 58, 100 56, 96 60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <motion.path d="M100 62 L 108 52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" animate={{ rotate: [0, 8, 0], transformOrigin: "100px 62px" }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
    
    {/* Gate & Path Motif */}
    <path d="M 160 90 L 160 65 M 175 90 L 175 65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 158 65 Q 167 55 177 65" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M 165 90 L 180 100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" fill="none" />
    
    {/* Gate Firefly */}
    <motion.circle cx="167" cy="62" r="1" fill="var(--vignette-accent)" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
  </SharedEnvironment>
);

/**
 * Switcher that returns the correct vignette based on pathname.
 * Wraps it in a div that enforces the consistent blush/peach accent tone via CSS variable.
 */
export const DynamicFooterVignette = ({ pathname }: { pathname: string }) => {
  let Vignette = HomeVignette;
  
  if (pathname.includes("/research")) Vignette = ResearchVignette;
  else if (pathname.includes("/projects") || pathname.includes("/work")) Vignette = ProjectVignette;
  else if (pathname.includes("/blog")) Vignette = BlogVignette;
  else if (pathname.includes("/ai-lab") || pathname.includes("/ai")) Vignette = AILabVignette;
  else if (pathname.includes("/contact")) Vignette = ContactVignette;

  return (
    <div 
      className="flex flex-col items-center justify-end h-full w-80 opacity-60 hover:opacity-100 transition-opacity duration-700 pb-2 cursor-default"
      // Enforce the one consistent blush/peach accent tone for all vignettes
      style={{ "--vignette-accent": "#FFB09C" } as React.CSSProperties}
    >
      <Vignette />
    </div>
  );
};
