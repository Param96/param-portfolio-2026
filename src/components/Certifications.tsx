"use client";

import { certifications } from "@/data/certifications";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import SectionHeader from "@/components/SectionHeader";
import { Award, ArrowRight } from "lucide-react";

const certAccents: Record<
  string,
  {
    glowColor: "blue" | "violet";
    chipBg: string;
    chipBorder: string;
    chipText: string;
  }
> = {
  "ibm-fullstack": {
    glowColor: "blue",
    chipBg: "bg-blue-500/10",
    chipBorder: "border-blue-500/20",
    chipText: "text-blue-300",
  },
  "ml-specialization": {
    glowColor: "violet",
    chipBg: "bg-violet-500/10",
    chipBorder: "border-violet-500/20",
    chipText: "text-violet-300",
  },
};

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Credentials"
            title="Certifications"
            subtitle="Professional certifications and specialized training"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {certifications.map((cert, index) => {
            const accent = certAccents[cert.id] || certAccents["ibm-fullstack"];

            return (
              <AnimatedSection key={cert.id} delay={index * 200}>
                <GlowCard glowColor={accent.glowColor} className="h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 p-2.5 rounded-xl glass">
                      <Award className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full glass text-slate-300 mb-3">
                        {cert.issuerShort}
                      </span>
                      <h3 className="text-2xl font-bold gradient-text leading-tight">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed mt-3">
                    {cert.description}
                  </p>

                  {/* Skills Covered */}
                  <p className="text-xs font-medium tracking-[0.15em] uppercase text-slate-500 mt-6 mb-3">
                    Skills Covered
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.coveredSkills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1.5 text-sm rounded-full border ${accent.chipBg} ${accent.chipBorder} ${accent.chipText} transition-all duration-300`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* View Certificate Button */}
                  <div className="mt-8">
                    {/* TODO: Add certificate verification URL */}
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                    >
                      View Certificate
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                </GlowCard>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
