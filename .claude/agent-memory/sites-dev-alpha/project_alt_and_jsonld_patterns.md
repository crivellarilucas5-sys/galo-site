---
name: project-alt-and-jsonld-patterns
description: Site do Atlético Mineiro (rodada 3 QA) — regra de `alt=""` para imagens placeholder genéricas em todo o site, e padrão JSON-LD WebSite/about para não encarnar a entidade oficial de um fansite.
metadata:
  type: project
---

## Regra de `alt` para imagens placeholder genéricas (QA AC3/N3)

Neste site (`src/content/*`, imagens geradas por `scripts/generate-placeholders.mjs`),
toda imagem "de origem própria" que é o mesmo motivo gráfico genérico (listras
+ estrela, sem conteúdo distinguível por instância) recebe `alt=""`
(decorativo) — nunca um `alt` que afirma uma identidade/cena específica que a
imagem não retrata (ex.: `alt="Arquibancada da Arena MRV"` numa imagem que é
só um gradiente com listras). A regra nasceu no AC3 da story 1.8 (elenco:
silhueta genérica × nome do jogador) e foi estendida na rodada 3 do QA (N3) às
outras 19 imagens do site: hero da Home e da `/estadio`, 6 tiles de notícia, 6
da galeria da arena, 5 da timeline.

**Why:** um `alt` factualmente errado é pior que nenhum — WCAG 1.1.1 pede que
o alternativo textual corresponda ao que a imagem mostra, não à intenção
editorial do dado ao lado. Quando não há conteúdo real (fotografia licenciada)
para descrever, `alt=""` é o correto — o texto visível ao lado (título,
legenda, ano) já carrega a informação.
**How to apply:** antes de escrever `alt`/`imageAlt` para qualquer imagem
gerada/placeholder neste projeto (ou projeto similar com imagens de origem
própria substituindo fotografia real), perguntar "essa imagem realmente
mostra o que o alt afirma?" — se não, `alt=""`, nunca uma descrição da
intenção. Ver [[project-perf-reveal-group-pattern]] para o padrão irmão de
"não afirmar no HTML algo que não é verdade" (lá é sobre opacidade/estado
inicial, aqui é sobre conteúdo de imagem).

## JSON-LD: fansite não pode "encarnar" a entidade oficial (QA N6)

Publicar um nó `SportsTeam` (ou qualquer `@type` que represente a entidade
real) com `url` apontando para o **próprio domínio do fansite** + `sameAs`
apontando para os canais oficiais do clube faz motores de busca / crawlers
estruturados lerem "este domínio é o clube oficial" — contradizendo qualquer
disclaimer humano de não-oficialidade em HTML visível (que o axe-core/crawler
de dados estruturados não cruza automaticamente).

**Fix aplicado:** modelar o site como `WebSite` (com `url` = domínio próprio,
`name`, `description`) e aninhar a entidade real dentro de `about`, sem `url`
própria nela — só `sameAs` apontando para os canais oficiais:

```js
const sportsTeamJsonLd = { "@type": "SportsTeam", name, sameAs: [...] }; // sem url
const webSiteJsonLd = { "@context": "...", "@type": "WebSite", url: siteUrl, about: sportsTeamJsonLd };
```

**Why:** `url` é uma afirmação de posse/identidade; `sameAs` é só uma
referência cruzada. Um fansite pode legitimamente referenciar (`sameAs`) o
clube real sem afirmar (`url`) ser o clube.
**How to apply:** em qualquer site de torcedor/fã-site com JSON-LD sobre uma
entidade real de terceiros, nunca dar `url` própria ao nó que representa a
entidade — só ao nó que representa o próprio site (`WebSite`/`CreativeWork`),
com a entidade real referenciada via `about`/`mainEntity`, carregando apenas
`sameAs`.
