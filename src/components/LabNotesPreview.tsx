"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LabNotesPreview() {
  return (
    <section className="relative w-full py-40 bg-bg-tertiary overflow-hidden transition-colors duration-1000 ease-in-out">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-20 text-center flex flex-col items-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--moss)] mb-4 block">
            Raw Observations
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)] italic">
            Lab Notes
          </h2>
          <p className="mt-6 text-[var(--amber-deep)] max-w-lg mx-auto text-sm">
            Unfinished experiments, architecture sketches, and raw thoughts on scaling intelligent systems.
          </p>
        </div>

        {/* Scattered Composition Layout */}
        <div className="relative w-full h-[600px] md:h-[500px]">
          
          <motion.div
            initial={{ opacity: 0, rotate: -5, y: 50 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 md:left-10 w-[300px] md:w-[400px] bg-[var(--bg-page)] p-8 border border-border-strong/10 shadow-xl z-20 transition-colors duration-1000 ease-in-out"
          >
            <span className="font-inter text-[10px] text-[var(--amber)]">OCT 12, 2025</span>
            <h3 className="text-xl font-bold text-[var(--text-main)] mt-4 mb-3">Why Agentic Loops Fail in Production</h3>
            <p className="text-sm text-[var(--amber-deep)] leading-relaxed">
              Tracking context degradation over recursive LLM calls. The memory bottleneck isn't tokens, it's state-loss in nested reasoning paths...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 5, y: 50 }}
            whileInView={{ opacity: 1, rotate: 3, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-[180px] md:top-[80px] right-0 md:right-10 w-[280px] md:w-[350px] bg-[var(--bg-page)] p-8 border border-border-strong/10 shadow-2xl z-30 transition-colors duration-1000 ease-in-out"
          >
            <span className="font-inter text-[10px] text-[var(--moss)]">SEP 28, 2025</span>
            <h3 className="text-xl font-bold text-[var(--text-main)] mt-4 mb-3">Orchestration vs. Automation</h3>
            <p className="text-sm text-[var(--amber-deep)] leading-relaxed">
              Automation runs a script. Orchestration negotiates uncertainty. We are building too many scripts and calling them agents...
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: -2, y: 50 }}
            whileInView={{ opacity: 1, rotate: -1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-0 left-[10%] md:left-[30%] w-[320px] bg-[var(--bg-page)] p-8 border border-border-strong/10 shadow-lg z-10 transition-colors duration-1000 ease-in-out"
          >
            <span className="font-inter text-[10px] text-[var(--amber)]">AUG 04, 2025</span>
            <h3 className="text-xl font-bold text-[var(--text-main)] mt-4 mb-3">The Data Formatting Trap</h3>
            <p className="text-sm text-[var(--amber-deep)] leading-relaxed">
              70% of AI engineering is just aggressively parsing JSON out of unpredictable stochastic generators. Let's talk about defensive schema parsing...
            </p>
          </motion.div>

        </div>

        <div className="mt-20 text-center">
          <Link
            href="/ai-lab"
            className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-main)] hover:text-[var(--amber)] transition-colors"
          >
            Enter The AI Lab <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
