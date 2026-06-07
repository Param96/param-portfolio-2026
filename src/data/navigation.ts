export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "Lab Notes", href: "/lab-notes" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks = {
  main: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Research", href: "/research" },
    { label: "Blog", href: "/blog" },
  ],
  secondary: [
    { label: "Resume", href: "/resume" },
    { label: "Lab Notes", href: "/lab-notes" },
    { label: "AI Lab", href: "/ai-lab" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
