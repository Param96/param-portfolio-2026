"use client";

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail, Instagram } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import posthog from "posthog-js";

export default function ContactCTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-r from-blue-500/5 via-indigo-500/8 to-violet-500/5 blur-3xl" />
        <div className="grid-bg absolute inset-0 opacity-50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-blue-400 terminal-text mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Open to Opportunities
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight gradient-text mb-6">
            Let&apos;s Build Something Ambitious
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Open to collaborating on AI products, startup ideas, research-driven
            engineering projects, and innovative software systems.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/contact"
              onClick={() => posthog.capture('contact_cta_clicked', { cta_type: 'get_in_touch', source: 'contact_cta_section' })}
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => posthog.capture('contact_cta_clicked', { cta_type: 'download_resume', source: 'contact_cta_section' })}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-slate-300 font-medium hover:bg-white/[0.06] hover:text-white transition-all duration-300"
            >
              View Resume
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="flex items-center justify-center gap-6">
            {[
              { icon: Github, href: "https://github.com/Param96", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/paramp06/", label: "LinkedIn" },
              { icon: Instagram, href: "https://www.instagram.com/param_230/", label: "Instagram" },
              { icon: Mail, href: "mailto:paramppatel100@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="group p-3 rounded-xl glass hover:bg-white/[0.06] transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
