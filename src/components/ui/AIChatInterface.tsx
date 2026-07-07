"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
}

interface AIChatInterfaceProps {
  onClose: () => void;
}

export default function AIChatInterface({ onClose }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! I am an AI assistant trained on Param's projects, research, and background. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Prepare history for API
    const history = messages
      .filter((m) => m.id !== "welcome") // Exclude initial welcome message if needed, or keep it
      .map((m) => ({
        role: m.role,
        text: m.text,
      }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.text,
          history: history,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");
      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const modelMessageId = (Date.now() + 1).toString();
      
      setMessages((prev) => [...prev, { id: modelMessageId, role: "model", text: "" }]);

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === modelMessageId ? { ...m, text: m.text + chunk } : m
            )
          );
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), role: "model", text: "Connection error. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        
        <motion.div
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl h-[70vh] min-h-[500px] flex flex-col rounded-2xl overflow-hidden bg-[var(--surface-sunken)] border border-[var(--border-subtle)] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--surface-base)]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[var(--accent-glow)] text-[var(--accent-color)]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--text-primary)]">AI Assistant</h3>
                <p className="text-xs text-[var(--text-secondary)]">Trained on Param's neural network</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close AI Assistant chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === "user" ? "bg-[var(--surface-raised)] text-[var(--text-primary)]" : "bg-[var(--accent-glow)] text-[var(--accent-color)]"}`}>
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} max-w-[80%]`}>
                  <div className={`px-4 py-3 rounded-2xl ${m.role === "user" ? "bg-[var(--surface-raised)] text-[var(--text-primary)] rounded-tr-sm" : "bg-[var(--surface-base)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-tl-sm"}`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[var(--accent-glow)] text-[var(--accent-color)]">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[var(--surface-base)] border border-[var(--border-subtle)] rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--accent-color)]" />
                  <span className="text-sm text-[var(--text-secondary)]">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--surface-base)]">
            <form onSubmit={handleSubmit} className="flex gap-2 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-[var(--surface-sunken)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] rounded-xl px-4 py-3 outline-none border border-[var(--border-subtle)] focus:border-[var(--accent-color)] transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 rounded-xl bg-[var(--surface-raised)] text-[var(--text-primary)] hover:bg-[var(--accent-glow)] hover:text-[var(--accent-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
