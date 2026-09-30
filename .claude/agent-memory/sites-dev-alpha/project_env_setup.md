---
name: project-env-setup
description: Ambiente Node/pnpm/Chrome nesta máquina Windows (test/) — o que precisa de setup manual e armadilhas conhecidas de symlink/CLI.
metadata:
  type: project
---

Nesta máquina (Windows, Git Bash), Node.js e pnpm **não vêm pré-instalados** no projeto `test/`. Instalação usada: `winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements --silent`, depois `npm install -g pnpm`. O binário node fica em `/c/Program Files/nodejs`, e o pnpm global em `/c/Users/crive/AppData/Roaming/npm` — nenhum dos dois está no `$PATH` do Git Bash por padrão; toda sessão de bash precisa exportar isso manualmente (`export PATH="/c/Program Files/nodejs:/c/Users/crive/AppData/Roaming/npm:$PATH"`), já que o shell não persiste variáveis entre chamadas de Bash tool.

**Why:** sem isso, `node`/`pnpm`/`npx` retornam "command not found" mesmo já instalados.
**How to apply:** No início de qualquer sessão que precise rodar Node/pnpm neste projeto, prefixar os comandos com o export do PATH acima (ou confirmar de novo se `node -v` funciona).

## pnpm@12 tem bug de symlink quebrado neste ambiente
`npm install -g pnpm` traz por padrão a major mais nova (12.x). No Windows/MSYS deste projeto, o pnpm@12 gera symlinks em `node_modules/<pkg>` apontando para o path errado dentro de `node_modules/.pnpm` (ex.: aponta para `sharp@0.35.4` mas a pasta real é `sharp@0.35.4_@types+node@20.19.43`) — quebra `require()` de qualquer dependência nativa (`sharp` especificamente, possivelmente outras). **Fixado pinando `pnpm@9.15.9`** (`npm install -g pnpm@9`) — essa é também a versão que o tech-stack do projeto já pedia, então não é uma regressão. Além disso foi necessário remover `pnpm-workspace.yaml` (formato do pnpm 9 é incompatível com o `allowBuilds`/`onlyBuiltDependencies` do pnpm 12) e adicionar `.npmrc` com `node-linker=hoisted` para evitar o problema por completo (node_modules "flat", sem os symlinks problemáticos).

**Why:** horas perdidas debugando `Cannot find module 'sharp'`/`detect-libc` antes de isolar a causa (symlink apontando para pasta inexistente).
**How to apply:** se `node -e "require('sharp')"` falhar com module not found mesmo aparecendo em `node_modules/`, suspeitar do pnpm@12 + symlink; confirmar `pnpm -v` e trocar para `pnpm@9` se necessário.

## shadcn CLI atual usa preset "base-nova" por padrão
`pnpm dlx shadcn@latest init -d` (ou sem flags) inicializa com o preset `base-nova`: pacote `cn` externo (não `clsx`+`tailwind-merge` manual), base `@base-ui/react` em vez de Radix, `tw-animate-css`, e reescreve `globals.css` com tokens genéricos oklch. Isso diverge do tech-stack do projeto (Radix + `cn()` local). **Usar `shadcn init -b radix -p <preset>`** (qualquer preset de nome tipo vega/nova/maia — todos usam Radix quando `-b radix` é passado) para manter os componentes gerados sobre Radix UI. O `cn()` de `src/lib/utils.ts` continua importando do pacote `cn` (mantido — é apenas um wrapper `clsx`+`tailwind-merge` otimizado da própria equipe do shadcn, "drop-in replacement for twMerge(clsx(...))").

**Why:** evita reescrever manualmente 8 componentes shadcn caso o CLI padrão gere algo incompatível com o resto do design system do projeto.
**How to apply:** sempre passar `-b radix` ao rodar `shadcn init`/`shadcn add` neste projeto (ou em qualquer projeto novo desta squad que siga o mesmo tech-stack).

## lucide-react removeu ícones de marca
A versão atual (`lucide-react@1.43`) não tem mais `Instagram`, `Facebook`, `Youtube`, `Twitter` (removidos upstream por questão de marca registrada). Só resta `X` (a letra, não o logo). Usar ícones genéricos (`Camera`, `Users`, `Play`, `AtSign`, `Music2` etc.) + `aria-label` explícito nomeando a plataforma — a identificação acessível não depende do ícone visual.

**Why:** `import { Instagram } from "lucide-react"` quebra silenciosamente (vira `undefined`, React lança erro ao tentar renderizar).
**How to apply:** antes de importar um ícone de marca do lucide-react, testar via `node -e "console.log(typeof require('lucide-react').NomeDoIcone)"`.

## Chrome local para Lighthouse
Chrome está instalado em `C:\Program Files\Google\Chrome\Application\chrome.exe` nesta máquina — `npx lighthouse <url> --chrome-flags="--headless=new --no-sandbox"` funciona sem precisar baixar Chromium à parte. O `lighthouse` CLI às vezes lança um erro `EPERM` no cleanup do diretório temp do Chrome (`chrome-launcher` tentando `rmSync` uma pasta ainda em uso) — **é só erro de limpeza, o relatório já foi escrito no `--output-path` antes do erro**; não indica falha da auditoria.

**Why:** evita re-rodar a auditoria inteira achando que falhou.
**How to apply:** sempre checar se o arquivo de output existe (`ls -la <arquivo>.json`) antes de assumir que o `EPERM` no final do log invalidou o resultado.
