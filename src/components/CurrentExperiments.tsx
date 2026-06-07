"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const experiments = [
  {
    id: "01",
    title: "AI Verification Agent",
    description: "Multi-modal architecture designed to audit, verify, and trace outputs from large language models inside high-stakes pipelines.",
    status: "Active System",
  },
  {
    id: "02",
    title: "Jarvis Orchestration",
    description: "Continuous autonomic intelligence framework managing sub-agent deployment, task queuing, and distributed memory systems.",
    status: "Evolving Infrastructure",
  },
  {
    id: "03",
    title: "Pactify Workflows",
    description: "Procedural generation logic for automating complex, multi-step contract generation through deterministic natural language parsing.",
    status: "Archived Concept",
  }
];

export default function CurrentExperiments() {
  return (
    <section className="relative w-full py-32 bg-[#FAEDCD] text-[#2F3E46] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#84A98C] mb-4 block">
              Active Architecture
            </span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#2F3E46]">
              Current <span className="font-bold italic text-[#52796F]">Experiments</span>
            </h2>
          </div>
          <p className="text-[#52796F] max-w-sm text-sm leading-relaxed">
            These are not finished products. They are living systems, architectural explorations, and active infrastructure tests.
          </p>
        </div>

        <div className="flex flex-col">
          {experiments.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative border-t border-[#354F52]/10 py-12 flex flex-col md:flex-row gap-8 md:gap-16 hover:bg-[#FEFAE0]/50 transition-colors duration-700"
            >
              <div className="md:w-1/4">
                <span className="text-sm font-jetbrains text-[#D4A373]">{exp.id}</span>
                <p className="text-[10px] uppercase tracking-widest text-[#84A98C] mt-2">{exp.status}</p>
              </div>
              
              <div className="md:w-2/4">
                <h3 className="text-3xl font-medium mb-4 group-hover:text-[#D4A373] transition-colors duration-500">{exp.title}</h3>
                <p className="text-[#52796F] leading-relaxed max-w-lg">
                  {exp.description}
                </p>
              </div>
              
              <div className="md:w-1/4 flex items-center md:justify-end">
                <Link href={`/projects/${exp.title.toLowerCase().replace(/ /g, "-")}`} className="w-12 h-12 rounded-full border border-[#354F52]/20 flex items-center justify-center group-hover:bg-[#2F3E46] group-hover:border-transparent transition-all duration-500">
                  <ArrowRight className="w-4 h-4 text-[#2F3E46] group-hover:text-[#FEFAE0] transition-colors" />
                </Link>
              </div>
            </motion.div>
          ))}
          <div className="border-t border-[#354F52]/10 w-full" />
        </div>

      </div>
    </section>
  );
}
