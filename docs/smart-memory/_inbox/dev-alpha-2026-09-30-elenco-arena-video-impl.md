---
kind: note
status: done
summary: Implementado pedido do usuário — elenco confirmado atual, 3 fotos reais da Arena MRV na galeria, seção de vídeo de entrevista do clássico na home.
---

# Implementação — elenco/arena/vídeo (2026-09-30)

Baseado em [[research-2026-09-30-elenco-arena-video]] (sites-analyst).

## Elenco
`src/content/squad.ts` confirmado atual pela pesquisa (refetch de atletico.com.br
em 30/09/2026, 32/32 nomes batem) — nenhuma mudança de dados necessária.

## Arena MRV — galeria real
`src/content/arena.ts`: `gallery` trocou os 6 placeholders gerados por 3 fotos
reais do Wikimedia Commons (CC BY-SA 4.0, Felipe Bini / Heuler.silva), cada uma
com `alt` descritivo e `attribution` própria. Tipo `ArenaInfo.gallery` em
`src/types/content.ts` ganhou `attribution?: ImageAttribution`.
`ArenaGallery` (src/components/sections/arena-gallery.tsx) agora renderiza o
crédito por imagem, mesmo padrão do rodapé de /elenco.
Arquivos baixados para `public/images/arena/`: `galeria-botafogo.jpg`,
`galeria-aerea-2023.jpg`, `galeria-aerea-2025.jpg` (os 6 placeholders antigos
`galeria-1..6.jpg` foram removidos).

## Vídeo de entrevista — novo
Área `video` (antes vazia) ganhou primeiro conteúdo: `src/content/videos.ts`
(tipo `VideoItem` novo em `src/types/content.ts`) com 1 vídeo real, verificado
manualmente (não só oEmbed — abri a página, vi o técnico Domínguez com escudo
do Atlético, confirmei canal ESPN Brasil e "transmitido ao vivo em 2 de set.
de 2026" no player):
- youtubeId `prM9H6NMiFs`, "ATLÉTICO-MG X CRUZEIRO: EDUARDO DOMÍNGUEZ FALA APÓS
  A CLASSIFICAÇÃO NA COPA DO BRASIL", ESPN Brasil, coletiva pós Atlético 2×1
  Cruzeiro (01/09/2026, Copa do Brasil).
Componente novo `src/components/sections/video-section.tsx` ("use client"):
card com thumbnail do YouTube (`i.ytimg.com`, `unoptimized` no `next/image`
pra não exigir `remotePatterns`) e clique-para-tocar que troca pra
`youtube-nocookie.com/embed` (facade pattern — evita carregar iframe pesado
sem interação). Testado no browser: thumbnail carrega, clique reproduz o
vídeo real embutido.
Seção incluída na home (`src/app/page.tsx`) entre `NewsGrid` e
`HistoryPreview`, título "Entrevistas".

## Pendências não cobertas nesta sessão
- QA do épico 2 (elenco/arena) tinha M1 (datas sem `timeZone`) e M2 (ícone de
  vitória 2.42:1 contraste) abertos em [[../qa/elenco-jogos-audit]] — não
  mexidos aqui, fora do escopo do pedido do usuário.
- Não achei foto real de fachada externa em close nem arquibancada isolada da
  Arena MRV no Commons — só as 3 usadas + 1 pré-inauguração (não usada).
