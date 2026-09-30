---
kind: episode
status: done
summary: "sites-dev-alpha (Novael) implementou as 9 stories do épico 1 (fundação → SEO/performance) do site do Galo em uma sessão — build limpo, Lighthouse mobile auditado nas 5 rotas."
expires: 2026-12-09
---

# Sessão sites-dev-alpha — 2026-09-09 — Implementação completa do site do Galo

## O que foi feito
Repositório estava vazio (sem `package.json`, sem git). Implementadas as 9 stories do épico 1 em sequência (1.1 → 1.3 → 1.2 → 1.4 → 1.5/1.6/1.7/1.8 → 1.9), seguindo a ordem recomendada pelo archi. Todas movidas de `stories/active/` para `stories/in-review/` com AC marcados e Dev Agent Record preenchido.

## Ambiente (relevante para qualquer sessão futura nesta máquina)
- Node.js/pnpm **não estavam instalados**. Instalados via `winget install OpenJS.NodeJS.LTS` + `npm install -g pnpm`.
- `pnpm@12` (a versão que o `npm i -g pnpm` traz por padrão) tem um bug de symlink quebrado no `node_modules` neste Windows/MSYS (`sharp` e possivelmente outros pacotes nativos ficam irresolvíveis). **Fixado em `pnpm@9.15.9`** (a versão que o tech-stack já pedia) com `node-linker=hoisted` no `.npmrc` — resolve o problema.
- `shadcn@latest` (CLI atual, versão 4.x) por padrão usa preset `base-nova`: pacote `cn` externo + `@base-ui/react` em vez de Radix. Para alinhar com o tech-stack ("clsx + tailwind-merge via cn()", componentes Radix clássicos), rodar `shadcn init -b radix` explicitamente.
- `lucide-react` na versão instalada (1.43) **não tem mais ícones de marca** (Instagram/Facebook/YouTube/Twitter foram removidos upstream). Usar ícones genéricos + `aria-label` nomeando a plataforma.
- Chrome já está instalado em `C:\Program Files\Google\Chrome\Application\chrome.exe` — útil para rodar Lighthouse via `npx lighthouse` sem precisar baixar Chromium.
- `pkill`/`kill` não existem neste Git Bash; usar `netstat -ano | grep ":PORTA"` + `taskkill //F //PID <pid>`.

## Decisões técnicas registradas
- Todas as imagens do site são **geradas** via `scripts/generate-placeholders.mjs` (usa `sharp` para compor SVGs simples com listras/estrela dourada e rasterizar) — zero fotografia licenciada/escudo oficial, conforme restrição do projeto.
- `Reveal` (Motion) ganhou variantes `RevealGroup`/`RevealItem` para grids grandes (elenco tem 20 jogadores): stagger orquestrado por **um único** `IntersectionObserver` por grupo em vez de um por item. Isso derrubou o TBT da Home de 590ms → ~50-160ms e subiu a Performance de 74 → 90-95 em todas as rotas.
- `trophies.ts` só tem 6 grupos de competição (não bate literalmente com "≥10 conquistas" da story 1.3 se lido como contagem de grupos) porque o research (`atletico-mineiro-facts.md`) só documenta essas 6 com precisão. Optei por não inventar competições/anos — sinalizado como ressalva nas stories 1.3/1.6, reportado ao lead.
- Lighthouse mobile rodado contra `pnpm build && pnpm start` (nunca `pnpm dev`), conforme a nota técnica da 1.9. LCP simulado ficou 2.7s-3.5s (acima do orçamento de 2.5s) em todas as rotas, mas isso é atribuído ao modelo de throttling simulado do Lighthouse contra `localhost` sem CDN — o payload real do hero é ~8KB e carrega em ~200ms sem throttling. CLS = 0 e Accessibility = 100 em todas as 5 rotas.

## Pendências para o lead / próximos agentes
1. **QA formal** (sites-qa) ainda não rodou nas 9 stories — estão em `in-review/`, não `done/`.
2. `trophies.ts` com 6 grupos vs. o volume sugerido — decidir se `sites-analyst` deve pesquisar mais competições/anos ou se o AC deve ser reinterpretado (contagem de conquistas individuais, que já soma 55).
3. URLs de redes sociais em `content/club.ts` estão marcadas `TODO(pesq)` — são handles plausíveis, não confirmados pela pesquisa.
4. LCP real (pós-deploy, com CDN) deve ser revalidado — não é possível medir localmente com precisão devido ao modelo de throttling do Lighthouse.
5. Repositório git **não foi inicializado** neste diretório — nenhum commit foi feito nesta sessão.

## Relacionados
- [[../stories/in-review/1.9-seo-tecnico-performance-a11y]] — números completos de Lighthouse por rota
- [[../project/tech-stack]]
