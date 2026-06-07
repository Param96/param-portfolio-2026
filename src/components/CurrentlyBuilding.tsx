"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Hammer } from "lucide-react";

export default function CurrentlyBuilding() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 md:py-20 z-20">
      <div 
        className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-16 glass-strong rounded-3xl p-8 md:p-12 border border-[#2F3E46]/10 shadow-[0_8px_30px_rgba(47,62,70,0.03)] transition-all duration-1000 ease-out ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-[#D4A373]/10 flex items-center justify-center shrink-0 border border-[#D4A373]/20">
            <Hammer className="w-6 h-6 text-[#D4A373]" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#606C38] mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#606C38] animate-pulse" />
              Current Focus
            </h3>
            <p className="text-lg md:text-xl font-medium text-[#354F52] leading-relaxed max-w-2xl">
              Currently building intelligent agentic AI systems, educational verification pipelines, and scalable automation workflows focused on real-world problem solving.
            </p>
          </div>
        </div>
        
        <div className="shrink-0">
          <button className="group px-6 py-3 rounded-full border border-[#2F3E46]/10 hover:border-[#D4A373]/40 hover:bg-[#E9EDC9] text-[#2F3E46] font-semibold text-sm transition-all duration-300 flex items-center gap-2">
            View Latest Research
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-[#D4A373]" />
          </button>
        </div>
      </div>
    </section>
  );
}
