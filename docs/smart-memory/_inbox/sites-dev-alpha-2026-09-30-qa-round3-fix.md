---
kind: note
status: done
summary: "QA rodada 3/3 (épico 2): corrigido R2-1 em news-grid.tsx (timeZone UTC para datas date-only). Confirmado com pnpm build TZ=UTC e sem TZ — diff vazio, 6/6 datas batem com content/news.ts. next-match.tsx não foi tocado."
expires: 2026-12-31
---

# Fix R2-1 — news-grid date-only timezone (rodada 3/3)

Ver [[../qa/elenco-jogos-audit]] seção "Rodada 2/3" para o finding original (R2-1).

**Mudança:** `src/components/sections/news-grid.tsx:43-49` — troquei `timeZone: "America/Sao_Paulo"`
por `timeZone: "UTC"` no `Intl.DateTimeFormat` das datas de notícia, com comentário explicando o
motivo (evitar que alguém "corrija" de volta ao fuso errado). `src/components/sections/next-match.tsx`
não foi alterado (fuso America/Sao_Paulo ali é correto, tem hora real).

**Evidência:**
- `TZ=UTC pnpm build`: exit 0, 12/12 páginas estáticas.
- `pnpm build` sem TZ (ambiente local já está em `America/Sao_Paulo`, confirmado via
  `Intl.DateTimeFormat().resolvedOptions().timeZone`): exit 0, 12/12.
- `grep -oE '<time[^>]*>[^<]*' .next/server/app/index.html` nos dois builds → `diff` vazio.
- As 6 datas batem 1:1 com `src/content/news.ts` (dateTime == texto visível, sem recuo de dia):
  25/03/2026, 14/02/2026, 30/01/2026, 10/12/2025, 22/11/2025, 05/10/2025.
- `pnpm lint` e `pnpm typecheck`: exit 0, sem warnings.

**Nota:** repo local não tem `.git` inicializado neste ambiente (`git status` retornou
"not a git repository"), então não foi possível commitar. O lead/devops precisa aplicar o diff
ou confirmar se o `.git` foi movido/removido.
