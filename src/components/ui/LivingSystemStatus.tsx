"use client";

import { useEffect, useState } from "react";
import { getFounderPresence, FounderPresence } from "@/lib/presence";
import { useLivingSystemStore } from "@/lib/store";

interface SystemStatus {
  system: {
    status: string;
    lastSync: string;
  };
  intelligence: {
    activeNodes: number;
    trainingNodes: number;
    archivedNodes: number;
    recentCommits: number;
    activeBranches: number;
  };
  timestamp: string;
}

export default function LivingSystemStatus() {
  const [presence, setPresence] = useState<FounderPresence | null>(null);
  const [system, setSystem] = useState<SystemStatus | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPresence(getFounderPresence());

    // Update presence every minute
    const interval = setInterval(() => {
      setPresence(getFounderPresence());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch external hybrid status
    fetch('/api/system-status')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSystem(data);
      })
      .catch(err => console.warn('Status fetch failed', err));
  }, []);

  const { cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const isCinematicComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

  if (!mounted || !presence || !isCinematicComplete) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:flex flex-col items-start gap-3 font-inter text-[10px] uppercase tracking-widest">
      <div className="bg-bg-surface/60 backdrop-blur-md border border-border-line shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-4 rounded-2xl flex flex-col gap-3 transition-colors duration-1000 ease-in-out">
        {/* Presence Module */}
        <div className="flex items-center gap-4 flex-row-reverse">
          <div className="flex flex-col items-start">
            <span className="text-text-dim leading-tight transition-colors duration-1000 ease-in-out">Founder</span>
            <span className="text-text-main font-bold leading-tight transition-colors duration-1000 ease-in-out">{presence.status}</span>
          </div>
          <div className="w-px h-6 bg-border-line transition-colors duration-1000 ease-in-out" />
          <div className="flex items-center gap-2">
            <span className="text-[var(--moss)] font-bold transition-colors duration-1000 ease-in-out">{presence.istTime}</span>
            <div className="relative flex h-2 w-2">
              {presence.status === 'Available' || presence.status === 'Deep Work' ? (
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  presence.status === 'Available' ? 'bg-[var(--moss)]' : 'bg-[var(--amber)]'
                }`} />
              ) : null}
              <span className={`relative inline-flex rounded-full h-2 w-2 transition-colors duration-1000 ease-in-out ${
                presence.status === 'Available' ? 'bg-[var(--moss)]' : 
                presence.status === 'Deep Work' ? 'bg-[var(--amber)]' : 'bg-text-dim'
              }`} />
            </div>
          </div>
        </div>

        {/* Living System Integration Status */}
        {system && (
          <div className="flex flex-col items-start gap-2 pt-3 border-t border-border-line opacity-70 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2">
              <span className="text-text-main transition-colors duration-1000 ease-in-out">Node: {system.intelligence.activeNodes} Active</span>
              <span className="text-text-dim transition-colors duration-1000 ease-in-out">/</span>
              <span className="text-[var(--amber)] transition-colors duration-1000 ease-in-out">{system.intelligence.trainingNodes} Training</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-text-main transition-colors duration-1000 ease-in-out">{system.system.status}</span>
              <span className="text-[var(--moss)] transition-colors duration-1000 ease-in-out">{system.intelligence.recentCommits} Commits</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
