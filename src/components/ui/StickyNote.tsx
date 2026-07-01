"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { format } from "date-fns";

export type PinStyle = "pin" | "tape" | "thread";
export type NoteColor = "parchment" | "moss" | "clay" | "dusk";
export type NoteTag = "experiment" | "idea" | "shipped" | "reading";

export interface StickyNoteData {
  _id: string;
  title?: string;
  body: string;
  color: NoteColor;
  pinStyle: PinStyle;
  tag?: NoteTag;
  publishedAt: string;
}

interface StickyNoteProps {
  note: StickyNoteData;
  rotationOffset: number; // passed from board for deterministic scatter
  className?: string;
  onClick?: () => void;
  isNew?: boolean; // True if it's the newest note, for an entrance animation
}

// ─────────────────────────────────────────────────────────
// COLOR MAPS
// ─────────────────────────────────────────────────────────
const COLOR_MAP: Record<NoteColor, { bg: string, text: string, shadow: string, border: string }> = {
  parchment: { bg: "#F4F1EA", text: "#4A4641", shadow: "rgba(0,0,0,0.1)", border: "#EAE5D9" },
  moss: { bg: "#E5E9E1", text: "#3D4A3E", shadow: "rgba(0,0,0,0.1)", border: "#D8E0D2" },
  clay: { bg: "#F1E5E1", text: "#5C4640", shadow: "rgba(0,0,0,0.1)", border: "#E8D3CD" },
  dusk: { bg: "#EAE7EE", text: "#423E4D", shadow: "rgba(0,0,0,0.1)", border: "#DCD7E2" },
};

const TAG_COLORS: Record<NoteTag, string> = {
  experiment: "#E27B58", // Muted orange
  idea: "#F2B84B",       // Muted yellow
  shipped: "#5B8E7D",    // Muted teal
  reading: "#7C77B9",    // Muted purple
};

// ─────────────────────────────────────────────────────────
// SVG ASSETS (Pins, Tape, Thread)
// ─────────────────────────────────────────────────────────
const PinDot = () => (
  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 w-3 h-3 rounded-full bg-zinc-700 shadow-md flex items-center justify-center filter drop-shadow-sm">
    <div className="w-1 h-1 rounded-full bg-zinc-400 opacity-60 relative top-[-1px] left-[-1px]" />
  </div>
);

const TapeStrip = () => (
  <div 
    className="absolute top-[-10px] left-1/2 -translate-x-1/2 z-10 w-16 h-6 bg-white/40 backdrop-blur-sm shadow-sm"
    style={{ transform: 'translateX(-50%) rotate(-3deg)', border: '1px solid rgba(255,255,255,0.3)', clipPath: 'polygon(0% 10%, 100% 0%, 95% 100%, 5% 90%)' }}
  />
);

const ThreadLine = () => (
  <svg className="absolute top-[-20px] left-[-20px] w-12 h-12 z-10 opacity-60 pointer-events-none drop-shadow-sm" viewBox="0 0 50 50">
    <path d="M0,0 Q25,25 35,35" fill="none" stroke="#888" strokeWidth="1.5" strokeDasharray="2 1" />
    <circle cx="35" cy="35" r="2" fill="#888" />
  </svg>
);

export function StickyNote({ note, rotationOffset, className = "", onClick, isNew }: StickyNoteProps) {
  const reducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const theme = COLOR_MAP[note.color] || COLOR_MAP.parchment;

  // Interaction Variants
  const variants = {
    idle: {
      rotate: rotationOffset,
      scale: 1,
      y: 0,
      boxShadow: `2px 4px 12px ${theme.shadow}`,
    },
    hover: {
      rotate: rotationOffset > 0 ? 1 : -1, // slight de-rotation
      scale: 1.03,
      y: -4, // slight lift
      boxShadow: `4px 12px 24px ${theme.shadow}`,
    },
    tap: {
      scale: 0.98,
      boxShadow: `1px 2px 6px ${theme.shadow}`,
    }
  };

  return (
    <motion.div
      initial={isNew && !reducedMotion ? { opacity: 0, y: -20, rotate: rotationOffset - 10, scale: 1.1 } : "idle"}
      animate="idle"
      whileHover={reducedMotion ? "idle" : "hover"}
      whileTap={reducedMotion ? "idle" : "tap"}
      variants={variants}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative w-full aspect-square md:aspect-[4/3] p-5 cursor-pointer rounded-sm ${className}`}
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        border: `1px solid ${theme.border}`,
        // Subtle paper texture noise
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
      }}
    >
      {/* Visual Fasteners */}
      {note.pinStyle === "tape" && <TapeStrip />}
      {note.pinStyle === "thread" && <ThreadLine />}
      {(note.pinStyle === "pin" || !note.pinStyle) && <PinDot />}

      {/* Tag Badge */}
      {note.tag && (
        <div 
          className="absolute bottom-3 right-3 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm opacity-80"
          style={{ backgroundColor: TAG_COLORS[note.tag] || "#ccc", color: "#fff" }}
        >
          {note.tag}
        </div>
      )}

      {/* Date */}
      <div className="text-[10px] opacity-50 font-inter mb-2 uppercase tracking-widest">
        {format(new Date(note.publishedAt), "MMM dd, yyyy")}
      </div>

      {/* Title */}
      {note.title && (
        <h4 className="font-bold text-sm mb-1 font-inter">
          {note.title}
        </h4>
      )}

      {/* Body Content - Hand-written font style */}
      <div 
        className="text-base leading-relaxed overflow-hidden font-caveat"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 5, // restrict to ~5 lines before truncation
          WebkitBoxOrient: "vertical",
        }}
      >
        {note.body}
      </div>
      
      {/* New Badge (only visible if isNew is true and passed explicitly) */}
      {isNew && (
        <motion.div 
          initial={{ opacity: 0, scale: 0 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.5 }}
          className="absolute -top-3 -right-3 bg-red-500 text-white text-[9px] font-bold px-2 py-1 rounded-full uppercase shadow-sm z-20 font-inter tracking-wider rotate-12"
        >
          New
        </motion.div>
      )}
    </motion.div>
  );
}
