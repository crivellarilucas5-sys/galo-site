---
title: "ADR-001: Quiz como ilha client única dentro de rota SSG"
kind: decision
type: adr
status: accepted
agent: sites-architect (Zaelion)
created: 2026-09-30
updated: 2026-09-30
summary: "/quiz fica SSG; só components/sections/quiz-runner.tsx é 'use client' (estado em memória, sem persistência). O gabarito vai no bundle, o que é aceito. O conteúdo continua tipado em src/content/quiz.ts."
tags: [adr, architecture, quiz, client-component]
related: ["[[../stories/active/2.1-pagina-quiz]]", "[[../project/architecture]]"]
---

# ADR-001: Quiz como ilha client única dentro de rota SSG

## Contexto
A [[../project/architecture]] fixa Server Component como padrão e restringe `"use client"` a uma lista fechada (`site-header`, `mobile-nav`, `reveal`, componentes com `motion/react`). O quiz ([[../stories/active/2.1-pagina-quiz]]) precisa de estado de interação (resposta escolhida, pergunta atual, pontuação), e isso exige um componente client. Adicionar um item à lista é desvio da arquitetura, e desvio de arquitetura exige ADR.

## Decisão
1. `/quiz` continua **SSG**. `page.tsx` é Server Component: renderiza h1 e intro, define metadata e valida o conteúdo (`assertQuizIntegrity`) em build.
2. **Só** `src/components/sections/quiz-runner.tsx` é `"use client"`. Recebe perguntas e faixas por props e não importa de `@/content`.
3. Estado **apenas em memória** (React state). Sem localStorage, cookie, backend ou analytics.
4. Regras de pontuação e faixa em `src/lib/quiz.ts` (funções puras), que são a fonte única do cálculo.
5. Ordem fixa de perguntas e alternativas, para não ter mismatch de hidratação.

## Alternativas consideradas
| Opção | Veredicto |
|---|---|
| Server Actions / rota de API para corrigir as respostas | ✗ Introduz runtime de servidor num site 100% estático, só pra esconder o gabarito de um quiz de entretenimento |
| Form HTML puro sem JS (GET com query string, corrigido no servidor) | ✗ Exige render dinâmico e perde o feedback por pergunta |
| **Ilha client única em página SSG** | ✓ Mantém build estático, CDN e zero backend. O JS extra se limita a `/quiz` |

## Consequências
- O gabarito fica visível no bundle JS. **Aceito**: é entretenimento, sem prêmio nem ranking. Se um dia houver ranking ou prêmio, este ADR precisa ser revisto (correção no servidor).
- A lista de exceções `"use client"` da arquitetura passa a incluir `quiz-runner`.
- Sem JS, a página mostra h1, intro e pergunta 1, com um aviso em `<noscript>`. Degradação aceita.
