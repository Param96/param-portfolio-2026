"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Network, Database, BrainCircuit, Layers, Workflow, CheckCircle, LayoutGrid, ChevronDown, ChevronUp } from "lucide-react";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

export default function CinematicResearchPage() {
  const [activeResearch, setActiveResearch] = useState<string | null>(null);

  useEffect(() => {
    posthog.capture('$pageview');
  }, []);

  return (
    <div className="relative min-h-screen bg-[#E9EDC9] text-[#2F3E46] overflow-hidden selection:bg-[#D4A373] selection:text-[#FEFAE0] font-sans pt-32 pb-40">
      
      {/* ========================================= */}
      {/* ATMOSPHERIC BACKGROUND                      */}
      {/* ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#FAEDCD] rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-[20%] left-[-10%] w-[1000px] h-[1000px] bg-[#CCD5AE] rounded-full blur-[150px] opacity-60" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#84A98C] opacity-20 rounded-[100%] blur-[200px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-[#84A98C]/20 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#84A98C]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ========================================= */}
        {/* 1. INITIATIVE HERO                        */}
        {/* ========================================= */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#52796F] font-jetbrains">
                  Academic & Applied Systems
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-light tracking-tight text-[#2F3E46] leading-[1.05] mb-8">
                Research & <br />
                <span className="font-bold italic text-[#84A98C]">Verification</span> <br />
                Infrastructure.
              </h1>
              
              <p className="text-xl text-[#354F52] max-w-2xl leading-relaxed mb-12">
                Working on cybersecurity educational verification systems focused on organizing and validating cybersecurity learning resources across global platforms using intelligent automation and ML-assisted workflows.
              </p>
              
              <div className="flex gap-4 items-center border border-[#84A98C]/20 bg-[#FEFAE0]/50 rounded-xl px-6 py-4 w-fit backdrop-blur-sm shadow-sm">
                <div className="w-1.5 h-1.5 bg-[#D4A373] rounded-full animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#52796F]">System Status: <span className="text-[#D4A373] font-bold">OPERATIONAL</span></span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative h-[500px] w-full hidden lg:flex justify-center items-center pointer-events-none">
            <div className="absolute w-[400px] h-[400px] border border-[#84A98C]/20 rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[300px] h-[300px] border border-[#D4A373]/30 border-dashed rounded-full animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute w-[200px] h-[200px] bg-[#84A98C]/10 rounded-full blur-[50px] animate-pulse" />
            <Network className="absolute w-16 h-16 text-[#84A98C]/50" />
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#84A98C] rounded-full shadow-[0_0_15px_#84A98C]" />
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-[#D4A373] rounded-full shadow-[0_0_15px_#D4A373]" />
          </div>
        </section>

        {/* ========================================= */}
        {/* 2. EXPANDABLE RESEARCH SYSTEMS            */}
        {/* ========================================= */}
        <section className="mb-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#84A98C]/20 pt-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
              <div className="md:col-span-4 flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] font-jetbrains">Operational Role</span>
                <span className="text-xl font-medium text-[#2F3E46]">Lead — Data Analysis & Verification Team</span>
              </div>
              
              <div className="md:col-span-8 flex flex-col gap-12">
                <div className="text-lg text-[#354F52] leading-relaxed font-light space-y-6">
                  <p>
                    Tasked with designing and structuring verification workflows to process vast amounts of unstructured cybersecurity educational data. I lead the Data Analysis & Verification Team, focusing heavily on building automated pipelines to extract, route, and validate intelligence.
                  </p>
                </div>

                {/* Infrastructure Expandable Nodes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-20">
                  
                  {/* Structured Intelligence Node */}
                  <div 
                    onClick={() => setActiveResearch(activeResearch === "structured-intelligence" ? null : "structured-intelligence")}
                    className={`bg-[#FEFAE0]/60 border rounded-2xl p-8 transition-all duration-300 group shadow-sm cursor-pointer relative overflow-hidden ${activeResearch === "structured-intelligence" ? "border-[#84A98C] shadow-lg shadow-[#84A98C]/10 bg-[#FEFAE0]/90" : "border-[#84A98C]/10 hover:bg-[#FEFAE0] hover:shadow-lg"}`}
                  >
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <Database className={`w-6 h-6 transition-transform ${activeResearch === "structured-intelligence" ? "text-[#84A98C] scale-110" : "text-[#84A98C] group-hover:scale-110"}`} />
                      {activeResearch === "structured-intelligence" ? <ChevronUp className="w-5 h-5 text-[#84A98C]" /> : <ChevronDown className="w-5 h-5 text-[#84A98C] opacity-50" />}
                    </div>
                    <h3 className={`font-medium mb-3 relative z-10 transition-colors ${activeResearch === "structured-intelligence" ? "text-[#84A98C]" : "text-[#2F3E46]"}`}>Structured Intelligence Systems</h3>
                    <p className="text-sm text-[#354F52] leading-relaxed relative z-10">
                      Automated web extraction pipelines and PDF verification workflows converting raw text into scalable datasets.
                    </p>
                  </div>
                  
                  {/* AI Validation Node */}
                  <div 
                    onClick={() => setActiveResearch(activeResearch === "ai-validation" ? null : "ai-validation")}
                    className={`bg-[#FEFAE0]/60 border rounded-2xl p-8 transition-all duration-300 group shadow-sm cursor-pointer relative overflow-hidden ${activeResearch === "ai-validation" ? "border-[#D4A373] shadow-lg shadow-[#D4A373]/10 bg-[#FEFAE0]/90" : "border-[#84A98C]/10 hover:bg-[#FEFAE0] hover:shadow-lg"}`}
                  >
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <BrainCircuit className={`w-6 h-6 transition-transform ${activeResearch === "ai-validation" ? "text-[#D4A373] scale-110" : "text-[#D4A373] group-hover:scale-110"}`} />
                      {activeResearch === "ai-validation" ? <ChevronUp className="w-5 h-5 text-[#D4A373]" /> : <ChevronDown className="w-5 h-5 text-[#D4A373] opacity-50" />}
                    </div>
                    <h3 className={`font-medium mb-3 relative z-10 transition-colors ${activeResearch === "ai-validation" ? "text-[#D4A373]" : "text-[#2F3E46]"}`}>AI-Assisted Validation</h3>
                    <p className="text-sm text-[#354F52] leading-relaxed relative z-10">
                      Engineering XGBoost models and agentic workflows to validate course metadata and assess technical depth.
                    </p>
                  </div>

                </div>

                {/* INLINE ACCORDION EXPANSION */}
                <AnimatePresence mode="wait">
                  {activeResearch === "structured-intelligence" && (
                    <motion.div
                      key="structured-intelligence"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full overflow-hidden"
                    >
                      <div className="w-full mt-2 bg-[#FEFAE0]/80 border border-[#84A98C]/30 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#84A98C]/5 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                          {/* Left: Pipeline Architecture */}
                          <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-8">
                              <LayoutGrid className="w-5 h-5 text-[#84A98C]" />
                              <span className="text-xs font-mono uppercase tracking-widest text-[#52796F]">Pipeline Architecture</span>
                            </div>

                            <div className="flex-1 relative border border-[#84A98C]/20 rounded-2xl bg-white/50 backdrop-blur-sm p-6 md:p-8 shadow-inner overflow-hidden flex flex-col justify-center gap-6 min-h-[300px]">
                              <div className="bg-[#FEFAE0] border border-[#84A98C]/30 p-4 rounded-lg flex items-center gap-4 animate-pulse">
                                <Database className="text-[#84A98C]" /> <span className="text-sm font-medium text-[#2F3E46]">Raw PDF Extraction</span>
                              </div>
                              <div className="w-[1px] h-8 md:h-12 bg-[#84A98C]/30 mx-auto" />
                              <div className="bg-[#FEFAE0] border border-[#D4A373]/30 p-4 rounded-lg flex items-center gap-4">
                                <Workflow className="text-[#D4A373]" /> <span className="text-sm font-medium text-[#2F3E46]">Automated Web Scraping Engine</span>
                              </div>
                              <div className="w-[1px] h-8 md:h-12 bg-[#84A98C]/30 mx-auto" />
                              <div className="bg-[#2F3E46] text-[#FEFAE0] p-4 rounded-lg flex items-center gap-4 shadow-lg shadow-[#84A98C]/20">
                                <CheckCircle className="text-[#84A98C]" /> <span className="text-sm font-medium">Structured Domain Database</span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Description */}
                          <div className="flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4A373] mb-6 block font-bold bg-[#FEFAE0] px-3 py-1 border border-[#D4A373]/20 rounded-full w-fit">
                              ACTIVE PIPELINE
                            </span>
                            
                            <h3 className="text-4xl md:text-5xl font-light text-[#2F3E46] mb-8 leading-[1.1]">
                              Structured Intelligence
                            </h3>

                            <div className="text-[#354F52] leading-relaxed text-lg font-light mb-12">
                              <p>When dealing with thousands of unverified cybersecurity courses across multiple global platforms, manual curation fails at scale.</p>
                              <br />
                              <p>I architected an automated extraction pipeline utilizing headless browsers and PDF parsing to constantly ingest raw educational metadata. The result is a continuously updated, fully structured intelligence database organized by core cybersecurity domains.</p>
                            </div>

                            <div className="mt-auto grid grid-cols-2 gap-4">
                              <div className="p-4 border border-[#84A98C]/20 rounded-xl bg-white/50">
                                <span className="block text-2xl font-light text-[#2F3E46] mb-1">14+</span>
                                <span className="text-[10px] font-mono uppercase text-[#52796F]">Global Platforms</span>
                              </div>
                              <div className="p-4 border border-[#84A98C]/20 rounded-xl bg-white/50">
                                <span className="block text-2xl font-light text-[#2F3E46] mb-1">100k+</span>
                                <span className="text-[10px] font-mono uppercase text-[#52796F]">Nodes Validated</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeResearch === "ai-validation" && (
                    <motion.div
                      key="ai-validation"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full overflow-hidden"
                    >
                      <div className="w-full mt-2 bg-[#FEFAE0]/80 border border-[#D4A373]/30 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden">
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4A373]/5 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                          {/* Left: Model Topology */}
                          <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-8">
                              <LayoutGrid className="w-5 h-5 text-[#D4A373]" />
                              <span className="text-xs font-mono uppercase tracking-widest text-[#52796F]">ML Model Topology</span>
                            </div>

                            <div className="flex-1 relative border border-[#84A98C]/20 rounded-2xl bg-white/50 backdrop-blur-sm p-6 md:p-8 shadow-inner overflow-hidden flex items-center justify-center min-h-[300px]">
                              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                  <motion.circle cx="50" cy="50" r="30" fill="none" stroke="#D4A373" strokeWidth="0.5" strokeDasharray="4 2" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
                                  <motion.circle cx="50" cy="50" r="20" fill="none" stroke="#84A98C" strokeWidth="0.5" strokeDasharray="2 4" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} />
                                </svg>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 z-10 w-full relative">
                                <div className="bg-[#2F3E46] text-white p-4 rounded-xl shadow-lg border border-white/10 text-center flex flex-col justify-center items-center"><span className="text-xs font-mono">XGBoost Baseline</span></div>
                                <div className="bg-white text-[#2F3E46] p-4 rounded-xl border border-[#84A98C]/30 text-center flex flex-col justify-center items-center"><span className="text-xs font-mono">Heuristic Filter</span></div>
                                <div className="col-span-2 bg-[#84A98C] text-white p-4 rounded-xl shadow-lg border border-[#84A98C]/30 text-center mt-2"><span className="text-xs md:text-sm font-mono tracking-widest uppercase">Confidence Score: 98.4%</span></div>
                              </div>
                            </div>
                          </div>

                          {/* Right: Description */}
                          <div className="flex flex-col justify-center">
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4A373] mb-6 block font-bold bg-[#FEFAE0] px-3 py-1 border border-[#D4A373]/20 rounded-full w-fit">
                              ACTIVE MODEL
                            </span>
                            
                            <h3 className="text-4xl md:text-5xl font-light text-[#2F3E46] mb-8 leading-[1.1]">
                              AI-Assisted Validation
                            </h3>

                            <div className="text-[#354F52] leading-relaxed text-lg font-light mb-12">
                              <p>Once structured intelligence is ingested, it must be validated for accuracy, relevance, and technical depth before being exposed to the educational platform.</p>
                              <br />
                              <p>I engineered an <strong className="font-medium text-[#2F3E46]">XGBoost-based confidence model</strong> capable of programmatically assessing course metadata against established cybersecurity baselines, saving hundreds of hours of manual curation.</p>
                            </div>
                            
                            <div className="mt-auto grid grid-cols-2 gap-4">
                              <div className="p-4 border border-[#84A98C]/20 rounded-xl bg-white/50">
                                <Layers className="w-5 h-5 text-[#84A98C] mb-2" />
                                <span className="text-[10px] font-mono uppercase text-[#52796F]">XGBoost Framework</span>
                              </div>
                              <div className="p-4 border border-[#84A98C]/20 rounded-xl bg-white/50">
                                <BrainCircuit className="w-5 h-5 text-[#D4A373] mb-2" />
                                <span className="text-[10px] font-mono uppercase text-[#52796F]">Automated Routing</span>
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
        </section>

      </div>
    </div>
  );
}
