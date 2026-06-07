"use client";

import { CheckCircle, Briefcase, Building, Award } from "lucide-react";
import { experiences } from "@/data/experience";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import SectionHeader from "@/components/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Experience"
          title="Industry Exposure"
          subtitle="Professional experience and startup ecosystem involvement"
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical gradient line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 opacity-30" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <AnimatedSection key={exp.id} delay={index * 200}>
                <div className="relative pl-12 md:pl-16">
                  {/* Glowing dot on timeline */}
                  <div className="absolute left-4 md:left-6 top-8 -translate-x-1/2">
                    <div className="relative">
                      <span className="absolute inline-flex h-4 w-4 rounded-full bg-emerald-400/20 animate-ping" />
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      </span>
                    </div>
                  </div>

                  <GlowCard glowColor="emerald" className="p-6 md:p-8">
                    {/* Badge */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full glass text-slate-300">
                        <Briefcase className="w-3 h-3" />
                        {exp.role}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Building className="w-3 h-3" />
                        {exp.companyShort}
                      </span>
                    </div>

                    {/* Company */}
                    <h3 className="text-xl font-bold text-white mb-3">
                      {exp.company}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Skills Developed
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs font-medium px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div>
                      <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">
                        Key Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {exp.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-center gap-2.5 text-sm text-slate-400"
                          >
                            <CheckCircle className="w-4 h-4 text-emerald-400/70 shrink-0" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlowCard>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
