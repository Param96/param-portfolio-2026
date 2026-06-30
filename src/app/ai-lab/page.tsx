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

export const metadata = {
  title: "AI Lab",
  description:
    "Param Patel's AI Lab — interactive terminal, engineering experiments, benchmark visualizations, and AI demos.",
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

const labModules = [
  {
    icon: Terminal,
    title: "Interactive Terminal",
    description:
      "A live terminal interface for running experiments, querying models, and exploring AI system outputs in real-time.",
    status: "Coming Soon",
    glowColor: "blue" as const,
  },
  {
    icon: Cpu,
    title: "Model Playground",
    description:
      "Test and compare ML models with custom inputs. Visualize predictions, confidence scores, and feature importance.",
    status: "Coming Soon",
    glowColor: "violet" as const,
  },
  {
    icon: BarChart3,
    title: "Benchmark Dashboard",
    description:
      "Real-time performance metrics, accuracy benchmarks, and system health monitoring for deployed AI systems.",
    status: "Coming Soon",
    glowColor: "emerald" as const,
  },
  {
    icon: Zap,
    title: "Experiment Tracker",
    description:
      "Track experiment runs, hyperparameters, results, and model versions across all active research projects.",
    status: "Coming Soon",
    glowColor: "amber" as const,
  },
];

export default function AILabPage() {
  return (
    <div className="min-h-screen transition-colors duration-1000 ease-in-out bg-[var(--bg-page)]">
      <AILabHero />
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative z-10">

        {/* Live Terminal */}
        <AnimatedSection delay={100}>
          <div className="mb-12">
            <TerminalBlock
              lines={terminalLines}
              title="param@ai-lab ~/experiments"
              typingSpeed={35}
              loop={true}
              className="max-w-3xl"
            />
          </div>
        </AnimatedSection>

        {/* Lab Modules Grid */}
        <AnimatedSection delay={200}>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-6">Lab Modules</h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {labModules.map((module, index) => {
            const Icon = module.icon;
            return (
              <AnimatedSection key={module.title} delay={250 + index * 100}>
                <GlowCard glowColor={module.glowColor} className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl glass shrink-0">
                      <Icon className="w-6 h-6 text-[var(--text-muted)]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                          {module.title}
                        </h4>
                        <span className="px-2 py-0.5 rounded-full bg-[var(--surface-sunken)] text-[var(--text-secondary)] text-xs border border-[var(--border-subtle)]">
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

        {/* Engineering Philosophy */}
        <AnimatedSection delay={600}>
          <GlowCard glowColor="indigo" className="p-8 text-center">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">
              Full Lab Access Coming Soon
            </h3>
            <p className="text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
              The complete AI Lab with interactive terminal, model playground,
              and live benchmarks is under active development. In the meantime,
              explore my projects and research.
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

        <AnimatedSection delay={700}>
          <div className="mt-16 text-center">
            <Link
              href="/"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
