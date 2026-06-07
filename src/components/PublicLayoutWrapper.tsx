"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import AnimatedBackground from "./AnimatedBackground";

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

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
      <AnimatedBackground />
      <CustomCursor />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </>
  );
}
