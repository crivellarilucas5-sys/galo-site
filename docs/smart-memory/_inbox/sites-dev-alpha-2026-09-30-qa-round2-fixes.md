---
kind: episode
status: done
summary: "sites-dev-alpha (Novael) corrigiu os 3 findings da rodada 1 de QA no épico 2 (elenco/jogos/Arena MRV): H1 (atribuição CC BY-SA sem indicar recorte), M1 (datas/horas sem timeZone, quebrariam em build UTC) e M2 (contraste do ícone de vitória 2.42:1)."
expires: 2026-12-30
---

# sites-dev-alpha — 2026-09-30 — Correção rodada 2/3 de QA (épico 2)

Referência: [[../agents/qa/elenco-jogos-audit]] (fail-round-1).

## O que foi corrigido

1. **H1 (HIGH, `src/app/estadio/page.tsx:65`)**: a legenda de atribuição da foto do
   hero da Arena MRV agora diz "Foto: Felipebini (recortada do original), licença
   CC BY-SA 4.0 [...]" — atende CC BY-SA 4.0 §3(a)(1)(B) (indicar que o material foi
   modificado).
2. **M1 (`src/components/sections/next-match.tsx:51-58` e `:94-101`, e também
   `src/components/sections/news-grid.tsx:43-48` que tinha o mesmo bug e não estava
   no escopo original do QA)**: todos os `Intl.DateTimeFormat` de data/hora exibidos
   no site agora passam `timeZone: "America/Sao_Paulo"` explícito. Sem isso, um build
   em servidor UTC (Vercel) mostrava dia/hora errados (ex.: 17/09 virava 18/09, e
   "16:00" virava "19:00"). Verificado rebuildando com `TZ=UTC pnpm build` e grepando
   `.next/server/app/*.html` — datas e horários saem corretos mesmo sob UTC.
3. **M2 (`next-match.tsx`, `RESULT_CONFIG.vitoria.iconClass`)**: ícone de vitória
   (`ArrowUp`) trocado de `text-primary` (dourado, 2.42:1 sobre o chip branco) para
   `text-fg-on-light` (`#0A0A0A`, ~19.5:1). A borda dourada (`border-primary`) do chip
   foi mantida como reforço visual, sem problema de contraste (não é elemento de
   texto/ícone WCAG 1.4.11).

## Não corrigido nesta rodada (LOW, fora do pedido do lead)
L1 (scroll horizontal sem foco por teclado), L2 (fundo opaco da silhueta), L3 (borda
do card "Próximo jogo" sem espessura), L4 (leitura do "×" pelo leitor de tela), L5
(alt do hero) — ficam a critério do lead/QA para rodadas futuras.

## Validação
`pnpm lint` (0 erros), `pnpm typecheck` (0 erros), `pnpm build` (12/12 páginas
estáticas) — rodado duas vezes, uma no TZ local (BRT) e uma com `TZ=UTC`, para provar
a correção do M1 sob a condição que o QA reproduziu.

## Relacionados
- [[../agents/qa/elenco-jogos-audit]] — achados originais (rodada 1)
- [[sites-dev-alpha-2026-09-30]] — sessão original que introduziu o código corrigido aqui
