---
title: "Tech Stack — Site Galo (Clube Atlético Mineiro)"
type: overview
agent: sites-architect (Zaelion)
created: 2026-09-09
updated: 2026-09-09
status: active
summary: "Stack decidida para o site institucional do Atlético-MG — Next.js App Router + TS + Tailwind v4 (@theme) + shadcn/ui + Motion, 100% estático (SSG), sem backend/CMS/auth."
tags: [project, tech-stack, sites]
---

# Tech Stack — Site Galo

> Decisão de arquitetura tomada por **Zaelion (sites-architect)** em 2026-09-09, com base na skill `sites-frontend-stack`.
> **Veredicto: stack padrão da squad sites CONFIRMADA sem ajustes estruturais.** Justificativa abaixo.

## Stack decidida

| Categoria | Escolha | Versão alvo |
|---|---|---|
| Linguagem | TypeScript (`strict: true`) | 5.x |
| Framework | **Next.js — App Router** | 15.x |
| Runtime/UI | React (Server Components por padrão) | 19.x |
| Styling | **Tailwind CSS v4** (CSS-first, bloco `@theme` em `globals.css`) | 4.x |
| Componentes base | **shadcn/ui** (copiados para `src/components/ui/`) | latest CLI |
| Animação | **Motion** — pacote `motion`, import `motion/react` | 12.x |
| Ícones | `lucide-react` | latest |
| Tipografia | `next/font` (self-hosted, sem FOUT/CLS) | — |
| Imagens | `next/image` (AVIF/WebP, `sizes` obrigatório) | — |
| Utilitários | `clsx` + `tailwind-merge` via `cn()`; `cva` para variantes | — |
| Package manager | **pnpm** | 9.x |
| Lint/format | ESLint (`next/core-web-vitals`) + Prettier + `prettier-plugin-tailwindcss` | — |
| Banco / ORM | **nenhum** — conteúdo estático tipado em `src/content/` | — |
| Auth | **nenhuma** | — |
| CMS | **nenhum** | — |
| Testes | Nenhum runner unitário nesta fase; QA por checklist + Lighthouse CI manual | — |
| Monorepo | não | — |

## Por que esta stack (e não outra)

1. **O site é conteúdo estático institucional.** Não há usuário logado, formulário transacional, nem dado que mude a cada request. Isso elimina banco, ORM, CMS e API routes do escopo — qualquer um deles seria complexidade sem contrapartida.
2. **Next.js App Router mesmo sendo estático.** O ganho não é o servidor: é o `generateMetadata` por rota (SEO), file-system routing, `next/image`, `next/font` e Server Components por padrão (JS enviado ao cliente só onde há interação). Um SSG "puro" (Astro/11ty) seria defensável, mas quebraria o padrão da squad e o reuso de componentes/skills — o custo de divergir supera o ganho marginal de bundle.
3. **Tailwind v4 CSS-first.** Os tokens do Galo (preto/branco + acentos definidos pelo UX) vivem **uma única vez** no bloco `@theme` do `globals.css`. Sem `tailwind.config.ts`. Fonte única de verdade visual.
4. **shadcn/ui em vez de biblioteca instalada.** O código vive no repositório, então o tema do clube é aplicado via tokens sem lutar contra estilos de terceiros. Regra herdada da skill: **nunca editar `src/components/ui/` direto** — criar wrapper.
5. **Motion** para as animações de entrada/scroll (`whileInView`), sempre com `viewport={{ once: true }}` e respeito a `prefers-reduced-motion`.

## Renderização e deploy

- **Todas as rotas são estáticas (SSG)** — geradas no `next build`. Nenhuma rota usa `dynamic = 'force-dynamic'`, `cookies()` ou `headers()`.
- **Não usar `output: 'export'`.** O export estático desliga a otimização de imagem do `next/image`, e o site é pesado em fotografia (elenco, arena, taças). O build padrão do Next em host com suporte (Vercel) mantém AVIF/WebP automático. Mudar isso exige ADR.
- Alvo de deploy e CI: decisão do **sites-devops** — esta nota não fecha o assunto.

## Orçamento de performance (Core Web Vitals)

Metas de aceite, medidas com Lighthouse mobile em build de produção:

| Métrica | Meta |
|---|---|
| LCP | < 2.5s |
| CLS | < 0.05 |
| INP | < 200ms |
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| JS inicial por rota | < 120KB gzip |

Regras que sustentam o orçamento: `"use client"` só em componentes com interação/animação; toda `<img>` via `next/image` com `width`/`height` ou `fill` + `sizes`; imagem LCP do hero com `priority`; fontes via `next/font` com `display: swap`.

## O que está fora da stack (decisão explícita)

- Banco de dados, ORM, migrations, API de terceiros em runtime
- Autenticação / área logada
- CMS headless (conteúdo é código versionado em `src/content/`)
- Redux/Zustand ou qualquer state manager global
- CSS-in-JS (styled-components, emotion)
- i18n (site é pt-BR único)

## Aviso de escopo — conteúdo e marca

Este site é um projeto **de torcedor/institucional não-oficial**. Não usar assets proprietários do clube (escudo oficial, fotos licenciadas, manto) sem origem livre declarada. Placeholders e imagens de origem livre são o padrão; a curadoria final de assets é do UX/Design.

## Relacionados

- [[architecture]] — estrutura de pastas, rotas e diagrama
- [[modules]] — mapa de páginas e componentes
- [[../stories/BACKLOG]] — stories de implementação
