"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import LotusBloomNav from "./ui/LotusBloomNav";
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
          <LotusBloomNav />
          
          {/* Global Fixed Nameplate */}
          <Link href="/" className="fixed top-6 left-6 md:top-8 md:left-8 z-[100] group flex flex-col pointer-events-auto mix-blend-difference text-white">
            <span className="font-fraunces text-lg md:text-xl font-medium tracking-tight group-hover:text-[var(--amber)] transition-colors duration-500">
              Param Patel
            </span>
            <span className="font-inter text-[8px] md:text-[10px] uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
              AI Engineer & Builder
            </span>
          </Link>
          <main className="relative z-10 transition-all duration-700">{children}</main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
