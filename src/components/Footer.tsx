"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { DynamicFooterVignette } from "./ui/FooterVignettes";

// Highly Optimized Falling Leaves Animation Background (Pure CSS, Hardware Accelerated)
const FallingLeaves = () => {
  const [leaves, setLeaves] = useState<{ id: number; left: number; duration: number; delay: number; sway: number }[]>([]);

  useEffect(() => {
    // Generate fewer leaves (8 instead of 12) to reduce DOM nodes
    const newLeaves = Array.from({ length: 8 }).map((_, i) => ({
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

export default function Footer() {
  const pathname = usePathname();

  const [localTime, setLocalTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("MORNING");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }));
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) setTimePeriod("MORNING");
      else if (hour >= 12 && hour < 17) setTimePeriod("AFTERNOON");
      else if (hour >= 17 && hour < 20) setTimePeriod("EVENING");
      else setTimePeriod("NIGHT");
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  // Route-based configuration
  const getFooterProps = () => {
    if (pathname === "/projects" || pathname === "/work") {
      return {
        locationTheme: "daylight" as const,
        locationLabel: "FIELD",
        quotePool: [
          "Building evolving systems.",
          "Experimental engineering at scale.",
          "Rapid iteration over perfection."
        ]
      };
    }
    if (pathname === "/research") {
      return {
        locationTheme: "dusk" as const,
        locationLabel: "RIDGE",
        quotePool: [
          "Curiosity is the engine of progress.",
          "Reflecting on the architecture of thought.",
          "The best systems feel organic."
        ]
      };
    }
    if (pathname === "/ai-lab") {
      return {
        locationTheme: "night" as const, 
        locationLabel: "CORE",
        quotePool: [
          "MODELS: 3 ACTIVE",
          "STATUS: EXPERIMENTING",
          "SYSTEM: NOMINAL"
        ]
      };
    }
    if (pathname === "/contact") {
      return {
        locationTheme: "night" as const,
        locationLabel: "HOLLOW",
        quotePool: [
          "Open to ambitious ideas.",
          "Send a signal into the void.",
          "Looking for weird experiments."
        ]
      };
    }
    // Default (Home)
    return {
      locationTheme: "morning" as const,
      locationLabel: "MEADOW",
      quotePool: [
        "Building systems that feel slightly impossible.",
        "Agentic loops and quiet interfaces.",
        "Engineering the next paradigm."
      ]
    };
  };

  const { locationTheme, locationLabel, quotePool } = getFooterProps();

  // Dynamic color base dependent on local time
  const getThemeConfig = () => {
    switch (timePeriod) {
      case "AFTERNOON":
        return {
          bg: "bg-[var(--bark)]",
          text: "text-[var(--cream)]",
          muted: "text-white/40",
        };
      case "EVENING":
        return {
          bg: "bg-[var(--graphite)]",
          text: "text-[var(--cream)]",
          muted: "text-white/40",
        };
      case "NIGHT":
        return {
          bg: "bg-[var(--void)]",
          text: "text-[var(--silver)]",
          muted: "text-white/40",
        };
      case "MORNING":
      default:
        return {
          bg: "bg-[var(--cream)]",
          text: "text-[var(--text-main)]",
          muted: "text-[var(--moss)]",
        };
    }
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
        <div className="flex flex-col items-start gap-12 w-full md:w-auto">
          {/* Live Status Module */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--amber)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--amber)]"></span>
              </span>
              <span className={cn("font-inter text-[10px] tracking-widest uppercase flex items-center gap-2", config.muted)}>
                {timePeriod} — {locationLabel} <span className="opacity-50">//</span> {localTime || "..."} LOCAL
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
          <div className="mt-6 flex flex-col gap-6">
            <h2 className="font-fraunces text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] font-light">
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

        {/* Right Side: Stacked Nav Links */}
        <div className="flex flex-col items-start md:items-end gap-5 mt-8 md:mt-0 relative z-20">
          {[
            { name: "Home", href: "/" },
            { name: "Research", href: "/research" },
            { name: "Projects", href: "/projects" },
            { name: "AI Lab", href: "/ai-lab" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" }
          ].map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className={cn(
                "group flex items-center gap-3 md:gap-4 transition-all duration-300 transform hover:-translate-y-[2px]", 
                config.text,
                "hover:text-[var(--amber)]"
              )}
            >
              {/* Glyph */}
              <span className={cn("font-inter text-xs opacity-40 group-hover:opacity-100 transition-opacity duration-300 group-hover:text-[var(--amber)]")}>
                —
              </span>
              
              {/* Text with center-underline */}
              <div className="relative font-inter text-sm md:text-base uppercase tracking-widest">
                {link.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[var(--amber)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </div>
            </Link>
          ))}
          
          {/* Spacer for floating trigger buttons so they don't overlap links on small screens */}
          <div className="h-16 w-full md:hidden" />
        </div>

      </motion.div>
    </footer>
  );
}
