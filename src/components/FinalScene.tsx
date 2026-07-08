"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalScene() {
  return (
    <section className="relative w-full py-20 md:py-40 min-h-[70vh] flex flex-col items-center justify-center bg-[#2F3E46] overflow-hidden text-center">
      
      {/* Immersive Atmospheric Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#D4A373] rounded-[100%] opacity-10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#84A98C] rounded-[100%] opacity-10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light tracking-tight text-[#FEFAE0] leading-[1.1] mb-10">
            Open to building <br />
            <span className="font-bold italic text-[#D4A373]">ambitious systems,</span> <br />
            startup experiments, <br />
            and <span className="italic">intelligent workflows.</span>
          </h2>
          
          <div className="mt-16">
            <Link
              href="mailto:param@example.com"
              className="inline-block border-b border-[#FEFAE0]/30 pb-2 text-[#FEFAE0] text-lg hover:text-[#D4A373] hover:border-[#D4A373] transition-colors"
            >
              Initiate Transmission
            </Link>
          </div>
        </motion.div>
      </div>
      
    </section>
  );
}
