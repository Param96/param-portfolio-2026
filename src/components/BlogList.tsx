"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import posthog from "posthog-js";

export default function BlogList({ articles }: { articles: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

  const filteredArticles = activeCategory === "All" 
    ? articles 
    : articles.filter(a => a.category === activeCategory);

  return (
    <div className="w-full px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-40">
      
      {/* Filters */}
      <div className="max-w-[1400px] mx-auto mb-16 flex flex-wrap justify-center gap-4 items-center">
        {categories.map((cat: any) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              posthog.capture('blog_category_filtered', { category: cat });
            }}
            className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-colors ${
              activeCategory === cat
                ? "bg-[#2F3E46] text-[#FEFAE0]"
                : "bg-[#2F3E46]/5 text-[#2F3E46] hover:bg-[#2F3E46]/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto border-t border-[#2F3E46]/10">
        {(!filteredArticles || filteredArticles.length === 0) && (
          <div className="py-20 text-center text-[#52796F] text-xl">
            No articles found for this category.
          </div>
        )}

        {filteredArticles.map((article, i) => {
          // Format date safely
          const dateStr = article.publishedAt 
            ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : "Draft";

          return (
            <motion.div 
              key={article._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer block border-b border-[#2F3E46]/10 hover:bg-[#F8F9FA] transition-colors duration-500"
            >
              <Link
                href={`/blog/${article.slug || ""}`}
                onClick={() => posthog.capture('blog_article_clicked', {
                  article_id: article._id,
                  article_title: article.title,
                  article_category: article.category,
                  article_slug: article.slug,
                })}
                className="flex flex-col md:flex-row items-start md:items-center py-12 md:py-16 px-4 md:px-8 gap-8 md:gap-16 w-full"
              >
                
                {/* Meta Column */}
                <div className="w-full md:w-[200px] flex md:flex-col items-center md:items-start justify-between md:justify-start gap-2 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#84A98C]">
                    {article.category || "Uncategorized"}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2F3E46]/40">
                    {dateStr}
                  </span>
                </div>

                {/* Title & Description Column */}
                <div className="flex-1 flex flex-col gap-4">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-[#2F3E46] group-hover:text-[#52796F] group-hover:translate-x-4 transition-all duration-500">
                    {article.title}
                  </h2>
                  <p className="text-[#52796F] text-lg font-medium max-w-2xl opacity-0 h-0 overflow-hidden group-hover:opacity-100 group-hover:h-auto group-hover:mt-2 transition-all duration-500">
                    {article.summary || "No summary provided."}
                  </p>
                </div>

                {/* Action Column */}
                <div className="hidden md:flex items-center justify-end w-20 shrink-0">
                  <div className="w-12 h-12 rounded-full border border-[#2F3E46]/10 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-[#84A98C] group-hover:bg-[#84A98C] group-hover:text-white transition-all duration-500">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>

              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
