import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";
import LivingSystemProvider from "@/components/global/LivingSystemProvider";
import OracleRootTerminal from "@/components/ui/OracleRootTerminal";
import ConnectedOracleRootTrigger from "@/components/ui/OracleRootTrigger";
import LivingSystemStatus from "@/components/ui/LivingSystemStatus";
import SynestheticAudio from "@/components/global/SynestheticAudio";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://parampatel.in'),
  title: {
    default: "Param Patel — AI/ML Engineer, Full Stack Engineer, Builder & Aspiring Researcher",
    template: "%s | Param Patel",
  },
  description:
    "Building Agentic AI Systems, Intelligent Products & Scalable Software. AI/ML Engineer, Full Stack Engineer, Builder, and Aspiring Researcher.",
  keywords: [
    "Param Patel",
    "AI Engineer",
    "ML Engineer",
    "Full Stack Developer",
    "Agentic AI",
    "Machine Learning",
    "Next.js",
    "React",
    "Python",
    "Deep Learning",
    "Startup Founder",
  ],
  authors: [{ name: "Param Patel" }],
  creator: "Param Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Param Patel — AI/ML Engineer, Full Stack Engineer, Builder & Aspiring Researcher",
    description:
      "Building Agentic AI Systems, Intelligent Products & Scalable Software.",
    siteName: "Param Patel",
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: "Param Patel - AI/ML Engineer, Full Stack Engineer, Builder & Aspiring Researcher" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Param Patel — AI/ML Engineer, Full Stack Engineer, Builder & Aspiring Researcher",
    description:
      "Building Agentic AI Systems, Intelligent Products & Scalable Software.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ClerkProvider } from "@clerk/nextjs";
import { VisualEditing } from "next-sanity/visual-editing";
import { SanityLive } from "@/sanity/lib/live";
import { draftMode } from "next/headers";
import { PostHogProvider } from "@/providers/PostHogProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode();
  const isEnabled = draft.isEnabled;
  return (
    <ClerkProvider>
      <html lang="en" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`} suppressHydrationWarning>
        <head>
          {/* Fonts loaded via next/font/google */}
          <GoogleAnalytics />
        </head>
        <body className="min-h-screen relative font-inter" suppressHydrationWarning>
          <PostHogProvider>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Person",
                  name: "Param Patel",
                  url: "https://parampatel.in",
                  jobTitle: "AI/ML Engineer, Full Stack Engineer, Builder & Aspiring Researcher",
                  sameAs: [
                    "https://github.com/Param96",
                    "https://www.linkedin.com/in/paramp06/",
                    "https://www.instagram.com/param_230/"
                  ],
                  knowsAbout: ["Machine Learning", "Full Stack Development", "AI/ML Engineering", "Agentic AI Systems"]
                })
              }}
            />
            <LivingSystemProvider />
            <OracleRootTerminal />
            <ConnectedOracleRootTrigger />
            <LivingSystemStatus />
            <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
            {isEnabled && (
              <>
                <VisualEditing />
                <SanityLive />
              </>
            )}
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}