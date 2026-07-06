"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { Show, UserButton, SignInButton } from "@clerk/nextjs";
import posthog from "posthog-js";
import { Logo } from "./Logo";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // Dynamic atmospheric header lighting based on page
  const atmosphereColors = useMemo(() => {
    // Normalize trailing slash
    const path = pathname?.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
    
    if (path === "/projects") return { glow: "rgba(212, 163, 115, 0.25)", border: "rgba(212, 163, 115, 0.3)" }; // Light Bronze
    if (path === "/research") return { glow: "rgba(82, 121, 111, 0.25)", border: "rgba(132, 169, 140, 0.3)" }; // Muted Teal
    if (path === "/blog") return { glow: "rgba(202, 210, 197, 0.2)", border: "rgba(254, 250, 224, 0.2)" }; // Ash Grey / Cream
    if (path === "/lab-notes") return { glow: "rgba(47, 62, 70, 0.4)", border: "rgba(132, 169, 140, 0.2)" }; // Deep Teal
    if (path === "/contact") return { glow: "rgba(250, 237, 205, 0.2)", border: "rgba(212, 163, 115, 0.3)" }; // Papaya Whip
    return { glow: "rgba(47, 62, 70, 0.3)", border: "rgba(212, 163, 115, 0.2)" }; // Default Charcoal/Bronze
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 50) {
      setScrolled(true);
      if (latest > previous && latest > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    } else {
      setScrolled(false);
      setHidden(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    const path = pathname?.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
    return href === "/" ? path === "/" : path.startsWith(href);
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-1000 ${
          scrolled ? "pt-4" : "pt-8"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-center">
          
          <div 
            className={`flex items-center justify-between w-full transition-all duration-1000 rounded-full relative overflow-hidden ${
              scrolled ? "px-6 py-3" : "bg-transparent px-2 py-4"
            }`}
            style={{ 
              backgroundColor: scrolled ? "rgba(47, 62, 70, 0.75)" : "transparent",
              backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "blur(0px)",
              WebkitBackdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "blur(0px)",
              border: scrolled ? `1px solid rgba(255, 255, 255, 0.05)` : "1px solid transparent",
              boxShadow: scrolled ? "0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)" : "none"
            }}
          >
            {/* Cinematic Animated Background Layers */}
            {scrolled && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
                {/* Moving topology/glow */}
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-[200px] h-[100px] blur-[40px] rounded-full mix-blend-screen"
                  style={{ backgroundColor: atmosphereColors.glow }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/2 -translate-y-1/2 w-[100px] h-[50px] blur-[20px] rounded-full mix-blend-screen"
                  style={{ backgroundColor: atmosphereColors.border }}
                  animate={{ x: ["200%", "-100%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                {/* Subtle Grain */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
              </div>
            )}
            
            {/* ── Brand / Left Side ── */}
            <Link href="/" className="relative z-10">
              <Logo scrolled={scrolled} />
            </Link>

            {/* ── Desktop Navigation / Center ── */}
            <div className="hidden md:flex items-center gap-1 relative z-10">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 group"
                  >
                    <span className={`relative z-10 transition-colors duration-500 ${
                      active 
                        ? (scrolled ? "text-[#FEFAE0]" : "text-[#2F3E46]") 
                        : (scrolled ? "text-[#FEFAE0]/50 group-hover:text-[#FEFAE0]" : "text-[#52796F] group-hover:text-[#2F3E46]")
                    }`}>
                      {link.label}
                    </span>
                    
                    {/* Active State Glowing Beam */}
                    <AnimatePresence>
                      {active && (
                        <motion.span 
                          layoutId="navActiveGlow"
                          className={`absolute bottom-1 left-1/2 h-[2px] w-1/2 -translate-x-1/2 blur-[2px] ${scrolled ? "bg-[#D4A373]" : "bg-[#52796F]"}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.5 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </AnimatePresence>
                    
                    {/* Active State Solid Line */}
                    <span 
                      className={`absolute bottom-1 left-1/2 h-[1px] transition-all duration-500 -translate-x-1/2 ${
                        active 
                          ? `w-1/2 opacity-100 ${scrolled ? "bg-[#D4A373]" : "bg-[#2F3E46]"}` 
                          : `w-0 opacity-0 group-hover:w-1/3 group-hover:opacity-40 ${scrolled ? "bg-[#FEFAE0]" : "bg-[#52796F]"}`
                      }`}
                    />
                    
                    {/* Hover Soft Glow / Magnetic Feel */}
                    <div className={`absolute inset-0 rounded-lg transition-all duration-500 -z-10 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 ${
                      scrolled ? "bg-white/5 border border-white/5" : "bg-[#FAEDCD]/50 border border-[#D4A373]/10"
                    }`} />
                  </Link>
                );
              })}
            </div>

            {/* ── Right Side / CTA ── */}
            <div className="hidden md:flex items-center gap-4 relative z-10">
              {/* 
                Hidden Admin Access: We do not show the SignInButton anymore. 
                You can access the admin panel by manually typing /admin in your browser. 
              */}
              <Show when="signed-in">
                <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
              </Show>
              <Link
                href="/contact"
                onClick={() => posthog.capture('nav_collaborate_clicked', { source: 'desktop' })}
                className={`group relative px-6 py-2 rounded-full font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-700 flex items-center gap-2 border shadow-lg overflow-hidden ${
                  scrolled
                    ? "bg-[#FEFAE0]/10 border-white/10 text-[#FEFAE0] hover:bg-[#FEFAE0]/20 hover:border-white/20 hover:shadow-[0_0_20px_rgba(212,163,115,0.2)]"
                    : "bg-[#2F3E46] border-[#2F3E46]/10 text-[#FEFAE0] hover:bg-[#354F52] hover:shadow-[0_8px_30px_rgba(47,62,70,0.2)]"
                }`}
              >
                {/* Atmospheric sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4A373]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">Collaborate</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-500 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileOpen 
                ? <X className="text-[#FEFAE0]" /> 
                : <Menu className={`transition-colors duration-500 ${scrolled ? "text-[#FEFAE0]" : "text-[#2F3E46]"}`} />
              }
            </button>
          </div>

        </div>
      </motion.header>

      {/* ── Mobile Full-Screen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 md:hidden bg-[#2F3E46]/95 flex flex-col pt-32 px-6"
          >
            {/* Ambient motion in mobile menu */}
            <motion.div 
              className="absolute top-[20%] right-[-20%] w-[300px] h-[300px] bg-[#D4A373]/20 rounded-full blur-[100px] pointer-events-none"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <div className="flex-1 flex flex-col items-start justify-center gap-8 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-4xl font-light tracking-tight transition-all duration-500 flex items-center gap-4 ${
                      isActive(link.href)
                        ? "text-[#D4A373] italic font-bold"
                        : "text-[#FEFAE0] hover:text-[#D4A373] hover:italic"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-12 w-full"
              >
                <Link
                  href="/contact"
                  onClick={() => { setMobileOpen(false); posthog.capture('nav_collaborate_clicked', { source: 'mobile' }); }}
                  className="w-full flex items-center justify-between rounded-2xl bg-[#D4A373]/10 border border-[#D4A373]/20 px-8 py-6 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A373] hover:bg-[#D4A373]/20 transition-colors duration-500"
                >
                  Initiate Collaboration
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}