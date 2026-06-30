import React from "react";
import { cn } from "@/lib/utils";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: "moss" | "amber" | "stone";
}

export default function Tag({ className, color = "moss", children, ...props }: TagProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-2 font-inter text-sm text-[var(--text-dim)] tracking-wide",
        className
      )}
      {...props}
    >
      <span 
        className="w-1.5 h-1.5 rounded-full" 
        style={{ 
          backgroundColor: color === "amber" ? "var(--amber)" : 
                          color === "stone" ? "var(--stone-hover)" : "var(--moss)" 
        }} 
      />
      {children}
    </span>
  );
}
