"use client";

import { useEffect } from "react";
import { useLivingSystemStore } from "@/lib/store";
import { getVisitorTimeTheme } from "@/lib/presence";

export default function LivingSystemProvider() {
  const { 
    setTimeOfDayTheme, 
    incrementVisitCount, 
    toggleTerminal,
    timeOfDayTheme
  } = useLivingSystemStore();

  // Initialization (Time theme and Visit count)
  useEffect(() => {
    // 1. Calculate and set time-of-day theme
    const theme = getVisitorTimeTheme();
    setTimeOfDayTheme(theme);
    
    // Apply to document element for CSS variable mapping
    document.documentElement.setAttribute('data-theme', theme);

    // 2. Progressive Discovery: increment visit count
    incrementVisitCount();
  }, [setTimeOfDayTheme, incrementVisitCount]);

  // Reactive theme changes (in case state changes during session)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', timeOfDayTheme);
  }, [timeOfDayTheme]);

  // Global Keystroke Listener (The "God Mode" Terminal trigger)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger on '~' or '`'
      if (e.key === '`' || e.key === '~') {
        // Prevent default to avoid typing the character if focus is in an input
        // unless they are explicitly in an input where it matters (we can refine later)
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return; // Don't trigger if typing in a form
        }
        e.preventDefault();
        toggleTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTerminal]);

  return null; // This is a logic-only provider
}
