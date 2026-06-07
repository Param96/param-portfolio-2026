"use client";

import { Brain, Globe, Rocket, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import GlowCard from "@/components/GlowCard";

const highlights = [
  {
    icon: Brain,
    title: "Agentic Systems",
    desc: "Multi-agent architectures & intelligent automation",
    glowColor: "blue" as const,
  },
  {
    icon: Globe,
    title: "Full-Stack Engineering",
    desc: "React, Next.js, Node.js, Python — end to end",
    glowColor: "emerald" as const,
  },
  {
    icon: Rocket,
    title: "Startup Building",
    desc: "Founder mindset, execution-first approach",
    glowColor: "violet" as const,
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 px-6 md:px-10 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 blur-[100px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <SectionHeader label="About" title="Systems-First Intelligence" />
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* ─── Left Column — Abstract Geometric Visual ─── */}
          <AnimatedSection direction="left" delay={100}>
            <div className="animate-float relative">
              <div className="glass rounded-3xl p-8 aspect-square relative overflow-hidden">
                {/* Abstract geometric composition */}
                {/* Large gradient circles */}
                <div className="absolute top-8 left-8 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/10 blur-sm" />
                <div className="absolute top-20 right-12 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/15 to-purple-500/10 blur-sm" />
                <div className="absolute bottom-24 left-16 w-28 h-28 rounded-full bg-gradient-to-br from-emerald-500/15 to-teal-500/10 blur-sm" />

                {/* Geometric rectangles */}
                <div className="absolute top-12 right-8 w-36 h-24 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/10 rotate-12" />
                <div className="absolute bottom-32 right-20 w-28 h-20 rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/10 -rotate-6" />
                <div className="absolute top-1/3 left-6 w-24 h-32 rounded-xl bg-gradient-to-b from-violet-500/8 to-transparent border border-violet-500/8 rotate-3" />

                {/* Code-like visualization */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="terminal-text text-xs md:text-sm space-y-2 text-slate-500/60 select-none">
                    <p>
                      <span className="text-blue-400/50">const</span>{" "}
                      <span className="text-emerald-400/50">agent</span>{" "}
                      <span className="text-slate-600">=</span>{" "}
                      <span className="text-violet-400/50">{"{"}</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-500/40">perceive:</span>{" "}
                      <span className="text-blue-400/40">async</span>{" "}
                      <span className="text-slate-600">()</span>{" "}
                      <span className="text-slate-600">{"=>"}</span>{" "}
                      <span className="text-emerald-400/40">{"{...}"}</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-500/40">reason:</span>{" "}
                      <span className="text-blue-400/40">async</span>{" "}
                      <span className="text-slate-600">(ctx)</span>{" "}
                      <span className="text-slate-600">{"=>"}</span>{" "}
                      <span className="text-violet-400/40">{"{...}"}</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-500/40">execute:</span>{" "}
                      <span className="text-blue-400/40">async</span>{" "}
                      <span className="text-slate-600">(plan)</span>{" "}
                      <span className="text-slate-600">{"=>"}</span>{" "}
                      <span className="text-emerald-400/40">{"{...}"}</span>
                    </p>
                    <p>
                      <span className="text-violet-400/50">{"}"}</span>
                    </p>
                    <p className="mt-3">
                      <span className="text-blue-400/50">await</span>{" "}
                      <span className="text-emerald-400/50">agent</span>
                      <span className="text-slate-600">.deploy(</span>
                      <span className="text-amber-400/50">&quot;prod&quot;</span>
                      <span className="text-slate-600">)</span>
                    </p>
                  </div>
                </div>

                {/* Decorative grid lines */}
                <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
              </div>

              {/* IBM Certification Badge — overlay at bottom-right */}
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 z-10">
                <div className="glass-strong p-4 md:p-5 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.15)] max-w-[240px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Award size={16} className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 terminal-text">
                      Verified
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm md:text-base leading-tight">
                    IBM Certified
                    <br />
                    Full-Stack Developer
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ─── Right Column — Narrative ─── */}
          <div className="space-y-8">
            <AnimatedSection direction="right" delay={150}>
              <h3 className="text-3xl font-bold gradient-text mb-6">
                Engineering Intelligence at Scale
              </h3>

              <div className="space-y-5 text-slate-400 text-base leading-relaxed">
                <p>
                  AI systems engineer and full-stack developer building
                  production-grade intelligent systems. From agentic AI pipelines
                  to scalable web platforms, focused on engineering that ships.
                </p>
                <p>
                  Founder and current President of the college Entrepreneurship
                  Cell. Interested in AI infrastructure, agentic systems, machine
                  learning, and scalable products.
                </p>
                <p>
                  IBM Certified Full-Stack Developer. Building at the
                  intersection of AI research and production engineering.
                </p>
              </div>
            </AnimatedSection>

            {/* ─── Highlight Cards ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {highlights.map((item, i) => (
                <AnimatedSection key={item.title} delay={i * 150} direction="up">
                  <GlowCard glowColor={item.glowColor} className="h-full">
                    <item.icon
                      size={28}
                      className={`mb-3 ${
                        item.glowColor === "blue"
                          ? "text-blue-400"
                          : item.glowColor === "emerald"
                          ? "text-emerald-400"
                          : "text-violet-400"
                      }`}
                    />
                    <h4 className="text-base font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </GlowCard>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}