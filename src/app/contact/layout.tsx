import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch for startup collaborations, MVP development, and experimental engineering.",
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: "Contact | Param Patel",
    description: "Get in touch for startup collaborations, MVP development, and experimental engineering.",
    url: "/contact",
  },
  twitter: {
    title: "Contact | Param Patel",
    description: "Get in touch for startup collaborations, MVP development, and experimental engineering.",
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Param Patel",
    "description": "Get in touch for startup collaborations, MVP development, and experimental engineering.",
    "url": "https://parampatel.in/contact",
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
