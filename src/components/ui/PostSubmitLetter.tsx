"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Feather } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostSubmitLetterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostSubmitLetter({ isOpen, onClose }: PostSubmitLetterProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

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

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6"
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
            className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "relative w-full max-w-lg bg-[var(--background)] border border-[var(--border-line)]",
              "rounded-2xl shadow-2xl p-8 md:p-10 z-10 overflow-hidden"
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

            {/* Decorative flourish */}
            <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none rotate-12">
              <Feather className="w-40 h-40 text-[var(--amber)]" strokeWidth={1} />
            </div>

            {/* Content */}
            <div className="relative z-10 font-serif">
              <h2 id="letter-title" className="text-2xl font-bold mb-6 font-display text-[var(--text-primary)]">
                Hello,
              </h2>
              
              <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
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

              <div className="mt-10 font-display text-[var(--text-primary)] text-xl italic">
                — Param
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
