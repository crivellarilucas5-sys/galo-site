---
name: project-grid-area-no-order
description: Como reordenar visualmente blocos entre mobile/desktop sem usar a propriedade CSS `order` (proibida por design-direction §4.4) — padrão usado na seção "Jogos".
metadata:
  type: project
---

Quando a UX pede DOM/ordem de leitura fixa (prioridade de conteúdo) mas layout visual diferente por breakpoint (ex.: bloco "destaque" à direita em desktop, mas primeiro no DOM/mobile), usar `grid-template-areas` com `@utility` no `globals.css` + `style={{ gridArea: "nome" }}` inline nos wrappers — nunca a propriedade `order`. `grid-area`/`grid-template-areas` reposiciona visualmente sem mexer em DOM/tab order, e não é a propriedade que a regra 4.4 de design-direction.md proíbe (só proíbe `order`).

Exemplo real: `next-match.tsx` — JSX em ordem `next → results → upcoming` (prioridade), `.jogos-grid` no `globals.css` faz `grid-template-areas: "next" "results" "upcoming"` no mobile e `"results next" "upcoming next"` em `@variant md`, com `next` ocupando as duas linhas à direita.

**Why:** design-direction.md §4.4 exige ordem de tab/leitura == ordem de prioridade em todos os breakpoints; `order` quebra isso, `grid-area` não.
**How to apply:** sempre que uma seção pedir "destaque à direita em desktop, primeiro em mobile" (ou padrão similar), replicar esse mecanismo em vez de flex + `order`. Ver [[project_perf_pattern]] para o padrão irmão de Reveal/RevealGroup usado nos mesmos componentes.
