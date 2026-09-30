import type { Metadata } from "next";
import { Timeline } from "@/components/sections/timeline";
import { timeline } from "@/content/timeline";
import { club } from "@/content/club";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "História",
  description:
    "A trajetória do Atlético Mineiro de 1908 até hoje: fundação, cores, apelido, clássicos e os principais títulos da história do Galo.",
  path: "/historia",
});

export default function HistoriaPage() {
  return (
    <div className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Desde {club.foundedYear}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-foreground uppercase lg:text-5xl">
            A história do Galo
          </h1>
          <p className="mt-4 text-base text-muted-foreground lg:text-lg">
            Da fundação no Parque Municipal de Belo Horizonte aos títulos mais recentes:
            a linha do tempo abaixo reúne os marcos que construíram a tradição do{" "}
            {club.name}.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Linha do tempo</h2>
          <Timeline events={timeline} />
        </div>
      </div>
    </div>
  );
}
