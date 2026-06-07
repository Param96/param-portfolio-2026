"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Reusable social links
function SocialLinks({ className = "", linkColor = "text-current" }: { className?: string, linkColor?: string }) {
  return (
    <div className={`flex gap-8 mt-12 ${className}`}>
      <Link href="https://github.com" className={`text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-all duration-500 font-jetbrains relative group ${linkColor}`}>
        <span className="relative z-10">GitHub</span>
        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      <Link href="https://linkedin.com" className={`text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-all duration-500 font-jetbrains relative group ${linkColor}`}>
        <span className="relative z-10">LinkedIn</span>
        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      <Link href="https://instagram.com" className={`text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-all duration-500 font-jetbrains relative group ${linkColor}`}>
        <span className="relative z-10">Instagram</span>
        <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-current opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
    </div>
  );
}

// ==============================
// 1. HOME FOOTER
// ==============================
function HomeFooter() {
  return (
    <section className="relative w-full py-40 min-h-[70vh] flex flex-col items-center justify-center bg-[#2F3E46] overflow-hidden text-center text-[#FEFAE0]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#2F3E46] via-[#354F52] to-[#2F3E46] opacity-50 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4A373] rounded-full opacity-10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#84A98C] rounded-full opacity-10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      {/* Floating particles */}
      <motion.div animate={{ y: [0, -20, 0], opacity: [0, 0.4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[30%] w-2 h-2 bg-[#D4A373] rounded-full blur-[2px]" />
      <motion.div animate={{ y: [0, -30, 0], opacity: [0, 0.3, 0] }} transition={{ duration: 8, delay: 1, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[60%] right-[30%] w-3 h-3 bg-[#FEFAE0] rounded-full blur-[3px]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-10">
            Open to building <br />
            <span className="font-bold italic text-[#D4A373]">ambitious systems,</span> <br />
            startup experiments, <br />
            and <span className="italic">intelligent workflows.</span>
          </h2>
          <SocialLinks className="justify-center" linkColor="text-[#FEFAE0]" />
        </motion.div>
      </div>
    </section>
  );
}

// ==============================
// 2. RESEARCH FOOTER
// ==============================
function ResearchFooter() {
  return (
    <section className="relative w-full py-40 min-h-[70vh] flex flex-col items-center justify-center bg-[#52796F] overflow-hidden text-center text-[#FEFAE0]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#84A98C]/20 to-[#52796F] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay" />
      
      {/* Fog layers & paper overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[#CAD2C5] rounded-full opacity-10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#84A98C] rounded-full opacity-20 blur-[150px] pointer-events-none" />

      {/* Orbital motion */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#CAD2C5]/10 rounded-full border-dashed" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.15] mb-8 text-[#FEFAE0]">
            Researching <span className="font-bold italic text-[#CAD2C5]">intelligent systems</span>, <br />
            verification workflows, and evolving <br />
            <span className="italic text-[#84A98C]">educational infrastructure.</span>
          </h2>
          <p className="text-xs text-[#CAD2C5] font-jetbrains uppercase tracking-[0.2em] mb-12 opacity-80">
            More experimental systems and verification workflows currently in progress.
          </p>
          <SocialLinks className="justify-center" linkColor="text-[#FEFAE0]" />
        </motion.div>
      </div>
    </section>
  );
}

// ==============================
// 3. PROJECTS FOOTER
// ==============================
function ProjectsFooter() {
  return (
    <section className="relative w-full py-40 min-h-[70vh] flex flex-col items-center justify-center bg-[#354F52] overflow-hidden text-center text-[#FAEDCD]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#354F52] via-[#2F3E46]/50 to-[#354F52] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      {/* Layered bronze gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-[#D4A373] opacity-10 blur-[150px] rounded-full" />
      
      {/* Layered architecture visuals */}
      <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 0.1 }} transition={{ duration: 2 }} className="absolute bottom-0 left-[10%] w-[200px] h-[300px] border border-[#FAEDCD]" />
      <motion.div initial={{ y: 80, opacity: 0 }} whileInView={{ y: 20, opacity: 0.15 }} transition={{ duration: 2, delay: 0.2 }} className="absolute bottom-0 right-[15%] w-[250px] h-[250px] border border-[#D4A373]" />
      
      {/* Topology paths */}
      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute top-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4A373]/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-10 text-[#FEFAE0]">
            Building <span className="font-bold italic text-[#D4A373]">evolving systems</span> <br />
            through experimentation, automation, <br />
            and <span className="italic text-[#FAEDCD]">applied AI workflows.</span>
          </h2>
          <SocialLinks className="justify-center" linkColor="text-[#FAEDCD]" />
        </motion.div>
      </div>
    </section>
  );
}

// ==============================
// 4. BLOG FOOTER
// ==============================
function BlogFooter() {
  return (
    <section className="relative w-full py-40 min-h-[70vh] flex flex-col items-center justify-center bg-[#2F3E46] overflow-hidden text-center text-[#FEFAE0]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
      
      {/* Dark teal gradients & reading lamp glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#354F52] rounded-full opacity-60 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-[#D4A373] rounded-full opacity-[0.08] blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.2] mb-10 text-[#FEFAE0]">
            Thoughts, systems, experiments, <br />
            and <span className="font-bold italic text-[#D4A373]">evolving engineering ideas.</span>
          </h2>
          <SocialLinks className="justify-center" linkColor="text-[#FEFAE0]" />
        </motion.div>
      </div>
    </section>
  );
}

// ==============================
// 5. LAB NOTES FOOTER
// ==============================
function LabNotesFooter() {
  return (
    <section className="relative w-full py-40 min-h-[70vh] flex flex-col items-center justify-center bg-[#2F3E46] overflow-hidden text-center text-[#FEFAE0]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay pointer-events-none" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#2F3E46] via-[#354F52]/50 to-[#52796F]/30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#84A98C] opacity-10 rounded-full blur-[150px]" />
      
      {/* Topology paths & fragments */}
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 250, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-[#84A98C]/10 rounded-full" />
      <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-[35%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#52796F]/40 to-transparent" />
      <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[25%] right-[25%] w-[120px] h-[50px] border border-[#84A98C]/20 bg-[#354F52]/30 backdrop-blur-sm" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-bold italic text-[#84A98C] tracking-tight leading-[1.05] mb-10">
            Still exploring. <br />
            <span className="text-[#CAD2C5] font-light non-italic">Still building.</span> <br />
            <span className="text-[#52796F] font-light non-italic">Still experimenting.</span>
          </h2>
          <SocialLinks className="justify-center" linkColor="text-[#FEFAE0]" />
        </motion.div>
      </div>
    </section>
  );
}

// ==============================
// 6. CONTACT FOOTER
// ==============================
function ContactFooter() {
  return (
    <section className="relative w-full py-40 min-h-[70vh] flex flex-col items-center justify-center bg-[#FAEDCD] overflow-hidden text-center text-[#2F3E46]">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gradient-to-br from-[#FEFAE0]/50 to-[#D4A373]/30 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}>
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-10 text-[#354F52]">
            Open to <span className="font-bold italic text-[#D4A373]">ambitious ideas,</span> <br />
            intelligent systems, startup experiments, <br />
            and <span className="italic text-[#84A98C]">meaningful collaborations.</span>
          </h2>
          <div className="mt-16 flex flex-col items-center gap-8">
            <Link
              href="mailto:param@example.com"
              className="inline-block border-b border-[#D4A373] pb-2 text-[#D4A373] text-lg hover:text-[#2F3E46] hover:border-[#2F3E46] transition-colors duration-500"
            >
              Initiate Collaboration
            </Link>
            <SocialLinks className="justify-center" linkColor="text-[#2F3E46]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ==============================
// DYNAMIC FOOTER ROUTER
// ==============================
export default function Footer() {
  const pathname = usePathname();

  // Handle trailing slashes and normalize path
  const normalizedPath = pathname?.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  if (normalizedPath === "/") return <HomeFooter />;
  if (normalizedPath === "/research") return <ResearchFooter />;
  if (normalizedPath === "/projects") return <ProjectsFooter />;
  if (normalizedPath === "/blog") return <BlogFooter />;
  if (normalizedPath === "/lab-notes") return <LabNotesFooter />;
  if (normalizedPath === "/contact") return <ContactFooter />;

  // Default fallback for any other pages
  return <ContactFooter />;
}
