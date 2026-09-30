---
kind: note
status: active
agent: sites-qa (Axilun)
summary: "Registro cronológico dos veredictos formais de quality gate emitidos pelo sites-qa — um bloco por rodada, com destino de cada story."
created: 2026-09-09
tags: [qa, quality-gate, veredictos]
related: ["[[atletico-mineiro-site-audit]]", "[[DIGEST]]"]
---

# Veredictos de quality gate — sites-qa (Axilun)

Registro append-only. Evidência por finding vive em [[atletico-mineiro-site-audit]].

## Épico 1 — Site Atlético Mineiro

### Rodada 1 — 2026-09-09 · ❌ FAIL
- **Bloqueadores:** 1 CRITICAL (C1, `<h2>` branco sobre branco na Home) + 5 HIGH
  (H1 imagem↔notícia, H2 texto queimado nos heros, H3 `opacity:0` no SSR,
  H4 domínio placeholder, H5 `sameAs` com `TODO`). 8 MEDIUM, 10 LOW.
- **Ressalvas do implementer:** LCP **não sustentada** como diagnóstico completo
  (causa estrutural real = H3); fidelidade dos 6 grupos de `trophies.ts` **sustentada**.
- **Destino:** 1.1, 1.2 → `done/` (CONCERNS) · 1.3–1.9 → `active/` (FAIL).

### Rodada 2 — 2026-09-09 · ⚠️ CONCERNS
- **Resolvidos e revalidados por mim** (HTML pré-renderizado do build + CSS
  compilado + leitura visual das imagens + `md5sum` + conferência contra o research):
  C1 (contraste 1:1 → **19,8:1**), H1, H2, H3 (`opacity:0` 12/16/7/10/20 → **0/0/0/0/0**),
  H4 (`.env.example` + 3 consumidores), H5 (URLs conferem com o research rodada 2),
  M6 (architect negou waiver e reabriu como AC4b), M8, AC4b da 1.3, AC3 e AC5 da 1.8.
- **Abertos, não bloqueantes:** M1–M5 e LOWs da rodada 1 (declarados pelo implementer
  como não corrigidos) + 6 findings novos: N1 (agregado da CONMEBOL 1992
  aritmeticamente impossível), N2 (novo `Reveal` esconde conteúdo já pintado na
  hidratação), N3 (`alt` descritivo em imagens agora genéricas), N4 (texto queimado
  na galeria/timeline), N5 (`description` da `/elenco` contradiz o AC5), N6 (JSON-LD
  `SportsTeam` no domínio do site de torcedor).
- **Destino:** 1.3–1.8 → `done/` (CONCERNS) · **1.9 → `active/`** — veredicto
  ⚠️ **NÃO VERIFICÁVEL**: AC8/AC11 seguem `[x]` com Lighthouse medido **antes** das
  correções e AC7 registra `h3(×17)` onde o build entrega 16.
- **Falta para PASS da 1.9:** rodada dedicada de Lighthouse/axe com JSON bruto anexado
  (ou AC8/AC11 rebaixados a `[~]`) + correção da contagem do AC7.
- **Ciclo:** rodada 2 de 3. Nenhum novo FAIL consumido.

### Rodada 3 (FINAL) — 2026-09-09 · ⚠️ CONCERNS
- **Tríade rodada por mim:** `pnpm lint` exit 0, `pnpm typecheck` exit 0,
  `pnpm build` exit 0 (5 rotas + sitemap + robots + 404 + ícones `○` estáticas,
  First Load JS 174–179 kB).
- **N1–N6 confirmados resolvidos, com evidência minha:** N1 agregado da CONMEBOL
  1992 = **2×1**, batendo com o research corrigido e fechando a aritmética (zero
  "3×1" no HTML); N2 `reveal.tsx` ganhou `isInInitialViewport()` e o
  `controls.set(hidden)` deixou de ser incondicional — **sem regredir H3**
  (`opacity:0`/`translateY`/`style-opacity` = 0/0/0 nas 5 rotas); N3 **39 de 39**
  `<img>` com `alt` deliberado, zero `alt` descritivo em arte genérica; N4 texto
  queimado ausente — **abri 5 imagens** (galeria-1, galeria-4, fundacao-1908,
  arena-mrv-2023, noticia-3), todas limpas; N5 `description` da `/elenco`
  reescrita, **158 chars** dentro do 50–160 do AC3; N6 JSON-LD com `WebSite`
  detendo o `url` e `SportsTeam` só com `sameAs`, sob `about`.
- **R1/R2 (registro da 1.9) fechados na forma que especifiquei na rodada 2:**
  AC7 recontado para `h3(×16)` (confere com meu build) e AC8/AC9/AC11 rebaixados
  a `[~]`, com a tabela de Lighthouse marcada OBSOLETA e a estimativa estática
  declarando que não é medição — recalculei essa tabela e **bate número a número**.
- **Zero findings CRITICAL/HIGH abertos.** C1/H1/H2/H3 reconfirmados sem regressão.
- **Novos, ambos LOW:** N7 (placar da CONMEBOL 1992 fecha na aritmética mas a
  redação não diz quem venceu cada jogo — leitor soma 3×0), N8 (AC3 da 1.9 cita
  "127–149 chars"; o real é 120–158, e o número herdado era byte count meu).
- **Continua NÃO VERIFICÁVEL:** AC8/AC9/AC11 — ninguém rodou Lighthouse/axe em
  nenhuma das 3 rodadas. Fecham por honestidade de registro, não por medição.
  **Falta:** Lighthouse mobile + axe com JSON bruto, contra produção (@sites-devops).
- **Destino:** **1.9 → `done/` (CONCERNS)**. Épico 1 inteiro em `done/`.
- **Ciclo encerrado — cap de 3 rodadas atingido.** M1–M5, L1–L10, R3, N7, N8 e a
  ressalva do H4 (fallback silencioso de `NEXT_PUBLIC_SITE_URL`) ficam para
  **adjudicação do lead**, não para uma 4ª rodada.

---

## 2026-09-30: Épico 2, elenco real + seção Jogos + foto Arena MRV (rodada 1/3): FAIL

- **Laudo:** [[elenco-jogos-audit]]. Tríade 0/0/0 no meu build, 12/12 páginas estáticas.
- **Confirmados:** dourado de meio-campo com 6.38:1 (considerando o `opacity-90`); crop sem rosto identificável (conferi pixels nativos, `srcset` só redimensiona); autor e licença batem com a API do Commons; `alt=""` 32/32; 32 cards iguais ao research; V/E/D por ícone + `sr-only`; `<h2>Jogos</h2>`; disclaimer "real"; `opacity:0` = 0.
- **[HIGH] H1:** atribuição sem indicação de modificação (recorte), exigida pela CC BY-SA 4.0 §3(a)(1)(B), `estadio/page.tsx:63-83`.
- **[MEDIUM]** M1: `Intl.DateTimeFormat` sem `timeZone` (build em UTC publica 18/09 e "às 19:00"). M2: ícone de vitória dourado sobre branco com 2.42:1.
- **[LOW]** L1: scroll horizontal sem foco. L2: PNG da silhueta com fundo opaco. L3: `border-primary` sem `border`. L4: "×" no `sr-only`. L5: alt "durante" vs "before".

## 2026-09-30: Épico 2 (rodada 2/3): FAIL (regressão introduzida na correção)

- **Laudo:** [[elenco-jogos-audit]] §Rodada 2. Tríade 0/0/0 (lint, typecheck e build com `TZ=UTC`), mais um build no fuso local. As datas da home saíram idênticas nos dois (`diff` vazio).
- **Resolvidos (conferi no HTML):** H1: a legenda agora diz "(recortada do original)". M1: 17/09 e "às 16:00" em UTC e em BRT. M2: ícone de vitória `text-fg-on-light`, com 19.80:1.
- **[MEDIUM] R2-1, regressão:** o alpha estendeu o M1 para `news-grid.tsx:43-48`, fora do escopo. As datas de notícia são date-only (`"2026-03-25"`), e `new Date()` lê esse formato como meia-noite UTC. Com `America/Sao_Paulo`, as **6 notícias** mostram o dia anterior **em qualquer build** (por exemplo, `<time dateTime="2026-03-25">24 de março de 2026`). Antes, o build UTC (Vercel) mostrava as datas certas. **Correção:** `timeZone: "UTC"` nesse formatador.
- **L1 a L5:** sem mudança e sem piora. Ficam para o lead adjudicar.
- **Próxima é a rodada 3/3, a última.**

## 2026-09-30: Épico 2 (rodada 3/3, FINAL): CONCERNS (verificação A; a entrada seguinte é a B, de um despacho duplicado, e as duas convergem)

- **Laudo:** [[elenco-jogos-audit]] §Rodada 3. Lint 0, typecheck 0, `TZ=UTC` build 0 (12/12) e build local 0 (12/12).
- **R2-1 resolvido:** `news-grid.tsx` usa `timeZone: "UTC"`. As 6 `<time>` batem com `news.ts` e são idênticas em UTC e BRT. As datas de jogo (13/09, 17/09, 24/09, 11/10, 18/10, 25/10 e "04 de outubro às 16:00") não regrediram.
- **Nenhum CRITICAL/HIGH/MEDIUM aberto.** L1 a L5 estão abertos e vão para adjudicação do lead. Lighthouse/axe não foram medidos.
- **Ambiente:** um `next build` concorrente de outro processo apagou `.next` durante o meu build (ENOENT). Precisei repetir. Builds devem ser serializados.
- **Ciclo encerrado, com o cap de 3 rodadas atingido.**

## 2026-09-30: Épico 2 (rodada 3/3): CONCERNS. Ciclo encerrado.

- **Laudo:** [[elenco-jogos-audit]] §Rodada 3.
- **Evidência:** lint e typecheck exit 0. Builds UTC e BRT **isolados** (descartei uma tentativa corrompida por outro `next build` concorrente no mesmo `.next`), 12/12 cada, com `diff` vazio nas datas da home.
- **R2-1 resolvido:** `news-grid` usa `timeZone: "UTC"`, e as 6 `<time>` mostram texto igual ao `dateTime`. H1, M1 e M2 continuam resolvidos.
- **Para o lead adjudicar:** L1 a L5, o padrão de atribuição fixo no código (sem campo em `ImageAttribution`) e Lighthouse/axe sem medição.
- **Push:** o diretório não é um repositório git (relato do alpha), então o devops precisa resolver antes.

## 2026-09-30: Fotos do elenco + notícias reais + /quiz, story 2.1 (rodada 1/3): FAIL

- **Laudo:** [[fotos-noticias-quiz-audit]]. Lint 0, typecheck 0, build 0 (13/13, `/quiz` `○`). Chrome 154 real via CDP contra `next start` (o dev server `:3000` do lead estava em 500).
- **Quiz OK no navegador:** AC1 (768–1440px numa linha só e Sheet de 320–767px, sem overflow), AC6 (6 partidas inteiras só com teclado), AC7 (limiares de 50% e 80% exatos), AC11 (console vazio em 6 rotas). No AC9 o foco está correto em todas as transições.
- **[HIGH]** H1: recorte CC 4.0 sem aviso de modificação (a regra da Arena não foi estendida). H2: a foto de "Reinier" mostra Simakan e Szoboszlai. H3: a foto da notícia do Fred mostra só o calção, e o `alt` diz "Fenerbahçe" (a imagem é do Man United). H4: "primeira partida" na notícia (a fonte diz terceira) e datas erradas (Lodi 27/12/2025, Fred 14/08/2026). H5: a Q9 diz "segundo título" da Recopa (foi o primeiro).
- **[MEDIUM]** M1: anel de foco do Button com 2.78:1. M2: o placar do resultado não é anunciado. M3: a troca de pergunta não é anunciada pela região live. **[LOW]** L1–L6.
- **Destino:** a story 2.1 continua em `active/`. As notícias e fotos voltam para o alpha, e o research para o pesq.
