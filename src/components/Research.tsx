"use client";

import { CheckCircle } from "lucide-react";
import { researchProjects } from "@/data/experience";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import SectionHeader from "@/components/SectionHeader";

export default function Research() {
  const research = researchProjects[0];

  return (
    <section id="research" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Research"
          title="Research & Publications"
          subtitle="Active research projects and technical investigations"
        />

        <AnimatedSection delay={100}>
          <GlowCard glowColor="rose" className="p-8 md:p-10">
            {/* Role Badge */}
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full px-4 py-1.5 text-sm font-medium shadow-[0_0_16px_rgba(239,68,68,0.1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                </span>
                {research.roleBadge}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-3xl font-bold gradient-text-warm mb-2">
              {research.title}
            </h3>

            {/* Category */}
            <p className="text-sm text-slate-500 mb-4">{research.category}</p>

            {/* Description */}
            <p className="text-slate-400 leading-relaxed mb-6 max-w-3xl">
              {research.description}
            </p>

            {/* Status */}
            <div className="flex items-center gap-2 mb-8">
              <span className="text-sm text-slate-500">Status:</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {research.status}
              </span>
            </div>

            {/* Objectives + Domains Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Core Objectives */}
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
                  Core Objectives
                </h4>
                <ul className="space-y-3">
                  {research.objectives.map((objective) => (
                    <li
                      key={objective}
                      className="flex items-start gap-2.5 text-sm text-slate-400"
                    >
                      <CheckCircle className="w-4 h-4 text-red-400/70 shrink-0 mt-0.5" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Domains Covered */}
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
                  Domains Covered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {research.domains.map((domain) => (
                    <span
                      key={domain}
                      className="text-xs px-2.5 py-1 rounded-md bg-red-500/5 border border-red-500/15 text-red-300/80"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
                Responsibilities
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {research.responsibilities.map((responsibility) => (
                  <div
                    key={responsibility}
                    className="flex items-center gap-2.5 text-sm text-slate-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/50 shrink-0" />
                    {responsibility}
                  </div>
                ))}
              </div>
            </div>

            {/* Tech & Research Areas */}
            <div>
              <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-4">
                Tech & Research Areas
              </h4>
              <div className="flex flex-wrap gap-2">
                {research.techAreas.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
