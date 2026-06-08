"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import posthog from "posthog-js";
import { Layers, Database, ShieldCheck, Workflow } from "lucide-react";

export default function ResearchSystems() {
  return (
    <section className="relative w-full py-40 bg-[#E9EDC9] text-[#2F3E46] overflow-hidden">
      
      {/* Abstract Background Atmospheric Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-full bg-[#FAEDCD] opacity-40 rounded-bl-[100%] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#CCD5AE] opacity-20 rounded-tr-[100%] blur-[150px] pointer-events-none" />

      {/* Subtle Animated Topology Overlay (CSS Pattern) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#354F52_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* ========================================= */}
          {/* LEFT SIDE: Heading & Context              */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#84A98C] mb-6 block font-jetbrains">
              Academic &amp; Applied Systems
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#2F3E46] leading-[1.1] mb-10">
              Research &amp; <br />
              <span className="font-bold italic text-[#52796F]">Verification</span> Systems
            </h2>
            
            <div className="prose prose-p:text-[#354F52] prose-p:leading-relaxed prose-li:text-[#354F52] mb-10">
              <p>
                Contributing to a government-recognized cybersecurity research initiative focused on collecting, organizing, and verifying cybersecurity learning resources across multiple domains.
              </p>
              <p>
                The initiative involves analyzing cybersecurity courses from global platforms ranging from free to paid learning ecosystems while building structured workflows for validating course information and educational datasets.
              </p>
              <p className="font-medium mt-6 mb-4">The overall system combines:</p>
              <ul className="space-y-2 list-none pl-0">
                {[
                  "Educational intelligence infrastructure",
                  "AI-assisted verification workflows",
                  "Data analysis pipelines",
                  "Intelligent validation systems",
                  "Scalable automation processes"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-[#D4A373] mt-1.5 opacity-60">
                      <Workflow className="w-3 h-3" />
                    </span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#84A98C]/30 bg-[#FEFAE0]/50 rounded-sm">
              <ShieldCheck className="w-4 h-4 text-[#84A98C]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#52796F]">
                CERT-IN Aligned Workflows
              </span>
            </div>
          </motion.div>


          {/* ========================================= */}
          {/* RIGHT SIDE: Premium Cinematic Panel       */}
          {/* ========================================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            {/* Layered Paper Effect (Background offset) */}
            <div className="absolute top-4 left-4 w-full h-full bg-[#FAEDCD] border border-[#354F52]/5 shadow-sm -z-10" />
            <div className="absolute top-8 left-8 w-full h-full bg-[#CCD5AE]/20 blur-xl -z-20" />
            
            <div className="bg-[#FEFAE0] p-10 md:p-14 border border-[#354F52]/10 shadow-[0_20px_60px_-15px_rgba(47,62,70,0.05)] relative overflow-hidden">
              
              {/* Subtle visual decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4A373]/10 to-transparent pointer-events-none" />
              <div className="absolute -left-10 top-20 w-[1px] h-32 bg-gradient-to-b from-transparent via-[#84A98C]/30 to-transparent pointer-events-none" />
              
              <h3 className="text-2xl md:text-3xl font-bold mb-6 font-serif text-[#2F3E46] leading-tight pr-8">
                Cybersecurity Educational <br className="hidden md:block"/>
                <span className="italic font-light text-[#52796F]">Intelligence Infrastructure</span>
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {[
                  "CERT-IN Research Initiative",
                  "Educational Intelligence Systems",
                  "AI-Assisted Verification",
                  "Cybersecurity Validation Workflows"
                ].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[#FAEDCD] text-[9px] uppercase tracking-[0.15em] text-[#354F52] font-jetbrains border border-[#D4A373]/10">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-sm text-[#354F52] leading-relaxed mb-6">
                A large-scale cybersecurity educational verification initiative focused on validating and organizing learning resources across multiple domains including:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4 mb-12">
                {[
                  "Network Security", "Ethical Hacking", "Cloud Security", 
                  "Malware Analysis", "Digital Forensics", "Web Security", 
                  "Penetration Testing", "Application Security", "Cyber Threat Intelligence"
                ].map((domain, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#D4A373]" />
                    <span className="text-[11px] text-[#52796F] font-medium">{domain}</span>
                  </div>
                ))}
              </div>

              {/* My Role Subsection */}
              <div className="relative pt-12 border-t border-[#354F52]/10 mt-12">
                <div className="absolute -top-[17px] left-0 bg-[#FEFAE0] pr-4">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-[#84A98C]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#52796F] font-jetbrains">
                      Data Analysis &amp; Verification Team
                    </span>
                  </div>
                </div>

                <div className="prose prose-p:text-[#354F52] prose-p:text-sm prose-p:leading-relaxed">
                  <p>
                    Leading the data analysis and verification team responsible for validating cybersecurity educational datasets and organizing structured course intelligence workflows.
                  </p>
                  <p>
                    To support the verification process, an ML-assisted verification system called <strong>AI-Verify Agent</strong> was developed using XGBoost-based validation workflows capable of analyzing and validating course-related information from PDFs, structured datasets, and web-based sources.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373] mb-4 block border-b border-[#D4A373]/20 pb-2">
                      System Capabilities
                    </span>
                    <ul className="space-y-2">
                      {[
                        "Verify cybersecurity course information",
                        "Validate educational content accuracy",
                        "Analyze structured datasets",
                        "Process PDF-based information",
                        "Support scalable verification workflows",
                        "Improve learning resource reliability"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#52796F] leading-relaxed">
                          <span className="text-[#84A98C] mt-0.5 opacity-50">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A373] mb-4 block border-b border-[#D4A373]/20 pb-2">
                      Workflow Foundation
                    </span>
                    <ul className="space-y-2">
                      {[
                        "Machine learning",
                        "Automation systems",
                        "Web data extraction",
                        "Educational intelligence workflows",
                        "Scalable validation infrastructure"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#52796F] leading-relaxed">
                          <span className="text-[#84A98C] mt-0.5 opacity-50">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-[#354F52]/10 flex justify-end">
                  <Link
                    href="/research"
                    className="flex items-center gap-4 group/btn"
                    onClick={() => posthog.capture('research_accessed', { source: 'homepage' })}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-[#52796F] group-hover/btn:text-[#2F3E46] transition-colors">Enter Research Infrastructure</span>
                    <div className="w-10 h-10 rounded-full border border-[#84A98C]/30 flex items-center justify-center group-hover/btn:border-[#84A98C] group-hover/btn:bg-[#84A98C]/10 transition-all duration-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#84A98C] group-hover/btn:text-[#2F3E46]">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </div>
                  </Link>
                </div>

              </div>

            </div>
          </motion.div>
          
        </div>

      </div>
    </section>
  );
}
