"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Network, Database, BrainCircuit, Layers, Workflow, CheckCircle, LayoutGrid, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";

export default function ResearchClientUI({ content }: { content: any }) {
  const [activeResearch, setActiveResearch] = useState<string | null>(null);

  return (
    <>
      <div className="mb-24 mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-accent-sage/20 pt-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4 flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--amber)] font-inter">Operational Role</span>
            <span className="text-xl font-medium text-[var(--text-main)]">{content.roleTitle || "Lead — Data Analysis & Verification Team"}</span>
          </div>
          
          <div className="md:col-span-8 flex flex-col gap-12">
            <div className="text-lg text-[var(--text-dim)] leading-relaxed font-light space-y-6">
              <p>{content.roleDescription}</p>
            </div>

            {/* Infrastructure Expandable Nodes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20">
              
              {/* Structured Intelligence Node */}
              {content.node1 && (
                <div 
                  onClick={() => setActiveResearch(activeResearch === "structured-intelligence" ? null : "structured-intelligence")}
                  className={`bg-[var(--bg-surface)]/60 border rounded-2xl p-8 transition-all duration-300 group shadow-sm cursor-pointer relative overflow-hidden ${activeResearch === "structured-intelligence" ? "border-[var(--moss)] shadow-lg shadow-[#84A98C]/10 bg-[var(--bg-surface)]/90" : "border-accent-sage/10 hover:bg-[var(--bg-page)] hover:shadow-lg"}`}
                >
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <Database className={`w-6 h-6 transition-transform ${activeResearch === "structured-intelligence" ? "text-[var(--moss)] scale-110" : "text-[var(--moss)] group-hover:scale-110"}`} />
                    {activeResearch === "structured-intelligence" ? <ChevronUp className="w-5 h-5 text-[var(--moss)]" /> : <ChevronDown className="w-5 h-5 text-[var(--moss)] opacity-50" />}
                  </div>
                  <h3 className={`font-medium mb-3 relative z-10 transition-colors ${activeResearch === "structured-intelligence" ? "text-[var(--moss)]" : "text-[var(--text-main)]"}`}>{content.node1.title}</h3>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed relative z-10">
                    {content.node1.subtitle}
                  </p>
                </div>
              )}
              
              {/* AI Validation Node */}
              {content.node2 && (
                <div 
                  onClick={() => setActiveResearch(activeResearch === "ai-validation" ? null : "ai-validation")}
                  className={`bg-[var(--bg-surface)]/60 border rounded-2xl p-8 transition-all duration-300 group shadow-sm cursor-pointer relative overflow-hidden ${activeResearch === "ai-validation" ? "border-[var(--amber)] shadow-lg shadow-[#D4A373]/10 bg-[var(--bg-surface)]/90" : "border-accent-sage/10 hover:bg-[var(--bg-page)] hover:shadow-lg"}`}
                >
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <BrainCircuit className={`w-6 h-6 transition-transform ${activeResearch === "ai-validation" ? "text-[var(--amber)] scale-110" : "text-[var(--amber)] group-hover:scale-110"}`} />
                    {activeResearch === "ai-validation" ? <ChevronUp className="w-5 h-5 text-[var(--amber)]" /> : <ChevronDown className="w-5 h-5 text-[var(--amber)] opacity-50" />}
                  </div>
                  <h3 className={`font-medium mb-3 relative z-10 transition-colors ${activeResearch === "ai-validation" ? "text-[var(--amber)]" : "text-[var(--text-main)]"}`}>{content.node2.title}</h3>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed relative z-10">
                    {content.node2.subtitle}
                  </p>
                </div>
              )}

            </div>

            {/* INLINE ACCORDION EXPANSION */}
            <AnimatePresence mode="wait">
              {activeResearch === "structured-intelligence" && content.node1 && (
                <motion.div
                  key="structured-intelligence"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full overflow-hidden"
                >
                  <div className="w-full mt-2 bg-[var(--bg-surface)]/80 border border-accent-sage/30 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden transition-colors duration-1000 ease-in-out">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-sage/5 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000 ease-in-out" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                      {/* Left: Pipeline Architecture */}
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-8">
                          <LayoutGrid className="w-5 h-5 text-[var(--moss)]" />
                          <span className="text-xs font-inter uppercase tracking-widest text-[var(--amber-deep)]">Pipeline Architecture</span>
                        </div>

                        <div className="flex-1 relative border border-accent-sage/20 rounded-2xl bg-[var(--bg-surface)]/50 backdrop-blur-sm p-6 md:p-8 shadow-inner overflow-hidden flex flex-col justify-center gap-6 min-h-[300px] transition-colors duration-1000 ease-in-out">
                          <div className="bg-[var(--bg-page)] border border-accent-sage/30 p-4 rounded-lg flex items-center gap-4 animate-pulse transition-colors duration-1000 ease-in-out">
                            <Database className="text-[var(--moss)]" /> <span className="text-sm font-medium text-[var(--text-main)]">Raw PDF Extraction</span>
                          </div>
                          <div className="w-[1px] h-8 md:h-12 bg-accent-sage/30 mx-auto transition-colors duration-1000 ease-in-out" />
                          <div className="bg-[var(--bg-page)] border border-accent-primary/30 p-4 rounded-lg flex items-center gap-4 transition-colors duration-1000 ease-in-out">
                            <Workflow className="text-[var(--amber)]" /> <span className="text-sm font-medium text-[var(--text-main)]">Automated Web Scraping Engine</span>
                          </div>
                          <div className="w-[1px] h-8 md:h-12 bg-accent-sage/30 mx-auto transition-colors duration-1000 ease-in-out" />
                          <div className="bg-[var(--bark)] text-bg-main p-4 rounded-lg flex items-center gap-4 shadow-lg shadow-[#84A98C]/20 transition-colors duration-1000 ease-in-out">
                            <CheckCircle className="text-[var(--moss)]" /> <span className="text-sm font-medium">Structured Domain Database</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Description */}
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--amber)] mb-6 block font-bold bg-[var(--bg-page)] px-3 py-1 border border-accent-primary/20 rounded-full w-fit transition-colors duration-1000 ease-in-out">
                          ACTIVE PIPELINE
                        </span>
                        
                        <h3 className="text-4xl md:text-5xl font-light text-[var(--text-main)] mb-8 leading-[1.1]">
                          {content.node1.title}
                        </h3>

                        <div className="text-[var(--text-dim)] leading-relaxed text-lg font-light mb-12 whitespace-pre-wrap">
                          {content.node1.content}
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-4">
                          <div className="p-4 border border-accent-sage/20 rounded-xl bg-[var(--bg-surface)]/50 transition-colors duration-1000 ease-in-out">
                            <span className="block text-2xl font-light text-[var(--text-main)] mb-1">{content.node1.stat1Value}</span>
                            <span className="text-[10px] font-inter uppercase tracking-widest text-[var(--amber-deep)]">{content.node1.stat1Label}</span>
                          </div>
                          <div className="p-4 border border-accent-sage/20 rounded-xl bg-[var(--bg-surface)]/50 transition-colors duration-1000 ease-in-out">
                            <span className="block text-2xl font-light text-[var(--text-main)] mb-1">{content.node1.stat2Value}</span>
                            <span className="text-[10px] font-inter uppercase tracking-widest text-[var(--amber-deep)]">{content.node1.stat2Label}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeResearch === "ai-validation" && content.node2 && (
                <motion.div
                  key="ai-validation"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full overflow-hidden"
                >
                  <div className="w-full mt-2 bg-[var(--bg-surface)]/80 border border-accent-primary/30 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden transition-colors duration-1000 ease-in-out">
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-primary/5 blur-[100px] rounded-full pointer-events-none transition-colors duration-1000 ease-in-out" />
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                      {/* Left: Model Topology */}
                      <div className="flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-8">
                          <LayoutGrid className="w-5 h-5 text-[var(--amber)]" />
                          <span className="text-xs font-inter uppercase tracking-widest text-[var(--amber-deep)]">ML Model Topology</span>
                        </div>

                        <div className="flex-1 relative border border-accent-sage/20 rounded-2xl bg-[var(--bg-surface)]/50 backdrop-blur-sm p-6 md:p-8 shadow-inner overflow-hidden flex items-center justify-center min-h-[300px] transition-colors duration-1000 ease-in-out">
                          <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <motion.circle cx="50" cy="50" r="30" fill="none" stroke="var(--accent-primary)" strokeWidth="0.5" strokeDasharray="4 2" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                              <motion.circle cx="50" cy="50" r="20" fill="none" stroke="var(--accent-sage)" strokeWidth="0.5" strokeDasharray="2 4" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                            </svg>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10 w-full relative">
                            <div className="bg-[var(--bark)] text-white p-4 rounded-xl shadow-lg border border-[var(--border-line)] text-center flex flex-col justify-center items-center transition-colors duration-1000 ease-in-out"><span className="text-xs font-inter uppercase tracking-widest">XGBoost Baseline</span></div>
                            <div className="bg-[var(--bg-page)] text-[var(--text-main)] p-4 rounded-xl border border-accent-sage/30 text-center flex flex-col justify-center items-center transition-colors duration-1000 ease-in-out"><span className="text-xs font-inter uppercase tracking-widest">Heuristic Filter</span></div>
                            <div className="col-span-2 bg-[var(--moss)] text-white p-4 rounded-xl shadow-lg border border-accent-sage/30 text-center mt-2 transition-colors duration-1000 ease-in-out"><span className="text-xs md:text-sm font-inter uppercase tracking-widest uppercase">{content.node2.confidenceScore}</span></div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Description */}
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--amber)] mb-6 block font-bold bg-[var(--bg-page)] px-3 py-1 border border-accent-primary/20 rounded-full w-fit transition-colors duration-1000 ease-in-out">
                          ACTIVE MODEL
                        </span>
                        
                        <h3 className="text-4xl md:text-5xl font-light text-[var(--text-main)] mb-8 leading-[1.1]">
                          {content.node2.title}
                        </h3>

                        <div className="text-[var(--text-dim)] leading-relaxed text-lg font-light mb-12 whitespace-pre-wrap">
                          {content.node2.content}
                        </div>
                        
                        <div className="mt-auto grid grid-cols-2 gap-4">
                          <div className="p-4 border border-accent-sage/20 rounded-xl bg-[var(--bg-surface)]/50 transition-colors duration-1000 ease-in-out">
                            <Layers className="w-5 h-5 text-[var(--moss)] mb-2" />
                            <span className="text-[10px] font-inter uppercase tracking-widest text-[var(--amber-deep)]">{content.node2.feature1Label}</span>
                          </div>
                          <div className="p-4 border border-accent-sage/20 rounded-xl bg-[var(--bg-surface)]/50 transition-colors duration-1000 ease-in-out">
                            <BrainCircuit className="w-5 h-5 text-[var(--amber)] mb-2" />
                            <span className="text-[10px] font-inter uppercase tracking-widest text-[var(--amber-deep)]">{content.node2.feature2Label}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </motion.div>
      </div>
    </>
  );
}
