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

This site is a living meadow — not a static portfolio. The entire world shifts with a circadian cycle: dawn, day, dusk, night. Sky colors change, lighting warms and cools, emissive glows on windows and lanterns brighten as darkness falls, and smoke from distant chimneys thickens against the evening air. Every 3D scene is built in Three.js with React Three Fiber, rendered in real time.

— The World ————————————————————————————

Home is where the path begins. Open mountains, swaying grass, drifting pollen, and a small hut on the horizon with a pitched roof, a glowing window, and a chimney trailing smoke. It's the quietest page — intentionally restrained.

The Clearing (Projects) is a ring of Standing Stones around an anvil and glowing crystals — monuments to what's been built. Each stone is procedurally weathered geometry. A hut watches from the tree line.

The Ancient Library (Research) is a cluster of broken Ruin Pillars with floating octahedral runes that glow only at dusk and night, a hovering scroll, and a small laboratory structure nested among the ruins — its window flashes green periodically like something is being tested inside.

The Campfire (Blog) burns at the center of the scene. A cabin nearby, warm light. The fire is the storytelling space.

The AI Lab is the only scene with a human figure — a fully rendered programmer sitting at a desk, typing on a laptop, lit by a street lamp. Koi fish drift in a pond. Frogs sit on lily pads. Dust motes float in the light. This is the working space — literal, specific, alive.

The Signal (Contact) has a wooden signpost with a hanging lantern. Moths cluster around it at night. A vintage phone booth stands nearby — red frame, glass panels, a phone unit inside. And a small hut in the distance, watching.

Every scene shares a distant hut — same model, same smoke, same warm glow. A quiet thread connecting every world.

— The Living System ——————————————————————

The site runs on what we call the Living System — a global state engine that tracks the time of day and propagates it everywhere. It's not just a color theme toggle. The sky gradient, ambient light color, emissive intensities on windows and lanterns, particle opacity, smoke density, rune glow, even the koi pond reflections — all of it reacts. You can override it manually: type \`theme night\` right now.

— The Navigation ——————————————————————————

The navbar isn't a standard horizontal menu. It's the Lotus Bloom Nav — a radial, petal-shaped menu that opens from a floating sigil in the corner. Each petal is a page. It was designed to feel like part of the world rather than bolted-on UI. On mobile, it adapts into a clean drawer. The Oracle Root sigil (the button that opened this terminal) pulses with an ambient idle animation and sparks on click.

— The Footer ————————————————————————————

Every page has a unique footer vignette. Not a repeated copyright strip — each one is a hand-crafted scene with its own animal, its own dialogue, its own mood.

Home's footer has an owl perched on a branch: "The roots run deeper than the page." Projects has a fox near scattered tools: "Every system starts with a single commit." Research has a crow on a stack of books: "Not all knowledge is written down." Blog has a rabbit beside a lantern: "Stories grow best in the dark." AI Lab has frogs on a circuit board: "Even machines dream, sometimes." Contact has a deer at the edge of a clearing: "The path here was never accidental."

Each animal is an SVG illustration, hand-positioned, with its own personality.

— Lab Notes ——————————————————————————————

The Lab Notes section lives inside the AI Lab page — not a separate page. It's styled as a wooden corkboard with a visible wood-grain texture, pinned sticky notes, and a push-pin aesthetic. When there are no notes yet, it shows a gentle empty state: "The board is currently empty... check back soon." The sticky notes themselves use the site's handwriting font (Caveat) and slightly rotated angles for that real bulletin-board feel.

— Lab Modules ————————————————————————————

Above Lab Notes sits the Lab Modules grid — the interactive tools. Two are live: the Oracle Root Terminal (you're in it) and the AI Assistant (a full conversational chatbot). The rest show as "Coming Soon" cards with a soft locked-state glow, hinting at what's next without feeling broken.

— The Oracle Root Terminal ——————————————————

This terminal. You're using it. It's a full CLI built into the site — not a gimmick, a real command interface. It has typewriter text rendering, a wilt animation on clear, an organic SVG border that draws itself when summoned, a sidebar with icon shortcuts, Tab autocomplete, and a streaming AI integration. The entire aesthetic shifts with the time of day — dawn is warm amber, day is crisp green-on-cream, dusk is rose, night is cool moss-on-black. It opens with \`~\` or from the floating sigil.

— The AI Assistant ——————————————————————————

The chatbot (accessible via \`ask\` in this terminal, or from the Lab Modules grid) is a conversational AI clone trained on the site's knowledge base. It streams responses in real time, maintains conversation history within the session, and renders Markdown (code blocks, lists, bold, links). It speaks in the site's voice — informed, direct, slightly poetic.

— The Contact Ritual ———————————————————————

The Contact page has a two-part animation sequence. First: the Gravity Apple. There's a hand-drawn tree with an apple hanging from a branch. You fill out the form (name, email, reason — "What brings you here?" with pill-shaped selectors — and your message) then drag a slider to send. When submitted, the apple drops — full physics, bounce, splat. A character appears and delivers a random quip: "Ow. Worth it though — message received!" or "Direct hit. I'll get back to you soon."

Then: the Letter. A modal rises — styled as a real letter on cream paper, serif font, with a close button and a small animated panda-with-bamboo illustration in the corner. The panda gently bobs and blinks, bamboo leaves sway. Pure CSS animation, no JS loop. It thanks the visitor for reaching out and explains the ethos behind the site.

— Hidden Details ———————————————————————————

Some things only show themselves if you look closely. A hut window that's barely visible by day but glows warm at night. Smoke that thickens at dusk. Runes that only light up in darkness. Moths that only appear near lanterns after sunset. A phone booth that waits silently for someone to find it. Koi that drift whether or not anyone's watching.

Not everything announces itself. That's the point.

You're standing in one of those quiet corners right now.

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
