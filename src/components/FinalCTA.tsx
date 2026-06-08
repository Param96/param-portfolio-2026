"use client";

import ScrollReveal from "./ScrollReveal";
import { ArrowRight, Mail } from "lucide-react";
import posthog from "posthog-js";

export default function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      <ScrollReveal>
        <div className="w-full max-w-5xl mx-auto glass-strong rounded-[2.5rem] p-12 md:p-20 text-center relative border border-white shadow-2xl">
          
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-[2.5rem] pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-[#D4A373]/10 blur-[60px] pointer-events-none rounded-full" />
          
          <div className="relative z-10 flex flex-col items-center">
             <div className="w-16 h-16 rounded-full bg-[#2F3E46]/5 border border-[#2F3E46]/10 flex items-center justify-center mb-8">
               <Mail className="w-6 h-6 text-[#2F3E46]" />
             </div>

             <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-[#2F3E46] mb-6 max-w-2xl leading-[1.05]">
               Let's build something <br/> <span className="text-[#52796F]">ambitious together.</span>
             </h2>

             <p className="text-base md:text-lg text-[#52796F] font-medium max-w-xl mx-auto mb-10">
               Open to collaborating on agentic AI systems, research-driven engineering, and startup-oriented technology products.
             </p>

             <div className="flex flex-col sm:flex-row items-center gap-4">
               <a
                 href="mailto:paramppatel100@gmail.com"
                 onClick={() => posthog.capture('contact_cta_clicked', { cta_type: 'email', source: 'final_cta_section' })}
                 className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-white
                            bg-[#2F3E46] hover:bg-[#354F52] shadow-xl hover:shadow-2xl hover:-translate-y-1
                            transition-all duration-300 text-sm tracking-wide">
                 Start a Conversation
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
               </a>
               <a
                 href="https://linkedin.com/in/paramp06"
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={() => posthog.capture('contact_cta_clicked', { cta_type: 'linkedin', source: 'final_cta_section' })}
                 className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-[#354F52]
                            hover:text-[#2F3E46] hover:bg-[#2F3E46]/5 transition-colors duration-300 text-sm tracking-wide">
                 Connect on LinkedIn
               </a>
             </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
