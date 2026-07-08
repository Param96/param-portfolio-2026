"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import posthog from "posthog-js";
import Image from "next/image";
import { Github, Cpu, Network, Database, LayoutGrid, Layers, Server, Globe, Rocket, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";

export default function EvolvingSystemsList({ projects }: { projects: any[] }) {
  const [activeProject, setActiveProject] = useState<any | null>(null);

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full text-center text-[var(--text-main)]/60 text-xl py-20 md:py-32 font-inter uppercase tracking-widest text-[10px]">
        System offline. No active nodes found.
      </div>
    );
  }

  // Helper to determine simulated system status
  const getDeploymentState = (title: string) => {
    if (title.toLowerCase().includes("jarvis") || title.toLowerCase().includes("verify")) {
      return { status: "ACTIVE DEPLOYMENT", color: "text-[#84A98C]", bg: "bg-[#84A98C]/10", border: "border-[#84A98C]/30" };
    }
    if (title.toLowerCase().includes("pactify") || title.toLowerCase().includes("raksha")) {
      return { status: "BETA ENVIRONMENT", color: "text-[#D4A373]", bg: "bg-[#D4A373]/10", border: "border-[#D4A373]/30" };
    }
    return { status: "EXPERIMENTAL NODE", color: "text-[var(--text-main)]", bg: "bg-[var(--text-main)]/5", border: "border-[var(--text-main)]/20" };
  };

  const renderDeploymentEnvironment = (project: any) => {
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex items-center gap-3">
          <Server className="w-5 h-5 text-[#84A98C]" />
          <span className="text-xs font-inter uppercase tracking-widest text-[10px] uppercase tracking-widest text-[var(--text-main)]/60">System Access Protocol</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Live Production Layer */}
          <div className="bg-[var(--text-main)]/[0.02] border border-[var(--text-main)]/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#84A98C]/10 blur-[40px] rounded-full group-hover:bg-[#84A98C]/20 transition-colors" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#84A98C]" />
                <span className="font-inter uppercase tracking-widest text-[10px] text-xs uppercase tracking-widest text-[var(--text-main)] font-bold">Production</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-page)] border border-[var(--text-main)]/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-[#84A98C] rounded-full animate-pulse" />
                <span className="text-[9px] font-inter uppercase tracking-widest text-[10px] uppercase text-[#84A98C] tracking-wider">Live</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative z-10 mt-12">
              {project.liveUrl ? (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => { e.stopPropagation(); posthog.capture('system_access_production', { project: project.title }); }}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[var(--text-main)] text-[var(--bg-page)] rounded-xl hover:bg-[var(--text-main)]/90 hover:shadow-lg hover:shadow-[var(--text-main)]/10 transition-all group/btn"
                >
                  <span className="font-inter uppercase tracking-widest text-[10px] text-xs uppercase tracking-widest">Initialize System</span>
                  <Rocket className="w-4 h-4 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              ) : (
                <div className="w-full flex items-center justify-between px-6 py-4 bg-[var(--text-main)]/5 border border-[var(--text-main)]/10 text-[var(--text-main)]/60 rounded-xl opacity-70 cursor-not-allowed">
                  <span className="font-inter uppercase tracking-widest text-[10px] text-xs uppercase tracking-widest">Awaiting Deployment</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>

          {/* GitHub Architecture Layer */}
          <div className="bg-[var(--text-main)]/[0.02] border border-[var(--text-main)]/10 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373]/10 blur-[40px] rounded-full group-hover:bg-[#D4A373]/20 transition-colors" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-[#D4A373]" />
                <span className="font-inter uppercase tracking-widest text-[10px] text-xs uppercase tracking-widest text-[var(--text-main)] font-bold">Source Code</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-[var(--bg-page)] border border-[var(--text-main)]/10 rounded-full">
                <Database className="w-3 h-3 text-[#D4A373]" />
                <span className="text-[9px] font-inter uppercase tracking-widest text-[10px] uppercase text-[#D4A373] tracking-wider">Public Repository</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative z-10 mt-12">
              {project.githubUrl ? (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => { e.stopPropagation(); posthog.capture('system_access_github', { project: project.title }); }}
                  className="w-full flex items-center justify-between px-6 py-4 bg-transparent border border-[var(--text-main)]/20 text-[var(--text-main)] rounded-xl hover:bg-[var(--text-main)]/5 hover:border-[var(--text-main)]/30 transition-all group/btn"
                >
                  <span className="font-inter uppercase tracking-widest text-[10px] text-xs uppercase tracking-widest">Access Repository</span>
                  <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform text-[#D4A373]" />
                </a>
              ) : (
                <div className="w-full flex items-center justify-between px-6 py-4 bg-[var(--text-main)]/5 border border-[var(--text-main)]/10 text-[var(--text-main)]/60 rounded-xl opacity-70 cursor-not-allowed">
                  <span className="font-inter uppercase tracking-widest text-[10px] text-xs uppercase tracking-widest">Classified Access</span>
                  <ShieldCheck className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative w-full py-20 md:py-40 bg-transparent text-[var(--text-main)] overflow-hidden min-h-screen">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-[var(--text-main)]" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[var(--text-main)]" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-[var(--text-main)]" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-[var(--text-main)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Systems Topology Header */}
        <div className="mb-32 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between gap-8 border-b border-[var(--text-main)]/10 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <Network className="w-5 h-5 text-[#D4A373]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A373]">
                Systems Topology
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[var(--text-main)] leading-[1.1]">
              Active <span className="font-serif italic text-[#84A98C]">Infrastructure.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-[var(--text-main)]/60 text-xs font-inter uppercase tracking-widest text-[10px] uppercase tracking-widest">
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-[#84A98C]"/> Runtime: OK</span>
            <span className="flex items-center gap-2"><Database className="w-4 h-4 text-[#84A98C]"/> Data: SYNCHED</span>
          </div>
        </div>

        {/* Evolving Nodes List */}
        <div className="relative flex flex-col gap-32">
          
          {/* Central Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--text-main)]/20 to-transparent -translate-x-1/2 hidden md:block" />

          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            const deploymentState = getDeploymentState(project.title);
            const isActive = activeProject?._id === project._id;
            
            return (
              <div key={project._id || i} className="relative flex flex-col">
                <motion.div 
                  onClick={() => setActiveProject(isActive ? null : project)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-12 md:gap-24 items-center group cursor-pointer ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Node Center Dot */}
                  <div className={`absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 border rounded-full z-10 hidden md:flex items-center justify-center transition-all duration-500 ${isActive ? 'scale-150 bg-[#84A98C]/20 border-[#84A98C]' : 'bg-[var(--bg-page)] border-[var(--text-main)]/30 group-hover:scale-150 group-hover:bg-[#84A98C]/20'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#D4A373]' : 'bg-[#84A98C] group-hover:animate-ping'}`} />
                  </div>

                  {/* Content Side */}
                  <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
                    <span className={`text-[10px] uppercase tracking-[0.3em] ${deploymentState.color} mb-4 block font-bold ${deploymentState.bg} px-3 py-1 border ${deploymentState.border} rounded-full w-fit font-inter transition-colors ${isActive ? 'bg-[var(--bg-page)]' : 'group-hover:bg-[var(--bg-page)]'}`}>
                      {deploymentState.status}
                    </span>
                    <h3 className={`text-4xl md:text-5xl font-light mb-6 transition-colors ${isActive ? 'text-[#84A98C]' : 'text-[var(--text-main)] group-hover:text-[#84A98C]'}`}>
                      {project.title}
                    </h3>
                    
                    <div className={`flex items-center gap-2 mb-6 transition-opacity duration-300 ${isEven ? 'md:flex-row-reverse' : ''} ${isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
                      {isActive ? <ChevronUp className="w-5 h-5 text-[#D4A373]" /> : <ChevronDown className="w-5 h-5 text-[#D4A373]" />}
                      <span className="text-xs font-inter uppercase tracking-widest text-[10px] uppercase tracking-widest text-[#D4A373]">
                        {isActive ? 'Collapse Diagnostics' : 'Expand System Architecture'}
                      </span>
                    </div>

                    <div className={`text-[var(--text-main)]/80 leading-relaxed text-lg font-light max-w-lg transition-opacity ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                      <p className={isActive ? '' : 'line-clamp-3'}>{project.description || "System overview currently unavailable."}</p>
                    </div>
                  </div>

                  {/* Visual Architecture Side */}
                  <div className="w-full md:w-1/2">
                    <div className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[var(--text-main)]/[0.03] border border-[var(--text-main)]/10 backdrop-blur-sm flex items-center justify-center p-8 transition-all duration-700 ${isActive ? 'shadow-2xl shadow-[var(--text-main)]/10 -translate-y-2' : 'shadow-sm group-hover:shadow-2xl group-hover:shadow-[var(--text-main)]/10 group-hover:-translate-y-2'}`}>
                      {/* Glowing background aura */}
                      <div className={`absolute inset-0 bg-gradient-to-tr from-[#84A98C]/5 to-[#D4A373]/5 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`} />
                      
                      {project.coverImageUrl ? (
                        <Image fill src={project.coverImageUrl} alt={project.title || "Project preview"} className={`object-cover rounded-xl border border-[var(--text-main)]/10 transition-all duration-1000 ${isActive ? 'opacity-100 scale-105' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'}`} />
                      ) : (
                        <div className="w-full h-full border border-[var(--text-main)]/10 rounded-xl relative overflow-hidden bg-[var(--bg-page)] flex flex-col justify-between p-6">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373]/10 blur-[50px] rounded-full" />
                           <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#84A98C]/10 blur-[60px] rounded-full" />
                           <Network className="w-8 h-8 text-[#84A98C]/40 mb-auto" />
                           <div>
                             <div className="text-[var(--text-main)]/60 font-inter uppercase tracking-widest text-[10px] text-[10px] uppercase tracking-widest mb-2">System Schema Output</div>
                             <div className="h-1 w-24 bg-[#84A98C]/10 rounded-full mb-2 overflow-hidden">
                               <motion.div 
                                 initial={{ x: "-100%" }} 
                                 animate={{ x: "100%" }} 
                                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                 className="h-full w-1/2 bg-[#84A98C]"
                               />
                             </div>
                             <div className="h-1 w-16 bg-[#84A98C]/10 rounded-full overflow-hidden delay-75">
                               <motion.div 
                                 initial={{ x: "-100%" }} 
                                 animate={{ x: "100%" }} 
                                 transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                                 className="h-full w-1/2 bg-[#D4A373]"
                               />
                             </div>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* INLINE ACCORDION EXPANSION */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full overflow-hidden"
                    >
                      <div className="w-full mt-12 bg-[var(--bg-page)]/90 border border-[var(--text-main)]/10 rounded-3xl p-8 md:p-12 shadow-lg relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#84A98C]/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#D4A373]/5 blur-[100px] rounded-full pointer-events-none" />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
                          {/* Left: Architecture Visualization */}
                          <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-8">
                              <LayoutGrid className="w-5 h-5 text-[#84A98C]" />
                              <span className="text-xs font-inter uppercase tracking-widest text-[10px] uppercase tracking-widest text-[var(--text-main)]/60">System Architecture</span>
                            </div>

                            <div className="flex-1 relative border border-[var(--text-main)]/10 rounded-2xl bg-[var(--text-main)]/[0.02] backdrop-blur-sm p-8 shadow-inner overflow-hidden flex flex-col justify-between min-h-[300px]">
                              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                  <motion.path 
                                    d="M0,50 Q25,20 50,50 T100,50" 
                                    fill="none" 
                                    stroke="#84A98C" 
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                  />
                                  <motion.path 
                                    d="M0,70 Q40,90 60,30 T100,20" 
                                    fill="none" 
                                    stroke="#D4A373" 
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                  />
                                </svg>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 w-full mt-auto">
                                {(project.techStack || ['System Layer 1', 'Orchestration', 'Validation UI', 'Data Pipeline']).slice(0, 4).map((tech: string, idx: number) => (
                                  <div key={idx} className="bg-[var(--text-main)]/5 border border-[var(--text-main)]/10 p-4 rounded-xl shadow-sm flex flex-col gap-2 items-center text-center hover:bg-[var(--text-main)]/10 transition-colors cursor-default">
                                    <Layers className="w-4 h-4 text-[#84A98C]" />
                                    <span className="text-[10px] font-inter uppercase tracking-widest text-[10px] text-[var(--text-main)] uppercase tracking-wider">{tech}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Right: Deployment Links */}
                          <div className="flex flex-col justify-center">
                            {renderDeploymentEnvironment(project)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
