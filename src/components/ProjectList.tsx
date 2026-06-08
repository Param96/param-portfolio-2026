"use client";

import { motion } from "framer-motion";
import posthog from "posthog-js";

export default function ProjectList({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="w-full text-center text-[#52796F] text-xl py-32">
        No projects uploaded yet.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 flex flex-col gap-32 pb-40">
      {projects.map((project, i) => {
        const isEven = i % 2 === 0;
        
        return (
          <motion.div 
            key={project._id || i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Image Side */}
            <div className={`relative h-[500px] w-full ${project.atmosphere || 'bg-[#FAEDCD]'} overflow-hidden flex items-center justify-center border border-[#354F52]/5 shadow-2xl ${isEven ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}`}>
              <div className={`absolute inset-0 bg-gradient-to-tr ${isEven ? 'from-[#84A98C]/10' : 'from-[#D4A373]/10'} to-transparent`} />
              {project.coverImageUrl ? (
                <img src={project.coverImageUrl} alt={project.title} className="w-full h-full object-cover mix-blend-multiply" />
              ) : (
                <span className="font-jetbrains text-[#52796F]/50 tracking-widest text-sm uppercase">ARCH_{i+1}_{project.title.replace(/\s+/g, '_')}</span>
              )}
            </div>

            {/* Content Side */}
            <div className={isEven ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}>
              <span className={`text-[10px] uppercase tracking-widest ${isEven ? 'text-[#D4A373]' : 'text-[#84A98C]'} mb-4 block`}>ACTIVE</span>
              <h2 className="text-4xl font-medium text-[#2F3E46] mb-6">{project.title}</h2>
              <div className="prose prose-p:text-[#354F52] prose-p:leading-relaxed">
                <p>{project.description || "No description provided."}</p>
              </div>
              <div className="mt-8 flex gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => posthog.capture('project_link_clicked', { project_id: project._id, project_name: project.title, link_type: 'github' })}
                    className="px-4 py-2 border border-[#2F3E46]/10 text-xs uppercase tracking-widest text-[#52796F] hover:bg-[#52796F] hover:text-white transition-colors duration-300"
                  >GitHub</a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => posthog.capture('project_link_clicked', { project_id: project._id, project_name: project.title, link_type: 'demo' })}
                    className="px-4 py-2 border border-[#2F3E46]/10 text-xs uppercase tracking-widest text-[#52796F] hover:bg-[#52796F] hover:text-white transition-colors duration-300"
                  >Live Demo</a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
