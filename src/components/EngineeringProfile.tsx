import ScrollReveal from "./ScrollReveal";
import { Terminal, Lightbulb, Zap, Anchor } from "lucide-react";

export default function EngineeringProfile() {
  return (
    <section id="profile" className="py-20 relative">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left: Side Annotations & Labels */}
          <div className="lg:col-span-4 flex flex-col gap-6 pt-4">
            <div className="flex items-center gap-4 opacity-60">
              <div className="h-[1px] w-8 bg-[#2F3E46]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#354F52]">Profile</span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-[#2F3E46] leading-[1.1]">
              Engineering<br />Philosophy
            </h2>
            
            <p className="text-sm text-[#52796F] font-medium leading-relaxed max-w-sm mt-4">
              I don't just write code. I build robust systems designed to scale, solve real problems, and push the boundaries of what agentic AI can accomplish in production environments.
            </p>

            <div className="flex flex-col gap-4 mt-8">
              <div className="glass px-4 py-3 rounded-lg border border-[#2F3E46]/10 flex items-center gap-3">
                 <Terminal className="w-4 h-4 text-[#D4A373]" />
                 <span className="text-xs font-bold tracking-wide text-[#354F52]">Systems Architecture</span>
              </div>
              <div className="glass px-4 py-3 rounded-lg border border-[#2F3E46]/10 flex items-center gap-3">
                 <Zap className="w-4 h-4 text-[#D4A373]" />
                 <span className="text-xs font-bold tracking-wide text-[#354F52]">Startup Execution</span>
              </div>
            </div>
          </div>

          {/* Right: Broken Grid Storytelling */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            
            {/* Card 1 */}
            <div className="glass-strong p-8 rounded-2xl shadow-sm border border-white/50 flex flex-col justify-between h-[320px] hover:-translate-y-1 transition-transform duration-500">
              <div className="w-12 h-12 rounded-xl bg-[#D4A373]/10 flex items-center justify-center mb-6 border border-[#D4A373]/20">
                <Lightbulb className="w-6 h-6 text-[#D4A373]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2F3E46] mb-3">Research-Driven</h3>
                <p className="text-sm text-[#52796F] font-medium leading-relaxed">
                  Deep focus on ML verification, intelligent agents, and cybersecurity. I bridge the gap between academic research and production-grade software.
                </p>
              </div>
            </div>

            {/* Card 2 (Offset) */}
            <div className="glass-strong p-8 rounded-2xl shadow-sm border border-white/50 flex flex-col justify-between h-[320px] md:translate-y-12 hover:-translate-y-1 transition-transform duration-500 bg-[#E9EDC9]">
              <div className="w-12 h-12 rounded-xl bg-[#81B29A]/10 flex items-center justify-center mb-6 border border-[#81B29A]/20">
                <Anchor className="w-6 h-6 text-[#81B29A]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#2F3E46] mb-3">Founder Mentality</h3>
                <p className="text-sm text-[#52796F] font-medium leading-relaxed">
                  Building with extreme ownership. I prioritize shipping value, maintaining code quality, and architecting solutions that survive contact with the real world.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="md:col-span-2 mt-8 md:mt-20 p-8 glass rounded-2xl border-l-4 border-[#D4A373]">
               <p className="text-lg md:text-xl font-medium text-[#354F52] leading-relaxed">
                 "Great engineering is about managing complexity. The best systems feel simple to the user, yet handle immense complexity under the hood."
               </p>
            </div>

          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
