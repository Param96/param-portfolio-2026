import { HelpCircle, Trash2, Power, Palette, Github, MessageSquare, Navigation, User, FileDown, FolderOpen, Layers, Shield, Wind, Sparkles, Activity, BookOpen } from "lucide-react";

export type CommandId = "help" | "clear" | "exit" | "theme" | "github" | "ask" | "reboot" | "goto" | "whoami" | "resume" | "projects" | "stack" | "sudo-hire-me" | "whisper" | "fortune" | "status" | "story";

export interface CommandDefinition {
  id: CommandId;
  name: string;
  aliases: string[];
  description: string;
  icon: any; // Lucide icon
  execute: (args: string, context: ExecutionContext) => Promise<void> | void;
  /** If true, this command won't show in the sidebar icon strip */
  hiddenFromSidebar?: boolean;
}

export interface ExecutionContext {
  setHistory: (updater: (prev: OutputLine[]) => OutputLine[]) => void;
  toggleTerminal: () => void;
  setTimeOfDayTheme: (theme: any) => void;
  triggerReboot: () => void;
  navigate: (path: string) => void;
  history: OutputLine[];
}

export interface OutputLine {
  id: string;
  text: string;
  type: "system" | "user" | "ai" | "telemetry" | "error" | "ambient";
  animate?: "typewriter" | "countup" | "fade" | "none";
}

const generateId = () => Math.random().toString(36).substr(2, 9);

// ─────────────────────────────────────────────────────────
// SITE ROUTES
// ─────────────────────────────────────────────────────────
const SITE_ROUTES: Record<string, string> = {
  home: "/",
  projects: "/projects",
  research: "/research",
  blog: "/blog",
  "ai-lab": "/ai-lab",
  contact: "/contact",
  about: "/about",
};

// ─────────────────────────────────────────────────────────
// WHISPER LINES
// ─────────────────────────────────────────────────────────
const WHISPER_LINES = [
  "The meadow remembers everything you plant in it.",
  "Code is just soil that hasn't learned to bloom yet.",
  "Some roots go deeper than the systems they feed.",
  "Every page here was once a blank field. Then someone sat down and started typing.",
  "The best architectures are the ones that feel like they grew here naturally.",
  "You don't build systems. You grow them, and hope they outlive you.",
];

// ─────────────────────────────────────────────────────────
// FORTUNE LINES
// ─────────────────────────────────────────────────────────
const FORTUNE_LINES = [
  "\"Any sufficiently advanced codebase is indistinguishable from legacy.\" — Ancient Dev Proverb",
  "\"The best error message is the one that never shows up.\" — Thomas Fuchs",
  "\"First, solve the problem. Then, write the code.\" — John Johnson",
  "\"It works on my machine.\" — Every developer, eventually",
  "\"AI will replace programmers\" said the programmer, pushing code to production.",
  "\"The only way to go fast is to go well.\" — Robert C. Martin",
  "\"Weeks of coding can save you hours of planning.\" — Anonymous",
  "\"There are only two hard things in CS: cache invalidation, naming things, and off-by-one errors.\"",
];

// ─────────────────────────────────────────────────────────
// COMMANDS
// ─────────────────────────────────────────────────────────
export const ORACLE_COMMANDS: CommandDefinition[] = [
  // ═══════════════════════════════════════════════════════
  // CORE COMMANDS
  // ═══════════════════════════════════════════════════════
  {
    id: "help",
    name: "Help",
    aliases: ["help", "man", "cmds"],
    description: "List available oracle root protocols",
    icon: HelpCircle,
    execute: (_, { setHistory }) => {
      setHistory(prev => [
        ...prev,
        { 
          id: generateId(), 
          text: `Available protocols:

— Navigation ——————————————————————————
  goto [page], nav, warp    Navigate directly to a page
  resume, cv                Download the resume

— Identity ———————————————————————————
  whoami                    Who's behind the root
  projects, ls projects     List active builds
  stack, uses               Current tools & stack

— System ————————————————————————————
  help, man, cmds           Show this list
  clear, cls                Prune dead output vines
  exit, quit, close         Close the oracle root terminal
  theme [dawn|day|dusk|night]   Force a specific visual theme
  github, telemetry         Tap telemetry roots (live repo stats)
  ask [msg], query [msg]    Query the neural echo (AI assistant)
  reboot                    Fracture and reload
  status, uptime            Root system status

— Flavor —————————————————————————————
  whisper, sing             A short line from the meadow
  fortune                   A random dev quip
  story, lore, about-site   The story behind this site
  sudo hire-me              ...`, 
          type: "system", 
          animate: "typewriter" 
        }
      ]);
    }
  },
  {
    id: "clear",
    name: "Clear",
    aliases: ["clear", "cls"],
    description: "Wipe terminal history",
    icon: Trash2,
    execute: () => {
      // Handled entirely by UI layer to animate the "wilt" before clearing
    }
  },
  {
    id: "exit",
    name: "Exit",
    aliases: ["exit", "quit", "close"],
    description: "Close oracle root",
    icon: Power,
    execute: (_, { toggleTerminal }) => {
      toggleTerminal();
    }
  },
  {
    id: "theme",
    name: "Theme",
    aliases: ["theme"],
    description: "Change visual theme",
    icon: Palette,
    execute: (args, { setHistory, setTimeOfDayTheme }) => {
      const target = args.trim().toLowerCase();
      const validThemes = ["dawn", "day", "dusk", "night"];
      
      if (validThemes.includes(target)) {
        setTimeOfDayTheme(target);
        setHistory(prev => [...prev, { id: generateId(), text: `Circadian override engaged: ${target.toUpperCase()}`, type: "system", animate: "typewriter" }]);
      } else {
        setHistory(prev => [...prev, { id: generateId(), text: `Unknown cycle: ${target}. Try dawn, day, dusk, or night.`, type: "error", animate: "typewriter" }]);
      }
    }
  },
  {
    id: "github",
    name: "Telemetry",
    aliases: ["github", "telemetry"],
    description: "Fetch live repository stats",
    icon: Github,
    execute: async (_, { setHistory }) => {
      setHistory(prev => [...prev, { id: generateId(), text: "Tapping telemetry roots...", type: "ambient", animate: "fade" }]);
      try {
        const res = await fetch("/api/github");
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Connection severed");
        
        const d = json.data;
        setHistory(prev => [
          ...prev,
          { id: generateId(), text: `REPOSITORY: ${d.repo}`, type: "telemetry", animate: "typewriter" },
          { id: generateId(), text: `STARS: ${d.stars}`, type: "telemetry", animate: "countup" },
          { id: generateId(), text: `FORKS: ${d.forks}`, type: "telemetry", animate: "countup" },
          { id: generateId(), text: "LATEST COMMITS:", type: "telemetry", animate: "typewriter" },
          ...d.latest_commits.map((c: any) => ({
            id: generateId(),
            text: `[${c.sha}] ${c.message} (${c.author})`,
            type: "telemetry",
            animate: "typewriter"
          } as OutputLine))
        ]);
      } catch (err: any) {
        setHistory(prev => [...prev, { id: generateId(), text: `[ERROR]: Failed to tap roots. ${err.message}`, type: "error", animate: "typewriter" }]);
      }
    }
  },
  {
    id: "ask",
    name: "Query Neural",
    aliases: ["ask", "query"],
    description: "Ask the AI Clone",
    icon: MessageSquare,
    execute: async (args, { setHistory, history }) => {
      if (!args.trim()) {
        setHistory(prev => [...prev, { id: generateId(), text: "Usage: ask [your question]", type: "error", animate: "typewriter" }]);
        return;
      }
      
      const loadingId = generateId();
      setHistory(prev => [...prev, { id: loadingId, text: "listening to the roots...", type: "ambient", animate: "fade" }]);
      
      try {
        const previousMessages = history
          .filter(line => line.type === 'user' || line.type === 'ai')
          .map(line => ({
            role: line.type === 'ai' ? 'model' : 'user',
            text: line.text
          }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            message: args,
            history: previousMessages
          }),
        });
        
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.error || "Neural link severed");
        }
        
        if (!res.body) throw new Error("No response body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        
        // Remove loading state and add initial empty ai response
        const responseId = generateId();
        setHistory(prev => {
          const filtered = prev.filter(line => line.id !== loadingId);
          return [...filtered, { id: responseId, text: '', type: "ai", animate: "none" }]; 
        });

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          
          setHistory(prev => 
            prev.map(line => 
              line.id === responseId 
                ? { ...line, text: fullText } 
                : line
            )
          );
        }
      } catch (err: any) {
        setHistory(prev => {
          const filtered = prev.filter(line => line.id !== loadingId);
          return [...filtered, { id: generateId(), text: `[ERROR]: ${err.message || "Connection lost"}`, type: "error", animate: "typewriter" }];
        });
      }
    }
  },
  {
    id: "reboot",
    name: "Reboot",
    aliases: ["reboot"],
    description: "Fracture and reload",
    icon: Power,
    hiddenFromSidebar: true,
    execute: (_, { triggerReboot }) => {
      triggerReboot();
    }
  },

  // ═══════════════════════════════════════════════════════
  // NEW COMMANDS
  // ═══════════════════════════════════════════════════════

  {
    id: "goto",
    name: "Navigate",
    aliases: ["goto", "nav", "warp"],
    description: "Navigate to a site page",
    icon: Navigation,
    execute: (args, { setHistory, navigate, toggleTerminal }) => {
      const target = args.trim().toLowerCase();
      const destinations = Object.keys(SITE_ROUTES);

      if (!target) {
        setHistory(prev => [...prev, {
          id: generateId(),
          text: `Where to? Available destinations:\n  ${destinations.join(", ")}`,
          type: "system",
          animate: "typewriter"
        }]);
        return;
      }

      const route = SITE_ROUTES[target];
      if (!route) {
        setHistory(prev => [...prev, {
          id: generateId(),
          text: `Unknown destination: "${target}". Try: ${destinations.join(", ")}`,
          type: "error",
          animate: "typewriter"
        }]);
        return;
      }

      setHistory(prev => [...prev, {
        id: generateId(),
        text: `Rerouting through the root network... arriving at ${target}.`,
        type: "system",
        animate: "typewriter"
      }]);

      setTimeout(() => {
        toggleTerminal();
        navigate(route);
      }, 800);
    }
  },
  {
    id: "whoami",
    name: "Who Am I",
    aliases: ["whoami"],
    description: "Identity behind the root",
    icon: User,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      setHistory(prev => [...prev, {
        id: generateId(),
        text: `Param Patel
AI/ML Engineer · Full Stack Engineer · Builder · Aspiring Researcher

Building Agentic AI Systems, Intelligent Products & Scalable Software.
Currently growing systems that think, learn, and adapt — one root at a time.`,
        type: "system",
        animate: "typewriter"
      }]);
    }
  },
  {
    id: "resume",
    name: "Resume",
    aliases: ["resume", "cv"],
    description: "Download the resume",
    icon: FileDown,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      setHistory(prev => [...prev, {
        id: generateId(),
        text: "Unearthing resume from the archives... download initiating.",
        type: "system",
        animate: "typewriter"
      }]);

      setTimeout(() => {
        const link = document.createElement("a");
        link.href = "/resume.pdf";
        link.download = "Param_Patel_Resume.pdf";
        link.click();
      }, 500);
    }
  },
  {
    id: "projects",
    name: "Projects",
    aliases: ["projects", "ls projects"],
    description: "List active builds",
    icon: FolderOpen,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      setHistory(prev => [...prev, {
        id: generateId(),
        text: `Active builds in the clearing:

  ◆ Agentic AI Systems    — Autonomous agents that plan, reason, and act
  ◆ Intelligent Products  — AI-powered tools shipped to production
  ◆ Scalable Software     — Full-stack systems built to grow
  ◆ Research Prototypes    — Experiments at the edge of what's possible

Type \`goto projects\` to explore the full clearing.`,
        type: "system",
        animate: "typewriter"
      }]);
    }
  },
  {
    id: "stack",
    name: "Stack",
    aliases: ["stack", "uses"],
    description: "Current tools & stack",
    icon: Layers,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      setHistory(prev => [...prev, {
        id: generateId(),
        text: `Root system stack:

  Languages     Python · TypeScript · JavaScript
  AI/ML         PyTorch · TensorFlow · LangChain · HuggingFace
  Frontend      React · Next.js · Three.js · Framer Motion
  Backend       Node.js · FastAPI · PostgreSQL · Redis
  Infra         Vercel · AWS · Docker · GitHub Actions
  Tools         Git · Figma · Sanity CMS · PostHog`,
        type: "system",
        animate: "typewriter"
      }]);
    }
  },
  {
    id: "sudo-hire-me",
    name: "Sudo Hire Me",
    aliases: ["sudo hire-me"],
    description: "...",
    icon: Shield,
    hiddenFromSidebar: true,
    execute: (_, { setHistory, navigate, toggleTerminal }) => {
      setHistory(prev => [...prev, {
        id: generateId(),
        text: "Permission granted. Redirecting root access to the Contact page...",
        type: "system",
        animate: "typewriter"
      }]);

      setTimeout(() => {
        toggleTerminal();
        navigate("/contact");
      }, 1200);
    }
  },
  {
    id: "whisper",
    name: "Whisper",
    aliases: ["whisper", "sing"],
    description: "A line from the meadow",
    icon: Wind,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      const line = WHISPER_LINES[Math.floor(Math.random() * WHISPER_LINES.length)];
      setHistory(prev => [...prev, {
        id: generateId(),
        text: line,
        type: "ambient",
        animate: "typewriter"
      }]);
    }
  },
  {
    id: "fortune",
    name: "Fortune",
    aliases: ["fortune"],
    description: "A random dev quip",
    icon: Sparkles,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      const fortune = FORTUNE_LINES[Math.floor(Math.random() * FORTUNE_LINES.length)];
      setHistory(prev => [...prev, {
        id: generateId(),
        text: fortune,
        type: "system",
        animate: "typewriter"
      }]);
    }
  },
  {
    id: "status",
    name: "Status",
    aliases: ["status", "uptime"],
    description: "Root system status",
    icon: Activity,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      const health = Math.floor(Math.random() * 5) + 95; // 95-99
      const protocols = Math.floor(Math.random() * 6) + 10; // 10-15
      const deployDays = Math.floor(Math.random() * 7) + 1; // 1-7
      const coffeeOptions = ["critically low", "low", "moderate", "brewing", "refilling"];
      const coffee = coffeeOptions[Math.floor(Math.random() * coffeeOptions.length)];
      const uptimeHours = Math.floor(Math.random() * 720) + 100;

      setHistory(prev => [...prev, {
        id: generateId(),
        text: `Root system status:

  Root health:       ${health}%
  Uptime:            ${uptimeHours}h continuous
  Last deploy:       ${deployDays} day${deployDays > 1 ? 's' : ''} ago
  Active protocols:  ${protocols}
  Meadow sync:       stable
  Coffee reserves:   ${coffee}`,
        type: "telemetry",
        animate: "typewriter"
      }]);
    }
  },
  {
    id: "story",
    name: "Story",
    aliases: ["story", "lore", "about-site"],
    description: "The story behind this site",
    icon: BookOpen,
    hiddenFromSidebar: true,
    execute: (_, { setHistory }) => {
      setHistory(prev => [...prev, {
        id: generateId(),
        text: `Every root has a story.

This site is a meadow that changes with the hour — dawn, day, dusk, night — each with its own light, its own mood. The world you see shifts around you. If you stay long enough, you'll notice.

Home is where the path begins — open ground, distant mountains, a quiet hut with smoke rising from its chimney. The Clearing holds monuments to what's been built: standing stones around a forge, each one a project brought to life. The Ancient Library hides among broken pillars, where runes still float and something is always being uncovered. The Campfire is where stories get told — warm light, familiar ground. The AI Lab is the only place where someone is actually sitting down, working — a programmer at a desk, lit by a screen, while koi drift in a pond nearby. And The Signal is where the path leads back to you — a lantern, a signpost, and a phone booth waiting for someone to pick up.

Some things only show themselves if you look closely — a lit window in the distance, smoke that thickens at dusk, something that flickers only when the light is right. There are corners of this place that reward patience and curiosity. Not everything announces itself.

You're standing in one of those corners right now.

Type \`help\` to keep exploring, or \`whoami\` to know who built all this.`,
        type: "system",
        animate: "typewriter"
      }]);
    }
  },
];

// ─────────────────────────────────────────────────────────
// COMMAND PARSER (supports multi-word aliases like "sudo hire-me", "ls projects")
// ─────────────────────────────────────────────────────────
export function parseCommand(input: string): { command: CommandDefinition | null; args: string } {
  const trimmed = input.trim();

  // First, try matching multi-word aliases (longest match wins)
  const lowerTrimmed = trimmed.toLowerCase();
  for (const cmd of ORACLE_COMMANDS) {
    for (const alias of cmd.aliases) {
      if (alias.includes(" ") && lowerTrimmed.startsWith(alias)) {
        const remaining = trimmed.slice(alias.length).trim();
        return { command: cmd, args: remaining };
      }
    }
  }

  // Then fall back to single-word match
  const parts = trimmed.split(" ");
  const base = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  const found = ORACLE_COMMANDS.find(c => c.aliases.includes(base));
  return { command: found || null, args };
}
