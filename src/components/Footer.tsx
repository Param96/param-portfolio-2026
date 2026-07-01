"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLivingSystemStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();
  const timeOfDayTheme = useLivingSystemStore((state) => state.timeOfDayTheme);
  const isNight = timeOfDayTheme === "night";

  const getFooterText = () => {
    switch (pathname) {
      case "/research":
        return (
          <>
            Researching <span className="font-fraunces italic font-normal text-[var(--amber)]">intelligent systems</span>, <br />
            verification workflows, and evolving infrastructure.
          </>
        );
      case "/projects":
        return (
          <>
            Building <span className="font-fraunces italic font-normal text-[var(--amber)]">evolving systems</span> <br />
            through experimentation and applied AI workflows.
          </>
        );
      case "/contact":
        return (
          <>
            Open to <span className="font-fraunces italic font-normal text-[var(--amber)]">ambitious ideas,</span> <br />
            startup experiments, and meaningful collaborations.
          </>
        );
      default:
        return (
          <>
            Open to building <span className="font-fraunces italic font-normal text-[var(--amber)]">ambitious systems,</span> <br />
            startup experiments, and intelligent workflows.
          </>
        );
    }
  };

  return (
    <footer className="relative w-full py-32 flex flex-col items-center justify-center bg-[var(--bark)] overflow-hidden text-center text-[var(--cream)] transition-colors duration-1000 ease-[var(--ease-organic)] mt-24">
      {/* Amber distant lantern glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--amber)] rounded-full opacity-10 blur-[120px] pointer-events-none" />
      
      {/* Night-time specific living detail: tiny firefly */}
      {isNight && (
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 15, -15, 0], opacity: [0, 0.8, 0] }} 
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-1/3 left-[20%] w-1.5 h-1.5 bg-[var(--amber)] rounded-full blur-[1px]" 
        />
      )}

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-50px" }} 
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-fraunces tracking-tight leading-[1.2] mb-12 text-[var(--cream)]">
            {getFooterText()}
          </h2>
          
          <div className="flex gap-8 justify-center mt-12">
            {["GitHub", "LinkedIn", "Twitter"].map((social) => (
              <Link 
                key={social}
                href={`https://${social.toLowerCase()}.com`} 
                className="font-inter text-sm text-[var(--moss)] hover:text-[var(--amber)] hover:-translate-y-0.5 transition-all duration-700 ease-[var(--ease-organic)]"
              >
                {social}
              </Link>
            ))}
          </div>

          {pathname !== "/" && (
            <div className="mt-16 text-center">
              <Link
                href="/"
                className="text-sm font-inter text-[var(--moss)] hover:text-[var(--cream)] transition-colors duration-500 flex items-center justify-center gap-2"
              >
                <span className="text-[var(--amber)]">←</span> Back to Home
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </footer>
  );
}
