---
kind: episode
status: done
summary: "sites-dev-alpha retomou sessão interrompida por limite de API: baixou as 5 fotos do elenco que faltavam (Reinier, Alan Franco, Mateo Cassierra, Alan Minda, Dudu) + 3 fotos reaproveitadas em public/images/news/ (fred, renan-lodi, leo-duarte); confirmou que squad.ts, news.ts, quiz.ts, lib/quiz.ts, quiz/page.tsx, quiz-runner.tsx e navigation.ts já estavam corretos de sessão anterior. Validou AC4 da story 2.1 ao vivo (build quebra com conteúdo inválido, verde com conteúdo real). lint/typecheck/build passam."
expires: 2026-12-30
---

# Sessão sites-dev-alpha — 2026-09-30 (retomada) — fotos do elenco + verificação story 2.1

## Contexto
Sessão anterior foi interrompida por limite de uso da API, não por erro de código. Trabalho já estava quase todo pronto em disco; esta sessão foi de **verificação + conclusão do que faltava**, não reescrita.

## O que já estava pronto (confirmado, não tocado)
- `src/content/squad.ts` — já tinha os 15 jogadores com `photo`/`photoAttribution` corretos, incluindo os 5 que ainda não tinham arquivo de imagem em disco.
- `src/content/news.ts` — já reescrito com as 6 notícias reais de [[../agents/research/noticias-reais-2026]].
- `src/content/quiz.ts`, `src/lib/quiz.ts`, `src/app/quiz/page.tsx`, `src/components/sections/quiz-runner.tsx`, `src/types/content.ts` (tipos Quiz*) — completos e corretos conforme story 2.1.
- `src/content/navigation.ts` — já tinha `{ label: "Quiz", href: "/quiz" }` como último item.
- `src/app/sitemap.ts` — já incluía `/quiz`.

## O que foi completado nesta sessão
- Rodei `scripts/_tmp-fetch-images.mjs` (script one-off já existente, usa `sharp`), que baixou do Wikimedia Commons:
  - `public/images/squad/reinier.jpg`, `alan-franco.jpg`, `mateo-cassierra.jpg`, `alan-minda.jpg`, `dudu.jpg` (as 5 que faltavam, URLs conforme [[../agents/research/fotos-elenco-wikimedia]]).
  - `public/images/news/fred.jpg`, `renan-lodi.jpg`, `leo-duarte.jpg` — `news.ts` já referenciava esses paths mas os arquivos não existiam em disco (gap real encontrado: o script também gera essas 3, reaproveitando fred/renan-lodi do elenco e uma foto distinta de Léo Duarte no Başakşehir para a notícia).
- Validei AC4 da story 2.1 ao vivo: corrompi `quiz.ts` de duas formas (tipo inválido em `correctOptionId` → pego pelo TypeScript; `id` duplicado → pego em runtime por `assertQuizIntegrity`, build falha com `Failed to collect page data for /quiz`), depois restaurei o arquivo original (`diff` confirmou idêntico byte a byte) e confirmei build verde com `/quiz` listado como `○` estático.
- Atualizei Dev Agent Record + File List da story ([[../stories/active/2.1-pagina-quiz]]), sem marcar checkboxes de AC (não tenho evidência de navegador para AC1/AC6/AC9/AC11 nesta sessão — fica pendente de passe manual/QA).

## Validação
`pnpm lint` (0 erros), `pnpm typecheck` (0 erros), `pnpm build` (13/13 páginas estáticas, `/quiz` como `○`).

## Pendências
- AC1 (overflow visual do nav em 768px), AC6/AC9 (fluxo do quiz jogado manualmente só com teclado + foco + `aria-live`), AC11 (console sem aviso de hidratação) não foram verificados nesta sessão — requerem navegador, não só build. Recomendo QA rodar esse passe antes de mover a story para `done/`.

## Relacionados
- [[../agents/research/fotos-elenco-wikimedia]]
- [[../agents/research/noticias-reais-2026]]
- [[../stories/active/2.1-pagina-quiz]]
