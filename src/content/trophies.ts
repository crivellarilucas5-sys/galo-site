import type { Trophy } from "@/types/content";

/**
 * Procedência: docs/smart-memory/agents/research/atletico-mineiro-facts.md.
 * `count` é o total oficial (fonte de verdade para agregação); `years` traz
 * os anos individualmente confirmados pela pesquisa. Quando a pesquisa não
 * lista todos os anos (caso do Campeonato Mineiro), `years` fica menor que
 * `count` e `periodLabel` comunica o intervalo conhecido — nenhum ano é
 * inventado.
 */
export const trophies = [
  {
    competition: "Copa CONMEBOL",
    tier: "internacional",
    years: [1992, 1997],
    count: 2,
    note: "1992: 1º título internacional da história do clube, sobre o Olimpia (PAR), 2×1 no agregado (2×0 em Belo Horizonte, 1×0 em Assunção). 1997: título sobre o CA Lanús (ARG), tornando o Atlético recordista de títulos na competição.",
  },
  {
    competition: "Copa Libertadores da América",
    tier: "internacional",
    years: [2013],
    count: 1,
    note: "Título conquistado sobre o Olimpia (PAR), nos pênaltis após 2×2 no agregado.",
  },
  {
    competition: "Recopa Sul-Americana",
    tier: "internacional",
    years: [2014],
    count: 1,
    note: "Título conquistado sobre o Lanús (ARG), 5×3 no agregado.",
  },
  {
    competition: "Campeonato Brasileiro Série A",
    tier: "nacional",
    years: [1971, 2021],
    count: 2,
  },
  {
    competition: "Copa do Brasil",
    tier: "nacional",
    years: [2014, 2021],
    count: 2,
  },
  {
    competition: "Taça Bueno Brandão",
    tier: "estadual",
    years: [1914],
    count: 1,
    note: "Primeira grande conquista da história do clube.",
  },
  {
    competition: "Campeonato Mineiro",
    tier: "estadual",
    years: [],
    count: 50,
    periodLabel: "1915–2025",
    note: "Maior campeão da história do torneio; hexacampeão com 6 títulos consecutivos entre 2020 e 2025 (50º título em 2025). Lista completa dos 50 anos individuais ainda não coberta pela pesquisa.",
  },
] satisfies Trophy[];
