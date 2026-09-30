import Link from "next/link";
import { AtSign, Camera, Music2, Play, Star, Users } from "lucide-react";
import { navItems } from "@/content/navigation";
import { club } from "@/content/club";
import type { SocialLink } from "@/types/content";

const socialIcon: Record<SocialLink["platform"], typeof Star> = {
  instagram: Camera,
  x: AtSign,
  youtube: Play,
  facebook: Users,
  tiktok: Music2,
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background text-foreground">
      <div className="container-site grid gap-10 py-12 md:grid-cols-[1.5fr_1fr] md:py-16">
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide text-foreground uppercase"
          >
            <Star aria-hidden="true" className="size-5 text-primary" />
            Galo
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {club.disclaimer}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <nav aria-label="Navegação do rodapé">
            <h2 className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              Navegação
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={`Redes sociais do ${club.name}`}>
            <h2 className="text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
              Redes sociais
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {club.social.map((social) => {
                const Icon = socialIcon[social.platform];
                return (
                  <li key={social.platform}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.label} do ${club.name}`}
                      className="flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon aria-hidden="true" className="size-4" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {club.name}. Site de torcedor, não oficial.
          </p>
          <p>Fundado em 25 de março de 1908 · Belo Horizonte, MG</p>
        </div>
      </div>
    </footer>
  );
}
