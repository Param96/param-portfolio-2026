"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function QuotesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Scroll Progress Rail
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const railScaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      
      // Check if mouse is within section
      if (
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right
      ) {
        setIsHovering(true);
        // Relative to container
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full pt-20 pb-40 px-6 md:px-24 relative overflow-hidden"
    >
      {/* ── BACKGROUND MOTIF ── */}
      <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-[0.03] pointer-events-none text-[var(--text-main)]">
        {/* Abstract topographic / contour SVG */}
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M10,100 C40,20 160,20 190,100 C160,180 40,180 10,100 Z" />
          <path d="M30,100 C50,40 150,40 170,100 C150,160 50,160 30,100 Z" />
          <path d="M50,100 C70,60 130,60 150,100 C130,140 70,140 50,100 Z" />
          <path d="M70,100 C80,80 120,80 130,100 C120,120 80,120 70,100 Z" />
          <circle cx="100" cy="100" r="4" />
        </svg>
      </div>

      {/* ── CURSOR FIREFLY ── */}
      <motion.div 
        className="absolute w-8 h-8 rounded-full bg-[var(--amber)] mix-blend-screen pointer-events-none z-0 hidden md:block"
        style={{
          filter: "blur(12px)",
          boxShadow: "0 0 30px 15px var(--amber)",
        }}
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          opacity: isHovering ? 0.3 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.5
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* ── QUOTES STACK (With Rail on Left Border) ── */}
        <div className="flex flex-col gap-24 relative border-l border-[var(--border-line)] pl-8 md:pl-16 py-8">
          
          {/* Active Rail (Signal orange) */}
          <motion.div 
            className="absolute top-0 left-[-1px] w-[2px] bg-[var(--amber)] origin-top"
            style={{ scaleY: railScaleY, height: "100%" }}
          />

          {/* Kicker */}
          <div className="mb-[-2rem] relative">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--amber)]">
              In My Own Words
            </span>
          </div>

          {/* Quote 1 */}
          <div className="relative">
            {/* Rail Dot */}
            <div className="absolute left-[-2rem] md:left-[-4rem] -translate-x-[4px] top-6 w-2 h-2 rounded-full bg-[var(--border-line)] border border-[var(--bg-main)]" />
            
            <div className="text-xs font-mono opacity-30 tracking-widest mb-4">
              01 /
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[clamp(2.5rem,5vw,5rem)] font-light tracking-tighter text-[var(--text-main)] leading-[1.1] max-w-4xl"
            >
              "I like ambitious people with weird ideas."
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-[var(--text-main)]"
            >
              — On Collaboration
            </motion.div>
          </div>

          {/* Divider */}
          <div className="w-full flex items-center justify-start opacity-20 my-[-2rem]">
            <span className="text-xl text-[var(--text-main)]">・</span>
          </div>
          
          {/* Quote 2 */}
          <div className="relative pb-12">
            {/* Rail Dot */}
            <div className="absolute left-[-2rem] md:left-[-4rem] -translate-x-[4px] top-6 w-2 h-2 rounded-full bg-[var(--border-line)] border border-[var(--bg-main)]" />
            
            <div className="text-xs font-mono opacity-30 tracking-widest mb-4">
              02 /
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[clamp(2.5rem,6vw,5.5rem)] font-serif italic tracking-tighter text-[var(--amber-deep)] leading-[1.4] max-w-5xl"
            >
              "I enjoy building systems that feel slightly impossible."
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 text-[var(--text-main)]"
            >
              — On Building
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
