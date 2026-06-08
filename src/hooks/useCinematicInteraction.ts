"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

export function useCinematicInteraction(componentName: string) {
  const hoverStartTime = useRef<number | null>(null);

  const onMouseEnter = () => {
    hoverStartTime.current = Date.now();
    posthog.capture("cinematic_interaction_started", {
      component: componentName,
    });
  };

  const onMouseLeave = () => {
    if (hoverStartTime.current) {
      const duration = (Date.now() - hoverStartTime.current) / 1000;
      posthog.capture("cinematic_interaction_finished", {
        component: componentName,
        hover_duration_seconds: duration,
      });
      hoverStartTime.current = null;
    }
  };

  return {
    onMouseEnter,
    onMouseLeave,
  };
}
