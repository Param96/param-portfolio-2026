"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, Code, TerminalSquare, Briefcase, Download, FlaskConical, Cpu, GitBranch } from "lucide-react";

const WalkingFigure = () => (
  <svg width="40" height="70" viewBox="0 0 40 70" className="text-[var(--footer-ink)]" fill="none">
    {/* Head */}
    <circle cx="20" cy="10" r="7" stroke="currentColor" strokeWidth="2.5" fill="var(--bg-main)" />
    {/* Body */}
    <path d="M 20 17 L 20 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Arm (Swing Forward) */}
    <path d="M 20 22 L 12 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Arm (Swing Back) */}
    <path d="M 20 22 L 28 35 L 32 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Leg (Straight/Planted) */}
    <path d="M 20 40 L 15 65" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Leg (Bent/Stepping) */}
    <path d="M 20 40 L 28 50 L 24 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Cairn = ({ age = 0 }: { age?: number }) => (
  <svg width="30" height="40" viewBox="0 0 30 40" fill="none" className="text-[var(--footer-ink)]">
    <path d="M 4 35 C 4 38, 26 38, 26 35 C 28 30, 2 30, 4 35 Z" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-main)" strokeLinejoin="round" />
    <path d="M 7 28 C 7 31, 23 31, 23 28 C 24 23, 6 23, 7 28 Z" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-main)" strokeLinejoin="round" />
    <path d="M 11 22 C 11 25, 19 25, 19 22 C 20 18, 10 18, 11 22 Z" stroke="currentColor" strokeWidth="1.5" fill="var(--bg-main)" strokeLinejoin="round" />
    
    {/* Aging effects (Moss/Vines) */}
    {age > 0 && <path d="M 5 33 C 8 30, 10 35, 15 32" stroke="var(--moss)" strokeWidth="1.2" fill="none" />}
    {age > 1 && <circle cx="21" cy="27" r="1.5" fill="var(--moss)" />}
    {age > 2 && <path d="M 22 28 C 20 24, 15 26, 13 22" stroke="var(--moss)" strokeWidth="1.2" fill="none" />}
    {age > 3 && <circle cx="9" cy="23" r="1.5" fill="var(--moss)" />}
    {age > 4 && <path d="M 4 35 C 2 30, 6 25, 8 27" stroke="var(--moss)" strokeWidth="1.2" fill="none" />}
  </svg>
);

// Reuse some existing birds
const Owl = () => (
  <svg width="20" height="20" viewBox="0 0 100 100" fill="none" className="text-[var(--footer-ink)]">
    <path d="M 20 50 C 20 15 80 15 80 50 C 80 90 20 90 20 50 Z" stroke="currentColor" strokeWidth="4" fill="var(--bg-main)" />
    <circle cx="35" cy="40" r="10" stroke="currentColor" strokeWidth="4" fill="var(--bg-main)" />
    <circle cx="65" cy="40" r="10" stroke="currentColor" strokeWidth="4" fill="var(--bg-main)" />
    <circle cx="35" cy="40" r="3" fill="currentColor" />
    <circle cx="65" cy="40" r="3" fill="currentColor" />
    <path d="M 45 55 L 55 55 L 50 65 Z" fill="var(--amber)" />
  </svg>
);

const Raven = () => (
  <svg width="24" height="24" viewBox="0 0 100 100" fill="none" className="text-[var(--footer-ink)]">
    <path d="M 20 60 C 10 40 30 20 50 20 C 70 20 80 30 75 50 C 70 70 40 80 20 60 Z" stroke="currentColor" strokeWidth="4" fill="var(--bg-main)" />
    <path d="M 75 40 L 95 45 L 75 50 Z" fill="currentColor" />
    <circle cx="60" cy="35" r="3" fill="var(--amber)" />
    <path d="M 30 50 C 20 70 10 60 5 45 C 10 55 25 55 30 50 Z" stroke="currentColor" strokeWidth="4" fill="currentColor" />
  </svg>
);

const SectionBubble = ({ subtitle, title, align = 'left', children }: { subtitle: string, title: string, align?: 'left' | 'right' | 'center', children: React.ReactNode }) => (
  <div className={`relative rounded-xl border px-6 py-6 w-full max-w-[360px] shadow-sm transition-colors duration-500 bg-[var(--footer-bubble-fill)] border-[var(--footer-ink)] text-[var(--footer-text)] ${align === 'right' ? 'ml-auto' : align === 'center' ? 'mx-auto' : ''}`}>
    <div className={`flex flex-col gap-1 mb-4 ${align === 'center' ? 'items-center text-center' : ''}`}>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-inter opacity-70" style={{ color: 'var(--amber)' }}>{subtitle}</span>
      <h3 className="text-2xl font-light tracking-tight">{title}</h3>
    </div>
    <div className={`text-sm font-light leading-relaxed opacity-90 space-y-4 ${align === 'center' ? 'text-center' : ''}`}>
      {children}
    </div>
    <div className={`absolute border-b border-r w-3 h-3 transition-colors duration-500 bg-[var(--footer-bubble-fill)] border-[var(--footer-ink)] -bottom-[6px] ${align === 'left' ? 'left-10' : align === 'right' ? 'right-10' : 'left-1/2 -ml-1.5'} transform rotate-45`} />
  </div>
);

export default function ResumeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Smooth out the scroll progress for the figure's position
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Map the path: Intro (50%), Research (75%), Systems (25%), Leadership (75%), Contact (50%)
  const figureX = useTransform(smoothProgress, 
    [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1], 
    ["50%", "50%", "75%", "25%", "75%", "50%", "50%"]
  );

  // Background Parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={containerRef} className="w-full h-[600vh] relative text-[var(--footer-ink)] overflow-clip">
      
      {/* FIXED PDF BUTTON */}
      <div className="fixed top-24 right-6 md:right-12 z-50">
        <a 
          href="/resume.pdf" 
          target="_blank"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--footer-ink)] text-[var(--footer-ink)] hover:bg-[var(--footer-ink)] hover:text-[var(--bg-main)] transition-colors text-xs font-inter font-semibold uppercase tracking-[0.15em] bg-[var(--bg-main)]/80 backdrop-blur-md shadow-sm"
        >
          <Download className="w-4 h-4" /> PDF Version
        </a>
      </div>

      {/* FIXED VIEWPORT BACKGROUND (PARALLAX) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden pointer-events-none -z-10">
        
        {/* Distant Background Layer */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-10">
          <svg className="w-full h-[120vh]" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Distant Hills */}
            <path d="M 0 60 Q 25 50 50 60 T 100 55 L 100 120 L 0 120 Z" fill="currentColor" />
            <path d="M 0 75 Q 30 65 60 80 T 100 70 L 100 120 L 0 120 Z" fill="currentColor" />
          </svg>
        </motion.div>

        {/* Midground Layer (Trees) */}
        <motion.div style={{ y: midY }} className="absolute inset-0 opacity-20">
           {/* Simple tree silhouettes scattered */}
           <svg className="absolute top-[10%] left-[10%] w-32 h-32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
             <path d="M 50 100 L 50 40 M 50 60 L 30 30 M 50 50 L 70 20 M 35 45 L 20 30" />
           </svg>
           <svg className="absolute top-[40%] right-[15%] w-24 h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
             <path d="M 50 100 L 50 40 M 50 60 L 30 30 M 50 50 L 70 20 M 35 45 L 20 30" />
           </svg>
           <svg className="absolute top-[70%] left-[20%] w-40 h-40" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
             <path d="M 50 100 L 50 40 M 50 60 L 30 30 M 50 50 L 70 20 M 35 45 L 20 30" />
           </svg>
        </motion.div>

        {/* The Walking Figure */}
        <motion.div 
          style={{ left: figureX, x: "-50%", y: "65vh" }} 
          className="absolute z-20"
        >
          <WalkingFigure />
        </motion.div>
      </div>

      {/* FOREGROUND SCROLLING LAYER (The Path & Sections) */}
      <div className="absolute top-0 left-0 w-full h-[600vh] z-10 pointer-events-none">
        
        {/* The Winding Path SVG */}
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M 50 0 C 50 5, 50 5, 50 10 C 50 20, 75 20, 75 30 C 75 40, 25 40, 25 50 C 25 60, 75 60, 75 70 C 75 80, 50 80, 50 90 C 50 95, 50 100, 50 100" 
            stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" opacity="0.3" 
          />
          <path 
            d="M 48 0 C 48 5, 48 5, 48 10 C 48 20, 73 20, 73 30 C 73 40, 23 40, 23 50 C 23 60, 73 60, 73 70 C 73 80, 48 80, 48 90 C 48 95, 48 100, 48 100" 
            stroke="currentColor" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" opacity="0.4" 
          />
        </svg>

        {/* SECTION 1: INTRO (10% Scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-full pointer-events-auto flex flex-col items-center px-6"
          style={{ top: '8%' }}
        >
          <div className="relative flex flex-col items-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] mb-8">
              Param <span className="font-serif italic text-[var(--amber)]">Patel</span>
            </h1>
            
            <SectionBubble subtitle="Founder & Systems Engineer" title="Engineering the next paradigm." align="center">
              <p>
                An AI systems builder, experimental product developer, and applied ML engineer. I build intelligent infrastructure, orchestration workflows, and automation environments. A technical founder exploring the intersection of real-world deployment and scalable systems architecture.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-6 font-bold uppercase tracking-widest" style={{ color: 'var(--amber)' }}>
                <a href="mailto:paramppatel100@gmail.com" className="hover:text-[var(--footer-ink)] transition-colors flex items-center gap-2">
                  <TerminalSquare className="w-4 h-4" /> Email
                </a>
                <a href="https://github.com/Param96" className="hover:text-[var(--footer-ink)] transition-colors flex items-center gap-2">
                  <Code className="w-4 h-4" /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/paramp06/" className="hover:text-[var(--footer-ink)] transition-colors flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </SectionBubble>
            
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Cairn age={0} />
            </div>
          </div>
        </motion.div>

        {/* SECTION 2: RESEARCH (30% Scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-full pointer-events-auto px-6 md:px-24 flex"
          style={{ top: '28%' }}
        >
          <div className="w-full max-w-5xl mx-auto relative flex justify-end">
            <div className="mr-[15%]">
              <SectionBubble subtitle="CERT-IN Initiative" title="Research Infrastructure" align="right">
                <div className="flex items-center gap-3 mb-2 text-[var(--moss)]">
                  <FlaskConical className="w-5 h-5" />
                  <span className="font-medium">Lead — Data Analysis & Verification</span>
                </div>
                <p className="font-medium italic">Cybersecurity Educational Verification</p>
                <p>
                  A government-recognized cybersecurity educational initiative focused on collecting, organizing, validating, and structuring cybersecurity learning resources across global platforms.
                </p>
                <p>
                  Leading the Data Analysis & Verification Team to design structured verification workflows. Responsible for building AI-assisted validation systems, structuring educational intelligence pipelines, and validating information directly from PDFs, datasets, websites, and course metadata.
                </p>
              </SectionBubble>
            </div>
            <div className="absolute right-0 bottom-0 md:-right-10 flex items-end gap-2">
              <Owl />
              <Cairn age={1} />
            </div>
          </div>
        </motion.div>

        {/* SECTION 3: SYSTEMS (50% Scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-full pointer-events-auto px-6 md:px-24 flex"
          style={{ top: '48%' }}
        >
          <div className="w-full max-w-5xl mx-auto relative flex justify-start">
            <div className="ml-[15%]">
              <SectionBubble subtitle="Evolving Systems" title="Intelligent Infrastructure" align="left">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-[var(--amber)] mb-1"><Cpu className="w-4 h-4" /><span className="font-medium text-xs uppercase tracking-wider">Active Infrastructure</span></div>
                  <h4 className="font-medium">AI Verify Agent</h4>
                  <p className="text-xs mt-1">An intelligent educational verification infrastructure designed to validate course-related information from unstructured datasets. Built with XGBoost-based validation workflows.</p>
                </div>
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-[var(--moss)] mb-1"><Cpu className="w-4 h-4" /><span className="font-medium text-xs uppercase tracking-wider">Experimental Platform</span></div>
                  <h4 className="font-medium">Pactify</h4>
                  <p className="text-xs mt-1">An AI-powered founder workflow platform exploring automation systems, operational productivity infrastructure, and safe generation systems.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#703838] mb-1"><Cpu className="w-4 h-4" /><span className="font-medium text-xs uppercase tracking-wider">Orchestration Engine</span></div>
                  <h4 className="font-medium">Jarvis</h4>
                  <p className="text-xs mt-1">A modular agentic AI assistant system inspired by autonomous orchestration workflows. Built to experiment with AI copilots.</p>
                </div>
              </SectionBubble>
            </div>
            <div className="absolute left-0 bottom-0 md:-left-10 flex items-end gap-2">
              <Cairn age={2} />
              <div className="mb-4"><Raven /></div>
            </div>
          </div>
        </motion.div>

        {/* SECTION 4: LEADERSHIP (70% Scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-full pointer-events-auto px-6 md:px-24 flex"
          style={{ top: '68%' }}
        >
          <div className="w-full max-w-5xl mx-auto relative flex justify-end">
            <div className="mr-[15%]">
              <SectionBubble subtitle="Operational Leadership" title="Execution & Strategy" align="right">
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-[var(--amber)] mb-1"><GitBranch className="w-4 h-4" /><span className="font-medium text-xs uppercase tracking-wider">Founder & President</span></div>
                  <h4 className="font-medium">Entrepreneurship Cell</h4>
                  <p className="text-xs mt-1">Built and scaled a 30-member execution team focused on entrepreneurial ecosystems. Directed execution systems, secured mentorship MoUs, and organized startup-focused initiatives.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[var(--moss)] mb-1"><GitBranch className="w-4 h-4" /><span className="font-medium text-xs uppercase tracking-wider">Engineering Intern</span></div>
                  <h4 className="font-medium">YIIC 2.0</h4>
                  <p className="text-xs mt-1">Shipped production-ready features for experimental tech initiatives. Collaborated directly with technical leads to optimize backend pipelines and integrate new API endpoints.</p>
                </div>
              </SectionBubble>
            </div>
            <div className="absolute right-0 bottom-0 md:-right-10">
              <Cairn age={4} />
            </div>
          </div>
        </motion.div>

        {/* SECTION 5: CONTACT (90% Scroll) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute w-full pointer-events-auto px-6 md:px-24 flex justify-center"
          style={{ top: '88%' }}
        >
          <div className="relative">
            <SectionBubble subtitle="Open For Interaction" title="Actively seeking ambitious startup collaborations and experimental engineering roles." align="center">
              <a href="mailto:paramppatel100@gmail.com" className="inline-flex items-center gap-4 group/btn mt-6 cursor-pointer">
                <span className="text-sm font-bold uppercase tracking-widest transition-colors font-inter">
                  Initialize Contact
                </span>
                <div className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover/btn:bg-[var(--footer-ink)] group-hover/btn:text-[var(--bg-main)] transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4 transition-colors duration-500" />
                </div>
              </a>
            </SectionBubble>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
              <Cairn age={5} />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
