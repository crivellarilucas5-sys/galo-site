---
kind: episode
status: done
agent: sites-qa (Axilun)
summary: "Auditoria de quality gate do site do Atlético Mineiro (épico 1, stories 1.1–1.9). Rodada 1: FAIL (1 CRITICAL + 5 HIGH). Rodada 2: CONCERNS — C1/H1/H2/H3/H4/H5 resolvidos. Rodada 3 (final, cap=3): CONCERNS — N1–N6 e as pendências de registro da 1.9 confirmados resolvidos com evidência própria; zero CRITICAL/HIGH aberto; MEDIUM/LOW remanescentes vão para adjudicação do lead."
created: 2026-09-09
tags: [qa, quality-gate, sites, atletico-mineiro, a11y, seo, performance]
related: ["[[DIGEST]]", "[[../ux/design-direction]]", "[[../ux/components]]", "[[../research/atletico-mineiro-facts]]"]
---

# Auditoria QA — Site institucional/torcedor Atlético Mineiro

**Reviewer:** Axilun (sites-qa) · **Data:** 2026-09-09
**Escopo:** stories 1.1 a 1.9 (épico 1), implementadas por sites-dev-alpha (Novael)
**Reporte do implementer:** `DONE_WITH_CONCERNS` (LCP + fidelidade de `trophies.ts`)

## VEREDICTO: ❌ FAIL

Bloqueadores: **1 CRITICAL + 5 HIGH**. O CRITICAL é uma falha de contraste WCAG AA
visível na página inicial, o que contradiz diretamente os números de
"Lighthouse Accessibility = 100 nas 5 rotas" registrados nos AC10/AC11 das
stories 1.4, 1.6, 1.8 e 1.9.

---

## 1. Método e evidência

Toda evidência abaixo foi produzida por mim nesta sessão. Nenhum número do
Dev Agent Record foi aceito sem verificação independente.

| Verificação | Comando/fonte | Resultado |
|---|---|---|
| Lint | `pnpm lint` | exit 0, sem erro/warning |
| Typecheck | `pnpm typecheck` (`tsc --noEmit`) | exit 0 |
| Build | `pnpm build` (`next build --turbopack`) | exit 0; 5 rotas + `/sitemap.xml` + `/robots.txt` todas `○` estáticas; First Load JS 173–178 kB |
| HTML servido | `curl` nas 5 rotas (servidor do lead em `localhost:3000`) | metadata, headings, alts, JSON-LD, estilos inline |
| CSS servido | `curl` no chunk CSS do app | cascade real de `.section-light` (l.1943, `@layer base`-adjacente) vs `.text-foreground` (l.2420, `@layer utilities`) |
| Imagens | leitura visual dos JPG/PNG em `public/` | texto queimado nos placeholders |
| Fidelidade factual | `src/content/*` × `agents/research/atletico-mineiro-facts.md` | linha a linha |

**Não verificado (declarado):** não rodei Lighthouse nem naveguei com browser real.
Números de Performance/LCP/CLS do Dev Agent Record permanecem **não confirmados por mim**
— ver §5. Nenhum veredicto abaixo depende deles.

---

## 2. CRITICAL

### C1 — Título de seção invisível na Home (branco sobre branco)

**Onde:** `src/components/sections/trophy-highlights.tsx:18` + `:21`, via
`src/components/shared/section-heading.tsx:36`.

`TrophyHighlights` renderiza `<section className="section-light">` (fundo
`--color-bg-light` = `#ffffff`) e coloca dentro um `<SectionHeading>` cujo
`<h2>` traz a classe `text-foreground` (`--color-foreground` = `#ffffff`).

**Evidência dura (HTML servido):**
```html
<section class="section-light py-16 md:py-24 lg:py-32">
  ...<h2 class="mt-2 font-display text-3xl ... text-foreground uppercase lg:text-4xl">Uma galeria de conquistas</h2>
```

**Evidência dura (CSS servido):**
```css
/* linha 1943 */ .section-light { background-color: var(--color-bg-light); color: var(--color-fg-on-light); }
/* linha 2420, dentro de @layer utilities */ .text-foreground { color: var(--color-foreground); }
/* --color-foreground: #fff · --color-bg-light: #fff */
```
A `color` de `.section-light` é **herança** (declarada no `<section>` pai); a de
`.text-foreground` é regra **direta no `<h2>`**. Regra direta sempre vence
herança. Resultado: **contraste 1:1 — texto invisível**.

**Impacto:** falha WCAG 2.2 SC 1.4.3 (Contrast Minimum) no `<h2>` de uma das
cinco seções da página inicial. Também invalida como reportado o AC11 da 1.9
("zero violações de contraste reportadas pelo axe-core") e o AC11 da 1.4.

**Correção sugerida (não implementada por mim):** `SectionHeading` precisa de
variante `on-light` (ou herdar `color` em vez de fixar `text-foreground`), e o
mesmo cuidado vale para `description`, que usa `text-muted-foreground`
(`#B3B3B3` sobre `#FFF` = **1,98:1**, falharia igualmente se essa prop fosse usada
dentro de `section-light`).

---

## 3. HIGH

### H1 — Imagens de notícia contradizem o título e o `alt` do próprio card
**Onde:** `scripts/generate-placeholders.mjs:158-170` × `src/content/news.ts`.

Os placeholders têm o rótulo **queimado dentro do JPG**, e a ordem dos rótulos
não corresponde à ordem dos itens de `news.ts`:

| Card | Título exibido | `imageAlt` | Texto visível na imagem | OK? |
|---|---|---|---|---|
| 1 | A tradição do Galo, viva desde 1908 | "…sobre a fundação do clube" | **TREINO NO CT** | ✗ |
| 2 | Bastidores: um dia de treino no CT | "…sobre o centro de treinamento" | BASTIDORES | ~ |
| 3 | Dia de jogo: a atmosfera da Arena MRV | "…sobre dia de jogo na arena" | DIA DE JOGO | ✓ |
| 4 | Categorias de base | "…sobre as categorias de base" | **ENTREVISTA COLETIVA** | ✗ |
| 5 | A maior torcida de Minas Gerais | "…sobre a torcida do clube" | **CATEGORIAS DE BASE** | ✗ |
| 6 | Clássico Mineiro | "…sobre o Clássico Mineiro" | **AQUECIMENTO** | ✗ |

4 de 6 cards exibem uma imagem cujo conteúdo visível desmente o texto ao lado e o
`alt`. Falha WCAG 1.1.1 (o alternativo textual não corresponde à imagem) e é
erro editorial visível a olho nu na Home.

### H2 — Heros trazem texto queimado que duplica o texto HTML sobreposto
**Onde:** `public/images/hero/hero-torcida.jpg`, `public/images/arena/arena-hero.jpg`.

`hero-torcida.jpg` contém, no canto inferior esquerdo, "DESDE 1908" + "GALO";
`arena-hero.jpg` contém "CASA DO GALO" + "ARENA MRV". O componente `Hero`
(`src/components/sections/hero.tsx:48-57`) e a `/estadio`
(`src/app/estadio/page.tsx:53-59`) posicionam o eyebrow e o `<h1>` **exatamente
na mesma região** (`items-end` + `container-site` + `pb-16`), com o mesmo texto.
Resultado esperado: texto duplicado/sobreposto no primeiro viewport das duas
rotas mais importantes do site.

Também é imagem-de-texto (WCAG 1.4.5) e o `alt` ("Ilustração gerada
representando a atmosfera de torcida do Galo") não menciona o texto contido.

> Confirmação visual pendente: peço ao lead um olhar (ou screenshot) da Home e da
> `/estadio` no topo. A geometria do código e o conteúdo das imagens tornam a
> sobreposição altamente provável, mas o crop de `object-cover` varia com a
> proporção da viewport.

### H3 — Conteúdo sai do servidor com `opacity:0` e só aparece se o JS rodar
**Onde:** `src/components/shared/reveal.tsx` (`Reveal`, `RevealGroup`, `RevealItem`).

Motion serializa o estado `initial` como estilo inline no HTML do servidor.
Medido via `curl` no HTML entregue:

| Rota | elementos com `opacity:0` no HTML |
|---|---|
| `/` | 12 |
| `/historia` | 16 |
| `/titulos` | 7 |
| `/estadio` | 10 |
| `/elenco` | 20 |

Amostra literal: `opacity:0;transform:translateY(24px)`.

Consequências:
1. **Sem JS (ou com o bundle falhando), o conteúdo principal do site é invisível** —
   `/titulos` mostra apenas o `<h1>`, `/elenco` idem. O texto existe no DOM (crawler
   lê), mas o usuário não vê nada.
2. **É causa estrutural real de LCP alto** (ver §5): em rotas sem hero, o maior
   elemento pintável está dentro de um `RevealItem` e só se torna pintável após
   hidratação de React + Motion + disparo do IntersectionObserver.

`prefers-reduced-motion` não salva o caso: `useReducedMotion()` é hook de cliente,
o HTML do servidor sai com `opacity:0` de qualquer forma.

### H4 — Canonical, OG e sitemap apontam para domínio placeholder
**Onde:** `src/app/layout.tsx:28`, `src/app/sitemap.ts:3`, `src/app/robots.ts:3`.

Sem `NEXT_PUBLIC_SITE_URL`, o fallback é
`https://atletico-mineiro-site.example.com`. Confirmado no HTML servido das 5 rotas:
`<link rel="canonical" href="https://atletico-mineiro-site.example.com/...">`,
`og:url` e `og:image` idem, e o `sitemap` aponta para o mesmo host.

A variável **não está documentada em lugar nenhum** — não há `.env.example`, e o
grep por `NEXT_PUBLIC_SITE_URL` em `*.md` retorna zero. Um build de produção que
esqueça a env publica canonical cross-domain para um domínio reservado (`example.com`),
o que na prática impede a indexação do site inteiro.

Ação: documentar a env e torná-la gate obrigatório de deploy (**@sites-devops**),
ou fazer o build falhar quando ela estiver ausente em produção.

### H5 — `sameAs` do JSON-LD publica URLs explicitamente não verificadas
**Onde:** `src/content/club.ts:17-38` → `src/app/layout.tsx:75`.

O próprio arquivo carrega `// TODO(pesq): confirmar URLs oficiais das redes
sociais do clube`, e essas URLs são publicadas como dado estruturado em todas as
rotas. Confirmado no HTML:
`"sameAs":["https://www.instagram.com/atleticomg/","https://x.com/Atletico","https://www.youtube.com/atletico","https://www.facebook.com/Atletico"]`.

A nota técnica da story 1.9 é explícita: *"Não inventar `sameAs`"*. `sameAs` é
uma afirmação de identidade legível por máquina sobre um clube real; pelo menos
`youtube.com/atletico` e `facebook.com/Atletico` têm formato suspeito.

Ação: remover `sameAs` até a pesquisa confirmar as URLs, ou pedir confirmação ao
**sites-analyst**. Manter `TODO` no dado e publicá-lo mesmo assim não é aceitável.

---

## 4. MEDIUM

| # | Finding | Local |
|---|---|---|
| M1 | `og:title` da Home duplica o sufixo: "Galo — Atlético Mineiro \| Site de torcedor **\| Galo — Atlético Mineiro**" (divergente do `<title>`, que sai correto). A Home passa o título completo e `buildMetadata` concatena o sufixo de novo | `src/app/page.tsx:15` + `src/lib/seo.ts:27` |
| M2 | Data/hora do próximo jogo formatada sem `timeZone`. `Intl.DateTimeFormat("pt-BR", …)` roda no build e usa o TZ da máquina. Local (America/Sao_Paulo) rendeu "domingo, 20 de setembro às 16:00"; um build em UTC (padrão de CI/Vercel) renderá **19:00** | `src/components/sections/next-match.tsx:12-19` |
| M3 | Ícones do acento dourado a 16px sobre fundo branco: `#C9A227` vs `#FFFFFF` = **2,42:1**. `design-direction` §4.1 autoriza o acento apenas em ícones **≥24px** | `next-match.tsx:40,46,52`; `trophy-highlights.tsx:27` |
| M4 | Foco dos `Button` shadcn foge do padrão da UX: `.outline-none` (`@layer utilities`, l.2769) vence o `:focus-visible { outline: 2px solid var(--color-ring) }` global (`@layer base`, l.925). O substituto `ring-ring/50` rende **2,77:1** (<3:1); só a `focus-visible:border-ring` de 1px salva o indicador. Afeta o CTA da Hero e o gatilho do menu mobile | `src/components/ui/button.tsx:7` × `globals.css:91` |
| M5 | Cards de notícia têm `slug`, título, resumo e data mas **não são clicáveis** e não existe rota de artigo — affordance de card editorial sem destino | `src/components/sections/news-grid.tsx:20-51` |
| M6 | AC4 da story 1.3 está marcado `[x]` enquanto o próprio texto do AC diz "**`trophies` parcialmente atendido**". A nota da 1.6 ("não os 10+ sugeridos implicitamente pelo volume da 1.3") indica que o critério original foi reescrito pelo implementer. Mérito da decisão está correto (ver §6.2), mas o status precisa ser `[~]` + **WAIVED formal do lead/architect**, não `[x]` | `stories/1.3` AC4 |
| M7 | Números do Dev Agent Record não conferem: `timeline` tem **16** eventos (contados no array e no HTML: 16 `<li>`, 16 `<h3>`), reportado como "17 entregues" (1.3 AC4) e "h3(×17)" (1.9 AC7). O requisito (≥12) segue atendido — o problema é a confiabilidade do relatório | `content/timeline.ts` |
| M8 | `alt` das 20 fotos do elenco = nome do jogador, mas **todas** as imagens são a mesma silhueta genérica (`placeholder-silhueta.png`, verificada visualmente). O alternativo textual descreve algo que a imagem não mostra e duplica o nome já presente no texto ao lado. Observo que o AC3 da 1.8 **induziu** esse comportamento — a correção deve começar pelo AC | `squad-grid.tsx:21` / `stories/1.8` AC3 |

---

## 5. Ressalva #1 do alpha — LCP: **NÃO SUSTENTADA como diagnóstico completo**

O alpha atribuiu o LCP de 2,7–3,5s integralmente ao modelo de throttling simulado
do Lighthouse contra `localhost` sem CDN.

**O que confirmei a favor dele:** payload de imagem **não** é o gargalo. Medi os
arquivos de origem: hero da Home 39 KB, hero da arena 47 KB, galeria 27–33 KB cada,
timeline 12–15 KB, OG 35–42 KB. `public/images` inteiro = 560 KB. A hipótese
"imagem pesada" da nota técnica da 1.9 está descartada com evidência.

**O que não sustenta a atribuição:** existe uma causa estrutural, local e
corrigível — o **H3**. Em `/titulos`, `/historia` e `/elenco` não há hero; o maior
elemento pintável está dentro de um `RevealItem` que o servidor entrega com
`opacity:0`. Elemento com `opacity:0` não conta como LCP candidate: o LCP dessas
rotas está atrelado a "baixar 173–178 kB de JS → hidratar → Motion montar →
IntersectionObserver disparar", não à latência de rede simulada. Isso explica por
que rotas sem imagem alguma (`/titulos`, 2,7s) ficaram no mesmo patamar de rotas
com hero.

**Veredicto do item:** CONCERNS, não aceito como waiver. O correto é corrigir H3
e **só então** revalidar em produção. Fechar essa pendência hoje como "distorção de
ambiente" enterraria um problema real de renderização atrás de um problema real de
medição.

**Ainda não verificável por mim:** os scores absolutos (Performance 90–95,
Accessibility 100, CLS 0). Não rodei Lighthouse. Registro que o "Accessibility = 100"
é **incompatível** com C1 — axe-core reporta contraste de texto quando o fundo é uma
cor sólida resolvível, que é o caso. Recomendo rerodar a auditoria após as correções
e anexar o JSON bruto do Lighthouse ao Dev Agent Record.

## 6. Ressalva #2 do alpha — Fidelidade dos 6 grupos de `trophies.ts`: **SUSTENTADA**

### 6.1 Conferência linha a linha contra o research

| `trophies.ts` | Research (`atletico-mineiro-facts.md`) | OK |
|---|---|---|
| Libertadores, 2013, ×1, "Olimpia (PAR), pênaltis após 2×2" | §Copa Libertadores: 2013, Olimpia, 2-2 agregado, pênaltis | ✓ |
| Recopa Sul-Americana, 2014, ×1, "Lanús (ARG), 5×3 agregado" | §Recopa: 2014, Lanús, 5-3 agregado | ✓ |
| Brasileiro Série A, 1971 e 2021, ×2 | §Campeonato Brasileiro: 1971 e 2021 | ✓ |
| Copa do Brasil, 2014 e 2021, ×2 | §Copa do Brasil: 2014 e 2021 | ✓ |
| Taça Bueno Brandão, 1914, ×1 | §Fundação: "Primeira grande conquista: Taça Bueno Brandão em 1914" | ✓ |
| Campeonato Mineiro, ×48, período 1915–2025, `years: []` | §Campeonato Mineiro: 48 títulos, 1915 a 2025, anos individuais não listados | ✓ |

**Nenhum ano, número ou competição inventado.** O tratamento do Mineiro é
exemplar: `count: 48` como fonte de verdade, `years: []` em vez de anos
fabricados, `periodLabel` comunicando o intervalo e `note` explicitando o limite
da pesquisa. A decisão de priorizar precisão sobre volume está **correta** e
alinhada à nota técnica da 1.6 ("não publicar número inventado como se fosse
confirmado"). Confirmo: não foi preguiça.

### 6.2 O que ainda precisa de decisão do lead
- **Processo (M6):** o AC pedia mais grupos; o AC foi marcado `[x]` em vez de
  `[~]`. Precisa de **WAIVED formal** registrado, ou de nova pesquisa. Implementer
  não fecha AC que ele mesmo declara parcialmente atendido.
- **Gap de research, não de implementação:** o research não cobre a Copa CONMEBOL
  de 1992, que é conquista real do clube e ampliaria legitimamente o dataset.
  Sugiro acionar o **sites-analyst** para uma segunda rodada (CONMEBOL 1992,
  Supercopa/Copa dos Campeões, anos individuais do Mineiro) — assim o AC original
  pode ser cumprido **sem** sacrificar fidelidade. Registro como caminho recomendado,
  não como bloqueio do dev.

---

## 7. LOW

| # | Finding | Local |
|---|---|---|
| L1 | "Olímpia" (grafia incorreta do clube paraguaio) na timeline vs "Olimpia" (correta) em `trophies.ts` — inconsistência interna | `timeline.ts:80` × `trophies.ts:17` |
| L2 | `StatCard` "Títulos conquistados: 55" pode ser lido como total oficial do clube; o parágrafo acima diz "um recorte", o card não. Sugestão: "Títulos neste recorte" | `titulos/page.tsx:39`, `trophy-highlights.tsx:33` |
| L3 | `© {ano} Clube Atlético Mineiro` num site declaradamente não oficial atribui copyright ao clube; além disso `new Date().getFullYear()` congela no ano do build | `site-footer.tsx:16,82` |
| L4 | Seção "Últimas do Galo" não tem rótulo de conteúdo ilustrativo, enquanto `NextMatch` e `/elenco` têm — inconsistência de transparência editorial | `news-grid.tsx:16` |
| L5 | Hero de `/estadio` usa `min-h-[70vh]`; a spec pede `svh` para evitar salto com a barra de endereço mobile (a Home usa `100svh` corretamente) | `estadio/page.tsx:36` |
| L6 | Sublinhado dourado do nav aparece em `hover` mas não em `focus-visible`; a spec do Header pede "hover/focus" | `site-header.tsx:75-79` |
| L7 | Dois `<nav aria-label="Navegação principal">` (header + painel mobile); `aria-controls="mobile-nav-panel"` referencia um id que não existe no DOM enquanto o painel está fechado | `site-header.tsx:57`, `mobile-nav.tsx:35,52` |
| L8 | Links externos (redes sociais, mapa) abrem em nova aba sem aviso textual/`aria` | `site-footer.tsx:62`, `estadio/page.tsx:90` |
| L9 | Seção `NextMatch` não tem heading (nem `sr-only`) — some da navegação por headings | `next-match.tsx:22` |
| L10 | Nome do jogador com `truncate` sem `title`/tooltip — nomes longos são cortados em mobile (2 colunas) | `squad-grid.tsx:27` |

---

## 8. O que passou (registro do que está bom)

Não é uma lista de cortesia — são itens que verifiquei e que estão corretos:

- **Fidelidade factual do conteúdo** (fora H1/H5): fundação, primeira partida,
  nome definitivo de 1913, cores, apelido, Clássico Mineiro de 1921, goleada de
  9×2 em 1927, gol de Dadá Maravilha, Cuca/Bahia 3×2, Arena MRV (27/08/2023,
  44.892, Santos 2×0) — **tudo rastreável ao research, nada inventado**.
- **Disclaimers de não-oficialidade** presentes no footer, no `NextMatch` e em
  `/elenco` (`role="note"` visível, não só comentário).
- **Decisão editorial de `news.ts`** de evitar resultados de partida não
  verificados: conteúdo atemporal sobre a cultura do clube. Acerto de julgamento.
- **SEO por rota**: 5 títulos únicos, 5 descriptions únicas (127–149 chars),
  canonical próprio, OG/Twitter completos com 1200×630, `lang="pt-BR"`, sitemap
  com exatamente as 5 rotas, robots liberando indexação. Tudo confirmado no HTML
  servido — o único defeito é o host (H4) e o `og:title` da Home (M1).
- **Hierarquia de headings**: conferida no HTML das 5 rotas, sem salto de nível.
- **`alt` em 100% das imagens** (39 `<img>` nas 5 rotas), nenhum vazio.
- **Semântica**: timeline como `<ol>/<li>`, títulos como `<ul>/<li>`, `<dl>` do
  `NextMatch` com `dt`/`dd` como filhos diretos (a correção citada no AC11 da 1.9
  está de fato aplicada), skip link como primeiro focável, `aria-current="page"`.
- **Contraste do tema escuro**: `#B3B3B3` sobre `#0A0A0A` = 7,1:1 e sobre
  `#141414` = 8,8:1; dourado sobre preto = 8,2:1; badge dourado com texto preto
  = 8,2:1. A correção do eyebrow (`text-primary` → badge com
  `primary-foreground`) citada no AC11 está aplicada e é válida.
- **Responsividade**: os grids batem com os ACs (`news` 1/2/3, `trophies` 1/2/3,
  `squad` 2/3/4, galeria 1/2/3) e a timeline alterna corretamente em `lg`.
- **Build**: as 5 rotas + sitemap + robots saem estáticas, sem aviso de rota dinâmica.
- **Otimização do `Reveal` → `RevealGroup`/`RevealItem`**: a redução de observers
  é uma boa decisão de performance. O problema não é a orquestração, é o estado
  inicial serializado (H3).

---

## 9. Decisão por story

| Story | Veredicto | Destino | Motivo |
|---|---|---|---|
| 1.1 Fundação/tokens | ⚠️ CONCERNS | `done/` | Tokens e setup corretos; nenhum bloqueador próprio. Registrado que a colisão `section-light` × `text-foreground` (C1) pede uma variante on-light no sistema |
| 1.2 Shell header/footer | ⚠️ CONCERNS | `done/` | Header/footer/skip link/teclado corretos; M4, L3, L6, L7, L8, L9 documentados como não-bloqueantes |
| 1.3 Camada de conteúdo | ❌ FAIL | `active/` | H1 (mapeamento imagem↔notícia + alt), H5 (`sameAs` com TODO), M6 (AC marcado `[x]`), M7 (contagem), L1 |
| 1.4 Home | ❌ FAIL | `active/` | **C1**, H2, H3 (origem do `Reveal`), M1, M3, M5 |
| 1.5 História/timeline | ❌ FAIL | `active/` | H3 (16 dos 16 marcos saem com `opacity:0`), L1 |
| 1.6 Títulos | ❌ FAIL | `active/` | H3, M6, L2. **Mérito factual do dataset aprovado** (§6.1) |
| 1.7 Estádio | ❌ FAIL | `active/` | H2 (hero com texto queimado), H3, L5, L8 |
| 1.8 Elenco | ❌ FAIL | `active/` | H3, M8 (alt × silhueta — corrigir o AC3 antes do código), L10 |
| 1.9 SEO/perf/a11y | ❌ FAIL | `active/` | H4, H5, M1; AC11 ("a11y=100, zero violações de contraste") refutado por C1; AC9/LCP reaberto por H3 |

## 10. Próximos passos

1. **@sites-dev-alpha** — corrigir C1, H1, H2, H3 e M1–M5 (detalhe e localização acima).
2. **@sites-architect** — decidir M6/M8: waiver formal do AC4 da 1.3 e revisão do
   AC3 da 1.8 (`alt` = nome do jogador para imagem genérica).
3. **@sites-analyst** — segunda rodada de pesquisa: Copa CONMEBOL 1992, anos
   individuais do Campeonato Mineiro, URLs oficiais de redes sociais (H5).
4. **@sites-devops** — **não fazer push/deploy**. Quando liberado, `NEXT_PUBLIC_SITE_URL`
   é gate obrigatório de build (H4).
5. **Re-QA**: rodada 1 de 3. Na re-submissão exijo (a) confirmação visual da Home e
   da `/estadio` no topo, (b) HTML sem `opacity:0` no conteúdo principal, (c) JSON
   bruto do Lighthouse anexado ao Dev Agent Record.

---
---

# RODADA 2 — revalidação (2026-09-09)

**Reviewer:** Axilun (sites-qa) · **Rodada 2 de 3** · **Implementer:** sites-dev-alpha (Novael)

## VEREDICTO DA RODADA 2: ⚠️ CONCERNS

**Todos os bloqueadores da rodada 1 estão resolvidos** — 1 CRITICAL e 5 HIGH,
cada um reconfirmado por evidência que produzi nesta sessão. Restam MEDIUM/LOW
da rodada 1 (declarados abertamente como não corrigidos pelo implementer) e
**6 findings novos**, nenhum bloqueante. A story 1.9 é a exceção: seus AC8/AC9/AC11
carregam números de Lighthouse medidos **antes** das correções e nunca refeitos —
**NÃO VERIFICÁVEL** por mim, e por isso ela não fecha.

### R2.1 Método e evidência (produzida por mim, nesta sessão)

| Verificação | Comando/fonte | Resultado |
|---|---|---|
| Lint | `pnpm lint` | exit 0 |
| Typecheck | `pnpm typecheck` | exit 0 |
| Build | `pnpm build` | exit 0; 5 rotas + sitemap + robots `○` estáticas; First Load JS 174–179 kB |
| **HTML pré-renderizado** | `.next/server/app/{index,historia,titulos,estadio,elenco}.html` | fonte primária desta rodada |
| CSS compilado | `.next/static/chunks/4616b8c8fb0d74c2.css` | cores resolvidas token a token |
| Imagens | leitura visual dos JPG/PNG + `md5sum` | sem texto queimado em hero/news; heros idênticos entre si |
| Fidelidade factual | `src/content/*` × `agents/research/atletico-mineiro-facts.md` (rodada 2) | linha a linha |

**Correção de um pressuposto meu da rodada 1:** `next build --turbopack` **deixa sim**
HTML pré-renderizado em `.next/server/app/*.html`. Na rodada 1 registrei o contrário
e por isso dependi do dev server do lead. A medição estática do build é agora a
fonte de evidência preferencial — não precisa de servidor e não bloqueia a sessão.

**Não verificado (declarado):** não rodei Lighthouse, axe-core nem browser. Nada
abaixo depende disso, exceto os itens explicitamente marcados NÃO VERIFICÁVEL.

### R2.2 Findings da rodada 1 — status revalidado

| # | Sev. | Status | Evidência que produzi |
|---|---|---|---|
| **C1** | CRITICAL | ✅ **RESOLVIDO** | `index.html`: `<h2 class="... text-fg-on-light">Uma galeria de conquistas</h2>`. CSS compilado: `.text-fg-on-light{color:var(--color-fg-on-light)}`, `--color-fg-on-light:#0a0a0a`, `--color-bg-light:#fff` → **19,8:1** (era 1:1). `description` cobre-se por `text-fg-on-light-muted` (#4d4d4d → **8,5:1**). Auditei os 3 usos de `section-light` (`trophy-highlights`, `next-match`, `estadio:82`) e os 3 usos de `SectionHeading`: só `TrophyHighlights` fica em fundo claro e é o único com `onLight`. Correto. |
| **H1** | HIGH | ✅ **RESOLVIDO** | `generate-placeholders.mjs:167-173` não passa mais `label` nos tiles de notícia; abri `noticia-1.jpg` (regenerado 19:20) — só motivo gráfico, zero texto. `alt` reescritos para "Ilustração editorial gerada sobre …". Descasamento imagem↔título↔`alt` extinto. |
| **H2** | HIGH | ✅ **RESOLVIDO** | `heroSvg` chamado sem `eyebrow`/`title` (linhas 138-146); abri `hero-torcida.jpg` — sem "DESDE 1908"/"GALO". `arena-hero.jpg` idem. Não há mais texto embutido para colidir com o `<h1>` sobreposto. |
| **H3** | HIGH | ✅ **RESOLVIDO** | Contagem **minha** no HTML pré-renderizado: `opacity:0` → `/` **0**, `/historia` **0**, `/titulos` **0**, `/estadio` **0**, `/elenco` **0** (eram 12/16/7/10/20). `translateY` inline: 0 em todas. Nenhum `style="…opacity…"` sobrou. O número do implementer confere. |
| **H4** | HIGH | ✅ **RESOLVIDO (com ressalva)** | `.env.example` existe (742 B) e documenta `NEXT_PUBLIC_SITE_URL` com o motivo. `layout.tsx:28`, `sitemap.ts:3`, `robots.ts:3` leem a env com fallback. **Ressalva:** o fallback continua silencioso — este build (sem env) publica canonical `https://atletico-mineiro-site.example.com/*` nas 5 rotas. Documentar era o pedido; **o gate de deploy segue como ação obrigatória do @sites-devops**. |
| **H5** | HIGH | ✅ **RESOLVIDO** | `club.ts` sem `TODO(pesq)`; as 4 URLs batem **exatamente** com `atletico-mineiro-facts.md` §"Canais Oficiais e Redes Sociais" (rodada 2): `instagram.com/atletico/`, `x.com/atletico`, `youtube.com/@atletico`, `facebook.com/atletico/`. As formas suspeitas que apontei (`youtube.com/atletico`, `facebook.com/Atletico`) sumiram. |
| **M6** | MEDIUM | ✅ **RESOLVIDO** | Architect (Zaelion) **negou o waiver** e reabriu: AC4 partido em AC4/AC4b, AC4b sem meta numérica, medindo cobertura do research. Decisão registrada na 1.3 §"Decisão do Architect sobre o AC4". Processo correto — melhor que o waiver que eu havia admitido como alternativa. |
| **M7** | MEDIUM | ⚠️ **PARCIAL** | 1.3 corrigida para 16. **Mas a 1.9 AC7 ainda diz `h3(×17)` em `/historia`** — contei no build: **16** `<h3>`. Ver R2 na §R2.5. |
| **M8** | MEDIUM | ✅ **RESOLVIDO** (e generalizado como novo N3) | `squad-grid.tsx:27` condiciona `alt` a `player.photo`; `elenco.html` tem **20 × `alt=""`** e zero `alt` com nome de jogador. Confirmado. |
| **AC4b (1.3)** | — | ✅ **FECHADO** | `trophies.ts` traz Copa CONMEBOL `[1992, 1997]` e Mineiro `count: 50` / `periodLabel: 1915–2025`. Diferença de conjuntos {competições com título no research} − {`competition` em `trophies.ts`} = **vazio** (7 grupos). Total agregado 59, confirmado como `>59<` no HTML de `/` e `/titulos`; Internacionais 4, Nacionais 4. Nenhum `48` sobrou em `src/`. |
| **AC3 (1.8)** | — | ✅ **ATENDIDO** | ver M8. O comentário no código explicita a regra ("`alt` descreve a imagem entregue, nunca a intenção do dado ao lado") — regra boa, ver N3 para onde ela ainda não foi aplicada. |
| **AC5 (1.8)** | — | ✅ **ATENDIDO** | `elenco/page.tsx:36-38`: "os nomes, números e posições abaixo são **fictícios**, criados apenas para preencher esta página de exemplo — não representam o plantel real do clube". Some o enquadramento de "desatualizado". Ver N5 para o resíduo na `description`. |

**Não corrigidos e declarados como tal pelo implementer** (confirmei um a um que
seguem abertos, e confirmei que ele **não** alegou o contrário em nenhum Dev Agent
Record): **M1** `og:title` duplicado (`og:title`/`twitter:title` da Home saem
"…Site de torcedor | Galo — Atlético Mineiro" no build), **M2** `Intl.DateTimeFormat`
sem `timeZone` (grep `timeZone` em `src/` = 0), **M3** ícones dourados 16px sobre
branco (`next-match.tsx:40,46,52`, `trophy-highlights.tsx:31`), **M4** `outline-none`
do `Button`, **M5** cards de notícia sem link, **L1** "Olímpia" (`timeline.ts:80`)
vs "Olimpia", **L2**, **L3**, **L5**, **L6**, **L7**, **L8**, **L9**, **L10**.

Registro a favor do implementer: em cinco stories ele listou explicitamente o que
**não** corrigiu e absteve-se de marcar AC de Lighthouse sem medição nova. Relato
honesto — confiro isso porque na rodada 1 o problema não era o código, era o relato.

### R2.3 Findings NOVOS da rodada 2

Nenhum bloqueante. Todos verificados por mim.

#### N1 (MEDIUM) — placar agregado da Copa CONMEBOL 1992 é aritmeticamente impossível
**Onde:** `src/content/trophies.ts:17` → renderizado em `/titulos`.
> "1992: … sobre o Olimpia (PAR), **3×1 no agregado (2×0 em Belo Horizonte, 1×0 em Assunção)**"

2×0 + 1×0 = 3 gols pró e **0** contra; o "1" do agregado não vem de lugar nenhum.
Um dos dois números publicados é falso. A origem é o próprio research
(`atletico-mineiro-facts.md` §Copa CONMEBOL, "Agregado final: 3×1"), então o dev
seguiu a fonte de verdade corretamente — **a correção começa no @sites-analyst**.
Severidade calibrada pelo precedente do M2 da rodada 1 (número publicado errado = MEDIUM).

#### N2 (MEDIUM) — o novo `Reveal` troca "invisível sem JS" por "pisca ao hidratar"
**Onde:** `src/components/shared/reveal.tsx:46-50` e `:111-115`.

O estado oculto passou a ser aplicado em `useLayoutEffect` no cliente. O comentário
do código afirma que isso é "síncrono, antes do primeiro paint do browser, então
não há flash de conteúdo visível" — **isso vale para CSR, não para SSR**. O browser
pinta o HTML do servidor (agora visível, e é exatamente por isso que H3 fechou)
muito antes de o React hidratar. Na hidratação, `controls.set(ITEM_HIDDEN)` roda
incondicionalmente: `inView` ainda é `false` (o `IntersectionObserver` só responde
no frame seguinte). Sequência para elementos **já no primeiro viewport**:
pintado visível → hidrata → some → reaparece em 0,5s.

Afeta `/historia`, `/titulos` e `/elenco` (conteúdo principal alto na página, sem
hero); `/` e `/estadio` estão protegidas porque o `Hero` não é embrulhado em `Reveal`.
Quanto mais lento o JS, mais tempo o conteúdo fica visível antes de sumir.
**Correção barata:** não esconder quando o elemento já estiver intersectando no
momento do layout effect. **Confirmação visual pendente** — a sequência está provada
no código, a percepção exata do flash depende de render real.

Registro também que não pude verificar sem browser se a propagação de variants
`RevealGroup`→`RevealItem` via `AnimationControls` de fato dispara. Os dois modos
de falha são benignos (conteúdo permanece visível), então não é risco de conteúdo.

#### N3 (MEDIUM) — a regra do AC3 da 1.8 não foi aplicada às outras 18 imagens
Depois das correções H1/H2, **todas** as imagens do site viraram o mesmo motivo
genérico (listras + estrela). Os `alt`, porém, continuam descrevendo assunto que a
imagem não mostra — exatamente o M8 que o architect resolveu no `/elenco` com `alt=""`:

- `hero-torcida.jpg` e `arena-hero.jpg` são **o mesmo arquivo** (`md5 3df17ea0…`, 30.409 B),
  com `alt` afirmando coisas diferentes: "atmosfera de torcida do Galo" × "Arena MRV,
  casa do Atlético Mineiro". Nenhuma das duas é depicta. Sendo fundo decorativo com
  `<h1>` sobreposto, `alt=""` é o correto.
- 6 tiles de notícia, 6 da galeria da arena e 5 da timeline: mesma situação.

Não é regressão — é o alcance incompleto de uma regra que o próprio épico já adotou.

#### N4 (MEDIUM) — texto queimado ainda existe na galeria da arena e na timeline
`generate-placeholders.mjs:148-161` e `:175-188` seguem gravando rótulo dentro do
JPG ("ARQUIBANCADA", "ENTRADA PRINCIPAL", …, "1908", "1971"). Confirmei abrindo
`galeria-1.jpg`: "ARQUIBANCADA" em branco sobre o tile. É imagem-de-texto
(WCAG 1.4.5) e é a mesma justificativa que levou à remoção do texto em news/hero —
aplicada pela metade.

#### N5 (LOW→MEDIUM) — a `description` da `/elenco` ainda enquadra dado fictício como desatualizado
`src/app/elenco/page.tsx:11`: "Conteúdo estático e **não reflete o plantel atual do
clube**". É precisamente a redação que o AC5 mandou abandonar, sobrevivendo no
campo que **aparece na SERP**. O aviso na página diz "fictícios"; a meta description
diz "não é o atual". Contradição entre a página e o que o Google mostra dela.

#### N6 (MEDIUM) — o JSON-LD declara o site de torcedor como sendo o clube
`layout.tsx:58-76`: nó `SportsTeam` com `name: "Clube Atlético Mineiro"`,
`url: <domínio deste site>` e `sameAs: [4 perfis oficiais]`. Com URLs inventadas
(H5) o risco era publicar mentira; com URLs reais o risco mudou de natureza:
`url` + `sameAs` juntos afirmam, para máquina, que **este** domínio é a entidade
oficial do clube — contradizendo o disclaimer humano ("site de torcedor, não
oficial") em todas as rotas. Sugestão: manter `sameAs`, mas modelar o site como
`WebSite`/`CreativeWork` com `about`/`mainEntity` apontando para o clube, em vez
de encarnar o `SportsTeam`.

### R2.4 Ressalvas da rodada 1 — estado

- **LCP (§5):** a causa estrutural que apontei (H3) **está corrigida** — nas 5 rotas
  o conteúdo principal já nasce pintável no HTML, sem depender de hidratação. O
  número em si continua **não medido**: não rodei Lighthouse. A ressalva original
  do alpha ("distorção do throttling simulado") deixa de ser desmentida por H3, mas
  segue **não confirmada**. Revalidar em produção (@sites-devops) é o caminho.
- **Fidelidade de `trophies.ts` (§6):** sustentada e agora ampliada corretamente.
  Com o research da rodada 2, 7 grupos cobrem 100% do documentado. O padrão do
  Mineiro (`count` 50 + `years: []` + `periodLabel` + `note`) foi mantido. Ver N1
  para o único número que não fecha.

### R2.5 Pendências de REGISTRO (não são código)

- **R1 — `1.9` AC8 e AC11 seguem `[x]` com medição pré-correção.** A tabela de
  Lighthouse (§"Números por rota") e o texto "Accessibility = 100 nas 5 rotas,
  zero violações de contraste" foram medidos no build que continha o C1 (contraste
  1:1). O implementer registrou honestamente no Dev Agent Record que não revalidou,
  **mas não desmarcou os ACs**. Uma story não vai para `done/` afirmando um número
  que eu refutei e que ninguém remediu. **Veredicto do item: NÃO VERIFICÁVEL.**
  Falta: rodada dedicada de Lighthouse/axe com JSON bruto anexado, ou AC8/AC11
  rebaixados a `[~]` com a medição antiga marcada como obsoleta.
- **R2 — `1.9` AC7 diz `/historia`: h3(×17).** Contei no build: **16** `<h3>`,
  16 `year:` em `timeline.ts`. A 1.3 já foi corrigida; a 1.9 não.
- **R3 (LOW) — `1.3` AC5** ainda cita `// TODO(pesq)` "usado em `club.ts` para as
  URLs de redes sociais". Esse TODO não existe mais (H5 resolvido). Texto obsoleto.

### R2.6 Decisão por story — rodada 2

| Story | Veredicto | Destino | Motivo |
|---|---|---|---|
| 1.3 Camada de conteúdo | ⚠️ CONCERNS | `done/` | H1 e H5 resolvidos; AC4b fechado com o research da rodada 2; M6 resolvido pelo architect. Abertos: N1, L1, R3 |
| 1.4 Home | ⚠️ CONCERNS | `done/` | **C1 resolvido** (19,8:1), H2 e H3 resolvidos. Abertos: M1, M3, M5, N3 |
| 1.5 História/timeline | ⚠️ CONCERNS | `done/` | H3 resolvido (16→0); Mineiro 48→50. Abertos: L1, N2, N4 |
| 1.6 Títulos | ⚠️ CONCERNS | `done/` | H3 resolvido (7→0); dataset ampliado com fidelidade (59 títulos). Abertos: N1, N2, L2 |
| 1.7 Estádio | ⚠️ CONCERNS | `done/` | H2 e H3 resolvidos (10→0). Abertos: N3, N4, L5, L8 |
| 1.8 Elenco | ⚠️ CONCERNS | `done/` | H3 resolvido (20→0); AC3 e AC5 atendidos com evidência. Abertos: N2, N5, L10 |
| 1.9 SEO/perf/a11y | ⚠️ **NÃO VERIFICÁVEL** | `active/` | H4 e H5 resolvidos no código. **Não fecha** por R1 (AC8/AC11 com medição pré-correção) e R2 (contagem errada no AC7). Pendência de registro/medição, **não** de código |

### R2.7 Próximos passos

1. **@sites-devops** — push liberado para 1.3–1.8. `NEXT_PUBLIC_SITE_URL` é **gate
   obrigatório** de build de produção (H4 documentado, não automatizado).
2. **@sites-analyst** — corrigir o agregado da CONMEBOL 1992 no research (N1);
   `trophies.ts` só depois.
3. **@sites-dev-alpha** — R1/R2 (registro da 1.9) e, se o lead priorizar, N2
   (flash na hidratação) e N5 (`description` da `/elenco`).
4. **@sites-architect** — decidir o alcance da regra do AC3 (N3) e se a
   galeria/timeline mantêm texto queimado (N4).
5. **Rodada dedicada de Lighthouse + axe** com JSON bruto anexado — é o que falta
   para converter os ACs de performance/a11y da 1.9 em PASS.
6. **Ciclo:** rodada 2 de 3 encerrada. Restam findings apenas MEDIUM/LOW —
   nenhuma nova rodada de FAIL foi consumida.

---
---

# RODADA 3 (FINAL) — revalidação (2026-09-09)

**Reviewer:** Axilun (sites-qa) · **Rodada 3 de 3 — cap do ciclo atingido** ·
**Implementer:** sites-dev-alpha (Novael)

## VEREDICTO DA RODADA 3: ⚠️ CONCERNS

**N1 a N6 estão resolvidos, todos confirmados por evidência que produzi nesta
sessão**, e as duas pendências de registro da 1.9 (R1/R2) foram fechadas
exatamente na forma que eu havia especificado na rodada 2. **Zero findings
CRITICAL ou HIGH abertos.** O que resta é MEDIUM/LOW herdado das rodadas 1 e 2
(declarado abertamente pelo implementer como não corrigido) mais dois resíduos
LOW novos de registro/copy. Nada disso bloqueia — conforme a política de cap do
team-os, vai para adjudicação do lead, não para uma 4ª rodada.

O épico **não sai como PASS** por um motivo único e explícito: AC8/AC9/AC11 da
1.9 (Lighthouse/axe) continuam sem medição fresca. Eles agora estão marcados
`[~]` com nota honesta — o que os torna aceitáveis para fechar a story —, mas eu
não certifico número que ninguém mediu.

### R3.1 Método e evidência (produzida por mim, nesta sessão)

| Verificação | Comando/fonte | Resultado |
|---|---|---|
| Lint | `pnpm lint` | **exit 0**, sem erro/warning |
| Typecheck | `pnpm typecheck` (`tsc --noEmit`) | **exit 0** |
| Build | `pnpm build` (`next build --turbopack`) | **exit 0**; 5 rotas + `/sitemap.xml` + `/robots.txt` + 404 + ícones todas `○` estáticas; First Load JS 174–179 kB; nenhum aviso de rota dinâmica |
| HTML pré-renderizado | `.next/server/app/{index,historia,titulos,estadio,elenco}.html` (do **meu** build, 19:59) | fonte primária |
| Rotas de arquivo | `.next/server/app/{sitemap.xml,robots.txt}.body` | lidos na íntegra |
| Imagens | leitura **visual** de `galeria-1`, `galeria-4`, `fundacao-1908`, `arena-mrv-2023`, `noticia-3` + `md5sum`/mtime de todo `public/images` | sem texto queimado |
| Contagem de caracteres | `node -e` com `[...s].length` (chars) **e** `Buffer.byteLength` (bytes) | ver R3.3/N5 |
| Fidelidade factual | `src/content/trophies.ts` × `agents/research/atletico-mineiro-facts.md` | linha a linha |

**Correção de método que fiz nesta rodada:** ao medir a `description` da `/elenco`
com `${#var}` no bash, obtive **167** e quase abri um finding de "estourou o
orçamento de 160 do AC3". Era **byte count**, não char count — a string tem
**158 caracteres** e 167 bytes (acentos UTF-8 ocupam 2 bytes). Recontei em Node
antes de julgar. Registro o quase-erro porque ele também contamina os números
"127–149 chars" que eu mesmo escrevi na rodada 1 (ver R4).

**Não verificado (declarado):** não rodei Lighthouse, axe-core nem browser real.
Nenhum veredicto abaixo depende disso, exceto os itens marcados NÃO VERIFICÁVEL.

### R3.2 Findings da rodada 2 — status revalidado

| # | Sev. | Status | Evidência que produzi |
|---|---|---|---|
| **N1** | MEDIUM | ✅ **RESOLVIDO** | `trophies.ts:17` agora diz "**2×1** no agregado (2×0 em Belo Horizonte, 1×0 em Assunção)". A aritmética fecha lendo o 1×0 de Assunção como vitória do Olimpia: 2+0 pró, 0+1 contra = 2×1. Bate com o research corrigido (`atletico-mineiro-facts.md:82-83`: "Placar: 2×0 em Belo Horizonte (16/set), 1×0 em Assunção (23/set) · Agregado final: **2×1**"). Confirmado no HTML de `/titulos`: **zero** ocorrências de "3×1". Ressalva de clareza vira N7 (LOW). |
| **N2** | MEDIUM | ✅ **RESOLVIDO no código** | `reveal.tsx:23-29` introduz `isInInitialViewport()` (`getBoundingClientRect` + `innerHeight/Width`, guardado por `typeof window`). Em `Reveal` (`:66-75`) e `RevealGroup` (`:142-149`) o `controls.set(hidden)` deixou de ser incondicional: se o elemento já intersecta o viewport no layout effect, marca `revealedOnMount` e **retorna sem esconder**. O `useEffect` seguinte (`:77-84`, `:151-155`) respeita o mesmo ref. Ordem correta — layout effect roda antes do effect, então o ref já está setado quando é lido. O defeito que apontei (esconder o que o browser já pintou) está eliminado no caminho de código. **E não regrediu H3:** contagem minha no HTML pré-renderizado → `opacity:0`, `translateY` e `style="…opacity…"` = **0 / 0 / 0** nas 5 rotas. `prefers-reduced-motion` também segue seguro (`active=false` ⇒ nunca esconde). **Confirmação visual do flash permanece pendente** — sem browser não observo o paint; o que afirmo é o caminho de código, não a percepção. |
| **N3** | MEDIUM | ✅ **RESOLVIDO** | Contagem minha no HTML: `/` 7 `<img>` / **7** `alt=""` / 0 com texto; `/historia` 5/5/0; `/estadio` 7/7/0; `/elenco` 20/20/0; `/titulos` sem imagem. **39 de 39 imagens com `alt` deliberado**, zero `alt` descritivo mentindo sobre arte genérica. Origem nos dados: `page.tsx:37` (`backgroundImageAlt=""`), `arena.ts:36-44` (6 galeria + hero), `news.ts` (6 × `imageAlt: ""`), `timeline.ts` (5 × `imageAlt: ""` — e `timeline.tsx:70` usa `??`, que **não** cai no fallback com string vazia; conferi que os 5 `image:` têm os 5 `imageAlt:` correspondentes). |
| **N4** | MEDIUM | ✅ **RESOLVIDO** | `generate-placeholders.mjs`: `tileSvg` da galeria (`:154-159`) e da timeline (`:185-190`) não recebem mais `label`; o `<text>` é condicional (`:84-88`) e nunca dispara. **Não parei no script** — abri as imagens: `galeria-1.jpg`, `galeria-4.jpg`, `fundacao-1908.jpg`, `arena-mrv-2023.jpg` e `noticia-3.jpg` (esta para checar regressão do fix da rodada 2): **todas só com listras + estrela dourada, zero texto**. Todos os 24 arquivos de `public/` regenerados às 19:52; galeria caiu de 27–33 KB para 21–24 KB, coerente com a remoção do texto. |
| **N5** | MEDIUM | ✅ **RESOLVIDO** | `elenco/page.tsx:10-11` e o HTML do build: `description` = "Elenco ilustrativo do Atlético Mineiro, organizado por posição. Nomes, números e posições são fictícios, criados apenas para preencher esta página de exemplo." A redação "não reflete o plantel atual" — que o AC5 da 1.8 mandou abandonar — sumiu; a meta agora diz o mesmo que o `role="note"` da página. **158 caracteres**, dentro do orçamento 50–160 do AC3. `og:description` idem. |
| **N6** | MEDIUM | ✅ **RESOLVIDO** | JSON-LD extraído do meu build (idêntico nas 5 rotas): nó raiz `WebSite` com `url: "https://atletico-mineiro-site.example.com"`, `about:` → `SportsTeam` **sem campo `url`**, carregando só `name`/`alternateName`/`foundingDate`/`sport`/`location`/`sameAs`. O domínio deste site aparece **uma única vez** no grafo, e no nó certo. A afirmação de máquina "este domínio é a entidade oficial do clube" deixou de existir; o fansite agora *descreve* o clube em vez de encarná-lo. `/estadio` mantém o segundo nó `SportsActivityLocation` (Arena MRV, 44.892) — bem formado e sem `url` própria também. |
| **R1** (registro 1.9) | — | ✅ **RESOLVIDO** | AC8, AC9 e AC11 rebaixados de `[x]` para `[~]`, cada um com nota explicando que a medição é pré-C1/H3. A tabela de Lighthouse ganhou o cabeçalho "**OBSOLETO, medido antes de C1/H3**" e a frase "Não usar esta tabela como evidência de AC8/AC11". Foi exatamente a alternativa que eu especifiquei na rodada 2 ("ou AC8/AC11 rebaixados a `[~]` com a medição antiga marcada como obsoleta"). A nova seção "Estimativa estática pós-correção" declara na própria abertura que **não é medição de Lighthouse** e lista o que o método não mede. Recalculei a tabela dela contra o meu build: h3 10/16/7/0/0, `opacity:0` 0/0/0/0/0, img 7/5/0/7/20 — **bate número a número**. |
| **R2** (registro 1.9) | — | ✅ **RESOLVIDO** | AC7 corrigido de `h3(×17)` para `h3(×16)` em `/historia`, com nota de recontagem. Contei no meu build: **16** `<h3>`. Confere. |

**AC1/AC2/AC3/AC12 reconfirmados nesta rodada** (não confiei na aprovação anterior):
`sitemap.xml.body` traz exatamente as 5 rotas em URL absoluta com `lastmod`;
`robots.txt.body` = `Allow: /` + `Sitemap:`; 5 `title` únicos, 5 `description`
únicas (120–158 chars), `canonical` próprio por rota; `lang="pt-BR"`.
**C1 não regrediu:** `text-fg-on-light` (6×) e `text-fg-on-light-muted` (6×)
seguem presentes no `index.html`, nenhum `text-foreground` dentro de `section-light`.

### R3.3 Findings NOVOS da rodada 3 — ambos LOW, nenhum bloqueante

#### N7 (LOW) — o placar da CONMEBOL 1992 fecha na aritmética, mas não na leitura
**Onde:** `src/content/trophies.ts:17` → card de `/titulos`.
> "2×1 no agregado (2×0 em Belo Horizonte, 1×0 em Assunção)"

O número agora é verdadeiro e rastreável ao research. O problema residual é de
**copy**: o texto não diz quem venceu cada jogo. O leitor que soma os dois
placares como vitórias do Atlético chega a "3×0" e conclui que o agregado está
errado — que é exatamente a leitura que me fez abrir o N1. Sugestão de redação:
"vitória por 2×0 em Belo Horizonte e derrota por 1×0 em Assunção". Não é erro
factual; é ambiguidade evitável em número publicado sobre clube real.

#### N8 (LOW) — AC3 da 1.9 cita um intervalo de caracteres que não é mais o real
**Onde:** `stories/.../1.9` AC3 — "descrições entre 127 e 149 caracteres".
Medi as 5 no build: **120 / 131 / 148 / 123 / 158** chars. O intervalo correto é
120–158 (todas dentro do orçamento 50–160 que o AC exige, então o **AC segue
atendido**). Dois problemas menores: (a) o número herdado é de **byte count**, não
char count — erro de medição que nasceu comigo na rodada 1 e foi copiado para o
AC; (b) é o mesmo padrão do R2 que acabamos de corrigir: número congelado no AC
depois que o conteúdo mudou. Correção é de uma linha.

### R3.4 MEDIUM/LOW remanescentes — para adjudicação do lead (não bloqueiam)

Confirmei um a um que seguem abertos **e** que o implementer não alegou o
contrário em nenhum Dev Agent Record. Registro a favor dele: em todas as rodadas
ele listou explicitamente o que não corrigiu.

| # | Sev. | Finding | Local |
|---|---|---|---|
| M1 | MEDIUM | `og:title`/`twitter:title` da Home duplicam o sufixo: "…Site de torcedor **\| Galo — Atlético Mineiro**", divergindo do `<title>`, que sai correto. Reconfirmado no meu build | `page.tsx:15` + `seo.ts` |
| M2 | MEDIUM | `Intl.DateTimeFormat("pt-BR", …)` sem `timeZone`: roda no build e usa o TZ da máquina. Build em UTC (padrão de CI/Vercel) renderiza hora errada do próximo jogo | `next-match.tsx:12-19` |
| M3 | MEDIUM | Ícones do acento dourado a 16px sobre branco = 2,42:1; `design-direction` §4.1 autoriza o acento só em ícones ≥24px | `next-match.tsx:40,46,52`; `trophy-highlights.tsx` |
| M4 | MEDIUM | `.outline-none` do `Button` shadcn vence o `:focus-visible` global; o substituto `ring-ring/50` rende 2,77:1 (<3:1) | `ui/button.tsx:7` × `globals.css` |
| M5 | MEDIUM | Cards de notícia têm `slug`/título/resumo mas não são clicáveis e não existe rota de artigo | `news-grid.tsx` |
| H4-res. | MEDIUM | **Ressalva remanescente do H4**, não o H4 em si: a env está documentada (`.env.example`), mas o fallback é **silencioso** — este build publica canonical/`og:url`/sitemap em `https://atletico-mineiro-site.example.com`. **Gate obrigatório de build/deploy do @sites-devops** | `layout.tsx:28`, `sitemap.ts`, `robots.ts` |
| L1 | LOW | "Olímpia" (grafia incorreta) na timeline × "Olimpia" (correta) em `trophies.ts` | `timeline.ts:80` |
| L2 | LOW | `StatCard` de títulos pode ser lido como total oficial; sugerir "Títulos neste recorte" | `titulos/page.tsx`, `trophy-highlights.tsx` |
| L3 | LOW | `© {ano} Clube Atlético Mineiro` em site não oficial + `getFullYear()` congela no ano do build | `site-footer.tsx` |
| L4 | LOW | "Últimas do Galo" sem rótulo de conteúdo ilustrativo (inconsistente com `NextMatch` e `/elenco`) | `news-grid.tsx` |
| L5 | LOW | Hero de `/estadio` usa `min-h-[70vh]`; spec pede `svh` | `estadio/page.tsx` |
| L6 | LOW | Sublinhado dourado do nav em `hover` mas não em `focus-visible` | `site-header.tsx` |
| L7 | LOW | Dois `<nav aria-label="Navegação principal">`; `aria-controls` aponta id inexistente com painel fechado | `site-header.tsx`, `mobile-nav.tsx` |
| L8 | LOW | Links externos abrem em nova aba sem aviso textual/`aria` | `site-footer.tsx`, `estadio/page.tsx` |
| L9 | LOW | Seção `NextMatch` sem heading (nem `sr-only`) | `next-match.tsx` |
| L10 | LOW | Nome do jogador com `truncate` sem `title` | `squad-grid.tsx` |
| R3 | LOW | AC5 da 1.3 ainda cita um `// TODO(pesq)` em `club.ts` que não existe mais | `stories/1.3` |
| N7 | LOW | Redação ambígua do placar da CONMEBOL 1992 (ver R3.3) | `trophies.ts:17` |
| N8 | LOW | Intervalo de chars desatualizado no AC3 da 1.9 (ver R3.3) | `stories/1.9` |

**Efeito colateral aceito, registrado para o lead:** o fix do N2 faz com que
elementos já dentro do primeiro viewport **nunca animem** — nascem revelados. É a
troca correta (conteúdo pintado > animação decorativa) e não fere o AC7 da 1.4 em
espírito, mas altera o comportamento visual do topo de `/historia`, `/titulos` e
`/elenco`. Caso derivado, benigno: se o usuário rolar antes da hidratação, um
bloco que ele já leu pode ser escondido fora da tela e reanimar ao voltar.

### R3.5 O que continua NÃO VERIFICÁVEL

**AC8, AC9 e AC11 da 1.9 (Lighthouse/axe-core).** Não rodei a ferramenta nesta
sessão nem em nenhuma outra, e o implementer também não. A diferença em relação
à rodada 2 é de **registro, não de medição**: os ACs deixaram de afirmar um
número falso e passaram a declarar honestamente a lacuna. Isso é suficiente para
a story fechar como CONCERNS — não é suficiente para eu chamar de PASS.

- **Falta:** rodada dedicada de Lighthouse (mobile, `pnpm build && pnpm start`)
  + axe-core, com **JSON bruto anexado**, idealmente contra o domínio de produção.
- **Sinais indiretos que confirmei a favor:** `opacity:0` = 0 nas 5 rotas (a causa
  estrutural de LCP que apontei na rodada 1 está morta), `public/images` = 448 KB,
  C1 corrigido em 19,8:1, `alt` deliberado em 39/39 imagens, headings sem salto.
  Nada disso mede contraste computado, ordem de foco, TBT ou LCP em ms.
- **Próximo dono:** @sites-devops, na revalidação pós-deploy.

### R3.6 Decisão por story — rodada 3

| Story | Veredicto | Destino | Motivo |
|---|---|---|---|
| 1.1–1.8 | ⚠️ CONCERNS (rodada 2) | `done/` | Já fechadas na rodada 2; nada nesta rodada as reabre. Reconfirmei que C1/H1/H2/H3 não regrediram |
| 1.9 SEO/perf/a11y | ⚠️ **CONCERNS** | `done/` | H4/H5 resolvidos (r2); N5/N6 resolvidos (r3); **R1 e R2 fechados exatamente na forma que especifiquei na rodada 2** — AC7 recontado para 16 (confere com meu build) e AC8/AC9/AC11 rebaixados a `[~]` com a tabela antiga marcada OBSOLETA. Fecha com a pendência de Lighthouse **registrada como ação futura**, não como número falso. Abertos: M1, N8, H4-ressalva |

### R3.7 Próximos passos

1. **@sites-devops** — push liberado para o épico 1 inteiro. Duas ações
   obrigatórias no deploy: (a) `NEXT_PUBLIC_SITE_URL` como **gate de build** —
   sem ela o canonical sai em domínio reservado; (b) rodada de Lighthouse + axe
   **contra produção**, com JSON bruto anexado à 1.9, para converter AC8/AC9/AC11
   de `[~]` em `[x]`.
2. **@lead** — adjudicar os MEDIUM/LOW da tabela R3.4 (aceitar como dívida
   registrada ou abrir story de hardening). **Cap de 3 rodadas atingido: eu não
   reabro o ciclo com o alpha por nenhum desses itens.**
3. **@sites-architect** — se o lead optar por hardening, os candidatos de maior
   retorno são M2 (hora errada em build de CI — é bug de produção, não estética),
   M4 (indicador de foco abaixo de 3:1) e M1 (`og:title` duplicado).
4. **Nenhuma ação pendente para @sites-dev-alpha.** Os seis findings que lhe
   foram atribuídos nesta rodada estão fechados com evidência.

### R3.8 Registro sobre o ciclo

Três rodadas, três veredictos: FAIL → CONCERNS → CONCERNS. O CRITICAL e os cinco
HIGH da rodada 1 morreram na rodada 2 e **não regrediram** na 3 — reconfirmei
cada um contra o meu próprio build, não contra o relato. Os seis findings novos
da rodada 2 morreram na rodada 3. O único item que atravessou as três rodadas sem
ser resolvido é o mesmo desde o começo: **ninguém rodou Lighthouse**. Ele fecha
com honestidade de registro, não com evidência — e está explicitamente marcado
como tal em três lugares (story, este relatório e `results.md`).
