"use client";

import { motion, useReducedMotion } from "framer-motion";

// Deterministic random for consistent dot placement across renders
const mulberry32 = (a: number) => {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Generate pointillist SVG paths (one string per layer) to simulate thousands of blossoms
// efficiently using strokeDasharray/strokeLinecap techniques.
const generateBlossomPaths = () => {
  const rand = mulberry32(112233);
  let pathDLarge = "";
  let pathDSmall = "";
  let pathDDark = "";
  let pathDHighlight = "";
  
  const clusters = [
    { x: 55, y: 35, r: 35, count: 250 }, 
    { x: 35, y: 35, r: 25, count: 150 }, 
    { x: 75, y: 35, r: 25, count: 150 }, 
    { x: 25, y: 45, r: 15, count: 80 },  
    { x: 85, y: 45, r: 15, count: 80 },  
    { x: 45, y: 15, r: 20, count: 100 },  
    { x: 65, y: 15, r: 20, count: 100 },  
  ];
  
  for (const cluster of clusters) {
    for (let c = 0; c < cluster.count; c++) {
      const angle = rand() * Math.PI * 2;
      const rDist = Math.sqrt(rand()) * cluster.r;
      const x = (cluster.x + Math.cos(angle) * rDist).toFixed(1);
      const y = (cluster.y + Math.sin(angle) * rDist).toFixed(1);
      
      const typeRoll = rand();
      
      if (typeRoll > 0.85) {
        pathDDark += `M ${x} ${y} l 0 0.1 `;
      } else if (typeRoll > 0.6) {
        pathDHighlight += `M ${x} ${y} l 0 0.1 `;
      } else if (typeRoll > 0.3) {
        pathDLarge += `M ${x} ${y} l 0 0.1 `;
      } else {
        pathDSmall += `M ${x} ${y} l 0 0.1 `;
      }
    }
  }
  return { pathDLarge, pathDSmall, pathDDark, pathDHighlight };
};
const BLOSSOMS = generateBlossomPaths();

/**
 * Animated two-line dialogue system for vignette arrivals with speech bubbles
 */
const Dialogue = ({ figureText, birdText }: { figureText: string, birdText: string }) => {
  const shouldReduceMotion = useReducedMotion();
  
  const figureVariants = {
    hidden: { opacity: 0, y: 1 },
    visible: { 
      opacity: [0, 1, 1, 0.4], 
      y: [1, 0, 0, 0],
      transition: { 
        delay: shouldReduceMotion ? 0 : 0.6, 
        duration: shouldReduceMotion ? 0 : 6, 
        times: [0, 0.05, 0.8, 1] 
      } 
    }
  };
  
  const birdVariants = {
    hidden: { opacity: 0, y: 1 },
    visible: { 
      opacity: [0, 1, 1, 0.4], 
      y: [1, 0, 0, 0],
      transition: { 
        delay: shouldReduceMotion ? 0 : 2, 
        duration: shouldReduceMotion ? 0 : 5, 
        times: [0, 0.05, 0.8, 1] 
      } 
    }
  };

  return (
    <>
      <motion.g initial="hidden" animate="visible" variants={figureVariants}>
        <foreignObject x="85" y="18" width="75" height="35" className="overflow-visible pointer-events-none">
          <div style={{ width: '300px', height: '140px', transform: 'scale(0.25)', transformOrigin: 'top left' }} className="flex justify-center items-end pb-2">
            <div className="relative rounded-md border px-3 py-2 max-w-[280px] shadow-sm transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', color: 'var(--footer-text)' }}>
              <p className="font-inter uppercase font-semibold tracking-widest text-center m-0 leading-tight" style={{ fontSize: '11px' }}>
                {figureText}
              </p>
              {/* Tail pointing down towards figure, shifted left since bubble is right-biased */}
              <div className="absolute border-b border-r w-2.5 h-2.5 transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', bottom: '-5px', left: '25%', transform: 'translateX(-50%) rotate(45deg)' }} />
            </div>
          </div>
        </foreignObject>
      </motion.g>

      <motion.g initial="hidden" animate="visible" variants={birdVariants}>
        <foreignObject x="105" y="-25" width="75" height="35" className="overflow-visible pointer-events-none">
          <div style={{ width: '300px', height: '140px', transform: 'scale(0.25)', transformOrigin: 'top left' }} className="flex justify-center items-end pb-2">
            <div className="relative rounded-md border px-3 py-2 max-w-[280px] shadow-sm transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', color: 'var(--footer-text)' }}>
              <p className="font-inter uppercase font-semibold tracking-widest text-center m-0 leading-tight" style={{ fontSize: '11px' }}>
                {birdText}
              </p>
              {/* Tail pointing down towards bird */}
              <div className="absolute border-b border-r w-2.5 h-2.5 transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }} />
            </div>
          </div>
        </foreignObject>
      </motion.g>
    </>
  );
};

const Bird = ({ children }: { children: React.ReactNode }) => (
  <svg x="135.5" y="11.9" width="14" height="14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

/**
 * Shared Footer Environment
 * The constant trio: Tree, Bench, Lamp.
 * Styled with single-stroke outlines, packed canopy, and shared blush/peach accents.
 */
const SharedEnvironment = ({ children }: { children: React.ReactNode }) => (
  <svg className="w-full h-auto transition-colors duration-500" style={{ overflow: 'visible', color: 'var(--footer-ink)' }} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--footer-accent)" style={{ stopOpacity: 'var(--footer-glow-opacity)' }} />
        <stop offset="100%" stopColor="var(--footer-accent)" style={{ stopOpacity: '0' }} />
      </radialGradient>
    </defs>

    {/* Distant Hill (Subtle) */}
    <path d="M 0 80 Q 50 75 100 80 T 200 80" stroke="currentColor" strokeWidth="0.3" fill="none" opacity="0.15" />

    {/* Ground */}
    <path d="M10 90 L190 90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 3" />
    <path d="M40 90 L160 90" stroke="currentColor" strokeWidth="1" />
    
    {/* Ground Texture (Grass, Pebbles) */}
    <g stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.6">
      {/* Grass Tufts */}
      <path d="M 30 90 L 28 86 M 30 90 L 32 87" />
      <path d="M 85 90 L 84 87 M 85 90 L 86 86 M 85 90 L 88 88" />
      <path d="M 125 90 L 124 86 M 125 90 L 127 87" />
      <path d="M 170 90 L 168 85 M 170 90 L 171 87" />
      
      {/* Pebbles */}
      <ellipse cx="40" cy="89" rx="1.5" ry="1" />
      <ellipse cx="105" cy="89.5" rx="2" ry="0.8" />
      <circle cx="160" cy="89" r="0.8" />
    </g>

    {/* Ground Petals */}
    <g fill="var(--footer-accent)" opacity="0.8">
      <circle cx="48" cy="89" r="1.5" />
      <circle cx="52" cy="89.5" r="1" />
      <circle cx="62" cy="88.5" r="1.2" />
      <circle cx="58" cy="89.8" r="0.8" />
      <circle cx="72" cy="89.2" r="1" />
    </g>
    
    {/* Street Lamp */}
    <path d="M150 90 L150 25 L135 25 L135 30" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M130 30 L140 30 L138 35 L132 35 Z" fill="currentColor" opacity="0.8" />
    <circle cx="135" cy="42" r="18" fill="url(#lampGlow)" />
    <circle cx="135" cy="38" r="3" fill="var(--footer-accent)" opacity="0.9" />
    <circle cx="132" cy="88" r="1" fill="var(--footer-accent)" opacity="0.6" />
    <circle cx="140" cy="87" r="1.5" fill="var(--footer-accent)" opacity="0.4" />

    {/* Soft Canopy Background Wash */}
    <g fill="var(--footer-leaf)">
      <circle cx="55" cy="35" r="32" opacity="0.15" />
      <circle cx="35" cy="35" r="22" opacity="0.15" />
      <circle cx="75" cy="35" r="22" opacity="0.15" />
      <circle cx="45" cy="18" r="18" opacity="0.1" />
      <circle cx="65" cy="18" r="18" opacity="0.1" />
    </g>

    {/* Pointillist Canopy Clusters (Behind branches) */}
    <g fill="none" strokeLinecap="round">
      <path d={BLOSSOMS.pathDLarge} stroke="var(--footer-leaf)" strokeWidth="2.5" opacity="0.5" />
      <path d={BLOSSOMS.pathDSmall} stroke="var(--footer-leaf)" strokeWidth="1.2" opacity="0.7" />
    </g>

    {/* Tree Trunk & Branches */}
    <g fill="currentColor">
      {/* Trunk base filled for natural taper */}
      <path d="M 50 90 C 50 75, 53 65, 55 60 C 57 65, 60 75, 60 90 Z" />
    </g>
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* Main trunk continuing up */}
      <path d="M 55 60 Q 55 50 45 40 M 55 60 Q 56 45 65 40 M 55 60 Q 55 45 53 30" strokeWidth="2.5" />
      {/* Secondary splits */}
      <path d="M 45 40 Q 35 35 25 35 M 45 40 Q 40 30 35 20 M 65 40 Q 75 35 85 35 M 65 40 Q 70 30 75 20 M 53 30 Q 48 25 45 15 M 53 30 Q 58 25 60 15" strokeWidth="1.5" />
      {/* Tertiary fine branches */}
      <path d="M 25 35 Q 20 30 15 35 M 25 35 Q 20 40 18 45 M 35 20 Q 30 15 25 10 M 35 20 Q 40 15 45 10 M 45 15 Q 40 10 35 5 M 45 15 Q 48 10 50 5 M 60 15 Q 55 10 52 5 M 60 15 Q 65 10 70 5 M 75 20 Q 70 15 65 10 M 75 20 Q 80 15 85 10 M 85 35 Q 90 30 95 35 M 85 35 Q 90 40 92 45 M 25 35 Q 30 40 35 45 M 85 35 Q 80 40 75 45 M 45 40 Q 48 45 50 50 M 65 40 Q 62 45 60 50" strokeWidth="0.5" />
    </g>

    {/* Pointillist Canopy Clusters (In front of branches) */}
    <g fill="none" strokeLinecap="round">
      <path d={BLOSSOMS.pathDHighlight} stroke="var(--footer-leaf)" strokeWidth="1.8" opacity="0.9" />
      <path d={BLOSSOMS.pathDDark} stroke="currentColor" strokeWidth="1" opacity="0.25" />
    </g>

    {/* Standard Falling Blossoms (5-6 dots drifting) */}
    <g>
      <motion.circle cx="42" cy="45" r="1.5" fill="var(--footer-accent)" animate={{ y: [0, 45], x: [0, -10] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }} />
      <motion.circle cx="75" cy="38" r="2" fill="var(--footer-accent)" animate={{ y: [0, 52], x: [0, 15] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
      <motion.circle cx="35" cy="50" r="1" fill="var(--footer-accent)" animate={{ y: [0, 40], x: [0, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.5 }} />
      <motion.circle cx="65" cy="48" r="1" fill="var(--footer-accent)" animate={{ y: [0, 42], x: [0, 8] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
      <motion.circle cx="55" cy="35" r="1.2" fill="var(--footer-accent)" animate={{ y: [0, 55], x: [0, -12] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
      <motion.circle cx="50" cy="25" r="1" fill="var(--footer-accent)" animate={{ y: [0, 60], x: [0, -8] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} />
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
    <circle cx="92" cy="74" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Figure lying down flat along seat */}
    <path d="M 94.5 75 L 115 75 C 118 75, 120 76, 120 78" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Arm resting on stomach (separate stroke) */}
    <path d="M 102 75 L 105 72 L 108 75" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    {/* Resting breath cue (optional micro-motion) */}
    <motion.path d="M 96 68 Q 98 66 100 68" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.7" animate={{ y: [0, -2, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    
    {/* Rabbit */}
    <svg x="72" y="70" width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="41" cy="12" rx="3.2" ry="13" transform="rotate(-16 41 12)"/>
      <ellipse cx="51" cy="13" rx="3.2" ry="13" transform="rotate(14 51 13)"/>
      <circle cx="15" cy="44" r="5.5"/>
      <ellipse cx="31" cy="43" rx="17" ry="13"/>
      <circle cx="47" cy="27" r="9"/>
      <circle cx="51" cy="25" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="43" cy="30" r="1.3" fill="var(--footer-accent)" stroke="none"/>
      <path d="M28,54 L27,60 M38,54 L39,60"/>
    </svg>

    <Bird>
      <path d="M16,38 C13,29 16,18 25,14 C33,10.5 43,13 47,21 C51,29 48,39 39,43.5 C30,48 20,47 16,38 Z"/>
      <path d="M17,32 C11,29 6,26 3,20"/>
      <path d="M46,20 L53,17.5 L46,24 Z" fill="currentColor" stroke="none"/>
      <circle cx="41" cy="20" r="1.6" fill="currentColor" stroke="none"/>
      <path d="M22,26 C28,24 34,26 38,32"/>
      <path d="M25,46 L23,54 M23,54 L19,55 M23,54 L27,55"/>
      <path d="M34,46 L36,54 M36,54 L32,55 M36,54 L40,55"/>
      <circle cx="27" cy="34" r="3.5" fill="var(--footer-accent)" stroke="none" opacity="0.85"/>
    </Bird>

    <Dialogue 
      figureText="Just resting a while."
      birdText="The meadow doesn't mind."
    />
  </SharedEnvironment>
);

// 2. Research — "Old Fig, Open Scroll"
const ResearchVignette = () => (
  <SharedEnvironment>
    {/* Head above torso */}
    <circle cx="102" cy="58" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Clean seated stick-figure base leaning forward */}
    <path d="M 101 60 L 96 76 L 104 76 L 104 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Arm reaching to lap (separate stroke) */}
    <path d="M 98.5 68 L 106 73" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    
    {/* Open Scroll motif on lap */}
    <path d="M 104 73 C 106 75, 110 75, 112 73 M 104 75 C 106 77, 110 77, 112 75" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <motion.path d="M 112 73 Q 110 71 108 74" stroke="currentColor" strokeWidth="0.5" fill="none" animate={{ d: ["M 112 73 Q 110 71 108 74", "M 112 73 Q 110 69 106 74", "M 112 73 Q 110 71 108 74"] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} />
    
    {/* Tortoise */}
    <svg x="72" y="70" width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9,46 A23,18 0 0 1 55,46 Z"/>
      <path d="M32,28 L32,46"/>
      <path d="M20,31 C24,36 24,42 20,46"/>
      <path d="M44,31 C40,36 40,42 44,46"/>
      <path d="M13,42 L51,42"/>
      <circle cx="4" cy="41" r="5.5"/>
      <circle cx="2.5" cy="40" r="1" fill="currentColor" stroke="none"/>
      <path d="M18,47 L16,54 M28,48 L27,55 M38,48 L40,55 M48,47 L51,53"/>
      <path d="M55,45 C58,46 59,47 60,49"/>
    </svg>

    <Bird>
      <path d="M17,16 L14,7 L21,14 Z"/>
      <path d="M39,14 L46,7 L43,16 Z"/>
      <path d="M14,34 C13,22 21,12 30,12 C39,12 47,22 46,34 C45,45 37,50 30,50 C23,50 15,45 14,34 Z"/>
      <circle cx="23" cy="28" r="5.5"/>
      <circle cx="37" cy="28" r="5.5"/>
      <circle cx="23" cy="28" r="1.4" fill="currentColor" stroke="none"/>
      <circle cx="37" cy="28" r="1.4" fill="currentColor" stroke="none"/>
      <path d="M28,35 L30,39 L32,35 Z" fill="currentColor" stroke="none"/>
      <path d="M16,38 C19,42 22,44 26,45"/>
      <path d="M44,38 C41,42 38,44 34,45"/>
      <path d="M25,50 L23,56 M23,56 L20,57 M23,56 L26,58"/>
      <path d="M35,50 L37,56 M37,56 L34,58 M37,56 L40,57"/>
    </Bird>

    <Dialogue 
      figureText="Still looking for the answer."
      birdText="Maybe it's a few pages further."
    />
  </SharedEnvironment>
);

// 3. Project — "Sapling Through Scaffold"
const ProjectVignette = () => (
  <SharedEnvironment>
    {/* Head tilted down */}
    <circle cx="104" cy="62" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Clean seated stick-figure base leaning to knees */}
    <path d="M 102 64 L 96 76 L 104 76 L 104 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Arm with bent elbow tinkering (separate stroke) */}
    <path d="M 99 70 L 104 76 L 110 74" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
    {/* Scaffold Motif */}
    <path d="M 75 90 L 80 75 L 85 90 Z M 77 82 L 83 82" stroke="currentColor" strokeWidth="0.5" fill="none" />
    {/* Sapling escaping top */}
    <motion.path d="M 80 90 Q 82 70 80 65" stroke="currentColor" strokeWidth="1" fill="none" animate={{ d: ["M 80 90 Q 82 70 80 65", "M 80 90 Q 78 70 80 65", "M 80 90 Q 82 70 80 65"] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
    <circle cx="79" cy="64" r="0.8" fill="var(--footer-accent)" />
    <circle cx="82" cy="67" r="0.5" fill="var(--footer-accent)" />

    {/* Squirrel */}
    <svg x="72" y="70" width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M36,48 C48,48 54,36 48,26 C45,20 37,19 35,25 C41,24 45,30 43,36 C41,42 37,44 32,43"/>
      <ellipse cx="24" cy="42" rx="11" ry="14"/>
      <circle cx="21" cy="23" r="8"/>
      <path d="M16,18 L14,11 L20,17 Z" fill="currentColor" stroke="none"/>
      <path d="M25,17 L28,10 L29,17 Z" fill="currentColor" stroke="none"/>
      <circle cx="18" cy="24" r="1.2" fill="currentColor" stroke="none"/>
      <ellipse cx="22" cy="37" rx="4.5" ry="3.5"/>
      <path d="M22,32 L22,34 M20,32 L24,32"/>
      <path d="M18,54 L17,60 M27,54 L29,60"/>
    </svg>

    <Bird>
      <path d="M28,10 C21,14 18,24 20,34 C22,44 27,50 33,52 C39,54 44,50 43,43 C42,36 37,34 36,28 C35,20 33,13 28,10 Z"/>
      <path d="M27,11 L25,4"/>
      <path d="M30,10 L30,3"/>
      <path d="M33,11 L36,5"/>
      <path d="M20,20 L9,17"/>
      <circle cx="24" cy="19" r="1.6" fill="currentColor" stroke="none"/>
      <path d="M26,26 C31,28 34,33 33,40"/>
      <path d="M39,46 C42,50 42,55 38,59"/>
      <path d="M30,51 L27,57 M27,57 L23,58 M27,57 L30,59"/>
      <path d="M37,50 L40,56 M40,56 L37,58 M40,56 L43,57"/>
      <path d="M27,16 C29,24 30,32 31,40" opacity="0.5"/>
    </Bird>

    <Dialogue 
      figureText="Building something new."
      birdText="One tap at a time."
    />
  </SharedEnvironment>
);

// 4. Blog — "Writing under the tree"
const BlogVignette = () => (
  <SharedEnvironment>
    {/* Head tilted slightly down */}
    <circle cx="100" cy="58" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Torso upright but relaxed */}
    <path d="M 100 60.5 Q 98 68 96 76 L 104 76 L 104 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Arm reaching to lap */}
    <path d="M 99 64 L 101 73" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    
    {/* Open Journal on lap */}
    <path d="M 98 75 L 104 75 L 106 73 L 100 73 Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
    <path d="M 102 73 L 102 75" stroke="currentColor" strokeWidth="0.25" />
    
    {/* Fallen petals under bench */}
    <circle cx="100" cy="88" r="0.8" fill="var(--footer-accent)" />
    <circle cx="105" cy="89" r="0.5" fill="var(--footer-accent)" />
    <circle cx="112" cy="88.5" r="1" fill="var(--footer-accent)" />
    <circle cx="95" cy="89.5" r="0.5" fill="var(--footer-accent)" />
    
    {/* Ink bottle on ground */}
    <path d="M 118 90 L 118 86 C 118 84, 122 84, 122 86 L 122 90 Z M 119 84 L 121 84" stroke="currentColor" strokeWidth="0.5" fill="none" />

    {/* Cat */}
    <svg x="72" y="70" width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14,44 C6,42 3,34 8,28"/>
      <ellipse cx="26" cy="42" rx="15" ry="13"/>
      <circle cx="43" cy="26" r="9"/>
      <path d="M38,20 L36,11 L43,18 Z" fill="currentColor" stroke="none"/>
      <path d="M46,18 L50,10 L50,19 Z" fill="currentColor" stroke="none"/>
      <circle cx="47" cy="25" r="1.3" fill="currentColor" stroke="none"/>
      <path d="M50,28 L56,27 M50,29.5 L56,30"/>
      <path d="M28,54 L27,60 M37,54 L38,60"/>
    </svg>

    <Bird>
      <path d="M20,36 C19,28 24,20 33,18 C40,16.5 46,20 48,26 C49.5,30 48,34 44,36 C38,39 28,40 22,39 C21,38.5 20.5,37 20,36 Z"/>
      <path d="M34,18 L33,11"/>
      <path d="M47,25 L54,23 L47,29 Z" fill="currentColor" stroke="none"/>
      <circle cx="42" cy="24" r="1.4" fill="currentColor" stroke="none"/>
      <path d="M21,35 C14,32 8,29 4,24"/>
      <path d="M21,37 C13,36 6,34 2,31"/>
      <path d="M22,39 C15,40 8,40 3,38"/>
      <path d="M29,26 C34,25 39,27 42,31"/>
      <path d="M32,39 L31,46 M31,46 L28,47 M31,46 L34,48"/>
      <path d="M39,39 L40,46 M40,46 L37,48 M40,46 L43,47"/>
    </Bird>

    <Dialogue 
      figureText="Trying to find the words."
      birdText="Sing it instead."
    />
  </SharedEnvironment>
);

// 5. AI Lab — "Firefly in Hand"
const AILabVignette = () => (
  <SharedEnvironment>
    {/* Head upright */}
    <circle cx="98" cy="56" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Clean seated stick-figure base */}
    <path d="M 98 58.5 L 96 76 L 104 76 L 104 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Arm reaching out, upturned hand */}
    <path d="M 97 65 L 110 60 L 112 59" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
    {/* Firefly Motif */}
    <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
      <circle cx="112" cy="55" r="1" fill="var(--footer-accent)" />
      <path d="M 112 55 Q 114 52 116 53 M 112 55 Q 114 57 115 56" stroke="currentColor" strokeWidth="0.5" fill="none" />
      {/* Soft Glow */}
      <circle cx="112" cy="55" r="6" fill="url(#lampGlow)" opacity="0.8" />
    </motion.g>

    {/* Fox */}
    <svg x="122" y="70" width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14,46 C4,44 0,34 6,26 C9,22 15,22 17,27"/>
      <circle cx="6" cy="27" r="3" fill="var(--bg-page)" stroke="currentColor" strokeWidth="1.6"/>
      <ellipse cx="27" cy="42" rx="14" ry="13"/>
      <circle cx="43" cy="24" r="8.5"/>
      <path d="M38,17 L35,7 L43,15 Z" fill="currentColor" stroke="none"/>
      <path d="M47,15 L52,6 L50,16 Z" fill="currentColor" stroke="none"/>
      <path d="M35,27 C29,27 24,26 20,24"/>
      <circle cx="20.5" cy="24.2" r="1.2" fill="currentColor" stroke="none"/>
      <circle cx="46" cy="22" r="1.2" fill="currentColor" stroke="none"/>
      <path d="M20,53 L18,60 M34,53 L36,60"/>
    </svg>

    <Bird>
      <path d="M17,38 C15,28 22,17 33,15 C43,13.5 51,19 53,27 C54.5,33 51,37 45,38.5 C37,40.5 23,41 18,39.5 Z"/>
      <path d="M26,17 C29,21 30,26 28,31"/>
      <path d="M52,24 L61,20.5 L56,26 L61,27.5 L52,29 Z" fill="currentColor" stroke="none"/>
      <circle cx="46" cy="23" r="1.6" fill="currentColor" stroke="none"/>
      <path d="M24,32 C31,29 39,30 44,35 C38,35.5 31,36.5 25,39"/>
      <path d="M18,37 C11,38 5,39 1,40"/>
      <path d="M31,40 L29,48 M29,48 L25,49 M29,48 L33,50"/>
      <path d="M40,40 L42,48 M42,48 L38,50 M42,48 L46,49"/>
    </Bird>

    <Dialogue 
      figureText="Do you think it's thinking?"
      birdText="Are you?"
    />
  </SharedEnvironment>
);

// 6. Contact — "Garden gate, evening light"
const ContactVignette = () => (
  <SharedEnvironment>
    {/* Head turned */}
    <circle cx="98" cy="56" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    {/* Clean seated stick-figure base angled toward gate */}
    <path d="M 98 58.5 L 96 76 L 104 76 L 104 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Arm waving (separate stroke) with robust path animation to avoid rogue stick bug */}
    <motion.path d="M 97 65 L 105 52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" animate={{ d: ["M 97 65 L 105 52", "M 97 65 L 108 55", "M 97 65 L 105 52"] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
    
    {/* Organic Branch Gate */}
    <path d="M 155 90 Q 153 75 158 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M 175 90 Q 173 75 178 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M 158 60 Q 163 55 168 62 T 178 60" stroke="currentColor" strokeWidth="0.75" fill="none" />
    <path d="M 158 60 Q 163 65 168 58 T 178 60" stroke="currentColor" strokeWidth="0.5" fill="none" />
    
    {/* Pink Flowers on Posts */}
    <circle cx="154.5" cy="80" r="1" fill="var(--footer-accent)" />
    <circle cx="156" cy="70" r="0.8" fill="var(--footer-accent)" />
    <circle cx="174.5" cy="78" r="1.2" fill="var(--footer-accent)" />
    
    {/* Dashed Path */}
    <path d="M 165 90 L 180 100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" fill="none" />
    
    {/* Ground Flowers near path */}
    <circle cx="162" cy="94" r="0.8" fill="var(--footer-accent)" />
    <circle cx="178" cy="95" r="1" fill="var(--footer-accent)" />
    
    {/* Gate Fireflies */}
    <motion.circle cx="165" cy="55" r="1" fill="var(--footer-accent)" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
    <circle cx="165" cy="55" r="4" fill="url(#lampGlow)" opacity="0.6" />
    
    <motion.circle cx="172" cy="70" r="0.8" fill="var(--footer-accent)" animate={{ opacity: [1, 0.1, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
    <circle cx="172" cy="70" r="3" fill="url(#lampGlow)" opacity="0.5" />

    {/* Dog */}
    <svg x="122" y="70" width="20" height="20" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13,42 C7,38 5,29 10,22"/>
      <ellipse cx="27" cy="42" rx="14" ry="13"/>
      <circle cx="43" cy="25" r="9"/>
      <path d="M38,20 C33,20 31,26 34,32 C37,31 39,27 38,20 Z"/>
      <path d="M35,28 C29,28 24,27 20,25"/>
      <circle cx="20.5" cy="25.2" r="1.3" fill="currentColor" stroke="none"/>
      <circle cx="47" cy="22" r="1.3" fill="currentColor" stroke="none"/>
      <path d="M32,32 C33,35 33,37 32,39" stroke="var(--footer-accent)"/>
      <path d="M20,53 L18,60 M34,53 L36,60"/>
    </svg>

    <Bird>
      <path d="M16,36 C14,26 20,16 29,14 C37,12.5 45,17 47,25 C48.5,32 44,40 35,43 C27,45.5 18,44 16,36 Z"/>
      <path d="M40,17 C43,15 46,15.5 47,18.5"/>
      <path d="M20,28 C26,25 33,26 38,32 C33,33 27,34 22,33"/>
      <path d="M46,20 L51,19 L46,23 Z" fill="currentColor" stroke="none"/>
      <circle cx="41" cy="20" r="1.4" fill="currentColor" stroke="none"/>
      <path d="M17,34 C11,32 6,31 1,32"/>
      <path d="M17,37 C11,37 6,38 1,40"/>
      <path d="M18,40 C13,42 8,44 4,47"/>
      <path d="M28,43 L27,50 M27,50 L23,51 M27,50 L30,52"/>
      <path d="M35,42 L37,49 M37,49 L34,51 M37,49 L40,50"/>
    </Bird>

    <Dialogue 
      figureText="Come say hello."
      birdText="I'll carry the word."
    />
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
