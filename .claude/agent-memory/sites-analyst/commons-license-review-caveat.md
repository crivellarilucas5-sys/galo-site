---
name: commons-license-review-caveat
description: Wikimedia Commons files flagged "license review pending" (não revisado por admin) should be treated as não-confiáveis, same bucket as "não encontrada"
metadata:
  type: feedback
---

Ao pesquisar fotos com licença livre no Wikimedia Commons (para elenco/notícias do site
do Atlético-MG), descartar como "não confiável" qualquer arquivo cuja página no Commons
mostre um aviso de **"license review"** ainda pendente (licença alegada por quem fez o
upload, mas não confirmada por um administrador/revisor do Commons) — mesmo que a licença
alegada seja permissiva (ex.: CC BY 3.0) e a atribuição pareça plausível (ex.: screenshot
de vídeo oficial do clube no YouTube).

**Por quê:** esse foi exatamente o caso do Reinier (`File:Reinier 2020.png` e
`File:Reinier 2020 (2).png`, screenshots de entrevista do Real Madrid TV) — únicas
alternativas depois que a foto usada originalmente (Stepro/Leipzig-Dortmund) se revelou
mostrar outros jogadores (Simakan/Szoboszlai) em destaque, não o Reinier. Ambas as
screenshots tinham o aviso de revisão pendente, então recomendei voltar à silhueta
genérica em vez de arriscar usar uma licença não confirmada.

**Como aplicar:** no critério já usado em [[qa-audit-flow-atletico-site]] ("licença
explicitamente marcada... não forçar resultados duvidosos"), incluir "sem aviso de
revisão pendente" como parte do que conta como licença confiável. Se só existirem opções
com esse aviso, documentar a limitação e recomendar placeholder/silhueta genérica em vez
de forçar o uso.
