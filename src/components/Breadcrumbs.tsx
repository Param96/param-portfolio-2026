import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  items: Array<{ name: string; href: string }>;
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#84A98C]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-[#52796F] pointer-events-none" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-[#52796F] transition-colors">
                    {item.name}
                  </Link>
                  <ChevronRight className="w-3 h-3 text-[#84A98C]/50" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
