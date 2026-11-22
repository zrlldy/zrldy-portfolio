// Single source for the header, command palette, and terminal.
export const destinations = [
  { label: "Home", href: "/", key: "home" },
  { label: "Selected work", href: "/#work", key: "work" },
  { label: "Experience", href: "/#experience", key: "experience" },
  { label: "Skills", href: "/#skills", key: "skills" },
  { label: "Creative", href: "/#creative", key: "creative" },
  { label: "Education", href: "/#education", key: "education" },
  { label: "Contact", href: "/#contact", key: "contact" },
  { label: "About (page)", href: "/about", key: "about" },
  { label: "All projects (page)", href: "/projects", key: "projects" },
  { label: "Creative work (page)", href: "/creative", key: "gallery" },
] as const;

export const headerLinks = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Creative", href: "/creative" },
  { label: "Contact", href: "/#contact" },
];
