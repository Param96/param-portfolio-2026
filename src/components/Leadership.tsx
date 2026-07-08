"use client";

import { Crown, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import GlowCard from "@/components/GlowCard";

export default function Leadership() {
  const focusAreas = [
    "Fostering a culture of innovation and entrepreneurial thinking among students.",
    "Bridging the gap between students, tech leaders, and startup founders.",
    "Organizing technical and business-oriented discussions and events.",
    "Driving initiatives focused on modern engineering and product development."
  ];

  return (
    <section id="leadership" className="py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionHeader
            label="Leadership"
            title="Entrepreneurship Cell"
            subtitle="Fostering technical innovation and startup culture"
            align="center"
          />
        </AnimatedSection>

        <AnimatedSection delay={100} className="max-w-3xl mx-auto">
          <GlowCard glowColor="gold" className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#D4A373]/10 border border-[#D4A373]/20">
                    <Crown className="w-6 h-6 text-[#D4A373]" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white">Founder & President</h3>
                    <p className="text-sm text-slate-400 mt-1">Current Role</p>
                  </div>
                </div>
                
                <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                  Founded and currently leading the Entrepreneurship Cell. The organization is dedicated to cultivating an entrepreneurial mindset among students, emphasizing the intersection of modern technology and execution.
                </p>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Key Focus Areas</h4>
                  {focusAreas.map((area, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-slate-300 text-base">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlowCard>
        </AnimatedSection>
      </div>
    </section>
  );
}
