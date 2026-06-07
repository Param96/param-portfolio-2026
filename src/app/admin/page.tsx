"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Database, FileText, Settings, LayoutTemplate, Briefcase, FlaskConical, LayoutDashboard } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">Initializing...</div>;

  return (
    <div className="min-h-screen bg-[#1A1F22] text-[#E0E0E0] font-sans selection:bg-[#D4A373] selection:text-[#111]">
      
      {/* ── TOP NAV ── */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#1A1F22]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="w-5 h-5 text-[#D4A373]" />
            <span className="text-sm font-bold tracking-widest uppercase text-white/90">Command Center</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xs font-bold uppercase tracking-widest text-[#84A98C] hover:text-[#D4A373] transition-colors">
              Exit to Live Site
            </Link>
            <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8 rounded-md" } }} />
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#52796F] mb-4 block">
            System Status: Online
          </span>
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-6">
            Welcome back, <span className="font-serif italic text-[#D4A373]">{user?.firstName || 'Commander'}</span>
          </h1>
          <p className="text-lg text-[#84A98C] max-w-2xl leading-relaxed">
            This is your private operating system. Manage dynamic environments, orchestrate content, and adjust the global atmospheric settings of the portfolio.
          </p>
        </motion.div>

        {/* ── MODULE GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Studio Link */}
          <Link href="/admin/studio" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A373]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Database className="w-8 h-8 text-[#D4A373] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-2xl font-medium text-white mb-3 tracking-tight">Raw Database</h2>
            <p className="text-sm text-[#84A98C] leading-relaxed mb-8">Access the embedded Sanity Studio to modify schemas, manage assets, and view raw JSON structures.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D4A373]">
              Launch Studio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Pages */}
          <Link href="/admin/studio" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#52796F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <LayoutTemplate className="w-8 h-8 text-[#52796F] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-2xl font-medium text-white mb-3 tracking-tight">Dynamic Pages</h2>
            <p className="text-sm text-[#84A98C] leading-relaxed mb-8">Build and reorder modular sections, adjust atmospheres, and preview real-time changes to the live site.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#52796F]">
              Edit Modules <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Projects */}
          <Link href="/admin/studio" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#84A98C]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Briefcase className="w-8 h-8 text-[#84A98C] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-2xl font-medium text-white mb-3 tracking-tight">Ecosystem Projects</h2>
            <p className="text-sm text-[#84A98C] leading-relaxed mb-8">Manage architectural diagrams, GitHub connections, live URLs, and visual case studies.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#84A98C]">
              Manage Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Blog / Articles */}
          <Link href="/admin/studio/intent/create/type=blog" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <FileText className="w-8 h-8 text-white/80 mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-2xl font-medium text-white mb-3 tracking-tight">Editorial Hub</h2>
            <p className="text-sm text-[#84A98C] leading-relaxed mb-8">Premium writing environment for essays and thought leadership. AI-assisted summaries included.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80">
              Draft Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Lab Notes */}
          <Link href="/admin/studio/intent/create/type=labNote" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-[#354F52]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <FlaskConical className="w-8 h-8 text-[#52796F] mb-6 group-hover:scale-110 transition-transform duration-500" />
            <h2 className="text-2xl font-medium text-white mb-3 tracking-tight">Lab Notes</h2>
            <p className="text-sm text-[#84A98C] leading-relaxed mb-8">Raw engineering snapshots, architecture logic, code snippets, and WIP experimental deployments.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#52796F]">
              Add Snapshot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Settings */}
          <Link href="/admin/studio" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-8 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Settings className="w-8 h-8 text-gray-400 mb-6 group-hover:rotate-90 transition-transform duration-700" />
            <h2 className="text-2xl font-medium text-white mb-3 tracking-tight">Global Parameters</h2>
            <p className="text-sm text-[#84A98C] leading-relaxed mb-8">Manage site-wide SEO metadata, default Open Graph images, and global animation intensity limits.</p>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
              Configure System <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
