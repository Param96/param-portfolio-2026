"use client";

import { Share2, Bookmark } from "lucide-react";
import posthog from "posthog-js";

interface BlogArticleActionsProps {
  articleId: string;
  articleTitle: string;
}

export default function BlogArticleActions({ articleId, articleTitle }: BlogArticleActionsProps) {
  const handleShare = () => {
    posthog.capture("article_shared", {
      article_id: articleId,
      article_title: articleTitle,
    });
  };

  const handleBookmark = () => {
    posthog.capture("article_bookmarked", {
      article_id: articleId,
      article_title: articleTitle,
    });
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleShare}
        className="w-10 h-10 rounded-full border border-[#2F3E46]/20 flex items-center justify-center text-[#2F3E46]/50 hover:bg-[#2F3E46]/5 hover:text-[#2F3E46] transition-colors"
      >
        <Share2 className="w-4 h-4" />
      </button>
      <button
        onClick={handleBookmark}
        className="w-10 h-10 rounded-full border border-[#2F3E46]/20 flex items-center justify-center text-[#2F3E46]/50 hover:bg-[#2F3E46]/5 hover:text-[#2F3E46] transition-colors"
      >
        <Bookmark className="w-4 h-4" />
      </button>
    </div>
  );
}
