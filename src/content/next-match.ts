import type { MatchResult, NextMatch, UpcomingMatch } from "@/types/content";

/**
 * ESTÁTICO E ILUSTRATIVO — não há integração com calendário ao vivo/API de
 * jogos. A página exibe rótulo explícito informando essa natureza
 * ilustrativa (ver components/sections/next-match.tsx). `pastResults` e
 * `upcomingMatches` seguem a mesma natureza: dados de exemplo inventados
 * para demonstrar o layout de "Jogos" (ver
 * docs/smart-memory/agents/ux/elenco-jogos-refresh.md §2), não resultados
 * ou confrontos reais.
 */
export const nextMatch = {
  competition: "Campeonato Brasileiro Série A",
  opponent: "Cruzeiro",
  date: "2026-10-04T16:00:00-03:00",
  venue: "Arena MRV, Belo Horizonte",
  isHome: true,
} satisfies NextMatch;

/** Mais antigo → mais recente. Placar sempre na perspectiva do Galo. */
export const pastResults = [
  { outcome: "vitoria", score: "2×0", opponent: "Bahia", date: "2026-09-13T16:00:00-03:00" },
  { outcome: "derrota", score: "0×1", opponent: "Palmeiras", date: "2026-09-17T21:30:00-03:00" },
  { outcome: "empate", score: "1×1", opponent: "Vasco", date: "2026-09-24T18:30:00-03:00" },
] satisfies MatchResult[];

export const upcomingMatches = [
  { opponent: "Palmeiras", date: "2026-10-11T16:00:00-03:00", isHome: false },
  { opponent: "Flamengo", date: "2026-10-18T18:30:00-03:00", isHome: true },
  { opponent: "Bahia", date: "2026-10-25T20:00:00-03:00", isHome: false },
] satisfies UpcomingMatch[];
