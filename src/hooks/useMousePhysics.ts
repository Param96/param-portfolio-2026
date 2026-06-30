import { create } from 'zustand';

interface MousePhysicsState {
  // Global normalized mouse position (-1 to 1)
  mouse: { x: number; y: number };
  // Smoothed target position for physics-based lerping
  target: { x: number; y: number };
  // Function to instantly update the raw mouse position
  setMouse: (x: number, y: number) => void;
  // Function to update the smoothed target (typically called every frame)
  setTarget: (x: number, y: number) => void;
}

export const useMousePhysics = create<MousePhysicsState>((set) => ({
  mouse: { x: 0, y: 0 },
  target: { x: 0, y: 0 },
  setMouse: (x, y) => set({ mouse: { x, y } }),
  setTarget: (x, y) => set({ target: { x, y } }),
}));
