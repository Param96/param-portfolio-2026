"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Feather } from "lucide-react";
import { cn } from "@/lib/utils";
import PandaBamboo from "../PandaBamboo";

interface PostSubmitLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostSubmitLetter({ isOpen, onClose }: PostSubmitLetterProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Trap focus & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    // Focus the close button when opened
    if (closeRef.current) {
      closeRef.current.focus();
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[10000] flex items-center justify-center px-4 sm:px-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "relative w-full max-w-lg bg-[#FAF7F0] border border-[var(--border-line)]",
              "rounded-2xl shadow-2xl p-8 md:p-10 z-[10001] overflow-hidden"
            )}
          >
            {/* Close Button */}
            <button
              ref={closeRef}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--foreground)]/5 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--amber)]"
              aria-label="Close letter"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="relative z-10 font-serif">
              <h2 id="letter-title" className="text-2xl font-bold mb-6 font-display text-[#0d1114]">
                Hello,
              </h2>
              
              <div className="space-y-6 text-lg text-[#424e57] leading-relaxed relative">
                <p>
                  Thank you for reaching out. I&apos;ve received your transmission.
                </p>
                <p>
                  I built this space not just as a portfolio, but as a living system—an environment for experimentation, craft, and exploring the strange and interesting edges of technology. Whether you&apos;re building a startup, researching new paradigms, or just saying hi, I appreciate you taking the time to connect.
                </p>
                <p>
                  I read every message, and I&apos;ll get back to you soon.
                </p>
              </div>

              <div className="mt-10 font-display text-[#0d1114] text-xl italic">
                — Param
              </div>
            </div>

            {/* Decorative flourish */}
            <PandaBamboo className="absolute bottom-4 right-4 w-20 h-20 md:w-24 md:h-24 pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  
  const { createPortal } = require('react-dom');
  return createPortal(modalContent, document.body);
}
