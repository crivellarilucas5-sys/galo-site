---
title: "Módulos — Site Galo"
type: overview
agent: sites-architect (Zaelion)
created: 2026-09-09
updated: 2026-09-30
status: active
summary: "Mapa planejado de páginas, seções e módulos de conteúdo do site do Atlético-MG, com God Nodes previstos (layout, globals.css, content/, utils)."
tags: [modules, sites]
---

# Mapa de Módulos — Site Galo

> **Estado:** planejado (pré-implementação). Não há código ainda — este mapa é o contrato que o `sites-dev-alpha` implementa.
> Sem `graphify-out/GRAPH_REPORT.md` disponível nesta rodada; os God Nodes abaixo são **previstos por design**, não medidos. Reexecutar `*discover` após a implementação para confirmar com dados reais de import.

## ⚡ God Nodes (previstos)

Arquivos de alto acoplamento — alterá-los afeta o site inteiro. Exigem revisão de QA formal ao serem tocados.

```
src/app/layout.tsx            # envolve todas as rotas (fontes, header, footer, metadata base, JSON-LD)
src/app/globals.css           # bloco @theme — fonte única dos tokens; muda o visual de tudo
src/content/club.ts           # identidade + redes sociais; consumido por layout, footer, SEO e Home
src/types/content.ts          # tipos de todo o conteúdo; quebra em cascata
src/lib/utils.ts              # cn() — importado por praticamente todo componente
src/components/layout/site-header.tsx
src/components/layout/site-footer.tsx
src/components/shared/reveal.tsx   # wrapper Motion usado por todas as seções
```

## 📦 Clusters

### Cluster `rotas` — 5 páginas estáticas
| Rota | Arquivo | Seções que compõe |
|---|---|---|
| `/` | `app/page.tsx` | Hero, NextMatch, NewsGrid, HistoryPreview, TrophyHighlights |
| `/historia` | `app/historia/page.tsx` | SectionHeading, Timeline |
| `/titulos` | `app/titulos/page.tsx` | SectionHeading, TrophyGrid, StatCard |
| `/estadio` | `app/estadio/page.tsx` | SectionHeading, ArenaStats, ArenaGallery |
| `/elenco` | `app/elenco/page.tsx` | SectionHeading, SquadGrid |
| `/quiz` | `app/quiz/page.tsx` | QuizRunner (ilha client, ADR-001) |

### Cluster `shell` — presente em toda rota
`layout/site-header.tsx` · `layout/mobile-nav.tsx` · `layout/site-footer.tsx` · `content/navigation.ts` · `content/club.ts`

### Cluster `sections` — blocos visuais
`hero` · `next-match` · `news-grid` · `history-preview` · `trophy-highlights` · `timeline` · `trophy-grid` · `arena-stats` · `arena-gallery` · `squad-grid`

### Cluster `content` — dados tipados (sem React)
`club.ts` · `timeline.ts` · `trophies.ts` · `squad.ts` · `arena.ts` · `news.ts` · `next-match.ts` · `navigation.ts` · `quiz.ts` (2.1)
Alimentado por `docs/smart-memory/agents/research/`.

### Cluster `ui` — shadcn/ui (não editar)
`button` · `card` · `badge` · `separator` · `sheet` · `navigation-menu` · `tabs` · `avatar`

### Cluster `seo-infra`
`app/sitemap.ts` · `app/robots.ts` · `lib/seo.ts` · `app/not-found.tsx`

## 🗺️ Estrutura

Ver árvore completa de pastas e regras de dependência em [[architecture]].

## Mapa story → módulos

| Story | Módulos criados |
|---|---|
| 1.1 | scaffolding, `globals.css`, `lib/utils.ts`, `ui/` |
| 1.2 | cluster `shell` |
| 1.3 | cluster `content` + `types/content.ts` |
| 1.4 | Home + suas 5 seções + `shared/reveal.tsx` |
| 1.5 | `timeline.tsx` + rota `/historia` |
| 1.6 | `trophy-grid.tsx` + `stat-card.tsx` + rota `/titulos` |
| 1.7 | `arena-stats.tsx` + `arena-gallery.tsx` + rota `/estadio` |
| 1.8 | `squad-grid.tsx` + rota `/elenco` |
| 1.9 | cluster `seo-infra` + auditoria de performance/a11y |
| 2.1 | rota `/quiz` + `sections/quiz-runner.tsx` + `content/quiz.ts` + `lib/quiz.ts` + tipos Quiz* em `types/content.ts`; toca `navigation.ts` e `sitemap.ts` |

## Relacionados

- [[architecture]] · [[tech-stack]] · [[../stories/BACKLOG]]
