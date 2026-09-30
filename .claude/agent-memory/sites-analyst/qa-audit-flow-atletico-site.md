---
name: qa-audit-flow-atletico-site
description: Como funciona o ciclo QA→research neste projeto do site do Atlético-MG (quem audita, onde correções entram, padrão de escopo)
metadata:
  type: project
---

Projeto: site institucional/torcedor do Atlético Mineiro (Next.js). Times envolvidos:
sites-dev-alpha (implementação), sites-analyst/Lyrel (eu, research), sites-qa/Axilun
(auditoria), architect, ux.

O QA (Axilun) audita o site publicado (fotos, notícias, quiz) contra os arquivos de
research em `docs/smart-memory/agents/research/` e registra findings em
`docs/smart-memory/agents/qa/*.md` (ex.: `fotos-noticias-quiz-audit.md`), classificados
HIGH/MEDIUM/LOW, com recomendação de quem deve corrigir (dev vs. pesq/research).

**Padrão observado:** vários findings HIGH vêm de erro que **já estava no research**
(pesq/eu transcrevi errado, ou deixei data aproximada/pendente de conferência e o dev
"completou" com um valor inventado). Por isso, ao corrigir um finding do QA no escopo do
research, sempre: (1) confirmar a fonte original de novo antes de corrigir (não assumir
que o QA está certo sem checar), (2) deixar uma nota `✅ CORRIGIDO em <data>` explicando
o que mudou e por quê, citando a fonte, (3) atualizar o `summary` do frontmatter e o
`DIGEST.md` da área — fato novo substitui o antigo, não acumular.

**Numeração de findings pode não bater 1:1 com a numeração de perguntas/itens.** No QA de
2026-09-30, o finding H5 (fato errado, "segundo título" na Recopa 2014) e o finding L1
(factRef quebrado `#estadia-atual`) foram descritos com linhas de `quiz.ts` diferentes
(143 vs 129), mas a tarefa que recebi do usuário tratou os dois como se fossem da mesma
pergunta (Q9). Na prática pertenciam a perguntas diferentes (Q9 e Q8 em
`quiz-perguntas.md`). Ao corrigir, resolvi ambos onde de fato estavam e documentei a
discrepância de numeração, em vez de forçar os dois problemas na mesma pergunta.

Related: [[commons-license-review-caveat]]
