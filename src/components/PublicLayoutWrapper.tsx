"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isHomepage = pathname === "/";

  useEffect(() => {
    if (isAdmin) {
      document.body.classList.add("admin-mode");
    } else {
      document.body.classList.remove("admin-mode");
    }
  }, [isAdmin]);


  if (isAdmin) {
    return (
      <>
        <CustomCursor />
        <main className="relative z-10">{children}</main>
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        <motion.div
          key="public-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          
          {/* Global Fixed Nameplate */}
          <Link href="/" className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] group flex flex-col pointer-events-auto mix-blend-difference text-white">
            <span className="font-fraunces text-lg md:text-xl font-medium tracking-tight group-hover:text-[var(--amber)] transition-colors duration-500">
              Param Patel
            </span>
            <span className="font-inter text-[8px] md:text-[10px] uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              AI Engineer & Builder
            </span>
          </Link>

          {/* Global Back to Home Button (Hidden on Homepage) */}
          {!isHomepage && (
            <Link 
              href="/"
              className="fixed top-6 left-1/2 -translate-x-1/2 md:top-8 z-[100] flex items-center gap-2 px-4 py-2 rounded-full font-inter text-[10px] tracking-widest uppercase pointer-events-auto bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white transition-all duration-300 shadow-sm"
            >
              <span className="text-[var(--amber)]">←</span> Back to Home
            </Link>
          )}
          <main className="relative z-10 transition-all duration-700">{children}</main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
