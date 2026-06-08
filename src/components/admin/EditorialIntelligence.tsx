"use client";

import { Brain, Flame, MousePointerClick } from "lucide-react";

export default function EditorialIntelligence() {
  // Normally this fetches from PostHog API via a Next.js server route.
  // We'll mock the visual interface until the user provides the PostHog API key.

  const insights = [
    {
      title: "Building AI Verify Agent",
      reads: 1420,
      completion: "82%",
      resonance: "High",
      duration: "4m 12s",
      icon: <Brain className="w-4 h-4 text-[#D4A373]" />
    },
    {
      title: "State of Agentic Systems 2026",
      reads: 890,
      completion: "65%",
      resonance: "Medium",
      duration: "2m 40s",
      icon: <Flame className="w-4 h-4 text-[#84A98C]" />
    },
    {
      title: "Optimizing KV Stores at the Edge",
      reads: 432,
      completion: "91%",
      resonance: "Very High",
      duration: "5m 05s",
      icon: <MousePointerClick className="w-4 h-4 text-[#52796F]" />
    }
  ];

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

        {insights.map((insight, i) => (
          <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors rounded-lg items-center group cursor-pointer">
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1A1F22] flex items-center justify-center border border-white/5">
                {insight.icon}
              </div>
              <span className="text-sm font-medium text-[#FEFAE0] group-hover:text-[#D4A373] transition-colors truncate">
                {insight.title}
              </span>
            </div>
            
            <div className="col-span-2 text-right text-sm text-white/60 font-mono">
              {insight.reads.toLocaleString()}
            </div>
            
            <div className="col-span-2 flex items-center justify-end gap-2">
              <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#84A98C]" 
                  style={{ width: insight.completion }}
                />
              </div>
              <span className="text-xs text-white/60 font-mono">{insight.completion}</span>
            </div>

            <div className="col-span-3 text-right flex flex-col items-end">
              <span className="text-xs font-bold text-[#D4A373] uppercase tracking-wider">{insight.resonance}</span>
              <span className="text-[10px] text-white/40 font-mono">{insight.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
