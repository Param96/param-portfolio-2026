import Link from "next/link";
import {
  Terminal,
  Cpu,
  BarChart3,
  Zap,
  ArrowRight,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import TerminalBlock from "@/components/TerminalBlock";
import { AILabHero } from "@/components/hero/meadow/ClientHeroes";
import { sanityFetch } from "@/sanity/lib/live";
import { LAB_NOTES_QUERY } from "@/sanity/lib/queries";
import LabNotesBoard from "@/components/LabNotesBoard";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Lab",
  description:
    "Param Patel's AI Lab — interactive terminal, engineering experiments, benchmark visualizations, and AI demos.",
  alternates: {
    canonical: '/ai-lab',
  },
  openGraph: {
    title: "AI Lab | Param Patel",
    description: "Param Patel's AI Lab — interactive terminal, engineering experiments, benchmark visualizations, and AI demos.",
    url: "/ai-lab",
  },
  twitter: {
    title: "AI Lab | Param Patel",
    description: "Param Patel's AI Lab — interactive terminal, engineering experiments, benchmark visualizations, and AI demos.",
  }
};

const terminalLines = [
  { text: "initializing ai-lab environment...", type: "command" as const },
  { text: "Python 3.12.0 | PyTorch 2.3 | CUDA 12.4", type: "output" as const },
  { text: "loading model registry...", type: "command" as const },
  { text: "✓ agent_v2.1 (production)", type: "success" as const },
  { text: "✓ verifier_ml_v3 (staging)", type: "success" as const },
  { text: "✓ deepfake_detector (research)", type: "success" as const },
  { text: "running benchmark suite...", type: "command" as const },
  { text: "latency: p50=12ms p99=45ms", type: "info" as const },
  { text: "throughput: 847 req/s", type: "info" as const },
  { text: "accuracy: 94.7% (validation set)", type: "success" as const },
  { text: "deploying updated pipeline...", type: "command" as const },
  { text: "nodes: 3 → 6 (auto-scaled)", type: "output" as const },
  { text: "all systems nominal ✓", type: "success" as const },
];

import LabModulesGrid from "@/components/LabModulesGrid";

export default async function AILabPage() {
  const { data: notes } = await sanityFetch({ query: LAB_NOTES_QUERY });
  
  return (
    <div className="min-h-screen transition-colors duration-1000 ease-in-out bg-[var(--bg-page)]">
      <AILabHero />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative z-10">


        {/* Corkboard Lab Notes */}
        <AnimatedSection delay={150}>
          <div className="mb-12">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Lab Notes</h3>
            <LabNotesBoard notes={notes as any[]} />
          </div>
        </AnimatedSection>

        {/* Lab Modules Grid */}
        <LabModulesGrid />

        {/* Engineering Philosophy */}
        <AnimatedSection delay={600}>
          <GlowCard glowColor="indigo" className="p-8 text-center">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              More Tools Incoming
            </h3>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
              The Model Playground, Benchmark Dashboard, and Experiment Tracker are under active development. Try the Terminal and AI Assistant above in the meantime — or explore my projects and research.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-all"
              >
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/research"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-[var(--text-primary)] hover:bg-[var(--surface-raised)] transition-all"
              >
                View Research
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </GlowCard>
        </AnimatedSection>
      </div>
    </div>
  );
}
