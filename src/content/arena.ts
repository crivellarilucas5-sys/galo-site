import type { ArenaInfo } from "@/types/content";

/**
 * Procedência: docs/smart-memory/agents/research/atletico-mineiro-facts.md
 * (nome, data de inauguração, capacidade, localização, primeira partida).
 *
 * `heroImage`: fotografia real (não mais placeholder gerado) — Atlético
 * Mineiro x Bahia, Arena MRV, 2 de junho de 2024, por Felipebini, licença
 * CC BY-SA 4.0 (ver docs/smart-memory/agents/research/elenco-atual-2026.md
 * §Foto da Arena MRV e `heroImageAttribution` abaixo — a atribuição é
 * exibida no rodapé da seção hero em src/app/estadio/page.tsx). Como agora
 * é uma foto real e específica, `heroImageAlt` deixa de ser vazio/decorativo
 * (regra do AC3 da 1.8/squad-grid: `alt=""` só para motivo gráfico genérico
 * sem conteúdo distinguível — não é mais o caso aqui).
 *
 * `gallery`: 3 fotos reais adicionais da Arena MRV (Wikimedia Commons,
 * CC BY-SA 4.0), identificadas em
 * docs/smart-memory/_inbox/research-2026-09-30-elenco-arena-video.md —
 * substituem os motivos gráficos genéricos anteriores. Cada item tem `alt`
 * descritivo real (não mais decorativo) e `attribution` própria, exibida
 * junto à imagem (mesmo padrão de crédito usado em squad.ts/elenco).
 */
export const arena = {
  name: "Arena MRV",
  openedDate: "2023-08-27",
  capacity: 44892,
  city: "Belo Horizonte",
  state: "MG",
  address: "Belo Horizonte, Minas Gerais",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=Arena+MRV+Belo+Horizonte",
  description:
    "Inaugurada em 27 de agosto de 2023, a Arena MRV é a casa do Atlético Mineiro em Belo Horizonte. Na estreia, o clube venceu o Santos por 2×0 pelo Campeonato Brasileiro.",
  stats: [
    { label: "Capacidade", value: "44.892 lugares", icon: "capacity" },
    { label: "Inaugurada em", value: "27 de agosto de 2023", icon: "calendar" },
    { label: "Localização", value: "Belo Horizonte, MG", icon: "location" },
    {
      label: "Primeira partida oficial",
      value: "Vitória por 2×0 sobre o Santos (Brasileirão 2023)",
      icon: "match",
    },
  ],
  gallery: [
    {
      src: "/images/arena/galeria-botafogo.jpg",
      alt: "Interior da Arena MRV lotada durante Atlético Mineiro x Botafogo, com torcida nas arquibancadas",
      attribution: {
        photographer: "Felipe Bini",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        sourceLabel: "Wikimedia Commons",
        sourceUrl:
          "https://commons.wikimedia.org/wiki/File:Atl%C3%A9tico_Mineiro_v_Botafogo,_Arena_MRV,_Horizonte,_2023.jpg",
      },
    },
    {
      src: "/images/arena/galeria-aerea-2023.jpg",
      alt: "Vista aérea da Arena MRV e seu entorno em Belo Horizonte",
      attribution: {
        photographer: "Heuler.silva",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:ARENA_MRV.jpg",
      },
    },
    {
      src: "/images/arena/galeria-aerea-2025.jpg",
      alt: "Vista aérea mais recente da Arena MRV, em 2025",
      attribution: {
        photographer: "Heuler.silva",
        license: "CC BY-SA 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
        sourceLabel: "Wikimedia Commons",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Arena-mrv-2025.jpg",
      },
    },
  ],
  heroImage: "/images/arena/arena-hero.jpg",
  heroImageAlt:
    "Vista interna da Arena MRV lotada durante uma partida, com a estrutura do telhado e o gramado ao fundo",
  heroImageAttribution: {
    photographer: "Felipebini",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    sourceLabel: "Wikimedia Commons",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Atl%C3%A9tico_Mineiro_v_Bahia,_Arena_MRV,_Belo_Horizonte,_2024.jpg",
  },
} satisfies ArenaInfo;
