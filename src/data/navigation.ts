export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Research", href: "/research" },
  { label: "Blog", href: "/blog" },
  { label: "AI Lab", href: "/ai-lab" },
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
    { label: "AI Lab", href: "/ai-lab" },
    { label: "Contact", href: "/contact" },
  ],
} as const;
