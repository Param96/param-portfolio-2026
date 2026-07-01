"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, StickyNoteData } from "./ui/StickyNote";
import { useLivingSystemStore } from "@/lib/store";

interface LabNotesBoardProps {
  notes: StickyNoteData[];
}

// Simple deterministic hash to seed layout offsets based on string ID
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export default function LabNotesBoard({ notes }: LabNotesBoardProps) {
  const { timeOfDayTheme } = useLivingSystemStore();
  const [expandedNote, setExpandedNote] = useState<StickyNoteData | null>(null);

  // Time-of-day driven board tones
  const BOARD_TONES = {
    dawn: "bg-[#D9CDBE]", // Warm early morning wood
    day: "bg-[#C4B7A6]",  // Neutral daylight wood
    dusk: "bg-[#B89B8D]", // Rosy evening wood
    night: "bg-[#2A2421]" // Dark rich night wood
  };

  const currentTone = BOARD_TONES[timeOfDayTheme] || BOARD_TONES.night;

  return (
    <>
      <div 
        className={`relative w-full rounded-2xl overflow-hidden p-6 md:p-12 transition-colors duration-1000 ${currentTone}`}
        style={{
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.2)",
          // Procedural Wood Grain / Cork texture via SVG filter overlay
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.05' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`
        }}
      >
        {/* Empty State */}
        {notes.length === 0 && (
          <div className="flex items-center justify-center h-64 text-black/40 dark:text-white/40 font-caveat text-2xl">
            The board is currently empty...
          </div>
        )}

        {/* Scattered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {notes.map((note, index) => {
            const seed = hashString(note._id);
            // Deterministic pseudo-random rotation between -6 and 6 degrees
            const rotationOffset = (Math.abs(seed) % 12) - 6; 
            
            // On desktop we apply a slight translation jitter so it's not a perfect grid
            const translateX = (Math.abs(seed * 2) % 20) - 10;
            const translateY = (Math.abs(seed * 3) % 20) - 10;

            const isNew = index === 0; // First item is newest since it's sorted by date desc

            return (
              <div 
                key={note._id} 
                className="relative flex items-center justify-center transition-transform duration-300 md:hover:z-50"
                style={{ 
                  transform: `translate(${translateX}px, ${translateY}px)` 
                }}
              >
                <StickyNote 
                  note={note}
                  rotationOffset={rotationOffset}
                  isNew={isNew}
                  onClick={() => setExpandedNote(note)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded Lightbox View */}
      <AnimatePresence>
        {expandedNote && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedNote(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />
            
            {/* Expanded Note Container */}
            <motion.div
              layoutId={expandedNote._id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md z-10 pointer-events-none"
            >
              {/* Use the StickyNote component but override scale/rotation and remove truncation */}
              <StickyNote 
                note={expandedNote}
                rotationOffset={0} // Force straight when expanded
                className="!aspect-auto !max-h-[80vh] overflow-y-auto pointer-events-auto"
              />
              
              <button 
                onClick={() => setExpandedNote(null)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-lg font-bold hover:scale-110 transition-transform pointer-events-auto z-[200]"
              >
                ✕
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
