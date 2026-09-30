import type { ImageAttribution, NewsItem } from "@/types/content";

/**
 * Itens editoriais — 6 matérias REAIS e verificáveis do Atlético Mineiro.
 *
 * Fonte: docs/smart-memory/agents/research/noticias-reais-2026.md
 * (sites-analyst, reverificado em 30/09/2026). Todo texto (`excerpt`) foi
 * escrito pela pesquisa com base nos fatos apurados em múltiplas fontes
 * jornalísticas — não é cópia das matérias-fonte. A única citação literal é
 * a de Fred no item do Clássico Mineiro (`quote`), atribuída nominalmente.
 *
 * `image`/`imageAlt`: 3 das 6 matérias têm foto livre (Wikimedia Commons) de
 * um jogador citado — sempre de uma fase anterior ao Atlético (nenhuma foto
 * livre do evento em si, ou do jogador já com a camisa do Galo, foi
 * encontrada). `imageAttribution` carrega a atribuição da licença, exibida
 * no card (news-grid.tsx). As outras 3 matérias (Clássico, Sul-Americana,
 * apoio institucional) não têm foto livre do evento — mantêm o motivo
 * gráfico genérico já gerado por scripts/generate-placeholders.mjs, com
 * `imageAlt=""` (decorativo, mesma regra do QA N3 — ver
 * docs/smart-memory/agents/photo/DIGEST ou ../ux/DIGEST).
 */

const fredAttribution: ImageAttribution = {
  photographer: "Zafer (WikiPortraits)",
  license: "CC BY-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:Fred_(footballer,_born_1993)_7_Fenerbah%C3%A7e_20260805_(3)_(cropped).JPG",
};

const renanLodiAttribution: ImageAttribution = {
  photographer: "Anna Nessie",
  license: "CC BY-SA 3.0",
  licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl: "https://commons.wikimedia.org/wiki/File:ATL-Madrid-Lokomotiv001-Lodi.jpg",
};

const leoDuarteAttribution: ImageAttribution = {
  photographer: "Zafer",
  license: "CC BY 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  sourceLabel: "Wikimedia Commons",
  sourceUrl:
    "https://commons.wikimedia.org/wiki/File:L%C3%A9o_Duarte_5_%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK_20250731_(1).jpg",
};

export const news = [
  {
    slug: "governo-mg-apoio-financeiro-clubes-bets",
    title: "Governo de Minas destina R$ 15 milhões ao Atlético após crise das bets",
    excerpt:
      "Pacote de R$ 32 milhões do estado busca compensar Atlético, Cruzeiro e América-MG pelas perdas com a suspensão das casas de apostas patrocinadoras.",
    date: "2026-09-29",
    image: "/images/news/noticia-3.jpg",
    imageAlt: "",
    category: "Institucional",
  },
  {
    slug: "sul-americana-semifinal-montevideo-city-torque",
    title: "Galo encara o Montevideo City Torque na semifinal da Sul-Americana",
    excerpt:
      "Atual vice-campeão da competição, o Atlético decide vaga na final contra o time uruguaio, que chega à semifinal pela primeira vez na história.",
    date: "2026-09-18",
    image: "/images/news/noticia-2.jpg",
    imageAlt: "",
    category: "Copa Sudamericana",
  },
  {
    slug: "classico-mineiro-fred-decide-copa-do-brasil",
    title: "De virada, Galo bate o Cruzeiro e avança na Copa do Brasil",
    excerpt:
      "Atlético venceu o Cruzeiro por 2 a 1 na Arena MRV e confirmou vaga na semifinal da Copa do Brasil — Fred marcou o gol da virada logo na terceira partida pelo clube.",
    date: "2026-09-01",
    image: "/images/news/noticia-1.jpg",
    imageAlt: "",
    category: "Clássico Mineiro",
    quote: {
      text: "Nem no meu melhor sonho eu imaginaria isso",
      attribution: "Fred, volante do Atlético-MG, em entrevista após a partida",
    },
  },
  {
    slug: "fred-e-do-galo",
    title: "Fred é do Galo: 'atleticano desde sempre' assina até 2029",
    excerpt:
      "Após mais de uma década na Europa, o volante Fred, nascido em Belo Horizonte e torcedor declarado do Galo, retorna ao Brasil para vestir a camisa alvinegra até dezembro de 2029.",
    // Data confirmada via datePublished da Gazeta Esportiva (ver
    // docs/smart-memory/agents/research/noticias-reais-2026.md, item 2).
    date: "2026-08-14",
    image: "/images/news/fred.jpg",
    imageAlt: "Fred em ação pelo Fenerbahçe, antes de assinar com o Galo",
    imageAttribution: fredAttribution,
    category: "Contratações",
  },
  {
    slug: "leo-duarte-e-do-galo",
    title: "Galo reforça a zaga: Léo Duarte assina até 2030",
    excerpt:
      "Aos 29 anos, o zagueiro Léo Duarte chega ao Atlético após o fim do contrato com o Başakşehir, da Turquia, e assina até 2030.",
    date: "2026-06-24",
    image: "/images/news/leo-duarte.jpg",
    imageAlt: "Léo Duarte em ação pelo Başakşehir, antes de assinar com o Galo",
    imageAttribution: leoDuarteAttribution,
    category: "Contratações",
  },
  {
    slug: "renan-lodi-e-do-galo",
    title: "Renan Lodi é do Galo: lateral de seleção assina por 5 anos",
    excerpt:
      "Sem clube desde a saída do Al-Hilal, o lateral-esquerdo Renan Lodi, de 19 jogos pela Seleção Brasileira, assinou contrato de cinco temporadas com o Atlético.",
    // Data confirmada via article:published_time do site oficial do clube e
    // CNN Brasil (ver noticias-reais-2026.md, item 3).
    date: "2025-12-27",
    image: "/images/news/renan-lodi.jpg",
    imageAlt: "Renan Lodi em ação pelo Atlético de Madrid, antes de assinar com o Galo",
    imageAttribution: renanLodiAttribution,
    category: "Contratações",
  },
] satisfies NewsItem[];
