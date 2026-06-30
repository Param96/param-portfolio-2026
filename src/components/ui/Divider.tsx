import React from "react";
import { cn } from "@/lib/utils";

export default function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("w-full flex justify-center py-12", className)}>
      <svg width="120" height="12" viewBox="0 0 120 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40">
        <path 
          d="M0 6C20 6 20 1 40 1C60 1 60 11 80 11C100 11 100 6 120 6" 
          stroke="var(--moss)" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
      </svg>
    </div>
  );
}
