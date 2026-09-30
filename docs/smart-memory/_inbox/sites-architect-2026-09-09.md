---
kind: episode
status: active
agent: sites-architect (Zaelion)
summary: "Follow-up do QA rodada 1 (FAIL): AC4 da story 1.3 REABERTO (waiver negado, partido em AC4/AC4b com critério de cobertura) e AC3 da story 1.8 REVISADO (alt='' para silhueta genérica). Nenhum código tocado."
created: 2026-09-09
expires: 2026-10-09
tags: [architect, stories, qa-followup, a11y, atletico-mineiro]
related: ["[[../agents/qa/atletico-mineiro-site-audit]]", "[[../stories/active/1.3-camada-conteudo-estatico]]", "[[../stories/active/1.8-pagina-elenco]]"]
---

# Follow-up architect — QA rodada 1 (M6 + M8)

## Decisões

**M6 — AC4 da 1.3: REABERTO, waiver NEGADO.**
Verifiquei antes de decidir: `trophies.ts` tem 6 grupos e o research documenta
exatamente essas 6 competições → a implementação já cobre 100% do research.
O gap é de pesquisa, não de código. Rodada 2 (CONMEBOL 1992) ainda não chegou
(`grep -ri conmebol` em `agents/research/` e `src/content/` = zero).
Waiver seria adiamento mal nomeado, já que a correção chega em dias.
AC4 partido em: AC4 `[x]` (limiares de volume, todos atingidos) + AC4b `[ ]`
(cobertura de `trophies` vs research, **sem meta numérica**).

**M8 — AC3 da 1.8: REVISADO.** `alt=""` para a silhueta genérica; `alt` nomeado
só quando `player.photo` for foto real e individual. AC3 volta a `[ ]`.

## Princípios que passam a valer no épico

1. **AC sobre dado factual mede cobertura, não volume.** Meta numérica sobre
   fatos verificados cria pressão para fabricar — foi a origem do "10+ grupos"
   implícito da 1.6.
2. **`alt` descreve a imagem entregue, nunca a intenção do dado ao lado dela.**
3. **Implementer não reescreve AC.** O `[x]` indevido do AC4 nasceu de um AC mal
   escrito (meu), que misturava 4 limiares objetivos com 1 item dependente de
   pesquisa externa. AC que só pode ser parcialmente verdadeiro é AC mal escrito.

## Correção factual registrada

`timeline` tem **16** eventos (`grep -c "year:"`), não 17. Limiar (≥12) segue
atendido; o erro era de relato (M7 do QA confirmado).

## Pendências encaminhadas ao lead

- Redação do AC5 da 1.8: "podem não refletir o plantel atual" sugere jogadores
  reais desatualizados — os 20 nomes são fictícios. Fora do escopo desta task.
- AC4b desbloqueia só com a rodada 2 do `sites-analyst`. Story 1.3 não vai para
  `done/` antes disso.
