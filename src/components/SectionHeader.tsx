import { ReactNode } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  gradient = true,
  className = "",
  align = "left",
  children,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : ""} ${className}`}>
      <div
        className={`flex items-center gap-3 mb-4 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <div className="h-px w-8 bg-gradient-to-r from-blue-500 to-indigo-500" />
        <span className="text-sm font-medium tracking-[0.2em] uppercase text-blue-400 terminal-text">
          {label}
        </span>
        <div className="h-px w-8 bg-gradient-to-r from-indigo-500 to-transparent" />
      </div>
      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight ${
          gradient ? "gradient-text" : "text-white"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
