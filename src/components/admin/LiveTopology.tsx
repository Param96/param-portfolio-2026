"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Globe, Users } from "lucide-react";

export default function LiveTopology() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLive = async () => {
      try {
        const res = await fetch('/api/analytics/live');
        const json = await res.json();
        if (!json.error) {
          setData(json);
        }
      } catch (e) {
        console.error("Failed to fetch live stats", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLive();
    const interval = setInterval(fetchLive, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#111] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
      {/* Background cinematic glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#84A98C]/10 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#FEFAE0]">Live Environmental Topology</h3>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A373] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4A373]"></span>
          </span>
          <span className="text-[10px] text-[#D4A373] uppercase tracking-widest font-inter uppercase tracking-widest text-[10px]">Syncing Edge</span>
        </div>
      </div>

      {loading ? (
        <div className="h-40 flex items-center justify-center text-white/20 text-xs tracking-widest uppercase">Initializing Sensors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          
          {/* Global Active */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-white/40 mb-4">
              <Globe className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Global Presence</span>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-light text-[#FEFAE0]">{data?.globalActive || 0}</span>
              <span className="text-xs text-white/40 pb-2">active explorers</span>
            </div>
          </div>

          {/* Research Active */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#84A98C]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="flex items-center gap-2 text-[#84A98C] mb-4 relative z-10">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Research Labs</span>
            </div>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-4xl font-light text-[#FEFAE0]">{data?.routes?.research || 0}</span>
              <span className="text-[10px] text-white/40 pb-1.5 uppercase">users</span>
            </div>
          </div>

          {/* Blog Active */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#D4A373]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="flex items-center gap-2 text-[#D4A373] mb-4 relative z-10">
              <Users className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Editorial Hub</span>
            </div>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-4xl font-light text-[#FEFAE0]">{data?.routes?.blog || 0}</span>
              <span className="text-[10px] text-white/40 pb-1.5 uppercase">users</span>
            </div>
          </div>

          {/* Lab Notes Active */}
          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#52796F]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="flex items-center gap-2 text-[#52796F] mb-4 relative z-10">
              <Activity className="w-4 h-4" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Engineering Logs</span>
            </div>
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-4xl font-light text-[#FEFAE0]">{data?.routes?.labNotes || 0}</span>
              <span className="text-[10px] text-white/40 pb-1.5 uppercase">users</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
