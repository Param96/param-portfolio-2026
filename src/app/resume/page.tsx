"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#F6F1E3] text-[#2F3E46] pt-32 pb-40 px-6 md:px-24 font-sans selection:bg-[#D4A373] selection:text-white">
      <div className="max-w-6xl mx-auto">
        
        {/* ── HEADER ── */}
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#84A98C] mb-8 block">
              Curriculum Vitae
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.9] mb-12">
              Param <span className="font-serif italic text-[#D4A373]">Patel</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 md:gap-24 text-lg font-medium text-[#52796F] max-w-4xl">
              <p className="flex-1 leading-relaxed">
                Systems thinker, research-driven engineer, and ambitious technical founder. I build intelligent infrastructure, experimental AI workflows, and cinematic user interfaces from zero to one.
              </p>
              <div className="flex flex-col gap-2 shrink-0 text-sm font-bold uppercase tracking-widest text-[#2F3E46]">
                <a href="mailto:paramppatel100@gmail.com" className="hover:text-[#D4A373] transition-colors flex items-center gap-2">
                  paramppatel100@gmail.com <ArrowUpRight className="w-3 h-3" />
                </a>
                <a href="https://github.com/Param96" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A373] transition-colors flex items-center gap-2">
                  GitHub <ArrowUpRight className="w-3 h-3" />
                </a>
                <a href="https://www.linkedin.com/in/paramp06/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D4A373] transition-colors flex items-center gap-2">
                  LinkedIn <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </header>

        {/* ── SECTIONS ── */}
        <div className="space-y-32">

          {/* Current Focus & Research */}
          <section>
            <div className="border-b border-[#2F3E46]/10 pb-8 mb-12">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">Current Focus & Research</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <span className="text-sm font-bold uppercase tracking-widest text-[#52796F]">Initiative</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-4">
                <h3 className="text-2xl font-medium">CERT-IN Research Initiative</h3>
                <p className="text-lg text-[#52796F] leading-relaxed">
                  Working on a government-recognized cybersecurity educational initiative focused on building structured verification infrastructure for cybersecurity learning resources across global platforms ranging from free to paid ecosystems. Leading the data analysis and verification team responsible for validating course information, organizing educational datasets, and designing AI-assisted verification workflows through the AI Verify Agent powered by XGBoost-based validation systems.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section>
            <div className="border-b border-[#2F3E46]/10 pb-8 mb-12">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">Featured Systems</h2>
            </div>
            <div className="flex flex-col gap-16">
              
              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group cursor-crosshair">
                <div className="md:col-span-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#52796F] group-hover:text-[#D4A373] transition-colors">Architecture</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium group-hover:translate-x-4 transition-transform duration-500">AI Verify Agent</h3>
                  <p className="text-lg text-[#52796F] leading-relaxed max-w-2xl">
                    An autonomous orchestration layer designed to critically evaluate, route, and verify outputs from unreliable LLMs. Built using deterministic pipelines and robust validation logic to ensure enterprise-grade reliability in AI workflows.
                  </p>
                </div>
              </div>

              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group cursor-crosshair">
                <div className="md:col-span-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#52796F] group-hover:text-[#D4A373] transition-colors">Infrastructure</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium group-hover:translate-x-4 transition-transform duration-500">eRaksha</h3>
                  <p className="text-lg text-[#52796F] leading-relaxed max-w-2xl">
                    A highly scalable video processing pipeline built to handle real-time deepfake detection across thousands of concurrent streams. Designed with edge-cloud hybrid topologies for minimal latency and maximum throughput.
                  </p>
                </div>
              </div>

              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group cursor-crosshair">
                <div className="md:col-span-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#52796F] group-hover:text-[#D4A373] transition-colors">Automation</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium group-hover:translate-x-4 transition-transform duration-500">Jarvis</h3>
                  <p className="text-lg text-[#52796F] leading-relaxed max-w-2xl">
                    A personalized, highly extensible intelligent assistant. Integrated with local APIs and automated scripting to handle daily workflows, system health monitoring, and rapid information retrieval.
                  </p>
                </div>
              </div>

              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group cursor-crosshair">
                <div className="md:col-span-4">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#52796F] group-hover:text-[#D4A373] transition-colors">Product</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium group-hover:translate-x-4 transition-transform duration-500">Pactify & rethink</h3>
                  <p className="text-lg text-[#52796F] leading-relaxed max-w-2xl">
                    Zero-to-one product development focusing on high-frequency data applications and cinematic user interfaces. Rethinking state management and interaction physics for maximum user immersion.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Experience & Leadership */}
          <section>
            <div className="border-b border-[#2F3E46]/10 pb-8 mb-12">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">Experience & Leadership</h2>
            </div>
            <div className="flex flex-col gap-16">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#2F3E46]">E-Cell</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#84A98C]">Founder & President</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <p className="text-lg text-[#52796F] leading-relaxed max-w-2xl">
                    Founded and scaled the Entrepreneurship Cell. Architected systems to foster startup culture, led a team of ambitious builders, and organized high-impact hackathons and networking ecosystems to connect students with industry founders.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4 flex flex-col gap-1">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#2F3E46]">YIIC 2.0</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#84A98C]">Engineering Intern</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <p className="text-lg text-[#52796F] leading-relaxed max-w-2xl">
                    Shipped production-ready features for experimental tech initiatives. Collaborated directly with technical leads to optimize backend pipelines and integrate new API endpoints under aggressive deadlines.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Technical Ecosystems & Certifications */}
          <section>
            <div className="border-b border-[#2F3E46]/10 pb-8 mb-12">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight">Technical Ecosystems</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <span className="text-sm font-bold uppercase tracking-widest text-[#52796F]">Certifications</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium">IBM Full Stack Software Developer</h3>
                  <p className="text-lg text-[#52796F]">Comprehensive training in cloud-native deployment, microservices, and React/Node.js architecture.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-medium">Andrew Ng Machine Learning Specialization</h3>
                  <p className="text-lg text-[#52796F]">Deep dive into supervised/unsupervised learning, neural networks, and rigorous mathematical foundations of AI models.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Collaboration Interests */}
          <section className="bg-[#2F3E46] text-[#F6F1E3] p-12 md:p-24 rounded-3xl mt-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A373] mb-8 block">
              Open For Interaction
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-8">
              Actively seeking ambitious <br />
              <span className="font-serif italic text-[#84A98C]">startup collaborations</span> and <br />
              <span className="font-serif italic text-[#D4A373]">experimental engineering</span> roles.
            </h2>
            <a href="mailto:paramppatel100@gmail.com" className="inline-flex items-center gap-4 group mt-8">
              <span className="text-sm font-bold uppercase tracking-widest text-[#F6F1E3] group-hover:text-[#D4A373] transition-colors">
                Send Transmission
              </span>
              <div className="w-10 h-10 rounded-full border border-[#F6F1E3]/20 flex items-center justify-center group-hover:border-[#D4A373] group-hover:bg-[#D4A373] group-hover:text-[#2F3E46] transition-all duration-500">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}
