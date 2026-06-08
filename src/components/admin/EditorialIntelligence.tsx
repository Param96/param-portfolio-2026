"use client";

import { Brain, Flame, MousePointerClick, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function EditorialIntelligence() {
  const [insights, setInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // In the future, this will be true while fetching

  // We will fetch from PostHog API here once configured
  // useEffect(() => { ... }, []);

  return (
    <div className="w-full bg-[#111] border border-white/5 rounded-2xl p-6 mt-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#FEFAE0]">Editorial Intelligence & Resonance</h3>
        <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">PostHog Engine</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40 font-bold">
          <div className="col-span-5">Signal Source</div>
          <div className="col-span-2 text-right">Reads</div>
          <div className="col-span-2 text-right">Avg. Depth</div>
          <div className="col-span-3 text-right">Resonance / Duration</div>
        </div>

        {insights.length > 0 ? (
          insights.map((insight, i) => (
            <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg items-center group cursor-pointer">
              {/* Data rendering goes here */}
            </div>
          ))
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center border border-white/5 rounded-lg bg-white/[0.02]">
            <AlertCircle className="w-6 h-6 text-white/20 mb-3" />
            <span className="text-sm text-[#FEFAE0] font-medium mb-1">Awaiting Telemetry Data</span>
            <span className="text-xs text-white/40 max-w-sm">
              The PostHog engine is standing by. Once articles are published and readership data begins flowing, behavioral resonance metrics will appear here.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
