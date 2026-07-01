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
  title: {
    default: "Param Patel — AI Engineer, Full Stack Developer & Founder",
    template: "%s | Param Patel",
  },
  description:
    "Building Agentic AI Systems, Intelligent Products & Scalable Software. AI/ML Engineer, Full Stack Developer, Research-Oriented Builder, and Founder.",
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
    title: "Param Patel — AI Engineer, Full Stack Developer & Founder",
    description:
      "Building Agentic AI Systems, Intelligent Products & Scalable Software.",
    siteName: "Param Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Param Patel — AI Engineer & Founder",
    description:
      "Building Agentic AI Systems, Intelligent Products & Scalable Software.",
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
        </head>
        <body className="min-h-screen relative font-inter" suppressHydrationWarning>
          <PostHogProvider>
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