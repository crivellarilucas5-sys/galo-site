---
title: "Arquivo Morto (_archive)"
type: readme
agent: team-os (discovery)
created: 2026-09-09
tags: [archive]
---

# _archive — conteúdo frio compactado

Esta pasta guarda o que saiu do **working set** da smart-memory via `/team-os *compact`:
stories concluídas, QA/planos antigos, logs append-only esfriados, notas expiradas (TTL)
e inbox já consolidado.

- **Não é lido** no bootstrap do team-os nem pelos agentes (o `weigh-memory.sh` o exclui do peso).
- Conteúdo **movido, nunca deletado** — nada se perde.
- Os LEDGERs (`stories/done/LEDGER.md` e `_archive/LEDGER.md`) indexam o que foi arquivado.
- Consulte um item aqui **só** quando um LEDGER apontar que você precisa dele.
