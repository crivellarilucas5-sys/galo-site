---
title: "Research: Notícias reais do Atlético Mineiro para substituir conteúdo fictício (news.ts)"
type: research
agent: sites-analyst
created: 2026-09-30
tags: [research, atletico-mineiro, noticias, conteudo]
kind: note
status: done
summary: "6 matérias reais e recentes do Atlético-MG (destaque: Clássico Mineiro Atlético 2x1 Cruzeiro, Copa do Brasil, 01/09/2026, com citação curta de Fred) para substituir os 6 itens fictícios de src/content/news.ts. Inclui texto pronto, fonte por matéria e tabela de fotos livres (3 de 6 encontradas). REVERIFICADO em 30/09/2026: item 4 (Léo Duarte) confirmado mas com data corrigida (24/06/2026, não 24/09/2026); item 6 (apoio R$15mi de MG) confirmado integralmente por 4 fontes independentes. CORRIGIDO 30/09/2026 (QA H3/H4): item 1 — 'terceira partida' do Fred, não 'primeira'; item 2 (Fred) data 14/08/2026, não 15/08; item 3 (Renan Lodi) data 27/12/2025, não 15/01/2026; item 2 — esclarecido que a foto do Fred documentada aqui é do Fenerbahçe (Zafer), distinta da foto do Manchester United (Ardfern) já usada no elenco — não confundir as duas."
---

# Research: Notícias reais do Atlético Mineiro (substituição de src/content/news.ts)

**Decisão que informa:** Conteúdo da seção de notícias do site (`src/content/news.ts`) — troca de 6 itens fictícios/ilustrativos por 6 matérias reais e verificáveis.
**Solicitado por:** usuário (via sessão principal)

## Resumo executivo
Levantei 6 eventos reais e recentes do Atlético-MG com fonte documentada para cada um. A matéria de destaque é o último Clássico Mineiro profissional — Atlético 2x1 Cruzeiro, virada nas quartas da Copa do Brasil, 01/09/2026, na Arena MRV — com trecho curto (<15 palavras) da entrevista pós-jogo do volante Fred, autor do gol da virada. Todo texto abaixo foi **escrito por mim com base nos fatos apurados**, não copiado das matérias-fonte. Fotos livres (Wikimedia Commons) foram encontradas para 3 dos 6 temas (jogadores individuais); para o clássico em si e para os dois temas institucionais, não há foto livre específica do evento — documentei essa limitação em vez de forçar uma foto genérica como se fosse do evento.

## As 6 matérias (texto pronto para `news.ts`)

### 1. Clássico Mineiro (destaque) — Atlético vira sobre o Cruzeiro e avança na Copa do Brasil

- **title:** "De virada, Galo bate o Cruzeiro e avança na Copa do Brasil"
- **category:** "Clássico Mineiro"
- **date:** 2026-09-01
- **excerpt:** "Atlético venceu o Cruzeiro por 2 a 1 na Arena MRV e confirmou vaga na semifinal da Copa do Brasil — Fred marcou o gol da virada logo na terceira partida pelo clube."

> **✅ CORRIGIDO em 30/09/2026 (sites-analyst) — H4/QA.** A apuração original dizia "em sua
> primeira partida pelo clube", mas a própria fonte citada (noataque.com.br, `articleBody`)
> diz: "Logo na **terceira partida** pelo Atlético, o volante Fred foi herói…". Corrigido acima
> e no corpo abaixo. A citação de Fred sobre "estrear de titular em um clássico, na casa deles"
> refere-se à estreia como titular no jogo de ida, no Mineirão (25/08/2026) — não à volta na
> Arena MRV (01/09/2026, esta notícia). O corpo foi ajustado para não confundir as duas partidas.

**Corpo (resumo em texto próprio, para eventual expansão além do excerpt):**
No jogo de volta das quartas de final da Copa do Brasil 2026, disputado em 1º de setembro na Arena MRV, o Atlético-MG buscou uma virada emocionante sobre o Cruzeiro. O Cruzeiro abriu o placar com Kaio Jorge, de pênalti, ainda no primeiro tempo. A expulsão do defensor cruzeirense Villalba, aos 15 minutos da segunda etapa, mudou o panorama da partida: com um jogador a mais, o Galo buscou o empate com Victor Hugo e virou com um gol do volante Fred, que marcou logo na terceira partida pelo clube — havia estreado como titular no jogo de ida, no Mineirão, justamente nesse mesmo clássico. Como o confronto de ida havia terminado 1 a 1, o resultado da volta garantiu ao Atlético a vaga na semifinal da competição. Em entrevista logo após a partida, Fred resumiu a emoção do momento: "Nem no meu melhor sonho eu imaginaria isso", disse o volante, sobre marcar seu primeiro gol pelo clube justamente contra o rival. O técnico Eduardo Domínguez, por sua vez, avaliou a classificação como justa e destacou a evolução recente da equipe, pedindo cautela para as próximas fases.

**Fonte(s):**
- [Fred brilha, Atlético-MG vira sobre Cruzeiro e vai à semi da Copa do Brasil — CNN Brasil](https://www.cnnbrasil.com.br/esportes/futebol/copa-do-brasil/fred-brilha-atletico-mg-vira-sobre-cruzeiro-e-vai-a-semi-da-copa-do-brasil/)
- [Herói do Atlético, Fred exalta virada contra o Cruzeiro: 'Nem no meu melhor sonho' — noataque.com.br](https://noataque.com.br/futebol/copa-do-brasil/time/atletico-mg/noticia/2026/09/01/heroi-do-atletico-fred-exalta-virada-contra-o-cruzeiro-nem-no-meu-melhor-sonho/)
- [Atlético-MG: Eduardo Domínguez vê classificação justa e destaca Everson — Metrópoles](https://www.metropoles.com/esportes/atletico-mg-eduardo-dominguez-ve-classificacao-justa-e-destaca-everson)
- [Com gols no segundo tempo, Cruzeiro e Atlético-MG empatam ida pelas quartas — Gazeta Esportiva](https://www.gazetaesportiva.com/campeonatos/copa-do-brasil/cruzeiro-x-atletico-copa-do-brasil-25-08-2026/) (jogo de ida, 25/08/2026, 1-1)

> ⚠️ Nota de direito autoral: usei apenas a frase de Fred entre aspas ("Nem no meu melhor sonho eu imaginaria isso" — 10 palavras), atribuída nominalmente, conforme a regra definida. Todo o restante do texto é resumo/redação própria dos fatos noticiados por múltiplas fontes.

---

### 2. Contratação de Fred (volante, ex-Manchester United/Fenerbahçe)

- **title:** "Fred é do Galo: 'atleticano desde sempre' assina até 2029"
- **category:** "Contratações"
- **date:** 2026-08-14 (corrigido — ver nota abaixo; NÃO é 15/08/2026 como constava na apuração original)
- **excerpt:** "Após mais de uma década na Europa, o volante Fred, nascido em Belo Horizonte e torcedor declarado do Galo, retorna ao Brasil para vestir a camisa alvinegra até dezembro de 2029."

> **✅ CORRIGIDO em 30/09/2026 (sites-analyst) — H4/QA.** A data estava aproximada/errada na
> apuração original ("15 de agosto de 2026", com ressalva de conferência pendente). A Gazeta
> Esportiva publicou o anúncio (`datePublished`) em **2026-08-14T12:01:57-03:00**, ou seja,
> **14/08/2026**, não 15/08. Corrigido acima.

**Corpo (resumo):**
O Atlético-MG oficializou a contratação do volante Fred, de 33 anos, natural de Belo Horizonte e revelado nas categorias de base do próprio clube antes de se transferir para o Internacional no início da carreira. Fred estava no Fenerbahçe, da Turquia, e rescindiu o contrato para assinar com o Galo até dezembro de 2029, encerrando uma negociação que já durava mais de um ano entre as partes. O clube definiu o meio-campista como "atleticano desde sempre" no anúncio oficial, em referência à ligação histórica do jogador com a torcida.

**Fonte(s):**
- [Atlético-MG anuncia contratação do volante Fred: "Atleticano desde sempre" — Gazeta Esportiva](https://www.gazetaesportiva.com/times/atletico-mg/atletico-mg-anuncia-contratacao-do-volante-fred-atleticano-desde-sempre/)
- [Acabou a novela: Atlético-MG acerta com volante Fred — Correio Braziliense](https://www.correiobraziliense.com.br/esportes/2026/08/7480282-acabou-a-novela-atletico-acerta-com-o-volante-fred.html)

---

### 3. Contratação de Renan Lodi (lateral-esquerdo, ex-seleção brasileira)

- **title:** "Renan Lodi é do Galo: lateral de seleção assina por 5 anos"
- **category:** "Contratações"
- **date:** 2025-12-27 (corrigido — ver nota abaixo; NÃO é 15/01/2026 como constava na apuração/transcrição)
- **excerpt:** "Sem clube desde a saída do Al-Hilal, o lateral-esquerdo Renan Lodi, de 19 jogos pela Seleção Brasileira, assinou contrato de cinco temporadas com o Atlético."

> **✅ CORRIGIDO em 30/09/2026 (sites-analyst) — H4/QA.** A apuração original deixava a data
> aberta ("2026-01", com ressalva de conferência pendente), mas o dev transcreveu como
> "15 de janeiro de 2026" (dia inventado, mês e ano errados). O site oficial do clube
> (`article:published_time` 2025-12-27T19:14:37Z) e a CNN Brasil (2025-12-27T16:47, horário de
> Brasília) confirmam o anúncio em **27/12/2025**. Corrigido acima.

**Corpo (resumo):**
O Atlético-MG anunciou a contratação do lateral-esquerdo Renan Lodi, de 27 anos, como primeiro reforço para a temporada 2026, em vínculo válido por cinco anos. Lodi estava sem clube desde que rescindiu unilateralmente o contrato com o Al-Hilal, da Arábia Saudita, após não ser inscrito no Campeonato Saudita 2025/26 por conta do limite de estrangeiros. Revelado pelo Athletico-PR, o jogador passou por Atlético de Madrid e Olympique de Marseille antes do Al-Hilal, e soma 19 partidas pela Seleção Brasileira, incluindo a Copa América de 2021.

**Fonte(s):**
- [Atlético-MG anuncia contratação de Renan Lodi, primeiro reforço para 2026 — CNN Brasil](https://www.cnnbrasil.com.br/esportes/futebol/atletico-mineiro/atletico-mg-anuncia-contratacao-de-renan-lodi-primeiro-reforco-para-2026/)
- [Renan Lodi é do Galo! — site oficial do clube](https://atletico.com.br/renan-lodi-e-do-galo/)

---

### 4. Contratação de Léo Duarte (zagueiro)

> **✅ REVERIFICADO em 30/09/2026 (sites-analyst) — DATA CORRIGIDA.** O fato da contratação (Léo Duarte, ex-Başakşehir, contrato até 2030) está confirmado por fonte oficial, mas a **data estava errada** na apuração original: não foi 24/09/2026, e sim **24/06/2026**. Confirmado via acesso direto ao site oficial do clube: [atletico.com.br/leo-duarte-e-do-galo/](https://atletico.com.br/leo-duarte-e-do-galo/) — "Data of Signing: June 24, 2026" / "assina contrato até 2030". Cruzado também com [Gazeta Esportiva](https://www.gazetaesportiva.com/times/atletico-mg/atletico-mg-anuncia-contratacao-de-leo-duarte-ex-flamengo/) e [Lance!](https://www.lance.com.br/atletico-mineiro/atletico-mg-oficializa-primeiro-reforco-para-a-sequencia-da-temporada.html). O que de fato aconteceu em setembro/2026 foi outro evento: em 10/09/2026 o clube anunciou que Léo Duarte foi **liberado pelo departamento médico** após lesão na coxa, o que provavelmente gerou a confusão de datas na apuração original (ver [Portal MPA](https://www.sistemampa.com.br/esporte/atletico-confirma-liberacao-de-leo-duarte-pelo-departamento-medico-e-possibilidade-de-estreia/)).
>
> **Ação recomendada:** corrigir `date` para `2026-06-24` (contratação) antes de publicar em `news.ts`, ou usar o ângulo de setembro ("liberado pelo médico") com data 2026-09-10 se o objetivo for uma notícia mais recente.

- **title:** "Galo reforça a zaga: Léo Duarte assina até 2030"
- **category:** "Contratações"
- **date:** 2026-06-24 (corrigido — ver nota de reverificação acima; NÃO é 24/09/2026 como constava na apuração original)
- **excerpt:** "Aos 29 anos, o zagueiro Léo Duarte chega ao Atlético após o fim do contrato com o Başakşehir, da Turquia, e assina até 2030."

**Corpo (resumo):**
O Atlético-MG oficializou, em 24 de junho de 2026, a contratação do zagueiro Léo Duarte, de 29 anos, primeiro reforço do clube para a sequência da temporada. O defensor chega após o término de seu vínculo com o Başakşehir, da Turquia, e assina contrato válido até 2030 com o Galo. Léo Duarte também já defendeu Flamengo ao longo da carreira.

**Fonte(s):**
- [Léo Duarte é do Galo!!! — site oficial do clube (atletico.com.br)](https://atletico.com.br/leo-duarte-e-do-galo/) — confirma data (24/06/2026), clube de origem (Başakşehir) e contrato até 2030
- [Atlético-MG anuncia contratação de Léo Duarte, ex-Flamengo — Gazeta Esportiva](https://www.gazetaesportiva.com/times/atletico-mg/atletico-mg-anuncia-contratacao-de-leo-duarte-ex-flamengo/)
- [Atlético-MG oficializa primeiro reforço para a sequência da temporada — Lance!](https://www.lance.com.br/atletico-mineiro/atletico-mg-oficializa-primeiro-reforco-para-a-sequencia-da-temporada.html)
- [Atlético confirma liberação de Léo Duarte pelo departamento médico (10/09/2026) — Portal MPA](https://www.sistemampa.com.br/esporte/atletico-confirma-liberacao-de-leo-duarte-pelo-departamento-medico-e-possibilidade-de-estreia/)

---

### 5. Copa Sudamericana — Atlético enfrenta o Montevideo City Torque na semifinal

- **title:** "Galo encara o Montevideo City Torque na semifinal da Sul-Americana"
- **category:** "Copa Sudamericana"
- **date:** 2026-09-18 (data da confirmação do confronto pela CONMEBOL; jogos em 14/10 e 21/10/2026)
- **excerpt:** "Atual vice-campeão da competição, o Atlético decide vaga na final contra o time uruguaio, que chega à semifinal pela primeira vez na história."

**Corpo (resumo):**
A CONMEBOL confirmou o confronto entre Atlético-MG e Montevideo City Torque pela semifinal da Copa Sudamericana 2026. O jogo de ida está marcado para 14 de outubro, na Arena MRV, e a volta ocorre em 21 de outubro, no Estádio Centenário, em Montevidéu. O Atlético chega à fase como vice-campeão da edição anterior da competição, enquanto o clube uruguaio disputa uma semifinal continental pela primeira vez em sua história. O vencedor do confronto avança à final, prevista para 21 de novembro, em Barranquilla, na Colômbia.

**Fonte(s):**
- [Galo enfrenta o Montevideo City Torque na semifinal da Sul-Americana — site oficial do clube](https://atletico.com.br/galo-enfrenta-o-montevideo-city-torque-na-semifinal-da-sul-americana/)
- [Conmebol confirma datas e horários das semifinais da Sul-Americana — site oficial do clube](https://atletico.com.br/conmebol-confirma-datas-e-horarios-das-semifinais-da-sul-americana/)
- [When Are the 2026 Copa Sudamericana Semifinals? — beIN Sports](https://www.beinsports.com/en-us/soccer/conmebol-sudamericana/articles/when-are-the-2026-copa-sudamericana-semifinals-2026-09-18)

---

### 6. Governo de Minas Gerais socorre clubes após crise das bets

> **✅ REVERIFICADO em 30/09/2026 (sites-analyst) — CONFIRMADO por múltiplas fontes independentes.** Valores, data e distribuição confirmados via [CNN Brasil](https://www.cnnbrasil.com.br/esportes/futebol/governo-de-mg-vai-patrocinar-clubes-apos-proibicao-de-bets/) (acesso direto ao conteúdo, sem bloqueio) e corroborados por [Lance!](https://www.lance.com.br/fora-de-campo/governo-de-minas-destina-r-32-milhoes-a-atletico-cruzeiro-e-america-apos-proibicao-das-bets.html), [Estado de Minas](https://www.em.com.br/politica/2026/09/7510562-governo-de-minas-anuncia-rs-32-milhoes-de-patrocinio-para-clubes-de-bh.html) e [Poder360](https://www.poder360.com.br/poder-sportsmkt/governo-de-mg-anuncia-r-32-milhoes-a-clubes-apos-proibicao-de-bets/). A fonte original do Mixvale (bloqueada por HTTP 403) não era necessária — os fatos batem exatamente com o texto já redigido: R$ 32 milhões no total, R$ 15 milhões para o Atlético, R$ 15 milhões para o Cruzeiro, R$ 2 milhões para o América-MG, anúncio em 29/09/2026.
>
> **Correção pontual:** Mateus Simões não é "secretário estadual" — é o **governador de Minas Gerais** (assumiu em 22/03/2026, em substituição a Romeu Zema, e concorre à reeleição em 2026 pelo PSD). Corrigir esse detalhe no texto do corpo antes de publicar.
>
> **Detalhe adicional relevante (contexto, não essencial ao excerpt):** a verba não é doação direta — vem de patrocínio via estatais (Cemig, Codemge e Codemig) e os clubes assumem contrapartidas (investimento em futebol feminino e ingressos gratuitos/acessíveis para estudantes de baixa renda). Há também repercussão política — candidatos de oposição criticaram o valor no contexto eleitoral (ver [O Tempo](https://www.otempo.com.br/eleicoes/2026/governadores/2026/9/30/candidatos-atacam-patrocinio-de-r-32-milhoes-de-simoes-a-times-mineiros-apos-saida-de-bets)) — mencionar apenas se o time de conteúdo quiser dar mais contexto institucional.

- **title:** "Governo de Minas destina R$ 15 milhões ao Atlético após crise das bets"
- **category:** "Institucional"
- **date:** 2026-09-29
- **excerpt:** "Pacote de R$ 32 milhões do estado busca compensar Atlético, Cruzeiro e América-MG pelas perdas com a suspensão das casas de apostas patrocinadoras."

**Corpo (resumo, corrigido):**
O governo de Minas Gerais anunciou, em 29 de setembro de 2026, um pacote de R$ 32 milhões em apoio financeiro (via patrocínio de estatais) a três clubes mineiros afetados pela decisão do Governo Federal de proibir a publicidade das casas de apostas esportivas (bets) no país — que patrocinavam parte desses clubes. Do total, R$ 15 milhões foram destinados ao Atlético-MG, R$ 15 milhões ao Cruzeiro e R$ 2 milhões ao América-MG. O anúncio foi feito pelo governador Mateus Simões (PSD).

**Fonte(s):**
- [Governo de MG vai patrocinar clubes após proibição de bets — CNN Brasil](https://www.cnnbrasil.com.br/esportes/futebol/governo-de-mg-vai-patrocinar-clubes-apos-proibicao-de-bets/) — confirma valores, distribuição e data
- [Governo de Minas destina R$ 32 milhões a Atlético, Cruzeiro e América após proibição das bets — Lance!](https://www.lance.com.br/fora-de-campo/governo-de-minas-destina-r-32-milhoes-a-atletico-cruzeiro-e-america-apos-proibicao-das-bets.html)
- [Governo de Minas anuncia R$ 32 milhões de patrocínio para clubes de BH — Estado de Minas](https://www.em.com.br/politica/2026/09/7510562-governo-de-minas-anuncia-rs-32-milhoes-de-patrocinio-para-clubes-de-bh.html)
- [Governo de MG anuncia R$ 32 milhões a clubes após proibição de bets — Poder360](https://www.poder360.com.br/poder-sportsmkt/governo-de-mg-anuncia-r-32-milhoes-a-clubes-apos-proibicao-de-bets/)
- [Tribuna de Minas — R$ 32 milhões para clubes mineiros (fonte original, mantida como referência secundária)](https://tribunademinas.com.br/noticias/esportes/30-09-2026/mateus-simoes-anuncia-r-32-milhoes-para-clubes-mineiros-apos-mp-das-bets.html)

---

## Tabela de fotos livres (Wikimedia Commons)

| # | Tema | Foto encontrada? | URL | Licença | Autor | Data |
|---|---|---|---|---|---|---|
| 1 | Clássico Mineiro (Atlético 2x1 Cruzeiro, 01/09/2026) | **Não** — nenhuma foto livre específica deste jogo localizada | — | — | — | — |
| 2 | Fred (volante) | **Sim** | [File:Fred (footballer, born 1993) 7 Fenerbahçe 20260805 (3) (cropped).JPG](https://commons.wikimedia.org/wiki/File:Fred_(footballer,_born_1993)_7_Fenerbah%C3%A7e_20260805_(3)_(cropped).JPG) | CC BY-SA 4.0 | Zafer (WikiPortraits) | 05/08/2026 — foto **no Fenerbahçe**, pré-Atlético. Verticalizada, 3252×5719px, rosto e corpo claramente visíveis (Fenerbahçe x Sturm Graz, qualificatória da Champions League) |
| 3 | Renan Lodi (lateral) | **Sim** | [File:ATL-Madrid-Lokomotiv001-Lodi.jpg](https://commons.wikimedia.org/wiki/File:ATL-Madrid-Lokomotiv001-Lodi.jpg) | CC BY-SA 3.0 (também listada como disponível em CC BY-SA 4.0/GFDL) | ver página do arquivo | 01/10/2019 — foto no Atlético de Madrid, bem anterior ao Galo |
| 4 | Léo Duarte (zagueiro) | **Sim** | [File:Léo Duarte 5 İstanbul Başakşehir FK 20250731 (1).jpg](https://commons.wikimedia.org/wiki/File:L%C3%A9o_Duarte_5_%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK_20250731_(1).jpg) | CC BY 4.0 | Zafer | 31/07/2025 — foto no Başakşehir, pré-Atlético |
| 5 | Copa Sudamericana (semifinal vs. Montevideo City Torque) | **Não** — evento futuro (jogos em out/2026), sem foto de partida ainda; não há foto livre específica do confronto | — | — | — | — |
| 6 | Apoio financeiro do governo de MG (bets) | **Não** — tema institucional/financeiro sem registro fotográfico associado; nenhuma foto livre relevante localizada | — | — | — | — |

> **⚠️ ATENÇÃO (2026-09-30, sites-analyst) — H3/QA: existem DOIS arquivos "Fred" no Commons, de clubes diferentes, não confundir.**
> Esta tabela sempre indicou o arquivo do **Fenerbahçe** (`Fred_(footballer,_born_1993)_7_Fenerbahçe_20260805...`,
> Zafer, CC BY-SA 4.0, 05/08/2026) para a notícia da contratação do Fred (item 2 acima). Mas
> existe também um arquivo **diferente e mais antigo**, `File:Fred_(footballer)_in_2022.jpg`
> (Ardfern, CC BY-SA 4.0, 02/04/2022), que mostra Fred **no Manchester United** (Manchester
> United x Leicester City, Old Trafford) — esse é o arquivo já usado (corretamente) na foto do
> elenco em [[fotos-elenco-wikimedia]]. O QA confirmou que `public/images/news/fred.jpg` (a foto
> usada na notícia de contratação) contém os bytes do arquivo do **Manchester United** (atribuição
> Ardfern confere), mas o texto do `alt` publicado dizia "Fenerbahçe" — um `alt` que descreve o
> arquivo *errado* dos dois. **Causa provável:** o script de download (`_tmp-fetch-images.mjs`)
> baixou o arquivo do Manchester United para a notícia, em vez do arquivo do Fenerbahçe indicado
> nesta tabela. **Correção para o dev:** ou (a) baixar e usar de fato o arquivo do Fenerbahçe
> (Zafer, 05/08/2026, acima) com `alt` "Fred em ação pelo Fenerbahçe, antes de assinar com o
> Galo" — recomendado, pois é vertical, de alta resolução e mostra rosto/corpo claramente; ou
> (b) se mantiver o arquivo do Manchester United por algum motivo, o `alt` deve dizer
> "Manchester United", não "Fenerbahçe". Em qualquer um dos dois casos, **não usar um recorte
> que corte o rosto** (o recorte 1200×800 "attention" aplicado sobre o arquivo do Manchester
> United, 592×1439, mostrou só o calção — isso é um problema de recorte do script, fora do
> escopo desta pesquisa, mas reforça a recomendação (a)).

**Resultado: 3 de 6 temas com foto livre documentada.** As 3 encontradas são retratos dos jogadores em seus clubes anteriores (Fenerbahçe, Atlético de Madrid, Başakşehir) — nenhuma mostra o jogador já com a camisa do Atlético-MG, então cabe ao time de UX/dev decidir se usa como "foto de perfil do jogador" com legenda honesta (ex.: "Fred em ação pelo Fenerbahçe, antes de assinar com o Galo") ou se prefere manter placeholder genérico como já é feito hoje. Para os itens 1, 5 e 6, recomendo manter o padrão atual de imagem genérica decorativa (`imageAlt=""`) já documentado no cabeçalho de `news.ts`, em vez de forçar uma foto que não representa o evento.

## O que os dados sugerem
- É possível substituir as 6 notícias fictícias por eventos 100% reais e verificáveis, com datas e fontes.
- O evento mais forte para "notícia em destaque" é o Clássico Mineiro (item 1), por ter resultado de jogo + citação de jogador, exatamente como pedido.
- Cobertura fotográfica real específica de eventos do Atlético é escassa em Wikimedia Commons (mesmo padrão já observado na pesquisa anterior sobre o elenco — ver [[elenco-atual-2026]]); fotos de jogadores em clubes anteriores existem, mas não do evento/contexto atual no Galo.

### Atualização de reverificação (30/09/2026, sites-analyst)
Os itens 4 e 6, marcados como fonte mais fraca na apuração original, foram reverificados com segunda fonte independente:
- **Item 4 (Léo Duarte):** fato confirmado (contratação, ex-Başakşehir, contrato até 2030) via site oficial do clube, **mas a data estava errada** — a apuração original dizia 24/09/2026; a data correta confirmada é **24/06/2026**. O que ocorreu de fato em setembro/2026 foi a liberação médica do jogador após lesão (10/09/2026), evento distinto. **Corrigir `date` no texto antes de publicar.**
- **Item 6 (apoio R$15 mi do governo de MG):** fato **confirmado integralmente** por 4 fontes independentes (CNN Brasil, Lance!, Estado de Minas, Poder360) — valores, distribuição (R$15mi Atlético / R$15mi Cruzeiro / R$2mi América) e data (29/09/2026) batem com a apuração original. Única correção: Mateus Simões é **governador** de MG, não "secretário estadual".
- Lição geral: erros de data (item 4) podem ser mais perigosos que erros de fonte bloqueada (item 6) — recomendo sempre cruzar datas específicas com pelo menos duas fontes, mesmo quando o fato central está correto.

## Fontes (lista consolidada)
- [CNN Brasil — Fred brilha, Atlético-MG vira sobre Cruzeiro](https://www.cnnbrasil.com.br/esportes/futebol/copa-do-brasil/fred-brilha-atletico-mg-vira-sobre-cruzeiro-e-vai-a-semi-da-copa-do-brasil/)
- [noataque.com.br — Fred exalta virada contra o Cruzeiro](https://noataque.com.br/futebol/copa-do-brasil/time/atletico-mg/noticia/2026/09/01/heroi-do-atletico-fred-exalta-virada-contra-o-cruzeiro-nem-no-meu-melhor-sonho/)
- [Metrópoles — Eduardo Domínguez vê classificação justa](https://www.metropoles.com/esportes/atletico-mg-eduardo-dominguez-ve-classificacao-justa-e-destaca-everson)
- [Gazeta Esportiva — Cruzeiro x Atlético, jogo de ida](https://www.gazetaesportiva.com/campeonatos/copa-do-brasil/cruzeiro-x-atletico-copa-do-brasil-25-08-2026/)
- [Gazeta Esportiva — anúncio de Fred](https://www.gazetaesportiva.com/times/atletico-mg/atletico-mg-anuncia-contratacao-do-volante-fred-atleticano-desde-sempre/)
- [Correio Braziliense — acerto com Fred](https://www.correiobraziliense.com.br/esportes/2026/08/7480282-acabou-a-novela-atletico-acerta-com-o-volante-fred.html)
- [CNN Brasil — contratação de Renan Lodi](https://www.cnnbrasil.com.br/esportes/futebol/atletico-mineiro/atletico-mg-anuncia-contratacao-de-renan-lodi-primeiro-reforco-para-2026/)
- [atletico.com.br — Renan Lodi é do Galo!](https://atletico.com.br/renan-lodi-e-do-galo/)
- [Portal MPA — retomada de treinos e reforços](https://www.sistemampa.com.br/esporte/atletico-mineiro-retoma-treinamentos-apos-datas-fifa-de-2026-e-enfrenta-periodo-de-recuperacao-e-preparacao/)
- [atletico.com.br — Galo x Montevideo City Torque semifinal](https://atletico.com.br/galo-enfrenta-o-montevideo-city-torque-na-semifinal-da-sul-americana/)
- [atletico.com.br — Conmebol confirma datas das semifinais](https://atletico.com.br/conmebol-confirma-datas-e-horarios-das-semifinais-da-sul-americana/)
- [beIN Sports — datas da semifinal Sul-Americana 2026](https://www.beinsports.com/en-us/soccer/conmebol-sudamericana/articles/when-are-the-2026-copa-sudamericana-semifinals-2026-09-18)
- [Tribuna de Minas — R$ 32 milhões para clubes mineiros](https://tribunademinas.com.br/noticias/esportes/30-09-2026/mateus-simoes-anuncia-r-32-milhoes-para-clubes-mineiros-apos-mp-das-bets.html)
- [Mixvale — governo de Minas socorre clubes](https://www.mixvale.com.br/2026/09/29/crise-das-bets-governo-de-minas-socorre-atletico-cruzeiro-e-america-com-r-32-milhoes/)
- [Wikimedia Commons — Fred, Fenerbahçe, 05/08/2026](https://commons.wikimedia.org/wiki/File:Fred_(footballer,_born_1993)_7_Fenerbah%C3%A7e_20260805_(3)_(cropped).JPG)
- [Wikimedia Commons — Renan Lodi, Atlético Madrid, 2019](https://commons.wikimedia.org/wiki/File:ATL-Madrid-Lokomotiv001-Lodi.jpg)
- [Wikimedia Commons — Léo Duarte, Başakşehir, 2025](https://commons.wikimedia.org/wiki/File:L%C3%A9o_Duarte_5_%C4%B0stanbul_Ba%C5%9Fak%C5%9Fehir_FK_20250731_(1).jpg)
