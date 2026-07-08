"use client";

import { motion } from "framer-motion";
import { Users, GitPullRequest } from "lucide-react";

export default function FounderECell() {
  return (
    <section className="relative w-full py-20 md:py-40 bg-bg-nature-section text-text-main overflow-hidden border-t border-border-line transition-colors duration-1000 ease-in-out">
      
      {/* Cinematic Founder Environment Visuals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--amber)]/10 blur-[150px] rounded-full transition-colors duration-1000 ease-in-out" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--moss)]/10 blur-[150px] rounded-full transition-colors duration-1000 ease-in-out" />
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
                <Users className="w-4 h-4 text-[var(--amber)]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--amber)]">
                  Founder & Current President
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight text-text-main mb-8 leading-[1.1] transition-colors duration-1000 ease-in-out">
                Execution <br />
                <span className="font-serif italic text-[var(--moss)]">& Ecosystems.</span>
              </h2>
              
              <div className="p-6 bg-border-line/20 border border-border-line rounded-2xl backdrop-blur-md transition-colors duration-1000 ease-in-out">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-inter uppercase tracking-widest text-[10px] text-text-dim transition-colors duration-1000 ease-in-out">Team Scale</span>
                  <span className="font-inter uppercase tracking-widest text-[10px] text-[var(--amber)] font-bold">30+ Members</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter uppercase tracking-widest text-[10px] text-text-dim transition-colors duration-1000 ease-in-out">Network Status</span>
                  <span className="font-inter uppercase tracking-widest text-[10px] text-[var(--moss)] font-bold flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--moss)] opacity-75 transition-colors duration-1000 ease-in-out"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--moss)] transition-colors duration-1000 ease-in-out"></span>
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
              className="flex flex-col gap-6 text-text-dim font-light leading-relaxed text-lg transition-colors duration-1000 ease-in-out"
            >
              <p className="text-2xl text-text-main font-medium mb-2 transition-colors duration-1000 ease-in-out">
                Engineering intelligent systems is only half the equation. The other half is cultivating environments where ambitious people can experiment, fail, and ship.
              </p>
              <p>
                As the Founder and President of the Entrepreneurship Cell (E-Cell), I built and scaled an operational execution team of 30 ambitious members. We transitioned the culture entirely from theoretical academics to pure 0-to-1 startup execution.
              </p>
              <p>
                By organizing startup-focused initiatives, securing mentorship MoUs with industry leaders, and designing collaborative execution workflows, I focus on building the human infrastructure required to scale innovation.
              </p>
              <div className="mt-8 pt-8 border-t border-border-line flex items-center gap-4 text-[var(--moss)] transition-colors duration-1000 ease-in-out">
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
