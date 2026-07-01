"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLivingSystemStore } from "@/lib/store";

export default function GodModeTerminal() {
  const { terminalOpen, toggleTerminal, setTimeOfDayTheme, cinematicPhase, hasSeenCinematic } = useLivingSystemStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "LIVING SYSTEM OS v2.0",
    "Type 'help' to see available commands.",
    "--------------------------------------"
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCinematicComplete = cinematicPhase === 7 || (hasSeenCinematic && cinematicPhase === 0);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (terminalOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [terminalOpen]);

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed !== "clear") {
      setHistory(prev => [...prev, `> ${cmd}`]);
    }
    
    setInput("");

    switch (trimmed) {
      case "help":
        setHistory(prev => [...prev, 
          "Available commands:",
          "  clear        - Clear terminal output",
          "  exit         - Close terminal",
          "  theme dawn   - Override theme to dawn",
          "  theme day    - Override theme to day",
          "  theme dusk   - Override theme to dusk",
          "  theme night  - Override theme to midnight",
          "  github       - Fetch live repository telemetry",
          "  telemetry    - Fetch live repository telemetry",
          "  reboot       - Reload the system"
        ]);
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
      case "quit":
        toggleTerminal();
        break;
      case "theme dawn":
        setTimeOfDayTheme("dawn");
        setHistory(prev => [...prev, "System theme overridden: DAWN"]);
        break;
      case "theme day":
        setTimeOfDayTheme("day");
        setHistory(prev => [...prev, "System theme overridden: DAY"]);
        break;
      case "theme dusk":
        setTimeOfDayTheme("dusk");
        setHistory(prev => [...prev, "System theme overridden: DUSK"]);
        break;
      case "theme night":
      case "theme midnight":
        setTimeOfDayTheme("night");
        setHistory(prev => [...prev, "System theme overridden: NIGHT"]);
        break;
      case "github":
      case "telemetry":
        setHistory(prev => [...prev, "Establishing secure connection to GitHub API..."]);
        try {
          const res = await fetch("/api/github");
          const json = await res.json();
          if (!res.ok) throw new Error(json.error || "Connection failed");
          
          const d = json.data;
          setHistory(prev => [
            ...prev,
            "--------------------------------------",
            `REPOSITORY:   ${d.repo}`,
            `STARS:        ${d.stars} ★`,
            `FORKS:        ${d.forks}`,
            `LAST UPDATED: ${new Date(d.last_updated).toLocaleString()}`,
            "--------------------------------------",
            "LATEST COMMITS:",
            ...d.latest_commits.map((c: any) => `[${c.sha}] ${c.message} (${c.author})`),
            "--------------------------------------"
          ]);
        } catch (err) {
          setHistory(prev => [...prev, "[ERROR]: Failed to retrieve telemetry."]);
        }
        break;
      case "reboot":
        setHistory(prev => [...prev, "Rebooting..."]);
        setTimeout(() => window.location.reload(), 1000);
        break;
      case "":
        break;
      default:
        setHistory(prev => [...prev, `Command not found: ${trimmed}`]);
        break;
    }
  };

  return (
    <AnimatePresence>
      {terminalOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none"
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md pointer-events-auto" onClick={toggleTerminal} />
          
          {/* Terminal Window */}
          <div className="relative w-full max-w-3xl h-[60vh] min-h-[400px] bg-[#111111] border border-[#333333] rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col font-inter text-xs pointer-events-auto">
            {/* Header */}
            <div className="h-8 border-b border-[#333333] flex items-center justify-between px-4 bg-[#1A1A1A] select-none">
              <span className="text-[#888888]">system_override.exe</span>
              <button onClick={toggleTerminal} className="text-[#888888] hover:text-[#EEEEEE] transition-colors">
                [X]
              </button>
            </div>

            {/* Output */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-1 text-[#00FF41]">
              {history.map((line, i) => (
                <div key={i} className={line.startsWith(">") ? "text-[#FFFFFF] mt-2" : "opacity-80"}>
                  {line}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="h-12 border-t border-[#333333] p-4 flex items-center gap-2 text-[#FFFFFF] bg-[#111111]">
              <span className="text-[#00FF41]">root@system:~#</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCommand(input);
                }}
                className="flex-1 bg-transparent outline-none border-none text-[#FFFFFF]"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
