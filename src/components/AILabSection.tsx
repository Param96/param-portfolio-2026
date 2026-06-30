"use client";

import ScrollReveal from "./ScrollReveal";
import { Terminal, Activity, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function AILabSection() {
  return (
    <section id="ai-lab" className="py-20 relative z-10">
      <ScrollReveal>
        <div className="flex items-center gap-4 opacity-60 mb-12">
          <div className="h-[1px] w-8 bg-[#2F3E46]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#354F52]">AI Interactive Lab</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Interactive Code Snippet */}
          <div className="glass-strong rounded-3xl p-6 border border-white/50 shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4A373] to-[#D4A373]" />
             
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                   <Terminal className="w-4 h-4 text-[#2F3E46]" />
                   <span className="text-xs font-bold tracking-widest uppercase text-[#354F52]">Agent_Router.py</span>
                </div>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
                   <div className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
                   <div className="w-2.5 h-2.5 rounded-full bg-[#81B29A]" />
                </div>
             </div>

             <div className="bg-[#1C1C1C] rounded-xl p-5 font-inter uppercase tracking-widest text-[10px] text-sm text-[#A3B18A] overflow-x-auto relative">
                <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-white/10" />
                <motion.pre 
                  initial={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  className="pl-4"
                >
                  <code className="block text-[#D4A373]">def route_agent(query: str):</code>
                  <code className="block text-white/50 mt-2">  """Analyzes intent and routes to correct specialized LLM"""</code>
                  <code className="block mt-2">  intent = classifier.predict(query)</code>
                  <code className="block mt-2">  if intent == <span className="text-[#D4A373]">'data_verification'</span>:</code>
                  <code className="block mt-2">    return execute_verification_pipeline(query)</code>
                  <code className="block mt-2">  elif intent == <span className="text-[#D4A373]">'system_action'</span>:</code>
                  <code className="block mt-2">    return invoke_jarvis_automation(query)</code>
                  <code className="block mt-2">  else:</code>
                  <code className="block mt-2">    return standard_rag_fallback(query)</code>
                  
                  {/* Blinking cursor */}
                  <motion.div 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="inline-block w-2 h-4 bg-[#D4A373] ml-1 align-middle mt-2"
                  />
                </motion.pre>
             </div>
          </div>

          {/* Animated Benchmark Graph */}
          <div className="glass-strong rounded-3xl p-8 border border-white/50 shadow-lg bg-white relative overflow-hidden flex flex-col justify-between">
             <div className="flex items-center gap-2 mb-8">
               <Activity className="w-4 h-4 text-[#81B29A]" />
               <h4 className="text-xs font-bold uppercase tracking-widest text-[#354F52]">Verification Pipeline Latency (p99)</h4>
             </div>

             <div className="flex items-end gap-4 h-48 w-full">
               
               {/* Bar 1 */}
               <div className="flex flex-col items-center gap-2 flex-1">
                 <span className="text-xs font-bold text-[#D4A373]">1.2s</span>
                 <motion.div 
                   className="w-full bg-[#D4A373]/20 rounded-t-md relative overflow-hidden"
                   initial={{ height: 0 }}
                   whileInView={{ height: "100%" }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, ease: "easeOut" }}
                 >
                   <div className="absolute bottom-0 w-full h-1 bg-[#D4A373]" />
                 </motion.div>
                 <span className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider">Standard LLM</span>
               </div>

               {/* Bar 2 */}
               <div className="flex flex-col items-center gap-2 flex-1">
                 <span className="text-xs font-bold text-[#D4A373]">850ms</span>
                 <motion.div 
                   className="w-full bg-[#D4A373]/30 rounded-t-md relative overflow-hidden"
                   initial={{ height: 0 }}
                   whileInView={{ height: "70%" }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                 >
                   <div className="absolute bottom-0 w-full h-1 bg-[#D4A373]" />
                 </motion.div>
                 <span className="text-[10px] font-bold text-[#354F52] uppercase tracking-wider">RAG Optimized</span>
               </div>

               {/* Bar 3 */}
               <div className="flex flex-col items-center gap-2 flex-1">
                 <span className="text-xs font-bold text-[#81B29A]">120ms</span>
                 <motion.div 
                   className="w-full bg-[#81B29A] rounded-t-md relative overflow-hidden shadow-[0_0_15px_rgba(129,178,154,0.5)]"
                   initial={{ height: 0 }}
                   whileInView={{ height: "15%" }}
                   viewport={{ once: true }}
                   transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                 >
                   <div className="absolute top-0 w-full h-full bg-white/20" />
                 </motion.div>
                 <span className="text-[10px] font-bold text-[#2F3E46] uppercase tracking-wider">Edge Agent (v2)</span>
               </div>

             </div>
          </div>

        </div>
      </ScrollReveal>
    </section>
  );
}
