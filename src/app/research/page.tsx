"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Database, Workflow, ShieldCheck, Cpu } from "lucide-react";

export default function CinematicResearchPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);

  return (
    <div ref={containerRef} className="relative bg-[#E9EDC9] text-[#2F3E46] overflow-hidden selection:bg-[#D4A373] selection:text-[#FEFAE0]">
      
      {/* ========================================= */}
      {/* GLOBAL ATMOSPHERE                         */}
      {/* ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FAEDCD] opacity-40 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-[#CCD5AE] opacity-30 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-[#84A98C] opacity-10 rounded-[100%] blur-[200px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* ========================================= */}
      {/* 1. HERO SECTION                           */}
      {/* ========================================= */}
      <motion.section 
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center pt-20 z-10"
      >
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-6 z-20">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#52796F] mb-8 block font-jetbrains"
            >
              Academic &amp; Applied Systems
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-[#2F3E46] leading-[1.05] mb-8"
            >
              Research &amp; <br />
              <span className="font-bold italic text-[#84A98C]">Verification</span> <br />
              Infrastructure.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-[#354F52] max-w-xl leading-relaxed mb-12"
            >
              Working on cybersecurity educational verification systems focused on organizing and validating cybersecurity learning resources across global platforms using intelligent automation and ML-assisted workflows.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-8"
            >
              <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2F3E46] border-b border-[#2F3E46]/30 pb-1 hover:border-[#2F3E46] transition-colors flex items-center gap-2">
                Explore Research <ArrowRight className="w-3 h-3" />
              </button>
              <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#84A98C] hover:text-[#52796F] transition-colors">
                Verification Systems
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative h-[600px] w-full flex justify-center items-center pointer-events-none">
            {/* Abstract Cinematic WebGL/CSS Representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
                className="w-[500px] h-[500px] rounded-full border border-[#84A98C]/20 border-dashed"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                className="absolute w-[350px] h-[350px] rounded-full border border-[#D4A373]/30"
              />
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[200px] h-[200px] bg-[#FEFAE0]/40 rounded-full blur-2xl"
              />
              {/* Floating glass planes */}
              <motion.div 
                initial={{ y: 50, opacity: 0, rotateX: 60, rotateZ: -20 }}
                animate={{ y: 0, opacity: 1, rotateX: 60, rotateZ: -20 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[300px] h-[400px] bg-gradient-to-br from-[#FEFAE0]/40 to-transparent backdrop-blur-md border border-[#FEFAE0]/50 shadow-2xl"
              />
              <motion.div 
                initial={{ y: 80, opacity: 0, rotateX: 60, rotateZ: -20 }}
                animate={{ y: 40, x: 40, opacity: 1, rotateX: 60, rotateZ: -20 }}
                transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[300px] h-[400px] border border-[#84A98C]/30"
              />
            </div>
          </div>
        </div>
      </motion.section>


      {/* ========================================= */}
      {/* 2. RESEARCH INITIATIVE SECTION            */}
      {/* ========================================= */}
      <section className="relative py-40 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FEFAE0] p-12 md:p-20 shadow-[0_30px_80px_-20px_rgba(47,62,70,0.08)] border border-[#354F52]/5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FAEDCD]/50 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#CCD5AE]/30 blur-3xl -z-10" />
            
            <span className="text-[10px] uppercase tracking-widest text-[#D4A373] mb-6 block font-jetbrains">
              CORE INITIATIVE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-10 font-serif text-[#2F3E46] max-w-4xl leading-tight">
              Cybersecurity Educational <br />
              <span className="italic font-light text-[#52796F]">Verification Infrastructure</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="prose prose-p:text-[#354F52] prose-p:leading-relaxed prose-lg">
                <p>
                  Contributing to a government-recognized cybersecurity research initiative focused on collecting, organizing, and validating cybersecurity learning resources across multiple domains ranging from free to paid global learning platforms.
                </p>
                <p>
                  The research initiative is currently in publication and review stages aligned with CERT-IN workflows.
                </p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#84A98C] mb-6 font-jetbrains">
                  Scalable Workflows For:
                </p>
                <ul className="space-y-4 list-none pl-0">
                  {[
                    "Educational intelligence systems",
                    "AI-assisted validation",
                    "Course verification infrastructure",
                    "Structured cybersecurity datasets",
                    "Intelligent automation pipelines"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#354F52]">
                      <span className="text-[#D4A373] mt-1"><Workflow className="w-4 h-4" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 3. FLOATING DOMAIN CLUSTERS               */}
      {/* ========================================= */}
      <section className="relative py-40 min-h-[80vh] flex items-center z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full relative h-[600px]">
          <div className="absolute top-0 left-0">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#52796F] font-jetbrains border-b border-[#52796F]/20 pb-2">
              Intelligence Domains
            </span>
          </div>

          {/* Floating Clusters */}
          {[
            { text: "Network Security", top: "20%", left: "10%", delay: 0 },
            { text: "Ethical Hacking", top: "15%", left: "40%", delay: 0.1 },
            { text: "Cloud Security", top: "35%", left: "70%", delay: 0.2 },
            { text: "Malware Analysis", top: "50%", left: "15%", delay: 0.3 },
            { text: "Digital Forensics", top: "45%", left: "45%", delay: 0.4 },
            { text: "Application Security", top: "65%", left: "75%", delay: 0.5 },
            { text: "Threat Intelligence", top: "80%", left: "25%", delay: 0.6 },
            { text: "Penetration Testing", top: "75%", left: "55%", delay: 0.7 },
            { text: "SOC & SIEM", top: "25%", left: "85%", delay: 0.8 },
          ].map((domain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.5, delay: domain.delay, ease: [0.16, 1, 0.3, 1] }}
              animate={{ 
                y: [0, -15, 0],
                x: [0, 10, 0]
              }}
              //@ts-ignore
              transition={{
                y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 7 + i, repeat: Infinity, ease: "easeInOut" },
              }}
              className="absolute group"
              style={{ top: domain.top, left: domain.left }}
            >
              <div className="relative px-6 py-4 bg-[#FEFAE0]/80 backdrop-blur-md border border-[#FAEDCD] shadow-lg rounded-[2px] cursor-default hover:bg-[#FAEDCD] transition-colors duration-500">
                <span className="text-sm md:text-lg font-medium text-[#2F3E46] whitespace-nowrap">
                  {domain.text}
                </span>
                <div className="absolute -z-10 inset-0 bg-[#D4A373]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {/* Connecting lines impression */}
              <div className="absolute top-1/2 left-full w-24 h-[1px] bg-gradient-to-r from-[#84A98C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================= */}
      {/* 4 & 5. ROLE & AI-VERIFY AGENT             */}
      {/* ========================================= */}
      <section className="relative py-40 z-10 bg-[#2F3E46] text-[#FEFAE0]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#354F52]/50 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#84A98C]/30 bg-[#354F52]/50 mb-8">
                <Database className="w-4 h-4 text-[#84A98C]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#CAD2C5] font-jetbrains">
                  Role &amp; Contribution
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-light leading-[1.1] mb-8">
                Data Analysis &amp; <br />
                <span className="font-bold italic text-[#D4A373]">Verification Systems</span>
              </h2>

              <div className="prose prose-p:text-[#CAD2C5] prose-p:leading-relaxed mb-10">
                <p>
                  Leading the data analysis and verification team responsible for validating cybersecurity educational datasets and organizing structured verification workflows.
                </p>
                <p>
                  To support the verification process, an ML-assisted verification workflow called <strong>AI-Verify Agent</strong> was developed using XGBoost-based validation systems capable of analyzing and validating course-related information from PDFs, structured datasets, and web-based sources.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#84A98C] mb-4 block border-b border-[#84A98C]/30 pb-2">
                    System Focus
                  </span>
                  <ul className="space-y-2 text-xs text-[#CAD2C5]">
                    <li>Educational data validation</li>
                    <li>Course verification systems</li>
                    <li>PDF analysis workflows</li>
                    <li>Structured intelligence pipelines</li>
                    <li>Scalable automation infrastructure</li>
                  </ul>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#84A98C] mb-4 block border-b border-[#84A98C]/30 pb-2">
                    Workflow Core
                  </span>
                  <ul className="space-y-2 text-xs text-[#CAD2C5]">
                    <li>Machine learning</li>
                    <li>Automation workflows</li>
                    <li>Web extraction</li>
                    <li>Educational intelligence systems</li>
                    <li>Scalable validation pipelines</li>
                  </ul>
                </div>
              </div>

            </motion.div>
          </div>

          <div className="lg:col-span-7 h-[600px] relative">
            {/* Cinematic Interactive System Visualization */}
            <div className="absolute inset-0 rounded-sm border border-[#52796F]/30 bg-[#354F52]/20 overflow-hidden flex items-center justify-center shadow-2xl">
              
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2F3E46] via-transparent to-[#52796F]/20 z-0" />
              
              {/* Abstract flowing pathways */}
              <svg className="absolute w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 100 100">
                <motion.path 
                  d="M 0,50 Q 25,20 50,50 T 100,50" 
                  fill="transparent" 
                  stroke="#D4A373" 
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.path 
                  d="M 0,70 Q 30,90 60,40 T 100,60" 
                  fill="transparent" 
                  stroke="#84A98C" 
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 4, delay: 1, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />
                <motion.path 
                  d="M 0,30 Q 40,10 70,60 T 100,20" 
                  fill="transparent" 
                  stroke="#CAD2C5" 
                  strokeWidth="0.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 5, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
                />
              </svg>

              {/* Central Node representing AI-Verify Agent */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="relative z-10 w-40 h-40 flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full border border-[#D4A373]/50 animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-2 rounded-full border border-[#84A98C]/40 animate-[spin_7s_linear_infinite_reverse]" />
                <div className="absolute inset-0 bg-[#52796F]/20 rounded-full blur-xl animate-pulse" />
                <Cpu className="w-10 h-10 text-[#FEFAE0]" />
              </motion.div>

              {/* Data streams */}
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-[48%] left-0 w-20 h-[1px] bg-gradient-to-r from-transparent via-[#FEFAE0] to-transparent shadow-[0_0_10px_#FEFAE0]"
              />
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-[68%] left-0 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#84A98C] to-transparent shadow-[0_0_10px_#84A98C]"
              />

              <div className="absolute bottom-6 left-6">
                <span className="font-jetbrains text-[10px] tracking-widest text-[#84A98C]">SYSTEM.STATE // ACTIVE_VERIFICATION</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* 6. SMALL "MORE RESEARCH IN PROGRESS"      */}
      {/* ========================================= */}
      <section className="relative py-40 z-10 bg-[#E9EDC9] text-[#2F3E46] overflow-hidden">
        
        {/* Subtle Ambient Motion Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#354F52]/5 rounded-full border-dashed"
          />
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-[#FAEDCD] rounded-full blur-[100px]" 
          />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#84A98C]/20 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4A373] mb-6 block font-jetbrains">
              Ongoing Evolution
            </span>
            <h2 className="text-3xl md:text-5xl font-light leading-[1.1] mb-8">
              More Research <br />
              <span className="font-bold italic text-[#84A98C]">In Progress.</span>
            </h2>
            <p className="text-sm text-[#354F52] leading-relaxed max-w-xl mx-auto">
              Exploring additional systems and workflows across intelligent automation, educational infrastructure, verification systems, and experimental AI-assisted engineering environments.
            </p>
          </motion.div>

          {/* Minimal Floating Elements */}
          <div className="mt-20 h-[100px] relative w-full max-w-lg mx-auto">
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-[20%] w-[100px] h-[40px] border border-[#354F52]/10 bg-[#FEFAE0]/50 backdrop-blur-sm flex items-center justify-center"
             >
               <span className="text-[8px] font-jetbrains text-[#52796F]">ARCH_01</span>
             </motion.div>
             <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20px] right-[20%] w-[120px] h-[50px] border border-[#354F52]/10 bg-[#FAEDCD]/50 backdrop-blur-sm flex items-center justify-center"
             >
               <span className="text-[8px] font-jetbrains text-[#D4A373]">SYS_VALIDATE</span>
             </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
