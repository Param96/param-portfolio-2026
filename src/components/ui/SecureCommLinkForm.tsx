"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ArrowRight, Link as LinkIcon, Check } from "lucide-react";
import FruitDrop from "./FruitDrop";

const REASONS = [
  "Research Collaboration",
  "Startup / Founder Chat",
  "Project Inquiry",
  "Just Saying Hi",
  "Other"
];

const DIALOGUE_LINES = [
  "Ow. Worth it though — message received!",
  "Right on the head. Message sent, no complaints.",
  "That's one way to say hello back.",
  "Direct hit. I'll get back to you soon."
];

export default function SecureCommLinkForm() {
  const [formState, setFormState] = useState<"idle" | "transmitting" | "sent">("idle");
  const [dialogueLine, setDialogueLine] = useState(DIALOGUE_LINES[0]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
    customReason: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    reason: false,
    message: false,
  });

  const [shake, setShake] = useState(false);
  const controls = useAnimation();

  const isNameValid = formData.name.trim().length > 0 && formData.name.length <= 100;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isReasonValid = formData.reason !== "" && (formData.reason !== "Other" || formData.customReason.trim().length > 0);
  const isMessageValid = formData.message.trim().length >= 10;
  const isFormValid = isNameValid && isEmailValid && isReasonValid && isMessageValid;

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    if (trackRef.current) {
      setSliderWidth(trackRef.current.offsetWidth);
    }
  }, [formState]);

  const executeSubmit = async () => {
    setFormState("transmitting");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          reason: formData.reason === "Other" ? formData.customReason : formData.reason,
          subject: "Secure Comm-Link Transmission",
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Transmission failed");

      setFormState("sent");
      setFormData({ name: "", email: "", reason: "", customReason: "", message: "" });
      setTouched({ name: false, email: false, reason: false, message: false });
      setDialogueLine(DIALOGUE_LINES[Math.floor(Math.random() * DIALOGUE_LINES.length)]);
      
      setTimeout(() => {
        setFormState("idle");
        controls.set({ x: 0 });
      }, 5000);
    } catch (err) {
      console.error(err);
      setFormState("idle");
      controls.set({ x: 0 });
      alert("Transmission Failed. Please check your connection and try again.");
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      setTouched({ name: true, email: true, reason: true, message: true });
      triggerShake();
      return;
    }
    
    await controls.start({ x: (trackRef.current?.offsetWidth || 300) - 64, transition: { duration: 0.3 } });
    executeSubmit();
  };

  const handleDragEnd = async (event: any, info: any) => {
    if (!isFormValid) {
      triggerShake();
      return;
    }
    // If dragged past 85% of track
    if (info.offset.x > (sliderWidth * 0.85)) {
      executeSubmit();
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center relative z-20 pointer-events-auto gap-8 lg:gap-16 pb-24 px-4">
      {/* Left Column: Illustration */}
      <div className="w-full lg:w-[40%] flex flex-col items-center justify-start relative pt-4 lg:pt-12 order-1 lg:order-none lg:sticky lg:top-24">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#84A98C] mb-8 opacity-70">
          The Gravity Apple
        </span>
        <div className="relative flex items-center justify-center w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px] aspect-square">
          <svg width="100%" height="100%" viewBox="0 0 300 300" className="overflow-visible absolute inset-0">
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
          </svg>
          <FruitDrop trigger={formState === "sent"} line={dialogueLine} />
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-[60%] max-w-2xl bg-white/40 backdrop-blur-xl border border-[#2F3E46]/10 p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(47,62,70,0.1)] flex flex-col gap-12 overflow-hidden order-2 lg:order-none z-10">
        <div className="flex items-center justify-between border-b border-[#2F3E46]/10 pb-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A373]">
            Secure Comm-Link
          </span>
          <LinkIcon className="w-4 h-4 text-[#84A98C]" />
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-2 w-full group">
              <label className={`font-fraunces text-lg transition-colors ${touched.name && !isNameValid ? 'text-[#e07a5f]' : 'text-[#2F3E46]/60 group-focus-within:text-[#D4A373]'}`}>What should I call you?</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                onBlur={() => handleBlur("name")}
                className={`w-full bg-transparent border-b px-0 py-3 text-[#2F3E46] focus:outline-none transition-colors font-medium text-lg placeholder:text-[#2F3E46]/30 ${touched.name && !isNameValid ? 'border-[#e07a5f] focus:border-[#e07a5f]' : 'border-[#2F3E46]/20 focus:border-[#D4A373]'}`} 
                placeholder="Jane Doe" 
              />
              {touched.name && !isNameValid && <span className="text-xs text-[#e07a5f]">Name is required (max 100 chars)</span>}
            </div>
            
            <div className="flex flex-col gap-2 w-full group">
              <label className={`font-fraunces text-lg transition-colors ${touched.email && !isEmailValid ? 'text-[#e07a5f]' : 'text-[#2F3E46]/60 group-focus-within:text-[#D4A373]'}`}>Where can I reach you?</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                onBlur={() => handleBlur("email")}
                className={`w-full bg-transparent border-b px-0 py-3 text-[#2F3E46] focus:outline-none transition-colors font-medium text-lg placeholder:text-[#2F3E46]/30 ${touched.email && !isEmailValid ? 'border-[#e07a5f] focus:border-[#e07a5f]' : 'border-[#2F3E46]/20 focus:border-[#D4A373]'}`} 
                placeholder="jane@example.com" 
              />
              {touched.email && !isEmailValid && <span className="text-xs text-[#e07a5f]">Enter a valid email address</span>}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className={`font-fraunces text-lg transition-colors ${touched.reason && !isReasonValid ? 'text-[#e07a5f]' : 'text-[#2F3E46]/60'}`}>What brings you here?</label>
            <div className="flex flex-wrap gap-2">
              {REASONS.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({...prev, reason: r, customReason: ""}));
                    setTouched(prev => ({...prev, reason: true}));
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    formData.reason === r 
                      ? "bg-[#D4A373] border-[#D4A373] text-white" 
                      : "bg-transparent border-[#2F3E46]/20 text-[#2F3E46] hover:border-[#D4A373]/50"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {formData.reason === "Other" && (
                <motion.input
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  type="text"
                  value={formData.customReason}
                  onChange={(e) => setFormData(prev => ({...prev, customReason: e.target.value}))}
                  onBlur={() => handleBlur("reason")}
                  placeholder="Please specify..."
                  className={`w-full max-w-sm bg-transparent border-b px-0 py-2 text-[#2F3E46] focus:outline-none transition-colors ${touched.reason && !isReasonValid ? 'border-[#e07a5f] focus:border-[#e07a5f]' : 'border-[#2F3E46]/20 focus:border-[#D4A373]'}`}
                />
              )}
            </AnimatePresence>
            {touched.reason && !isReasonValid && <span className="text-xs text-[#e07a5f]">Please select or specify a reason</span>}
          </div>

          <div className="flex flex-col gap-2 group">
            <label className={`font-fraunces text-lg transition-colors ${touched.message && !isMessageValid ? 'text-[#e07a5f]' : 'text-[#2F3E46]/60 group-focus-within:text-[#D4A373]'}`}>What are we building?</label>
            <textarea 
              rows={4} 
              value={formData.message} 
              onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
              onBlur={() => handleBlur("message")}
              className={`w-full bg-transparent border-b px-0 py-3 text-[#2F3E46] focus:outline-none transition-colors resize-none font-medium text-lg placeholder:text-[#2F3E46]/30 ${touched.message && !isMessageValid ? 'border-[#e07a5f] focus:border-[#e07a5f]' : 'border-[#2F3E46]/20 focus:border-[#D4A373]'}`} 
              placeholder="Tell me about your project, idea, or just say hi..." 
            />
            {touched.message && !isMessageValid && <span className="text-xs text-[#e07a5f]">Message must be at least 10 characters</span>}
          </div>
        </div>

        {/* Drag to Submit */}
        <div className="mt-4">
          {formState === "idle" && (
            <motion.div 
              animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              onClick={handleSubmit}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSubmit(); } }}
              role="button"
              tabIndex={0}
              aria-label="Submit form"
              ref={trackRef} 
              className={`w-full h-16 rounded-full relative flex items-center overflow-hidden border transition-colors ${
                isFormValid 
                  ? "bg-white/50 border-[#2F3E46]/10 cursor-pointer" 
                  : "bg-white/20 border-[#2F3E46]/5 grayscale opacity-70 cursor-not-allowed"
              }`}
            >
              <span className="absolute w-full text-center text-[10px] font-bold tracking-[0.3em] uppercase pointer-events-none transition-colors text-[#52796F]">
                {isFormValid ? "Slide To Transmit" : "Complete Fields To Transmit"}
              </span>
              <motion.div
                animate={controls}
                drag={isFormValid ? "x" : false}
                dragConstraints={trackRef}
                dragSnapToOrigin={true}
                dragElastic={0.05}
                onDragEnd={handleDragEnd}
                className={`w-14 h-14 rounded-full absolute left-1 flex items-center justify-center shadow-sm transition-transform ${isFormValid ? 'bg-[#D4A373] cursor-grab active:cursor-grabbing hover:scale-105' : 'bg-gray-400 cursor-not-allowed'}`}
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
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

      </div>
    </div>
  );
}
