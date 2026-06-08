import { sanityFetch } from "@/sanity/lib/live";
import { groq } from "next-sanity";
import Link from "next/link";
import { ArrowRight, Database, FileText, Settings, LayoutTemplate, Briefcase, FlaskConical, LayoutDashboard, Clock, Activity, Edit3 } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export const revalidate = 0;

export default async function AdminDashboard() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch counts
  const { data: rawStats } = await sanityFetch({
    query: groq`{
      "blogs": count(*[_type == "blog"]),
      "projects": count(*[_type == "project"]),
      "labNotes": count(*[_type == "labNote"]),
      "research": count(*[_type == "research"]),
      "total": count(*[_type in ["blog", "project", "labNote", "research", "page"]])
    }`
  });
  const stats = rawStats as any;

  const { data: rawRecent } = await sanityFetch({
    query: groq`*[_type in ["blog", "project", "labNote", "research", "page"]] | order(_updatedAt desc)[0...5] {
      _id,
      _type,
      title,
      _updatedAt
    }`
  });
  const recentActivity = rawRecent as any;

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
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-12">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#52796F] mb-4 block flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#84A98C] animate-pulse"></span>
              System Status: Online
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
              Welcome back, <span className="font-serif italic text-[#D4A373]">{user.firstName || 'Commander'}</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-[#2F3E46]/30 border border-white/5 rounded-xl px-6 py-4 flex flex-col">
              <span className="text-3xl font-light text-white">{stats.total}</span>
              <span className="text-[10px] uppercase tracking-widest text-[#84A98C]">Total Records</span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/studio/intent/create/template=blog;type=blog" className="flex items-center gap-2 bg-[#D4A373] text-[#111] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#E3B587] transition-colors">
            <Edit3 className="w-4 h-4" /> New Article
          </Link>
          <Link href="/admin/studio/intent/create/template=project;type=project" className="flex items-center gap-2 bg-[#2F3E46] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#354F52] transition-colors border border-white/10">
            <Briefcase className="w-4 h-4" /> New Project
          </Link>
          <Link href="/admin/studio/intent/create/template=labNote;type=labNote" className="flex items-center gap-2 bg-[#2F3E46] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#354F52] transition-colors border border-white/10">
            <FlaskConical className="w-4 h-4" /> New Lab Note
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* MODULE GRID - 2/3 width */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <Link href="/admin/studio/structure/blog" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-6 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <FileText className="w-6 h-6 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                <span className="text-xl font-light text-[#84A98C]">{stats.blogs}</span>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Editorial Hub</h2>
              <p className="text-xs text-[#84A98C] leading-relaxed mb-6 line-clamp-2">Manage blog articles and thought leadership essays.</p>
            </Link>

            <Link href="/admin/studio/structure/project" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-6 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <Briefcase className="w-6 h-6 text-[#84A98C] group-hover:scale-110 transition-transform duration-500" />
                <span className="text-xl font-light text-[#84A98C]">{stats.projects}</span>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Projects</h2>
              <p className="text-xs text-[#84A98C] leading-relaxed mb-6 line-clamp-2">Manage ecosystem projects, tech stacks, and live URLs.</p>
            </Link>

            <Link href="/admin/studio/structure/labNote" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-6 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <FlaskConical className="w-6 h-6 text-[#52796F] group-hover:scale-110 transition-transform duration-500" />
                <span className="text-xl font-light text-[#84A98C]">{stats.labNotes}</span>
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Lab Notes</h2>
              <p className="text-xs text-[#84A98C] leading-relaxed mb-6 line-clamp-2">Raw engineering snapshots and experimental deployments.</p>
            </Link>

            <Link href="/admin/studio/structure/page" className="group relative bg-[#2F3E46]/30 border border-white/5 rounded-2xl p-6 overflow-hidden hover:bg-[#2F3E46]/50 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <LayoutTemplate className="w-6 h-6 text-[#D4A373] group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h2 className="text-xl font-medium text-white mb-2">Dynamic Pages</h2>
              <p className="text-xs text-[#84A98C] leading-relaxed mb-6 line-clamp-2">Build modular sections and adjust layouts visually.</p>
            </Link>
          </div>

          {/* SIDEBAR WIDGETS - 1/3 width */}
          <div className="flex flex-col gap-6">
            
            {/* Recent Activity */}
            <div className="bg-[#2F3E46]/20 border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-[#84A98C]" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/80">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                {recentActivity?.map((item: any) => (
                  <Link key={item._id} href={`/admin/studio/intent/edit/id=${item._id};type=${item._type}`} className="block group">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-white group-hover:text-[#D4A373] transition-colors truncate max-w-[200px]">
                          {item.title || 'Untitled Document'}
                        </p>
                        <p className="text-[10px] text-[#84A98C] uppercase mt-1">{item._type}</p>
                      </div>
                      <span className="text-[10px] text-white/30">
                        {new Date(item._updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Link>
                ))}
                {(!recentActivity || recentActivity.length === 0) && (
                  <p className="text-xs text-[#84A98C]">No recent activity found.</p>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-[#2F3E46]/20 border border-white/5 rounded-2xl p-6">
              <div className="space-y-4">
                <Link href="/admin/studio" className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Database className="w-4 h-4 text-[#84A98C]" />
                    <span className="text-sm text-white group-hover:text-[#D4A373] transition-colors">Raw Database</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-white/30 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="h-px w-full bg-white/5"></div>
                <Link href="/admin/studio/intent/edit/id=settings;type=settings" className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-[#84A98C]" />
                    <span className="text-sm text-white group-hover:text-[#D4A373] transition-colors">Global Parameters</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-white/30 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
