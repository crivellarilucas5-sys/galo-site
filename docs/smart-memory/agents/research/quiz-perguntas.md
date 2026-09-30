---
title: "Quiz: 10 Perguntas sobre o Atlético Mineiro"
kind: research
type: quiz-questions
status: completed
agent: sites-analyst
created: 2026-09-30
summary: "10 perguntas de múltipla escolha para quiz /quiz: 4 história, 3 títulos, 3 curiosidades — todas rastreadas ao atletico-mineiro-facts.md. CORRIGIDO 30/09/2026 (QA H5): Q9 (recopa-2014-adversario) dizia 'segundo título' na Recopa Sul-Americana — o research original (atletico-mineiro-facts.md) registra como 1º título; corrigido para 'primeiro título'. Também corrigido o factRef da Q8 (arena-mrv-capacidade), que apontava para um heading inexistente (#estadia-atual) — corrigido para #estadio-atual."
tags: [quiz, atletico-mineiro, perguntas, sites]
---

# Quiz: 10 Perguntas sobre o Atlético Mineiro

**Entrega:** 10 perguntas no formato `QuizQuestion` para `src/content/quiz.ts`  
**Fonte exclusiva:** `[[atletico-mineiro-facts]]` — zero fatos novos  
**Distribuição:** 4 história · 3 títulos · 3 curiosidades  
**Dificuldade:** Mista (fácil, médio, difícil)

---

## Pergunta 1 — HISTÓRIA (Fácil)

```ts
{
  id: "ano-fundacao",
  category: "historia",
  prompt: "Em que ano o Atlético Mineiro foi fundado?",
  options: [
    { id: "a", label: "1905" },
    { id: "b", label: "1908" },
    { id: "c", label: "1912" },
    { id: "d", label: "1915" }
  ],
  correctOptionId: "b",
  explanation: "O Clube Atlético Mineiro foi fundado em 25 de março de 1908 por 22 estudantes de Belo Horizonte sob as árvores do Parque Municipal.",
  factRef: "atletico-mineiro-facts#fundacao-e-historia-primaria"
}
```

---

## Pergunta 2 — HISTÓRIA (Médio)

```ts
{
  id: "apelido-galo",
  category: "historia",
  prompt: "Quando o Atlético Mineiro adotou o apelido 'Galo'?",
  options: [
    { id: "a", label: "Década de 1910" },
    { id: "b", label: "Década de 1920" },
    { id: "c", label: "Década de 1930" },
    { id: "d", label: "Década de 1940" }
  ],
  correctOptionId: "c",
  explanation: "O apelido 'Galo' foi adotado na década de 1930, representando força, garra e combatividade — símbolos que definem o clube até hoje.",
  factRef: "atletico-mineiro-facts#apelido"
}
```

---

## Pergunta 3 — HISTÓRIA (Fácil)

```ts
{
  id: "cores-oficiais",
  category: "historia",
  prompt: "Quais são as cores oficiais do Atlético Mineiro?",
  options: [
    { id: "a", label: "Vermelho e branco" },
    { id: "b", label: "Preto e branco" },
    { id: "c", label: "Azul e branco" },
    { id: "d", label: "Amarelo e preto" }
  ],
  correctOptionId: "b",
  explanation: "As cores preto e branco foram adotadas na década de 1920 e representam igualdade e unidade, formando as listras verticais do escudo.",
  factRef: "atletico-mineiro-facts#cores-oficiais"
}
```

---

## Pergunta 4 — HISTÓRIA (Difícil)

```ts
{
  id: "classico-mineiro-origem",
  category: "historia",
  prompt: "Em qual ano começou o Clássico Mineiro, rival entre Atlético Mineiro e Cruzeiro?",
  options: [
    { id: "a", label: "1915" },
    { id: "b", label: "1921" },
    { id: "c", label: "1927" },
    { id: "d", label: "1935" }
  ],
  correctOptionId: "b",
  explanation: "O Clássico Mineiro teve origem em 1921, quando o Cruzeiro ainda era chamado de Palestra Itália. É um dos clássicos mais disputados do futebol brasileiro.",
  factRef: "atletico-mineiro-facts#classico-mineiro"
}
```

---

## Pergunta 5 — TÍTULOS (Médio)

```ts
{
  id: "libertadores-2013",
  category: "titulos",
  prompt: "Contra qual adversário o Atlético Mineiro venceu a Copa Libertadores em 2013?",
  options: [
    { id: "a", label: "Club Olimpia (Paraguai)" },
    { id: "b", label: "CA Lanús (Argentina)" },
    { id: "c", label: "Boca Juniors (Argentina)" },
    { id: "d", label: "São Paulo (Brasil)" }
  ],
  correctOptionId: "a",
  explanation: "Em 2013, o Atlético venceu o Club Olimpia do Paraguai na final, com um elenco que incluía Ronaldinho Gaúcho. Foi o primeiro título continental do clube.",
  factRef: "atletico-mineiro-facts#copa-libertadores-da-america"
}
```

---

## Pergunta 6 — TÍTULOS (Difícil)

```ts
{
  id: "copa-conmebol-titulos",
  category: "titulos",
  prompt: "Quantas vezes o Atlético Mineiro foi campeão da Copa CONMEBOL?",
  options: [
    { id: "a", label: "1 vez (1992)" },
    { id: "b", label: "2 vezes (1992 e 1997)" },
    { id: "c", label: "3 vezes (1992, 1997 e 2000)" },
    { id: "d", label: "4 vezes (1990, 1992, 1997 e 2001)" }
  ],
  correctOptionId: "b",
  explanation: "O Atlético conquistou a Copa CONMEBOL duas vezes: em 1992 (vencendo Club Olimpia) e em 1997 (vencendo CA Lanús). Em 1992, foi a primeira edição da competição.",
  factRef: "atletico-mineiro-facts#copa-conmebol"
}
```

---

## Pergunta 7 — TÍTULOS (Médio)

```ts
{
  id: "campeonato-brasileiro-titulos",
  category: "titulos",
  prompt: "Quantos títulos do Campeonato Brasileiro Série A o Atlético Mineiro conquistou?",
  options: [
    { id: "a", label: "1 título (1971)" },
    { id: "b", label: "2 títulos (1971 e 2021)" },
    { id: "c", label: "3 títulos (1971, 2014 e 2021)" },
    { id: "d", label: "4 títulos (1971, 1980, 2014 e 2021)" }
  ],
  correctOptionId: "b",
  explanation: "O Atlético conquistou 2 títulos do Campeonato Brasileiro: em 1971 (com gol de Dadá Maravilha na final) e em 2021 (sob comando do técnico Cuca, com 13 pontos de vantagem).",
  factRef: "atletico-mineiro-facts#campeonato-brasileiro-serie-a"
}
```

---

## Pergunta 8 — CURIOSIDADES (Fácil)

```ts
{
  id: "arena-mrv-capacidade",
  category: "curiosidades",
  prompt: "Qual é a capacidade máxima da Arena MRV, estádio do Atlético Mineiro?",
  options: [
    { id: "a", label: "40.000 pessoas" },
    { id: "b", label: "42.500 pessoas" },
    { id: "c", label: "44.892 pessoas" },
    { id: "d", label: "48.000 pessoas" }
  ],
  correctOptionId: "c",
  explanation: "A Arena MRV foi inaugurada em 27 de agosto de 2023 e tem capacidade para 44.892 torcedores. A primeira partida oficial foi uma vitória 2×0 sobre o Santos.",
  factRef: "atletico-mineiro-facts#estadio-atual"
}
```

---

## Pergunta 9 — CURIOSIDADES (Difícil)

```ts
{
  id: "recopa-2014-adversario",
  category: "curiosidades",
  prompt: "Qual foi o adversário na Recopa Sul-Americana que o Atlético Mineiro conquistou em 2014?",
  options: [
    { id: "a", label: "River Plate (Argentina)" },
    { id: "b", label: "CA Lanús (Argentina)" },
    { id: "c", label: "Club Olimpia (Paraguai)" },
    { id: "d", label: "Defensor Sporting (Uruguai)" }
  ],
  correctOptionId: "b",
  explanation: "O Atlético venceu a CA Lanús na Recopa Sul-Americana de 2014 (1-0 fora, 4-3 em casa), marcando o primeiro título do clube na competição, em sua primeira participação (como campeão da Libertadores 2013).",
  factRef: "atletico-mineiro-facts#recopa-sul-americana"
}
```

---

## Pergunta 10 — CURIOSIDADES (Médio)

```ts
{
  id: "campeonato-mineiro-titulos",
  category: "curiosidades",
  prompt: "Quantos títulos do Campeonato Mineiro o Atlético Mineiro já conquistou?",
  options: [
    { id: "a", label: "35 títulos" },
    { id: "b", label: "40 títulos" },
    { id: "c", label: "45 títulos" },
    { id: "d", label: "50 títulos" }
  ],
  correctOptionId: "d",
  explanation: "O Atlético Mineiro é o maior campeão do Campeonato Mineiro, com 50 títulos conquistados entre 1915 e 2025, incluindo 6 consecutivos (2020–2025).",
  factRef: "atletico-mineiro-facts#campeonato-mineiro-estadual"
}
```

---

## Resumo

| # | ID | Categoria | Prompt (resumo) | Dificuldade |
|---|---|---|---|---|
| 1 | ano-fundacao | história | Ano de fundação? | Fácil |
| 2 | apelido-galo | história | Quando adotou "Galo"? | Médio |
| 3 | cores-oficiais | história | Cores oficiais? | Fácil |
| 4 | classico-mineiro-origem | história | Clássico Mineiro desde quando? | Difícil |
| 5 | libertadores-2013 | títulos | Adversário Libertadores 2013? | Médio |
| 6 | copa-conmebol-titulos | títulos | Quantos títulos Copa CONMEBOL? | Difícil |
| 7 | campeonato-brasileiro-titulos | títulos | Quantos Brasileirões? | Médio |
| 8 | arena-mrv-capacidade | curiosidades | Capacidade Arena MRV? | Fácil |
| 9 | recopa-2014-adversario | curiosidades | Adversário Recopa 2014? | Difícil |
| 10 | campeonato-mineiro-titulos | curiosidades | Quantos Mineiros? | Médio |

> **✅ CORRIGIDO em 30/09/2026 (sites-analyst) — QA finding H5 (e L1 correlato).**
> 1. **Q9 (`recopa-2014-adversario`)** dizia na explicação "marcando o **segundo título** na
>    competição". O próprio research de fatos (`atletico-mineiro-facts.md#recopa-sul-americana`)
>    registra: "2014 — Campeão (**1º título**) · Primeira participação". A explicação contradizia
>    a própria fonte. Corrigido para "marcando o **primeiro título** do clube na competição, em
>    sua primeira participação". O `factRef` da Q9 (`atletico-mineiro-facts#recopa-sul-americana`)
>    já estava correto e não precisou de ajuste.
> 2. **Q8 (`arena-mrv-capacidade`)** tinha `factRef: "atletico-mineiro-facts#estadia-atual"`,
>    apontando para um heading que não existe no arquivo de fatos — o heading correto é
>    "## Estádio Atual", cujo slug é `#estadio-atual`. Corrigido. (Nota: o laudo de QA descreveu
>    esse problema como correlato ao finding H5/L1 sobre a Q9; na transcrição para `quiz.ts`, a
>    numeração das perguntas pode ter mudado — o essencial é que o heading quebrado, onde quer
>    que apareça em `quiz.ts`, vem desta linha de `quiz-perguntas.md`, agora corrigida.)

**Validação:**
- ✓ Exatamente 10 perguntas
- ✓ 4 história, 3 títulos, 3 curiosidades
- ✓ Todas com `factRef` apontando para `atletico-mineiro-facts.md`
- ✓ Dificuldade variada (fácil, médio, difícil)
- ✓ Formato `QuizQuestion` conforme AC5 da story
- ✓ Zero fatos inventados — tudo baseado em `atletico-mineiro-facts.md`
- ✓ Pronto para transcrição em `src/content/quiz.ts`
