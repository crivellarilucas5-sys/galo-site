---
kind: spec
status: done
summary: "Direção visual do site do Atlético Mineiro — paleta preto/branco/dourado, tipografia editorial-esportiva, princípios de contraste AA e motion. Base para todos os component specs."
---

# Direção Visual — Site institucional/torcedor Atlético Mineiro

## 1. Conceito

Editorial esportivo de tradição, não "landing page de startup". Referências de sensação: revista esportiva impressa + jornal de torcida + peso de escudo centenário. Estrelas do escudo e a identidade do "Galo" (mascote) aparecem como motivo gráfico recorrente, nunca como ilustração fofa/infantil.

Palavras-chave que toda decisão visual deve servir: **tradição, força, paixão de torcida**. Se um componente parecer genérico (poderia ser reaproveitado por qualquer SaaS), está errado.

## 2. Paleta

Base preto e branco (identidade oficial do clube), com um único acento de apoio — não se usa "dourado" como cor decorativa espalhada, e sim como marcador cirúrgico de destaque/prestígio (títulos, CTAs, estrelas).

| Token | Hex | Uso |
|---|---|---|
| `--color-bg-primary` | `#0A0A0A` | Fundo principal (preto quase puro, não `#000` cru — evita banding e "peso" digital excessivo) |
| `--color-bg-surface` | `#141414` | Cards, superfícies elevadas sobre o fundo preto |
| `--color-fg-primary` | `#FFFFFF` | Texto principal sobre fundo escuro |
| `--color-fg-muted` | `#B3B3B3` | Texto secundário sobre fundo escuro (contraste 7.1:1 sobre `#0A0A0A` — AA/AAA ok) |
| `--color-bg-light` | `#FFFFFF` | Fundo alternado em seções claras (respiro editorial) |
| `--color-fg-on-light` | `#0A0A0A` | Texto sobre fundo claro |
| `--color-fg-on-light-muted` | `#4D4D4D` | Texto secundário sobre fundo claro (contraste 8.4:1) |
| `--color-accent` | `#C9A227` | Dourado envelhecido (prestígio/estrelas/títulos) — usar com parcimônia |
| `--color-accent-hover` | `#E0B830` | Hover/estado ativo do acento |
| `--color-border` | `#2A2A2A` | Divisores sobre fundo escuro |
| `--color-border-light` | `#E0E0E0` | Divisores sobre fundo claro |
| `--color-focus-ring` | `#C9A227` | Anel de foco (ver seção 4) |

Nunca usar cinza médio (`#808080`-ish) como cor de texto principal — falha em contraste e é visualmente "morto". `--color-fg-muted` e `--color-fg-on-light-muted` já foram calculados para passar AA em body text (≥4.5:1).

## 3. Tipografia

Duas famílias, papéis bem separados:

- **Headlines/display** (`--font-display`): serifada condensada de alto contraste de traço ou slab serif com peso — transmite "jornal esportivo" e "placa de bronze". Exemplos de referência de estilo (escolher equivalente disponível via `next/font` ou Google Fonts): **"Oswald"** (condensada, boa para números/placares/títulos de seção) combinada com **"Playfair Display"** (serifada, para citações/manchetes de grande impacto quando se quer solenidade). Usar Oswald como padrão de headline; Playfair Display reservado para a Hero e para citações de torcedores/jogadores.
- **Corpo** (`--font-body`): sans-serif humanista de alta legibilidade — **"Inter"** ou **"Source Sans 3"**. Nunca usar a fonte condensada de headline em parágrafos longos.

Escala tipográfica (mobile-first, `rem`, base 16px):

| Token | Mobile | Desktop (≥1024px) | Fonte | Peso |
|---|---|---|---|---|
| `--text-display-xl` (Hero) | 2.5rem / 1.1 | 5rem / 1.05 | Playfair Display | 700 |
| `--text-display-lg` (título de seção) | 2rem / 1.15 | 3rem / 1.1 | Oswald | 600, uppercase, tracking +0.02em |
| `--text-display-md` (subtítulo de card) | 1.25rem / 1.3 | 1.5rem / 1.3 | Oswald | 500, uppercase |
| `--text-body-lg` | 1.125rem / 1.6 | 1.25rem / 1.6 | Inter | 400 |
| `--text-body` | 1rem / 1.6 | 1rem / 1.6 | Inter | 400 |
| `--text-caption` | 0.875rem / 1.5 | 0.875rem / 1.5 | Inter | 500, uppercase, tracking +0.05em |

## 4. Contraste e foco (WCAG AA) — tratamento explícito do risco preto/branco

O par preto/branco puro em áreas grandes de texto pode gerar contraste excessivo (fadiga visual, não é falha AA mas prejudica leitura prolongada) e, invertido, más combinações (ex.: dourado sobre branco) podem falhar AA. Regras obrigatórias:

1. **Nunca** `--color-accent` (`#C9A227`) como cor de texto de corpo sobre fundo claro — contraste ~2.1:1, falha AA. Acento só em: ícones grandes (≥24px, ok como "graphic"), bordas, backgrounds de badge com texto preto por cima, sublinhados/detalhes.
2. Texto de corpo nunca abaixo de 4.5:1; texto grande (≥24px ou 19px bold) nunca abaixo de 3:1. Os pares definidos na paleta (seção 2) já cumprem isso — não criar combinações novas sem checar.
3. **Foco visível obrigatório em todo elemento interativo**: `outline: 2px solid var(--color-focus-ring); outline-offset: 2px`. Nunca `outline: none` sem substituto equivalente. O anel dourado sobre fundo preto ou branco passa contraste de não-texto (3:1 mínimo).
4. Ordem de tab lógica = ordem visual/DOM. Nenhum componente usa `tabindex` positivo.
5. Todo ícone informativo (sem texto ao lado) leva `aria-label`. Ícones puramente decorativos levam `aria-hidden="true"`.
6. Animações respeitam `prefers-reduced-motion: reduce` — spec de motion (seção 5) define o fallback.

## 5. Motion e interação (princípios gerais — detalhe por componente nas specs de seção)

- Header: transição sticky com `transition: background-color 200ms ease, box-shadow 200ms ease` — nunca abrupta.
- Entrada de seções: fade + translateY(16px)→0, 400-600ms, `ease-out`, disparado por `IntersectionObserver` (threshold 0.2), **uma vez só** (não repete ao rolar de novo).
- Hover em cards/links: transição de 150-200ms em cor/transform, nunca instantânea nem >300ms (parece travado).
- Reduced motion: todas as transições de entrada caem para opacity-only 150ms ou aparecem instantaneamente; nenhum parallax/scroll-jacking quando `prefers-reduced-motion: reduce`.

## 6. Grid e espaçamento

- Container máx: `1280px`, padding lateral `1.5rem` mobile / `2.5rem` desktop.
- Espaçamento em escala base-8 (`0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem, 8rem`).
- Breakpoints: `mobile: 0-639px`, `tablet: 640-1023px`, `desktop: 1024-1439px`, `wide: 1440px+`.

## 7. Motivo gráfico "estrelas"

O escudo do clube carrega estrelas (representando conquistas). Usar estrela como elemento gráfico recorrente e funcional — não decoração aleatória:
- Marcador de item em listas de títulos/conquistas.
- Indicador de "destaque" em cards (ex.: título mais recente).
- Nunca como bullet genérico em texto corrido comum.

Ver specs de componente por seção em [[components]].
