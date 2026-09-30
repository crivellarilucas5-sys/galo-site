---
kind: audit
status: concerns-round-3-closed
summary: "QA do épico 2 (elenco real + Jogos + foto Arena MRV, 2026-09-30). Encerrado na rodada 3/3 com CONCERNS. H1, M1, M2 e a regressão R2-1 (datas de notícia date-only) foram resolvidos e verificados com builds isolados em UTC e BRT (diff vazio). LOW L1 a L5 e a falta de Lighthouse/axe ficam para o lead adjudicar."
created: 2026-09-30
---

# QA: elenco real, seção Jogos e foto da Arena MRV (rodada 1/3)

**Escopo:** sessão do alpha em [[../../_inbox/sites-dev-alpha-2026-09-30]], com specs em
[[../ux/elenco-jogos-refresh]] e [[../research/elenco-atual-2026]]. É um review novo (épico 2),
sem relação com o cap do épico 1.
**Evidência:** meu próprio `pnpm lint`/`typecheck`/`build` (exit 0/0/0, 12/12 páginas estáticas),
HTML pré-renderizado em `.next/server/app/*.html`, CSS compilado, pixels da foto e da silhueta
lidos com `sharp`, e metadados obtidos direto da API do Wikimedia Commons.

## VEREDICTO: FAIL (1 HIGH, que é uma correção de uma linha)

## Pontos que o alpha pediu para eu confirmar

| # | Item | Resultado |
|---|---|---|
| 1 | Contraste do número dourado (meio-campo) | **OK. 6.38:1** efetivo. O número tem `opacity-90`, então a cor real é `#B79425` sobre `#141414`. O dourado puro daria 7.62:1. O "~5.8:1" do alpha/UX estava subestimado, mas passa com folga até como texto AA. O número não se sobrepõe à figura da silhueta. |
| 2 | Crop da foto: rosto identificável | **OK, sem risco.** Abri as 3 faixas inferiores e a faixa média-esquerda com zoom de 2x sobre os pixels nativos (2200×1100). O público mais próximo tem cabeças com cerca de 10px, e os jogadores são figuras minúsculas. O `srcset` do Next/Image (640w a 3840w) só **redimensiona**, nunca recorta, e o otimizador não amplia além da fonte. O `object-cover` só remove área. Então nenhuma variante mostra mais detalhe que o arquivo-fonte. O arquivo não tem EXIF/XMP/IPTC (nada de GPS nem de dispositivo), e o original sem recorte não está em `public/`. |
| 3 | Atribuição CC BY-SA 4.0 | **Visível e com dados corretos, mas INCOMPLETA** (ver H1). A API do Commons confirma: Artist = `Felipebini`, LicenseShortName = `CC BY-SA 4.0`, e os links de licença e da página do arquivo estão corretos no HTML. O contraste da legenda `white/60` sobre o overlay a 0.85 fica entre **5.71:1** (pior caso, pixel branco na foto) e 7.30:1. |

## Checagens padrão

- `alt=""` nas silhuetas: **32/32** no HTML, sem regressão. O `alt` do hero passou a ser descritivo (correto).
- Elenco: **32 cards** conferem 1:1 com o research (nome, número e posição). Números únicos, total 4+9+13+6 = 32.
- V/E/D: ícone por forma (`arrow-up`/`minus`/`arrow-down`, `aria-hidden`) + `sr-only` "Vitória/Derrota/Empate". Não depende só de cor.
- `<h2>Jogos</h2>`: presente, primeiro h2 da home. A ordem no DOM é próximo, resultados, em seguida, feita via `grid-template-areas`, sem `order`.
- Disclaimer de `/elenco`: "Elenco real, levantado em 30 de setembro de 2026 [...] podem estar desatualizados". Zero ocorrências de "fictíc*" em `/elenco` e na home.
- `opacity:0` no SSR: 0 em index, elenco e estadio (padrão 2 do épico 1 sem regressão).
- `section-light`: todos os textos da seção Jogos usam `text-fg-on-light*` de forma explícita (padrão 1 do épico 1 sem regressão).

## Findings

**[HIGH] H1: a atribuição não indica que a foto foi modificada.** `src/app/estadio/page.tsx:63-83`.
A CC BY-SA 4.0 §3(a)(1)(B) exige *"indicate if You modified the Licensed Material"*. O original
tem 4000×3000 (4:3). O publicado tem 2200×1100, com a faixa inferior removida de propósito.
Nada no site diz isso: grep por `recort|modific|adaptad` = 0. Pela §6(a), descumprir os termos
**encerra a licença automaticamente** (ela volta se o problema for corrigido em até 30 dias).
Ou seja, hoje a imagem estaria publicada sem licença válida.
**Correção:** incluir a indicação na legenda, por exemplo "Foto: Felipebini (recortada), licença CC BY-SA 4.0, via Wikimedia Commons".
Pode ser um campo `modified?: string` em `ImageAttribution`, para as próximas fotos reais seguirem o mesmo padrão.

**[MEDIUM] M1: datas e horas formatadas no fuso do servidor de build.** `src/components/sections/next-match.tsx:51-53` e `:93-100`.
Os dois `Intl.DateTimeFormat` estão sem `timeZone`, e o componente é server component estático.
Prova: com `TZ=UTC`, "Palmeiras 17/09 21:30 BRT" vira **18/09** e o card principal vira **"às 19:00"** (o correto é 16:00).
Meu build local está em BRT e por isso mostra certo. Em Vercel/CI (UTC) o HTML publicado sai errado.
O horário do card principal já tinha esse problema no épico 1; os chips novos herdaram e ganharam o caso de troca de dia.
**Correção:** `timeZone: "America/Sao_Paulo"` nos dois formatadores.

**[MEDIUM] M2: ícone de vitória com 2.42:1.** `next-match.tsx:32`.
`text-primary` (#C9A227) sobre o chip branco fica abaixo dos 3:1 da WCAG 1.4.11. A borda dourada do chip também fica em 2.42:1.
Para quem enxerga, o ícone é o indicador de V/E/D, porque o texto é `sr-only`. Empate e derrota ficam em 8.45:1.
O placar atenua o problema, porque também comunica o resultado.
**Correção sugerida:** ícone de vitória em `text-fg-on-light` (a borda dourada pode ficar como reforço), ou um rótulo visível "V/E/D".

**[LOW] L1: listas com rolagem horizontal no mobile sem foco por teclado.** `next-match.tsx:168,182`.
"Em seguida" ocupa 3×152+24 = 480px contra 312px úteis em 360px, e o `<ul overflow-x-auto>` não tem nenhum elemento focável dentro (regra axe `scrollable-region-focusable`).
**Correção:** `tabIndex={0}` + `role="region"`/`aria-label` no container de rolagem, ou empilhar no mobile.

**[LOW] L2: silhueta com fundo opaco `#141414`.** `public/images/squad/placeholder-silhueta.png`, usada em `squad-grid.tsx:59-74`.
No goleiro, isso abre um "buraco" quadrado na textura diagonal (1.16:1). Na defesa e no ataque aparece um quadrado levemente mais claro sobre `#0A0A0A` (1.07:1).
Confirmei por composição simulada com contraste amplificado. A percepção no contraste real depende do monitor: **confirmação visual pendente**.
**Correção:** PNG com fundo transparente.

**[LOW] L3: borda dourada do card "Próximo jogo" não é renderizada.** `next-match.tsx:125`.
Existe `border-primary` (só a cor), mas falta `border` (a espessura). O preflight do Tailwind v4 zera a largura da borda.
O `ring-foreground/10` do shadcn é branco sobre branco. Resultado: a spec §2 ("borda accent 1px") não é atendida e só sobra o `shadow-md`.

**[LOW] L4: leitura do placar pelo leitor de tela.** O chip é lido como "Vitória 2×0 Bahia · 13/09".
O "×" tende a ser vocalizado como "vezes". A spec §2 pedia "Vitória, 2 a 0 contra Bahia, 13/09" em `sr-only`.

**[LOW] L5: alt do hero diz "durante uma partida".** A descrição no Commons diz *"before Clube Atlético Mineiro vs EC Bahia game"*. É um detalhe, mas o `alt` deve descrever o que a imagem mostra.

## Fora do meu alcance de verificação
- Se o elenco de 30/09/2026 bate com o site oficial é responsabilidade do research. Conferi só a consistência interna e a correspondência entre dev e research.
- Lighthouse/axe continuam sem medição (a mesma lacuna do épico 1).

## Próximo passo
@sites-dev-alpha: corrigir H1 (obrigatório). Recomendo fechar M1 e M2 na mesma rodada, porque são correções de uma linha cada. Os LOW ficam a critério do lead.
Rodada 2 de 3 no máximo.

---

# Rodada 2/3 (2026-09-30)

**Entrada:** [[../../_inbox/sites-dev-alpha-2026-09-30-qa-round2-fixes]]. Tratei o relato como alegação e conferi tudo.
**Evidência própria:**
- Tríade: `pnpm lint` (exit 0), `pnpm typecheck` (exit 0) e `TZ=UTC pnpm build` (exit 0, 12/12 páginas estáticas).
- Um segundo `pnpm build` no fuso local (`America/Sao_Paulo`, exit 0, 12/12).
- Extraí todas as datas de `.next/server/app/index.html` nos dois builds. `diff` vazio: a saída não depende do fuso de build.

## VEREDICTO: FAIL. Os 3 findings foram resolvidos, mas há 1 regressão MEDIUM criada nesta rodada.

## Findings da rodada 1

| # | Status | Evidência |
|---|---|---|
| H1 | **RESOLVIDO** | HTML de `/estadio`: "Foto: Felipebini **(recortada do original)**, licença CC BY-SA 4.0, via Wikimedia Commons". Os links de licença e da página do arquivo estão intactos. Atende a §3(a)(1)(B). (O campo `modified?` em `ImageAttribution` não foi criado. O texto está fixo em `page.tsx:65`. Isso não bloqueia, mas a próxima foto real não herda o padrão.) |
| M1 | **RESOLVIDO** (para jogos) | `next-match.tsx:55` e `:104` usam `timeZone: "America/Sao_Paulo"`. No build com `TZ=UTC`: chips 13/09, **17/09** e 24/09; "Em seguida" 11/10, 18/10 e 25/10; card "domingo, 04 de outubro **às 16:00**". O build BRT dá saída idêntica. As strings de jogo têm offset `-03:00`, então a conversão é exata. |
| M2 | **RESOLVIDO** | O HTML mostra `lucide-arrow-up ... text-fg-on-light` (#0A0A0A sobre #FFF = **19.80:1**; o alpha disse ~19.5). Empate e derrota continuam em 8.45:1. A borda dourada segue em 2.42:1, mas agora é reforço redundante, porque o ícone por forma já passa em contraste. Aceito. |

## Finding novo

**[MEDIUM] R2-1: regressão nas datas de notícia.** `src/components/sections/news-grid.tsx:43-48`.
O alpha estendeu o M1 ao `news-grid`, fora do escopo do QA. Mas `src/content/news.ts` usa datas **date-only** (`"2026-03-25"`), e `new Date("2026-03-25")` é **meia-noite UTC**. Em `America/Sao_Paulo`, isso vira 21:00 do dia anterior.

HTML do build (idêntico em UTC e BRT):
```
<time dateTime="2026-03-25">24 de março de 2026
<time dateTime="2026-02-14">13 de fevereiro de 2026
... (6/6 com -1 dia, texto visível ≠ o próprio dateTime)
```
Antes desta rodada, o build UTC (Vercel) mostrava as datas certas. Agora elas saem erradas em qualquer ambiente. É regressão em produção, na home (checklist item 3).
O relato "datas e horários saem corretos mesmo sob UTC" é falso para estas 6 datas. Provavelmente só foram grepadas as datas de jogo.
**Correção (1 linha):** `timeZone: "UTC"` nesse formatador. Uma data sem hora deve ser formatada no mesmo fuso em que foi parseada. Um comentário explicando o motivo evita que alguém "corrija" de volta.
Critério de aceite para a rodada 3: `grep -oE '<time[^>]*>[^<]*' index.html` com texto igual ao `dateTime` nos 6 itens, com `TZ=UTC` e sem ele.

## LOW da rodada 1: sem mudança, sem piora (para adjudicação do lead)

| # | Estado confirmado no build |
|---|---|
| L1 | As 2 `<ul overflow-x-auto>` continuam sem `tabindex`/`role="region"` (`tabindex="0"` = 0 no HTML). |
| L2 | PNG inalterado (mtime 2026-09-09). O canal alfa existe, mas os cantos são `[20,20,20,255]`, ou seja, fundo `#141414` opaco. |
| L3 | O card continua `border-primary` sem `border`. Só há `ring-1 ring-foreground/10`. |
| L4 | O chip ainda é lido como "Vitória 2×0 Bahia · 13/09". |
| L5 | O `alt` do hero ainda diz "durante uma partida". |

Checagens gerais sem regressão: `opacity:0` = 0 em index, elenco e estadio; `alt=""` 32 em elenco; "fictíc*" = 0 em home e elenco.

## Próximo passo
@sites-dev-alpha: corrigir o R2-1 e **não mexer em mais nada**. Rodada 3/3, a última. Se falhar, o lead adjudica item a item.
L1 a L5 ficam com o lead, que decide se vão para a rodada 3 ou para uma story de hardening.

---

# Rodada 3/3, FINAL, cap atingido (2026-09-30): verificação A

> **Nota de reconciliação:** houve dois despachos simultâneos de sites-qa para a rodada 3. Esta é a verificação A. A seção seguinte, "Rodada 3/3 (2026-09-30), última", é a verificação B. As duas foram feitas de forma independente e **convergem para CONCERNS**, com os mesmos números. O "build concorrente" que cada uma registrou era o build da outra. Vale como uma única rodada 3, com dupla confirmação. Não é uma 4ª rodada.

**Entrada:** o alpha informou que corrigiu o R2-1 (`news-grid.tsx` passou a usar `timeZone: "UTC"`) e que não mexeu em `next-match.tsx`. Tratei isso como alegação e conferi.
**Evidência própria:**
- `pnpm lint`: exit 0, sem saída. `pnpm typecheck`: exit 0, sem saída.
- `TZ=UTC pnpm build`: exit 0, 12/12 páginas estáticas. `pnpm build` local (Node resolve `America/Sao_Paulo`): exit 0, 12/12.
- Copiei `index.html` de cada build para o scratchpad logo após o build. Extraí `<time>` e as datas/horas de jogo e comparei com `diff`.
- **Incidente de ambiente (não é defeito de código):** minha primeira tentativa de `TZ=UTC pnpm build` falhou com `ENOENT .next/server/pages-manifest.json`. Havia outro `next build --turbopack` concorrente (PID 17244, iniciado às 15:31, não era meu) recriando `.next`. Esperei ele terminar e repeti o build, que passou. Mais tarde outro build externo apagou `.next` de novo enquanto eu checava. Por isso a evidência de datas vem das cópias salvas dos **meus** builds. Builds paralelos no mesmo `.next` quebram um ao outro, e o lead deveria serializar isso.

## VEREDICTO: CONCERNS (final)

## R2-1: RESOLVIDO

`news-grid.tsx:43-53` tem `timeZone: "UTC"` e um comentário explicando por que ele difere do `next-match.tsx`, como a rodada 2 pediu. O `next-match.tsx` continua com `timeZone: "America/Sao_Paulo"` em `:55` e `:104`.

`<time>` da home. O `diff` UTC × local deu **IDÊNTICOS**:
```
<time dateTime="2026-03-25">25 de março de 2026
<time dateTime="2026-02-14">14 de fevereiro de 2026
<time dateTime="2026-01-30">30 de janeiro de 2026
<time dateTime="2025-12-10">10 de dezembro de 2025
<time dateTime="2025-11-22">22 de novembro de 2025
<time dateTime="2025-10-05">05 de outubro de 2025
```
Os 6 itens são iguais a `src/content/news.ts:20-70` e ao próprio `dateTime`. O critério de aceite da rodada 2 foi atendido.

**Jogos sem regressão.** O `diff` UTC × local deu **JOGOS-IDENTICOS**. Resultados: 13/09, 17/09 e 24/09. Em seguida: 11/10, 18/10 e 25/10. Card: "domingo, 04 de outubro às 16:00". É a mesma saída verificada na rodada 2.

## Estado consolidado dos findings do épico 2

| # | Sev. | Status final |
|---|---|---|
| H1 | HIGH | Resolvido. O HTML de `/estadio` diz "Felipebini (recortada do original), licença CC BY-SA 4.0", com os links intactos. |
| M1 | MEDIUM | Resolvido (sem regressão nesta rodada). |
| M2 | MEDIUM | Resolvido. `lucide-arrow-up size-4 text-fg-on-light` continua no HTML. |
| R2-1 | MEDIUM | Resolvido (ver acima). |
| L1 | LOW | Aberto. `tabindex="0"` = 0 na home. |
| L2 | LOW | Aberto. O PNG da silhueta tem fundo opaco (não mudou nesta rodada). |
| L3 | LOW | Aberto. O card está `border-primary bg-white shadow-md`, sem `border`. |
| L4 | LOW | Aberto. O `sr-only` continua "Vitória" + placar com "×". |
| L5 | LOW | Aberto. O `alt` de `/estadio` ainda diz "durante uma partida". |

Sem regressões gerais: `opacity:0` = 0 em index, elenco e estadio; `alt=""` = 32 em elenco; "fictíc*" = 0 em home e elenco.

Ressalvas que seguem abertas e não bloqueiam:
- Lighthouse e axe não foram medidos (a mesma lacuna do épico 1).
- O campo `modified?` em `ImageAttribution` não existe. Uma próxima foto real não herda a indicação de recorte.

## Encerramento
**Ciclo encerrado, com o cap de 3 rodadas atingido.** Não há CRITICAL/HIGH/MEDIUM abertos. O lead adjudica L1 a L5 (sugiro uma story de hardening de a11y com L1, L3 e L4, e L2 e L5 como tarefas de conteúdo/asset). Liberado para push pelo @sites-devops, com as observações documentadas.

---

# Rodada 3/3 (2026-09-30), última: verificação independente

> **Nota de consolidação:** a seção "Rodada 3/3, FINAL" acima foi escrita em paralelo por outra instância de QA. Os dois laudos são independentes e **concordam**: CONCERNS, R2-1 resolvido, L1 a L5 abertos. Os builds concorrentes que cada um viu foram provavelmente o do outro. O lead pode fundir as duas seções no `*compact`.

**Entrada:** [[../../_inbox/sites-dev-alpha-2026-09-30-qa-round3-fix]]. O alpha mandou o reenvio direto para mim, e conferi tudo.

**Incidente de evidência:** a primeira tentativa de build coincidiu com outro `next build --turbopack` rodando no mesmo `.next` (PID 7820, iniciado às 15:31:38, de outro agente). Resultado: `index.html` ausente e `ENOENT` em `_buildManifest.js.tmp`. **Descartei essa evidência.** Esperei não haver nenhum `next build` ativo e rodei os dois builds em sequência, conferindo antes e depois de cada um que havia 0 builds concorrentes.

**Evidência própria:**
- `pnpm lint` (exit 0) e `pnpm typecheck` (exit 0).
- `TZ=UTC pnpm build` isolado: exit 0, 12/12, 0 builds concorrentes.
- `pnpm build` local isolado (`America/Sao_Paulo`): exit 0, 12/12, 0 builds concorrentes.
- `diff` das datas da home entre os dois builds: **vazio**.
- O formatador de notícias, rodado direto no Node sob TZ local, UTC, `Pacific/Kiritimati` (UTC+14) e `Pacific/Pago_Pago` (UTC-11), dá o mesmo resultado nos quatro.

## VEREDICTO: CONCERNS. Aprovado com observações. Ciclo encerrado.

| # | Status | Evidência |
|---|---|---|
| R2-1 | **RESOLVIDO** | `news-grid.tsx:52` usa `timeZone: "UTC"`, com um comentário explicando por que é diferente do `next-match`. O texto de cada `<time>` bate com o seu `dateTime` nos 6 itens: 25/03/2026, 14/02/2026, 30/01/2026, 10/12/2025, 22/11/2025 e 05/10/2025. Tudo igual em UTC e em BRT. |
| H1 | Mantido | Grep "recortada do original" = 1 em `estadio.html`. |
| M1 | Mantido | 13/09, 17/09, 24/09, 11/10, 18/10, 25/10 e "às 16:00", iguais em UTC e BRT. |
| M2 | Mantido | Ícone de vitória em `text-fg-on-light`. |
| Gerais | Sem regressão | `opacity:0` = 0 em index, elenco e estadio. |

## Observações (CONCERNS), para o lead adjudicar
- [CONCERN] **L1:** `next-match.tsx:171-174,187`. As listas com rolagem horizontal não têm foco por teclado (axe `scrollable-region-focusable`).
- [CONCERN] **L2:** `public/images/squad/placeholder-silhueta.png` tem fundo `#141414` opaco. A confirmação visual continua pendente.
- [CONCERN] **L3:** `next-match.tsx:130`. `border-primary` sem `border`, então a borda dourada da spec §2 não é renderizada.
- [CONCERN] **L4:** o `sr-only` do chip lê "2×0", e o "×" tende a ser vocalizado como "vezes".
- [CONCERN] **L5:** `content/arena.ts:51`. O alt diz "durante uma partida", mas a foto é de antes do jogo.
- [CONCERN] **H1, detalhe:** a indicação de recorte está fixa em `estadio/page.tsx:65`, não num campo de `ImageAttribution`. A próxima foto real não herda o padrão.
- [CONCERN] Lighthouse/axe continuam sem medição, a mesma lacuna do épico 1.

## Próximo passo
Lead: adjudicar L1 a L5 (sugiro uma story de hardening de a11y via @sites-architect) e liberar o push via @sites-devops.
O alpha avisou que o diretório não é um repositório git (`not a git repository`), então nada foi commitado. O devops precisa resolver isso antes do push.
