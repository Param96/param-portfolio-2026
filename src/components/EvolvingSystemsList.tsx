"use client";

import { motion } from "framer-motion";
import posthog from "posthog-js";
import { ExternalLink, Github, Cpu, Network, Database } from "lucide-react";

export default function EvolvingSystemsList({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full text-center text-white/50 text-xl py-32 font-mono">
        System offline. No active nodes found.
      </div>
    );
  }

  return (
    <section className="relative w-full py-40 bg-[#111] text-white overflow-hidden min-h-screen">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white" />
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Systems Topology Header */}
        <div className="mb-32 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between gap-8 border-b border-white/10 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
              <Network className="w-5 h-5 text-[#D4A373]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A373]">
                Systems Topology
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-[1.1]">
              Active <span className="font-serif italic text-[#84A98C]">Infrastructure.</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-white/30 text-xs font-mono uppercase tracking-widest">
            <span className="flex items-center gap-2"><Cpu className="w-4 h-4"/> Runtime: OK</span>
            <span className="flex items-center gap-2"><Database className="w-4 h-4"/> Data: SYNCHED</span>
          </div>
        </div>

        {/* Evolving Nodes */}
        <div className="relative flex flex-col gap-32">
          
          {/* Central Connecting Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 hidden md:block" />

          {projects.map((project, i) => {
            const isEven = i % 2 === 0;
            
            return (
              <motion.div 
                key={project._id || i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row gap-12 md:gap-24 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
              >
                
                {/* Node Center Dot */}
                <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#111] border border-white/30 rounded-full z-10 hidden md:flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#84A98C] rounded-full animate-pulse" />
                </div>

                {/* Content Side */}
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:text-right md:items-end' : 'md:text-left md:items-start'}`}>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4A373] mb-4 block font-bold bg-[#D4A373]/10 px-3 py-1 border border-[#D4A373]/20 rounded-full w-fit">
                    {project.status || 'OPERATIONAL'}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-light text-white mb-6">{project.title}</h3>
                  <div className="text-white/50 leading-relaxed text-lg font-light mb-8 max-w-lg">
                    <p>{project.description || "System overview currently unavailable."}</p>
                  </div>
                  
                  {/* Action Terminal */}
                  <div className={`flex flex-wrap gap-4 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => posthog.capture('project_link_clicked', { project_id: project._id, project_name: project.title, link_type: 'github' })}
                        className="flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg text-xs font-mono uppercase tracking-widest text-white/70 hover:bg-white hover:text-[#111] transition-all duration-500"
                      >
                        <Github className="w-4 h-4" /> Source
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => posthog.capture('project_link_clicked', { project_id: project._id, project_name: project.title, link_type: 'demo' })}
                        className="flex items-center gap-2 px-5 py-3 bg-[#84A98C]/10 border border-[#84A98C]/30 rounded-lg text-xs font-mono uppercase tracking-widest text-[#84A98C] hover:bg-[#84A98C] hover:text-[#111] transition-all duration-500"
                      >
                        <ExternalLink className="w-4 h-4" /> Initialize
                      </a>
                    )}
                  </div>
                </div>

                {/* Visual Architecture Side */}
                <div className="w-full md:w-1/2">
                  <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden group bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center justify-center p-8">
                    {/* Glowing background aura */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#84A98C]/5 to-[#D4A373]/5 opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    {project.coverImageUrl ? (
                      <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover rounded-xl border border-white/10 mix-blend-screen opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                    ) : (
                      // Procedural topology fallback if no image
                      <div className="w-full h-full border border-white/10 rounded-xl relative overflow-hidden bg-[#111] flex flex-col justify-between p-6">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4A373]/10 blur-[50px] rounded-full" />
                         <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#84A98C]/10 blur-[60px] rounded-full" />
                         <Network className="w-8 h-8 text-white/20 mb-auto" />
                         <div>
                           <div className="text-white/30 font-mono text-[10px] uppercase tracking-widest mb-2">System Schema Output</div>
                           <div className="h-1 w-24 bg-white/10 rounded-full mb-2 overflow-hidden">
                             <motion.div 
                               initial={{ x: "-100%" }} 
                               animate={{ x: "100%" }} 
                               transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                               className="h-full w-1/2 bg-[#84A98C]"
                             />
                           </div>
                           <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden delay-75">
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
