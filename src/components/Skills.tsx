"use client";

import { skillCategories } from "@/data/skills";
import AnimatedSection from "@/components/AnimatedSection";
import GlowCard from "@/components/GlowCard";
import SectionHeader from "@/components/SectionHeader";

const glowColorMap: Record<string, "blue" | "emerald" | "amber" | "rose" | "indigo"> = {
  "ai-ml": "blue",
  fullstack: "emerald",
  infrastructure: "amber",
  languages: "rose",
  databases: "indigo",
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Expertise"
            title="Technical Arsenal"
            subtitle="Technologies and domains I work with"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const glowColor = glowColorMap[category.id] || "blue";

            return (
              <AnimatedSection
                key={category.id}
                delay={index * 100}
                className={category.id === "ai-ml" ? "lg:col-span-2" : ""}
              >
                <GlowCard glowColor={glowColor} className="h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        {skill}
                      </span>
                    ))}
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
