import type { NavItem } from "@/types/content";

export const navItems = [
  { label: "Início", href: "/" },
  { label: "História", href: "/historia" },
  { label: "Títulos", href: "/titulos" },
  { label: "Estádio", href: "/estadio" },
  { label: "Elenco", href: "/elenco" },
  { label: "Quiz", href: "/quiz" },
] satisfies NavItem[];
