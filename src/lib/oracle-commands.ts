import { HelpCircle, Trash2, Power, Palette, Github, MessageSquare } from "lucide-react";

export type CommandId = "help" | "clear" | "exit" | "theme" | "github" | "ask" | "reboot";

export interface CommandDefinition {
  id: CommandId;
  name: string;
  aliases: string[];
  description: string;
  icon: any; // Lucide icon
  execute: (args: string, context: ExecutionContext) => Promise<void> | void;
}

export interface ExecutionContext {
  setHistory: (updater: (prev: OutputLine[]) => OutputLine[]) => void;
  toggleTerminal: () => void;
  setTimeOfDayTheme: (theme: any) => void;
  triggerReboot: () => void;
  history: OutputLine[];
}

export interface OutputLine {
  id: string;
  text: string;
  type: "system" | "user" | "ai" | "telemetry" | "error" | "ambient";
  animate?: "typewriter" | "countup" | "fade" | "none";
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const ORACLE_COMMANDS: CommandDefinition[] = [
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

  help, man, cmds               Show this list
  clear, cls                    Prune dead output vines (clears terminal)
  exit, quit, close             Close the oracle root terminal
  theme [dawn|day|dusk|night]   Force a specific visual theme
  github, telemetry             Tap telemetry roots (live repo stats)
  ask [msg], query [msg]        Query the neural echo (AI assistant)
  reboot                        Fracture and reload`, 
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
        // Countup formatting is handled by passing raw JSON stringified to let the UI parse it,
        // or we can format it here and let the UI know it's a telemetry block.
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
    execute: (_, { triggerReboot }) => {
      triggerReboot();
    }
  }
];

export function parseCommand(input: string): { command: CommandDefinition | null; args: string } {
  const trimmed = input.trim();
  const parts = trimmed.split(" ");
  const base = parts[0].toLowerCase();
  const args = parts.slice(1).join(" ");

  const found = ORACLE_COMMANDS.find(c => c.aliases.includes(base));
  return { command: found || null, args };
}
