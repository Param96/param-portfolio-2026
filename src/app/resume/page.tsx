"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code, TerminalSquare, FlaskConical, GitBranch, Cpu, Briefcase } from "lucide-react";
import posthog from "posthog-js";

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#E9EDC9] text-[#2F3E46] pt-32 pb-40 px-6 md:px-24 font-sans selection:bg-[#D4A373] selection:text-[#FEFAE0] relative overflow-hidden">
      
      {/* Cinematic Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#D4A373]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[#84A98C]/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* ── HEADER ── */}
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#84A98C] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#84A98C]"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#84A98C] font-jetbrains">
                Founder & Systems Engineer
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-light tracking-tighter leading-[0.9] mb-12 text-[#2F3E46]">
              Param <span className="font-serif italic text-[#D4A373]">Patel</span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 md:gap-24 text-lg font-medium text-[#354F52] max-w-4xl">
              <p className="flex-1 leading-relaxed font-light">
                An AI systems builder, experimental product developer, and applied ML engineer. I build intelligent infrastructure, orchestration workflows, and automation environments. A technical founder exploring the intersection of real-world deployment and scalable systems architecture.
              </p>
              <div className="flex flex-col gap-2 shrink-0 text-sm font-bold uppercase tracking-widest text-[#52796F] font-jetbrains">
                <a href="mailto:paramppatel100@gmail.com" onClick={() => posthog.capture('resume_contact_clicked', { channel: 'email' })} className="hover:text-[#D4A373] transition-colors flex items-center gap-2">
                  <TerminalSquare className="w-4 h-4 text-[#84A98C]" /> Email
                </a>
                <a href="https://github.com/Param96" target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture('resume_contact_clicked', { channel: 'github' })} className="hover:text-[#D4A373] transition-colors flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#D4A373]" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/paramp06/" target="_blank" rel="noopener noreferrer" onClick={() => posthog.capture('resume_contact_clicked', { channel: 'linkedin' })} className="hover:text-[#D4A373] transition-colors flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#84A98C]" /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        </header>

        {/* ── SECTIONS ── */}
        <div className="space-y-40">

          {/* Research & Intelligence Infrastructure */}
          <section>
            <div className="border-b border-[#84A98C]/20 pb-8 mb-12 flex items-center justify-between">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2F3E46]">Research Infrastructure</h2>
              <FlaskConical className="w-6 h-6 text-[#84A98C]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group">
              <div className="md:col-span-4 flex flex-col gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] font-jetbrains">Lead — Data Analysis & Verification</span>
                <span className="text-sm font-bold text-[#52796F]">CERT-IN Initiative</span>
              </div>
              <div className="md:col-span-8 flex flex-col gap-6">
                <h3 className="text-3xl font-medium text-[#2F3E46] group-hover:text-[#D4A373] transition-colors duration-500">Cybersecurity Educational Verification & Intelligence Infrastructure</h3>
                <div className="text-lg text-[#354F52] leading-relaxed space-y-4 font-light">
                  <p>
                    A government-recognized cybersecurity educational initiative focused on collecting, organizing, validating, and structuring cybersecurity learning resources across global platforms.
                  </p>
                  <p>
                    Leading the Data Analysis & Verification Team to design structured verification workflows. Responsible for building AI-assisted validation systems, structuring educational intelligence pipelines, and validating information directly from PDFs, datasets, websites, and course metadata.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Evolving Systems & Infrastructure */}
          <section>
            <div className="border-b border-[#84A98C]/20 pb-8 mb-12 flex items-center justify-between">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2F3E46]">Evolving Systems</h2>
              <Cpu className="w-6 h-6 text-[#D4A373]" />
            </div>
            <div className="flex flex-col gap-16">
              
              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group relative">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#84A98C] font-jetbrains">Active Infrastructure</span>
                  <span className="text-sm font-bold text-[#52796F]">Applied ML Pipeline</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium text-[#2F3E46] group-hover:text-[#84A98C] transition-colors duration-500">AI Verify Agent</h3>
                  <p className="text-lg text-[#354F52] font-light leading-relaxed max-w-2xl">
                    An intelligent educational verification infrastructure designed to validate course-related information from unstructured datasets. Built with XGBoost-based validation workflows to automate scalable data validation and educational intelligence infrastructure.
                  </p>
                </div>
              </div>

              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group relative">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] font-jetbrains">Experimental Platform</span>
                  <span className="text-sm font-bold text-[#52796F]">Startup Tooling</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium text-[#2F3E46] group-hover:text-[#D4A373] transition-colors duration-500">Pactify</h3>
                  <p className="text-lg text-[#354F52] font-light leading-relaxed max-w-2xl">
                    An AI-powered founder workflow platform exploring automation systems, operational productivity infrastructure, and safe generation systems tailored for startup-oriented workflows.
                  </p>
                </div>
              </div>

              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group relative">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#52796F] font-jetbrains">Orchestration Engine</span>
                  <span className="text-sm font-bold text-[#52796F]">Agentic Environment</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium text-[#2F3E46] group-hover:text-[#84A98C] transition-colors duration-500">Jarvis</h3>
                  <p className="text-lg text-[#354F52] font-light leading-relaxed max-w-2xl">
                    A modular agentic AI assistant system inspired by autonomous orchestration workflows. Built to experiment with AI copilots, modular AI infrastructure, and experimental interaction layers.
                  </p>
                </div>
              </div>

              {/* Project Item */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group relative">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] font-jetbrains">Competition Achievement</span>
                  <span className="text-sm font-bold text-[#52796F]">Top 10 Finalist — IIT Delhi</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <h3 className="text-3xl md:text-4xl font-medium text-[#2F3E46] group-hover:text-[#D4A373] transition-colors duration-500">eRaksha Deepfake Detection</h3>
                  <p className="text-lg text-[#354F52] font-light leading-relaxed max-w-2xl">
                    An AI deepfake detection system developed collaboratively to identify manipulated media authenticity across images, video, and audio. Focused on applied AI security systems and verification workflows.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Operational Leadership */}
          <section>
            <div className="border-b border-[#84A98C]/20 pb-8 mb-12 flex items-center justify-between">
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#2F3E46]">Operational Leadership</h2>
              <GitBranch className="w-6 h-6 text-[#52796F]" />
            </div>
            <div className="flex flex-col gap-16">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4A373] font-jetbrains">Founder & Current President</span>
                  <span className="text-sm font-bold text-[#52796F]">Entrepreneurship Cell</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <p className="text-lg text-[#354F52] font-light leading-relaxed max-w-2xl">
                    Built and scaled a 30-member execution team focused on entrepreneurial ecosystems. Directed execution systems, secured mentorship MoUs, and organized startup-focused initiatives to foster an authentic innovation culture from the ground up.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12 group">
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#84A98C] font-jetbrains">Engineering Intern</span>
                  <span className="text-sm font-bold text-[#52796F]">YIIC 2.0</span>
                </div>
                <div className="md:col-span-8 flex flex-col gap-4">
                  <p className="text-lg text-[#354F52] font-light leading-relaxed max-w-2xl">
                    Shipped production-ready features for experimental tech initiatives. Collaborated directly with technical leads to optimize backend pipelines and integrate new API endpoints under aggressive deadlines.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* Collaboration Interests */}
          <section className="bg-[#FEFAE0]/60 border border-[#84A98C]/10 text-[#2F3E46] p-12 md:p-24 rounded-3xl mt-12 relative overflow-hidden group shadow-sm hover:shadow-xl transition-shadow duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#D4A373]/10 to-[#84A98C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A373] mb-8 block relative z-10 font-jetbrains">
              Open For Interaction
            </span>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter leading-[1.1] mb-8 relative z-10">
              Actively seeking ambitious <br />
              <span className="font-serif italic text-[#84A98C]">startup collaborations</span> and <br />
              <span className="font-serif italic text-[#D4A373]">experimental engineering</span> roles.
            </h2>
            <a href="mailto:paramppatel100@gmail.com" onClick={() => posthog.capture('resume_contact_clicked', { channel: 'email', source: 'cta_block' })} className="inline-flex items-center gap-4 group/btn mt-8 relative z-10 cursor-pointer">
              <span className="text-sm font-bold uppercase tracking-widest text-[#52796F] group-hover/btn:text-[#D4A373] transition-colors font-jetbrains">
                Initialize Contact
              </span>
              <div className="w-10 h-10 rounded-full border border-[#84A98C]/30 flex items-center justify-center group-hover/btn:border-[#D4A373] group-hover/btn:bg-[#D4A373] group-hover/btn:text-[#FEFAE0] transition-all duration-500 bg-[#E9EDC9]">
                <ArrowUpRight className="w-4 h-4 text-[#84A98C] group-hover/btn:text-[#FEFAE0]" />
              </div>
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}
