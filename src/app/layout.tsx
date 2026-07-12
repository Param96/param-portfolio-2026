import type { Metadata } from "next";
import { Fraunces, Inter, Caveat } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";
import LivingSystemProvider from "@/components/global/LivingSystemProvider";
import OracleRootTerminal from "@/components/ui/OracleRootTerminal";
import ConnectedOracleRootTrigger from "@/components/ui/OracleRootTrigger";
import LivingSystemStatus from "@/components/ui/LivingSystemStatus";
import SynestheticAudio from "@/components/global/SynestheticAudio";
import { SITE_URL, PERSON_JSONLD, PROFILE_PAGE_JSONLD } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Param Patel \u2014 AI/ML Engineer, Full Stack Engineer & Builder",
    template: "%s | Param Patel",
  },
  description:
    "Param Patel is an AI/ML Engineer, Full Stack Engineer, and Builder from India \u2014 creating agentic AI systems, intelligent products, and scalable software.",
  keywords: [
    "Param Patel",
    "AI Engineer",
    "Machine Learning Engineer",
    "ML Engineer",
    "Full Stack Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "AI Researcher",
    "Agentic AI",
    "Artificial Intelligence",
    "Machine Learning",
    "Intelligent Systems",
    "Deep Learning",
    "Startup Founder",
    "Builder",
    "India",
    "Next.js",
    "React",
    "Python",
  ],
  authors: [{ name: "Param Patel", url: SITE_URL }],
  creator: "Param Patel",
  publisher: "Param Patel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Param Patel \u2014 AI/ML Engineer, Full Stack Engineer & Builder",
    description:
      "Building agentic AI systems, intelligent products, and scalable software. AI/ML Engineer, Full Stack Engineer, and Builder from India.",
    siteName: "Param Patel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Param Patel \u2014 AI/ML Engineer, Full Stack Engineer & Builder",
    description:
      "Building agentic AI systems, intelligent products, and scalable software.",
    creator: "@param_230",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
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
                __html: JSON.stringify([
                  PERSON_JSONLD,
                  PROFILE_PAGE_JSONLD,
                ])
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