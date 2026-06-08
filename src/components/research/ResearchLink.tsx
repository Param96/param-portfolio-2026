"use client";

import Link from "next/link";
import posthog from "posthog-js";
import { ReactNode } from "react";

export function ResearchLink({
  href,
  research_id,
  research_title,
  research_slug,
  className,
  children,
}: {
  href: string;
  research_id: string;
  research_title: string;
  research_slug: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() =>
        posthog.capture("research_item_clicked", {
          research_id,
          research_title,
          research_slug,
        })
      }
    >
      {children}
    </Link>
  );
}
