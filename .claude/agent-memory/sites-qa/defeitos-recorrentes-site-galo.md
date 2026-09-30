---
name: defeitos-recorrentes-site-galo
description: Dez padrões de defeito/re-QA do épico 1 do site do Atlético Mineiro (encerrado CONCERNS na rodada 3/3) — checar primeiro em qualquer re-QA deste projeto
metadata:
  type: project
---

Classes de defeito confirmadas no quality gate do épico 1 (2026-09-09). São
estruturais: reaparecem a cada seção nova, então devem abrir todo re-QA.

1. **Componente do tema escuro dentro de seção clara.** `SectionHeading` e
   `StatCard` fixam `text-foreground`/`text-muted-foreground` (brancos). Dentro de
   `section-light` (fundo branco), a regra direta vence a herança → contraste 1:1.
   Checar todo uso novo de `section-light` e de componentes compartilhados nela.
2. **`opacity:0` do Motion no HTML do servidor.** `Reveal`/`RevealGroup`/`RevealItem`
   serializam `initial` como estilo inline. Conteúdo invisível sem JS e LCP preso
   à hidratação. Teste rápido: `curl <rota> | grep -c 'opacity:0'` — o esperado
   após a correção é 0.
3. **Placeholders com rótulo queimado no arquivo** (`scripts/generate-placeholders.mjs`).
   Qualquer reordenação de `src/content/*` descasa imagem ↔ título ↔ `alt`, e os
   heros duplicam o `<h1>` sobreposto. Sempre **abrir a imagem**, não só o `alt`.

**Why:** os três passaram por uma auto-auditoria que reportou "Lighthouse
Accessibility = 100 nas 5 rotas" — nenhum é detectável por lint, typecheck ou build,
que estavam todos verdes.

**How to apply:** rodar esses três checks antes de qualquer coisa em re-QA.
Ver [[qa-evidencia-sem-browser]] para o método; o laudo completo com evidência
por finding está em `docs/smart-memory/agents/qa/atletico-mineiro-site-audit.md`.

## Aprendido na rodada 2 (2026-09-09) — checar o **outro lado** da correção

4. **Correção de `opacity:0` no SSR cria o defeito espelho.** O padrão adotado
   (`useAnimation` + `controls.set(hidden)` em `useLayoutEffect`) tira o `opacity:0`
   do HTML, mas esconde conteúdo que o browser **já pintou** — flash na hidratação
   para elementos no primeiro viewport. `useLayoutEffect` é "antes do paint" só em
   CSR; em SSR o HTML já foi pintado. Não aceitar o comentário do código como prova.
5. **Regra de `alt` aplicada em um lugar só.** Quando o time troca todas as imagens
   por arte genérica, o `alt` descritivo vira mentira em **todas** elas — não só na
   que o finding citou. Reconferir o alcance de toda regra que o architect fixa.
6. **Fixes de imagem aplicados pela metade.** Texto queimado saiu de hero/news e
   ficou na galeria da arena e na timeline. Abrir sempre as imagens que o finding
   **não** citou.
7. **Story fecha com AC medido em build antigo.** Números de Lighthouse marcados
   `[x]` continuam lá depois de o defeito que os refutava ser corrigido. Correção do
   código ≠ revalidação do número: veredicto correto é NÃO VERIFICÁVEL, não PASS.
8. **Erro herdado do research.** O dev copia fielmente uma fonte errada (agregado
   "3×1" com placares "2×0" e "1×0"). Conferir aritmética/consistência interna do
   research, não só a correspondência dev↔research.

## Desfecho do épico 1 (rodada 3/3, 2026-09-09) — CONCERNS, tudo em `done/`

Os 8 padrões acima foram todos corrigidos e reconfirmados por mim contra o meu
próprio build. Dois aprendizados que sobrevivem ao épico:

9. **Número que fecha na aritmética ainda pode não fechar na leitura.** "2×1 no
   agregado (2×0 em BH, 1×0 em Assunção)" é factualmente correto, mas não diz
   quem venceu cada jogo — o leitor soma 3×0. Placar publicado precisa de sujeito.
10. **Cap de rodadas fecha o ciclo, não o finding.** Ao atingir 3 rodadas,
    MEDIUM/LOW remanescentes vão para adjudicação do lead **documentados um a
    um**, nunca descartados em silêncio. Só CRITICAL/HIGH justificam FAIL na
    última rodada.

## Aprendido no QA de fotos/notícias/quiz (2026-09-30, rodada 1, FAIL)

11. **Recorte automático (`sharp fit:"cover"`, `position: top/attention`) troca o
    sujeito da foto.** Numa foto de disputa de bola, o recorte 3:4 mostrou outros dois
    jogadores, e numa foto retrato o recorte 3:2 deixou só o calção à vista. O `alt`
    continua afirmando quem é o jogador. Abrir **toda** imagem gerada e comparar com a
    `ImageDescription` do Commons, que diz quem está em primeiro plano.
12. **O research contradiz a própria fonte** e o dev transcreve fielmente: "segundo
    título" contra "1º título" no facts, "primeira partida" contra "terceira partida" no
    `articleBody` da fonte, e dia/mês inventados em datas "aprox.". Dá para conferir
    direto: `curl` + `datePublished`/`article:published_time`/`articleBody` das URLs
    citadas pelo próprio research.
13. **Regra de licença corrigida num lugar e não estendida** (a mesma classe do #5):
    "(recortada do original)" foi aplicado na Arena e ficou de fora de /elenco e das
    notícias.

**Ponto que atravessou as 3 rodadas sem nunca ser medido:** Lighthouse/axe. Os
ACs de performance/a11y da 1.9 fecharam como `[~]` com nota honesta — registro,
não medição. Se o épico voltar, **é o primeiro buraco a tapar** (JSON bruto
contra produção). Ver [[qa-evidencia-sem-browser]] para o que dá e o que não dá
para provar sem browser.
