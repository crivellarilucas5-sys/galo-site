---
kind: episode
status: done
summary: "sites-dev-alpha (Novael) corrigiu H1, M1, M2, M3, L2, L3, L4 do laudo [[../agents/qa/fotos-noticias-quiz-audit]] (rodada 1/3): atribuição CC sem recorte em /elenco e news-grid, anel de foco 2.78:1 em Button, placar/troca de pergunta do quiz não anunciados por leitor de tela, erro em vermelho, radiogroup duplicado, hex fora dos tokens."
expires: 2026-12-30
---

# sites-dev-alpha — 2026-09-30 — Correção de findings a11y/licença (fotos + quiz, rodada 1/3)

Referência: [[../agents/qa/fotos-noticias-quiz-audit]] · story [[../stories/active/2.1-pagina-quiz]].

## O que foi corrigido

1. **H1** `src/app/elenco/page.tsx` e `src/components/sections/news-grid.tsx`: acrescentado
   "(recortada do original)" ao nome do fotógrafo sempre que `license.startsWith("CC")` —
   mesmo padrão já usado em `src/app/estadio/page.tsx:65`. Gate por licença porque as fotos
   "Public Domain Mark" não têm essa exigência legal.
2. **M1** `src/components/ui/button.tsx`: `focus-visible:ring-ring/50` → `focus-visible:ring-ring`
   (removido o alfa). Cálculo WCAG confirma 2.78:1→8.18:1 contra `--color-background`
   (`#0a0a0a`). Afeta todos os botões do site (era o pedido explícito do laudo, que aponta
   o arquivo direto — não é violação do OUT "não mexer em ui/" da story 2.1, que é escopo
   daquela story, não desta correção de QA).
3. **M2/M3** `src/components/sections/quiz-runner.tsx`: região `aria-live="polite"
   aria-atomic="true"` única e persistente (`sr-only`, texto num `useState`), renderizada
   como primeiro filho nas duas árvores de retorno (pergunta/resultado). Como o `div` raiz
   já era reaproveitado pelo React entre os dois estados (confirmado pelo QA), o atributo
   `aria-live` nunca nasce no mesmo commit do conteúdo — só o texto muda, num efeito
   disparado depois do commit de foco. Anuncia "Pergunta N de M." e "Resultado: X de Y.
   {faixa}." (com "de", não "/", só no anúncio — o texto visível "X / Y" não mudou, a
   divergência com a letra do AC7 é a L5, que é do architect).
4. **L2/L3/L4** (bônus, mesmo arquivo): erro "Escolha uma alternativa" trocou
   `text-error`→`text-foreground` (vermelho só em ícone/borda, nunca texto de corpo,
   `quiz-design.md`); removido `role="radiogroup"` duplicado sem nome (o `fieldset` já é o
   grupo nomeado via `legend`), `aria-describedby` do erro moveu pro `fieldset`; novo token
   `--color-surface-raised: #1a1a1a` em `globals.css` (valor já especificado em
   `quiz-design.md` §1.3) substitui o hex solto `bg-[#1a1a1a]`.

Não tocado (pesq corrige em paralelo): H2/H3 (fotos Reinier/Fred), H4/H5 (datas/fatos),
L1 (`factRef` quebrado), L5 (architect reconcilia AC7/AC8 vs `quiz-design.md`).

`pnpm lint`, `pnpm typecheck`, `pnpm build` — exit 0, 13/13 páginas estáticas, `/quiz` ○ 5.37 kB.

## Padrão reaproveitável

Ao adicionar `aria-live` a um nó que o React reaproveita entre duas árvores condicionais
(mesmo tipo de elemento, mesma posição), nunca deixar o atributo nascer no mesmo commit em
que o texto que ele deve anunciar aparece — em vez disso, renderizar a região sempre
(incondicional, mesma posição nas duas árvores) e só mudar o texto via `state` num efeito
posterior. Ver [[../agents/qa/fotos-noticias-quiz-audit]] M2.
