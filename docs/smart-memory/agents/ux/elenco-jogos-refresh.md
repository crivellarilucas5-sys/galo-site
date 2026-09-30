---
kind: spec
status: ready-for-dev
summary: "Refresh visual das seções de Elenco (squad-grid) e Jogos (next-match) para dados reais de jogadores + direção de foto real da Arena MRV substituindo o placeholder. Complementa [[design-direction]] e [[components]] — não redefine tokens."
---

# Refresh — Elenco, Jogos e Foto da Arena MRV

Pré-requisito: ler [[design-direction]] (tokens/paleta/tipografia/motion) e [[components]] (specs já entregues). Este arquivo cobre três componentes ainda não documentados em `components.md`: card de jogador (`squad-grid.tsx`), seção de próximo jogo/resultados (`next-match.tsx`) e a foto real da Arena MRV.

Contexto de negócio (confirmado com o usuário): elenco passa a ter nome/posição/número **reais**, mas mantém avatar/silhueta genérico por decisão de direito de imagem — não é mais "ilustrativo", é real, só sem foto. A Arena MRV ganha foto real (licença livre) no lugar do placeholder gerado (listras+estrela).

---

## 1. Card de Jogador — `squad-grid.tsx`

### Problema do card atual

Hoje o card é: silhueta genérica idêntica em todos os 20 jogadores + nome + `#número · posição` em texto pequeno. Com nomes/números reais chegando, o card vai parecer ainda mais "vazio" — a foto deixou de ser um placeholder temporário de dado fictício e passa a ser uma ausência permanente e deliberada ao lado de dados reais. Sem tratamento, o grid vira 20 cards visualmente idênticos diferenciados só por uma legenda pequena — baixa escaneabilidade, nenhuma personalidade.

### Direção: o card não tenta esconder a ausência de foto — assume-a como escolha gráfica

Em vez de compensar o "espaço vazio" ao redor da silhueta, o card usa **cor de fundo por posição** + **número da camisa como elemento tipográfico grande** para dar identidade visual própria a cada jogador, com ou sem foto. A silhueta deixa de ser o único elemento visual do card e passa a ser um elemento *entre* outros dois.

**Estrutura do card (proporção 3:4, não mais quadrado puro — dá mais espaço vertical para o bloco de número/nome):**

```
┌─────────────────────────┐
│ 9                       │  ← número gigante, canto sup. esquerdo,
│                         │     cor de fundo por posição (ver tabela),
│        ░░░░░░░          │     watermark translúcido por trás da silhueta
│       ░ SILH. ░          │
│        ░░░░░░░          │  ← silhueta genérica, centrada, menor que
│                         │     hoje (~55% da largura do card, não
│                         │     preenche mais o card inteiro)
├─────────────────────────┤
│ PAULINHO VIEIRA         │  ← nome, Oswald uppercase, --text-display-md
│ ▲ Ataque                │  ← ícone de posição + label, --text-caption
└─────────────────────────┘
```

**Cor de fundo do bloco superior por posição** (fundo colorido só nessa área, não usar o acento dourado como fundo grande — regra 1 de contraste em [[design-direction]] proíbe dourado como área extensa atrás de texto claro; aqui usamos variações de cinza/preto do próprio sistema, não cores novas fora da paleta):

| Posição | Fundo do bloco superior | Número/ícone |
|---|---|---|
| Goleiro | `--color-bg-surface` (`#141414`) + padrão de linhas diagonais sutis (`opacity 0.06`) | `--color-fg-primary` (branco) |
| Defesa | `--color-bg-primary` (`#0A0A0A`) sólido | `--color-fg-primary` (branco) |
| Meio-campo | `--color-bg-surface` (`#141414`) sólido | `--color-accent` (dourado) — aceitável aqui porque o número é elemento gráfico grande (≥24px, regra 1 de [[design-direction]] permite acento em "ícones grandes/gráficos", não é texto de corpo |
| Ataque | `--color-bg-primary` (`#0A0A0A`) + borda inferior 3px `--color-accent` | `--color-fg-primary` (branco) |

Diferenciação deliberadamente sutil (tons do mesmo preto/cinza + um único acento no número de meio-campo) — mantém a paleta oficial preto/branco/dourado sem introduzir cores "de posição" arbitrárias (vermelho/azul/verde), que romperiam a direção editorial do clube.

**Número da camisa como elemento gráfico:**
- Tipografia Oswald, peso 700, tamanho `clamp(2.5rem, 8vw, 3.5rem)` — grande o suficiente para funcionar como elemento gráfico, não como legenda.
- Posicionado absoluto no canto superior esquerdo do bloco de imagem, com leve `text-shadow` ou opacidade reduzida (`opacity: 0.9`) para não competir com a silhueta.
- Se `player.number` for `undefined` (caso raro, jogador sem número definido), o bloco de número não aparece — nunca renderizar "—" ou "#0" como substituto falso.

**Ícone de posição** (ao lado do label de posição, abaixo do nome) — reforça a categorização mesmo para quem não decorou a paleta de cores por posição:
- Goleiro: ícone de luvas ou escudo (`lucide-react` tem `Hand` ou usar `ShieldCheck` já importado em outro componente do projeto).
- Defesa: `Shield`.
- Meio-campo: `RefreshCw` (ligação entre defesa e ataque) ou `GitBranch`.
- Ataque: `Target` ou `Zap`.
- Ícone em `size-4`, `aria-hidden="true"` (decorativo, o texto do label já carrega a informação) — mesmo padrão de `next-match.tsx` (`Calendar`/`MapPin`/`ShieldCheck` com `aria-hidden`).

**Silhueta:**
- Reduzir de `fill`/cover total para um container menor centrado no bloco superior (~55-60% da largura do card, altura proporcional), com o fundo colorido da posição visível ao redor — isso é o que resolve a sensação de "espaço vazio": o espaço vazio passa a ser fundo intencional, não ausência.
- Manter `alt=""` (decorativa) conforme já documentado no código (AC3 da story 1.8) — a silhueta é idêntica para todos e não carrega informação que nome/posição/número já não carreguem em texto.

**Bloco inferior (nome + posição):**
- Nome em Oswald uppercase, `--text-display-md` (1.25rem mobile / 1.5rem desktop), `truncate` mantido para nomes longos.
- Posição com ícone: `<span class="flex items-center gap-1.5"><Icon aria-hidden /> {positionLabel}</span>`, `--text-caption`.
- Fundo do bloco inferior: `--color-bg-surface` constante (não varia por posição) — só o bloco de imagem varia, para manter consistência de leitura do texto (contraste sempre igual, independente da posição).

**Grid:** mantém `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`, `gap-4`/`gap-6` — não muda, já funciona bem.

**Filtro por posição (recomendado, não obrigatório para este ciclo):** como a cor de fundo por posição já existe visualmente, considerar tabs de filtro (Todos / Goleiros / Defesa / Meio / Ataque) no topo do grid, mesmo padrão ARIA `tablist`/`tab`/`tabpanel` já especificado para Cards de Títulos em [[components]]. Isso vira mais relevante quando o elenco real tiver volume maior que os 20 jogadores ilustrativos atuais.

**Acessibilidade (adicional ao que já existe):**
- Número grande é puramente visual/decorativo quando já existe o texto `#{número}` seria redundante — mas como o `#{número}` no bloco inferior foi REMOVIDO do texto pequeno (substituído pelo número grande), o número grande precisa ser acessível: envolver em elemento com texto, não `aria-hidden`. Ex.: `<span aria-hidden="true">{number}</span>` no elemento gráfico grande + manter o número também no texto de posição (`aria-label` ou texto visível pequeno) para não depender só do elemento gráfico para essa informação. Mais simples: manter `#{number}` como texto pequeno de apoio dentro do bloco inferior também (não remover, só não repetir do mesmo tamanho) — evita regressão de acessibilidade.
- Ícone de posição: `aria-hidden="true"`, o label textual ao lado já é o conteúdo acessível.
- Contraste do número dourado (meio-campo) sobre `--color-bg-surface` (`#141414`): validar ≥3:1 como elemento gráfico grande — dourado `#C9A227` sobre `#141414` passa ~5.8:1, ok mesmo como texto se necessário.

**Props (sem mudança de shape, `Player` já suporta):** nenhuma alteração necessária em `types/content.ts` — o número e a posição já existem no tipo `Player`.

---

## 2. Seção "Próximo Jogo" — `next-match.tsx`

### Problema da seção atual

Card único e isolado: só o próximo jogo, sem contexto de forma recente do time. Visualmente correto (segue a spec de Hero/Card padrão, contraste ok), mas informacionalmente pobre — um torcedor olha a seção e não tem ideia se o time vem de vitória ou derrota, nem o que vem depois do próximo jogo.

### Direção: expandir para "Jogos" com três blocos — Resultados recentes + Próximo jogo (destaque) + Jogos seguintes

Recomendo tratar isso como upgrade de seção, não só de card. Nova estrutura:

```
┌────────────────────────────────────────────────────────────┐
│  JOGOS                                          (título H2) │
│                                                                │
│  ÚLTIMOS RESULTADOS                     PRÓXIMO JOGO          │
│  ┌────┐ ┌────┐ ┌────┐                  ┌──────────────────┐  │
│  │ V  │ │ D  │ │ V  │                  │  Galo × Cruzeiro  │  │
│  │2×0 │ │0×1 │ │3×1 │                  │  [data/hora/local]│  │
│  └────┘ └────┘ └────┘                  │  [destaque maior] │  │
│                                          └──────────────────┘  │
│                                                                │
│  EM SEGUIDA                                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                      │
│  │ vs X, dd/mm│ vs Y, dd/mm│ vs Z, dd/mm│                      │
│  └──────────┘ └──────────┘ └──────────┘                      │
└────────────────────────────────────────────────────────────┘
```

**Layout responsivo:**
- Mobile (<768px): três blocos empilhados verticalmente na ordem Próximo jogo (destaque, primeiro — é a informação mais importante) → Últimos resultados (scroll horizontal de chips) → Em seguida (scroll horizontal de mini-cards).
- Desktop (≥1024px): grid de duas colunas — coluna esquerda menor com "Últimos resultados" (chips em coluna ou linha) empilhada sobre "Em seguida" (mini-cards em linha), coluna direita maior com o card de "Próximo jogo" em destaque (mantém o Card atual, só ajustando largura).

**Bloco "Últimos resultados" (novo):**
- Lista de 3-5 chips compactos, cada um: resultado (V/E/D com cor — ver abaixo), placar, abreviação do adversário.
- Cor do indicador V/E/D: **não usar verde/amarelo/vermelho semáforo genérico** (quebraria a paleta oficial) — usar `--color-accent` (dourado) para vitória, `--color-fg-muted`/borda neutra para empate, e para derrota usar o próprio preto/branco com um ícone (ex. seta para baixo) em vez de cor vermelha — mantém a disciplina de paleta e ainda comunica resultado via forma (não só cor, importante para acessibilidade/daltonismo também).
  - Vitória: chip com borda `--color-accent`, ícone check ou seta para cima.
  - Empate: chip com borda `--color-border`, ícone "=" ou traço.
  - Derrota: chip com borda `--color-border`, ícone seta para baixo, texto em `--color-fg-muted` (não dourado).
- Cada chip é `<li>` dentro de `<ul aria-label="Últimos resultados">`, texto explícito "Vitória"/"Empate"/"Derrota" via `sr-only` ou `aria-label`, nunca só a cor/ícone comunicando o resultado (regra de contraste/a11y de [[design-direction]] seção 4.5-6 — informação nunca só por cor).

**Bloco "Próximo jogo" (mantém o Card existente, ajustes menores):**
- Mantém `Calendar`/`MapPin`/`ShieldCheck` e o layout de `dl` atual — já está bem especificado e segue o padrão.
- Remove o badge "informação ilustrativa" quando o dado passar a ser real (isso é decisão de conteúdo/dev, não UX — só sinalizando que o badge existente era justamente para marcar dado fictício).
- Se aplicável, adicionar destaque visual mais forte que hoje (hoje é `shadow-sm` discreto) — subir para `shadow-md` + borda `--color-accent` 1px, porque agora esse card compete visualmente com dois blocos novos ao lado e precisa continuar sendo o foco principal da seção.

**Bloco "Em seguida" (novo):**
- 2-3 mini-cards horizontais, cada um: adversário + data curta (`dd/mm`) + mando de campo (ícone casa/fora). Sem placar (ainda não aconteceu), sem destaque de cor — são informativos, não o foco.
- `<ul aria-label="Próximos jogos">`, cada item `<li>`.

**Tipos de conteúdo necessários (para o dev, não implementar aqui):** `NextMatch` atual cobre só 1 jogo. Sugiro ao sites-dev-alpha extender o content model para `pastResults: MatchResult[]` (resultado, placar, adversário, data) e `upcomingMatches: NextMatch[]` (lista, sendo o primeiro item o "próximo jogo" em destaque) — ou manter `nextMatch` isolado e adicionar dois arrays novos ao lado. Decisão de shape de dado é do dev; a UX só define que precisa de 3 conjuntos de dados (resultados passados, próximo em destaque, futuros seguintes).

**Título da seção:** trocar de seção sem H2 visível (hoje é só um Card dentro de `section-light`) para seção com `<h2>` "Jogos" visível, `--text-display-lg`, seguindo o mesmo padrão de título de seção usado em "Galeria"/"Localização" no `estadio/page.tsx` — consistência entre páginas.

**Acessibilidade:**
- `<h2>Jogos</h2>` como título real da seção (hoje a seção não tem heading, só o texto dentro do Card — corrigir).
- Resultado de cada chip com `sr-only` explícito ("Vitória, 2 a 0 contra Cruzeiro, 20/09") para leitor de tela, já que forma+cor não é suficiente sozinho para alguém usando screen reader.
- Ordem de leitura/DOM: Próximo jogo primeiro (é a informação de maior prioridade), mesmo que visualmente em mobile venha antes de Resultados — manter essa mesma ordem no DOM em todos os breakpoints (não usar `order` do CSS para inverter visualmente sem inverter o DOM, evita dessincronia entre ordem visual e ordem de tab/leitura, regra 4.4 de [[design-direction]]).

---

## 3. Foto real da Arena MRV — direção de enquadramento e integração

Contexto: `arena.heroImage` hoje aponta para `/images/arena/arena-hero.jpg`, um placeholder gerado (listras + estrela, sem conteúdo fotográfico real) — `heroImageAlt` está vazio (`alt=""`) porque a imagem é decorativa/genérica. Ao trocar por foto real com licença livre, o tratamento de overlay/gradiente já especificado em [[components]] (Hero) e replicado em `estadio/page.tsx` continua valendo — só a fonte da imagem muda, não a estrutura.

**Enquadramento/crop:**
- Preferir plano aberto externo/fachada ou vista de arquibancada cheia (ambiente, não close-up de detalhe arquitetônico sem contexto) — precisa comunicar "isto é um estádio grande e imponente" em 1 imagem, coerente com a palavra-chave "força" da direção visual.
- Orientação paisagem, proporção mínima 16:9, resolução suficiente para `min-height: 70vh` em desktop wide (≥1440px) sem upscaling perceptível — checar que o arquivo fonte tem largura real ≥1920px.
- Ponto focal da imagem (onde está o elemento mais importante, ex. estrutura do estádio) deve ficar no terço central-superior do frame — o overlay gradiente (seção "Overlay de imagem" do Hero em [[components]]) escurece progressivamente até a base, então texto (nome + descrição) fica sempre na base; se o ponto focal da foto também estiver na base, ele fica coberto pelo overlay mais escuro. Preferir fotos onde a arquibancada/estrutura ocupa a parte superior/média do frame e a base tenha céu, gramado ou área de menor detalhe (mais fácil escurecer sem perder informação).
- Evitar fotos com pessoas identificáveis em primeiro plano (direito de imagem, mesmo princípio já aplicado ao elenco) — ok multidão genérica/distante em arquibancada, não ok rosto em destaque.

**Overlay de texto (mantém o já especificado, sem mudança):**
- Gradiente linear `rgba(10,10,10,0.15)` topo → `rgba(10,10,10,0.85)` base, texto branco alinhado à base — já implementado em `estadio/page.tsx` linha 45-52, continua válido para a foto real. Se a foto real for mais clara/estourada que o placeholder gerado, considerar testar se `0.85` na base ainda basta para contraste AA do texto branco — se a área de texto tiver muito branco/céu claro na foto, subir a opacidade da base para `0.90` como ajuste fino (decisão de QA visual do dev após a troca, não redefinição de spec).

**Alt text:** ao trocar de placeholder genérico para foto real e específica, o `alt=""` (decorativo) deixa de ser correto — a imagem passa a ter conteúdo informativo real (é literalmente a Arena MRV). Atualizar `arena.heroImageAlt` para algo descritivo e específico, ex.: `"Fachada da Arena MRV, estádio do Atlético Mineiro em Belo Horizonte"` — mesma lógica já aplicada ao `alt` condicional do `squad-grid.tsx` (real → descreve; genérico → vazio).

**Consistência com o resto do site:**
- Mesma estrutura de Hero (imagem full-bleed + overlay + texto na base) já usada na home — a Arena MRV real deve seguir exatamente esse padrão, não inventar um tratamento novo só para essa página.
- Se a licença livre disponível não cobrir uma foto em alta resolução adequada para hero full-bleed, usar a mesma foto (com crop diferente, mais fechado) também na galeria (`arena.gallery`) para não misturar 1 foto real + 5 placeholders gerados na mesma seção — inconsistência visual óbvia. Se só houver 1 foto real disponível, recomendo usá-la no hero e manter a galeria só com o placeholder genérico atual até haver mais fotos reais, em vez de misturar.

---

## Resumo de decisões-chave

1. Card de jogador ganha cor de fundo por posição + número grande como elemento gráfico — resolve "silhueta vazia" sem depender de foto real.
2. Silhueta reduzida (~55-60% do bloco) para dar espaço ao número/cor de fundo, mantendo `alt=""` por ser decorativa e idêntica entre jogadores.
3. Seção de jogos expande de card único para três blocos (últimos resultados / próximo jogo em destaque / próximos jogos), com V/E/D comunicado por forma+texto, nunca só cor.
4. Próximo jogo continua sendo o elemento de maior destaque visual da seção (shadow/borda reforçados), mesmo com os blocos novos ao lado.
5. Foto real da Arena MRV segue a mesma estrutura de Hero já validada (overlay 0.15→0.85), com enquadramento que preserva o ponto focal fora da área de escurecimento máximo; `alt` deixa de ser vazio e passa a descrever a imagem real.
