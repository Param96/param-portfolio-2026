import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TimeOfDayTheme = 'day' | 'dawn' | 'dusk' | 'night';
export type QualityTier = 'ultra' | 'high' | 'medium' | 'low';

interface LivingSystemState {
  // Theme & Environment
  timeOfDayTheme: TimeOfDayTheme;
  setTimeOfDayTheme: (theme: TimeOfDayTheme) => void;
  
  // Terminal God Mode
  terminalOpen: boolean;
  toggleTerminal: () => void;
  setTerminalOpen: (isOpen: boolean) => void;

  // Scroll Physics Sync
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Progressive Discovery (Persisted)
  visitCount: number;
  incrementVisitCount: () => void;
  recentlyExploredProject: string | null;
  setRecentlyExploredProject: (projectId: string) => void;

  // Cinematic Engine
  hasSeenCinematic: boolean;
  cinematicPhase: number;
  cinematicProgress: number;
  cinematicActive: boolean;
  sceneLocalTime: number;
  genesisElapsed: number;
  qualityTier: QualityTier;
  startCinematic: () => void;
  setCinematicPhase: (phase: number) => void;
  setCinematicProgress: (progress: number) => void;
  setSceneLocalTime: (time: number) => void;
  setGenesisElapsed: (elapsed: number) => void;
  setQualityTier: (tier: QualityTier) => void;
  setCinematicActive: (active: boolean) => void;
  skipCinematic: () => void;
}

export const useLivingSystemStore = create<LivingSystemState>()(
  persist(
    (set) => ({
      // Theme & Environment
      timeOfDayTheme: 'night', // Default fallback
      setTimeOfDayTheme: (theme) => set({ timeOfDayTheme: theme }),

      // Terminal God Mode
      terminalOpen: false,
      toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
      setTerminalOpen: (isOpen) => set({ terminalOpen: isOpen }),

      // Scroll Physics Sync
      scrollProgress: 0,
      setScrollProgress: (progress) => set({ scrollProgress: progress }),

      // Progressive Discovery
      visitCount: 0,
      incrementVisitCount: () => set((state) => ({ visitCount: state.visitCount + 1 })),
      recentlyExploredProject: null,
      setRecentlyExploredProject: (projectId) => set({ recentlyExploredProject: projectId }),

      // Cinematic Engine
      hasSeenCinematic: false,
      cinematicPhase: 0,
      cinematicProgress: 0,
      cinematicActive: false,
      sceneLocalTime: 0,
      genesisElapsed: 0,
      qualityTier: 'high' as QualityTier,
      startCinematic: () => set({ cinematicPhase: 1, cinematicProgress: 0, cinematicActive: true, hasSeenCinematic: true }),
      setCinematicPhase: (phase) => set({ cinematicPhase: phase }),
      setCinematicProgress: (progress) => set({ cinematicProgress: progress }),
      setSceneLocalTime: (time) => set({ sceneLocalTime: time }),
      setGenesisElapsed: (elapsed) => set({ genesisElapsed: elapsed }),
      setQualityTier: (tier) => set({ qualityTier: tier }),
      setCinematicActive: (active) => set({ cinematicActive: active }),
      skipCinematic: () => set({ cinematicPhase: 8, cinematicProgress: 1, cinematicActive: false, hasSeenCinematic: true }),
    }),
    {
      name: 'living-system-storage',
      // Only persist visitCount, recent project, and cinematic view status
      partialize: (state) => ({ 
        visitCount: state.visitCount,
        recentlyExploredProject: state.recentlyExploredProject,
        hasSeenCinematic: state.hasSeenCinematic
      }),
    }
  )
);
