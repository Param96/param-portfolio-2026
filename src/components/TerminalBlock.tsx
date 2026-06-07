"use client";

import { useEffect, useState, useRef } from "react";

interface TerminalLine {
  text: string;
  type: "command" | "output" | "success" | "warning" | "info";
}

interface TerminalBlockProps {
  lines: TerminalLine[];
  typingSpeed?: number;
  className?: string;
  title?: string;
  loop?: boolean;
}

const typeColors: Record<string, string> = {
  command: "text-emerald-400",
  output: "text-slate-400",
  success: "text-green-400",
  warning: "text-amber-400",
  info: "text-blue-400",
};

const prefixes: Record<string, string> = {
  command: "❯ ",
  output: "  ",
  success: "✓ ",
  warning: "⚠ ",
  info: "ℹ ",
};

export default function TerminalBlock({
  lines,
  typingSpeed = 40,
  className = "",
  title = "terminal",
  loop = true,
}: TerminalBlockProps) {
  const [displayedLines, setDisplayedLines] = useState<
    { text: string; type: string }[]
  >([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      if (loop) {
        const timeout = setTimeout(() => {
          setDisplayedLines([]);
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
        }, 3000);
        return () => clearTimeout(timeout);
      }
      return;
    }

    const currentLine = lines[currentLineIndex];
    const fullText = prefixes[currentLine.type] + currentLine.text;

    if (currentLine.type === "command") {
      // Type character by character for commands
      if (currentCharIndex < fullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            if (newLines.length <= currentLineIndex) {
              newLines.push({ text: "", type: currentLine.type });
            }
            newLines[currentLineIndex] = {
              text: fullText.slice(0, currentCharIndex + 1),
              type: currentLine.type,
            };
            return newLines;
          });
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Move to next line
        const timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      // Output lines appear instantly
      setDisplayedLines((prev) => [
        ...prev,
        { text: fullText, type: currentLine.type },
      ]);
      const timeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, loop]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <div
      className={`glass rounded-xl overflow-hidden ${className}`}
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-amber-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
        </div>
        <span className="text-xs text-slate-500 terminal-text ml-2">
          {title}
        </span>
      </div>
      {/* Terminal content */}
      <div
        ref={containerRef}
        className="p-4 max-h-[200px] overflow-y-auto terminal-text text-sm leading-relaxed"
        style={{ background: "rgba(0,0,0,0.3)" }}
      >
        {displayedLines.map((line, i) => (
          <div key={i} className={`${typeColors[line.type]} whitespace-pre`}>
            {line.text}
            {i === displayedLines.length - 1 &&
              currentLineIndex < lines.length &&
              lines[currentLineIndex]?.type === "command" && (
                <span className="inline-block w-2 h-4 bg-emerald-400 ml-0.5 animate-pulse" />
              )}
          </div>
        ))}
        {displayedLines.length === 0 && (
          <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
        )}
      </div>
    </div>
  );
}
