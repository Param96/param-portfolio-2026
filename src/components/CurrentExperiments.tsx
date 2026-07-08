"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import posthog from "posthog-js";

const experiments = [
  {
    id: "01",
    title: "AI Verify Agent",
    description: "An intelligent educational verification infrastructure automating dataset validation through XGBoost-based workflows and scalable intelligence pipelines.",
    status: "Active Infrastructure",
    color: "#D4A373"
  },
  {
    id: "02",
    title: "Jarvis",
    description: "A modular agentic AI assistant exploring autonomous orchestration layers, experimental interaction systems, and automated copilots.",
    status: "Experimental Engine",
    color: "#84A98C"
  },
  {
    id: "03",
    title: "Pactify",
    description: "An AI-powered founder workflow platform exploring safe generation systems and operational productivity infrastructure for startups.",
    status: "Startup Tooling",
    color: "#52796F"
  }
];

export default function CurrentExperiments() {
  return (
    <section className="relative w-full py-20 md:py-40 bg-[var(--bg-page)] text-[var(--text-main)] overflow-hidden border-t border-accent-sage/10 transition-colors duration-1000 ease-in-out">
      {/* Background cinematic mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#84A98C]/30 to-transparent transition-colors duration-1000 ease-in-out" />
        <div className="absolute top-[20%] right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-[#84A98C]/30 to-transparent transition-colors duration-1000 ease-in-out" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="w-4 h-4 text-[var(--moss)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--moss)]">
                Living Systems
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-[var(--text-main)]">
              Experimental <br />
              <span className="font-serif italic text-[var(--amber)]">Engineering.</span>
            </h2>
          </div>
          <p className="text-[var(--text-dim)] max-w-sm text-sm leading-relaxed border-l border-accent-sage/20 pl-6">
            These are not static products. They are living systems, architectural explorations, and active infrastructure built to test the limits of intelligent automation.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-bg-main/40 border border-accent-sage/10 rounded-2xl p-6 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 hover:bg-[var(--bg-page)] hover:shadow-lg transition-all duration-700 overflow-hidden shadow-sm"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(circle at 80% 50%, ${exp.color}, transparent 50%)` }}
              />

              <div className="md:w-1/4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-inter uppercase tracking-widest text-[10px] font-bold" style={{ color: exp.color }}>SYS_{exp.id}</span>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--amber-deep)] mt-2 font-bold">{exp.status}</p>
                </div>
              </div>
              
              <div className="md:w-2/4">
                <h3 className="text-3xl md:text-4xl font-medium mb-4 text-[var(--text-main)] group-hover:translate-x-2 transition-transform duration-500">{exp.title}</h3>
                <p className="text-[var(--text-dim)] leading-relaxed max-w-lg">
                  {exp.description}
                </p>
              </div>
              
              <div className="md:w-1/4 flex items-end justify-start md:justify-end z-10">
                <Link
                  href={`/projects`}
                  className="flex items-center gap-4 group/btn"
                  onClick={() => posthog.capture('experiment_accessed', {
                    experiment_id: exp.id,
                    experiment_title: exp.title,
                    experiment_status: exp.status,
                  })}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--moss)] group-hover/btn:text-[var(--text-main)] transition-colors">Access System</span>
                  <div className="w-10 h-10 rounded-full border border-accent-sage/30 flex items-center justify-center group-hover/btn:border-[var(--moss)] group-hover/btn:bg-accent-sage/10 transition-all duration-500">
                    <ArrowRight className="w-4 h-4 text-[var(--moss)] group-hover/btn:text-[var(--text-main)]" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
