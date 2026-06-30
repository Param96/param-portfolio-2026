import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  liveMarker?: "moss" | "amber" | "none";
}

export default function Card({ 
  className, 
  children,
  liveMarker = "none",
  ...props 
}: CardProps) {
  return (
    <div 
      className={cn(
        "relative p-6 sm:p-8 bg-[var(--bg-surface)] border border-[var(--border-line)]",
        "rounded-tl-2xl rounded-tr-lg rounded-br-2xl rounded-bl-md",
        "hover:-translate-y-1 hover:border-[var(--amber-deep)]",
        "transition-all duration-1000 ease-[var(--ease-organic)]",
        className
      )}
      {...props}
    >
      {liveMarker !== "none" && (
        <div className="absolute top-6 left-0 w-1 h-8 rounded-r-md" 
             style={{ backgroundColor: liveMarker === "amber" ? "var(--amber)" : "var(--moss)" }} />
      )}
      {children}
    </div>
  );
}
