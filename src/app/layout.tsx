import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const draft = await draftMode();
  const isEnabled = draft.isEnabled;
  return (
    <ClerkProvider>
      <html lang="en" className={`${jetbrainsMono.variable}`}>
        <head>
          <link href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,300,400&display=swap" rel="stylesheet" />
        </head>
        <body className="min-h-screen relative font-satoshi">
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
          {isEnabled && <VisualEditing />}
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}