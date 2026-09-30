---
kind: audit
status: active
agent: sites-qa (Axilun)
created: 2026-09-30
summary: "QA rodada 1/3 de fotos do elenco (15/32), 6 notícias reais e /quiz (story 2.1). FAIL: 5 HIGH, todos de conteúdo ou licença (recorte CC sem aviso de modificação, foto de Reinier mostra outros jogadores, foto/alt da notícia do Fred, fatos e datas falsos nas notícias, fato falso na Q9). No Chrome real, o quiz passou em AC1, AC6 e AC11. O AC9 passou com 3 MEDIUM."
tags: [qa, audit, quiz, elenco, noticias, licenca, a11y]
related: ["[[results]]", "[[elenco-jogos-audit]]", "[[../../stories/active/2.1-pagina-quiz]]", "[[../research/fotos-elenco-wikimedia]]", "[[../research/noticias-reais-2026]]", "[[../research/quiz-perguntas]]"]
---

# Laudo QA: fotos do elenco, notícias reais e /quiz (rodada 1/3, 2026-09-30)

**Veredicto: FAIL.** O quiz funciona e é acessível por teclado. Mas o que vai ao ar
tem fatos falsos, fotos erradas e uma violação de licença que já tinha sido corrigida
na Arena MRV.

## Método (evidência produzida por mim)

- **Tríade:** `pnpm lint` exit 0, `pnpm typecheck` exit 0, `pnpm build` exit 0, com
  13/13 páginas estáticas e `/quiz` como `○` (5.3 kB). Havia 0 `next build` concorrentes.
  O HTML foi copiado para o scratchpad logo após o build.
- **Navegador real:** Chrome 154 headless dirigido via CDP (`Input.dispatchKeyEvent`
  gera eventos de teclado nativos, com Tab, Espaço, Enter e setas, incluindo as ações
  padrão do navegador) contra `next start -p 3107`, servindo o build de produção. O dev
  server do lead (`:3000`) respondia **500 em todas as rotas, inclusive `/`**, o que
  indica problema de ambiente (`.next` sobrescrito por um build) e não defeito de código.
  Não o reiniciei.
- **Commons API** (`extmetadata`, `size`) consultada para os 16 arquivos. Foram abertas
  visualmente as 15 fotos do elenco e as 3 das notícias, mais os screenshots
  renderizados de `/elenco` e da home.
- **Fontes jornalísticas** consultadas direto (site oficial, CNN, Gazeta, noataque) para
  as datas e para a afirmação sobre a estreia do Fred.

## Story 2.1 (/quiz): os 4 ACs que dependiam de navegador

| AC | Resultado | Evidência |
|---|---|---|
| **AC1** | **OK** | Em 768, 800, 900, 1024, 1280 e 1440px os 6 itens ficam na mesma linha (`top` único, altura 36px), sem overflow na página nem no nav. A folga entre logo e nav é de 113px em 768px. `aria-current="page"` aparece só em `/quiz`. No Sheet mobile (320, 375, 414 e 767px) os 6 links cabem sem overflow e o menu abre pelo teclado (Enter no "Abrir menu"). O footer tem Quiz→/quiz. |
| **AC6** | **OK** | O quiz foi jogado **6 vezes inteiro só com teclado**, de 0 erros no roteiro até o fim. São 9 Tabs da página até a 1ª alternativa. "Confirmar" sem seleção não avança, mostra "Escolha uma alternativa" (`role=alert`) e liga o `aria-describedby`. Depois de confirmar, as alternativas ficam travadas (`disabled`), a correta e a errada são marcadas e o feedback em texto é "Acertou!" ou "Não foi dessa vez — a resposta certa é {label}.". O botão vira "Próxima pergunta" e, na 10ª, "Ver resultado". Confirmar funciona com Enter no botão, Espaço no botão e **Enter direto no radio** (submissão implícita). Não há timer. |
| **AC7** (bônus) | **OK** | Cenários jogados no Chrome: 0/10 dá "Torcedor de araque"; 4/10 (um abaixo do limiar) dá "Torcedor de araque"; **5/10 (limiar de 50%) dá "Atleticano roxo"**; 7/10 dá "Atleticano roxo"; **8/10 (limiar de 80%) dá "Nasceu vestindo preto e branco"**; 10/10 dá "Nasceu…". `scoreQuiz` e `getResultTier` (`src/lib/quiz.ts:9-32`) estão corretos por leitura: `>=` inclusivo e ordenação decrescente. |
| **AC9** | **OK com 3 MEDIUM** | O foco segue o roteiro em 100% das transições: confirmar leva ao botão, avançar leva ao `h2` da pergunta seguinte, a tela final leva ao `h2` do resultado e "Refazer" leva ao `h2` da P1, com o estado zerado. `:focus-visible` fica `true` em todos os pontos. A árvore de acessibilidade tem `group` com o nome do enunciado (a `legend` com `display:contents` funciona no Chrome 154), `radio` com o nome do label e `progressbar` "Pergunta n de 10". A região `aria-live` do form é a **mesma instância** nas 10 perguntas. Contraste: feedback 19.8:1, contador e badge 9.44:1, "Escolha uma alternativa" 4.52:1. Ver M1–M3. |
| **AC11** | **OK** | Console **vazio** (0 mensagens, 0 exceções) em `/`, `/historia`, `/titulos`, `/estadio`, `/elenco` e `/quiz`, e também durante as 6 partidas. O HTML servido de `/quiz` traz `h1` "Quiz do Galo", a intro, a P1 visível e o `<noscript>`, com `opacity:0` = 0. Com `prefers-reduced-motion: reduce`, as transições caem para 0.01ms. **Ressalva:** o teste foi feito no build de produção, que detecta mismatch de texto/estrutura (#418) mas não avisa sobre mismatch só de atributo. Por leitura, o render do `QuizRunner` e do `SiteHeader` é determinístico: sem `Math.random`/`Date`, e o estado inicial é fixo. |

## Findings

### HIGH (bloqueantes)

**H1. Fotos CC BY / CC BY-SA 4.0 recortadas sem indicar modificação.** A licença exige
isso (§3(a)(1)(B)), e é a mesma regra já aplicada na Arena, `estadio/page.tsx:65`
"(recortada do original)". `scripts/_tmp-fetch-images.mjs:30-48` aplica
`resize(..., { fit: "cover" })` em todas. Nenhuma fonte tem a proporção de saída, então
todas foram recortadas (tamanhos da API do Commons): Reinier 3352x2235 → 720x960;
Fred 592x1439 → 720x960 e 1200x800; Léo Duarte (elenco) 1064x1600 → 720x960; Alan
Franco e Alan Minda 3333x5000 → 720x960; Angelo Preciado (CC BY 4.0) 275x384 → 720x960;
Léo Duarte (notícia, CC BY 4.0) 5152x7728 → 1200x800. A lista de créditos em
`src/app/elenco/page.tsx:73-92` e a legenda em `src/components/sections/news-grid.tsx:64-83`
não indicam o recorte. O descumprimento encerra a licença automaticamente (§6(a)).
**Corrigir:** incluir "(recortada do original)" nas duas renderizações, pelo menos para
as licenças 4.0; o ideal é aplicar a todas as CC. Autor, licença e link batem com a API
nos 16 arquivos.

**H2. A foto de "Reinier" mostra outros jogadores.** O arquivo do Commons é descrito
como "Mohamed Simakan (RB Leipzig, 2); Kopfballduell … vorn im Bild: Dominik Szoboszlai
(17), Reinier (BVB, 20)". O recorte 3:4 com `position: "top"` deixa em evidência
Simakan (#2) e Szoboszlai (#17). Reinier aparece só como fragmento amarelo na borda.
No card, o número "19" fica ao lado do "17" da camisa. Mesmo assim o `alt` gerado
afirma "Reinier, Meio-campo" (`squad-grid.tsx:61`). **Corrigir:** recortar
manualmente no Reinier (extract por coordenadas) ou voltar à silhueta com `alt=""`.

**H3. A notícia do Fred tem uma foto inutilizável e o `alt` é falso.**
`public/images/news/fred.jpg` reaproveita a foto de 2022 no Manchester United
(`_tmp-fetch-images.mjs:98-100`). O recorte 1200x800 `attention` de um retrato
592x1439, ampliado 2x, mostra **só o calção e a mão** do jogador, sem rosto. O `alt`
(`src/content/news.ts:92`) diz "Fred em ação pelo **Fenerbahçe**". Esse é o texto do
research para **outro arquivo** (`Fred_(footballer,_born_1993)_7_Fenerbahçe_20260805…`).
A atribuição (Ardfern) bate com a imagem; o `alt` não. **Corrigir:** usar um recorte com
rosto e `alt` "…pelo Manchester United", ou baixar o arquivo do Fenerbahçe indicado no
research depois de verificar autor e licença na API.
*Relacionado (MEDIUM):* `news/leo-duarte.jpg` corta a cabeça e mostra só o tronco com a
camisa. Não dá para identificar o jogador, então o `alt` "Léo Duarte em ação…" promete
mais do que a imagem entrega. `news/renan-lodi.jpg` é um rosto muito ampliado (borrado)
com agasalho, e o `alt` diz "em ação".

**H4. Dados falsos nas notícias** (`src/content/news.ts`). O research tinha os erros e o
dev transcreveu fielmente (padrão #8):
- `:73`: "Fred marcou o gol da virada **em sua primeira partida pelo clube**". A fonte
  citada pelo próprio research (noataque, `articleBody`) diz: "Logo na **terceira
  partida** pelo Atlético, o volante Fred foi herói…". A citação completa de Fred ainda
  diz "estrear de titular em um clássico, **na casa deles**", ou seja, a estreia como
  titular foi no Mineirão (ida), e não na Arena MRV. É a notícia de destaque.
- `:115`: Renan Lodi aparece em "**15 de janeiro de 2026**". O dia foi inventado (o
  comentário `:112-114` admite isso), e mês e ano também estão errados: o site oficial
  (`article:published_time` 2025-12-27T19:14:37Z) e a CNN (2025-12-27T16:47-03:00)
  mostram anúncio em **27/12/2025**.
- `:90`: Fred aparece em "15 de agosto de 2026". A Gazeta Esportiva publicou o anúncio
  em **14/08/2026** (`datePublished` 2026-08-14T12:01:57-03:00).

O `<time>` publica essas datas como exatas. **Corrigir:** excerpt "…em sua terceira
partida pelo clube" (ou retirar a afirmação), `date: "2025-12-27"` e
`date: "2026-08-14"`. O pesq deve corrigir o research.

**H5. Fato falso no quiz.** `src/content/quiz.ts:143`, Q9: "…marcando o **segundo
título** na competição". O próprio `atletico-mineiro-facts.md#recopa-sul-americana` diz
"2014 — Campeão (**1º título**) · Primeira participação". O erro vem de
`research/quiz-perguntas.md:203`, onde o research contradiz a própria fonte. **Corrigir:**
"…o primeiro título do clube na competição".

### MEDIUM

**M1. O anel de foco dos botões do quiz tem 2.78:1**, abaixo de 3:1 (WCAG 1.4.11).
`components/ui/button.tsx:7` troca o outline global por `outline-none` +
`ring-3 ring-ring/50`. No Chrome medi `oklab(0.728 0.0007 0.138 / 0.5)`: sobre `#0a0a0a`
isso dá 2.78:1, e contra o próprio botão dourado 2.94:1. O outline global
(`globals.css:139-142`) teria 8.18:1. Afeta Confirmar, Próxima, Ver resultado e Refazer,
ou seja, todo o fluxo por teclado. O problema já existia (shadcn, usado também no hero e
no mobile-nav), mas o AC9 exige foco visível. **Corrigir:** `ring-ring` sem alfa, ou um
wrapper fora de `ui/`.

**M2. O placar do resultado não é anunciado ao leitor de tela.** O `div` raiz do
`QuizRunner` é **reaproveitado** pelo React (confirmado: é o mesmo nó) e só ganha
`aria-live` no mesmo commit em que o conteúdo muda (`quiz-runner.tsx:137`). Uma região
live criada junto com o conteúdo não é anunciada de forma confiável. O foco vai para o
`h2` da faixa, que vem **depois** de `<p>5 / 10</p>` no DOM, então quem usa leitor de
tela ouve só "Atleticano roxo". Além disso, "5 / 10" é lido como "5 barra 10", e o AC7
pede "{acertos} de {total}". **Corrigir:** incluir o placar no `h2` ou logo após ele,
em texto "5 de 10", ou manter a região live persistente fora do ramo condicional.

**M3. A troca de pergunta não é anunciada pela região live** (a letra do AC9). A região
é limpa ao avançar, e o foco no `h2` lê só o enunciado, sem "Pergunta n de 10". A spec
de UX (`quiz-design.md:122`) diz que isso é dispensável, e a story diz o contrário. O
architect precisa reconciliar as duas. **Corrigir** (opção barata): `aria-describedby`
do `h2` apontando para o contador.

### LOW

- **L1** `quiz.ts:129`: `factRef: "atletico-mineiro-facts#estadia-atual"` aponta para um
  heading que não existe (o heading é "Estádio Atual" → `#estadio-atual`). Erro de
  digitação herdado de `quiz-perguntas.md:183`. Viola a letra do AC5.
- **L2** `quiz-runner.tsx:285`: "Escolha uma alternativa" em `text-error`. Com 4.52:1
  passa no AA, mas a UX (`quiz-design.md:90,215` e `globals.css:39-40`) proíbe vermelho
  em texto.
- **L3** `quiz-runner.tsx:235-239`: um `role="radiogroup"` **sem nome** dentro do
  `fieldset`, que já é um grupo nomeado. O grupo fica duplicado e a descrição cai no grupo
  sem nome. Remover o `role` e mover o `aria-describedby` para o `fieldset`.
- **L4** `quiz-runner.tsx:253`: `bg-[#1a1a1a]` é um hex fora dos tokens do `@theme`.
- **L5** O AC8 diz "Jogar de novo" e a UX diz "Refazer o quiz"; o dev seguiu a UX. O AC7
  diz "X de Y" e a UX diz "X / Y". O architect precisa alinhar o texto dos ACs.
- **L6** A foto de Angelo Preciado é um arquivo de 275x384 ampliado para 720x960
  (≈2.6x), e a de Fred (elenco) foi ampliada de 592px de largura. As duas perdem
  qualidade visível.

## Confirmações (sem problema)

- **/elenco:** "Créditos das fotos" fica visível no rodapé com **15 itens** (autor,
  licença com link e "via Wikimedia Commons" com link), e o aviso no topo cita "15 de 32".
  Sem regressão: **17 `alt=""`** + 15 `alt` nomeados, 0 `img` sem `alt`, em 1280px e em
  375px. As outras 14 fotos mostram o jogador certo com rosto, conforme a descrição do
  Commons.
- **Notícias:** os títulos e excerpts dos 6 itens batem com o research, palavra por
  palavra, e a data do Léo Duarte está corrigida para 24/06/2026. A **citação do Fred**
  aparece em `<blockquote>` com aspas tipográficas e "— Fred, volante do Atlético-MG, em
  entrevista após a partida", e o texto confere com a fonte ("Nem no meu melhor sonho eu
  imaginaria isso"). As 3 notícias com foto real mostram a legenda "Foto: {autor},
  licença {link}, via {link}" (falta só a indicação de recorte, ver H1). As 3 sem foto
  usam o placeholder genérico (estrela, sem texto queimado) com `alt=""`.
- **Quiz, conteúdo:** 10 perguntas idênticas a `quiz-perguntas.md`. As perguntas 1 a 8
  e 10 conferem com `atletico-mineiro-facts.md` (1908, 22 estudantes, Parque Municipal;
  anos 1930; preto e branco nos anos 1920; 1921 contra o Palestra Itália; Olimpia 2013;
  CONMEBOL 1992 e 1997; Brasileiro 1971 e 2021 com Cuca e 13 pontos; 44.892 e
  27/08/2023, 2×0 no Santos; 50 títulos com 6 seguidos). 9/10 `factRef` válidos (ver L1).
  Gabarito distribuído: a×1, b×6, c×2, d×1.
- **AC10:** a `description` tem 127 caracteres (contados com `[...s].length`), o canonical é `/quiz` e o sitemap inclui
  `/quiz`.
- **AC3:** o `QuizRunner` recebe tudo por props (`page.tsx:42`).

## Próximos passos

- **sites-dev-alpha:** H1, H2, H3, H4 (3 linhas em `news.ts`), H5, M1, M2, L1 (e M3/L2–L4
  se couber).
- **pesq:** corrigir `quiz-perguntas.md:183,203` e `noticias-reais-2026.md` (excerpt do
  item 1, datas dos itens 2 e 3). Senão o erro volta na próxima transcrição.
- **architect:** alinhar o texto de AC7/AC8/AC9 com `quiz-design.md` (L5 e M3).
- **Ambiente:** o dev server `:3000` do lead está em 500 em todas as rotas.
- Esta é a rodada **1/3**.
