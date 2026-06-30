"use client";

import dynamic from "next/dynamic";
import SecureCommLinkForm from "@/components/ui/SecureCommLinkForm";
import { motion } from "framer-motion";
import { socialLinks } from "@/data/social";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import posthog from "posthog-js";

const ContactHero = dynamic(() => import("@/components/hero/meadow/ContactHero"), { ssr: false });

const floatingConcepts = [
  { main: "Agentic AI Systems", sub: "orchestration layers, autonomous workflows, intelligent routing" },
  { main: "Startup Infrastructure", sub: "scalable architecture, high-velocity deployments, zero-latency state" },
  { main: "Experimental Interfaces", sub: "physics-based interactions, cinematic layouts, spatial design" },
  { main: "Intelligent Workflows", sub: "LLM integration, deterministic loops, data pipelines" },
  { main: "Building From 0 → 1", sub: "rapid prototyping, founder-led engineering, product strategy" },
  { main: "Weird Ideas Worth Building", sub: "moonshots, untested theories, ambitious experiments" }
];

const openForConcepts = [
  "Startup Collaborations",
  "AI Product Building",
  "Research Collaborations",
  "MVP Development",
  "Experimental Engineering",
  "Intelligent Automation Systems",
  "Founder Networks"
];

const currentFocus = [
  "AI Verification Systems",
  "Agentic AI Infrastructure",
  "Experimental AI Workflows",
  "Intelligent Automation"
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[var(--bg-page)] transition-colors duration-1000 ease-in-out">
      {/* 3D Immersive Hero */}
      <ContactHero />

      {/* ── SECURE COMM-LINK (Form) ── */}
      <section className="w-full py-20 px-6 md:px-24 relative z-20 border-t border-[var(--border-line)]">
        <SecureCommLinkForm />
      </section>

      {/* ── WHAT EXCITES ME (Floating Concepts) ── */}
      <section className="w-full py-32 px-6 md:px-24 overflow-hidden relative border-t border-[var(--border-line)]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--amber)] mb-24 block">
            What Excites Me
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
            {floatingConcepts.map((concept, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative cursor-crosshair flex flex-col items-start"
              >
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tighter text-[var(--text-main)] transition-all duration-700 group-hover:text-[var(--amber-deep)]">
                  {concept.main}
                </h3>
                <div className="mt-6 opacity-0 -translate-y-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-visible">
                  <p className="text-sm font-medium tracking-wide text-[var(--moss)] max-w-[250px] leading-relaxed">
                    {concept.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN FOR (Collaboration Ecosystem) ── */}
      <section className="w-full py-32 px-6 md:px-24 relative bg-bg-secondary transition-colors duration-1000 ease-in-out">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-16 md:gap-32">
          <div className="w-full md:w-1/3 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--amber)] mb-8 block">
              Ecosystem
            </span>
            <h2 className="text-5xl md:text-7xl font-serif italic text-[var(--text-main)] leading-[0.9]">
              Open For.
            </h2>
          </div>
          <div className="w-full md:w-2/3 flex flex-wrap gap-4">
            {openForConcepts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group px-6 py-4 border border-[var(--border-line)] rounded-full hover:border-[var(--amber)] hover:bg-accent-primary/5 transition-all duration-500 cursor-crosshair"
              >
                <span className="text-sm font-bold uppercase tracking-widest text-[var(--amber-deep)] group-hover:text-[var(--amber)] transition-colors duration-500">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT FOCUS (Cinematic Strip) ── */}
      <section className="w-full py-16 border-y border-[var(--border-line)] overflow-hidden flex items-center">
        <motion.div 
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex whitespace-nowrap gap-16 px-8"
        >
          {[...currentFocus, ...currentFocus, ...currentFocus].map((focus, i) => (
            <div key={i} className="flex items-center gap-16">
              <span className="text-2xl font-light tracking-widest text-text-primary/60 uppercase">
                {focus}
              </span>
              <div className="w-2 h-2 rounded-full bg-accent-primary/40 transition-colors duration-1000 ease-in-out" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── PERSONAL QUOTES (Editorial) ── */}
      <section className="w-full py-40 px-6 md:px-24">
        <div className="max-w-6xl mx-auto flex flex-col gap-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-light tracking-tighter text-[var(--text-main)] leading-[1.1] max-w-4xl"
          >
            "I like ambitious people with weird ideas."
          </motion.h2>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-serif italic tracking-tighter text-[var(--amber-deep)] leading-[1.1] max-w-5xl self-end text-right"
          >
            "I enjoy building systems that feel slightly impossible."
          </motion.h2>
        </div>
      </section>

      {/* ── SOCIAL CONNECTION ENVIRONMENT (Nodes) ── */}
      <section className="w-full pt-20 pb-40 px-6 md:px-24 border-t border-[var(--border-line)]">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--amber)] mb-16 block">
            Transmission Nodes
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            
            {/* Standard Social Links */}
            {socialLinks.map((social, i) => {
              const Icon = social.icon;
              return (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => posthog.capture('social_link_clicked', { platform: social.name, url: social.url })}
                  className="group relative h-48 border border-[var(--border-line)] flex flex-col items-center justify-center gap-6 hover:border-[var(--moss)] hover:bg-accent-sage/5 transition-all duration-700 rounded-3xl"
                >
                  <div className="w-16 h-16 rounded-full border border-[var(--border-line)] flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--moss)] group-hover:text-[var(--moss)] transition-all duration-700 text-[var(--text-main)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[var(--amber-deep)] group-hover:text-[var(--text-main)] transition-colors">
                    {social.name}
                  </span>
                  <ArrowUpRight className="absolute top-6 right-6 w-4 h-4 text-text-primary/30 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500" />
                </a>
              );
            })}

            {/* Online Resume Link Node */}
            <Link 
              href="/resume"
              className="group relative h-48 border border-accent-primary/30 flex flex-col items-center justify-center gap-6 hover:border-[var(--amber)] hover:bg-[var(--amber)] transition-all duration-700 rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-full border border-accent-primary/30 flex items-center justify-center group-hover:scale-110 group-hover:border-white group-hover:text-white transition-all duration-700 text-[var(--amber)] relative z-10">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--amber)] group-hover:text-white transition-colors relative z-10">
                Online Resume
              </span>
            </Link>

          </div>
        </div>
      </section>

    </div>
  );
}
