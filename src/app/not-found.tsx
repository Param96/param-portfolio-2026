"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-24 h-32 border border-[var(--border-line)] rounded-t-[4rem] rounded-b-md flex items-center justify-center mb-12">
        <div className="w-2 h-2 rounded-full bg-[var(--stone)]" />
      </div>
      
      <h1 className="text-4xl md:text-5xl font-fraunces text-[var(--text-main)] mb-6">
        Nothing grown here yet.
      </h1>
      
      <p className="text-[var(--text-dim)] font-inter max-w-md mx-auto mb-12">
        This path hasn't been walked or the stones have shifted. 
        Return to the clearing to find your way.
      </p>

      <Button asChild>
        <Link href="/">
          Return to Clearing
        </Link>
      </Button>
    </div>
  );
}
