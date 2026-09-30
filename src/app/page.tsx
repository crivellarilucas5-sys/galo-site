import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { NextMatch } from "@/components/sections/next-match";
import { NewsGrid } from "@/components/sections/news-grid";
import { VideoSection } from "@/components/sections/video-section";
import { HistoryPreview } from "@/components/sections/history-preview";
import { TrophyHighlights } from "@/components/sections/trophy-highlights";
import { club } from "@/content/club";
import { news } from "@/content/news";
import { nextMatch, pastResults, upcomingMatches } from "@/content/next-match";
import { timeline } from "@/content/timeline";
import { trophies } from "@/content/trophies";
import { videos } from "@/content/videos";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Galo — Atlético Mineiro | Site de torcedor",
  description:
    "Site de torcedor não oficial do Atlético Mineiro: próximo jogo, últimas notícias, história e títulos do Galo desde 1908.",
  path: "/",
});

export default function Home() {
  const historyPreviewEvents = timeline
    .filter((event) => event.isHighlight)
    .slice(0, 4);

  return (
    <>
      <Hero
        eyebrow={`Desde ${club.foundedYear}`}
        title={club.nickname.toUpperCase()}
        subtitle={`O ${club.name} carrega tradição, força e a paixão de uma das maiores torcidas do Brasil.`}
        backgroundImage="/images/hero/hero-torcida.jpg"
        // QA N3: hero é um motivo gráfico genérico (listras + estrela) usado
        // só como fundo decorativo atrás do <h1> sobreposto — não deve
        // afirmar uma cena ("torcida") que a imagem não mostra. `alt=""`
        // (decorativo) é o correto, mesma regra do AC3 da 1.8.
        backgroundImageAlt=""
        primaryCta={{ label: "Conheça a história", href: "/historia" }}
        secondaryCta={{ label: "Ver títulos", href: "/titulos" }}
      />
      <NextMatch match={nextMatch} pastResults={pastResults} upcomingMatches={upcomingMatches} />
      <NewsGrid news={news} />
      <VideoSection videos={videos} />
      <HistoryPreview events={historyPreviewEvents} />
      <TrophyHighlights trophies={trophies} />
    </>
  );
}
