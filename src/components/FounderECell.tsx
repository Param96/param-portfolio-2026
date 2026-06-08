"use client";

import { motion } from "framer-motion";
import { Users, GitPullRequest } from "lucide-react";

export default function FounderECell() {
  return (
    <section className="relative w-full py-40 bg-[#1A1F22] text-[#FEFAE0] overflow-hidden border-t border-white/5">
      
      {/* Cinematic Founder Environment Visuals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#D4A373]/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#84A98C]/10 blur-[150px] rounded-full mix-blend-screen" />
        {/* Subtle grid to imply structure/systems */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-4 h-4 text-[#D4A373]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A373]">
                  Founder & Current President
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-8 leading-[1.1]">
                Execution <br />
                <span className="font-serif italic text-[#84A98C]">& Ecosystems.</span>
              </h2>
              
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Team Scale</span>
                  <span className="text-xs font-mono text-[#D4A373] font-bold">30+ Members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/50 uppercase tracking-widest">Network Status</span>
                  <span className="text-xs font-mono text-[#84A98C] font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84A98C] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84A98C]"></span>
                    </span>
                    Active MoUs
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="prose prose-lg prose-p:text-white/60 prose-p:leading-relaxed prose-p:font-light"
            >
              <p className="text-2xl text-white font-medium mb-8">
                Engineering intelligent systems is only half the equation. The other half is cultivating environments where ambitious people can experiment, fail, and ship.
              </p>
              <p>
                As the Founder and President of the Entrepreneurship Cell (E-Cell), I built and scaled an operational execution team of 30 ambitious members. We transitioned the culture entirely from theoretical academics to pure 0-to-1 startup execution.
              </p>
              <p>
                By organizing startup-focused initiatives, securing mentorship MoUs with industry leaders, and designing collaborative execution workflows, I focus on building the human infrastructure required to scale innovation.
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4 text-[#84A98C]">
                <GitPullRequest className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Building Collaborative Systems</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
