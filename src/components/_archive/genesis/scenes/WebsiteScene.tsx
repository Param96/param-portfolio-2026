"use client";

import { useLivingSystemStore } from "@/lib/store";

export default function WebsiteScene() {
  const { cinematicPhase } = useLivingSystemStore();

  // In this scene, the 3D world fades or settles into the background 
  // as the 2D UI becomes fully opaque. The camera should be at its final position.
  // The actual UI rendering is handled by the regular Next.js page components,
  // this just ensures the 3D scene is in the correct state.

  if (cinematicPhase < 7) return null;

  return (
    <group>
      {/* Any final 3D flourishes before full UI control */}
    </group>
  );
}
