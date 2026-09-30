import type { Metadata } from "next";
import { TrophyGrid } from "@/components/sections/trophy-grid";
import { StatCard } from "@/components/shared/stat-card";
import { Reveal } from "@/components/shared/reveal";
import { trophies } from "@/content/trophies";
import { TIER_LABEL, groupByTier, totalByTier, totalTrophies } from "@/lib/trophies";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Títulos",
  description:
    "A galeria de conquistas do Atlético Mineiro: Libertadores, Recopa Sul-Americana, Campeonato Brasileiro, Copa do Brasil e o recorde estadual do Galo.",
  path: "/titulos",
});

export default function TitulosPage() {
  const total = totalTrophies(trophies);
  const byTier = totalByTier(trophies);
  const groups = groupByTier(trophies);

  return (
    <div className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Força e tradição
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-foreground uppercase lg:text-5xl">
            Títulos do Galo
          </h1>
          <p className="mt-4 text-base text-muted-foreground lg:text-lg">
            Um recorte das principais conquistas do clube, da América ao estadual mais
            vencido do Brasil.
          </p>
        </div>

        <Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <StatCard value={String(total)} label="Títulos conquistados" />
            <StatCard value={String(byTier.internacional)} label="Internacionais" />
            <StatCard value={String(byTier.nacional)} label="Nacionais" />
            <StatCard value={String(byTier.estadual)} label="Estaduais" />
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col gap-16">
          {groups.map((group) => (
            <section key={group.tier}>
              <h2 className="font-display text-2xl font-semibold tracking-wide text-foreground uppercase">
                {TIER_LABEL[group.tier]}
              </h2>
              <div className="mt-6">
                <TrophyGrid trophies={group.items} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
