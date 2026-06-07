import ScrollReveal from "./ScrollReveal";
import { Database, ExternalLink, Activity, Network, Code2 } from "lucide-react";

export default function AcademicExplorations() {
  return (
    <section id="research" className="py-20 relative">
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Header & Stats Column */}
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="text-[2.5rem] font-bold tracking-tighter leading-[1.1] text-[#2F3E46] mb-6">
              Academic &amp; <br/> <span className="text-[#D4A373]">Exploratory Work.</span>
            </h2>
            <p className="text-base text-[#52796F] font-medium leading-relaxed mb-12">
              Focusing on the intersection of data analytics, agentic intelligence, and scalable systems. Building academic infrastructure and exploring advanced machine learning paradigms.
            </p>
            
            {/* Academic Dashboard Mini-Stat */}
            <div className="glass p-6 rounded-2xl border border-[#2F3E46]/5 mb-8 bg-white">
               <div className="flex items-center gap-3 mb-4">
                  <Activity className="w-4 h-4 text-[#D4A373]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#354F52]">Active Domains</h4>
               </div>
               <div className="space-y-3">
                 <div className="flex items-center justify-between">
                   <span className="text-sm font-semibold text-[#52796F]">Data Analytics</span>
                   <div className="w-32 h-1.5 bg-[#2F3E46]/10 rounded-full overflow-hidden">
                     <div className="w-[85%] h-full bg-[#D4A373] rounded-full" />
                   </div>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-sm font-semibold text-[#52796F]">Agentic AI</span>
                   <div className="w-32 h-1.5 bg-[#2F3E46]/10 rounded-full overflow-hidden">
                     <div className="w-[70%] h-full bg-[#D4A373] rounded-full" />
                   </div>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-sm font-semibold text-[#52796F]">Machine Learning</span>
                   <div className="w-32 h-1.5 bg-[#2F3E46]/10 rounded-full overflow-hidden">
                     <div className="w-[90%] h-full bg-[#81B29A] rounded-full" />
                   </div>
                 </div>
               </div>
            </div>
          </div>

          {/* Academic Projects List */}
          <div className="lg:col-span-7 flex flex-col gap-6 pt-2">
            
            <div className="glass-strong p-8 rounded-2xl border border-white/50 hover:shadow-lg transition-shadow duration-300 group bg-[#E9EDC9]">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                     <Database className="w-4 h-4 text-[#D4A373]" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373]">Academic Project</span>
                  </div>
               </div>
               <h3 className="text-xl font-bold text-[#2F3E46] mb-3 group-hover:text-[#D4A373] transition-colors">
                  Predictive Data Analytics Pipeline
               </h3>
               <p className="text-sm text-[#52796F] font-medium leading-relaxed mb-6">
                  Engineered a comprehensive data analytics pipeline to process, clean, and extract actionable insights from large-scale structured datasets. Utilized advanced statistical modeling and machine learning techniques.
               </p>
               <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-[#354F52] hover:text-[#2F3E46] transition-colors">
                  View Project <ExternalLink className="w-3.5 h-3.5" />
               </a>
            </div>

            <div className="glass-strong p-8 rounded-2xl border border-white/50 hover:shadow-lg transition-shadow duration-300 group bg-white">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                     <Code2 className="w-4 h-4 text-[#D4A373]" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373]">Hackathon Build</span>
                  </div>
               </div>
               <h3 className="text-xl font-bold text-[#2F3E46] mb-3 group-hover:text-[#D4A373] transition-colors">
                  Deepfake Detection Architecture
               </h3>
               <p className="text-sm text-[#52796F] font-medium leading-relaxed mb-6">
                  Developed during a major hackathon at IIT Delhi. Built the underlying architecture for a real-time synthetic media detection engine, focusing on model inference speed and data routing.
               </p>
               <a href="#" className="inline-flex items-center gap-2 text-xs font-bold text-[#354F52] hover:text-[#2F3E46] transition-colors">
                  View Repository <ExternalLink className="w-3.5 h-3.5" />
               </a>
            </div>

          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
