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
      {/* Outer clusters */}
      <path d="M 35 45 C 30 45, 25 35, 35 30 C 35 20, 50 15, 60 20 C 70 15, 80 20, 80 30 C 90 35, 85 45, 80 45 Z" />
      <path d="M 40 35 C 35 30, 40 15, 55 15 C 65 15, 75 25, 70 35 Z" />
      <path d="M 50 25 C 45 20, 60 5, 70 15 C 80 15, 85 30, 75 30 Z" />
      {/* Interior texture lines to make it look full but minimalist */}
      <path d="M 45 40 Q 50 35 55 40 M 60 30 Q 65 25 70 30 M 55 20 Q 60 15 65 20 M 40 25 Q 45 20 50 25 M 75 35 Q 80 30 75 25" strokeOpacity="0.5" />
      <path d="M 50 45 Q 60 40 70 45 M 35 35 Q 45 30 50 35 M 65 25 Q 75 20 80 25" strokeOpacity="0.4" />
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
    {/* Head */}
    <circle cx="95" cy="74.5" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Figure lying down flat along seat */}
    <path d="M 98 75 Q 105 74.5 116 75 C 118 75, 120 76, 120 77" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Resting breath cue (optional micro-motion) */}
    <motion.path d="M96 68 Q 98 66 100 68" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
  </SharedEnvironment>
);

// 2. Research — "Old Fig, Open Scroll"
const ResearchVignette = () => (
  <SharedEnvironment>
    {/* Head above torso */}
    <circle cx="100" cy="62" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Torso leaning forward */}
    <path d="M 100 64.5 Q 98 70 98 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Arm reaching to lap */}
    <path d="M 99 68 L 105 74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    {/* Open Scroll motif with animated turning page */}
    <path d="M 106 73 C 108 75, 112 75, 114 73 M 106 75 C 108 77, 112 77, 114 75" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <motion.path d="M 114 73 Q 112 71 110 74" stroke="currentColor" strokeWidth="0.5" fill="none" animate={{ d: ["M 114 73 Q 112 71 110 74", "M 114 73 Q 112 69 108 74", "M 114 73 Q 112 71 110 74"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
  </SharedEnvironment>
);

// 3. Project — "Sapling Through Scaffold"
const ProjectVignette = () => (
  <SharedEnvironment>
    {/* Head tilted down */}
    <circle cx="108" cy="63" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Torso leaning forward to knees */}
    <path d="M 106 65 Q 98 70 96 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Arm with bent elbow (tinkering) */}
    <path d="M 101 68 L 105 74 L 110 73" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
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
    {/* Head tilted slightly */}
    <circle cx="100" cy="58" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Torso upright but relaxed */}
    <path d="M 100 60.5 Q 98 68 96 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Arm resting on back rail */}
    <path d="M 98 64 Q 105 60 115 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    {/* Crossed leg */}
    <path d="M 96 73 L 105 73 L 105 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
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
    {/* Head upright */}
    <circle cx="100" cy="58" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Vertical torso */}
    <path d="M 100 60.5 L 100 68 L 98 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Arm reaching out short */}
    <path d="M 100 65 L 94 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    
    {/* Circuit Branches inside canopy (x: 40-75, y: 15-45) */}
    {/* Short right-angle hops turning back inward, nodes not floating outside */}
    <path d="M 50 35 L 50 28 L 56 28 M 60 40 L 68 40 L 68 32 L 62 32" stroke="currentColor" strokeWidth="0.75" fill="none" strokeLinejoin="bevel" />
    <motion.circle cx="56" cy="28" r="1.5" fill="none" stroke="var(--vignette-accent)" strokeWidth="1" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <motion.circle cx="62" cy="32" r="1.5" fill="none" stroke="var(--vignette-accent)" strokeWidth="1" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
  </SharedEnvironment>
);

// 6. Contact — "Lantern at the Gate"
const ContactVignette = () => (
  <SharedEnvironment>
    {/* Head turned */}
    <circle cx="104" cy="58" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Torso angled */}
    <path d="M 104 60.5 Q 100 70 96 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Arm waving */}
    <motion.path d="M 102 65 L 110 56" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" animate={{ rotate: [0, 8, 0], transformOrigin: "102px 65px" }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
    
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
