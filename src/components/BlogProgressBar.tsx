"use client";

import { motion, useScroll } from "framer-motion";

export default function BlogProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-[#84A98C] origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
