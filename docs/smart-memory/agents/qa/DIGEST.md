---
kind: digest
area: qa
updated: 2026-09-09
---
# DIGEST — qa

## Core (permanente)
<!-- fatos atômicos duráveis, 1 linha cada, com data. Fato novo SUBSTITUI o antigo. -->
- [2026-09-09] Quality gate do épico 1 (site Atlético Mineiro) **ENCERRADO na rodada 3/3: CONCERNS**. C1+H1–H5 (r1) e N1–N6 (r2) resolvidos e revalidados por mim. **1.1–1.9 todas em `done/`**. Zero CRITICAL/HIGH aberto.
- [2026-09-09] `next build --turbopack` **deixa** HTML pré-renderizado em `.next/server/app/*.html` — fonte de evidência estática preferencial, sem subir servidor.
- [2026-09-09] Padrão de defeito recorrente: componentes do tema escuro (`text-foreground`, `text-muted-foreground`) usados dentro de `section-light` — regra direta vence herança, contraste 1:1. Corrigido via prop `onLight` no `SectionHeading`.
- [2026-09-09] Motion com `initial` serializa `opacity:0` no SSR; o fix por `useAnimation`+`useLayoutEffect` cria o defeito espelho (flash na hidratação). Solução final: `getBoundingClientRect` síncrono — só esconde o que ainda não está no viewport.
- [2026-09-09] `scripts/generate-placeholders.mjs` não queima mais texto em nenhum tile (hero/news/galeria/timeline) — só as imagens OG mantêm texto, e ali é uso legítimo.
- [2026-09-09] Contar caracteres com `${#var}` no bash retorna **bytes**: acento UTF-8 conta 2. Usar `node -e '[...s].length'` antes de julgar orçamento de meta description.
- [2026-09-09] Lint/typecheck/build verdes (exit 0) e 5 rotas + sitemap + robots estáticas — verde de build nunca cobriu nenhum finding deste épico.

## Contexto recente (expira em ~14 dias se não renovado)
- [2026-09-09] Ciclo QA↔alpha encerrado no cap (3/3). **Para o lead adjudicar, não reabrir rodada:** M1–M5, L1–L10, R3, N7 (redação do placar CONMEBOL 1992), N8 (chars do AC3 da 1.9).
- [2026-09-09] Item que atravessou as 3 rodadas sem medição: **ninguém rodou Lighthouse/axe**. AC8/AC9/AC11 da 1.9 fecham como `[~]` honesto. Falta JSON bruto contra produção — @sites-devops no pós-deploy.
- [2026-09-09] Gate obrigatório de deploy: `NEXT_PUBLIC_SITE_URL`. Fallback é silencioso — sem a env o build publica canonical/og/sitemap em `atletico-mineiro-site.example.com`.

- [2026-09-30] Épico 2 (elenco real/Jogos/foto Arena MRV), rodada 1/3: **FAIL**. H1: atribuição CC BY-SA sem aviso de recorte. M1: datas sem `timeZone`. M2: ícone de vitória com 2.42:1. Ver [[elenco-jogos-audit]].

## Apontadores
- [[elenco-jogos-audit]]: laudo do épico 2 (elenco real + Jogos + foto Arena MRV), rodada 1.
- [[atletico-mineiro-site-audit]] — auditoria completa do épico 1, com evidência por finding e decisão por story (rodadas 1, 2 e 3).
- [[results]] — registro cronológico dos veredictos formais emitidos pelo sites-qa.

<!-- Regras: máx ~40 linhas por DIGEST · bullets ≤200 chars · nada de prosa.
     Fato novo SUBSTITUI o antigo (mesma linha, data nova) — não acumule histórico. -->
