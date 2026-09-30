---
kind: note
status: done
summary: "Elenco confirmado sem mudanças (32/32 batem com atletico.com.br em 30/09/2026); 5 fotos reais adicionais da Arena MRV no Wikimedia Commons (licenças livres); vídeo real de coletiva pós-clássico (Atlético 2x1 Cruzeiro, 01/09/2026) verificado via oEmbed do YouTube, canal ESPN Brasil."
tags: [research, atletico-mineiro, elenco, arena-mrv, video, youtube]
---

# Research: Elenco atualizado + fotos Arena MRV + vídeo do clássico (30/09/2026)

**Decisão que informa:** Atualização de `src/content/squad.ts`, `src/content/arena.ts` (galeria) e possível seção de vídeo/entrevista no site.
**Solicitado por:** usuário (via sessão principal), para implementação por outro agente.

## 1. Elenco — veredito

**Confirmado, sem alterações necessárias.** Busquei anúncios de contratação/saída dos últimos dias (setembro/2026) e também **refetch direto** de https://atletico.com.br/futebol/masculino/elenco/ em 30/09/2026. Os 32 nomes e números retornados pelo site oficial **batem exatamente** com os já documentados em [[elenco-atual-2026]] e presumivelmente em `src/content/squad.ts` (4 goleiros, 5 zagueiros, 4 laterais, 13 meio-campistas, 6 atacantes).

Saídas recentes encontradas (nenhuma conflita com a lista, pois nenhum desses nomes está nela):
- Junior Alonso (zagueiro) — saída anunciada 09/07/2026, já fora do elenco atual.
- Júnior Santos — emprestado (não está na lista).
- Gabriel Menino — emprestado ao Santos (não está na lista).
- Biel — saiu após 24 jogos (não está na lista).
- "Executiva anuncia saída" (noataque, 15/09/2026) — refere-se a uma executiva do clube (dirigente), não jogador; não é relevante ao elenco.

Não encontrei nenhuma contratação ou saída de jogador do elenco principal anunciada nos últimos dias (últimos ~7 dias antes de 30/09/2026) que invalide a lista atual.

## 2. Fotos reais da Arena MRV (Wikimedia Commons) — além da já usada no hero

A foto do hero (Atlético x Bahia, 2024, Felipebini, CC BY-SA 4.0) já está documentada em `src/content/arena.ts`. Encontrei mais 5 fotos reais com licença livre, todas na [[Category:Arena_MRV]] do Commons:

| # | Tema | URL da página Commons | Autor | Licença | Data | Descrição p/ alt |
|---|---|---|---|---|---|---|
| 1 | Interior, jogo vs Botafogo | https://commons.wikimedia.org/wiki/File:Atl%C3%A9tico_Mineiro_v_Botafogo,_Arena_MRV,_Horizonte,_2023.jpg | Felipe Bini | CC BY-SA 4.0 | 16/09/2023 | Vista interna da Arena MRV antes da partida Atlético x Botafogo, Brasileirão 2023 |
| 2 | Exterior, obras vistas da Via Expressa | https://commons.wikimedia.org/wiki/File:Arena_MRV_em_obras_vista_da_Via_Expressa_(dezembro_de_2022).jpg | MG17 The JetPunker | CC BY-SA 4.0 | 11/12/2022 | Arena MRV em fase final de construção, vista da Via Expressa (obs.: pré-inauguração, usar só se quiser contar a história da construção) |
| 3 | Aérea, exterior | https://commons.wikimedia.org/wiki/File:ARENA_MRV.jpg | Heuler.silva | CC BY-SA 4.0 | 25/08/2023 | Vista aérea da Arena MRV |
| 4 | Aérea, exterior (mais recente) | https://commons.wikimedia.org/wiki/File:Arena-mrv-2025.jpg | Heuler.silva | CC BY-SA 4.0 | 20/04/2025 | Vista aérea da Arena MRV, 2025 |
| 5 | Interior, clássico Atlético x Cruzeiro (ação/torcida) | https://commons.wikimedia.org/wiki/File:Chute_a_gol_com_o_Galo_Doido_-_CAM_x_CRU_(53280842374).jpg | Galo Na Veia | Public Domain Mark (ver nota abaixo) | 22/10/2023 | Lance de jogo durante Atlético x Cruzeiro na Arena MRV, com o mascote "Galo Doido" em cena |

**Nota sobre licença #5:** "Public Domain Mark" no Commons é uma marca de que o detentor dos direitos declarou a obra em domínio público — tecnicamente diferente de CC0/CC BY, mas amplamente aceita como uso livre no Commons. Se o time preferir usar apenas licenças Creative Commons explícitas, ficam as opções #1–4 (todas CC BY-SA 4.0), que já são suficientes para preencher os 6 slots de `gallery` junto com o hero.

Não encontrei fotos livres específicas de fachada externa em close ou arquibancada/torcida isolada (só a vista aérea cobre exterior, e a foto #5 mostra torcida/mascote mas como parte de um lance de jogo).

**Recomendação de uso:** combinar #1 (interior, evento real), #3 e/ou #4 (aéreas, mostram a estrutura externa) e #5 (ação/clássico, mais "vivo") para os 6 slots de `gallery` — todas com `alt` descritivo específico (não mais `alt=""` genérico), seguindo o mesmo padrão já adotado no `heroImage`.

## 3. Vídeo de entrevista — Clássico Atlético 2x1 Cruzeiro (01/09/2026, Copa do Brasil)

**Encontrado e verificado.** Não localizei entrevista em vídeo do jogador Fred especificamente publicada no YouTube (a citação "Nem no meu melhor sonho..." aparece em várias matérias de texto — CNN Brasil, Lance!, Metrópoles, Terra, noataque — mas não consegui confirmar um vídeo do YouTube correspondente a essa entrevista específica). Em vez disso, encontrei e **verifiquei via YouTube oEmbed API** (não apenas busca de texto) uma entrevista coletiva em vídeo do técnico Eduardo Domínguez logo após a classificação:

- **URL:** https://www.youtube.com/watch?v=prM9H6NMiFs
- **Título exato:** "ATLÉTICO-MG X CRUZEIRO: EDUARDO DOMÍNGUEZ FALA APÓS A CLASSIFICAÇÃO NA COPA DO BRASIL"
- **Canal:** ESPN Brasil (@espnbrasil)
- **Conteúdo confirmado:** coletiva pós-jogo do técnico do Atlético, Eduardo Domínguez, comentando a classificação sobre o Cruzeiro nas quartas da Copa do Brasil (01/09/2026) — falas batem com o que outras fontes de texto (Metrópoles, O Tempo) relataram do mesmo evento ("classificação justa e difícil", elogios a Everson, evolução do time).
- **Data de publicação:** não confirmada com precisão via oEmbed (esse endpoint não retorna data); resultados de busca indicavam "~28 dias atrás" no momento da pesquisa (30/09/2026), o que aponta para ~02/09/2026 — coerente com uma coletiva publicada no dia seguinte ao jogo. **Recomendo confirmar a data exata abrindo a página do vídeo no navegador antes de publicar**, já que não consegui extrair o campo de data de forma confiável por ferramenta automatizada.
- **Verificação:** confirmado via `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=prM9H6NMiFs&format=json`, que retornou title/author_name reais do YouTube — não é uma URL inventada.

Esse vídeo é adequado para embed via iframe oficial do YouTube (mecanismo de embed padrão, permitido).

## Fontes
- https://atletico.com.br/futebol/masculino/elenco/ (refetch direto, 30/09/2026)
- https://atletico.com.br/noticias/futebol/masculino/chegadas-e-saidas/
- https://www.lance.com.br/atletico-mineiro/atletico-mg-anuncia-saida-de-idolo-imensa-contribuicao.html
- https://commons.wikimedia.org/wiki/Category:Arena_MRV
- https://commons.wikimedia.org/wiki/File:Atl%C3%A9tico_Mineiro_v_Botafogo,_Arena_MRV,_Horizonte,_2023.jpg
- https://commons.wikimedia.org/wiki/File:Arena_MRV_em_obras_vista_da_Via_Expressa_(dezembro_de_2022).jpg
- https://commons.wikimedia.org/wiki/File:ARENA_MRV.jpg
- https://commons.wikimedia.org/wiki/File:Arena-mrv-2025.jpg
- https://commons.wikimedia.org/wiki/File:Chute_a_gol_com_o_Galo_Doido_-_CAM_x_CRU_(53280842374).jpg
- https://www.youtube.com/watch?v=prM9H6NMiFs (verificado via oEmbed)
- https://www.metropoles.com/esportes/atletico-mg-eduardo-dominguez-ve-classificacao-justa-e-destaca-everson
