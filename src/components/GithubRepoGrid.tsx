"use client";

import { useEffect, useState } from "react";
import { Github, Star, GitFork, ExternalLink, Code2, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import posthog from "posthog-js";

export default function GithubRepoGrid() {
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/github/repos");
        const json = await res.json();
        if (json.success) {
          setRepos(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch repos", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="w-full py-32 flex flex-col items-center justify-center bg-[#1A1A1A]">
        <Terminal className="w-8 h-8 text-[#00FF41] animate-pulse mb-4" />
        <span className="text-[#00FF41] font-mono text-sm tracking-widest uppercase opacity-70">
          Syncing Open Source Repositories...
        </span>
      </div>
    );
  }

  if (repos.length === 0) return null;

  return (
    <section className="relative w-full py-32 bg-[#1A1A1A] text-[#EEEEEE] overflow-hidden border-t border-[#333333]">
      
      {/* Background Matrix Grid Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-0 right-1/3 w-[1px] h-full bg-[#00FF41]" />
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-[#00FF41]" />
        <div className="absolute top-1/4 left-0 w-full h-[1px] bg-[#00FF41]" />
        <div className="absolute top-3/4 left-0 w-full h-[1px] bg-[#00FF41]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <Github className="w-6 h-6 text-[#00FF41]" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-[#00FF41]">
              Open Source Protocol
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#FFFFFF]">
            Public <span className="font-serif italic text-[#888888]">Repositories.</span>
          </h2>
          <p className="mt-4 text-[#888888] max-w-2xl font-inter text-sm">
            Live synchronization with GitHub. Tracking personal experiments, scripts, and open-source contributions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              key={repo.id}
              className="group bg-[#222222] border border-[#333333] rounded-xl p-6 flex flex-col hover:border-[#00FF41]/40 hover:bg-[#252525] transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF41]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#888888] group-hover:text-[#00FF41] transition-colors" />
                  <h3 className="font-semibold text-lg text-[#FFFFFF] truncate max-w-[200px]" title={repo.name}>
                    {repo.name}
                  </h3>
                </div>
                <a 
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => posthog.capture('github_repo_click', { repo: repo.name })}
                  className="text-[#888888] hover:text-[#00FF41] transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              <p className="text-[#AAAAAA] text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
                {repo.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#333333]">
                <div className="flex items-center gap-4 text-xs font-mono text-[#888888]">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00FF41]" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 hover:text-[#EEEEEE] transition-colors">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1 hover:text-[#EEEEEE] transition-colors">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
