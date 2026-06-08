"use client";

import { useReadershipIntelligence } from "@/hooks/useReadershipIntelligence";

export default function ReadershipTracker({ 
  articleId, 
  articleType 
}: { 
  articleId: string; 
  articleType: "blog" | "research" | "lab-note"; 
}) {
  useReadershipIntelligence(articleId, articleType);
  return null;
}
