/**
 * Interfaces do conteúdo estático do site do Galo (Atlético Mineiro).
 * "Conteúdo é dado, não markup" — ver docs/smart-memory/project/architecture.md.
 * Este arquivo não importa React nem componentes: é tipagem pura.
 */

export interface SocialLink {
  platform: "instagram" | "x" | "youtube" | "facebook" | "tiktok";
  label: string;
  href: string;
}

export interface Club {
  name: string;
  nickname: string;
  foundedYear: number;
  foundedDate: string; // ISO (ex.: "1908-03-25")
  city: string;
  state: string;
  colors: string[];
  social: SocialLink[];
  disclaimer: string;
}

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  isHighlight?: boolean;
}

export type TrophyTier = "internacional" | "nacional" | "estadual";

export interface Trophy {
  competition: string;
  tier: TrophyTier;
  /** Anos individualmente confirmados pela pesquisa (pode ser um subconjunto de `count`). */
  years: number[];
  /** Total oficial de conquistas — fonte de verdade para agregação (pode exceder `years.length`). */
  count: number;
  /** Usado quando nem todos os anos são conhecidos individualmente (ex.: recordista estadual). */
  periodLabel?: string;
  note?: string;
}

export type PlayerPosition = "goleiro" | "defesa" | "meio" | "ataque";

export interface Player {
  name: string;
  position: PlayerPosition;
  number?: number;
  photo?: string;
  /** Presente só quando `photo` é uma fotografia real licenciada (não a
   * silhueta genérica) — ver docs/smart-memory/agents/research/fotos-elenco-wikimedia.md. */
  photoAttribution?: ImageAttribution;
}

export interface ArenaStat {
  label: string;
  value: string;
  icon?: "capacity" | "calendar" | "location" | "match";
}

export interface ImageAttribution {
  photographer: string;
  license: string; // ex.: "CC BY-SA 4.0"
  licenseUrl: string;
  sourceLabel: string; // ex.: "Wikimedia Commons"
  sourceUrl: string;
}

export interface ArenaInfo {
  name: string;
  openedDate: string; // ISO
  capacity: number;
  city: string;
  state: string;
  address: string;
  mapUrl: string;
  description: string;
  stats: ArenaStat[];
  gallery: { src: string; alt: string; attribution?: ImageAttribution }[];
  heroImage: string;
  heroImageAlt: string;
  heroImageAttribution?: ImageAttribution;
}

export interface VideoItem {
  slug: string;
  title: string;
  description: string;
  youtubeId: string;
  channel: string;
  date: string; // ISO
}

export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  image: string;
  imageAlt: string;
  category: string;
  /** Presente só quando `image` é uma fotografia real licenciada (não o
   * motivo gráfico genérico gerado) — ver
   * docs/smart-memory/agents/research/noticias-reais-2026.md. */
  imageAttribution?: ImageAttribution;
  /** Citação curta atribuída nominalmente (ex.: declaração de jogador),
   * exibida com destaque visual e atribuição clara — não confundir com o
   * texto editorial de `excerpt`. */
  quote?: { text: string; attribution: string };
}

export interface NextMatch {
  competition: string;
  opponent: string;
  date: string; // ISO
  venue: string;
  isHome: boolean;
}

export type MatchOutcome = "vitoria" | "empate" | "derrota";

export interface MatchResult {
  outcome: MatchOutcome;
  /** Placar no formato "2×0" (mandante × visitante). */
  score: string;
  opponent: string;
  date: string; // ISO
}

export interface UpcomingMatch {
  opponent: string;
  date: string; // ISO
  isHome: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}

export type QuizCategory = "historia" | "titulos" | "curiosidades";

/** Ids estáveis das alternativas dentro de uma pergunta. */
export type QuizOptionId = "a" | "b" | "c" | "d";

export interface QuizOption {
  id: QuizOptionId;
  label: string; // texto da alternativa
}

export interface QuizQuestion {
  id: string; // slug estável e único, ex.: "ano-fundacao"
  category: QuizCategory;
  prompt: string; // enunciado, termina em "?"
  options: [QuizOption, QuizOption, QuizOption, QuizOption]; // exatamente 4 (tupla)
  correctOptionId: QuizOptionId; // gabarito por id, nunca por índice
  explanation: string; // 1–2 frases mostradas após confirmar
  factRef: string; // âncora no research (NÃO renderizado)
}

export interface QuizResultTier {
  minPercent: number; // 0–100, inclusivo
  title: string;
  message: string;
}
