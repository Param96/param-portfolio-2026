import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "filled" | "outline";
  href?: string;
  asChild?: boolean;
}

export default function Button({ 
  className, 
  variant = "primary", 
  children,
  ...props 
}: ButtonProps) {
  
  if (variant === "filled") {
    return (
      <button 
        className={cn(
          "px-6 py-3 rounded-2xl bg-gradient-to-br from-[var(--amber)] to-[var(--amber-deep)]",
          "text-[var(--cream)] font-inter font-medium tracking-wide",
          "shadow-inner shadow-[rgba(255,255,255,0.2)]",
          "hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-700 ease-[var(--ease-organic)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Primary: text + arrow + growing underline
  return (
    <button 
      className={cn(
        "group relative inline-flex items-center gap-2 font-inter font-medium",
        "text-[var(--text-main)] hover:text-[var(--amber)] transition-colors duration-700 ease-[var(--ease-organic)]",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:translate-x-1" />
      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[var(--amber)] transition-all duration-700 ease-[var(--ease-organic)] group-hover:w-full" />
    </button>
  );
}
