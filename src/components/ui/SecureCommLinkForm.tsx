"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lock, Check } from "lucide-react";

export default function SecureCommLinkForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [fruitState, setFruitState] = useState<"hanging" | "falling" | "fallen">("hanging");
  const [formState, setFormState] = useState<"idle" | "transmitting" | "sent">("idle");
  const trackRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (trackRef.current && isOpen) {
      setSliderWidth(trackRef.current.offsetWidth);
    }
  }, [isOpen, formState]);

  const handleDragEnd = async (event: any, info: any) => {
    // If dragged past 75% of track
    if (info.offset.x > (sliderWidth * 0.75)) {
      setFormState("transmitting");
      
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: "Secure Comm-Link Transmission",
            message: formData.message,
          }),
        });

        if (!res.ok) throw new Error("Transmission failed");

        setFormState("sent");
        setFormData({ name: "", email: "", message: "" });
        
        // After showing success for 2 seconds, reset the tree and grow a new fruit!
        setTimeout(() => {
          setIsOpen(false);
          setTimeout(() => {
            setFormState("idle");
            setFruitState("hanging");
          }, 500); // Wait for tree to fade back in before fully resetting state
        }, 2000);
      } catch (err) {
        console.error(err);
        setFormState("idle");
        alert("Transmission Failed. Please check your connection and try again.");
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center relative z-20 pointer-events-auto">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="tree-trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
            className="w-full h-[400px] flex flex-col items-center justify-center relative"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#84A98C] mb-8 opacity-70">
              Discover the Comm-Link
            </span>
            <svg width="300" height="300" viewBox="0 0 300 300" className="overflow-visible">
              {/* Ground */}
              <line x1="0" y1="280" x2="300" y2="280" stroke="#2F3E46" strokeWidth="2" strokeOpacity="0.1" strokeDasharray="4 4" />
              
              {/* Trunk */}
              <path d="M150 280 Q150 220 150 150" stroke="#2F3E46" strokeWidth="8" fill="none" strokeLinecap="round" />
              
              {/* Branches */}
              <path d="M150 210 Q100 170 70 120" stroke="#2F3E46" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M150 180 Q210 140 230 90" stroke="#2F3E46" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M150 150 Q130 90 160 50" stroke="#2F3E46" strokeWidth="4" fill="none" strokeLinecap="round" />

              {/* Leaves */}
              <g>
                <circle cx="70" cy="120" r="35" fill="#84A98C" fillOpacity="0.8" />
                <circle cx="230" cy="90" r="45" fill="#84A98C" fillOpacity="0.9" />
                <circle cx="160" cy="50" r="55" fill="#84A98C" fillOpacity="0.85" />
                <circle cx="110" cy="90" r="30" fill="#52796F" fillOpacity="0.7" />
                <circle cx="190" cy="70" r="35" fill="#52796F" fillOpacity="0.8" />
              </g>

              {/* The Interactive Fruit */}
              <motion.g
                initial={{ y: 0 }}
                animate={
                  fruitState === "hanging" ? { y: [0, -4, 0] } : { y: 150 }
                }
                transition={
                  fruitState === "hanging" ? { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  : { type: "spring", bounce: 0.5, duration: 1.5 }
                }
                onClick={() => {
                  if (fruitState === "hanging") {
                    setFruitState("falling");
                    setTimeout(() => {
                      setFruitState("fallen");
                      setTimeout(() => setIsOpen(true), 200);
                    }, 1200); // Trigger just as the bounce settles
                  }
                }}
                className="cursor-crosshair group"
              >
                {/* Glow Effect */}
                <circle cx="70" cy="130" r="20" fill="#D4A373" className="opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-md pointer-events-none" />
                {/* Fruit Body */}
                <circle cx="70" cy="130" r="12" fill="#D4A373" className="group-hover:stroke-white stroke-[3px] stroke-transparent transition-colors duration-300 shadow-xl" />
                {/* Stem */}
                <path d="M70 118 L70 110" stroke="#2F3E46" strokeWidth="2" />
              </motion.g>
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
            className="w-full max-w-3xl mx-auto bg-white/40 backdrop-blur-xl border border-[#2F3E46]/10 p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(47,62,70,0.1)] flex flex-col gap-12 overflow-hidden"
          >
        <div className="flex items-center justify-between border-b border-[#2F3E46]/10 pb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A373]">
            Secure Comm-Link
          </span>
          <Lock className="w-4 h-4 text-[#84A98C]" />
        </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex flex-col gap-3 w-full group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#52796F] group-focus-within:text-[#D4A373] transition-colors">Identifier (Name)</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))} className="w-full bg-transparent border-b border-[#2F3E46]/20 px-0 py-3 text-[#2F3E46] focus:outline-none focus:border-[#D4A373] transition-colors font-medium placeholder:text-[#2F3E46]/30" placeholder="Jane Doe" />
                </div>
                <div className="flex flex-col gap-3 w-full group">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#52796F] group-focus-within:text-[#D4A373] transition-colors">Return Vector (Email)</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))} className="w-full bg-transparent border-b border-[#2F3E46]/20 px-0 py-3 text-[#2F3E46] focus:outline-none focus:border-[#D4A373] transition-colors font-medium placeholder:text-[#2F3E46]/30" placeholder="jane@example.com" />
                </div>
              </div>

              <div className="flex flex-col gap-3 group">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#52796F] group-focus-within:text-[#D4A373] transition-colors">Payload (Message)</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))} className="w-full bg-transparent border-b border-[#2F3E46]/20 px-0 py-3 text-[#2F3E46] focus:outline-none focus:border-[#D4A373] transition-colors resize-none font-medium placeholder:text-[#2F3E46]/30" placeholder="How can we collaborate?" />
              </div>
            </div>

            {/* Drag to Submit */}
            <div className="mt-4">
              {formState === "idle" && (
                <div ref={trackRef} className="w-full h-16 bg-white/50 border border-[#2F3E46]/10 rounded-full relative flex items-center overflow-hidden">
                  <span className="absolute w-full text-center text-[10px] font-bold tracking-[0.3em] text-[#52796F] uppercase pointer-events-none">
                    Slide To Transmit
                  </span>
                  <motion.div
                    drag="x"
                    dragConstraints={trackRef}
                    dragSnapToOrigin={true}
                    dragElastic={0.05}
                    onDragEnd={handleDragEnd}
                    className="w-14 h-14 bg-[#D4A373] rounded-full absolute left-1 flex items-center justify-center cursor-grab active:cursor-grabbing shadow-sm hover:scale-105 transition-transform"
                  >
                    <ArrowRight className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              )}

              {formState === "transmitting" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-16 bg-[#84A98C]/10 border border-[#84A98C]/30 rounded-full flex items-center justify-center gap-4">
                  <div className="w-4 h-4 border-2 border-[#84A98C] border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-[#84A98C] uppercase">Transmitting...</span>
                </motion.div>
              )}

              {formState === "sent" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-16 bg-[#84A98C] rounded-full flex items-center justify-center shadow-sm">
                  <Check className="w-4 h-4 text-white mr-2" />
                  <span className="text-[10px] font-bold tracking-[0.3em] text-white uppercase">Transmission Successful</span>
                </motion.div>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
