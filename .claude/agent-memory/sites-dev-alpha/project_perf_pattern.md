---
name: project-perf-reveal-group-pattern
description: Padrão RevealGroup/RevealItem (Motion) para grids grandes — reduz TBT vs. um Reveal por item, e (2026-09-09) versão SSR-safe que nunca serializa opacity:0 no HTML do servidor.
metadata:
  type: project
---

No site do Galo (`src/components/shared/reveal.tsx`), animar cada item de um grid com um `<Reveal>` individual (um `whileInView`/`IntersectionObserver` da Motion por item) inflou o Total Blocking Time da Home de ~74 para ~590ms no Lighthouse mobile, porque a página tinha ~12 instâncias de Reveal (NewsGrid com 6, HistoryPreview com 4, etc.) e a página de elenco chegaria a ~20 (um por jogador).

**Fix:** `RevealGroup` (motion.ul/ol/div com `initial="hidden" whileInView="visible" variants={{ visible: { transition: { staggerChildren } } }}`) + `RevealItem` (motion.li/div com `variants` próprios, sem `whileInView` individual) — um único observer por grupo orquestra o stagger de todos os filhos via propagação de variants do Motion. TBT da Home caiu para ~50-160ms, Performance subiu de 74 para 90-95 em todas as rotas.

**Why:** cada componente Motion com `whileInView` registra seu próprio `IntersectionObserver` e overhead de hidratação; multiplicar isso por N itens de grid é o gargalo real, não o "trabalho" de animação em si.
**How to apply:** ao animar entrada de uma lista/grid com mais de ~4-5 itens neste projeto (ou qualquer projeto com Motion + Next.js App Router), preferir `RevealGroup`/`RevealItem` (ou o padrão equivalente de stagger via variants) em vez de um wrapper de animação por item. Reservar o `Reveal` de item único para elementos isolados (cards soltos, blocos de stat únicos).

## Atualização 2026-09-09 — `initial={{opacity:0}}` declarativo vaza para o SSR (QA H3)

O QA (Axilun) mediu, via `curl` no HTML servido (não em runtime de browser), que
`Reveal`/`RevealGroup`/`RevealItem` usando `initial="hidden"` (ou
`initial={{opacity:0}}`) declarativo faziam a Motion **serializar
`opacity:0;transform:translateY(24px)` como estilo inline no próprio HTML do
servidor** — 7 a 20 elementos por rota, dependendo da página. Consequência:
sem JS (ou antes da hidratação/IntersectionObserver disparar), o conteúdo
principal do site é literalmente invisível — e o maior elemento pintável de
rotas sem hero (`/titulos`, `/elenco`) nunca conta como candidato a LCP
enquanto estiver em `opacity:0`, inflando o LCP medido mesmo sem payload de
imagem pesado.

**Fix aplicado:** trocar `initial`/`whileInView` declarativos por controle
imperativo via `useAnimation()` (`motion/react`) + `useInView(ref)`: o
componente nasce **sem** nenhum estilo de opacidade inline (SSR e primeiro
paint da hidratação = sempre visível). Só depois de montar no cliente, dentro
de um `useLayoutEffect` (síncrono, roda antes do browser pintar — evita flash
de "aparece e some"), chama `controls.set(hidden)` para armar o estado oculto;
quando `useInView` retorna `true`, `controls.start(visible)` anima a entrada.
`useLayoutEffect` não roda no servidor, então precisa de um guard
`typeof window !== "undefined" ? useLayoutEffect : useEffect` para não gerar o
warning "useLayoutEffect does nothing on the server".

**Why:** o objetivo (progressive enhancement real) exige que "oculto até
entrar no viewport" seja um comportamento **só de JS**, nunca parte do
contrato SSR — caso contrário usuário sem JS, crawler que não executa JS, ou
qualquer atraso de hidratação deixam a página com conteúdo w/ `opacity:0`
"travado".
**How to apply:** qualquer wrapper de entrada por scroll neste projeto (ou
projeto similar Next.js + Motion) deve seguir esse padrão — nunca usar
`initial={{opacity:0}}` (ou variant "hidden" como `initial` literal) direto em
um Server/Client Component cujo HTML sai do servidor. Verificar com
`grep -o "opacity:0" .next/server/app/<rota>.html | wc -l` (ou `curl` num
server rodando) depois de qualquer mudança em `reveal.tsx` — o número
esperado é sempre 0.

## Atualização 2026-09-09 (rodada 3) — `useLayoutEffect` incondicional ainda pisca na hidratação (QA N2)

Mesmo com o fix acima (H3), o `useLayoutEffect` que arma `controls.set(HIDDEN)`
rodava **incondicionalmente** no mount — inclusive para elementos que o
servidor já entregou visíveis e que o browser **já pintou** dentro do primeiro
viewport antes de o React hidratar. Sequência do bug: pintado visível (HTML do
servidor) → hidrata → `useLayoutEffect` esconde → `useInView`/IntersectionObserver
dispara no frame seguinte → reaparece. Resultado: flash "aparece e some e
reaparece" em qualquer elemento acima da dobra (`/historia`, `/titulos`,
`/elenco` — sem hero, conteúdo alto na página).

**Fix:** dentro do próprio `useLayoutEffect` (síncrono, antes do paint do
cliente), fazer uma checagem **síncrona** de geometria
(`el.getBoundingClientRect()` vs. `window.innerHeight/innerWidth`) — **não**
usar o valor de `useInView`, que é assíncrono e ainda não resolveu nesse ponto.
Se o elemento já está no viewport, pular `controls.set(HIDDEN)` inteiramente
(fica no estado natural/visível, sem animação de entrada). Só o que está fora
do viewport (abaixo da dobra) entra oculto para animar normalmente quando o
`IntersectionObserver` disparar depois.

**Why:** a regra "nunca esconder o que o usuário já viu" tem prioridade sobre
"sempre animar tudo" — um flash de conteúdo é pior UX que perder a animação de
entrada em conteúdo que nasce visível.
**How to apply:** qualquer wrapper de entrada por scroll com controle
imperativo (`useAnimation`) neste projeto precisa dessa checagem síncrona
antes de esconder algo no primeiro layout effect pós-mount — não basta o
estado nascer sem `opacity:0` no SSR (isso resolve só a parte de crawler/no-JS,
não a de flash na hidratação real).

Ver também [[project-env-setup]].
