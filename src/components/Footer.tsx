"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { DynamicFooterVignette } from "./ui/FooterVignettes";
import { useLivingSystemStore } from "@/lib/store";

// Highly Optimized Falling Leaves Animation Background (Pure CSS, Hardware Accelerated)
const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<{ id: number; left: number; duration: number; delay: number; sway: number }[]>([]);

  useEffect(() => {
    // Generate more leaves to fill the full width of the footer
    const newLeaves = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 15 + 15, // 15s to 30s fall time
      delay: Math.random() * -25, // Start staggered
      sway: Math.random() * 60 - 30, // -30px to 30px sway
    }));
    setLeaves(newLeaves);
  }, []);

  return (
    <>
      <style>{`
        @keyframes optimizedFall {
          0% { transform: translate3d(0, -10vh, 0) rotate(0deg); }
          50% { transform: translate3d(var(--sway), 50vh, 0) rotate(180deg); }
          100% { transform: translate3d(0, 110vh, 0) rotate(360deg); }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute top-0 text-[var(--amber)]"
            style={{ 
              left: `${leaf.left}%`,
              '--sway': `${leaf.sway}px`,
              animation: `optimizedFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
              willChange: 'transform'
            } as React.CSSProperties}
          >
            {/* Subtle Leaf SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="opacity-40 blur-[0.5px]">
              <path d="M17.5,3c-3.1,0-6.1,1.5-8.5,4c-0.2-1-0.9-1.9-2-2.3L2,3l2,5.2c-0.3,1.1-0.2,2.3,0.3,3.3C7.5,14.6,12.2,16.5,16,19 l1.6-6c0-1.8-0.3-3.7-1-5.4C17,7.1,17.4,6.7,17.9,6.2C19.7,4.4,20,3,20,3S19,3,17.5,3z"/>
            </svg>
          </div>
        ))}
      </div>
    </>
  );
};

// Living Meadow Ambient System (Wind, Motes, Grass, Time-of-Day Cameos, Node Pulses)
const AmbientMeadowSystem = ({ theme }: { theme: string }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const motes = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: `mote-${i}`,
    left: Math.random() * 100,
    bottom: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 20 + 20, // 20-40s
    delay: Math.random() * -40,
  })), []);

  const nodes = useMemo(() => [
    { left: 15, bottom: 35, delay: 0 },
    { left: 85, bottom: 55, delay: 1.5 },
  ], []);

  const grassTufts = useMemo(() => Array.from({ length: 12 }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * -5,
  })), []);

  if (!mounted) return <div className="absolute inset-0 pointer-events-none opacity-0" />;

  return (
    <>
      <style>{`
        @keyframes moteRise {
          0% { transform: translateY(10vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        @keyframes pulseNode {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes swayGrass {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(4deg); }
        }
        @keyframes cameoWander {
          0% { transform: translate(-10vw, 10vh); opacity: 0; }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% { transform: translate(110vw, -10vh); opacity: 0; }
        }
        @keyframes cameoWanderBird {
          0% { transform: translate(110vw, 15vh) scaleX(-1); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translate(-10vw, 5vh) scaleX(-1); opacity: 0; }
        }
        .motion-safe-ambient {
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion) {
          .motion-safe-ambient { animation: none !important; transform: none !important; }
        }
      `}</style>
      
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden text-[var(--footer-ink)] opacity-50">
        
        {/* 2. POLLEN / DUST MOTES */}
        {motes.map((mote) => (
          <div
            key={mote.id}
            className="absolute rounded-full bg-current motion-safe-ambient opacity-0"
            style={{
              left: `${mote.left}%`,
              bottom: `${mote.bottom}%`,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              animation: `moteRise ${mote.duration}s linear ${mote.delay}s infinite`,
            }}
          />
        ))}

        {/* 5. NODE-PULSE FIREFLIES */}
        {nodes.map((node, i) => (
          <div
            key={`node-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-[var(--footer-accent)] motion-safe-ambient"
            style={{
              left: `${node.left}%`,
              bottom: `${node.bottom}%`,
              boxShadow: '0 0 8px 2px var(--footer-accent)',
              animation: `pulseNode 3.5s ease-in-out ${node.delay}s infinite`,
            }}
          />
        ))}

        {/* 4. ONE TIME-OF-DAY CREATURE CAMEO */}
        <div className="absolute inset-0">
          {(theme === 'day') && (
            <div className="absolute top-1/3 left-0 motion-safe-ambient opacity-0" style={{ animation: 'cameoWander 45s linear infinite' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <g className="animate-butterfly-drift-1" style={{ transformOrigin: "12px 12px" }}>
                  <path d="M 12 12 Q 8 6 4 10 Q 8 14 12 12 Z" opacity="0.6" />
                  <path d="M 12 12 Q 16 6 20 10 Q 16 14 12 12 Z" opacity="0.6" />
                </g>
              </svg>
            </div>
          )}
          {(theme === 'dawn' || theme === 'dusk') && (
            <div className="absolute top-1/4 right-0 motion-safe-ambient opacity-0" style={{ animation: 'cameoWanderBird 35s linear infinite' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 2 12 Q 6 6 12 12 Q 18 6 22 12" opacity="0.5" />
              </svg>
            </div>
          )}
          {(theme === 'night') && (
            <div className="absolute top-1/2 left-0 motion-safe-ambient opacity-0" style={{ animation: 'cameoWander 50s ease-in-out infinite' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--footer-accent)] blur-[0.5px] animate-pulse" />
            </div>
          )}
        </div>

        {/* 3. GROUND PLANE */}
        <div className="absolute bottom-0 inset-x-0 h-32 opacity-30">
          {/* Continuous ground contour line */}
          <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 100" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M 0 80 Q 250 90 500 70 T 1000 85" strokeDasharray="4 6" opacity="0.5" />
          </svg>
          
          {/* Sparse grass tufts */}
          {grassTufts.map((tuft, i) => (
            <div
              key={`grass-${i}`}
              className="absolute motion-safe-ambient origin-bottom"
              style={{
                left: `${tuft.left}%`,
                bottom: `${20 + (i % 5)}%`,
                animation: `swayGrass ${4 + (i % 3)}s ease-in-out ${tuft.delay}s infinite`,
              }}
            >
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round">
                <path d="M 4 12 Q 2 6 0 2 M 4 12 Q 4 6 4 0 M 4 12 Q 6 6 8 4" opacity="0.4" />
              </svg>
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
};

// SVG Wooden Signpost Navigation
const SignpostNav = ({ config }: { config: { text: string } }) => {
  const links = [
    { name: "HOME", href: "/", dir: "left", y: 20 },
    { name: "RESEARCH", href: "/research", dir: "right", y: 56 },
    { name: "PROJECTS", href: "/projects", dir: "left", y: 92 },
    { name: "AI LAB", href: "/ai-lab", dir: "right", y: 128 },
    { name: "BLOG", href: "/blog", dir: "left", y: 164 },
    { name: "CONTACT", href: "/contact", dir: "right", y: 200 },
    { name: "RESUME", href: "/resume", dir: "left", y: 236 }
  ];

  return (
    <div className="relative w-40 h-[320px]">
      <svg className={cn("w-full h-full overflow-visible transition-colors duration-1000", config.text)} viewBox="0 0 160 320" fill="none" stroke="currentColor">
        
        {/* Background Decorative Cluster (Trees, Flowers, Butterflies) - Strictly non-interactive */}
        <g className="pointer-events-none text-[var(--footer-ink)]" stroke="currentColor" fill="none" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Tree Left (Shifted further left and filled with leaves) */}
          <g opacity="0.6">
            <path d="M -10 320 Q -5 250 -20 210 M -7 280 Q 0 240 10 220 M -8 260 Q -25 240 -30 230" opacity="0.4" />
            <circle cx="-20" cy="210" r="15" fill="currentColor" stroke="none" opacity="0.15" />
            <circle cx="-10" cy="200" r="20" fill="currentColor" stroke="none" opacity="0.1" />
            <circle cx="10" cy="220" r="12" fill="currentColor" stroke="none" opacity="0.15" />
            <circle cx="5" cy="210" r="18" fill="currentColor" stroke="none" opacity="0.1" />
            <circle cx="-30" cy="230" r="10" fill="currentColor" stroke="none" opacity="0.15" />
            <circle cx="-20" cy="225" r="14" fill="currentColor" stroke="none" opacity="0.1" />
          </g>
          
          {/* Tree Right (Shifted further right and filled with leaves) */}
          <g opacity="0.8">
            <path d="M 170 320 Q 165 270 185 230 M 168 290 Q 160 260 150 240 M 166 270 Q 180 250 190 240" opacity="0.4" />
            <circle cx="185" cy="230" r="18" fill="currentColor" stroke="none" opacity="0.15" />
            <circle cx="175" cy="220" r="22" fill="currentColor" stroke="none" opacity="0.1" />
            <circle cx="150" cy="240" r="14" fill="currentColor" stroke="none" opacity="0.15" />
            <circle cx="160" cy="235" r="16" fill="currentColor" stroke="none" opacity="0.1" />
            <circle cx="190" cy="240" r="12" fill="currentColor" stroke="none" opacity="0.15" />
            <circle cx="180" cy="235" r="15" fill="currentColor" stroke="none" opacity="0.1" />
          </g>
          
          {/* Faint distant tree further right */}
          <path d="M 195 316 Q 190 280 200 260" strokeWidth="0.5" opacity="0.15" />
          <circle cx="200" cy="260" r="8" fill="currentColor" stroke="none" opacity="0.1" />
          
          {/* Ground Flowers (dots) */}
          <circle cx="30" cy="315" r="0.8" fill="var(--footer-accent)" stroke="none" opacity="0.7" />
          <circle cx="12" cy="318" r="0.6" fill="currentColor" stroke="none" opacity="0.4" />
          <circle cx="120" cy="317" r="1" fill="currentColor" stroke="none" opacity="0.3" />
          <circle cx="140" cy="314" r="0.8" fill="var(--footer-accent)" stroke="none" opacity="0.6" />
          <circle cx="160" cy="318" r="0.5" fill="currentColor" stroke="none" opacity="0.2" />
          <circle cx="-10" cy="319" r="0.8" fill="var(--footer-accent)" stroke="none" opacity="0.5" />

          {/* Butterflies */}
          <g className="motion-safe:animate-butterfly-drift-1" style={{ transformOrigin: "20px 40px" }}>
            {/* Butterfly 1 - Top Left */}
            <path d="M 18 38 Q 15 35 12 37 Q 15 40 18 38 Z" strokeWidth="0.4" opacity="0.6" />
            <path d="M 18 38 Q 20 34 23 35 Q 20 39 18 38 Z" strokeWidth="0.4" opacity="0.6" />
          </g>
          
          <g className="motion-safe:animate-butterfly-drift-2" style={{ transformOrigin: "140px 100px" }}>
            {/* Butterfly 2 - Mid Right */}
            <path d="M 138 98 Q 135 95 132 97 Q 135 100 138 98 Z" strokeWidth="0.3" opacity="0.4" />
            <path d="M 138 98 Q 140 94 143 95 Q 140 99 138 98 Z" strokeWidth="0.3" opacity="0.4" />
          </g>
          
          <g className="motion-safe:animate-butterfly-drift-3" style={{ transformOrigin: "40px 120px" }}>
            {/* Butterfly 3 - Mid Left Faint */}
            <path d="M 38 118 Q 36 116 34 117 Q 36 119 38 118 Z" strokeWidth="0.2" opacity="0.3" />
            <path d="M 38 118 Q 39 115 41 116 Q 39 119 38 118 Z" strokeWidth="0.2" opacity="0.3" />
          </g>
        </g>

        {/* Grass at base */}
        <path d="M 70 320 L 68 315 M 75 320 L 77 313 M 85 320 L 83 313 M 90 320 L 92 316" strokeWidth="1" strokeLinecap="round" />
        <circle cx="65" cy="318" r="1.5" fill="var(--footer-accent)" stroke="none" opacity="0.6" />
        <circle cx="95" cy="319" r="1" fill="var(--footer-accent)" stroke="none" opacity="0.6" />
        
        {/* Main Post */}
        <path d="M 77 10 L 77 320 M 83 10 L 83 320" strokeWidth="2" strokeLinecap="round" />
        <path d="M 77 10 L 83 10" strokeWidth="2" strokeLinecap="round" />
        <path d="M 75 320 L 85 320" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Wood grain on post */}
        <path d="M 79 30 L 79 70 M 81 90 L 81 140 M 80 180 L 80 230 M 79 250 L 79 310" strokeWidth="0.5" opacity="0.4" />

        {links.map((link, i) => {
          const isLeft = link.dir === "left";
          const cy = link.y + 12; // center Y
          
          // Slight alternating rotation for old wooden feel
          const rotation = isLeft ? -1.5 + (i % 2) : 1.5 - (i % 2);
          const cx = isLeft ? 85 : 75;

          const pathD = isLeft 
            ? `M 85 ${link.y} L 25 ${link.y} L 10 ${cy} L 25 ${link.y + 24} L 85 ${link.y + 24} Z`
            : `M 75 ${link.y} L 135 ${link.y} L 150 ${cy} L 135 ${link.y + 24} L 75 ${link.y + 24} Z`;

          const textX = isLeft ? 47.5 : 112.5;

          return (
            <Link href={link.href} key={link.name}>
              <g 
                className="group cursor-pointer" 
                style={{ transform: `rotate(${rotation}deg)`, transformOrigin: `${cx}px ${cy}px` }}
              >
                {/* Board */}
                <path 
                  d={pathD} 
                  style={{ fill: 'var(--footer-bg)' }}
                  strokeWidth="1.5" 
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:fill-[var(--footer-accent)]" 
                />
                
                {/* Nails */}
                <circle cx={isLeft ? 80 : 80} cy={link.y + 6} r="0.8" fill="currentColor" stroke="none" />
                <circle cx={isLeft ? 80 : 80} cy={link.y + 18} r="0.8" fill="currentColor" stroke="none" />
                
                {/* Wood grain on board */}
                <path 
                  d={isLeft ? `M 75 ${link.y + 6} L 40 ${link.y + 6} M 60 ${link.y + 18} L 30 ${link.y + 18}` : `M 85 ${link.y + 6} L 120 ${link.y + 6} M 100 ${link.y + 18} L 130 ${link.y + 18}`} 
                  strokeWidth="0.5" 
                  opacity="0.3" 
                  strokeLinecap="round"
                />
                
                {/* Text */}
                <text 
                  x={textX} 
                  y={cy} 
                  textAnchor="middle" 
                  dominantBaseline="central" 
                  fill="currentColor" 
                  stroke="none" 
                  className="font-inter text-[8.5px] font-bold tracking-[0.2em] transition-colors duration-300 group-hover:text-white"
                >
                  {link.name}
                </text>
              </g>
            </Link>
          );
        })}
      </svg>
    </div>
  );
};

export default function Footer() {
  const pathname = usePathname();
  const { timeOfDayTheme } = useLivingSystemStore();

  const [localTime, setLocalTime] = useState("");
  const timePeriodLabel = timeOfDayTheme.toUpperCase();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Route-based configuration for quotes
  const getFooterProps = () => {
    if (pathname === "/projects" || pathname === "/work") {
      return {
        quotePool: [
          "Building evolving systems.",
          "Experimental engineering at scale.",
          "Rapid iteration over perfection."
        ]
      };
    }
    if (pathname === "/research") {
      return {
        quotePool: [
          "Curiosity is the engine of progress.",
          "Reflecting on the architecture of thought.",
          "The best systems feel organic."
        ]
      };
    }
    if (pathname === "/ai-lab") {
      return {
        quotePool: [
          "MODELS: 3 ACTIVE",
          "STATUS: EXPERIMENTING",
          "SYSTEM: NOMINAL"
        ]
      };
    }
    if (pathname === "/contact") {
      return {
        quotePool: [
          "Open to ambitious ideas.",
          "Send a signal into the void.",
          "Looking for weird experiments."
        ]
      };
    }
    // Default (Home)
    return {
      quotePool: [
        "Building systems that feel slightly impossible.",
        "Agentic loops and quiet interfaces.",
        "Engineering the next paradigm."
      ]
    };
  };

  const { quotePool } = getFooterProps();

  // Time-based configuration for location
  let locationLabel = "MEADOWS";
  if (timeOfDayTheme === "dawn") locationLabel = "HORIZON";
  else if (timeOfDayTheme === "day") locationLabel = "MEADOWS";
  else if (timeOfDayTheme === "dusk") locationLabel = "MOUNTAINS";
  else if (timeOfDayTheme === "night") locationLabel = "STAR";

  // Dynamic color base dependent on global time theme
  const getThemeConfig = () => {
    return {
      bg: "bg-[var(--footer-bg)]",
      text: "text-[var(--footer-text)]",
      muted: "text-[var(--footer-ink)] opacity-70",
    };
  };

  const config = getThemeConfig();
  
  const [quote, setQuote] = useState(quotePool[0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(prev => {
        const currentIndex = quotePool.indexOf(prev);
        const nextIndex = (currentIndex + 1) % quotePool.length;
        return quotePool[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [quotePool]);

  return (
    <footer className={cn("relative w-full overflow-hidden transition-colors duration-1000 ease-[var(--ease-organic)] mt-12 md:mt-16", config.bg, config.text)}>
      <FallingLeaves />
      <AmbientMeadowSystem theme={timeOfDayTheme} />
      {/* Subtle top hairline gradient */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-current opacity-10 to-transparent mix-blend-overlay" />

      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true, margin: "-50px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-16 md:pb-20 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-8"
      >
        
        {/* Left Side: Signature & Live Status */}
        <div className="flex flex-col items-start gap-12 w-full md:w-auto relative z-10">
          
          {/* Ambient Background Element: Distant Tower */}
          <div className="absolute -z-10 -top-12 -left-36 md:-left-44 lg:-left-48 opacity-40 pointer-events-none text-[var(--footer-ink)] transition-colors duration-1000">
            <svg 
              className="w-40 h-[20rem] md:w-48 md:h-[24rem] lg:w-56 lg:h-[28rem]" 
              viewBox="0 0 120 200" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                {/* Subtle brick pattern for texture */}
                <pattern id="brickPatternSm" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 0 5 L 20 5 M 10 5 L 10 10 M 0 0 L 0 5" stroke="currentColor" strokeWidth="0.2" opacity="0.4" fill="none" />
                </pattern>
              </defs>

              {/* Solid Background Fill for the Tower */}
              <path d="M 26 190 L 26 60 L 22 60 L 22 40 L 98 40 L 98 60 L 94 60 L 94 190 Z" fill="var(--footer-bg)" stroke="none" />
              
              {/* Darker shading overlay */}
              <path d="M 26 190 L 26 60 L 94 60 L 94 190 Z" fill="currentColor" opacity="0.08" stroke="none" />
              <path d="M 26 190 L 26 60 L 94 60 L 94 190 Z" fill="url(#brickPatternSm)" stroke="none" />

              {/* Base Rocks & Ground */}
              <path d="M 5 190 Q 15 180 26 185 Q 30 170 38 185 M 115 190 Q 105 175 94 182 Q 90 165 82 175" strokeWidth="0.5" opacity="0.8" />
              <path d="M 15 180 Q 20 170 26 175 M 105 175 Q 100 160 94 170" strokeWidth="0.4" opacity="0.5" />
              
              {/* Main Tower Body */}
              <path d="M 26 185 L 26 60 M 94 185 L 94 60" strokeWidth="1" />
              
              {/* Moss details */}
              <g fill="var(--moss)" stroke="none" opacity="0.7">
                <path d="M 26 185 Q 29 160 32 185 Z" />
                <path d="M 94 185 Q 91 160 88 185 Z" />
                <path d="M 26 120 Q 32 130 26 140 Z" />
                <path d="M 94 100 Q 88 110 94 120 Z" />
                <circle cx="28" cy="135" r="3" />
                <circle cx="92" cy="115" r="4" />
                <circle cx="22" cy="180" r="5" />
                <circle cx="98" cy="178" r="6" />
              </g>

              {/* Door Arch */}
              <path d="M 42 190 L 42 165 A 18 18 0 0 1 78 165 L 78 190" strokeWidth="1.2" />
              {/* Door Outer Stone Arch */}
              <path d="M 38 190 L 38 165 A 22 22 0 0 1 82 165 L 82 190" strokeWidth="0.6" fill="currentColor" fillOpacity="0.05" />
              
              {/* Inner door details (planks) */}
              <path d="M 48 190 L 48 162 M 54 190 L 54 158 M 60 190 L 60 156 M 66 190 L 66 158 M 72 190 L 72 162" strokeWidth="0.4" opacity="0.6" />
              {/* Door hinges/band */}
              <path d="M 42 175 L 78 175 M 42 185 L 78 185" strokeWidth="0.6" />
              
              {/* Horizontal dividing bands */}
              <path d="M 26 105 Q 60 112 94 105 M 26 110 Q 60 117 94 110" strokeWidth="0.6" fill="currentColor" fillOpacity="0.1" />
              <path d="M 26 155 Q 60 162 94 155 M 26 160 Q 60 167 94 160" strokeWidth="0.6" fill="currentColor" fillOpacity="0.1" />

              {/* Arched Window */}
              <path d="M 48 90 L 48 78 A 12 12 0 0 1 72 78 L 72 90 Z" fill="currentColor" fillOpacity="0.1" />
              
              {/* Ghost in the window at night */}
              <AnimatePresence>
                {timeOfDayTheme === 'night' && (
                  <motion.g
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 0.85, y: [2, -2, 2] }}
                    exit={{ opacity: 0, y: 2 }}
                    transition={{ 
                      opacity: { duration: 2 }, 
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
                    }}
                  >
                    {/* Ghost Body */}
                    <path d="M 54 90 C 54 75 66 75 66 90 Q 63 87 60 90 Q 57 87 54 90 Z" fill="var(--footer-text)" />
                    {/* Ghost Eyes */}
                    <circle cx="58" cy="82" r="1.2" fill="var(--footer-bg)" />
                    <circle cx="62" cy="82" r="1.2" fill="var(--footer-bg)" />
                  </motion.g>
                )}
              </AnimatePresence>

              {/* Window Sill */}
              <path d="M 45 90 L 75 90 L 75 93 L 45 93 Z" strokeWidth="0.6" />
              
              {/* Corbels under parapet */}
              <path d="M 22 60 L 98 60" strokeWidth="1.2" />
              <path d="M 22 60 L 22 65 M 34 60 L 34 65 M 46 60 L 46 65 M 59 60 L 59 65 M 72 60 L 72 65 M 85 60 L 85 65 M 98 60 L 98 65" strokeWidth="0.8" />
              <path d="M 22 65 L 98 65" strokeWidth="0.8" />

              {/* Parapet Crenellations (Top) */}
              <path d="M 22 60 L 22 40 L 34 40 L 34 50 L 46 50 L 46 40 L 59 40 L 59 50 L 72 50 L 72 40 L 85 40 L 85 50 L 98 50 L 98 40 L 98 60 Z" fill="var(--footer-bg)" strokeWidth="0.8" />
              <path d="M 22 42 L 31 42 L 31 52 L 48 52 L 48 42 L 56 42 L 56 52 L 74 52 L 74 42 L 82 42 L 82 52 L 98 52" strokeWidth="0.4" opacity="0.6" />
              
              {/* Dead vines climbing up rocks on the right */}
              <path d="M 90 180 Q 100 160 95 145 T 100 130" strokeWidth="0.5" opacity="0.7" />
              <path d="M 95 145 Q 105 135 103 125" strokeWidth="0.4" opacity="0.7" />
              
            </svg>
          </div>

          {/* Live Status Module */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amber)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--amber)]"></span>
              </span>
              <span className={cn("font-inter text-[10px] tracking-widest uppercase flex items-center gap-2", config.muted)}>
                {timePeriodLabel} — {locationLabel} <span className="opacity-50">//</span> {localTime || "..."} LOCAL
              </span>
            </div>
            {/* Rotating Quote */}
            <div className="h-4 flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={quote}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={cn("font-inter text-[10px] tracking-wide", config.muted)}
                >
                  {quote}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          {/* Signature Name & Socials */}
          <div className="mt-6 flex flex-col gap-6 relative">
            <h2 className="relative z-10 font-fraunces text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] font-light">
              Param<br/>Patel<span className="text-[var(--amber)]">.</span>
            </h2>
            
            {/* Social Media Row */}
            <div className="flex items-center gap-6 mt-2">
              {[
                { name: "GitHub", icon: Github, href: "https://github.com/Param96" },
                { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/param_230/" },
                { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/param96" },
                { name: "Email", icon: Mail, href: "mailto:param@example.com" }
              ].map((social) => (
                <Link 
                  key={social.name} 
                  href={social.href}
                  target="_blank"
                  className={cn(
                    "group relative transition-all duration-300 transform hover:-translate-y-1",
                    config.muted,
                    "hover:text-[var(--amber)]"
                  )}
                  aria-label={social.name}
                >
                  <social.icon strokeWidth={1.5} className="w-5 h-5" />
                  <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[var(--amber)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Center UI Feature: Dynamic Vignette */}
        <div className="hidden md:flex flex-1 justify-center items-center h-full pb-8">
          <DynamicFooterVignette pathname={pathname} />
        </div>

        {/* Right Side: Signpost Navigation */}
        <div className="flex flex-col items-start md:items-end mt-12 md:mt-0 relative z-20">
          <SignpostNav config={config} />
          
          {/* Spacer for floating trigger buttons so they don't overlap links on small screens */}
          <div className="h-16 w-full md:hidden" />
        </div>

      </motion.div>
    </footer>
  );
}
