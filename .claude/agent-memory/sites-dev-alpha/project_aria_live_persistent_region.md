---
name: project_aria_live_persistent_region
description: "aria-live num nó reaproveitado pelo React entre árvores condicionais precisa existir antes do conteúdo, nunca nascer no mesmo commit"
metadata:
  type: feedback
---

Quando um componente troca entre duas árvores JSX condicionais mas o React reaproveita o
mesmo nó DOM raiz (mesmo tipo de elemento, mesma posição — ex.: `quiz-runner.tsx` alterna
entre tela de pergunta e tela de resultado, ambas `<div>` na raiz), **nunca** colocar
`aria-live` só numa das duas branches. O atributo nasceria no mesmo commit em que o
conteúdo que ele deveria anunciar aparece, e leitores de tela não anunciam de forma
confiável uma região live que é criada e populada ao mesmo tempo.

**Padrão correto:** renderizar uma região `aria-live="polite" aria-atomic="true"`
incondicional (mesma posição nas duas branches, ex. sempre como primeiro filho), com o
texto vindo de um `useState` próprio (não derivado direto do JSX condicional). Atualizar
esse `useState` só dentro de um `useEffect` que já roda depois do commit que trocou de
tela — assim a região já existe há pelo menos um paint quando o texto muda.

**Por quê:** confirmado no laudo QA
[[../../../docs/smart-memory/agents/qa/fotos-noticias-quiz-audit|fotos-noticias-quiz-audit]]
M2/M3 — o placar do resultado do quiz e a troca de pergunta não eram anunciados por esse
motivo exato, mesmo com foco gerenciado corretamente (AC9).

**Como aplicar:** qualquer ilha client com telas condicionais (resultado de quiz,
wizard, formulário multi-step) que precise anunciar transição de conteúdo via
`aria-live`, sem contar só com o foco programático no heading da nova tela.
