import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatCard } from "@/components/shared/stat-card";
import { totalByTier, totalTrophies } from "@/lib/trophies";
import type { Trophy } from "@/types/content";

interface TrophyHighlightsProps {
  trophies: Trophy[];
}

export function TrophyHighlights({ trophies }: TrophyHighlightsProps) {
  const total = totalTrophies(trophies);
  const byTier = totalByTier(trophies);

  return (
    <section className="section-light py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Força e tradição"
            title="Uma galeria de conquistas"
            onLight
          />
          <Link
            href="/titulos"
            className="inline-flex items-center gap-1 text-sm font-medium text-fg-on-light underline decoration-primary decoration-2 underline-offset-4 hover:decoration-accent-hover"
          >
            Ver todos os títulos
            <ArrowRight aria-hidden="true" className="size-4 text-primary" />
          </Link>
        </div>

        <Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <StatCard value={String(total)} label="Títulos conquistados" />
            <StatCard value={String(byTier.internacional)} label="Internacionais" />
            <StatCard value={String(byTier.nacional)} label="Nacionais" />
            <StatCard value={String(byTier.estadual)} label="Estaduais" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
