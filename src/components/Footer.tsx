"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useLivingSystemStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();

  // Route-based configuration
  const getFooterProps = () => {
    if (pathname === "/projects" || pathname === "/work") {
      return {
        locationTheme: "daylight" as const,
        signatureLabel: "DAYLIGHT — FIELD",
        quotePool: [
          "Building evolving systems.",
          "Experimental engineering at scale.",
          "Rapid iteration over perfection."
        ]
      };
    }
    if (pathname === "/resume" || pathname === "/about") {
      return {
        locationTheme: "dusk" as const,
        signatureLabel: "DUSK — RIDGE",
        quotePool: [
          "Curiosity is the engine of progress.",
          "Reflecting on the architecture of thought.",
          "The best systems feel organic."
        ]
      };
    }
    if (pathname === "/contact") {
      return {
        locationTheme: "night" as const,
        signatureLabel: "NIGHT — HOLLOW",
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
      signatureLabel: "MORNING — MEADOW",
      quotePool: [
        "Building systems that feel slightly impossible.",
        "Agentic loops and quiet interfaces.",
        "Engineering the next paradigm."
      ]
    };
  };

  const { locationTheme, signatureLabel, quotePool } = getFooterProps();

  const getThemeConfig = () => {
    switch (locationTheme) {
      case "morning":
        return {
          bg: "bg-[var(--cream)]",
          border: "border-text-primary/10",
          text: "text-[var(--text-main)]",
          muted: "text-[var(--moss)]",
          motif: (
            <svg className="w-48 h-48 opacity-5 text-current" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path d="M50 90 Q30 50 50 10 Q70 50 50 90 Z" strokeWidth="0.5"/>
              <path d="M50 10 V90" strokeWidth="0.5"/>
            </svg>
          )
        };
      case "daylight":
        return {
          bg: "bg-[var(--bark)]",
          border: "border-text-primary/15",
          text: "text-[var(--cream)]",
          muted: "text-white/40",
          motif: (
            <svg className="w-64 h-64 opacity-5 text-current" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="40" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="30" strokeWidth="0.5"/>
              <circle cx="50" cy="50" r="20" strokeWidth="0.5"/>
            </svg>
          )
        };
      case "dusk":
        return {
          bg: "bg-gradient-to-b from-[var(--cream)] to-[var(--graphite)]",
          border: "border-black/10",
          text: "text-[var(--text-main)]",
          muted: "text-black/40",
          motif: (
            <div className="w-full h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-10 mt-12" />
          )
        };
      case "night":
        return {
          bg: "bg-[var(--void)]",
          border: "border-white/10",
          text: "text-[var(--silver)]",
          muted: "text-white/40",
          motif: (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
               <div className="w-1 h-1 bg-[var(--amber)] rounded-full blur-[1px] absolute top-1/4 left-1/4" />
               <div className="w-1.5 h-1.5 bg-[var(--amber)] rounded-full blur-[2px] absolute top-1/3 right-1/3" />
            </div>
          )
        };
      default:
        return { bg: "bg-[var(--cream)]", border: "border-text-primary/10", text: "text-[var(--text-main)]", muted: "text-[var(--moss)]", motif: null };
    }
  };

  const config = getThemeConfig();
  
  // Pick a random quote on mount
  const [quote, setQuote] = useState(quotePool[0]);
  useEffect(() => {
    setQuote(quotePool[Math.floor(Math.random() * quotePool.length)]);
  }, [quotePool]);

  return (
    <footer className={cn("relative w-full py-16 overflow-hidden transition-colors duration-1000 ease-[var(--ease-organic)] mt-24 border-t", config.bg, config.border)}>
      
      {/* Decorative Motif */}
      <div className={cn("absolute right-0 bottom-0 pointer-events-none flex items-end justify-end p-12", config.text)}>
        {config.motif}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col h-full justify-between gap-24">
        
        {/* Top: Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-50px" }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className={cn("text-2xl md:text-3xl font-serif italic tracking-tight leading-[1.3]", config.text)}>
            "{quote}"
          </p>
        </motion.div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-12 md:gap-4 pb-8">
          
          {/* Left: Signature */}
          <div className="flex flex-col items-start gap-1">
            <span className={cn("font-fraunces text-lg md:text-xl font-medium tracking-tight", config.text)}>
              Param Patel
            </span>
            <span className={cn("font-inter text-[10px] uppercase tracking-widest", config.muted)}>
              {signatureLabel}
            </span>
          </div>

          {/* Center: Nav Links */}
          <div className="flex items-center md:justify-center gap-6 md:gap-8">
            {[
              { name: "Home", href: "/" },
              { name: "Work", href: "/projects" },
              { name: "About", href: "/resume" }, // Or '/about' if exists, using /resume for now
              { name: "Contact", href: "/contact" }
            ].map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={cn("relative group font-inter text-[10px] uppercase tracking-widest transition-colors duration-500", config.muted, "hover:text-[var(--amber)]")}
              >
                {link.name}
                {/* Underline-in-from-center effect */}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[1px] bg-[var(--amber)] transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </Link>
            ))}
          </div>

          {/* Right: Terminal Toggle Anchor */}
          <div className="flex md:justify-end items-end h-[48px]">
            {/* The actual OracleRootTrigger floats, but this serves as the structural anchor space for it.
                We leave this space empty so the fixed trigger doesn't overlap content. */}
          </div>
        </div>

      </div>
    </footer>
  );
}
