"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/content/navigation";

// Carregado sob demanda: o painel mobile (Radix Dialog) só é necessário após
// interação do usuário — evita custo de hidratação/JS no carregamento inicial.
const MobileNav = dynamic(
  () => import("@/components/layout/mobile-nav").then((mod) => mod.MobileNav),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="size-9 md:hidden"
      />
    ),
  },
);

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200 ease-out",
        scrolled
          ? "bg-background/95 shadow-[0_1px_0_var(--color-border)] backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide text-foreground uppercase"
        >
          <Star aria-hidden="true" className="size-5 text-primary" />
          Galo
        </Link>

        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative inline-block py-2 text-sm font-medium tracking-wide text-foreground uppercase transition-colors",
                      isActive ? "text-primary" : "hover:text-primary",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-primary transition-transform duration-150 ease-out",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <MobileNav navItems={navItems} />
      </div>
    </header>
  );
}
