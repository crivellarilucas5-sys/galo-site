---
title: "Smart-Memory — test"
type: index
agent: team-os (discovery)
created: 2026-09-09
updated: 2026-09-09
tags: [index, smart-memory]
---

# Smart-Memory — test

> Gerado pelo Discovery Engine do team-os em 2026-09-09 a partir do codebase. Enriqueça os pontos marcados com `<!-- TODO -->`.

## Projeto
- [[project/overview]] — Visão geral
- [[project/tech-stack]] — Stack tecnológico (detectado)
- [[project/conventions]] — Padrões de código

## Arquitetura
- [[project/architecture]] — Visão arquitetural

## Módulos
- [[project/modules]] — Mapa de módulos + God Nodes

## Stories
- [[stories/BACKLOG]] — Backlog master

### Concluídas (QA rodada 3/3 FINAL: CONCERNS — zero CRITICAL/HIGH; observações abertas anexadas em cada story)
- [[stories/done/1.1-fundacao-projeto-design-tokens]]
- [[stories/done/1.2-shell-header-footer]]
- [[stories/done/1.3-camada-conteudo-estatico]]
- [[stories/done/1.4-home]]
- [[stories/done/1.5-pagina-historia-timeline]]
- [[stories/done/1.6-pagina-titulos]]
- [[stories/done/1.7-pagina-estadio-arena-mrv]]
- [[stories/done/1.8-pagina-elenco]]
- [[stories/done/1.9-seo-tecnico-performance-a11y]] — AC8/AC9/AC11 fecham como `[~]` (Lighthouse/axe nunca medidos; JSON bruto pendente com @sites-devops)

### Ativas
- [[stories/active/2.1-pagina-quiz]] — rota /quiz (épico 2). QA rodada 1/3 deu FAIL em 2026-09-30: fato falso na Q9, além de 3 MEDIUM de a11y. AC1/AC6/AC7/AC11 OK no Chrome. Ver [[agents/qa/fotos-noticias-quiz-audit]]
- [[agents/qa/fotos-noticias-quiz-audit]] — laudo FAIL (rodada 1/3) de fotos do elenco, 6 notícias reais e /quiz: 5 HIGH de licença/conteúdo
- _(épico 1: MEDIUM/LOW remanescentes aguardam adjudicação do lead, ver [[agents/qa/atletico-mineiro-site-audit]] §R3.4)_

## Decisões
- [[decisions/ADR-001-quiz-client-island]] — /quiz SSG com ilha client única; gabarito no bundle aceito

## DIGESTs por área (porta de entrada L0)
- [[agents/research/DIGEST]] — resumo vivo da área research
- [[agents/qa/DIGEST]] — resumo vivo da área qa
- [[agents/ux/DIGEST]] — resumo vivo da área ux
- [[agents/bi/DIGEST]] — resumo vivo da área bi
- [[agents/data-engineer/DIGEST]] — resumo vivo da área data-engineer
- [[agents/data-performance/DIGEST]] — resumo vivo da área data-performance
- [[agents/data/DIGEST]] — resumo vivo da área data
- [[agents/content/DIGEST]] — resumo vivo da área content
- [[agents/design/DIGEST]] — resumo vivo da área design
- [[agents/photo/DIGEST]] — resumo vivo da área photo
- [[agents/video/DIGEST]] — resumo vivo da área video
- [[agents/publisher/DIGEST]] — resumo vivo da área publisher
- [[agents/traffic/DIGEST]] — resumo vivo da área traffic
- [[agents/copy/DIGEST]] — resumo vivo da área copy
- [[agents/automation/DIGEST]] — resumo vivo da área automation
- [[agents/portfolio/DIGEST]] — resumo vivo da área portfolio
- [[agents/processos/DIGEST]] — resumo vivo da área processos

## Inbox
- `_inbox/` — anotações baratas da sessão; consolidadas em lote no `*compact` (archivist)
