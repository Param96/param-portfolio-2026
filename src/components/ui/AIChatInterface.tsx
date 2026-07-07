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
          className="relative w-full max-w-2xl h-[75vh] min-h-[500px] flex flex-col rounded-[2rem] overflow-hidden bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-[#2E2C2A]/10 bg-[#F4EDE4]">
            <div className="flex items-center gap-4">
              <img src="/icon.png" alt="Param" className="w-8 h-8 rounded-sm object-cover shadow-sm" />
              <div>
                <h3 className="font-fraunces font-semibold text-lg text-[#2E2C2A]">AI Assistant</h3>
                <p className="text-xs text-[#2E2C2A]/60 font-medium mt-0.5">Ask about my projects, research & background</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[#2E2C2A]/60 hover:text-[#A6552E] hover:bg-black/5 transition-colors"
              aria-label="Close AI assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth bg-[#F4EDE4]/30"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shadow-sm ${m.role === "user" ? "bg-[#2E2C2A] text-[#F4EDE4]" : "bg-transparent"}`}>
                  {m.role === "user" ? <User className="w-4 h-4" /> : <img src="/icon.png" alt="Assistant" className="w-full h-full object-cover" />}
                </div>
                <div className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                  <div className={`px-5 py-4 rounded-2xl ${m.role === "user" ? "bg-[#2E2C2A] text-[#F4EDE4] rounded-tr-sm" : "bg-[#EDE4D6] text-[#2E2C2A] border border-[#2E2C2A]/5 rounded-tl-sm shadow-sm"}`}>
                    {m.role === "model" ? (
                      <div className="text-sm leading-relaxed markdown-content">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                            strong: ({ children }) => <strong className="font-semibold text-[#A6552E]">{children}</strong>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                            li: ({ children }) => <li>{children}</li>,
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="underline text-[#A6552E] hover:text-[#2E2C2A] transition-colors">
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => <h1 className="font-fraunces font-bold text-lg mb-2 mt-4 first:mt-0">{children}</h1>,
                            h2: ({ children }) => <h2 className="font-fraunces font-bold text-md mb-2 mt-4 first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="font-fraunces font-bold text-base mb-2 mt-3 first:mt-0">{children}</h3>,
                            code: ({ className, children }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="bg-black/5 rounded px-1.5 py-0.5 text-[#A6552E] font-mono text-xs">{children}</code>
                              ) : (
                                <pre className="bg-[#2E2C2A] text-[#F4EDE4] p-3 rounded-lg overflow-x-auto text-xs my-3">
                                  <code>{children}</code>
                                </pre>
                              );
                            }
                          }}
                        >
                          {m.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{m.text}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden shadow-sm">
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
          <div className="p-6 md:p-8 border-t border-[#2E2C2A]/10 bg-white">
            <form onSubmit={handleSubmit} className="flex gap-4 relative items-end">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="w-full bg-transparent border-b border-[#2E2C2A]/20 px-0 py-2.5 text-[#2E2C2A] focus:outline-none transition-colors font-medium text-lg placeholder:text-[#2E2C2A]/30 focus:border-[#A6552E]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="shrink-0 p-3 mb-1 rounded-full bg-[#2E2C2A]/5 text-[#2E2C2A] hover:bg-[#A6552E] hover:text-white disabled:opacity-30 disabled:hover:bg-[#2E2C2A]/5 disabled:hover:text-[#2E2C2A] disabled:cursor-not-allowed transition-colors"
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
