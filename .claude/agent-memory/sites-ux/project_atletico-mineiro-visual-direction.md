---
name: project-atletico-mineiro-visual-direction
description: Direção visual definida para o site institucional/torcedor do Atlético Mineiro — paleta, tipografia e specs de componente já entregues.
metadata:
  type: project
---

Site institucional/torcedor do Clube Atlético Mineiro ("o Galo"), construído do zero. Paleta oficial preto/branco + acento dourado `#C9A227` usado só cirurgicamente (nunca como texto de corpo — falha AA sobre branco). Tipografia: Oswald (headlines/uppercase, condensada) + Playfair Display (Hero e citações, solene) + Inter (corpo). Tom obrigatório: tradição/força/paixão de torcida — nunca "SaaS genérico". Motivo gráfico recorrente: estrelas do escudo, usadas como marcador funcional em listas de títulos/conquistas, não decoração aleatória.

**Why:** briefing explícito do orquestrador — clube é identificado pelo preto e branco, e o risco de contraste desse par (dourado sobre branco, por exemplo) precisava ser tratado de forma explícita na spec.

**How to apply:** specs completas entregues em `docs/smart-memory/agents/ux/design-direction.md` (tokens, contraste, motion) e `docs/smart-memory/agents/ux/components.md` (Header/Nav, Hero, Timeline de História, Cards de Títulos, Seção do Estádio, Footer). Em trabalho futuro neste projeto, reutilizar esses tokens e specs em vez de redefinir paleta/tipografia do zero — checar primeiro se ainda correspondem ao código atual antes de recomendar.

Ciclo 2 (2026-09-30): elenco passou a usar nomes/posições/números reais dos jogadores, mas mantém avatar/silhueta genérico por decisão confirmada de direito de imagem (não é mais ilustrativo como no ciclo 1 — é real, só sem foto). Arena MRV ganhou direção para foto real (licença livre) no lugar do placeholder gerado. Spec de refresh em `docs/smart-memory/agents/ux/elenco-jogos-refresh.md` (card de jogador com cor de fundo por posição + número grande como elemento gráfico; seção de jogos expandida de card único para últimos resultados + próximo jogo + próximos jogos).

Ciclo 3 (2026-09-30): nova página `/quiz` (múltipla escolha, 8-10 perguntas, sem timer, tela de resultado). Reaproveita cards de título como base visual das opções de resposta e o CTA primário existente para "Refazer o quiz" — nenhum componente novo de card/botão criado. Únicos tokens novos: `--color-error` (#D64545) e `--color-error-bg` (#2A1414), porque o site institucional não tinha fluxo de erro binário antes. Estrelas reaproveitadas em novo papel: indicador de faixa de pontuação (5 estrelas, preenchimento por faixa %, não contagem literal). Spec completa em `docs/smart-memory/agents/ux/quiz-design.md`.
