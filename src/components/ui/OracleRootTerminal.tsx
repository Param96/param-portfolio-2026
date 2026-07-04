"use client";

import { useState, useRef, useEffect, useMemo, memo } from "react";
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLivingSystemStore } from "@/lib/store";
import { ORACLE_COMMANDS, parseCommand, OutputLine } from "@/lib/oracle-commands";

// ─────────────────────────────────────────────────────────
// TIME OF DAY THEME MAPPING (Meadow/Root Aesthetics)
// ─────────────────────────────────────────────────────────
const THEMES = {
  dawn: { bg: "from-[#2A2320] to-[#1A1614]", border: "#D4A373", text: "#FDEEDC", aiText: "#E5989B", ghost: "#84A98C" },
  day: { bg: "from-[#FDFBF7] to-[#EAE6DE]", border: "#84A98C", text: "#2F3E46", aiText: "#52796F", ghost: "#A3B18A" },
  dusk: { bg: "from-[#2C2127] to-[#1D171A]", border: "#E5989B", text: "#FAD2E1", aiText: "#D4A373", ghost: "#52796F" },
  night: { bg: "from-[#111314] to-[#0A0C0D]", border: "#52796F", text: "#CAD2C5", aiText: "#84A98C", ghost: "#354F52" },
};

// ─────────────────────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 15, onComplete?: () => void) {
  const [displayed, setDisplayed] = useState("");
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplayed(text);
      if (onComplete) onComplete();
      return;
    }

    let i = 0;
    setDisplayed("");
    
    let timeoutId: NodeJS.Timeout;
    
    const typeNext = () => {
      if (i < text.length) {
        setDisplayed(text.substring(0, i + 1));
        i++;
        // Variable delay for organic feel
        const delay = speed + (Math.random() * 30 - 15);
        timeoutId = setTimeout(typeNext, Math.max(5, delay));
      } else {
        if (onComplete) onComplete();
      }
    };
    
    timeoutId = setTimeout(typeNext, speed);
    return () => clearTimeout(timeoutId);
  }, [text, reducedMotion, speed]); // Removed onComplete from deps to prevent infinite loops

  return displayed;
}

// ─────────────────────────────────────────────────────────
// INDIVIDUAL OUTPUT LINE COMPONENT
// ─────────────────────────────────────────────────────────
const TerminalLine = memo(({ line, colors, onClearComplete }: { line: OutputLine, colors: any, onClearComplete?: () => void }) => {
  const isTypewriter = line.animate === "typewriter";
  const displayedText = isTypewriter ? useTypewriter(line.text, 15) : line.text;
  
  // Wilt animation trigger
  const [isWilting, setIsWilting] = useState(false);
  
  useEffect(() => {
    if (line.text === "__CLEAR__") {
      setIsWilting(true);
      setTimeout(() => {
        if (onClearComplete) onClearComplete();
      }, 500); // Wilt duration
    }
  }, [line.text, onClearComplete]);

  if (line.text === "__CLEAR__") return null;

  const colorStyle = line.type === "ai" ? colors.aiText : 
                     line.type === "error" ? "#FF5A5F" : 
                     line.type === "ambient" ? colors.ghost : 
                     colors.text;

  // Render "listening" state
  if (line.text === "listening to the roots...") {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} className="flex items-center gap-2 mt-1 mb-1 font-mono text-xs">
        <span style={{ color: colors.ghost }}>listening</span>
        <div className="flex gap-1">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.aiText }} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.aiText }} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} />
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.aiText }} animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} />
        </div>
      </motion.div>
    );
  }

  // Render Countup (Telemetry)
  if (line.animate === "countup") {
    // Basic fallback if countup logic is too complex to parse from string, we just fade it in
    return (
      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ color: colorStyle }} className="mt-1 font-mono text-xs">{line.text}</div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={line.animate === "fade" ? { opacity: 0 } : { opacity: 1 }} 
      animate={isWilting ? { opacity: 0, y: 15, rotate: Math.random() * 2 - 1 } : { opacity: 1, y: 0, rotate: 0 }} 
      transition={{ duration: isWilting ? 0.5 : 0.3 }}
      style={{ color: colorStyle }}
      className={`mt-2 mb-2 font-mono text-xs ${line.type === "ai" ? "leading-relaxed" : ""} [&_p]:inline-block [&_p]:mb-2 [&_a]:underline hover:[&_a]:text-[var(--amber)] [&_ul]:list-disc [&_ul]:ml-4 [&_ul]:mb-2 [&_ol]:list-decimal [&_ol]:ml-4 [&_ol]:mb-2 [&_strong]:font-bold [&_em]:italic [&_code]:bg-black/20 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded`}
    >
      {line.type === "user" ? <span className="opacity-50 mr-2">⌥</span> : null}
      {line.type === "ai" ? (
        <ReactMarkdown>
          {isTypewriter ? displayedText : line.text}
        </ReactMarkdown>
      ) : (
        isTypewriter ? displayedText : line.text
      )}
    </motion.div>
  );
});
TerminalLine.displayName = "TerminalLine";

// ─────────────────────────────────────────────────────────
// MAIN TERMINAL COMPONENT
// ─────────────────────────────────────────────────────────
export default function OracleRootTerminal() {
  const { terminalOpen, toggleTerminal, timeOfDayTheme, setTimeOfDayTheme } = useLivingSystemStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([
    { id: "init-1", text: "ORACLE ROOT // LIVING SYSTEM v2.0", type: "system", animate: "fade" },
    { id: "init-2", text: "Tap into the mycelial network.", type: "ambient", animate: "typewriter" },
  ]);
  const [isRebooting, setIsRebooting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const colors = THEMES[timeOfDayTheme] || THEMES.night;
  const reducedMotion = useReducedMotion();

  // Auto-focus & scroll
  useEffect(() => {
    if (terminalOpen && inputRef.current) inputRef.current.focus();
  }, [terminalOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  // Autocomplete Logic
  const autocompleteTarget = useMemo(() => {
    if (!input) return "";
    const match = ORACLE_COMMANDS.find(c => c.id.startsWith(input.toLowerCase()));
    if (match && match.id !== input.toLowerCase()) {
      return match.id;
    }
    return "";
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab" && autocompleteTarget) {
      e.preventDefault();
      setInput(autocompleteTarget + " ");
    } else if (e.key === "Enter") {
      execute(input);
    }
  };

  const execute = async (cmdString: string) => {
    if (!cmdString.trim()) return;
    
    setInput("");
    
    if (cmdString.trim().toLowerCase() === "clear") {
      // Trigger wilt animation
      setHistory(prev => [...prev, { id: Math.random().toString(), text: "__CLEAR__", type: "system" }]);
      return;
    }

    setHistory(prev => [...prev, { id: Math.random().toString(), text: cmdString, type: "user" }]);
    
    const { command, args } = parseCommand(cmdString);
    
    if (!command) {
      setHistory(prev => [...prev, { id: Math.random().toString(), text: `Unrecognized root pattern: ${cmdString}`, type: "error", animate: "typewriter" }]);
      return;
    }

    const context = {
      setHistory,
      toggleTerminal,
      setTimeOfDayTheme,
      triggerReboot: () => {
        setIsRebooting(true);
        setTimeout(() => window.location.reload(), 1500);
      },
      history
    };

    await command.execute(args, context);
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm pointer-events-auto" onClick={toggleTerminal} />
          
          {/* Reboot Fullscreen Crack Animation */}
          <AnimatePresence>
            {isRebooting && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="absolute inset-0 z-50 bg-white flex items-center justify-center pointer-events-none"
              >
                {/* Visual abstract crack/flash could go here */}
                <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-difference" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terminal Container */}
          <motion.div 
            className="relative w-full max-w-4xl h-[65vh] min-h-[450px] flex pointer-events-auto filter drop-shadow-2xl"
          >
            {/* SVG Organic Clip Path Border */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <clipPath id="root-clip" clipPathUnits="objectBoundingBox">
                {/* Organic wavy edge approximation */}
                <path d="M0.01,0.02 C0.05,0.0 0.95,0.0 0.99,0.02 L0.99,0.98 C0.95,1.0 0.05,1.0 0.01,0.98 Z" />
              </clipPath>
              {/* Summon Animation Stroke */}
              {!reducedMotion && (
                <motion.rect 
                  x="1" y="1" width="99%" height="99%" rx="12"
                  fill="none" stroke={colors.border} strokeWidth="2"
                  initial={{ strokeDasharray: "1000", strokeDashoffset: "1000", opacity: 1 }}
                  animate={{ strokeDashoffset: "0", opacity: 0.2 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              )}
            </svg>

            {/* Main Content Area */}
            <div 
              className={`w-full h-full flex rounded-xl overflow-hidden bg-gradient-to-br ${colors.bg} relative border border-transparent`}
              style={{ borderColor: colors.border + '40' }}
            >
              {/* Breathing Organic Noise */}
              <motion.div 
                className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"
                animate={{ opacity: [0.03, 0.06, 0.03] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Collapsible Sidebar */}
              <div className="w-12 border-r flex flex-col items-center py-4 gap-4 z-10" style={{ borderColor: colors.border + '40', backgroundColor: 'rgba(0,0,0,0.2)' }}>
                {ORACLE_COMMANDS.map(cmd => (
                  <button 
                    key={cmd.id}
                    onClick={() => execute(cmd.id)}
                    className="p-2 rounded-md hover:bg-white/10 group relative transition-colors"
                    title={cmd.name}
                  >
                    <cmd.icon className="w-4 h-4" style={{ color: colors.border }} />
                    <span className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity font-mono">
                      {cmd.id}
                    </span>
                  </button>
                ))}
              </div>

              {/* CLI Area */}
              <div className="flex-1 flex flex-col z-10 relative">
                {/* Header */}
                <div className="h-10 border-b flex items-center justify-between px-6 font-mono text-[10px] tracking-widest uppercase opacity-50" style={{ borderColor: colors.border + '20', color: colors.text }}>
                  <span>Oracle_Root :: Process_Active</span>
                  <button onClick={toggleTerminal} className="hover:opacity-100 transition-opacity">CLOSE [X]</button>
                </div>

                {/* Scrollable Output */}
                <div 
                  ref={scrollRef} 
                  className="flex-1 p-6 overflow-y-auto scroll-smooth cursor-text"
                  onClick={() => inputRef.current?.focus()}
                >
                  {history.map(line => (
                    <TerminalLine 
                      key={line.id} 
                      line={line} 
                      colors={colors} 
                      onClearComplete={() => setHistory([])}
                    />
                  ))}
                </div>

                {/* Input Area */}
                <div className="h-14 border-t flex items-center px-6 relative" style={{ borderColor: colors.border + '20' }}>
                  <span className="mr-3 mt-1 opacity-70" style={{ color: colors.border }}>
                    {/* Custom Root Fork Glyph */}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3v12"/>
                      <path d="M18 9a9 9 0 0 1-9 9"/>
                    </svg>
                  </span>
                  
                  {/* Autocomplete Ghost */}
                  <div className="absolute left-[3.25rem] pointer-events-none font-mono text-xs opacity-30 mt-[1px]" style={{ color: colors.ghost }}>
                    {input}{autocompleteTarget ? autocompleteTarget.slice(input.length) : ""}
                  </div>
                  
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none font-mono text-xs z-10 relative"
                    style={{ color: colors.text }}
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
