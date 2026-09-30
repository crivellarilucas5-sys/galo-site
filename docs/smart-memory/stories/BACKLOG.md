---
title: "Backlog — Site Galo"
type: backlog
agent: sites-architect (Zaelion)
created: 2026-09-09
updated: 2026-09-30
summary: "Épico 1 (site institucional, 9 stories concluídas) + Épico 2 (engajamento): story 2.1 /quiz ativa para o sites-dev-alpha."
tags: [backlog, sites]
---

# Backlog

## Épico 1 — Site institucional do Galo (Next.js estático)

| Story | Título | Complexidade | Status | Owner |
|---|---|---|---|---|
| 1.1 | [[active/1.1-fundacao-projeto-design-tokens\|Fundação do projeto e design tokens]] | M | active | sites-dev-alpha |
| 1.2 | [[active/1.2-shell-header-footer\|Shell do site — Header, navegação e Footer]] | M | active | sites-dev-alpha |
| 1.3 | [[active/1.3-camada-conteudo-estatico\|Camada de conteúdo estático tipado]] | M | active | sites-dev-alpha |
| 1.4 | [[active/1.4-home\|Home — hero, próximo jogo, notícias e prévias]] | L | active | sites-dev-alpha |
| 1.5 | [[active/1.5-pagina-historia-timeline\|Página História — linha do tempo]] | M | active | sites-dev-alpha |
| 1.6 | [[active/1.6-pagina-titulos\|Página Títulos — conquistas do clube]] | M | active | sites-dev-alpha |
| 1.7 | [[active/1.7-pagina-estadio-arena-mrv\|Página Estádio — Arena MRV]] | M | active | sites-dev-alpha |
| 1.8 | [[active/1.8-pagina-elenco\|Página Elenco — time atual]] | S | active | sites-dev-alpha |
| 1.9 | [[active/1.9-seo-tecnico-performance-a11y\|SEO técnico, performance e acessibilidade]] | M | active | sites-dev-alpha |

**Validação:** todas as 9 stories passaram no 5-Point Checklist com **GO 5/5** (Zaelion, 2026-09-09).

## Épico 2 — Engajamento do torcedor

| Story | Título | Complexidade | Status | Owner |
|---|---|---|---|---|
| 2.1 | [[active/2.1-pagina-quiz\|Página Quiz — perguntas sobre o Galo com resultado por faixa]] | M | active | sites-dev-alpha |

**Validação:** 2.1 GO 5/5 (Zaelion, 2026-09-30). Decisão associada: [[../decisions/ADR-001-quiz-client-island]]. Depende do entregável da pesquisa `agents/research/quiz-perguntas.md` pra fechar o AC5.

## Ordem de execução recomendada

```
1.1  →  1.3  →  1.2  →  1.4  →  [1.5 · 1.6 · 1.7 · 1.8 em paralelo]  →  1.9
```

- **1.1 é bloqueante absoluta** — nada roda antes dela.
- **1.3 antes de 1.2**: o header/footer consomem `content/navigation.ts` e `content/club.ts`.
- **1.4 antes de 1.5–1.8**: a Home cria `Reveal`, `SectionHeading` e `StatCard`, reutilizados pelas demais.
- **1.9 por último**: audita o conjunto.

## Fontes de insumo externas às stories

| Insumo | Path | Dono |
|---|---|---|
| Fatos históricos, títulos, Arena | `docs/smart-memory/agents/research/` | sites-analyst (pesq) |
| Direção visual, paleta, tipografia | `docs/smart-memory/agents/ux/` | sites-ux (ux) |

## Relacionados

- [[../project/architecture]] · [[../project/tech-stack]] · [[../project/modules]]
