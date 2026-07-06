import React from "react";

export function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {/* Icon */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="100" height="100" rx="22" fill="#2b2b2a" />
        <line x1="15" y1="80" x2="85" y2="80" stroke="#6b6b6b" strokeWidth="1.5" />
        <polygon points="26,80 30,36 38,80" fill="#f4f0eb" />
        <polygon points="38,80 46,26 56,80" fill="#e4adae" />
        <polygon points="56,80 63,45 74,80" fill="#c47a82" />
        <circle cx="78" cy="28" r="6.5" fill="#f4f0eb" />
      </svg>

      {/* Text */}
      <div className="flex flex-col justify-center -space-y-0.5">
        <span
          className={`font-serif text-xl font-bold tracking-tight transition-colors duration-500 ${
            scrolled ? "text-[#FEFAE0]" : "text-[#2b2b2a]"
          }`}
        >
          Param Patel
        </span>
        <span
          className={`font-serif text-[10px] tracking-wide transition-colors duration-500 ${
            scrolled ? "text-[#e4adae]" : "text-[#c47a82]"
          }`}
        >
          meadow &middot; code &middot; philosophy
        </span>
      </div>
    </div>
  );
}
