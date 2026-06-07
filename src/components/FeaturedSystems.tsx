"use client";

import ScrollReveal from "./ScrollReveal";
import { ArrowUpRight, Github, Cpu, Shield, Bot, Database } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState } from "react";

const systems = [
  {
    title: "AI-Verification-Agent",
    category: "ML + Agentic AI",
    description: "An advanced autonomous agent designed to verify complex datasets and execute multi-step logic workflows. Built with scalable Python microservices and fine-tuned LLM routing.",
    icon: <Cpu className="w-5 h-5 text-[#D4A373]" />,
    tags: ["Python", "LangChain", "FastAPI", "Agentic Workflow"],
    link: "#",
    github: "#",
    color: "#D4A373",
  },
  {
    title: "eRaksha",
    category: "Cybersecurity & Education",
    description: "A highly scalable deepfake detection and educational system. Ranked Top 10 nationally at IIT Delhi. Processes media streams in real-time to identify synthetic manipulations.",
    icon: <Shield className="w-5 h-5 text-[#81B29A]" />,
    tags: ["PyTorch", "OpenCV", "Next.js", "AWS"],
    link: "#",
    github: "#",
    color: "#81B29A",
  },
  {
    title: "Jarvis",
    category: "Intelligent Automation",
    description: "A centralized, voice-activated smart system orchestrating local applications, fetching live data streams, and automating repetitive development tasks.",
    icon: <Bot className="w-5 h-5 text-[#D4A373]" />,
    tags: ["Speech-to-Text", "Node.js", "WebSockets"],
    link: "#",
    github: "#",
    color: "#D4A373",
  }
];

function TiltCard({ children, color }: { children: React.ReactNode, color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);
  const shadowValue = useTransform(springY, [-0.5, 0.5], ["0px 10px 30px rgba(0,0,0,0.05)", "0px 30px 60px rgba(0,0,0,0.15)"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="w-full lg:w-3/5 aspect-[16/10] relative group z-20 perspective-1000"
      style={{
        rotateX,
        rotateY,
        boxShadow: shadowValue,
        transformStyle: "preserve-3d"
      }}
    >
      <div className="absolute inset-0 bg-[#2F3E46]/[0.02] group-hover:bg-[#2F3E46]/0 transition-colors duration-500 z-10 rounded-3xl" />
      {children}
    </motion.div>
  );
}

export default function FeaturedSystems() {
  return (
    <section id="systems" className="py-20 relative">
      <div className="mb-16">
        <ScrollReveal>
          <div className="flex items-center gap-4 opacity-60 mb-6">
            <div className="h-[1px] w-8 bg-[#2F3E46]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#354F52]">Featured Work</span>
          </div>
          <h2 className="text-[2.5rem] font-bold tracking-tighter leading-[1.1] text-[#2F3E46] max-w-xl">
            Engineered <span className="gradient-text-warm">Systems.</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="flex flex-col gap-24">
        {systems.map((system, index) => (
          <ScrollReveal key={system.title} delay={0.1} direction={index % 2 === 0 ? "right" : "left"}>
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
              
              {/* Image/Visual Mockup Side */}
              <TiltCard color={system.color}>
                 <div className="w-full h-full glass-strong rounded-3xl border border-white/50 p-2 overflow-hidden flex flex-col" style={{ transform: "translateZ(30px)" }}>
                    <div className="h-10 border-b border-[#2F3E46]/10 flex items-center px-4 gap-2 bg-white/50">
                       <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#D4A373]" />
                          <div className="w-2.5 h-2.5 rounded-full bg-[#81B29A]" />
                       </div>
                    </div>
                    <div className="flex-1 p-8 flex items-center justify-center relative overflow-hidden bg-[#E9EDC9]">
                       <motion.div 
                         className="absolute w-64 h-64 rounded-full blur-[80px] opacity-20" 
                         style={{ backgroundColor: system.color }} 
                         animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
                         transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       />
                       <div className="w-full max-w-sm aspect-video border border-[#2F3E46]/20 rounded-lg border-dashed flex items-center justify-center relative z-10 bg-white/40" style={{ transform: "translateZ(50px)" }}>
                          <div className="flex flex-col items-center gap-3">
                             <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: `${system.color}20`, color: system.color }}>
                                {system.icon}
                             </div>
                             <span className="text-xs font-bold text-[#354F52] tracking-widest uppercase">System Architecture</span>
                          </div>
                       </div>
                    </div>
                 </div>
              </TiltCard>

              {/* Text / Details Side */}
              <div className="w-full lg:w-2/5 flex flex-col items-start text-left">
                <div className="inline-flex px-3 py-1 mb-4 rounded-md text-[10px] font-bold uppercase tracking-widest border" style={{ borderColor: `${system.color}30`, color: system.color, backgroundColor: `${system.color}10` }}>
                  {system.category}
                </div>
                <h3 className="text-3xl font-bold text-[#2F3E46] mb-4 tracking-tight">
                  {system.title}
                </h3>
                <p className="text-base text-[#52796F] leading-relaxed font-medium mb-8">
                  {system.description}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-10">
                  {system.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 glass text-xs font-semibold text-[#354F52] rounded-md shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-6">
                  <a href={system.link} className="inline-flex items-center gap-2 text-sm font-bold text-[#2F3E46] hover:opacity-70 transition-opacity">
                    View Live <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <a href={system.github} className="inline-flex items-center gap-2 text-sm font-bold text-[#52796F] hover:text-[#2F3E46] transition-colors">
                    <Github className="w-4 h-4" /> Source
                  </a>
                </div>
              </div>

            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
