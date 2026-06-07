import { Github, Linkedin, Mail, Instagram } from "lucide-react";

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/Param96",
    icon: Github,
    handle: "@Param96",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/paramp06/",
    icon: Linkedin,
    handle: "Param Patel",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/param_230/",
    icon: Instagram,
    handle: "@param_230",
  },
  {
    name: "Email",
    url: "mailto:paramppatel100@gmail.com",
    icon: Mail,
    handle: "paramppatel100@gmail.com",
  },
] as const;
