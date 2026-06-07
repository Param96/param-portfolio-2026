"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export default function ScrollReveal({ children, delay = 0, className = "", direction = "up" }: ScrollRevealProps) {
  
  const getVariants = () => {
    switch (direction) {
      case "up": return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case "down": return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case "left": return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
    }
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98] // Premium cinematic ease out
      }}
      variants={getVariants()}
    >
      {children}
    </motion.div>
  );
}
