---
kind: spec
status: done
summary: "Component specs por seção (Header/Nav, Hero, Timeline de História, Cards de Títulos, Seção do Estádio, Footer) para o site do Atlético Mineiro — props, estados, breakpoints, a11y. Consumir junto com [[design-direction]]."
---

# Component Specs — Site Atlético Mineiro

Pré-requisito: ler [[design-direction]] primeiro (paleta, tipografia, tokens, princípios de motion/contraste referenciados abaixo por nome de token).

---

## Header / Nav

**Propósito:** navegação principal persistente; primeiro ponto de contato com a identidade visual (preto/branco/escudo).

**Estrutura (desktop, ≥1024px):**
```
┌──────────────────────────────────────────────────────────┐
│ [Escudo+Wordmark]     Início  História  Títulos  Estádio  │
│                                              [CTA: Ingressos]│
└──────────────────────────────────────────────────────────┘
```

**Estrutura (mobile, <640px):**
```
┌───────────────────────────────┐
│ [Escudo]              [☰ Menu]│
└───────────────────────────────┘
```
Menu mobile abre como painel full-screen overlay (`--color-bg-primary` a 98% opacidade), não dropdown pequeno — reduz erro de toque e reforça peso visual.

**Comportamento sticky:**
- Estado inicial (topo da página, scrollY = 0): fundo transparente, texto branco, sem sombra — sobre a Hero.
- Ao ultrapassar `scrollY > 80px`: fundo `--color-bg-primary` sólido + `box-shadow: 0 1px 0 var(--color-border)`, transição 200ms ease (ver seção 5 de [[design-direction]]).
- Nunca esconder o header ao rolar para baixo (torcedor precisa de acesso constante à navegação) — sempre sticky visível.

**Props:**
| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `logoHref` | string | sim | destino do clique no escudo (geralmente `/`) |
| `navItems` | `{label, href}[]` | sim | itens do menu |
| `ctaLabel` / `ctaHref` | string | não | CTA opcional destacado (ex. "Ingressos", "Loja") |
| `isTransparentAtTop` | boolean | não (default true) | controla o comportamento sticky da seção acima |

**Estados:**
- Default (topo): transparente.
- Scrolled: sólido com sombra.
- Item de nav hover/focus: sublinhado dourado (`--color-accent`) crescendo da esquerda, 150ms, nunca mudança de cor de texto pura (baixo contraste demais se for sutil).
- Item de nav ativo (rota atual): sublinhado dourado fixo + peso 600.
- CTA: fundo `--color-accent`, texto `--color-bg-primary` (contraste 8.8:1, ok), hover `--color-accent-hover`.
- Mobile menu aberto: `body` com scroll lock; botão de menu vira "X".

**Acessibilidade:**
- `<nav aria-label="Navegação principal">`.
- Botão hambúrguer: `aria-expanded`, `aria-controls` apontando pro painel, `aria-label="Abrir menu"` / `"Fechar menu"` dinâmico.
- Foco visível (`--color-focus-ring`) em todo item, inclusive dentro do overlay mobile.
- Ao abrir overlay mobile, foco move para o primeiro item de nav; `Esc` fecha e devolve foco ao botão hambúrguer (focus trap dentro do painel).
- Ordem de tab: logo → itens de nav → CTA → botão de menu (mobile).

**Responsivo:**
- Mobile (<640px): logo + hambúrguer apenas, CTA some do header (fica disponível dentro do menu).
- Tablet (640-1023px): mesmo padrão mobile ou nav compacta sem CTA, a critério do dev conforme espaço.
- Desktop (≥1024px): nav completa + CTA visível.

---

## Hero

**Propósito:** primeira impressão — declarar identidade do clube com máximo impacto emocional antes de qualquer conteúdo informativo.

**Estrutura:**
```
┌──────────────────────────────────────────────────────┐
│ [Imagem/vídeo full-bleed: torcida/estádio, overlay   │
│  escuro gradiente de baixo p/ cima]                   │
│                                                        │
│         GALO (Playfair Display, --text-display-xl)   │
│         linha de apoio (--text-body-lg, --fg-muted)   │
│         [CTA primário]  [CTA secundário/link]         │
└──────────────────────────────────────────────────────┘
```

**Altura:** `min-height: 100svh` no mobile e desktop (usar `svh`, não `vh`, para evitar salto por barra de endereço mobile); nunca menor que 480px em telas muito baixas (usar `min-height: max(480px, 100svh)` cuidado — na prática `min-height: 100svh` com fallback já resolve).

**Overlay de imagem:** gradiente linear de `rgba(10,10,10,0.15)` no topo a `rgba(10,10,10,0.85)` na base — garante contraste AA do texto branco sobre a base da imagem, onde o texto se posiciona (alinhado à base, não centralizado verticalmente — reforça peso editorial tipo capa de revista).

**Props:**
| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `backgroundImage` / `backgroundVideo` | string | sim (um dos dois) | mídia de fundo |
| `eyebrow` | string | não | rótulo curto acima do título (ex. "DESDE 1908") em `--text-caption` |
| `title` | string | sim | título principal |
| `subtitle` | string | não | linha de apoio |
| `primaryCta` / `secondaryCta` | `{label, href}` | não | CTAs |

**Estados:**
- Entrada: título e subtítulo fazem fade+translateY conforme seção 5 de [[design-direction]], com leve stagger (título primeiro, subtítulo +100ms, CTAs +200ms) — dá sensação de "revelação", não pisca tudo junto.
- Se vídeo de fundo: pausa automaticamente com `prefers-reduced-motion: reduce`, cai para poster estático.
- CTA primário: fundo `--color-accent`; hover `--color-accent-hover` + leve `scale(1.02)`, 150ms.
- CTA secundário: outline/link sublinhado branco, hover vira dourado.

**Acessibilidade:**
- Texto sempre sobre a parte mais escura do gradiente — nunca depender só da imagem para garantir contraste; se a imagem for muito clara em algum ponto, o overlay mínimo de 0.85 na base cobre isso.
- Vídeo de fundo: `muted`, `autoplay` apenas se `!prefers-reduced-motion`, sem áudio nunca autoplay com som, e com `aria-hidden="true"` (decorativo — não é conteúdo essencial).
- `<h1>` único da página vive aqui (o `title`).

**Responsivo:**
- Mobile: texto ocupa até 90% da largura, alinhado à esquerda, padding lateral padrão do container.
- Desktop: texto limitado a `max-width: 640px` dentro do container, não estica em telas wide.

---

## Timeline de História

**Propósito:** narrar a trajetória histórica do clube de forma navegável — reforça "tradição" via progressão temporal, não parede de texto.

**Estrutura (desktop, ≥1024px) — linha vertical central com eventos alternando esquerda/direita:**
```
                    │
   [Card evento A]  ●
                    │
                    ●  [Card evento B]
                    │
   [Card evento C]  ●
                    │
```

**Estrutura (mobile, <1024px) — linha vertical à esquerda, todos os cards à direita (alternância não funciona em coluna estreita):**
```
● [Card evento A]
│
● [Card evento B]
│
● [Card evento C]
```

**Cada nó (`●`)** usa o motivo de estrela (seção 7 de [[design-direction]]) em vez de círculo genérico quando o evento é um título/conquista; círculo simples para eventos históricos neutros (fundação, mudança de nome, construção de estádio etc).

**Props:**
| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `events` | `{year, title, description, image?, isHighlight?}[]` | sim | lista ordenada cronologicamente |
| `isHighlight` | boolean | não | marca o nó com estrela dourada + card com borda `--color-accent` |

**Estados:**
- Card default: fundo `--color-bg-surface`, borda `--color-border`.
- Card highlight: borda `--color-accent` 2px, nó em estrela dourada preenchida.
- Entrada: cada card anima independentemente ao entrar no viewport (fade+translateY conforme seção 5), a linha vertical pode "desenhar" progressivamente via `stroke-dashoffset` se implementada em SVG — opcional, não bloqueante para MVP.
- Hover em card (se clicável/expansível): leve elevação (`box-shadow`) + borda muda para `--color-border-light`... **não**, manter `--color-accent` sutil em opacity 40% no hover para não quebrar hierarquia com highlight.

**Acessibilidade:**
- Estrutura semântica: `<ol>` (é uma sequência ordenada), cada evento é `<li>`.
- Ano de cada evento em elemento de destaque legível (`--text-display-md`), nunca só na cor — sempre como texto explícito, não codificado apenas por posição.
- Se a timeline for interativa/expansível (ex. "ler mais"), botão com `aria-expanded` e foco visível.

**Responsivo:**
- <1024px: coluna única, linha à esquerda (~24px do início do card).
- ≥1024px: alternância esquerda/direita, linha central, cards com `max-width: 45%` do container.

---

## Cards de Títulos / Conquistas

**Propósito:** exibir taças e campeonatos de forma escaneável e prestigiosa — é a seção que mais carrega a sensação de "força" do clube.

**Estrutura (grid de cards):**
```
┌───────────┐ ┌───────────┐ ┌───────────┐
│ ★ 1971    │ │ ★ 2013    │ │ ★ 2021    │
│ Brasileiro│ │ Libertad. │ │ Mineiro   │
│ [detalhe] │ │ [detalhe] │ │ [detalhe] │
└───────────┘ └───────────┘ └───────────┘
```

**Grid:** `grid-template-columns: repeat(1, 1fr)` mobile, `repeat(2, 1fr)` tablet, `repeat(3, 1fr)` desktop, `repeat(4, 1fr)` wide (≥1440px). Gap `1.5rem`.

**Props:**
| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `titles` | `{year, competition, count?, description?}[]` | sim | lista de conquistas |
| `count` | number | não | se a competição foi vencida mais de uma vez, exibir "×N" |
| `filterByCompetition` | boolean | não | habilita filtro/tabs por tipo de competição (Brasileiro, Libertadores, Mineiro etc.) |

**Estados:**
- Default: fundo `--color-bg-surface`, ícone de estrela dourada no topo do card (motivo gráfico, seção 7 de [[design-direction]]), ano em `--text-display-md` Oswald.
- Hover/focus: `transform: translateY(-4px)`, `box-shadow` sutil, borda muda de `--color-border` para `--color-accent`, 200ms ease.
- Se `filterByCompetition` ativo: tabs com estado ativo sublinhado dourado, igual ao padrão do nav.
- Card vazio/sem resultado de filtro: estado empty com mensagem central (`--text-body`, `--fg-muted`) — "Nenhum título encontrado nesta categoria."

**Acessibilidade:**
- Grid de cards como `<ul>`/`<li>` se a ordem importa semanticamente (cronológica), senão `<div role="list">`.
- Filtro por tabs: usar padrão ARIA `role="tablist"`/`role="tab"`/`role="tabpanel"` com navegação por setas do teclado.
- Contraste do texto sobre `--color-bg-surface` (`#141414`) segue os pares definidos em [[design-direction]] — não introduzir texto dourado pequeno aqui (só o ícone de estrela usa o acento).

**Responsivo:** ver grid acima. Em mobile, cards ocupam largura total do container, empilhados verticalmente com gap `1rem`.

---

## Seção do Estádio

**Propósito:** apresentar a "casa" do clube — combina informação (localização, capacidade) com apelo emocional (imagem grande, atmosfera de jogo).

**Estrutura (desktop, split 50/50):**
```
┌───────────────────┬────────────────────┐
│                    │ NOME DO ESTÁDIO    │
│   [Imagem grande]  │ descrição curta    │
│                    │ • Capacidade: X    │
│                    │ • Inaugurado: X    │
│                    │ [CTA: Saiba mais]  │
└───────────────────┴────────────────────┘
```

**Props:**
| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `stadiumName` | string | sim | nome do estádio |
| `image` | string | sim | imagem representativa |
| `description` | string | sim | texto curto |
| `stats` | `{label, value}[]` | não | lista de dados (capacidade, ano etc.) |
| `cta` | `{label, href}` | não | link para página dedicada, se existir |

**Estados:**
- Imagem: leve zoom no hover se a seção inteira for clicável (`transform: scale(1.03)`, 300ms, `overflow: hidden` no container) — só se a seção for interativa; se for puramente informativa, sem hover na imagem.
- Stats: cada item com ícone simples (não decorativo genérico — usar ícones relacionados a estádio: localização, capacidade, calendário) + `aria-hidden` no ícone, texto explícito ao lado.
- CTA: mesmo padrão de botão secundário definido na Hero.

**Acessibilidade:**
- Imagem grande com `alt` descritivo (não vazio — é conteúdo informativo, diferente do vídeo decorativo da Hero).
- Lista de stats como `<dl>` (`<dt>`label / `<dd>`value) — semântica correta para pares chave-valor.

**Responsivo:**
- Mobile (<1024px): empilhado — imagem em cima (altura `50vh` máx), conteúdo textual embaixo, sem split.
- Desktop (≥1024px): split 50/50 conforme estrutura acima; em wide (≥1440px) pode ir para 55/45 (imagem maior).

---

## Footer

**Propósito:** encerramento institucional — links úteis, redes sociais, identidade reforçada uma última vez, sem competir visualmente com o conteúdo acima.

**Estrutura:**
```
┌──────────────────────────────────────────────────────┐
│ [Escudo pequeno]   Sobre   História   Títulos  Contato│
│                                                        │
│ [Redes sociais: ícones]                                │
│ ─────────────────────────────────────────────────────│
│ © 2026 Clube Atlético Mineiro. Todos os direitos...   │
└──────────────────────────────────────────────────────┘
```

**Fundo:** `--color-bg-primary` (preto), consistente com o restante do tema escuro — footer não vira "seção branca de contato" genérica.

**Props:**
| Prop | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `columns` | `{title, links: {label, href}[]}[]` | sim | colunas de links |
| `socialLinks` | `{platform, href}[]` | não | ícones de redes sociais |
| `copyrightText` | string | sim | texto legal |

**Estados:**
- Link default: `--color-fg-muted`; hover/focus: `--color-fg-primary` + sublinhado dourado sutil (mesmo padrão de micro-interação do nav, reforça consistência de sistema).
- Ícones sociais: círculo com borda `--color-border`, hover preenche com `--color-accent` e ícone vira preto (`--color-bg-primary`) para manter contraste.

**Acessibilidade:**
- `<footer>` semântico, cada coluna de links como `<nav aria-label="{título da coluna}">`.
- Ícones sociais com `aria-label="{Plataforma} do Clube Atlético Mineiro"` (nunca só o ícone sem texto acessível).
- Contraste de `--color-fg-muted` sobre `--color-bg-primary` já validado em [[design-direction]] (7.1:1).

**Responsivo:**
- Mobile: colunas empilham verticalmente, cada uma com título colapsável (accordion) opcional se a lista de links for longa — decisão do dev conforme volume real de conteúdo.
- Desktop: colunas lado a lado conforme estrutura acima.

---

## Checklist de consistência entre componentes

- Todo elemento interativo usa o mesmo padrão de foco (`--color-focus-ring`, seção 4 de [[design-direction]]).
- Todo hover/transição usa 150-200ms ease, nunca instantâneo.
- O acento dourado nunca é usado como cor de texto de corpo — só ícones, bordas, sublinhados, badges com texto escuro por cima.
- Toda animação de entrada respeita `prefers-reduced-motion`.
