import React from "react";
import { cn } from "@/lib/utils";

export default function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full bg-transparent border-b border-[var(--border-line)] py-3",
        "font-inter text-[var(--text-main)] placeholder:text-[var(--text-dim)]",
        "focus:outline-none focus:border-[var(--amber)] focus:shadow-[0_4px_12px_-4px_rgba(217,140,95,0.1)]",
        "transition-all duration-700 ease-[var(--ease-organic)]",
        className
      )}
      {...props}
    />
  );
}
