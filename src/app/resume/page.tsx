import ResumeHero from "@/components/hero/meadow/ResumeHero";

export const metadata = {
  title: "Resume | Param Patel",
  description: "My professional journey, milestones, and experience.",
};

export default function ResumePage() {
  return (
    <main className="w-full min-h-screen relative bg-[var(--bg-main)] text-[var(--text-primary)]">
      <ResumeHero />

      {/* Main Resume Content Container */}
      <div className="relative w-full overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 py-24 space-y-32 relative z-10">
        {/* The Manifesto */}
        <section className="space-y-8 pb-12 border-b border-[var(--text-primary)]/10">
          <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest text-[var(--text-primary)]">
            Beyond the <span className="text-[var(--accent-primary)]">Resume</span>
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none text-[var(--text-secondary)] leading-relaxed space-y-6">
            <p>
              A resume tells you what I’ve built. It doesn’t explain how I think.
            </p>
            <p>
              I’m driven by curiosity and a builder’s mindset. I enjoy turning ambitious ideas into working products by combining artificial intelligence, software engineering, and scalable systems. I believe the best way to learn is to build, iterate quickly, and solve real problems.
            </p>
            <p>
              I enjoy shipping fast—not by cutting corners, but by validating ideas early, learning from feedback, and continuously improving. Alongside product development, I’m deeply interested in AI research, intelligent systems, and startups that push technology forward and create meaningful impact.
            </p>
            <p>
              My work spans machine learning, full-stack development, backend infrastructure, developer tools, and AI-powered applications. Whether I’m experimenting with a new research concept, building a prototype over a weekend, or engineering a production-ready system, I approach every project with the same goal: build thoughtfully, learn continuously, and create technology that matters.
            </p>
            <p>
              This page goes beyond a traditional resume. It’s an interactive ecosystem of my skills, projects, technologies, and the ideas that continue to shape my journey as an engineer and aspiring founder.
            </p>
          </div>
        </section>


        {/* The Director's Cut Timeline */}
        <section className="space-y-12">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold uppercase tracking-widest text-[var(--accent-secondary)]">The Director's Cut</h3>
            <p className="text-[var(--text-secondary)]">The lessons and pivotal moments behind the job titles.</p>
          </div>

          <div className="space-y-16 relative before:absolute before:inset-0 before:ml-[1.125rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-3 before:bg-[#10b981] before:shadow-[0_0_15px_rgba(16,185,129,0.5)] before:rounded-full before:z-0">
            
            {/* Milestone 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Vine Orb & Leaf */}
              <div className="absolute left-[1.125rem] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#10b981] bg-[#60a5fa] shadow-[0_0_20px_5px_rgba(96,165,250,0.7)] z-10 shrink-0">
                <svg className="absolute -left-6 -top-2 w-8 h-8 text-[#10b981] drop-shadow-md" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 80 100 Q 20 90 20 50 Q 20 10 80 20 Q 90 50 80 100 Z" />
                </svg>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg relative z-10">
                {/* Horizontal Connector Vine */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-2 bg-[#10b981] z-[-1] group-odd:-left-12 group-even:-right-12"></div>
                
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-[var(--text-primary)] text-lg">CERT-IN Verification</div>
                  <time className="font-mono text-xs text-[var(--accent-secondary)]">The Challenge</time>
                </div>
                <div className="text-[var(--text-secondary)] leading-relaxed mt-2 text-sm">
                  <strong>The Reality:</strong> Structuring chaotic, unstructured global educational resources isn't just about parsing JSON. It taught me how to handle edge cases at scale and build verification engines that don't confidently hallucinate.
                </div>
              </div>
            </div>

            {/* Milestone 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Vine Orb & Leaf */}
              <div className="absolute left-[1.125rem] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#10b981] bg-[#ffdb70] shadow-[0_0_20px_5px_rgba(255,219,112,0.7)] z-10 shrink-0">
                <svg className="absolute -right-6 top-4 w-8 h-8 text-[#10b981] drop-shadow-md scale-x-[-1]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 80 100 Q 20 90 20 50 Q 20 10 80 20 Q 90 50 80 100 Z" />
                </svg>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg relative z-10">
                {/* Horizontal Connector Vine */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-2 bg-[#10b981] z-[-1] group-odd:-left-12 group-even:-right-12"></div>
                
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-[var(--text-primary)] text-lg">Building Jarvis</div>
                  <time className="font-mono text-xs text-[var(--accent-primary)]">The Pivot</time>
                </div>
                <div className="text-[var(--text-secondary)] leading-relaxed mt-2 text-sm">
                  <strong>The Lesson:</strong> I started by building a basic chatbot. I quickly realized that chatbots are a UI paradigm, not an architectural one. I pivoted to building an orchestration engine where agents could hand off tasks. It changed how I view software entirely.
                </div>
              </div>
            </div>

            {/* Milestone 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Vine Orb & Leaf */}
              <div className="absolute left-[1.125rem] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#10b981] bg-[#ff7eb3] shadow-[0_0_20px_5px_rgba(255,126,179,0.7)] z-10 shrink-0">
                <svg className="absolute -left-6 -top-2 w-8 h-8 text-[#10b981] drop-shadow-md" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 80 100 Q 20 90 20 50 Q 20 10 80 20 Q 90 50 80 100 Z" />
                </svg>
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] shadow-lg relative z-10">
                {/* Horizontal Connector Vine */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-12 h-2 bg-[#10b981] z-[-1] group-odd:-left-12 group-even:-right-12"></div>
                
                <div className="flex items-center justify-between space-x-2 mb-1">
                  <div className="font-bold text-[var(--text-primary)] text-lg">Entrepreneurship Cell</div>
                  <time className="font-mono text-xs text-[var(--text-secondary)]">The Foundation</time>
                </div>
                <div className="text-[var(--text-secondary)] leading-relaxed mt-2 text-sm">
                  <strong>The Takeaway:</strong> Scaling a 30-member execution team taught me that the hardest systems to orchestrate aren't code—they're people. Good architecture requires good communication.
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
      </div>
    </main>
  );
}
