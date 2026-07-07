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
const Dialogue = ({ figureText, birdText, birdX = 105, birdY = -25, birdTailLeft = "50%" }: { figureText: string, birdText: string, birdX?: number, birdY?: number, birdTailLeft?: string }) => {
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
        <foreignObject x={birdX} y={birdY} width="75" height="35" className="overflow-visible pointer-events-none">
          <div style={{ width: '300px', height: '140px', transform: 'scale(0.25)', transformOrigin: 'top left' }} className="flex justify-center items-end pb-2">
            <div className="relative rounded-md border px-3 py-2 max-w-[280px] shadow-sm transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', color: 'var(--footer-text)' }}>
              <p className="font-inter uppercase font-semibold tracking-widest text-center m-0 leading-tight" style={{ fontSize: '11px' }}>
                {birdText}
              </p>
              {/* Tail pointing down towards bird */}
              <div className="absolute border-b border-r w-2.5 h-2.5 transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', bottom: '-5px', left: birdTailLeft, transform: 'translateX(-50%) rotate(45deg)' }} />
            </div>
          </div>
        </foreignObject>
      </motion.g>
    </>
  );
};

const Dove = () => (
  <svg x="135.5" y="8" width="16" height="16" viewBox="0 0 100 100" fill="none" className="motion-safe-ambient" style={{ animation: 'floatZzz 4s infinite ease-in-out' }}>
    <path d="M 20 50 C 40 40 60 50 80 50 C 90 50 95 60 85 65 C 65 75 40 70 20 50 Z" fill="#777777" />
    <path d="M 50 45 C 40 20 60 10 80 5 C 75 25 65 40 50 45 Z" fill="#555555" />
    <path d="M 45 60 C 35 75 55 95 75 90 C 70 70 60 65 45 60 Z" fill="#444444" />
    <circle cx="80" cy="55" r="10" fill="#777777" />
    <path d="M 88 52 L 100 55 L 88 58 Z" fill="#FF8C00" />
    <circle cx="82" cy="53" r="1.5" fill="#111111" />
    <path d="M 25 55 L 5 45 C 5 60 10 65 25 60 Z" fill="#555555" />
  </svg>
);

const Nightingale = () => (
  <svg x="135.5" y="11.9" width="14" height="14" viewBox="0 0 100 100" fill="none">
    <path d="M 30 65 L 5 85 C 5 90 10 95 15 95 L 40 75 Z" fill="#8B5A2B" />
    <path d="M 30 70 C 15 40 45 20 65 20 C 80 20 85 35 80 55 C 75 75 50 85 30 70 Z" fill="#D2B48C" />
    <path d="M 45 35 C 25 55 20 75 30 85 C 45 80 65 60 70 45 C 65 35 55 35 45 35 Z" fill="#A0522D" />
    <path d="M 45 25 C 55 15 75 18 80 28 C 82 32 75 35 70 35 C 60 35 50 30 45 25 Z" fill="#8B5A2B" />
    <path d="M 80 28 L 98 32 L 82 36 Z" fill="#333" />
    <circle cx="68" cy="28" r="2.5" fill="#333" />
    <text x="85" y="15" fontSize="30" fill="var(--footer-ink)" opacity="0.6" style={{ animation: 'floatZzz 2s infinite' }}>♪</text>
  </svg>
);

const Owl = () => (
  <svg x="135.5" y="8" width="16" height="16" viewBox="0 0 100 100" fill="none">
    <path d="M 20 50 C 20 15 80 15 80 50 C 80 90 20 90 20 50 Z" fill="#8B4513" />
    <path d="M 35 55 C 35 40 65 40 65 55 C 65 80 35 80 35 55 Z" fill="#F5DEB3" />
    <path d="M 20 50 C 10 60 10 80 25 85 C 20 70 25 60 35 55 C 30 50 20 50 20 50 Z" fill="#5C3A21" />
    <path d="M 80 50 C 90 60 90 80 75 85 C 80 70 75 60 65 55 C 70 50 80 50 80 50 Z" fill="#5C3A21" />
    <circle cx="35" cy="40" r="12" fill="#EEE" />
    <circle cx="65" cy="40" r="12" fill="#EEE" />
    <g style={{ transformOrigin: '35px 40px', animation: 'animalBlink 4s infinite' }}><circle cx="35" cy="40" r="4" fill="#222" /></g>
    <g style={{ transformOrigin: '65px 40px', animation: 'animalBlink 4s infinite' }}><circle cx="65" cy="40" r="4" fill="#222" /></g>
    <path d="M 45 45 L 55 45 L 50 55 Z" fill="#FFA500" />
    <path d="M 25 25 L 35 15 L 45 20 Z" fill="#8B4513" />
    <path d="M 75 25 L 65 15 L 55 20 Z" fill="#8B4513" />
  </svg>
);

const Raven = () => (
  <svg x="135.5" y="10" width="15" height="15" viewBox="0 0 100 100" fill="none">
    <g style={{ animation: 'animalTiltHead 5s infinite ease-in-out', transformOrigin: '70% 30%' }}>
      <circle cx="70" cy="30" r="15" fill="#2F2F2F" />
      <path d="M 80 25 L 100 28 L 85 35 Z" fill="#1A1A1A" />
      <circle cx="75" cy="27" r="2.5" fill="#111" stroke="#555" strokeWidth="0.5" />
    </g>
    <path d="M 30 70 C 15 40 50 20 70 30 C 80 35 85 55 70 70 C 50 85 35 85 30 70 Z" fill="#222" />
    <path d="M 45 35 C 25 55 20 75 30 85 C 45 80 65 60 70 45 C 65 35 55 35 45 35 Z" fill="#1A1A1A" />
    <path d="M 35 65 L 10 90 C 5 95 15 100 25 90 L 45 75 Z" fill="#111" />
  </svg>
);

const Robin = () => (
  <svg x="135.5" y="11.9" width="14" height="14" viewBox="0 0 100 100" fill="none">
    <g style={{ animation: 'animalBreathe 2s infinite ease-in-out', transformOrigin: 'center' }}>
      <path d="M 30 65 L 5 85 C 5 90 10 95 15 95 L 40 75 Z" fill="#555" />
      <path d="M 30 70 C 15 40 45 20 65 20 C 80 20 85 35 80 55 C 75 75 50 85 30 70 Z" fill="#888" />
      <path d="M 50 35 C 70 20 85 35 80 55 C 75 70 60 80 40 70 C 55 65 65 55 50 35 Z" fill="#FF4500" />
      <path d="M 45 40 C 25 60 20 80 30 90 C 45 85 65 65 70 50 C 65 40 55 40 45 40 Z" fill="#666" />
      <path d="M 45 25 C 55 15 75 18 80 28 C 82 32 75 35 70 35 C 60 35 50 30 45 25 Z" fill="#777" />
      <path d="M 80 28 L 95 30 L 82 34 Z" fill="#333" />
      <circle cx="68" cy="26" r="2" fill="#222" stroke="#EEE" strokeWidth="0.5" />
    </g>
  </svg>
);

const Woodpecker = () => (
  <svg x="39" y="65" width="12" height="12" viewBox="0 0 100 100" fill="none">
    <g style={{ animation: 'animalPeck 0.5s infinite', transformOrigin: '50% 80%' }}>
      <path d="M 30 70 L 10 95 C 15 100 25 100 35 90 L 45 75 Z" fill="#111" />
      <path d="M 35 75 C 20 50 45 20 65 30 C 80 40 85 55 70 70 C 60 80 45 85 35 75 Z" fill="#FFF" />
      <path d="M 35 70 C 25 45 40 25 55 35 C 65 40 60 65 50 75 Z" fill="#111" />
      <path d="M 50 25 C 60 10 80 5 85 20 C 90 30 75 35 65 35 Z" fill="#D22B2B" />
      <path d="M 75 30 L 100 32 L 80 38 Z" fill="#555" />
      <circle cx="68" cy="30" r="2" fill="#222" />
      <path d="M 50 45 C 60 55 55 70 45 75" stroke="#111" strokeWidth="2" strokeDasharray="2 4" />
    </g>
  </svg>
);

const Rabbit = () => (
  <svg x="120" y="70" width="22" height="22" viewBox="0 0 100 100" fill="none">
    <path d="M 50 60 C 80 60 90 90 75 95 C 60 100 45 90 50 70 Z" fill="#A0522D" />
    <path d="M 35 50 C 65 40 85 60 70 85 C 55 110 20 90 25 65 Z" fill="#C17A54" />
    <path d="M 35 50 C 45 60 45 80 30 85 C 25 70 30 55 35 50 Z" fill="#FFF" />
    <circle cx="80" cy="85" r="6" fill="#FFF" />
    <path d="M 40 80 L 40 95 C 45 95 50 95 50 90 L 50 80 Z" fill="#FFF" />
    <path d="M 15 50 C 15 35 45 35 45 50 C 45 65 20 70 15 50 Z" fill="#C17A54" />
    <path d="M 15 50 C 25 55 35 60 30 65 C 20 60 15 55 15 50 Z" fill="#FFF" />
    <g style={{ animation: 'animalTiltHead 3s infinite alternate', transformOrigin: '35% 40%' }}>
       <path d="M 35 40 C 45 15 65 10 50 35 Z" fill="#C17A54" />
       <path d="M 38 40 C 45 25 55 20 48 38 Z" fill="#FADADD" />
       <path d="M 30 42 C 30 15 45 10 35 38 Z" fill="#C17A54" />
    </g>
    <circle cx="28" cy="45" r="2.5" fill="#111" />
    <circle cx="15" cy="55" r="1.5" fill="#FFA07A" style={{ animation: 'animalPeck 1s infinite' }} />
  </svg>
);

const Tortoise = () => (
  <svg x="115" y="68" width="22" height="22" viewBox="0 0 100 100" fill="none">
    <path d="M 25 75 L 20 95 C 25 95 30 95 30 90 L 35 75 Z" fill="#556B2F" />
    <path d="M 75 75 L 70 95 C 75 95 80 95 85 90 L 80 75 Z" fill="#556B2F" />
    <path d="M 15 75 C 15 30 85 30 90 75 C 50 85 25 80 15 75 Z" fill="#6B8E23" />
    <path d="M 30 75 C 30 50 50 40 70 75 Z" fill="#8FBC8F" stroke="#2F4F4F" strokeWidth="2" />
    <path d="M 40 75 L 50 50 L 60 75 Z" fill="#556B2F" />
    <g style={{ animation: 'animalSwish 6s infinite alternate', transformOrigin: '90% 80%' }}>
      <path d="M 85 70 C 100 70 105 80 100 90 C 95 95 85 90 85 85 Z" fill="#556B2F" />
      <circle cx="95" cy="78" r="1.5" fill="#111" />
    </g>
  </svg>
);

const Squirrel = () => (
  <svg x="122" y="70" width="20" height="20" viewBox="0 0 100 100" fill="none">
    <g style={{ animation: 'animalBreathe 2s infinite', transformOrigin: '80% 80%' }}>
      <path d="M 65 85 C 105 85 105 20 65 25 C 85 45 85 75 65 85 Z" fill="#A0522D" />
      <path d="M 65 25 C 45 30 55 50 75 55 C 85 35 75 25 65 25 Z" fill="#CD853F" />
    </g>
    <path d="M 45 60 C 70 60 75 85 65 95 C 55 100 40 90 45 75 Z" fill="#D2691E" />
    <path d="M 35 45 C 60 40 70 65 55 85 C 40 105 20 85 25 60 Z" fill="#D2691E" />
    <path d="M 35 45 C 45 60 45 75 30 80 C 25 65 30 50 35 45 Z" fill="#FFF" />
    <path d="M 40 60 L 25 65 L 30 60 Z" fill="#D2691E" />
    <circle cx="22" cy="65" r="3" fill="#654321" />
    <path d="M 25 35 C 25 20 50 20 50 35 C 50 50 30 55 25 35 Z" fill="#D2691E" />
    <path d="M 35 25 L 40 10 L 45 25 Z" fill="#D2691E" />
    <path d="M 45 25 L 50 15 L 55 25 Z" fill="#D2691E" />
    <circle cx="35" cy="30" r="2" fill="#111" />
  </svg>
);

const Peacock = () => {
  const tailFeathers = [];
  const spots = [];
  const originX = 55;
  const originY = 80;
  
  for (let i = 0; i < 80; i++) {
    const angle = (i / 79) * 180 - 90; 
    const isSpot = i % 4 === 0;
    const length = isSpot ? 65 : 50 + Math.random() * 15;
    
    const rad = (angle * Math.PI) / 180;
    const x2 = originX + Math.sin(rad) * length;
    const y2 = originY - Math.cos(rad) * length;
    
    tailFeathers.push(
      <line key={`feather-${i}`} x1={originX} y1={originY} x2={x2} y2={y2} stroke="#00A811" strokeWidth="1" strokeLinecap="round" />
    );
    
    if (isSpot) {
      const spotX = originX + Math.sin(rad) * (length * 0.85);
      const spotY = originY - Math.cos(rad) * (length * 0.85);
      spots.push(
        <g key={`spot-${i}`}>
          <circle cx={spotX} cy={spotY} r="4" fill="#00A811" />
          <circle cx={spotX} cy={spotY} r="3" fill="#B7D900" />
          <circle cx={spotX} cy={spotY} r="1.5" fill="#00E5FF" />
          <circle cx={spotX} cy={spotY} r="0.5" fill="#00A811" />
        </g>
      );
    }
  }

  const crest = [];
  for (let i=0; i<5; i++) {
    const angle = -15 + i * 15;
    const rad = (angle * Math.PI) / 180;
    const x2 = 35 + Math.sin(rad) * 6;
    const y2 = 15 - Math.cos(rad) * 6;
    crest.push(
      <g key={`crest-${i}`}>
        <line x1="35" y1="15" x2={x2} y2={y2} stroke="#111" strokeWidth="0.5" />
        <circle cx={x2} cy={y2} r="1" fill="#014D98" />
      </g>
    );
  }

  return (
    <svg x="145" y="55" width="35" height="35" viewBox="0 0 100 100" fill="none" style={{ overflow: 'visible' }}>
      <g style={{ animation: 'animalBreathe 4s infinite ease-in-out', transformOrigin: 'center' }}>
        <g>
          {tailFeathers}
          {spots}
        </g>
        <path d="M 45 45 C 30 50 25 65 35 80 C 45 95 65 95 70 80 C 75 65 65 50 45 45 Z" fill="#014D98" stroke="#00356B" strokeWidth="1" />
        <path d="M 50 45 C 50 30 40 20 35 15 C 30 10 25 15 25 20 C 25 30 35 35 40 50 Z" fill="#014D98" stroke="#00356B" strokeWidth="1" />
        <path d="M 25 18 L 15 20 L 25 24 Z" fill="#555" />
        <path d="M 28 17 C 30 16 32 16 33 18 C 32 19 30 19 28 17 Z" fill="#FFF" />
        <circle cx="30" cy="17.5" r="0.8" fill="#111" />
        {crest}
        <path d="M 45 55 C 40 65 45 75 60 80 C 65 80 65 70 55 60 C 50 55 45 55 45 55 Z" fill="#00356B" />
        <path d="M 48 60 C 45 68 50 75 60 77" stroke="#014D98" strokeWidth="1" fill="none" />
        <path d="M 52 62 C 50 68 53 72 60 74" stroke="#014D98" strokeWidth="1" fill="none" />
        <path d="M 45 85 L 40 95 L 35 98 M 40 95 L 45 98 M 40 95 L 40 100" stroke="#C2A086" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 55 85 L 50 95 L 45 98 M 50 95 L 55 98 M 50 95 L 50 100" stroke="#C2A086" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
};

const Pond = () => (
  <g transform="translate(180, 85)">
    {/* Water */}
    <ellipse cx="20" cy="5" rx="30" ry="10" fill="#48cae4" opacity="0.6" />
    <ellipse cx="18" cy="6" rx="25" ry="7" fill="#00b4d8" opacity="0.7" />
    <ellipse cx="22" cy="4" rx="20" ry="4" fill="#90e0ef" opacity="0.5" />
    
    {/* Rocks */}
    <path d="M -5 5 C -2 2, 2 2, 5 6 C 2 8, -2 8, -5 5 Z" fill="#6c757d" />
    <path d="M 45 4 C 50 1, 55 2, 53 7 C 50 9, 45 8, 45 4 Z" fill="#adb5bd" />
    <path d="M 50 8 C 53 6, 57 7, 55 10 C 53 11, 49 11, 50 8 Z" fill="#6c757d" />
    
    {/* Grass */}
    <path d="M 0 0 L -2 -6 M 2 2 L 1 -5 M -3 2 L -5 -4" stroke="#2d6a4f" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M 47 0 L 45 -5 M 49 1 L 50 -4 M 51 2 L 53 -3" stroke="#2d6a4f" strokeWidth="1" fill="none" strokeLinecap="round" />

    {/* Flowers */}
    <circle cx="-2" cy="-6" r="1" fill="#ffb703" />
    <circle cx="1" cy="-5" r="1" fill="#ffb703" />
    <circle cx="50" cy="-4" r="1" fill="#fb8500" />
    <circle cx="53" cy="-3" r="1" fill="#fb8500" />
  </g>
);

const Deer = ({ x = "120", y = "58", flip = false }: { x?: string | number, y?: string | number, flip?: boolean }) => (
  <svg x={x} y={y} width="26" height="26" viewBox="0 0 100 100" fill="none">
    <g transform={flip ? "translate(100, 0) scale(-1, 1)" : undefined}>
      <g style={{ animation: 'animalBreathe 4s infinite ease-in-out', transformOrigin: 'center' }}>
      <path d="M 68 65 L 70 95 L 75 95 L 75 65 Z" fill="#C2A086" />
      <path d="M 43 65 L 40 95 L 45 95 L 48 65 Z" fill="#C2A086" />
      <path d="M 68 93 L 76 93 L 75 95 L 70 95 Z" fill="#5D4B40" />
      <path d="M 38 93 L 46 93 L 45 95 L 40 95 Z" fill="#5D4B40" />
      <path d="M 25 40 C 40 40 60 40 75 45 C 85 50 85 65 75 65 C 60 65 40 65 30 60 Z" fill="#D5B59C" />
      <path d="M 20 35 C 25 45 35 60 50 63 C 65 65 75 65 75 65 C 65 62 45 58 35 45 C 28 35 25 30 20 35 Z" fill="#F4F1ED" />
      <path d="M 72 65 L 75 95 L 80 95 L 80 65 Z" fill="#D5B59C" />
      <path d="M 45 65 L 42 95 L 47 95 L 50 65 Z" fill="#D5B59C" />
      <path d="M 73 93 L 81 93 L 80 95 L 75 95 Z" fill="#5D4B40" />
      <path d="M 40 93 L 48 93 L 47 95 L 42 95 Z" fill="#5D4B40" />
      <path d="M 80 48 C 85 45 85 55 80 55 Z" fill="#D5B59C" />
      <path d="M 82 49 C 86 47 86 53 82 53 Z" fill="#F4F1ED" />
      <path d="M 25 40 C 20 30 20 20 25 15 C 35 10 40 15 40 25 C 40 35 35 45 25 40 Z" fill="#D5B59C" />
      <path d="M 25 15 C 10 15 5 25 5 30 C 15 32 25 30 30 25 Z" fill="#D5B59C" />
      <path d="M 5 30 C 10 32 20 32 25 30 C 20 35 10 35 5 30 Z" fill="#F4F1ED" />
      <circle cx="6" cy="28" r="1.5" fill="#111" />
      <circle cx="20" cy="20" r="2" fill="#111" />
      <circle cx="19.5" cy="19.5" r="0.5" fill="#FFF" />
      <path d="M 35 12 C 45 5 45 10 38 15 Z" fill="#D5B59C" />
      <path d="M 32 10 L 25 -5 L 15 -10 M 20 -7 L 25 -15 M 28 -1 L 35 -10" stroke="#7A5C47" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M 36 12 L 35 0 L 28 -8 M 32 -3 L 40 -12 M 35 5 L 45 -2" stroke="#5D4B40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="50" cy="45" r="1.5" fill="#FFF" />
      <circle cx="58" cy="45" r="1.5" fill="#FFF" />
      <circle cx="66" cy="44" r="1.5" fill="#FFF" />
      <circle cx="54" cy="50" r="1" fill="#FFF" />
      <circle cx="62" cy="50" r="1" fill="#FFF" />
      </g>
    </g>
  </svg>
);

const Cat = () => (
  <svg x="115" y="70" width="22" height="22" viewBox="0 0 100 100" fill="none">
    <path d="M 70 65 L 75 95 C 80 95 85 95 85 90 L 80 60 Z" fill="#8B4513" />
    <path d="M 25 70 L 25 95 C 30 95 35 95 35 90 L 35 60 Z" fill="#8B4513" />
    <path d="M 20 60 C 20 35 75 35 85 55 C 90 65 95 65 95 50 C 95 30 100 20 100 25 C 95 40 105 50 95 70 C 85 90 70 85 65 75 C 60 85 35 85 25 75 C 20 85 20 70 20 60 Z" fill="#FF8C00" />
    <path d="M 40 45 C 50 40 70 45 80 55 C 75 65 55 60 40 45 Z" fill="#4A3B32" />
    <path d="M 30 65 L 30 95 C 25 95 20 95 25 90 L 25 65 Z" fill="#FF8C00" />
    <path d="M 65 65 L 60 95 C 55 95 50 95 55 90 L 60 65 Z" fill="#FF8C00" />
    <g style={{ animation: 'animalSwish 3s infinite alternate', transformOrigin: '90% 50%' }}>
       <path d="M 90 55 C 110 30 80 10 75 25 C 80 15 100 35 85 55 Z" fill="#FF8C00" />
    </g>
    <path d="M 15 25 C 5 25 5 45 15 55 C 30 60 45 50 40 35 C 35 20 25 20 15 25 Z" fill="#FF8C00" />
    <path d="M 15 25 L 10 10 L 25 20 Z" fill="#FF8C00" />
    <path d="M 30 22 L 40 5 L 40 25 Z" fill="#FF8C00" />
    <circle cx="20" cy="35" r="3" fill="#333" />
    <circle cx="35" cy="32" r="3" fill="#333" />
    <path d="M 28 40 L 32 40 L 30 45 Z" fill="#4A3B32" />
    <path d="M 28 48 C 30 52 32 52 30 48 Z" fill="#333" />
  </svg>
);

const Fox = () => (
  <svg x="120" y="70" width="20" height="20" viewBox="0 0 100 100" fill="none">
    <g style={{ animation: 'animalBreathe 4s infinite', transformOrigin: '80% 80%' }}>
      <path d="M 70 70 C 90 50 100 80 85 95 C 70 110 50 85 70 70 Z" fill="#D9532A" />
      <path d="M 85 95 C 95 85 100 80 85 95 Z" fill="#FFF" />
    </g>
    <path d="M 45 45 C 70 60 80 85 65 95 C 50 105 25 90 35 65 Z" fill="#D9532A" />
    <path d="M 45 45 C 55 60 45 80 35 75 C 30 65 40 50 45 45 Z" fill="#FFF" />
    <path d="M 45 80 L 45 100 C 50 100 55 100 55 95 L 55 80 Z" fill="#222" />
    <path d="M 35 75 L 30 95 C 35 95 40 95 40 90 L 40 75 Z" fill="#222" />
    <path d="M 20 40 C 20 20 60 20 60 40 C 60 55 40 65 20 40 Z" fill="#D9532A" />
    <path d="M 20 40 C 30 45 40 60 40 65 C 30 60 20 50 20 40 Z" fill="#FFF" />
    <path d="M 60 40 C 50 45 40 60 40 65 C 50 60 60 50 60 40 Z" fill="#FFF" />
    <path d="M 25 25 L 15 10 L 35 20 Z" fill="#D9532A" />
    <path d="M 55 25 L 65 10 L 45 20 Z" fill="#D9532A" />
    <circle cx="40" cy="62" r="3" fill="#222" />
    <circle cx="30" cy="45" r="2.5" fill="#222" />
    <circle cx="50" cy="45" r="2.5" fill="#222" />
  </svg>
);

/**
 * Shared Footer Environment
 * The constant trio: Tree, Bench, Lamp.
 * Styled with single-stroke outlines, packed canopy, and shared blush/peach accents.
 */
const SharedEnvironment = ({ children }: { children: React.ReactNode }) => (
  <svg className="w-full h-auto transition-colors duration-500" style={{ overflow: 'visible', color: 'var(--footer-ink)' }} viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <style>
      {`
        @keyframes animalBlink { 0%, 90% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } 100% { transform: scaleY(1); } }
        @keyframes animalTiltHead { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(10deg); } }
        @keyframes animalPeck { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-15deg); } }
        @keyframes animalBreathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }
        @keyframes animalSwish { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(5deg); } }
      `}
    </style>
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
    <Rabbit />

    <Dove />

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
    <Tortoise />

    <Nightingale />

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
    <Squirrel />

    <Owl />

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
    <Cat />

    <Raven />

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
    <Fox />

    <Robin />

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
    <svg x="122" y="70" width="20" height="20" viewBox="0 0 100 100" fill="none" stroke="none" className="motion-safe-ambient" style={{ animation: 'playfulBounce 2s infinite' }}>
      <g>
        <path d="M 80 40 C 95 30, 110 50, 95 65 C 90 70, 85 65, 85 60 C 85 55, 90 55, 90 50 C 90 45, 80 45, 80 40 Z" fill="#D69E85" />
        <path d="M 65 60 L 65 95 Q 65 100 70 100 L 75 100 Q 80 100 80 95 L 80 60 Z" fill="#B2664D" />
        <path d="M 35 60 L 35 95 Q 35 100 40 100 L 45 100 Q 50 100 50 95 L 50 60 Z" fill="#B2664D" />
        <path d="M 35 30 C 50 30, 70 35, 85 40 C 95 45, 95 70, 85 75 C 70 80, 45 75, 30 55 C 25 45, 25 30, 35 30 Z" fill="#D69E85" />
        <path d="M 60 38 C 75 38, 85 45, 75 55 C 65 60, 55 50, 60 38 Z" fill="#B2664D" />
        <path d="M 28 50 C 40 65, 75 75, 85 75 C 80 80, 45 80, 32 65 C 27 55, 25 50, 28 50 Z" fill="#E8BCA7" />
        <path d="M 70 65 C 75 65, 85 75, 85 95 Q 85 100 80 100 L 75 100 Q 70 100 70 95 L 70 65 Z" fill="#D69E85" />
        <path d="M 40 60 L 40 95 Q 40 100 45 100 L 50 100 Q 55 100 55 95 L 55 60 Z" fill="#D69E85" />
        <circle cx="35" cy="28" r="16" fill="#D69E85" />
        <path d="M 30 18 C 10 18, 5 35, 25 40 C 35 42, 45 35, 40 25 Z" fill="#E8BCA7" />
        <ellipse cx="10" cy="24" rx="4" ry="5" fill="#262F33" transform="rotate(-15 10 24)" />
        <circle cx="28" cy="20" r="3" fill="#262F33" />
        <circle cx="20" cy="30" r="1" fill="#D69E85" />
        <circle cx="24" cy="28" r="1" fill="#D69E85" />
        <circle cx="25" cy="32" r="1" fill="#D69E85" />
        <path d="M 35 15 C 45 10, 55 15, 50 35 C 48 45, 38 40, 38 30 C 38 22, 35 20, 35 15 Z" fill="#6A2B1D" />
      </g>
    </svg>

    {/* Small bird rest (branch) for Woodpecker */}
    <path d="M 53 74 Q 45 76 40 73" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    
    <Woodpecker />

    <Dialogue 
      figureText="Come say hello."
      birdText="I'll carry the word."
      birdX={5}
      birdY={25}
      birdTailLeft="45%"
    />
  </SharedEnvironment>
);

// 7. Resume — "Presenting credentials"
const ResumeVignette = () => (
  <SharedEnvironment>
    {/* Seated upright figure */}
    <circle cx="98" cy="56" r="2.5" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M 98 58.5 L 98 76 L 104 76 L 104 86" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    
    {/* Arm holding document */}
    <path d="M 98 65 L 106 62" stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" />
    
    {/* Document */}
    <g transform="translate(105, 57) rotate(15)">
      <rect x="0" y="0" width="5" height="7" stroke="currentColor" strokeWidth="0.5" fill="var(--footer-bg)" />
      <line x1="1" y1="2.5" x2="4" y2="2.5" stroke="currentColor" strokeWidth="0.5" />
      <line x1="1" y1="4" x2="3.5" y2="4" stroke="currentColor" strokeWidth="0.5" />
    </g>

    {/* Portfolio Folder leaning on bench */}
    <g transform="translate(86, 80) rotate(-10)">
      <rect x="0" y="0" width="7" height="5" rx="0.5" stroke="currentColor" strokeWidth="0.75" fill="var(--footer-bg)" />
      <line x1="0" y1="1.5" x2="7" y2="1.5" stroke="currentColor" strokeWidth="0.5" />
    </g>

    {/* Extra solid ground extending to the peacock */}
    <path d="M 160 90 L 180 90" stroke="currentColor" strokeWidth="1" />

    <Deer x="65" y="60" flip={true} />
    
    <Peacock />

    <Dialogue 
      figureText="Think this makes a good impression?"
      birdText="Let the feathers speak."
      birdX={125}
      birdY={25}
      birdTailLeft="70%"
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
      className="flex flex-col items-center justify-end h-full w-[460px] lg:w-[540px] opacity-60 hover:opacity-100 transition-opacity duration-700 pb-2 cursor-default"
    >
      <Vignette />
    </div>
  );
};
