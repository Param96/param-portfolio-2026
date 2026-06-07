"use client";

import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "blue" | "violet" | "indigo" | "gold" | "cyan" | "neutral" | "amber" | "emerald" | "rose";
  hover?: boolean;
}

// Mapped to Light Premium Earthy palette
const colorMap: Record<string, string> = {
  blue: "hover:border-[#D4A373]/30 hover:shadow-[0_4px_20px_rgba(221,161,94,0.1)]", // Sunlit Clay
  violet: "hover:border-[#D4A373]/30 hover:shadow-[0_4px_20px_rgba(224,122,95,0.1)]", // Burnt Peach
  indigo: "hover:border-[#52796F]/30 hover:shadow-[0_4px_20px_rgba(82,121,111,0.1)]", // Deep Teal
  gold: "hover:border-[#D4A373]/30 hover:shadow-[0_4px_20px_rgba(188,108,37,0.1)]", // Copperwood
  cyan: "hover:border-[#3D405B]/30 hover:shadow-[0_4px_20px_rgba(61,64,91,0.1)]", // Twilight Indigo
  neutral: "hover:border-[#84A98C]/30 hover:shadow-[0_4px_20px_rgba(132,169,140,0.1)]", // Muted Teal
  // Fallbacks mapped to earthy equivalents
  amber: "hover:border-[#D4A373]/30 hover:shadow-[0_4px_20px_rgba(221,161,94,0.1)]", 
  emerald: "hover:border-[#606C38]/30 hover:shadow-[0_4px_20px_rgba(96,108,56,0.1)]", // Olive Leaf
  rose: "hover:border-[#D4A373]/30 hover:shadow-[0_4px_20px_rgba(224,122,95,0.1)]",
};

export default function GlowCard({
  children,
  className = "",
  glowColor = "neutral",
  hover = true,
}: GlowCardProps) {
  return (
    <div
      className={`
        bg-[#FFFFFF] border border-[#2F3E46]/[0.08] rounded-2xl p-6 transition-all duration-300
        ${hover ? `hover:-translate-y-0.5 hover:bg-[#E9EDC9] ${colorMap[glowColor]}` : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
