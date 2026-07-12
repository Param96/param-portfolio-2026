import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Collaborate on AI & Engineering",
  description:
    "Get in touch with Param Patel for AI engineering collaborations, startup MVP development, agentic AI projects, and experimental systems.",
  alternates: {
    canonical: "https://www.parampatel.in/contact",
  },
  openGraph: {
    title: "Contact — Collaborate on AI & Engineering | Param Patel",
    description:
      "Get in touch with Param Patel for AI engineering collaborations, startup MVP development, and experimental systems.",
    url: "https://www.parampatel.in/contact",
  },
  twitter: {
    title: "Contact — Collaborate on AI & Engineering | Param Patel",
    description:
      "Get in touch for AI engineering collaborations and startup MVP development.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Param Patel",
    description:
      "Get in touch with Param Patel for AI engineering collaborations, startup MVP development, and experimental systems.",
    url: "https://www.parampatel.in/contact",
    mainEntity: {
      "@type": "Person",
      "@id": "https://www.parampatel.in/#person",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      {children}
    </>
  );
}
