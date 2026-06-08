"use client";

import { useEffect, useRef } from "react";
import posthog from "posthog-js";

export function useReadershipIntelligence(articleId: string, articleType: "blog" | "research" | "lab-note") {
  const startTime = useRef(Date.now());
  const maxScroll = useRef(0);
  const reportedDepths = useRef(new Set<number>());

  useEffect(() => {
    startTime.current = Date.now();
    maxScroll.current = 0;
    reportedDepths.current.clear();

    const handleScroll = () => {
      // Calculate scroll percentage
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;

      if (scrollPercent > maxScroll.current) {
        maxScroll.current = scrollPercent;
      }

      // Report thresholds
      const thresholds = [25, 50, 75, 90, 100];
      for (const threshold of thresholds) {
        if (maxScroll.current >= threshold && !reportedDepths.current.has(threshold)) {
          reportedDepths.current.add(threshold);
          posthog.capture("article_scroll_depth", {
            article_id: articleId,
            article_type: articleType,
            depth: threshold,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Report time spent reading
      const durationSeconds = (Date.now() - startTime.current) / 1000;
      posthog.capture("article_reading_finished", {
        article_id: articleId,
        article_type: articleType,
        duration_seconds: durationSeconds,
        max_scroll_depth: Math.round(maxScroll.current),
      });
    };
  }, [articleId, articleType]);
}
