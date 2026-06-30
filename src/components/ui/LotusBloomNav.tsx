"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LotusBloomNav() {
  const navLinks = useMemo(() => [
    { href: "/", label: "Home" },
    { href: "/research", label: "Research" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/ai-lab", label: "AI Lab" },
    { href: "/contact", label: "Contact" },
  ], []);

  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Prevent scrolling when canopy is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleNav = () => setIsOpen(!isOpen);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (pathname === href) {
      setIsOpen(false);
      return;
    }
    
    // Smoothly close nav then route
    setIsOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 600);
  };

  // Organic ease for unfurling
  const unfurlEase = [0.34, 1.56, 0.64, 1]; // ease-out-back

  // Pre-calculate geometry and random organic offsets for the spokes
  const NUM_PETALS = navLinks.length;
  const spokes = useMemo(() => {
    return navLinks.map((link, i) => {
      // Simple pseudo-random function for organic variation based on index
      const rand = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };

      const baseAngleDeg = (360 / NUM_PETALS) * i;
      
      // Random variations (5-10%)
      const outerScale = 0.95 + rand(i * 1.1) * 0.1;
      const innerScale = 0.95 + rand(i * 2.2) * 0.1;
      const outerRotOffset = (rand(i * 3.3) - 0.5) * 10;
      const innerRotOffset = (rand(i * 4.4) - 0.5) * 10;
      const outerWidthScale = 0.9 + rand(i * 5.5) * 0.2;
      const innerWidthScale = 0.9 + rand(i * 6.6) * 0.2;

      const outerAngleDeg = baseAngleDeg + outerRotOffset;
      // Stagger inner ring by ~half step
      const innerAngleDeg = baseAngleDeg + (360 / NUM_PETALS / 2) + innerRotOffset;

      const outerAngleRad = (outerAngleDeg * Math.PI) / 180;
      
      const OUTER_RADIUS = 240 * outerScale;
      
      // Make the text layout slightly elliptical to bring top/bottom labels closer
      // Horizontal labels spread out to 320, vertical labels tuck in to 260
      const LABEL_X_RADIUS = 320;
      const LABEL_Y_RADIUS = 260;

      // Tip coordinates for the leader line (outer petal points UP initially, so tip is at -Y)
      const tipX = Math.sin(outerAngleRad) * OUTER_RADIUS;
      const tipY = -Math.cos(outerAngleRad) * OUTER_RADIUS;

      // Label coordinates
      const labelX = Math.sin(outerAngleRad) * LABEL_X_RADIUS;
      const labelY = -Math.cos(outerAngleRad) * LABEL_Y_RADIUS;

      // Text Anchor logic
      let textAnchor: "start" | "middle" | "end" = "middle";
      if (labelX > 50) textAnchor = "start";
      else if (labelX < -50) textAnchor = "end";

      return {
        ...link,
        i,
        outerAngleDeg,
        innerAngleDeg,
        outerScale,
        innerScale,
        outerWidthScale,
        innerWidthScale,
        tipX,
        tipY,
        labelX,
        labelY,
        textAnchor,
      };
    });
  }, []);

  // Stamen dots geometry
  const STAMEN_DOTS = 7;

  return (
    <>
      {/* The Full-Screen Dark Overlay for the Lotus */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* The SVG Lotus Canvas */}
            <div className="relative w-full h-full max-w-[1200px] max-h-[1200px] flex items-center justify-center pointer-events-none">
              
              <svg 
                viewBox="-500 -500 1000 1000" 
                className="w-full h-full overflow-visible pointer-events-auto"
              >
                <defs>
                  {/* Outer Petal Gradient: deep terracotta -> mid coral -> pale cream-coral */}
                  <linearGradient id="outerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#712B13" />
                    <stop offset="40%" stopColor="#993C1D" />
                    <stop offset="70%" stopColor="#D85A30" />
                    <stop offset="100%" stopColor="#F5C4B3" />
                  </linearGradient>

                  {/* Inner Petal Gradient: darker/saturated version */}
                  <linearGradient id="innerGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#4A1B0C" />
                    <stop offset="30%" stopColor="#712B13" />
                    <stop offset="65%" stopColor="#BA421A" />
                    <stop offset="100%" stopColor="#E69D83" />
                  </linearGradient>

                  {/* Central Glow */}
                  <radialGradient id="centerGlow">
                    <stop offset="0%" stopColor="#FAC775" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FAC775" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* --- RENDER ALL SPOKES --- */}
                {spokes.map((spoke) => {
                  const isHovered = hoveredLink === spoke.href;
                  const isCurrent = pathname === spoke.href;
                  const isActive = isHovered || isCurrent;
                  
                  // Base path sizes before scaling
                  const outerL = 240;
                  const outerW = 75 * spoke.outerWidthScale; 
                  // Tapered teardrop: narrow at base(0,0), widest at 60%, rounded tip
                  const outerPath = `M 0 0 C -${outerW} -${outerL*0.4} -${outerW*1.2} -${outerL*0.8} 0 -${outerL} C ${outerW*1.2} -${outerL*0.8} ${outerW} -${outerL*0.4} 0 0`;
                  
                  const innerL = 140;
                  const innerW = 45 * spoke.innerWidthScale;
                  const innerPath = `M 0 0 C -${innerW} -${innerL*0.4} -${innerW*1.2} -${innerL*0.8} 0 -${innerL} C ${innerW*1.2} -${innerL*0.8} ${innerW} -${innerL*0.4} 0 0`;

                  return (
                    <g 
                      key={spoke.href} 
                      className="cursor-pointer group"
                      onMouseEnter={() => setHoveredLink(spoke.href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={(e: any) => handleLinkClick(e, spoke.href)}
                      role="link"
                      aria-label={spoke.label}
                    >
                      {/* OUTER PETAL (rendered first so it sits behind inner) */}
                      <g transform={`rotate(${spoke.outerAngleDeg})`}>
                        <motion.g
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: spoke.outerScale, rotate: 0 }}
                          transition={{ 
                            duration: 0.9, 
                            ease: unfurlEase, 
                            delay: 0.42 + (spoke.i * 0.06) 
                          }}
                          style={{ originX: 0.5, originY: 1 }}
                        >
                          <motion.g
                            animate={{ 
                              scale: isActive ? 1.05 : 1,
                              opacity: isActive ? 1 : 0.35,
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{ originX: 0.5, originY: 1 }}
                          >
                            {/* Petal Body */}
                            <path 
                              d={outerPath} 
                              fill="url(#outerGradient)" 
                              stroke="#4A1B0C" 
                              strokeWidth="0.5" 
                              strokeOpacity={isActive ? 0.8 : 0.4}
                              style={{ 
                                filter: isActive ? 'saturate(1) drop-shadow(0 0 15px rgba(250,199,117,0.4))' : 'saturate(0.3)' 
                              }}
                              className="transition-all duration-300"
                            />
                            {/* Center Vein */}
                            <path 
                              d={`M 0 0 L 0 -${outerL * 0.95}`} 
                              stroke="#4A1B0C" 
                              strokeWidth="0.6" 
                              strokeOpacity={0.4} 
                            />
                            {/* Optional side veins (faint) */}
                            <path d={`M 0 -${outerL*0.3} Q -${outerW*0.4} -${outerL*0.5} -${outerW*0.6} -${outerL*0.45}`} stroke="#4A1B0C" strokeWidth="0.4" strokeOpacity={0.2} fill="none" />
                            <path d={`M 0 -${outerL*0.3} Q ${outerW*0.4} -${outerL*0.5} ${outerW*0.6} -${outerL*0.45}`} stroke="#4A1B0C" strokeWidth="0.4" strokeOpacity={0.2} fill="none" />
                          </motion.g>
                        </motion.g>
                      </g>

                      {/* INNER PETAL (rendered on top) */}
                      <g transform={`rotate(${spoke.innerAngleDeg})`}>
                        <motion.g
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: spoke.innerScale, rotate: 0 }}
                          transition={{ 
                            duration: 0.8, 
                            ease: unfurlEase, 
                            delay: spoke.i * 0.06 
                          }}
                          style={{ originX: 0.5, originY: 1 }}
                        >
                          <motion.g
                            animate={{ 
                              scale: isActive ? 1.06 : 1,
                              opacity: isActive ? 1 : 0.35,
                            }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{ originX: 0.5, originY: 1 }}
                          >
                            {/* Petal Body */}
                            <path 
                              d={innerPath} 
                              fill="url(#innerGradient)" 
                              stroke="#4A1B0C" 
                              strokeWidth="0.5" 
                              strokeOpacity={isActive ? 0.8 : 0.4}
                              style={{ 
                                filter: isActive ? 'saturate(1) drop-shadow(0 0 10px rgba(250,199,117,0.4))' : 'saturate(0.3)' 
                              }}
                              className="transition-all duration-300"
                            />
                            {/* Center Vein */}
                            <path 
                              d={`M 0 0 L 0 -${innerL * 0.95}`} 
                              stroke="#4A1B0C" 
                              strokeWidth="0.6" 
                              strokeOpacity={0.4} 
                            />
                          </motion.g>
                        </motion.g>
                      </g>

                      {/* LEADER LINE (fades in) */}
                      <motion.line 
                        x1={spoke.tipX} 
                        y1={spoke.tipY} 
                        x2={spoke.labelX} 
                        y2={spoke.labelY} 
                        stroke="#73726c" 
                        strokeWidth="1" 
                        strokeDasharray="4 4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0.4 }}
                        transition={{ duration: 1, delay: 1 }}
                        className="pointer-events-none"
                      />

                      {/* LABEL (stays upright, placed radially outside) */}
                      <motion.text
                        x={spoke.labelX}
                        y={spoke.labelY}
                        textAnchor={spoke.textAnchor}
                        alignmentBaseline="middle"
                        className="font-fraunces text-2xl tracking-wider transition-colors duration-300"
                        fill={isActive ? "#D85A30" : "#FAF6F0"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 + (spoke.i * 0.05) }}
                        style={{ 
                          // Slight letter spacing increase on hover
                          letterSpacing: isActive ? '0.15em' : '0.1em'
                        }}
                      >
                        {spoke.label}
                      </motion.text>
                    </g>
                  );
                })}

                {/* CENTER STAMEN / SEED POD CLUSTER */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="pointer-events-none"
                >
                  {/* Pulsing Radial Glow */}
                  <motion.circle 
                    cx="0" cy="0" r="120" 
                    fill="url(#centerGlow)"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  {/* Seed Pod Circles */}
                  <circle cx="0" cy="0" r="5" fill="#FAC775" />
                  {Array.from({ length: STAMEN_DOTS }).map((_, i) => {
                    const angle = (i * Math.PI * 2) / STAMEN_DOTS;
                    const r = 14; // ring radius
                    return (
                      <circle 
                        key={i}
                        cx={Math.cos(angle) * r} 
                        cy={Math.sin(angle) * r} 
                        r="3.5" 
                        fill="#FAC775" 
                      />
                    );
                  })}
                  {Array.from({ length: STAMEN_DOTS }).map((_, i) => {
                    const angle = ((i + 0.5) * Math.PI * 2) / STAMEN_DOTS;
                    const r = 26; // outer ring radius
                    return (
                      <circle 
                        key={`outer-${i}`}
                        cx={Math.cos(angle) * r} 
                        cy={Math.sin(angle) * r} 
                        r="2.5" 
                        fill="#FAC775" 
                        opacity={0.8}
                      />
                    );
                  })}
                </motion.g>

              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Floating Button (Minimalist Line-Art Lotus) */}
      <motion.button
        onClick={toggleNav}
        whileHover="hover"
        className={cn(
          "fixed bottom-6 right-6 z-[110] w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 group focus:outline-none focus:ring-4 focus:ring-[#FAC775]/30",
          isOpen 
            ? "bg-[#1a1a1a] border border-[#F5C4B3]/20 hover:border-[#D85A30] shadow-[0_0_20px_rgba(250,199,117,0.2)]" 
            : "bg-[#D85A30] hover:bg-[#E3693F] shadow-[0_0_30px_rgba(250,199,117,0.35)] hover:shadow-[0_0_40px_rgba(250,199,117,0.5)] border border-transparent"
        )}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              // Closed State: Top-down 6-petal botanical line-art lotus
              <motion.svg
                key="botanical-lotus"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#FAF6F0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={{
                  hover: { scale: 1.08, transition: { duration: 0.25, ease: "easeOut" } }
                }}
              >
                {/* 6 Symmetrical Petals */}
                <g style={{ transformOrigin: "16px 16px" }}>
                  <path d="M 16 16 C 12 8 16 2 16 2 C 16 2 20 8 16 16 Z" />
                  <path d="M 16 16 C 12 8 16 2 16 2 C 16 2 20 8 16 16 Z" transform="rotate(60 16 16)" />
                  <path d="M 16 16 C 12 8 16 2 16 2 C 16 2 20 8 16 16 Z" transform="rotate(120 16 16)" />
                  <path d="M 16 16 C 12 8 16 2 16 2 C 16 2 20 8 16 16 Z" transform="rotate(180 16 16)" />
                  <path d="M 16 16 C 12 8 16 2 16 2 C 16 2 20 8 16 16 Z" transform="rotate(240 16 16)" />
                  <path d="M 16 16 C 12 8 16 2 16 2 C 16 2 20 8 16 16 Z" transform="rotate(300 16 16)" />
                  {/* Small center stamen dot */}
                  <circle cx="16" cy="16" r="1.5" fill="#FAC775" stroke="none" />
                </g>
              </motion.svg>
            ) : (
              // Open State: Closed Bud / Rotated Close State
              <motion.svg
                key="close-bud"
                viewBox="0 0 32 32"
                fill="none"
                stroke="#FAF6F0"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 15 }} // Rotated 15 degrees as requested
                exit={{ scale: 0, rotate: -180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                variants={{
                  hover: { scale: 1.05, rotate: 0 }
                }}
              >
                {/* A tightly closed, rotated bud indicating "Close" */}
                <path d="M 16 28 C 16 28 24 18 16 4 C 8 18 16 28 16 28 Z" className="fill-[#F5C4B3]/10" />
                <path d="M 16 28 C 16 28 6 22 6 12 C 6 8 13 6 16 4" />
                <path d="M 16 28 C 16 28 26 22 26 12 C 26 8 19 6 16 4" />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </>
  );
}
