import type { TimelineEvent } from "@/types/content";

/**
 * Procedência: docs/smart-memory/agents/research/atletico-mineiro-facts.md.
 * Ordenado cronologicamente (crescente) — a página NÃO deve reordenar.
 * Eventos de "década de 19XX" usam o primeiro ano da década como valor
 * numérico de ordenação; a descrição deixa claro que é aproximado.
 *
 * `imageAlt`: QA N3 — os 5 tiles com imagem são o mesmo motivo gráfico
 * genérico (listras + estrela), sem relação com o marco específico. Ano,
 * título e descrição ao lado já carregam a informação; `alt=""`
 * (decorativo) evita afirmar um marco histórico que a imagem não retrata.
 */
export const timeline = [
  {
    year: 1908,
    title: "Fundação do clube",
    description:
      "Em 25 de março de 1908, 22 estudantes de Belo Horizonte — liderados por Margival Mendes Leal, Mário Toledo, Raul Fracarolli e Augusto Soares — se reúnem sob as árvores do Parque Municipal e fundam o Athlético Mineiro Football Club.",
    image: "/images/historia/fundacao-1908.jpg",
    imageAlt: "",
    isHighlight: true,
  },
  {
    year: 1909,
    title: "Primeira partida oficial",
    description:
      "Em 21 de março de 1909, o clube estreia com vitória por 3×0 sobre o Sport Club Futebol.",
  },
  {
    year: 1913,
    title: "Nome definitivo",
    description:
      'O clube adota o nome definitivo "Clube Atlético Mineiro", substituindo a denominação original.',
  },
  {
    year: 1914,
    title: "Primeira grande conquista",
    description:
      "O Atlético conquista a Taça Bueno Brandão, sua primeira grande conquista na história.",
  },
  {
    year: 1915,
    title: "Início da hegemonia estadual",
    description:
      "Começa a trajetória do clube como maior campeão do Campeonato Mineiro — recorde que se estende até os dias atuais, somando 50 títulos entre 1915 e 2025 (hexacampeão em 2020–2025).",
  },
  {
    year: 1920,
    title: "Cores oficiais: preto e branco",
    description:
      "Ao longo da década de 1920, o clube consolida o preto e o branco como cores oficiais, em referência a igualdade e unidade.",
  },
  {
    year: 1921,
    title: "Nasce o Clássico Mineiro",
    description:
      "O primeiro confronto contra o Palestra Itália (atual Cruzeiro) inaugura o Clássico Mineiro, uma das maiores rivalidades do futebol brasileiro.",
  },
  {
    year: 1927,
    title: "A maior goleada do clássico",
    description:
      "Em 27 de novembro de 1927, o Atlético vence o Palestra Itália por 9×2 pelo Campeonato Mineiro — a maior goleada da história do clássico contra o rival.",
  },
  {
    year: 1930,
    title: 'Nasce o apelido "Galo"',
    description:
      "Na década de 1930, o clube passa a ser conhecido como Galo — símbolo de força, garra e combatividade que acompanha a torcida até hoje.",
  },
  {
    year: 1971,
    title: "Primeiro título brasileiro",
    description:
      "Em 19 de dezembro de 1971, no Maracanã, o Atlético vence o Botafogo por 1×0, com gol de Dadá Maravilha, e conquista o primeiro Campeonato Brasileiro oficializado pela CBF. A estrela dourada do escudo nasce em homenagem a este título.",
    image: "/images/historia/brasileiro-1971.jpg",
    imageAlt: "",
    isHighlight: true,
  },
  {
    year: 2013,
    title: "Campeão da América",
    description:
      "O Atlético conquista a Copa Libertadores da América, seu primeiro título continental, vencendo o Olímpia (PAR) nos pênaltis após 2×2 no placar agregado.",
    image: "/images/historia/libertadores-2013.jpg",
    imageAlt: "",
    isHighlight: true,
  },
  {
    year: 2014,
    title: "Primeira Copa do Brasil",
    description: "O clube conquista pela primeira vez a Copa do Brasil.",
  },
  {
    year: 2014,
    title: "Campeão da Recopa Sul-Americana",
    description:
      "Como campeão da Libertadores 2013, o Atlético vence o Lanús (ARG) em dois jogos (1×0 fora e 4×3 em casa) e conquista a Recopa Sul-Americana.",
  },
  {
    year: 2021,
    title: "Segundo título brasileiro",
    description:
      "Sob o comando do técnico Cuca, o Atlético é confirmado campeão brasileiro após vencer o Bahia por 3×2, terminando a competição 13 pontos à frente do vice-líder — parte do triplete doméstico (Brasileiro, Copa do Brasil e Mineiro).",
    image: "/images/historia/brasileiro-2021.jpg",
    imageAlt: "",
    isHighlight: true,
  },
  {
    year: 2021,
    title: "Segunda Copa do Brasil",
    description: "O clube conquista pela segunda vez a Copa do Brasil.",
  },
  {
    year: 2023,
    title: "Inauguração da Arena MRV",
    description:
      "Em 27 de agosto de 2023, o Atlético inaugura sua nova casa, a Arena MRV, com vitória por 2×0 sobre o Santos pelo Campeonato Brasileiro.",
    image: "/images/historia/arena-mrv-2023.jpg",
    imageAlt: "",
    isHighlight: true,
  },
] satisfies TimelineEvent[];
