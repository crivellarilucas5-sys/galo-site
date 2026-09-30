---
kind: spec
status: done
summary: "Design da página /quiz do Atlético Mineiro — tela de pergunta (opções em cards, feedback certo/errado texto+cor+ícone), indicador de progresso (barra + 'pergunta X de Y'), tela de resultado (pontuação celebrativa com estrelas + mensagem por faixa) e botão de reiniciar. Consumir junto com [[design-direction]] e [[components]]."
---

# Quiz do Atlético Mineiro — `/quiz`

Pré-requisito: ler [[design-direction]] (paleta, tipografia, tokens, contraste, motion) e [[components]] (padrões já estabelecidos de card, CTA, foco) antes de implementar. Este spec não redefine tokens — só aplica os já existentes a um fluxo novo.

Formato: múltipla escolha, ~8-10 perguntas, sem timer, uma tela de resultado final. Tom da direção visual se aplica aqui também: quiz de torcedor de tradição, não trivia genérico de app — usa o motivo de estrela e a paleta preto/branco/dourado já estabelecidos.

---

## 1. Tela de pergunta

**Propósito:** apresentar uma pergunta por vez, sem pressão de tempo, com feedback imediato e claro antes de avançar — reforça aprendizado sobre a história do clube, não é "acerte rápido".

**Estrutura (mobile e desktop, single column — o quiz nunca usa split-screen, foco total na pergunta atual):**

```
┌──────────────────────────────────────┐
│  Pergunta 3 de 10        [progresso] │  ← seção 2
│  ───────────────────────────────────│
│                                       │
│  Em que ano o Galo conquistou sua   │
│  primeira Libertadores?              │  ← --text-display-md, Oswald
│                                       │
│  ┌─────────────────────────────────┐│
│  │ ★ A) 2013                        ││  ← opção (card), ver estados
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ ★ B) 1971                        ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ ★ C) 2021                        ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ ★ D) 1989                        ││
│  └─────────────────────────────────┘│
│                                       │
│  [ Feedback aparece aqui após clique]│  ← seção 1.3
│                                       │
│               [Próxima pergunta →]   │  ← só habilita após resposta
└──────────────────────────────────────┘
```

### 1.1 Opções de resposta: cards, não botões simples

Decisão: **cards**, seguindo o mesmo padrão visual de "Cards de Títulos/Conquistas" já especificado em [[components]] (fundo `--color-bg-surface`, borda `--color-border`, hover eleva + borda dourada) — não botões de texto puro. Justificativa de usabilidade:

- Área de toque maior e mais previsível em mobile (todo o card é clicável, não só o texto) — reduz erro de toque, que é a maior fonte de fricção em quizzes em telefone.
- Reaproveita um padrão visual que o usuário já reconhece de outras páginas do site (consistência reduz carga cognitiva).
- Marcador de letra (A/B/C/D) some a ambiguidade de "qual eu cliquei" quando o usuário revisita a pergunta visualmente antes de decidir — não é feedback, é rótulo estrutural (ver A11y).

Cada card de opção usa a estrela (`★`, motivo gráfico da seção 7 de [[design-direction]]) como marcador antes da letra — mesmo papel funcional de "marcador de item em lista", já validado nos Cards de Títulos.

**Grid de opções:** 1 coluna sempre (mobile e desktop) — nunca 2x2. Justificativa: leitura sequencial A→B→C→D é mais previsível para navegação por teclado e leitor de tela do que grid 2D, e o quiz não tem pressão de tempo que justifique otimizar por densidade horizontal.

### 1.2 Indicação visual da opção selecionada

Estado intermediário entre "nenhuma opção marcada" e "feedback revelado" — existe porque o quiz não tem botão de "confirmar" separado do próprio card (clicar no card já responde e revela feedback imediatamente; ver 1.3). Ainda assim, durante a transição (ex. usuário usando teclado e navegando entre opções com Tab antes de pressionar Enter/Space), a opção com foco deve ser visualmente distinguível do resto:

- Opção com foco de teclado (ainda não respondida): anel de foco padrão (`--color-focus-ring`, 2px, offset 2px) — igual ao resto do site, nunca um estilo de foco customizado só para o quiz.
- Opção com hover (mouse, ainda não respondida): borda muda de `--color-border` para `--color-accent` a 40% de opacidade + `translateY(-2px)`, 150-200ms ease — mesmo padrão dos Cards de Títulos.
- Ao clicar/selecionar (Enter/Space ou clique): a resposta é imediatamente travada (ver 1.3) — não existe estado "selecionado mas não confirmado" clicável; isso elimina uma etapa de fricção (clicar 2x) sem timer que a justifique.

### 1.3 Feedback de certo/errado — nunca só cor

Regra herdada da seção 4 de [[design-direction]] (contraste/a11y) aplicada aqui de forma explícita: toda indicação de certo/errado combina **cor + ícone + texto**, nunca cor isolada (usuário com daltonismo ou leitor de tela precisa dos outros dois canais).

Ao clicar em uma opção, todas as 4 opções mudam de estado simultaneamente (não só a clicada) — assim o usuário vê onde estava a resposta certa mesmo se errou:

| Opção | Estado visual | Ícone | Texto |
|---|---|---|---|
| A correta (clicada ou não) | borda `--color-accent` 2px + fundo `--color-bg-surface` levemente clareado (`#1A1A1A`) | `✓` check, antes da estrela, cor `--color-accent` | — (o texto da própria opção já é suficiente, reforçado pela mensagem abaixo do grid) |
| A clicada, se errada | borda em tom de erro (ver token novo abaixo) | `✗` cross, mesma cor | — |
| Demais opções (não clicadas, incorretas) | opacidade reduzida a 60%, borda `--color-border` sem mudança | nenhum ícone extra | — |

**Novo token necessário (não existia em [[design-direction]], pois o site institucional não tinha fluxo de erro binário):**

| Token | Hex | Uso | Validação de contraste |
|---|---|---|---|
| `--color-error` | `#D64545` | borda/ícone de resposta incorreta selecionada, sobre `--color-bg-surface` (`#141414`) | `✗` ícone ≥24px conta como "graphic", contraste do vermelho sobre `#141414` ≈ 4.7:1, ok para elemento não-texto (mín. 3:1) |
| `--color-error-bg` | `#2A1414` | fundo sutil por trás do card errado clicado, reforça o estado sem depender só da borda | uso decorativo, não precisa contraste de texto |

Abaixo do grid de opções, uma faixa de mensagem de feedback (`--text-body-lg`, aparece com fade 150ms, respeitando `prefers-reduced-motion`):

- Acertou: `✓ Certo! [dado curto de contexto sobre a resposta]` — ex. "✓ Certo! O Galo ergueu a Libertadores em 2013, em Raposa... digo, em pleno Mineirão." Texto em `--color-fg-primary`, ícone check em `--color-accent`.
- Errou: `✗ Essa não foi. A resposta certa é [X].` — texto em `--color-fg-primary` (nunca vermelho no texto de corpo, só no ícone/borda do card, mesma regra de "acento nunca em texto de corpo" já vale por analogia para o vermelho de erro), ícone cross em `--color-error`.

O botão "Próxima pergunta →" só fica habilitado (visualmente: de opacidade 50%/`disabled` para opacidade 100%/clicável) depois que o feedback é revelado — reforça que não há como "pular sem ver a resposta".

**Acessibilidade da tela de pergunta:**
- Pergunta como `<h2>` (a página tem um único `<h1>` — título "Quiz Atlético Mineiro" — fora do loop de perguntas, ver estrutura de topo).
- Opções como `<fieldset>`/`<legend>` (legend = a própria pergunta, associada visualmente) contendo `role="radiogroup"` semântico via inputs de rádio estilizados como cards, ou lista de botões (`<button>` dentro de `<ul>`) com `aria-pressed` — usar a alternativa de `<button>` + `aria-pressed="true|false"` é mais simples de estilizar como card e mantém navegação por Tab natural; ambas soluções são aceitáveis, mas fica registrado que `role="radiogroup"` com inputs nativos é a opção com menos JS de acessibilidade a reconstruir manualmente. Decisão de implementação fica com o dev, mas o requisito funcional é: teclado navega entre as 4 opções com Tab ou setas, Enter/Space seleciona.
- Após a resposta ser travada, cada opção ganha `aria-disabled="true"` (exceto para leitura, que continua acessível) e o container de feedback tem `aria-live="polite"` para que o leitor de tela anuncie automaticamente "Certo!"/"Errado, a resposta certa é X" sem precisar de foco manual.
- Foco move automaticamente para o botão "Próxima pergunta" quando ele é habilitado? Não — mover foco automaticamente sem ação do usuário é uma armadilha de foco desnecessária aqui (usuário pode ainda querer ler o texto de feedback). Foco permanece na opção clicada; o `aria-live` já garante que o feedback é lido.

---

## 2. Indicador de progresso

**Propósito:** reduzir ansiedade de "quanto falta" em um quiz sem timer — a única fricção possível aqui é o usuário não saber se está perto do fim e abandonar.

**Estrutura (topo da tela de pergunta, acima da pergunta em si):**

```
Pergunta 3 de 10
▓▓▓▓▓▓░░░░░░░░░░░░░░  (barra de progresso, 30% preenchida)
```

- Texto "`Pergunta {n} de {total}`" em `--text-caption` (uppercase, tracking +0.05em, `--color-fg-muted`) — mesmo estilo de rótulo pequeno já usado em outras seções do site (ex. eyebrow da Hero).
- Barra de progresso abaixo do texto, altura `4px`, cantos arredondados (`border-radius: 2px`):
  - Trilho (parte não preenchida): `--color-border`.
  - Preenchimento: `--color-accent` — único uso de dourado como área sólida grande (não texto, então não viola a regra de contraste de corpo; é um elemento gráfico puro, análogo ao uso em ícones/badges já permitido).
  - Transição de largura ao avançar pergunta: `width` anima 300ms ease-out (não instantâneo — reforça sensação de progresso "conquistado").
- Nunca usar apenas a barra sem o texto numérico — usuários que não conseguem estimar proporção visual (ou usando leitor de tela) precisam do número explícito. Mesma lógica de "nunca só cor/posição" aplicada aqui a "nunca só barra visual".

**Acessibilidade:**
- Barra de progresso como `<div role="progressbar" aria-valuenow="{n}" aria-valuemin="1" aria-valuemax="{total}" aria-label="Pergunta {n} de {total}">` — o texto visível acima é redundante para usuários videntes mas o `aria-label` garante que leitor de tela anuncie o mesmo dado mesmo se só encontrar a barra.
- Atualização de progresso não precisa de `aria-live` própria — o `<h2>` da nova pergunta já muda o contexto lido ao focar/navegar.

---

## 3. Tela de resultado final

**Propósito:** fechar o quiz com uma sensação de celebração proporcional ao clube (mesmo quem tira pontuação baixa deve sair sentindo que é "torcedor de coração", nunca "reprovado") — coerente com o tom de paixão de torcida, não é uma prova escolar.

**Estrutura:**

```
┌──────────────────────────────────────┐
│                                       │
│            ★ ★ ★ ★ ★                │  ← estrelas de resultado, seção 3.1
│                                       │
│               7 / 10                 │  ← número grande, --text-display-xl
│                                       │
│      "Raça de Galo até o fim!"       │  ← título curto da faixa, Oswald
│                                       │
│  Você conhece muito bem a história   │  ← corpo, --text-body-lg,
│  do Galo — só faltou lembrar de      │     --fg-muted, 1-2 frases
│  um ou dois detalhes de arquibancada.│
│                                       │
│         [ Refazer o quiz ]           │  ← seção 4
│                                       │
└──────────────────────────────────────┘
```

### 3.1 Pontuação celebrativa: estrelas + número grande

Reaproveita o motivo gráfico de estrela já estabelecido (marcador de conquistas) em novo papel: **indicador de faixa de desempenho**, não contagem literal de acertos (a contagem literal já é o "7/10" abaixo). 5 estrelas fixas, preenchimento proporcional à faixa de acerto (não ao número exato de perguntas, para não depender de ajustar o componente se o total de perguntas mudar):

| Faixa de acerto | Estrelas preenchidas | Cor do preenchimento |
|---|---|---|
| 90-100% | 5 de 5 | `--color-accent`, cheias |
| 70-89% | 4 de 5 | `--color-accent` |
| 50-69% | 3 de 5 | `--color-accent` |
| 30-49% | 2 de 5 | `--color-accent` |
| 0-29% | 1 de 5 | `--color-accent` |

Estrelas vazias (não preenchidas) usam apenas contorno em `--color-border` — nunca ficam invisíveis, para que o usuário veja "quantas faltaram" como parte do elemento gráfico, sem competir com o dourado de conquista real.

**Número grande:** "{acertos} / {total}" em `--text-display-xl` (Oswald, não Playfair — é um placar/número, papel que a seção 3 de [[design-direction]] já reserva a Oswald), cor `--color-fg-primary`, centralizado, imediatamente abaixo das estrelas.

**Animação de entrada da tela de resultado:** estrelas aparecem em sequência (stagger 80ms entre cada uma, fade+scale de 0.8→1), depois o número faz count-up de 0 até o valor final em ~600ms (`ease-out`), depois título de faixa e mensagem entram com fade+translateY padrão (seção 5 de [[design-direction]]). Com `prefers-reduced-motion: reduce`: tudo aparece direto no valor final, sem count-up nem stagger (apenas opacity fade 150ms no conjunto).

### 3.2 Mensagem por faixa de acerto — onde encaixa

Dois elementos de texto, nessa ordem, imediatamente abaixo do número:

1. **Título curto da faixa** (`--text-display-md`, Oswald uppercase) — frase de torcedor, nunca "nota"/"conceito" escolar. Exemplos por faixa (tom sempre positivo, mesmo nas faixas baixas — ninguém "reprova" em ser torcedor):
   - 90-100%: "Sócio-torcedor de carteirinha!"
   - 70-89%: "Raça de Galo até o fim!"
   - 50-69%: "Torcedor de arquibancada!"
   - 30-49%: "Curioso, mas com fé no Galo!"
   - 0-29%: "Bem-vindo à Massa — agora é hora de aprender!"
2. **Mensagem de apoio** (`--text-body-lg`, `--color-fg-muted`, 1-2 frases) — reforça o resultado com contexto, nunca tom de repreensão. Ex. para faixa baixa: "Todo torcedor começa em algum lugar. Dá uma olhada na nossa Timeline de História e tenta de novo!" — pode incluir link textual (sublinhado dourado, mesmo padrão de link do site) para a seção de Timeline de História, transformando a faixa mais baixa em convite de exploração do site, não só um resultado seco.

Hierarquia visual: estrelas (maior peso visual) → número (segundo maior) → título da faixa (terceiro) → mensagem de apoio (menor, mais longa). Segue o mesmo princípio de "resultado visual antes do texto explicativo" usado em qualquer tela de celebração — usuário processa "fui bem ou mal" antes de ler o porquê.

**Acessibilidade:**
- Toda a tela de resultado é anunciada de uma vez via `aria-live="polite"` num container que recebe foco programático ao ser montada (transição de "última pergunta respondida" → "tela de resultado" é uma troca de tela inteira, diferente do feedback pergunta-a-pergunta — aqui mover foco é apropriado porque é uma tela nova, não uma atualização de estado dentro da mesma tela).
- As 5 estrelas de resultado são decorativas/redundantes em relação ao número — `aria-hidden="true"` no conjunto de estrelas, o número "{acertos} / {total}" e o título de faixa já carregam a informação em texto.
- Título de faixa como `<h2>` da tela de resultado (view própria, com seu próprio heading — a tela de resultado substitui a tela de pergunta, não empilha).

---

## 4. Botão de reiniciar o quiz

**Propósito:** permitir tentar de novo sem fricção — parte do tom "convite a aprender mais", não só uma ação técnica de reset.

**Posição:** único CTA da tela de resultado, centralizado, abaixo da mensagem de apoio (ver estrutura da seção 3).

**Rótulo:** "Refazer o quiz" (nunca "Reiniciar" seco ou "Tentar novamente" — tom de convite, consistente com o resto do copy do site).

**Estilo:** CTA primário, mesmo padrão já definido para CTA primário da Hero em [[components]] — fundo `--color-accent`, texto `--color-bg-primary` (contraste 8.8:1), hover `--color-accent-hover` + `scale(1.02)`, 150ms. Não introduz um novo estilo de botão; reaproveita o existente.

**Comportamento:**
- Ao clicar: reseta estado do quiz (pergunta atual → 1, todas as respostas limpas, pontuação zerada) e retorna para a tela de pergunta 1 de N — nunca recarrega a página inteira (mantém a sensação de app fluido, sem flash branco).
- Ordem das perguntas: pode ser re-embaralhada a cada "Refazer" (opcional, mas recomendado — evita que o usuário apenas memorize a sequência de cliques ao tentar de novo; é uma escolha de produto, não bloqueante de a11y).
- Foco move para o `<h2>`/heading da pergunta 1 após reset, mesma lógica de troca de tela da seção 3.

**Acessibilidade:**
- Botão único, sem necessidade de confirmação adicional ("tem certeza?") — reiniciar um quiz é uma ação de baixo custo/reversível, confirmação extra seria fricção desnecessária.
- Foco visível padrão (`--color-focus-ring`), igual a todo outro elemento interativo do site.

---

## Checklist de consistência com o restante do site

- Cards de opção reaproveitam exatamente o padrão visual dos Cards de Títulos/Conquistas ([[components]]) — nenhum componente novo de "card" foi inventado.
- CTA "Refazer o quiz" reaproveita o padrão de CTA primário já existente.
- Barra de progresso introduz o único uso de `--color-accent` como área sólida grande — decisão justificada (elemento gráfico não-textual, seção 2 acima) e não abre precedente para usar dourado como fundo de texto em nenhum outro lugar.
- `--color-error`/`--color-error-bg` são os únicos tokens novos deste spec — necessários porque o site institucional não tinha fluxo de erro binário antes do quiz; seguem a mesma regra de nunca aparecer como cor de texto de corpo, só ícone/borda/fundo sutil.
- Toda animação de entrada (perguntas, resultado) respeita `prefers-reduced-motion: reduce`, mesma regra da seção 5 de [[design-direction]].
- Foco visível e `aria-live` em todas as trocas de estado assíncronas (feedback de resposta, troca pergunta→resultado, reset) — nenhuma tela muda de conteúdo sem que um leitor de tela seja avisado.
