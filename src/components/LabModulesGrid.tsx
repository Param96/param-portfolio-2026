"use client";

import { useState } from "react";
import { Terminal, Cpu, BarChart3, Zap, MessageSquare } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import { useLivingSystemStore } from "@/lib/store";
import AIChatInterface from "@/components/ui/AIChatInterface";

const labModules = [
  {
    id: "terminal",
    icon: Terminal,
    title: "Interactive Terminal",
    description:
      "A live terminal interface for querying my portfolio content, running small commands, and exploring the site outside the normal UI.",
    status: "Live",
    glowColor: "blue" as const,
  },
  {
    id: "assistant",
    icon: MessageSquare,
    title: "AI Assistant",
    description:
      "A RAG-powered assistant trained on my projects, research, and background. Ask it anything you'd ask me directly.",
    status: "Live",
    glowColor: "violet" as const,
  },
  {
    id: "playground",
    icon: Cpu,
    title: "Model Playground",
    description:
      "Test and compare ML models with custom inputs. Visualize predictions, confidence scores, and feature importance.",
    status: "Coming Soon",
    glowColor: "violet" as const,
  },
  {
    id: "benchmark",
    icon: BarChart3,
    title: "Benchmark Dashboard",
    description:
      "Real-time performance metrics, accuracy benchmarks, and system health monitoring for deployed AI systems.",
    status: "Coming Soon",
    glowColor: "emerald" as const,
  },
  {
    id: "tracker",
    icon: Zap,
    title: "Experiment Tracker",
    description:
      "Track experiment runs, hyperparameters, results, and model versions across all active research projects.",
    status: "Coming Soon",
    glowColor: "amber" as const,
  },
];

export default function LabModulesGrid() {
  const toggleTerminal = useLivingSystemStore((state) => state.toggleTerminal);
  const [showChat, setShowChat] = useState(false);

  const handleCardClick = (id: string) => {
    if (id === "terminal") {
      toggleTerminal();
    } else if (id === "assistant") {
      setShowChat(true);
    }
  };

  return (
    <>
      <AnimatedSection delay={200}>
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Lab Modules</h3>
      </AnimatedSection>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {labModules.map((module, index) => {
          const Icon = module.icon;
          const isLive = module.status === "Live";
          
          return (
            <AnimatedSection key={module.id} delay={250 + index * 100}>
              <GlowCard 
                glowColor={module.glowColor} 
                className={`p-6 h-full transition-all duration-300 ${isLive ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent-color)]" : "opacity-80"}`}
              >
                <div 
                  className="flex items-start gap-4 h-full"
                  onClick={() => handleCardClick(module.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(module.id);
                    }
                  }}
                  role={isLive ? "button" : "region"}
                  tabIndex={isLive ? 0 : undefined}
                  aria-label={isLive ? `Open ${module.title}` : undefined}
                >
                  <div className={`p-3 rounded-xl glass shrink-0 ${isLive ? "bg-[var(--accent-glow)] text-[var(--accent-color)]" : ""}`}>
                    <Icon className={`w-6 h-6 ${isLive ? "text-[var(--accent-color)]" : "text-[var(--text-muted)]"}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                        {module.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${isLive ? "bg-[var(--accent-color)] text-white border-transparent" : "bg-[var(--surface-sunken)] text-[var(--text-secondary)] border-[var(--border-subtle)]"}`}>
                        {module.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
              </GlowCard>
            </AnimatedSection>
          );
        })}
      </div>

      {showChat && <AIChatInterface onClose={() => setShowChat(false)} />}
    </>
  );
}
