"use client";

import { Share2, Bookmark, Check } from "lucide-react";
import posthog from "posthog-js";
import { useState, useEffect } from "react";

interface BlogArticleActionsProps {
  articleId: string;
  articleTitle: string;
}

export default function BlogArticleActions({ articleId, articleTitle }: BlogArticleActionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bookmarked_articles");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.includes(articleId)) {
        setIsBookmarked(true);
      }
    }
  }, [articleId]);

  const handleShare = async () => {
    posthog.capture("article_shared", {
      article_id: articleId,
      article_title: articleTitle,
    });
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: articleTitle,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleBookmark = () => {
    posthog.capture("article_bookmarked", {
      article_id: articleId,
      article_title: articleTitle,
    });
    
    const saved = localStorage.getItem("bookmarked_articles");
    let parsed: string[] = saved ? JSON.parse(saved) : [];
    
    if (isBookmarked) {
      parsed = parsed.filter(id => id !== articleId);
      setIsBookmarked(false);
    } else {
      parsed.push(articleId);
      setIsBookmarked(true);
    }
    
    localStorage.setItem("bookmarked_articles", JSON.stringify(parsed));
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleShare}
        title="Share article"
        className="w-10 h-10 rounded-full border border-[#2F3E46]/20 flex items-center justify-center text-[#2F3E46]/50 hover:bg-[#2F3E46]/5 hover:text-[#2F3E46] transition-colors"
      >
        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
      </button>
      <button
        onClick={handleBookmark}
        title={isBookmarked ? "Remove bookmark" : "Save for later"}
        className={`w-10 h-10 rounded-full border border-[#2F3E46]/20 flex items-center justify-center transition-colors ${
          isBookmarked 
            ? "bg-[#2F3E46]/10 text-[#2F3E46]" 
            : "text-[#2F3E46]/50 hover:bg-[#2F3E46]/5 hover:text-[#2F3E46]"
        }`}
      >
        <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
