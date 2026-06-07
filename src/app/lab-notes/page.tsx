"use client";

import LabNotesHero3D from "@/components/LabNotesHero3D";
import { motion } from "framer-motion";

export default function LabNotesPage() {
  return (
    <div className="relative min-h-screen bg-[#FAEDCD]">
      
      {/* 3D Immersive Hero */}
      <LabNotesHero3D />

      {/* Raw / Unfinished Feed */}
      <section className="max-w-3xl mx-auto px-6 flex flex-col gap-24 relative mt-20">
        
        {/* Background connector line */}
        <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[1px] bg-[#354F52]/10 md:-translate-x-1/2 pointer-events-none" />

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#FEFAE0] p-8 md:p-12 border border-[#354F52]/5 shadow-xl ml-8 md:ml-0 md:mr-32"
        >
          <div className="absolute left-[-40px] md:right-[-40px] md:left-auto top-10 w-4 h-4 rounded-full bg-[#D4A373] shadow-[0_0_15px_rgba(212,163,115,0.5)] z-10" />
          
          <span className="font-jetbrains text-[10px] text-[#84A98C]">OCT 12, 2025</span>
          <h2 className="text-2xl font-bold text-[#2F3E46] mt-4 mb-6">Why Agentic Loops Fail in Production</h2>
          <div className="prose prose-p:text-[#354F52] prose-p:leading-relaxed text-sm">
            <p>
              Tracking context degradation over recursive LLM calls. The memory bottleneck isn't tokens, it's state-loss in nested reasoning paths. When sub-agents pass context to another sub-agent, the nuance of the initial query decays exponentially.
            </p>
            <p>
              We need better vector-memory indexing for mid-task checkpoints, not just long-term rag.
            </p>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-[#E9EDC9] p-8 md:p-12 border border-[#354F52]/5 shadow-2xl ml-8 md:ml-32 md:mr-0"
        >
          <div className="absolute left-[-40px] top-10 w-4 h-4 rounded-full bg-[#52796F] shadow-[0_0_15px_rgba(82,121,111,0.5)] z-10" />
          
          <span className="font-jetbrains text-[10px] text-[#D4A373]">SEP 28, 2025</span>
          <h2 className="text-2xl font-bold text-[#2F3E46] mt-4 mb-6">Orchestration vs. Automation</h2>
          <div className="prose prose-p:text-[#354F52] prose-p:leading-relaxed text-sm">
            <p>
              Automation runs a script. Orchestration negotiates uncertainty. We are building too many scripts and calling them agents. If a system fails linearly because one step errored, it is not an agent.
            </p>
            <p>
              Real agentic architecture requires fallback heuristics and autonomic retry negotiations built into the core loop.
            </p>
          </div>
        </motion.article>

      </section>
    </div>
  );
}
