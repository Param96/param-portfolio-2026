import React from "react";
import { cn } from "@/lib/utils";

export default function LoadingState({ className, text = "Growing..." }: { className?: string, text?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4 py-12", className)}>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-6 h-6 bg-[var(--amber)] rounded-full animate-ping opacity-20" />
        <div className="w-2 h-2 bg-[var(--amber)] rounded-full" />
      </div>
      <span className="font-inter text-sm tracking-widest uppercase text-[var(--text-dim)]">
        {text}
      </span>
    </div>
  );
}
