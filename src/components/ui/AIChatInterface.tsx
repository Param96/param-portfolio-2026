"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
}

interface AIChatInterfaceProps {
  onClose: () => void;
}

export default function AIChatInterface({ onClose }: AIChatInterfaceProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! I am an AI assistant with knowledge of Param's projects, research, and background. What would you like to know?",
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
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = '';
    };
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

  const chatContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#FAF7F0] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[85vh] border border-[#2E2C2A]/10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#2E2C2A]/10 bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-[#2E2C2A]/5 border border-[#2E2C2A]/10">
                <img src="/icon.png" alt="Assistant" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg text-[#2E2C2A]">AI Assistant</h3>
                <p className="text-sm text-[#2E2C2A]/60 font-medium">Knowledge & Context Engine</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#2E2C2A]/5 text-[#2E2C2A]/60 hover:text-[#2E2C2A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6" ref={scrollRef}>
            {messages.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i === messages.length - 1 ? 0.1 : 0 }}
                className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                  m.role === "user" 
                    ? "bg-[#2E2C2A] border-[#2E2C2A] text-white" 
                    : "bg-[#2E2C2A]/5 border-[#2E2C2A]/10 overflow-hidden"
                }`}>
                  {m.role === "user" ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <img src="/icon.png" alt="Assistant" className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] px-5 py-4 rounded-2xl ${
                  m.role === "user"
                    ? "bg-[#2E2C2A] text-white rounded-tr-sm"
                    : "bg-[#EDE4D6] text-[#2E2C2A] border border-[#2E2C2A]/5 rounded-tl-sm shadow-sm"
                }`}>
                  {m.text ? (
                    <div className={`prose prose-sm md:prose-base leading-relaxed ${
                      m.role === "user" ? "prose-invert" : "prose-stone"
                    }`}>
                      <ReactMarkdown
                        components={{
                          p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                          strong: ({ children }) => <strong className={m.role === "user" ? "font-semibold text-white" : "font-semibold text-[#A6552E]"}>{children}</strong>,
                          ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                          li: ({ children }) => <li>{children}</li>,
                          code: ({ children }) => <code className={`px-1 py-0.5 rounded text-sm ${m.role === "user" ? "bg-white/20" : "bg-[#2E2C2A]/10"}`}>{children}</code>,
                          pre: ({ children }) => <pre className={`p-3 rounded-lg overflow-x-auto text-sm my-2 ${m.role === "user" ? "bg-black/30" : "bg-white border border-[#2E2C2A]/10"}`}>{children}</pre>,
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="flex gap-1.5 px-1 py-1">
                      <motion.div className="w-1.5 h-1.5 bg-[#A6552E] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0 }} />
                      <motion.div className="w-1.5 h-1.5 bg-[#A6552E] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }} />
                      <motion.div className="w-1.5 h-1.5 bg-[#A6552E] rounded-full" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }} />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
            
            {/* Loading Indicator */}
            {isLoading && !messages[messages.length - 1].text && (
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#2E2C2A]/5 border border-[#2E2C2A]/10 overflow-hidden">
                  <img src="/icon.png" alt="Assistant" className="w-full h-full object-cover" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-[#EDE4D6] border border-[#2E2C2A]/5 rounded-tl-sm flex items-center gap-2 shadow-sm">
                  <div className="flex gap-1.5 px-1 py-1">
                    <motion.div
                      className="w-1.5 h-1.5 bg-[#A6552E] rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-[#A6552E] rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 bg-[#A6552E] rounded-full"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 border-t border-[#2E2C2A]/10 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-4 relative items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-[#2E2C2A]/5 border border-transparent rounded-xl px-4 py-3 text-[#2E2C2A] focus:outline-none focus:border-[#A6552E]/30 transition-colors font-medium"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="shrink-0 p-3 rounded-xl bg-[#2E2C2A] text-white hover:bg-[#A6552E] disabled:opacity-30 disabled:hover:bg-[#2E2C2A] transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  if (!mounted) return null;

  const { createPortal } = require('react-dom');
  return createPortal(chatContent, document.body);
}
