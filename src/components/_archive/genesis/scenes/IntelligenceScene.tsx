"use client";

import { useLivingSystemStore } from "@/lib/store";
import RootNetwork from "../systems/RootNetwork";

export default function IntelligenceScene() {
  const { cinematicPhase } = useLivingSystemStore();

  // RootNetwork handles its own visibility based on phase (>= 4)
  if (cinematicPhase < 4) return null;

  return (
    <group>
      <RootNetwork />
    </group>
  );
}
