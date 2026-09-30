import type { QuizQuestion, QuizResultTier } from "@/types/content";

/**
 * Perguntas do quiz — transcritas integralmente de
 * docs/smart-memory/agents/research/quiz-perguntas.md (sites-analyst).
 * Zero fato inventado pelo dev: 10 perguntas, 4 história · 3 títulos ·
 * 3 curiosidades, cada uma com `factRef` apontando para uma seção de
 * atletico-mineiro-facts.md. Ver story 2.1 (AC5).
 */
export const quizQuestions = [
  {
    id: "ano-fundacao",
    category: "historia",
    prompt: "Em que ano o Atlético Mineiro foi fundado?",
    options: [
      { id: "a", label: "1905" },
      { id: "b", label: "1908" },
      { id: "c", label: "1912" },
      { id: "d", label: "1915" },
    ],
    correctOptionId: "b",
    explanation:
      "O Clube Atlético Mineiro foi fundado em 25 de março de 1908 por 22 estudantes de Belo Horizonte sob as árvores do Parque Municipal.",
    factRef: "atletico-mineiro-facts#fundacao-e-historia-primaria",
  },
  {
    id: "apelido-galo",
    category: "historia",
    prompt: "Quando o Atlético Mineiro adotou o apelido 'Galo'?",
    options: [
      { id: "a", label: "Década de 1910" },
      { id: "b", label: "Década de 1920" },
      { id: "c", label: "Década de 1930" },
      { id: "d", label: "Década de 1940" },
    ],
    correctOptionId: "c",
    explanation:
      "O apelido 'Galo' foi adotado na década de 1930, representando força, garra e combatividade — símbolos que definem o clube até hoje.",
    factRef: "atletico-mineiro-facts#apelido",
  },
  {
    id: "cores-oficiais",
    category: "historia",
    prompt: "Quais são as cores oficiais do Atlético Mineiro?",
    options: [
      { id: "a", label: "Vermelho e branco" },
      { id: "b", label: "Preto e branco" },
      { id: "c", label: "Azul e branco" },
      { id: "d", label: "Amarelo e preto" },
    ],
    correctOptionId: "b",
    explanation:
      "As cores preto e branco foram adotadas na década de 1920 e representam igualdade e unidade, formando as listras verticais do escudo.",
    factRef: "atletico-mineiro-facts#cores-oficiais",
  },
  {
    id: "classico-mineiro-origem",
    category: "historia",
    prompt: "Em qual ano começou o Clássico Mineiro, rival entre Atlético Mineiro e Cruzeiro?",
    options: [
      { id: "a", label: "1915" },
      { id: "b", label: "1921" },
      { id: "c", label: "1927" },
      { id: "d", label: "1935" },
    ],
    correctOptionId: "b",
    explanation:
      "O Clássico Mineiro teve origem em 1921, quando o Cruzeiro ainda era chamado de Palestra Itália. É um dos clássicos mais disputados do futebol brasileiro.",
    factRef: "atletico-mineiro-facts#classico-mineiro",
  },
  {
    id: "libertadores-2013",
    category: "titulos",
    prompt: "Contra qual adversário o Atlético Mineiro venceu a Copa Libertadores em 2013?",
    options: [
      { id: "a", label: "Club Olimpia (Paraguai)" },
      { id: "b", label: "CA Lanús (Argentina)" },
      { id: "c", label: "Boca Juniors (Argentina)" },
      { id: "d", label: "São Paulo (Brasil)" },
    ],
    correctOptionId: "a",
    explanation:
      "Em 2013, o Atlético venceu o Club Olimpia do Paraguai na final, com um elenco que incluía Ronaldinho Gaúcho. Foi o primeiro título continental do clube.",
    factRef: "atletico-mineiro-facts#copa-libertadores-da-america",
  },
  {
    id: "copa-conmebol-titulos",
    category: "titulos",
    prompt: "Quantas vezes o Atlético Mineiro foi campeão da Copa CONMEBOL?",
    options: [
      { id: "a", label: "1 vez (1992)" },
      { id: "b", label: "2 vezes (1992 e 1997)" },
      { id: "c", label: "3 vezes (1992, 1997 e 2000)" },
      { id: "d", label: "4 vezes (1990, 1992, 1997 e 2001)" },
    ],
    correctOptionId: "b",
    explanation:
      "O Atlético conquistou a Copa CONMEBOL duas vezes: em 1992 (vencendo Club Olimpia) e em 1997 (vencendo CA Lanús). Em 1992, foi a primeira edição da competição.",
    factRef: "atletico-mineiro-facts#copa-conmebol",
  },
  {
    id: "campeonato-brasileiro-titulos",
    category: "titulos",
    prompt: "Quantos títulos do Campeonato Brasileiro Série A o Atlético Mineiro conquistou?",
    options: [
      { id: "a", label: "1 título (1971)" },
      { id: "b", label: "2 títulos (1971 e 2021)" },
      { id: "c", label: "3 títulos (1971, 2014 e 2021)" },
      { id: "d", label: "4 títulos (1971, 1980, 2014 e 2021)" },
    ],
    correctOptionId: "b",
    explanation:
      "O Atlético conquistou 2 títulos do Campeonato Brasileiro: em 1971 (com gol de Dadá Maravilha na final) e em 2021 (sob comando do técnico Cuca, com 13 pontos de vantagem).",
    factRef: "atletico-mineiro-facts#campeonato-brasileiro-serie-a",
  },
  {
    id: "arena-mrv-capacidade",
    category: "curiosidades",
    prompt: "Qual é a capacidade máxima da Arena MRV, estádio do Atlético Mineiro?",
    options: [
      { id: "a", label: "40.000 pessoas" },
      { id: "b", label: "42.500 pessoas" },
      { id: "c", label: "44.892 pessoas" },
      { id: "d", label: "48.000 pessoas" },
    ],
    correctOptionId: "c",
    explanation:
      "A Arena MRV foi inaugurada em 27 de agosto de 2023 e tem capacidade para 44.892 torcedores. A primeira partida oficial foi uma vitória 2×0 sobre o Santos.",
    factRef: "atletico-mineiro-facts#estadio-atual",
  },
  {
    id: "recopa-2014-adversario",
    category: "curiosidades",
    prompt: "Qual foi o adversário na Recopa Sul-Americana que o Atlético Mineiro conquistou em 2014?",
    options: [
      { id: "a", label: "River Plate (Argentina)" },
      { id: "b", label: "CA Lanús (Argentina)" },
      { id: "c", label: "Club Olimpia (Paraguai)" },
      { id: "d", label: "Defensor Sporting (Uruguai)" },
    ],
    correctOptionId: "b",
    explanation:
      "O Atlético venceu a CA Lanús na Recopa Sul-Americana de 2014 (1-0 fora, 4-3 em casa), marcando o primeiro título do clube na competição, em sua primeira participação (como campeão da Libertadores 2013).",
    factRef: "atletico-mineiro-facts#recopa-sul-americana",
  },
  {
    id: "campeonato-mineiro-titulos",
    category: "curiosidades",
    prompt: "Quantos títulos do Campeonato Mineiro o Atlético Mineiro já conquistou?",
    options: [
      { id: "a", label: "35 títulos" },
      { id: "b", label: "40 títulos" },
      { id: "c", label: "45 títulos" },
      { id: "d", label: "50 títulos" },
    ],
    correctOptionId: "d",
    explanation:
      "O Atlético Mineiro é o maior campeão do Campeonato Mineiro, com 50 títulos conquistados entre 1915 e 2025, incluindo 6 consecutivos (2020–2025).",
    factRef: "atletico-mineiro-facts#campeonato-mineiro-estadual",
  },
] satisfies QuizQuestion[];

/**
 * Faixas de resultado por percentual de acerto — conteúdo fechado pelo
 * architect na story 2.1. `minPercent: 0` cobre a faixa mais baixa.
 */
export const quizResultTiers = [
  {
    minPercent: 0,
    title: "Torcedor de araque",
    message: "Ainda dá pra virar esse jogo — passa na nossa História e tenta de novo.",
  },
  {
    minPercent: 50,
    title: "Atleticano roxo",
    message: "Conhece o Galo de verdade. Mais um pouco de arquibancada e chega no topo.",
  },
  {
    minPercent: 80,
    title: "Nasceu vestindo preto e branco",
    message: "Você não torce pro Galo, você é o Galo.",
  },
] satisfies QuizResultTier[];
