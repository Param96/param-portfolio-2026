"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence, useReducedMotion, useInView } from "framer-motion";
import { Network, Server, Cloud, Users, Code, Database, ArrowRight, Award, BrainCircuit, Apple } from "lucide-react";
import { useLivingSystemStore } from "@/lib/store";

// Local themes removed. Component now uses global CSS variables:
// var(--footer-bg), var(--footer-ink), var(--footer-leaf), var(--footer-accent), var(--footer-text)

// --- KNOWLEDGE NODES / BRANCHES ---
const BRANCHES = [
  // Left branches
  { id: "lead", title: "Leadership", desc: "Team & strategic management.", skills: ["Team Management", "Project Management", "Event Management", "Strategic Planning"], icon: Apple, color: "var(--footer-accent)", pathId: "path-lead", pathD: "M 200 200 C 190 170, 160 140, 130 120 C 115 110, 105 110, 96 110", cx: 96, cy: 110 },
  { id: "design", title: "Design", desc: "Creative & user experience.", skills: ["UI/UX Design", "Graphic Design", "Brochure & Marketing Design", "Presentation Design"], icon: Apple, color: "var(--footer-accent)", pathId: "path-design", pathD: "M 197 205 C 170 190, 130 170, 100 155 C 85 145, 80 145, 76 145", cx: 76, cy: 145 },
  { id: "softdev", title: "Software Development", desc: "End-to-end architecture.", skills: ["Full Stack Development", "Frontend & Backend", "REST APIs", "Databases", "Software Architecture"], icon: Apple, color: "var(--footer-accent)", pathId: "path-softdev", pathD: "M 197 215 C 165 200, 135 190, 110 185 C 95 185, 90 185, 86 185", cx: 86, cy: 185 },
  { id: "cloud", title: "Cloud & DevOps", desc: "Scalable deployments.", skills: ["Cloud Native", "Docker", "Kubernetes", "CI/CD", "Git & GitHub"], icon: Apple, color: "var(--footer-accent)", pathId: "path-cloud", pathD: "M 197 225 C 160 215, 130 215, 115 215 C 110 215, 105 220, 100 220", cx: 100, cy: 220 },
  // Right branches
  { id: "business", title: "Business", desc: "Strategy & analysis.", skills: ["Product Strategy", "Business Analysis", "Entrepreneurship", "Startup Development"], icon: Apple, color: "var(--footer-accent)", pathId: "path-business", pathD: "M 200 200 C 210 170, 240 140, 270 120 C 285 110, 295 110, 304 110", cx: 304, cy: 110 },
  { id: "aitools", title: "AI Tools", desc: "LLMs & workflows.", skills: ["LLM Platforms", "AI Coding Assistants", "AI Wrappers", "Workflow Automation"], icon: Apple, color: "var(--footer-accent)", pathId: "path-aitools", pathD: "M 203 205 C 230 190, 270 170, 300 155 C 315 145, 320 145, 324 145", cx: 324, cy: 145 },
  { id: "ai", title: "Artificial Intelligence", desc: "Machine learning systems.", skills: ["Machine Learning", "Generative AI", "Agentic AI", "AI Automation", "AI Product Development"], icon: Apple, color: "var(--footer-accent)", pathId: "path-ai", pathD: "M 203 215 C 235 200, 265 190, 290 185 C 305 185, 310 185, 314 185", cx: 314, cy: 185 },
  { id: "data", title: "Data & Analytics", desc: "Insights & intelligence.", skills: ["SQL", "Business Intelligence", "Power BI", "Data Analysis"], icon: Apple, color: "var(--footer-accent)", pathId: "path-data", pathD: "M 203 225 C 240 215, 270 215, 285 215 C 290 215, 295 220, 300 220", cx: 300, cy: 220 },
  // Root
  { id: "prof", title: "Professional Skills", desc: "Core soft skills & foundations.", skills: ["Analytical Thinking", "Problem Solving", "Communication", "Research", "Adaptability"], icon: Apple, color: "var(--footer-accent)", pathId: "path-prof", pathD: "", cx: 200, cy: 195 },
];

// Deterministic seeded random for ecosystem elements
const mulberry32 = (a: number) => {
  return function() {
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

// Generate background particles
const generateParticles = (count: number) => {
  const rand = mulberry32(12345);
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: Number((rand() * 400).toFixed(2)),
      y: Number((rand() * 440).toFixed(2)),
      r: Number((rand() * 1.5 + 0.5).toFixed(2)),
      delay: Number((rand() * -10).toFixed(2)),
      duration: Number((rand() * 10 + 10).toFixed(2)),
    });
  }
  return particles;
};

const PARTICLES = generateParticles(80);

const getCubicBezierPoint = (t: number, p0: any, p1: any, p2: any, p3: any) => {
  const mt = 1 - t;
  const mt2 = mt * mt;
  const mt3 = mt2 * mt;
  const t2 = t * t;
  const t3 = t2 * t;
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
  };
};

const generateLeaves = () => {
  const rand = mulberry32(8888);
  const leaves: any[] = [];
  let idCounter = 0;
  
  const addLeavesForCurve = (p0: any, p1: any, p2: any, p3: any, baseDensity: number) => {
    for(let i=0; i < baseDensity; i++) {
      // bias towards tip, avoid bare trunk start
      const t = Math.pow(rand(), 0.7); 
      if (t < 0.15) continue; 
      
      const pt = getCubicBezierPoint(t, p0, p1, p2, p3);
      // Ensure branch gets broken up by tight leaves + wide spread
      const maxSpread = 8 + (t * 24); 
      const spread = rand() > 0.6 ? 2 : maxSpread; 
      const offsetX = (rand() - 0.5) * spread;
      const offsetY = (rand() - 0.5) * spread;
      
      leaves.push({
        id: idCounter++,
        x: Number((pt.x + offsetX).toFixed(2)),
        y: Number((pt.y + offsetY).toFixed(2)),
        angle: Number((rand() * 360).toFixed(2)),
        size: Number((rand() * 0.4 + 0.3).toFixed(2))
      });
    }
  };

  const branchPaths = [
    "M 200 200 C 190 170, 160 140, 130 120 C 115 110, 105 110, 96 110",
    "M 197 205 C 170 190, 130 170, 100 155 C 85 145, 80 145, 76 145",
    "M 197 215 C 165 200, 135 190, 110 185 C 95 185, 90 185, 86 185",
    "M 197 225 C 160 215, 130 215, 115 215 C 110 215, 105 220, 100 220",
    "M 200 200 C 210 170, 240 140, 270 120 C 285 110, 295 110, 304 110",
    "M 203 205 C 230 190, 270 170, 300 155 C 315 145, 320 145, 324 145",
    "M 203 215 C 235 200, 265 190, 290 185 C 305 185, 310 185, 314 185",
    "M 203 225 C 240 215, 270 215, 285 215 C 290 215, 295 220, 300 220",
    "M 200 200 C 195 170, 190 140, 180 100",
    "M 200 200 C 205 170, 210 140, 220 100" 
  ];

  branchPaths.forEach(path => {
    const c = path.match(/[-.\d]+/g)?.map(Number);
    if (!c) return;
    if (c.length === 14) {
      addLeavesForCurve({x: c[0], y: c[1]}, {x: c[2], y: c[3]}, {x: c[4], y: c[5]}, {x: c[6], y: c[7]}, 75);
      addLeavesForCurve({x: c[6], y: c[7]}, {x: c[8], y: c[9]}, {x: c[10], y: c[11]}, {x: c[12], y: c[13]}, 110);
    } else if (c.length === 8) {
      addLeavesForCurve({x: c[0], y: c[1]}, {x: c[2], y: c[3]}, {x: c[4], y: c[5]}, {x: c[6], y: c[7]}, 120);
    }
  });

  // Ambient scattered canopy filler
  for(let i=0; i < 150; i++) {
    const t = rand() * Math.PI * 2;
    const r = rand() * 110;
    leaves.push({
      id: idCounter++,
      x: Number((200 + Math.cos(t) * r).toFixed(2)),
      y: Number((160 + Math.sin(t) * (r * 0.6)).toFixed(2)),
      angle: Number((rand() * 360).toFixed(2)),
      size: Number((rand() * 0.4 + 0.3).toFixed(2))
    });
  }

  return leaves;
};
const LEAVES = generateLeaves();

// --- COMPONENTS ---

function KnowledgeNode({ 
  branch, 
  activeNode, 
  setActiveNode, 
  timeOfDayTheme 
}: { 
  branch: typeof BRANCHES[0], 
  activeNode: string | null, 
  setActiveNode: (id: string | null) => void,
  timeOfDayTheme: string
}) {
  const isActive = activeNode === branch.id;
  const isFaded = activeNode !== null && !isActive;
  const Icon = branch.icon;
  const isNight = timeOfDayTheme === "night";

  return (
    <foreignObject
      x={branch.cx - 100}
      y={branch.cy - 90}
      width="200"
      height="180"
      className={`overflow-visible transition-opacity duration-700 z-50 ${isFaded ? 'opacity-20' : 'opacity-100'}`}
      style={{ pointerEvents: 'none' }}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        
        <div 
          className="absolute pointer-events-auto flex flex-col items-center"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, 0)' }}
          onMouseEnter={() => setActiveNode(branch.id)}
          onMouseLeave={() => setActiveNode(null)}
        >
          {/* Hanging Fruit */}
          <motion.div 
            animate={{ rotate: [-3, 3, -3] }} 
            transition={{ repeat: Infinity, duration: 4 + ((branch.cx + branch.cy) % 10) / 10, ease: "easeInOut" }}
            style={{ transformOrigin: 'top center' }}
            className="relative flex flex-col items-center cursor-pointer group"
          >
            {/* Stem */}
            <div className="w-[1.5px] h-[18px] bg-[var(--footer-ink)] opacity-80" />
            
            {/* Apple Shape */}
            <div className="relative group mt-[-2px]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 group-hover:scale-110 relative z-10">
                 {/* Leaf */}
                 <path d="M12 7.5C12 7.5 11 3 15 2C15 2 16 6 12 7.5Z" fill={isActive ? branch.color : "var(--footer-leaf)"} stroke="var(--footer-ink)" strokeWidth="1.5" strokeLinejoin="round" />
                 {/* Apple Body */}
                 <path d="M12 21.5C16.5 21.5 20 18 20 13C20 9.5 17 7 13.5 7C12.5 7 12 7.5 12 7.5C12 7.5 11.5 7 10.5 7C7 7 4 9.5 4 13C4 18 7.5 21.5 12 21.5Z" 
                       fill={isActive ? branch.color : "var(--footer-bg)"} 
                       stroke="var(--footer-ink)" 
                       strokeWidth="1.5" 
                       strokeLinecap="round" 
                       strokeLinejoin="round" 
                 />
              </svg>
              {/* Outer glow aura when active */}
              {isActive && (
                <div 
                  className="absolute inset-0 rounded-full blur-md z-0"
                  style={{ backgroundColor: branch.color, opacity: 0.6, transform: 'scale(1.2)' }}
                />
              )}
            </div>
          </motion.div>

        {/* Information Pod */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
              className="absolute left-1/2 ml-3 top-1/2 -translate-y-1/2 p-2.5 rounded-2xl border border-white/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] z-50 w-36 pointer-events-auto"
              style={{ 
                background: 'var(--footer-bg)',
                color: 'var(--footer-ink)'
              }}
            >
              <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 leading-tight">{branch.title}</h4>
              <p className="text-[8px] opacity-80 mb-2 leading-relaxed font-medium">{branch.desc}</p>
              
              <div className="flex flex-wrap gap-1 mt-1">
                {branch.skills.map(skill => (
                  <span key={skill} className="text-[7px] px-1.5 py-0.5 rounded border border-current/20 opacity-90 font-bold uppercase tracking-wider" style={{ color: 'var(--footer-accent)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </foreignObject>
  );
}

// --- DIALOGUE SYSTEM ---
const DIALOGUE_POOL = [
  { a: "Do you ever wonder what it's learning up there?", b: "Same as us. Slowly." },
  { a: "That branch looks new.", b: "Everything here is always growing." },
  { a: "I heard it dreams in code.", b: "Don't we all, some nights." },
  { a: "Which fruit is yours?", b: "Still figuring that out." },
  { a: "The nest wasn't there yesterday.", b: "Things build quietly here." },
  { a: "Do the leaves ever stop falling?", b: "Only long enough to grow back." },
  { a: "I think it's listening.", b: "Trees usually are." },
  { a: "Are we the visitors, or is it?", b: "Depends on the day." },
  { a: "One tree, nine branches.", b: "Sounds like a good system." },
  { a: "Where does this path go?", b: "Wherever we keep walking." }
];

function WalkingDialogue({ loopIndex }: { loopIndex: number }) {
  const shouldReduceMotion = useReducedMotion();
  
  const poolSize = DIALOGUE_POOL.length;
  // Pick two distinct exchanges for this loop
  const idx1 = (loopIndex * 2) % poolSize;
  const idx2 = (loopIndex * 2 + 1) % poolSize;
  const ex1 = DIALOGUE_POOL[idx1];
  const ex2 = DIALOGUE_POOL[idx2];

  const duration = 60; // sync with 60s walk loop

  const createVariant = (start: number, fade: number, hold: number) => {
    // If reduced motion, use a very sharp cut instead of a slow fade
    const actualFade = shouldReduceMotion ? 0.01 : fade;
    const t1 = start / duration;
    const t2 = (start + actualFade) / duration;
    const t3 = (start + actualFade + hold) / duration;
    const t4 = (start + actualFade + hold + actualFade) / duration;

    return {
      hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 2 },
      visible: { 
        opacity: [0, 0, 1, 1, 0, 0], 
        y: shouldReduceMotion ? [0, 0, 0, 0, 0, 0] : [2, 2, 0, 0, -2, -2],
        transition: { duration, times: [0, t1, t2, t3, t4, 1], ease: "linear" } 
      }
    };
  };

  // Conversation 1:
  const varA1 = createVariant(4, 1, 6);    // 4s to 12s
  const varB1 = createVariant(12.5, 1, 6); // 12.5s to 20.5s
  
  // Conversation 2:
  const varA2 = createVariant(30, 1, 6);   // 30s to 38s
  const varB2 = createVariant(38.5, 1, 6); // 38.5s to 46.5s

  const renderBubble = (text: string, speaker: 'A' | 'B', variants: any, key: string) => {
    // Both bubbles can rest comfortably above their respective figures 
    // without vertical staggering since they appear sequentially.
    const x = speaker === 'A' ? "-60" : "-45";
    const y = speaker === 'A' ? "-60" : "-58";
    
    return (
      <motion.g initial="hidden" animate="visible" variants={variants} key={key}>
        <foreignObject x={x} y={y} width="120" height="56" className="overflow-visible pointer-events-none">
          <div style={{ width: '300px', height: '140px', transform: 'scale(0.4)', transformOrigin: 'top left' }} className="flex justify-center items-end pb-2">
            <div className="relative rounded-md border px-3 py-2 max-w-[280px] shadow-sm transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', color: 'var(--footer-text)' }}>
              <p className="font-inter uppercase font-semibold tracking-widest text-center m-0 leading-tight" style={{ fontSize: '11px' }}>
                {text}
              </p>
              <div className="absolute border-b border-r w-2.5 h-2.5 transition-colors duration-500" style={{ backgroundColor: 'var(--footer-bubble-fill)', borderColor: 'var(--footer-ink)', bottom: '-5px', left: '50%', transform: 'translateX(-50%) rotate(45deg)' }} />
            </div>
          </div>
        </foreignObject>
      </motion.g>
    );
  };

  return (
    <g className="walking-dialogue-layer pointer-events-none">
      {renderBubble(ex1.a, 'A', varA1, `a1-${loopIndex}`)}
      {renderBubble(ex1.b, 'B', varB1, `b1-${loopIndex}`)}
      {renderBubble(ex2.a, 'A', varA2, `a2-${loopIndex}`)}
      {renderBubble(ex2.b, 'B', varB2, `b2-${loopIndex}`)}
    </g>
  );
}

export default function SystemsGrowthArchitecture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const { timeOfDayTheme } = useLivingSystemStore();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [loopIndex, setLoopIndex] = useState(0);
  const isNight = timeOfDayTheme === "night";

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden transition-colors duration-1000 ease-[var(--ease-organic)] bg-[var(--footer-bg)] text-[var(--footer-text)]"
    >
      {/* ── HEADER ── */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 text-center pt-16 md:pt-24 pb-6" data-cursor="text">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 drop-shadow-sm transition-colors duration-1000"
          style={{ color: 'var(--footer-ink)' }}
        >
          Systems Growth <br />
          <span className="font-bold italic" style={{ color: 'var(--footer-accent)', transition: 'color 3s' }}>Architecture</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm tracking-[0.2em] uppercase font-bold drop-shadow-sm transition-colors duration-1000"
          style={{ color: 'var(--footer-ink)', opacity: 0.7 }}
        >
          Living Knowledge Ecosystem
        </motion.p>
      </div>

      {/* Theme Toggle Removed - Now synced purely to global store and terminal */}

      {/* ── LIVING ARCHITECTURE SVG ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
        
        {/* CSS for micro-animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float-up {
            0% { transform: translateY(0px); opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { transform: translateY(-40px); opacity: 0; }
          }
          @keyframes sway {
            0%, 100% { transform: rotate(-5deg); }
            50% { transform: rotate(5deg); }
          }
          @keyframes pulseNode {
            0%, 100% { opacity: 0.1; transform: scale(0.8); }
            50% { opacity: 0.8; transform: scale(1.2); }
          }
          @keyframes flutterWander {
            0% { transform: translate(20px, 300px); opacity: 0; }
            20% { transform: translate(100px, 250px); opacity: 0.8; }
            80% { transform: translate(300px, 220px); opacity: 0.8; }
            100% { transform: translate(380px, 180px); opacity: 0; }
          }
          @keyframes flutterWander2 {
            0% { transform: translate(380px, 320px) scaleX(-1); opacity: 0; }
            20% { transform: translate(300px, 240px) scaleX(-1); opacity: 0.8; }
            80% { transform: translate(100px, 210px) scaleX(-1); opacity: 0.8; }
            100% { transform: translate(20px, 260px) scaleX(-1); opacity: 0; }
          }
          @keyframes walkAcross {
            0% { transform: translateX(20px); opacity: 0; }
            5% { transform: translateX(35px); opacity: 1; }
            95% { transform: translateX(365px); opacity: 1; }
            100% { transform: translateX(380px); opacity: 0; }
          }
          @keyframes playfulBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-3px); }
          }
          .particle { animation: float-up linear infinite; }
          .leaf { animation: sway 4s ease-in-out infinite; transform-origin: top center; }
          .motion-safe-ambient { will-change: transform, opacity; }
        `}} />

        <svg
          className="w-full h-auto transition-colors duration-1000"
          style={{ overflow: 'visible', color: 'var(--footer-ink)' }}
          viewBox="0 0 400 440"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* DEFINITIONS */}
          <defs>
            <filter id="glow-branch" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--footer-accent)" style={{ stopOpacity: 0.2 }} />
              <stop offset="100%" stopColor="var(--footer-accent)" style={{ stopOpacity: 0 }} />
            </radialGradient>
          </defs>

          {/* BACKGROUND ECOSYSTEM */}
          <g id="background" className="transition-opacity duration-1000">
            {PARTICLES.map((p) => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.r}
                fill="var(--footer-ink)"
                opacity="0.1"
                className="particle"
                style={{ animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
              />
            ))}
          </g>

          {/* GROUND LAYER & BACKGROUND SCENE */}
          <g className="ground-scene pointer-events-none" fill="none" stroke="var(--footer-ink)">
            {/* Ground line */}
            <path d="M 0 420 L 400 420" strokeWidth="1" strokeDasharray="3 6" opacity="0.5" />
            <path d="M 0 422 L 400 422" strokeWidth="0.5" opacity="0.3" />
            
            {/* Street Lamp & Nest */}
            <g transform="translate(320, 260) scale(1.6)">
              <path d="M0 100 L0 25 L-15 25 L-15 30" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M-20 30 L-10 30 L-12 35 L-18 35 Z" fill="currentColor" stroke="none" opacity="0.8" />
              <circle cx="-15" cy="42" r="18" fill="url(#lampGlow)" stroke="none" />
              <circle cx="-15" cy="38" r="3" fill="var(--footer-accent)" stroke="none" opacity="0.9" />
              {/* Nest on crossbar */}
              <g transform="translate(-10, 24) scale(0.6)" className="nest">
                 <path d="M-8 0 Q0 6 8 0 Q10 -4 6 -6 Q0 -2 -6 -6 Q-10 -4 -8 0 Z" fill="var(--footer-bg)" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" opacity="0.9" />
                 <path d="M-6 -2 L2 -4 M-4 -1 L6 -2 M-7 -4 L-2 1 M5 0 L8 -4" stroke="currentColor" strokeWidth="0.8" opacity="0.7"/>
              </g>
            </g>

            {/* Park Benches */}
            <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7">
              {/* Bench 1 (Left) */}
              <g transform="translate(80, 415) scale(0.9)">
                <path d="M 0 5 L 0 0 M 30 5 L 30 0 M -2 0 L 32 0 M 2 0 L 5 -12 M 28 0 L 25 -12 M 3 -6 L 27 -6 M 4 -12 L 26 -12" />
              </g>
              {/* Bench 2 (Right, near lamp) */}
              <g transform="translate(270, 416) scale(0.8)">
                <path d="M 0 5 L 0 0 M 30 5 L 30 0 M -2 0 L 32 0 M 2 0 L 5 -12 M 28 0 L 25 -12 M 3 -6 L 27 -6 M 4 -12 L 26 -12" />
              </g>
            </g>

            {/* Grass & Flowers */}
            <path d="M 50 420 L 48 415 M 50 420 L 52 416 M 120 420 L 118 412 M 120 420 L 123 416 M 250 420 L 248 414 M 250 420 L 253 412 M 350 420 L 348 416" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
            <circle cx="45" cy="418" r="2" fill="var(--footer-accent)" stroke="none" opacity="0.8" />
            <circle cx="125" cy="419" r="1.5" fill="var(--footer-accent)" stroke="none" opacity="0.8" />
            <circle cx="245" cy="417" r="1.5" fill="var(--footer-accent)" stroke="none" opacity="0.8" />
            
            {/* Dynamic Bird */}
            <g className="transition-all duration-1000">
              {timeOfDayTheme === 'night' && (
                <g transform="translate(304, 293) scale(0.14)">
                  <g transform="translate(-50, -85)">
                    {/* Sleeping Bird SVG */}
                    <path d="M 25 65 C 25 40 75 40 75 65 C 75 85 25 85 25 65 Z" fill="#C1272D" />
                    <path d="M 30 65 C 40 50 60 50 70 65 C 60 75 40 75 30 65 Z" fill="#222222" />
                    <path d="M 20 60 C 20 45 40 45 45 60 C 35 65 25 65 20 60 Z" fill="#222222" />
                    <path d="M 40 65 C 50 65 55 75 45 80 C 35 80 35 70 40 65 Z" fill="#EEEEEE" />
                    <path d="M 28 55 Q 32 58 35 55" stroke="#EEEEEE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </g>
                </g>
              )}
              {(timeOfDayTheme === 'day' || timeOfDayTheme === 'dusk') && (
                <g transform="translate(304, 293) scale(0.14)">
                  <g transform="translate(-50, -85)">
                    {/* Standing Bird SVG */}
                    <path d="M 30 65 L 5 85 C 5 90 10 95 15 95 L 40 75 Z" fill="#222222" />
                    <path d="M 30 70 C 15 40 45 20 65 20 C 80 20 85 35 80 55 C 75 75 50 85 30 70 Z" fill="#C1272D" />
                    <path d="M 45 35 C 25 55 20 75 30 85 C 45 80 65 60 70 45 C 65 35 55 35 45 35 Z" fill="#222222" />
                    <path d="M 45 25 C 55 15 75 18 80 28 C 82 32 75 35 70 35 C 60 35 50 30 45 25 Z" fill="#222222" />
                    <path d="M 70 35 C 80 35 85 40 85 45 C 85 55 70 60 55 50 C 60 45 65 40 70 35 Z" fill="#EEEEEE" />
                    <path d="M 80 28 L 98 32 L 82 36 Z" fill="#222222" />
                    <circle cx="68" cy="28" r="2.5" fill="#EEEEEE" />
                    <circle cx="69" cy="28" r="1.2" fill="#222222" />
                    <path d="M 45 60 C 40 65 35 70 35 75 C 45 70 50 60 55 55" stroke="#EEEEEE" strokeWidth="2" fill="none" />
                  </g>
                </g>
              )}
              {timeOfDayTheme === 'dawn' && (
                <g transform="translate(335, 417)">
                  <g transform="scale(-0.14, 0.14)">
                    <g transform="translate(-60, -85) rotate(20, 50, 85)">
                      {/* Standing Bird SVG (Flipped and Tilted for Pecking) */}
                      <path d="M 30 65 L 5 85 C 5 90 10 95 15 95 L 40 75 Z" fill="#222222" />
                      <path d="M 30 70 C 15 40 45 20 65 20 C 80 20 85 35 80 55 C 75 75 50 85 30 70 Z" fill="#C1272D" />
                      <path d="M 45 35 C 25 55 20 75 30 85 C 45 80 65 60 70 45 C 65 35 55 35 45 35 Z" fill="#222222" />
                      <path d="M 45 25 C 55 15 75 18 80 28 C 82 32 75 35 70 35 C 60 35 50 30 45 25 Z" fill="#222222" />
                      <path d="M 70 35 C 80 35 85 40 85 45 C 85 55 70 60 55 50 C 60 45 65 40 70 35 Z" fill="#EEEEEE" />
                      <path d="M 80 28 L 98 32 L 82 36 Z" fill="#222222" />
                      <circle cx="68" cy="28" r="2.5" fill="#EEEEEE" />
                      <circle cx="69" cy="28" r="1.2" fill="#222222" />
                      <path d="M 45 60 C 40 65 35 70 35 75 C 45 70 50 60 55 55" stroke="#EEEEEE" strokeWidth="2" fill="none" />
                    </g>
                  </g>
                  <g transform="scale(0.7)" fill="var(--footer-ink)" opacity="0.6">
                    <circle cx="-15" cy="5" r="0.8" />
                    <circle cx="-12" cy="4" r="0.8" />
                    <circle cx="-18" cy="4.5" r="0.8" />
                    <circle cx="-14" cy="2" r="0.8" />
                  </g>
                </g>
              )}
            </g>

            {/* Dynamic Dog */}
            <g transform="translate(125, 396) scale(0.24)">
              {/* Night (Sleeping) */}
              <g className={`transition-opacity duration-1000 ${timeOfDayTheme === 'night' ? 'opacity-100' : 'opacity-0'}`}>
                {/* Sleeping Dog SVG */}
                <g transform="translate(0, 5)">
                  <path d="M 75 70 C 85 70, 90 85, 80 90 C 75 92, 65 92, 65 85 C 65 75, 70 70, 75 70 Z" fill="#B2664D" />
                  <path d="M 35 85 C 45 85, 50 90, 45 95 C 40 98, 25 98, 20 90 C 20 85, 25 85, 35 85 Z" fill="#B2664D" />
                  <path d="M 80 70 C 95 70, 95 95, 65 95 C 45 95, 25 90, 20 85 C 15 80, 25 75, 35 75 C 60 75, 85 85, 80 70 Z" fill="#D69E85" />
                  <path d="M 35 75 C 35 45, 85 45, 85 75 C 85 95, 35 95, 35 75 Z" fill="#D69E85" />
                  <path d="M 55 50 C 75 50, 80 65, 65 70 C 55 70, 50 60, 55 50 Z" fill="#B2664D" />
                  <path d="M 45 85 C 60 90, 80 90, 85 80 C 75 85, 55 85, 45 85 Z" fill="#E8BCA7" />
                  <circle cx="30" cy="70" r="15" fill="#D69E85" />
                  <path d="M 25 60 C 10 60, 5 75, 20 80 C 30 83, 40 75, 35 65 Z" fill="#E8BCA7" />
                  <circle cx="10" cy="72" r="3.5" fill="#262F33" />
                  <path d="M 22 65 Q 26 69, 30 65" stroke="#262F33" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M 35 55 C 50 55, 50 70, 45 80 C 40 90, 25 80, 30 65 Z" fill="#6A2B1D" />
                </g>
                <text x="15" y="30" fontSize="20" fill="var(--footer-ink)" opacity="0.6" className="motion-safe-ambient font-inter font-bold" style={{ animation: 'floatZzz 3s infinite' }}>z</text>
                <text x="35" y="10" fontSize="28" fill="var(--footer-ink)" opacity="0.6" className="motion-safe-ambient font-inter font-bold" style={{ animation: 'floatZzz 3s infinite 1.5s' }}>Z</text>
              </g>

              {/* Day (Playful Bow) */}
              <g className={`transition-opacity duration-1000 ${timeOfDayTheme === 'day' ? 'opacity-100' : 'opacity-0'}`}>
                <g className="motion-safe-ambient" style={{ animation: 'playfulBounce 1.5s ease-in-out infinite' }}>
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
              </g>
              
              {/* Dawn/Dusk (Standing Still) */}
              <g className={`transition-opacity duration-1000 ${['dawn', 'dusk'].includes(timeOfDayTheme) ? 'opacity-100' : 'opacity-0'}`}>
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
            </g>

            {/* Distant Abstract Trees */}
            <g opacity="0.2" fill="currentColor" stroke="none">
               <path d="M 80 420 Q 80 390 75 360 M 75 360 Q 65 370 50 350 M 75 360 Q 90 365 100 350" stroke="currentColor" strokeWidth="1.5" fill="none" />
               <circle cx="75" cy="350" r="30" />
               <circle cx="55" cy="360" r="20" />
               <circle cx="95" cy="360" r="20" />
               
               <path d="M 330 420 Q 330 380 340 340 M 340 340 Q 320 350 310 330 M 340 340 Q 360 345 370 330" stroke="currentColor" strokeWidth="1.5" fill="none" />
               <circle cx="340" cy="330" r="35" />
               <circle cx="310" cy="340" r="25" />
               <circle cx="370" cy="340" r="25" />
            </g>

            {/* Stick Figures Walking */}
            <g 
              className="motion-safe-ambient" 
              style={{ animation: isInView ? 'walkAcross 60s linear infinite' : 'none' }}
              onAnimationIteration={() => setLoopIndex(prev => prev + 1)}
            >
              <g transform="translate(0, 395)">
                 <WalkingDialogue loopIndex={loopIndex} />
                 <circle cx="0" cy="0" r="3" fill="none" />
                 <path d="M 0 3 L 0 15 M 0 15 L -4 25 M 0 15 L 4 25 M -3 8 L 3 12" strokeWidth="1.2" strokeLinecap="round" />
                 <g transform="translate(15, 2)">
                   <circle cx="0" cy="0" r="2.5" fill="none" />
                   <path d="M 0 2.5 L 0 13 M 0 13 L -3 23 M 0 13 L 3 23 M -3 7 L 3 10" strokeWidth="1" strokeLinecap="round" />
                 </g>
              </g>
            </g>
          </g>

          {/* MAIN TREE STRUCTURE */}
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="none" className="transition-all duration-1000">
            {/* Trunk */}
            <path d="M 190 420 C 188 340, 192 290, 195 260 C 197 240, 200 220, 200 200" strokeWidth="2.5" />
            <path d="M 210 420 C 212 340, 208 290, 205 260 C 203 240, 200 220, 200 200" strokeWidth="2.5" />

            {/* Neural Branches */}
            <g className={activeNode ? 'opacity-30' : 'opacity-100'} style={{ transition: 'opacity 0.5s' }}>
              {BRANCHES.filter(b => b.pathD).map(b => (
                <path 
                  key={`branch-${b.id}`} 
                  id={b.pathId} 
                  d={b.pathD} 
                  strokeWidth={['path-lead', 'path-business'].includes(b.pathId) ? 3.5 : ['path-design', 'path-aitools'].includes(b.pathId) ? 2.5 : 2} 
                />
              ))}
              
              {/* Crown extensions */}
              <path d="M 200 200 C 195 170, 190 140, 180 100" strokeWidth="2" />
              <path d="M 200 200 C 205 170, 210 140, 220 100" strokeWidth="2" />
            </g>

            {/* Active Branch Glow Overlay */}
            {BRANCHES.filter(b => b.pathD).map(b => (
              <path 
                key={`glow-${b.id}`}
                d={b.pathD} 
                stroke="var(--footer-accent)"
                strokeWidth="4"
                filter="url(#glow-branch)"
                opacity={activeNode === b.id ? 0.8 : 0}
                className="transition-opacity duration-500"
              />
            ))}
          </g>

          {/* STATIC LEAVES */}
          <g fill="var(--footer-leaf)">
            {LEAVES.map(l => (
              <g key={`leaf-${l.id}`} transform={`translate(${l.x}, ${l.y}) rotate(${l.angle}) scale(${l.size})`}>
                <path 
                  d="M 0 0 C -5 -5, -5 -15, 0 -20 C 5 -15, 5 -5, 0 0" 
                  opacity={0.8}
                />
              </g>
            ))}
          </g>

          {/* NIGHT FIREFLIES */}
          <g className={`transition-opacity duration-1000 ${timeOfDayTheme === 'night' ? 'opacity-100' : 'opacity-0'}`}>
            {[
               {x: 150, y: 130, delay: 0},
               {x: 230, y: 100, delay: 1.2},
               {x: 100, y: 180, delay: 2.5},
               {x: 280, y: 170, delay: 0.8},
               {x: 210, y: 220, delay: 1.7},
               {x: 170, y: 70, delay: 0.4},
            ].map((f, i) => (
              <g key={`firefly-${i}`} className="motion-safe-ambient" style={{ transformOrigin: `${f.x}px ${f.y}px`, animation: `pulseNode 3.5s ease-in-out ${f.delay}s infinite` }}>
                <circle cx={f.x} cy={f.y} r="1.5" fill="var(--footer-accent)" />
                <circle cx={f.x} cy={f.y} r="6" fill="var(--footer-accent)" opacity="0.3" filter="blur(2px)" />
              </g>
            ))}
          </g>

          {/* DAYTIME BUTTERFLIES */}
          <g className={`transition-opacity duration-1000 ${['dawn', 'day'].includes(timeOfDayTheme) ? 'opacity-100' : 'opacity-0'}`}>
             <g className="motion-safe-ambient" style={{ animation: 'flutterWander 45s linear infinite' }}>
                <g transform="scale(0.6)">
                  {/* Upper Wings - Dark Pink */}
                  <path d="M 0 0 Q -10 -15 -20 -5 Q -25 5 -15 15 Q -5 20 0 5 Z" fill="#c47a82" opacity="0.8" />
                  <path d="M 0 0 Q 10 -15 20 -5 Q 25 5 15 15 Q 5 20 0 5 Z" fill="#c47a82" opacity="0.8" />
                  {/* Lower Wings - Darker Pink */}
                  <path d="M -5 10 Q -15 25 -5 30 Q 5 25 0 15 Z" fill="#a86169" opacity="0.7" />
                  <path d="M 5 10 Q 15 25 5 30 Q -5 25 0 15 Z" fill="#a86169" opacity="0.7" />
                  
                  <path d="M 0 -5 L 0 15" stroke="var(--footer-ink)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 0 -5 Q -5 -15 -8 -10 M 0 -5 Q 5 -15 8 -10" stroke="var(--footer-ink)" strokeWidth="0.8" fill="none" />
                  <circle cx="-12" cy="5" r="1.5" fill="var(--footer-ink)" opacity="0.6" />
                  <circle cx="12" cy="5" r="1.5" fill="var(--footer-ink)" opacity="0.6" />
                </g>
             </g>
             <g className="motion-safe-ambient" style={{ animation: 'flutterWander2 55s linear infinite', animationDelay: '-15s' }}>
                <g transform="scale(0.4)">
                  {/* Upper Wings - Dark Pink */}
                  <path d="M 0 0 Q -10 -15 -20 -5 Q -25 5 -15 15 Q -5 20 0 5 Z" fill="#c47a82" opacity="0.8" />
                  <path d="M 0 0 Q 10 -15 20 -5 Q 25 5 15 15 Q 5 20 0 5 Z" fill="#c47a82" opacity="0.8" />
                  {/* Lower Wings - Darker Pink */}
                  <path d="M -5 10 Q -15 25 -5 30 Q 5 25 0 15 Z" fill="#a86169" opacity="0.7" />
                  <path d="M 5 10 Q 15 25 5 30 Q -5 25 0 15 Z" fill="#a86169" opacity="0.7" />
                  
                  <path d="M 0 -5 L 0 15" stroke="var(--footer-ink)" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 0 -5 Q -5 -15 -8 -10 M 0 -5 Q 5 -15 8 -10" stroke="var(--footer-ink)" strokeWidth="0.8" fill="none" />
                </g>
             </g>
          </g>

          {/* KNOWLEDGE FLOW PARTICLES */}
          <g opacity={0.6}>
            {BRANCHES.filter(b => b.pathD).map((b, i) => (
              <circle key={`flow-${b.id}`} r={timeOfDayTheme === 'night' ? 2 : 1.5} fill="var(--footer-accent)" filter="url(#glow-branch)">
                <animateMotion 
                  dur={`${4 + i * 0.5}s`} 
                  repeatCount="indefinite" 
                  path={`M 200 420 C ${b.cx < 200 ? '197' : '203'} 340, ${b.cx < 200 ? '197' : '203'} 260, ${b.pathD.substring(2)}`} 
                />
                <animate attributeName="opacity" values="0;1;0" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </g>

          {/* KNOWLEDGE NODES (Interactive Orbs + Pods) */}
          {BRANCHES.map((branch) => (
            <KnowledgeNode 
              key={branch.id} 
              branch={branch} 
              activeNode={activeNode} 
              setActiveNode={setActiveNode} 
              timeOfDayTheme={timeOfDayTheme}
            />
          ))}
        </svg>
      </div>

      {/* ── CERTIFICATIONS ENVIRONMENT (2D) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-32 mt-12 md:mt-20">
        <div className="text-center mb-20" data-cursor="text">
          <h3 className="text-3xl md:text-5xl font-light tracking-tight mb-4 transition-colors duration-1000 ease-in-out" style={{ color: 'var(--footer-ink)' }}>
            Learning Infrastructure
          </h3>
          <p className="text-sm tracking-[0.2em] uppercase font-bold transition-colors duration-1000" style={{ color: 'var(--footer-ink)', opacity: 0.7 }}>
            Technical Foundations & Certifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* IBM Full Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="system"
            className="group relative bg-text-body/10 border p-10 lg:p-14 rounded-3xl overflow-hidden transition-colors duration-1000 ease-in-out"
            style={{ borderColor: `var(--footer-ink)`, opacity: 0.8 }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[var(--footer-accent)] mix-blend-overlay" style={{ opacity: 0.05 }} />
            <Award className="w-10 h-10 mb-8 transition-colors duration-1000" style={{ color: 'var(--footer-accent)' }} />
            <h4 className="text-2xl font-bold mb-2 transition-colors duration-1000 ease-in-out" style={{ color: 'var(--footer-ink)' }}>IBM Full Stack Software Developer</h4>
            <p className="opacity-70 mb-8 text-sm leading-relaxed" style={{ color: 'var(--footer-ink)' }}>
              Comprehensive architectural certification spanning cloud native deployment, microservices, and modern frontend frameworks.
            </p>
            <div className="flex flex-wrap gap-2">
              {["React", "Node.js", "Docker", "Kubernetes", "CI/CD"].map((tech) => (
                <span key={tech} className="px-3 py-1 border text-xs font-bold tracking-wider uppercase rounded-sm transition-colors duration-1000 ease-in-out" style={{ borderColor: `var(--footer-ink)`, color: 'var(--footer-ink)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Andrew Ng ML */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="system"
            className="group relative bg-text-body/10 border p-10 lg:p-14 rounded-3xl overflow-hidden transition-colors duration-1000 ease-in-out"
            style={{ borderColor: `var(--footer-ink)`, opacity: 0.8 }}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[var(--footer-accent)] mix-blend-overlay" style={{ opacity: 0.05 }} />
            <BrainCircuit className="w-10 h-10 mb-8 transition-colors duration-1000" style={{ color: 'var(--footer-ink)' }} />
            <h4 className="text-2xl font-bold mb-2 transition-colors duration-1000 ease-in-out" style={{ color: 'var(--footer-ink)' }}>Machine Learning Specialization</h4>
            <p className="opacity-70 mb-8 text-sm leading-relaxed" style={{ color: 'var(--footer-ink)' }}>
              Foundational intelligence systems certification by Stanford / Andrew Ng covering deep learning, neural networks, and model optimization.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Neural Networks", "Supervised Learning", "TensorFlow"].map((tech) => (
                <span key={tech} className="px-3 py-1 border text-xs font-bold tracking-wider uppercase rounded-sm transition-colors duration-1000 ease-in-out" style={{ borderColor: `var(--footer-accent)`, backgroundColor: `var(--footer-accent)`, opacity: 0.9, color: 'var(--footer-bg)' }}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
