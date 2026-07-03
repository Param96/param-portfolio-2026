"use client";

import { Download } from "lucide-react";

export default function DownloadResumeCTA() {
  return (
    <section className="w-full relative py-12 md:py-16 bg-[var(--bg-main)] overflow-hidden">
      {/* Top and bottom subtle borders */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent opacity-50" />
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-color)] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="font-fraunces text-3xl md:text-4xl text-[var(--text-primary)] mb-2 font-medium tracking-tight">
            Want to take a piece of the ecosystem with you?
          </h2>
          <p className="font-inter text-sm md:text-base text-[var(--text-secondary)] tracking-wide max-w-lg">
            Download the official dossier detailing my complete architectural blueprints, engineering background, and product philosophy.
          </p>
        </div>

        <a 
          href="/resume.pdf" 
          download="Param_Patel_Resume.pdf"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--accent-primary)] hover:bg-[var(--accent-secondary)] text-[var(--bg-main)] font-bold tracking-widest uppercase text-xs md:text-sm rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Download className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
            Download Resume
          </span>
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
        </a>
      </div>
    </section>
  );
}
