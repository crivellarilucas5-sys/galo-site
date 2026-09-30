"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Star } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/content";
import { useState } from "react";

interface MobileNavProps {
  navItems: NavItem[];
}

export function MobileNav({ navItems }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          className="text-foreground hover:bg-white/10 hover:text-foreground md:hidden"
        >
          <Menu aria-hidden="true" className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        id="mobile-nav-panel"
        side="right"
        className="w-full border-border bg-background/98 text-foreground sm:max-w-sm"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-display uppercase">
            <Star aria-hidden="true" className="size-5 text-primary" />
            Galo
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Navegação principal" className="px-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-md px-3 py-3 text-lg font-medium",
                        isActive
                          ? "text-primary"
                          : "text-foreground hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
