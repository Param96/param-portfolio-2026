"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import LotusBloomNav from "./ui/LotusBloomNav";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import { motion, AnimatePresence } from "framer-motion";

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
          <main className="relative z-10 transition-all duration-700">{children}</main>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
