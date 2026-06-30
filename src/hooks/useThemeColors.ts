"use client";

import { useEffect, useState } from "react";
import { useLivingSystemStore } from "@/lib/store";

export interface ThemeColors {
  bgMain: string;
  bgSecondary: string;
  particleColor: string;
  gridColor: string;
  accentTechnical: string;
  accentGlow: string;
  borderStrong: string;
}

export function useThemeColors(): ThemeColors {
  const { timeOfDayTheme } = useLivingSystemStore();
  const [colors, setColors] = useState<ThemeColors>({
    bgMain: "#050505",
    bgSecondary: "#0A0A0A",
    particleColor: "rgba(0,255,204,0.4)",
    gridColor: "rgba(0,112,243,0.15)",
    accentTechnical: "#00FFCC",
    accentGlow: "#33FFD6",
    borderStrong: "rgba(255,255,255,0.2)",
  });

  useEffect(() => {
    const getVar = (name: string) => {
      return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
    };

    const timer = setTimeout(() => {
      setColors({
        bgMain: getVar("--bg-main") || "#050505",
        bgSecondary: getVar("--bg-secondary") || "#0A0A0A",
        particleColor: getVar("--particle-color") || "rgba(0,255,204,0.4)",
        gridColor: getVar("--grid-color") || "rgba(0,112,243,0.15)",
        accentTechnical: getVar("--accent-technical") || "#00FFCC",
        accentGlow: getVar("--accent-glow") || "#33FFD6",
        borderStrong: getVar("--border-strong") || "rgba(255,255,255,0.2)",
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [timeOfDayTheme]);

  return colors;
}
