"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flower, Flower2, Clover, Sprout, Leaf, TreePine } from "lucide-react";

const SKILL_CATEGORIES = [
  { title: "Programming Languages", icon: Flower, color: "blue", skills: ["Python", "JavaScript", "HTML5", "CSS3", "SQL"] },
  { title: "Artificial Intelligence", icon: Flower2, color: "violet", skills: ["Machine Learning", "Supervised Learning", "Unsupervised Learning", "Neural Networks", "Decision Trees", "Regression", "Classification", "Clustering", "Anomaly Detection", "Recommendation Systems", "Reinforcement Learning", "Model Evaluation", "Feature Engineering"] },
  { title: "Generative AI", icon: Sprout, color: "violet", skills: ["Prompt Engineering", "LLM Applications", "AI Workflow Design", "AI Automation", "AI Integrations", "AI-Powered Applications", "Retrieval-Augmented Generation (RAG)", "AI Chatbot Development", "AI Product Prototyping"] },
  { title: "Agentic AI", icon: Clover, color: "violet", skills: ["AI Agents", "Multi-Agent Workflows", "AI Agent Orchestration", "Tool Calling", "Function Calling", "Autonomous AI Systems", "Workflow Automation", "Agent Design Patterns"] },
  { title: "Cloud & DevOps", icon: Leaf, color: "cyan", skills: ["Git", "GitHub", "CI/CD", "Docker", "Kubernetes", "OpenShift", "Cloud Native Development", "SaaS Development", "Serverless Computing", "Cloud Deployment"] },
  { title: "Backend Development", icon: TreePine, color: "blue", skills: ["Node.js", "Django", "Django ORM", "REST APIs", "API Integration", "Microservices", "Authentication & Authorization"] },
  { title: "Software Engineering", icon: Flower, color: "blue", skills: ["Full Stack Development", "Software Architecture", "SDLC", "Application Security", "Debugging", "Version Control", "Code Review", "Deployment Strategies"] },
  { title: "Frontend Development", icon: Flower2, color: "blue", skills: ["React", "Bootstrap", "Responsive Web Design", "Single Page Applications (SPA)", "UI Development", "Component-Based Architecture"] },
  { title: "Databases", icon: Sprout, color: "teal", skills: ["SQL", "NoSQL", "Database Design", "CRUD Operations", "ORM", "Data Modeling"] },
  { title: "Data & Analytics", icon: Clover, color: "teal", skills: ["Data Analysis", "Data Cleaning", "Business Intelligence", "Dashboard Development", "Excel", "Power BI", "Analytical Thinking", "Data Interpretation"] },
  { title: "AI Tools & Platforms", icon: Leaf, color: "violet", skills: ["ChatGPT", "Claude", "Google Gemini", "GitHub Copilot", "NotebookLM", "Perplexity", "Cursor AI", "Bolt.new", "Lovable", "V0", "Replit AI", "Windsurf", "Hugging Face", "Ollama", "LangChain", "n8n", "Make.com"] },
  { title: "AI Wrappers & Automation", icon: TreePine, color: "violet", skills: ["AI Wrapper Development", "AI Product Development", "Workflow Automation", "AI API Integration", "Rapid AI MVP Development", "No-Code AI Solutions"] },
  { title: "Business & Entrepreneurship", icon: Flower, color: "emerald", skills: ["Product Thinking", "Startup Strategy", "MVP Planning", "Business Analysis", "Market Research", "Product Roadmapping", "SaaS Product Development", "Startup Building", "Product Ideation", "Innovation", "Customer Discovery", "Pitching", "Market Validation"] },
  { title: "Leadership & Management", icon: Flower2, color: "orange", skills: ["Leadership", "Team Management", "Team Collaboration", "Project Coordination", "Delegation", "Decision Making", "Conflict Resolution", "Mentoring"] },
  { title: "Event Management", icon: Sprout, color: "orange", skills: ["Event Planning", "Event Coordination", "Volunteer Management", "Public Relations", "Logistics Management"] },
  { title: "Design & Creativity", icon: Clover, color: "pink", skills: ["UI/UX Design", "Graphic Design", "Presentation Design", "Branding Assets", "Marketing Visuals", "UI Mockups", "Brochure Design", "Flyer Design", "Poster Design", "Banner Design"] },
  { title: "Communication", icon: Leaf, color: "slate", skills: ["Public Speaking", "Technical Communication", "Client Communication", "Presentation Skills", "Documentation", "Stakeholder Communication"] },
  { title: "Professional Skills", icon: TreePine, color: "slate", skills: ["Problem Solving", "Critical Thinking", "Analytical Thinking", "Strategic Thinking", "Creativity", "Adaptability", "Time Management", "Research Skills", "Continuous Learning", "Attention to Detail"] },
  { title: "Collaboration Tools", icon: Flower, color: "slate", skills: ["GitHub", "Google Workspace", "Microsoft Office", "Microsoft Excel", "PowerPoint", "Notion", "Figma", "Trello", "Jira"] }
];

const COLOR_MAP: Record<string, { bg: string, text: string, border: string, hex: string }> = {
  violet: { bg: "bg-violet-500/10", text: "text-violet-500", border: "border-violet-500/50", hex: "#8b5cf6" },
  blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/50", hex: "#3b82f6" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-500", border: "border-cyan-500/50", hex: "#06b6d4" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-500", border: "border-pink-500/50", hex: "#ec4899" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-500", border: "border-orange-500/50", hex: "#f97316" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/50", hex: "#10b981" },
  teal: { bg: "bg-teal-500/10", text: "text-teal-500", border: "border-teal-500/50", hex: "#14b8a6" },
  slate: { bg: "bg-slate-500/10", text: "text-slate-500", border: "border-slate-500/50", hex: "#64748b" }
};

const LEFT_COL = ["Programming Languages", "Artificial Intelligence", "Backend Development", "Databases", "Cloud & DevOps", "Software Engineering"];
const RIGHT_COL = ["Agentic AI", "Generative AI", "Data & Analytics", "Design & Creativity", "Leadership & Management", "Event Management"];
const CENTER_TOP = ["AI Tools & Platforms", "AI Wrappers & Automation"];
const CENTER_BOT = ["Business & Entrepreneurship", "Professional Skills", "Communication", "Collaboration Tools"];

export default function ResumeSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  
  const [connections, setConnections] = useState<{ id: string, path: string, color: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const updateConnections = useCallback(() => {
    if (window.innerWidth < 1024) {
      setConnections([]);
      return;
    }

    if (!containerRef.current || !hubRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const hubRect = hubRef.current.getBoundingClientRect();

    const hubX = hubRect.left + hubRect.width / 2 - containerRect.left;
    const hubY = hubRect.top + hubRect.height / 2 - containerRect.top;

    const newConns = [];

    for (const [id, el] of Object.entries(cardRefs.current)) {
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      
      let cardX = rect.left + rect.width / 2 - containerRect.left;
      let cardY = rect.top + rect.height / 2 - containerRect.top;
      
      let cp1x, cp1y, cp2x, cp2y;

      // Calculate path to connect to the correct side of the card
      if (LEFT_COL.includes(id)) {
        cardX = rect.right - containerRect.left;
        cp1x = hubX - (hubX - cardX) * 0.5;
        cp1y = hubY;
        cp2x = hubX - (hubX - cardX) * 0.5;
        cp2y = cardY;
      } else if (RIGHT_COL.includes(id)) {
        cardX = rect.left - containerRect.left;
        cp1x = hubX + (cardX - hubX) * 0.5;
        cp1y = hubY;
        cp2x = hubX + (cardX - hubX) * 0.5;
        cp2y = cardY;
      } else if (CENTER_TOP.includes(id)) {
        cardY = rect.bottom - containerRect.top;
        cp1x = hubX;
        cp1y = hubY - (hubY - cardY) * 0.5;
        cp2x = cardX;
        cp2y = hubY - (hubY - cardY) * 0.5;
      } else {
        cardY = rect.top - containerRect.top;
        cp1x = hubX;
        cp1y = hubY + (cardY - hubY) * 0.5;
        cp2x = cardX;
        cp2y = hubY + (cardY - hubY) * 0.5;
      }

      const path = `M ${hubX} ${hubY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cardX} ${cardY}`;
      // Use a consistent organic green for the park vines, or the category color if preferred.
      // Using an organic green for the "roots/vines" fits the park theme perfectly.
      const color = "#10b981"; // emerald-500

      newConns.push({ id, path, color });
    }

    setConnections(newConns);
  }, []);

  useEffect(() => {
    // Initial draw
    const timeoutId = setTimeout(updateConnections, 100);
    window.addEventListener('resize', updateConnections);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateConnections);
    };
  }, [updateConnections]);

  // When activeCategory changes, the framer-motion layout animation takes ~300ms.
  // We need to continuously redraw the lines during this animation to keep them attached.
  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animateLines = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      updateConnections();

      if (progress < 400) { // animate slightly longer than the 300ms transition to be safe
        animationFrameId = requestAnimationFrame(animateLines);
      }
    };

    animationFrameId = requestAnimationFrame(animateLines);

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeCategory, updateConnections]);

  const renderCard = (catTitle: string) => {
    const category = SKILL_CATEGORIES.find(c => c.title === catTitle);
    if (!category) return null;

    const isActive = activeCategory === category.title;
    const colors = COLOR_MAP[category.color] || COLOR_MAP.slate;

    return (
      <motion.div 
        layout
        key={category.title}
        ref={el => { cardRefs.current[category.title] = el; }}
        onMouseEnter={() => setActiveCategory(category.title)}
        onMouseLeave={() => setActiveCategory(null)}
        onClick={() => setActiveCategory(prev => prev === category.title ? null : category.title)}
        className={`relative z-10 flex flex-col p-4 rounded-2xl cursor-pointer transition-colors duration-300 border backdrop-blur-md overflow-hidden ${
          isActive 
            ? `bg-[var(--bg-secondary)] ${colors.border} shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] z-20` 
            : `bg-[var(--bg-main)]/80 dark:bg-black/40 border-[var(--border-color)] z-10`
        } w-full`}
      >
        <motion.div layout="position" className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? colors.bg : 'bg-[var(--bg-secondary)]'} ${isActive ? colors.text : 'text-[var(--text-secondary)]'} transition-colors duration-300 shrink-0`}>
            <category.icon className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <h4 className={`font-bold text-[13px] tracking-widest uppercase ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} transition-colors duration-300`}>
            {category.title}
          </h4>
        </motion.div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {category.skills.map(skill => (
                <span 
                  key={skill} 
                  className="text-xs px-2.5 py-1 rounded-full bg-[var(--bg-main)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]/30 transition-colors whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full py-12 max-w-7xl mx-auto" ref={containerRef}>
      
      {/* Dynamic SVG Connections Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block" style={{ minHeight: '100%' }}>
        <defs>
          <filter id="soft-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {connections.map((conn) => (
          <path 
            key={conn.id}
            d={conn.path} 
            stroke={conn.color} 
            strokeWidth="2" 
            fill="none" 
            opacity="0.15"
          />
        ))}
      </svg>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {LEFT_COL.map(renderCard)}
        </div>

        {/* Center Column */}
        <div className="flex flex-col gap-4 items-center">
          {CENTER_TOP.map(renderCard)}

          {/* THE PARK HUB */}
          <div className="my-16 relative flex items-center justify-center">
            <div className="absolute w-[200px] h-[200px] rounded-full bg-emerald-500/5 blur-3xl"></div>
            
            <div 
              ref={hubRef}
              className="relative w-32 h-32 rounded-full bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-main)] shadow-[0_0_40px_rgba(16,185,129,0.1)] border border-[var(--border-color)] flex items-center justify-center z-20 overflow-hidden"
            >
              {/* Park SVG Illustration */}
              <svg viewBox="0 0 100 100" className="w-20 h-20 text-emerald-500 drop-shadow-sm absolute bottom-2">
                {/* Cloud Background */}
                <path d="M 20 50 C 10 50, 5 40, 15 35 C 15 25, 30 20, 40 30 C 50 20, 70 25, 70 40 C 80 45, 75 55, 65 55 Z" fill="currentColor" opacity="0.15" className="text-sky-500"/>
                
                {/* Tree Left */}
                <path d="M 35 75 L 40 55 L 30 55 Z" fill="currentColor" opacity="0.6"/>
                <circle cx="35" cy="45" r="14" fill="currentColor" opacity="0.8"/>
                
                {/* Tree Right */}
                <path d="M 65 80 L 70 60 L 60 60 Z" fill="currentColor" opacity="0.4"/>
                <circle cx="65" cy="50" r="10" fill="currentColor" opacity="0.6"/>
                
                {/* Main Center Tree */}
                <path d="M 50 85 L 56 50 L 44 50 Z" fill="currentColor" opacity="0.8"/>
                <circle cx="50" cy="40" r="20" fill="currentColor" opacity="1"/>
                
                {/* Ground */}
                <ellipse cx="50" cy="85" rx="35" ry="5" fill="currentColor" opacity="0.3"/>
              </svg>
            </div>
            
            {/* Soft decorative ring */}
            <motion.div className="absolute w-[150px] h-[150px] border border-emerald-500/10 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
              <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-emerald-500/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          </div>

          {CENTER_BOT.map(renderCard)}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {RIGHT_COL.map(renderCard)}
        </div>

      </div>
    </div>
  );
}
