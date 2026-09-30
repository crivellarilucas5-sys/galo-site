import type { VideoItem } from "@/types/content";

/**
 * Procedência: docs/smart-memory/_inbox/research-2026-09-30-elenco-arena-video.md
 * (pesquisa do clássico Atlético 2×1 Cruzeiro, Copa do Brasil, 01/09/2026).
 *
 * Verificado via YouTube oEmbed antes de publicar: URL, título e canal
 * conferem. Data de "transmitido ao vivo" (2 de set. de 2026) confirmada
 * visualmente na página do vídeo — 1 dia após o jogo, consistente com
 * coletiva pós-jogo.
 */
export const videos = [
  {
    slug: "dominguez-apos-classico-copa-brasil-2026",
    title: "Domínguez fala após a classificação no clássico contra o Cruzeiro",
    description:
      "Coletiva do técnico Eduardo Domínguez após a vitória por 2×1 sobre o Cruzeiro, pela Copa do Brasil (01/09/2026), com elogios ao goleiro Everson.",
    youtubeId: "prM9H6NMiFs",
    channel: "ESPN Brasil",
    date: "2026-09-02",
  },
] satisfies VideoItem[];
