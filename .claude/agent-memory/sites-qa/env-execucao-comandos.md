---
name: env-execucao-comandos
description: Como rodar node/pnpm neste projeto Windows (fora do PATH) e por que nunca rodar pnpm dev/start em primeiro plano
metadata:
  type: project
---

Neste repositório, `node` e `pnpm` **não estão no PATH** do shell. Prefixar:
`export PATH="/c/Program Files/nodejs:$PATH"` e chamar
`"C:/Users/crive/AppData/Roaming/npm/pnpm.cmd" <script>`.

`pnpm lint`, `pnpm typecheck` e `pnpm build` terminam sozinhos — seguros.
`pnpm dev` e `pnpm start` **nunca terminam** e travam a sessão até o timeout.

**Why:** uma tentativa anterior desta auditoria falhou com 600s sem progresso,
por ter rodado um servidor de longa duração em primeiro plano.

**How to apply:** rodar a tríade lint/typecheck/build de uma vez em background
(`run_in_background`) e ler o arquivo de saída depois — libera a leitura de
código em paralelo. Para inspecionar o site rodando, usar o dev server que o
lead já mantém em `http://localhost:3000` (ver [[qa-evidencia-sem-browser]]),
nunca subir um próprio.

Detalhe do build (**corrigido em 2026-09-09, rodada 2**): `next build --turbopack`
**deixa sim** HTML pré-renderizado em `.next/server/app/{index,historia,titulos,estadio,elenco}.html`,
além do CSS compilado em `.next/static/chunks/*.css`. Na rodada 1 registrei o
contrário e por isso dependi do dev server do lead — errado. **Esta é a fonte de
evidência preferencial**: não precisa de servidor, não bloqueia a sessão e permite
`grep -c 'opacity:0'`, extração de `alt`/canonical/`og:*` e resolução de cor real.

**Builds concorrentes (2026-09-30, épico 2 R3):** outros agentes (o alpha, ou até um
despacho duplicado de sites-qa para a mesma rodada) podem rodar `next build` no mesmo
`.next`. Os sintomas são `ENOENT` (`_buildManifest.js.tmp`, `pages-manifest.json`),
exit 0 sem `index.html` ou HTML que some no meio da checagem. O risco maior é ler o HTML
do build **do outro**, feito com outro TZ. ENOENT aqui é ambiente, não defeito de código.
Como proceder:
- Antes e depois de cada build, contar os `node.exe` com `next build`
  (`Get-CimInstance Win32_Process` via powershell.exe) e só aceitar evidência com 0 concorrentes.
- Logo após cada build, **copiar o HTML para o scratchpad** e checar nas cópias.
- Quando o teste compara ambientes (UTC vs local), rodar os dois builds em sequência dentro
  de um único comando em background.

Armadilhas do shell com UTF-8 (ambas já me custaram um quase-erro de veredicto):
1. Classes de caractere com acento (`grep "Ol[íi]mpia"`) **não casam** — multibyte
   dá falso negativo. Buscar a string literal acentuada, ou usar Grep (ripgrep).
2. **`${#var}` conta bytes, não caracteres.** Acento UTF-8 ocupa 2 bytes, então
   uma meta description de 158 chars mede 167 e parece estourar o orçamento de
   160. Antes de reprovar limite de tamanho, recontar com
   `node -e '[...s].length'`. Foi assim que quase abri um finding falso na
   rodada 3, e é a origem do "127–149 chars" errado que escrevi na rodada 1.
