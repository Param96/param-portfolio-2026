import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight, FlaskConical, PenTool } from "lucide-react";

export default function BlogLabNotes() {
  return (
    <section id="notes" className="py-20 relative">
      <ScrollReveal>
        <div className="flex items-center gap-4 opacity-60 mb-12">
          <div className="h-[1px] w-8 bg-[#2F3E46]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#354F52]">Blog &amp; Lab Notes</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Magazine Feature (Left) */}
          <div className="lg:col-span-8 group cursor-pointer">
            <div className="w-full aspect-[16/9] lg:aspect-auto lg:h-[400px] bg-[#2F3E46]/5 rounded-3xl mb-6 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E46]/80 to-transparent z-10" />
               <div className="absolute inset-0 bg-[#D4A373]/10 mix-blend-overlay" />
               
               {/* Abstract placeholder visual */}
               <div className="w-full h-full flex items-center justify-center opacity-30">
                 <div className="w-40 h-40 border-[4px] border-white/20 rounded-full blur-[2px] group-hover:scale-110 transition-transform duration-700" />
               </div>

               <div className="absolute bottom-0 left-0 p-8 z-20">
                 <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-widest text-white mb-4 inline-block">
                   Engineering Insight
                 </div>
                 <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#FAEDCD] transition-colors">
                   The State of Agentic Routing in 2026
                 </h3>
                 <p className="text-white/80 text-sm font-medium line-clamp-2 max-w-xl">
                   Exploring how deterministic state machines and LLM-based reasoning loops are merging to create reliable, production-ready AI agents.
                 </p>
               </div>
            </div>
          </div>

          {/* Sidebar Lab Notes (Right) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
             <div className="flex items-center gap-2 mb-2">
               <FlaskConical className="w-4 h-4 text-[#D4A373]" />
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#354F52]">Experimental Notes</h4>
             </div>

             {/* Small Note Card 1 */}
             <a href="#" className="glass p-5 rounded-2xl hover:-translate-y-1 transition-transform group border border-[#2F3E46]/5 hover:border-[#D4A373]/30 bg-white">
               <span className="text-[10px] font-bold text-[#81B29A] tracking-wider uppercase mb-2 block">May 12, 2026</span>
               <h5 className="text-base font-bold text-[#2F3E46] mb-2 group-hover:text-[#D4A373] transition-colors">
                 Optimizing Vector Search Latency
               </h5>
               <p className="text-xs text-[#52796F] font-medium leading-relaxed">
                 Notes on reducing p99 latency in dense retrieval pipelines using hardware acceleration and quantized embeddings.
               </p>
             </a>

             {/* Small Note Card 2 */}
             <a href="#" className="glass p-5 rounded-2xl hover:-translate-y-1 transition-transform group border border-[#2F3E46]/5 hover:border-[#D4A373]/30 bg-[#E9EDC9]">
               <span className="text-[10px] font-bold text-[#81B29A] tracking-wider uppercase mb-2 block">April 28, 2026</span>
               <h5 className="text-base font-bold text-[#2F3E46] mb-2 group-hover:text-[#D4A373] transition-colors">
                 Building eRaksha v2
               </h5>
               <p className="text-xs text-[#52796F] font-medium leading-relaxed">
                 Architectural decisions behind scaling our deepfake detection pipeline to handle 10k+ concurrent video streams.
               </p>
             </a>
             
             <a href="#" className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-[#354F52] hover:text-[#2F3E46] transition-colors uppercase tracking-widest">
                Read All Notes <ArrowUpRight className="w-3.5 h-3.5" />
             </a>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
