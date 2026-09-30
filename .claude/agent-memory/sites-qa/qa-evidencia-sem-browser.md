---
name: qa-evidencia-sem-browser
description: Como produzir evidência dura de a11y/teclado/console neste projeto — Chrome headless real via CDP (preferido desde 2026-09-30), curl, CSS servido e leitura visual das imagens
metadata:
  type: feedback
---

Sem browser, três técnicas geraram evidência conclusiva na auditoria do site do
Atlético Mineiro (2026-09-09) e devem ser o primeiro recurso em auditorias futuras:

1. **`curl` no dev server que o lead mantém** (`http://localhost:3000`) — termina
   sozinho, não bloqueia. Rende metadata real (`<title>`, canonical, `og:*`),
   hierarquia de headings, `alt`, JSON-LD e **estilos inline do SSR**.
2. **Baixar o chunk CSS servido** e localizar as regras por número de linha.
   Foi assim que provei o CRITICAL: `.text-foreground` (`@layer utilities`) vence
   por cascade o `color` herdado de `.section-light`, resultando em texto branco
   sobre fundo branco. Alegação de contraste sem olhar o CSS real é chute.
3. **Ler as imagens de `public/` com a ferramenta de leitura visual.** Os
   placeholders gerados tinham texto queimado dentro do JPG — descasamento
   imagem↔título↔`alt` e duplicação com o `<h1>` sobreposto. Nenhum grep acharia isso.

**Why:** o relatório do implementer trazia "Lighthouse Accessibility = 100 nas 5
rotas". As três técnicas acima refutaram esse número com evidência verificável.
Relato de implementer é alegação, não evidência.

**How to apply:** antes de aceitar qualquer número de auditoria de terceiro,
reproduzir pelo menos o HTML e o CSS servidos. Quando algo depender de
renderização real (sobreposição, crop de `object-cover`), declarar como
"confirmação visual pendente" e pedir screenshot ao lead — nunca chutar.

## Atualização 2026-09-30: existe browser real, e é o método preferido

O Chrome está instalado (`C:/Program Files/Google/Chrome/Application/chrome.exe`) e o
Node 24 tem `WebSocket` global. Isso permite dirigir o Chrome headless via CDP sem
nenhuma dependência:
- Rodar em background `chrome --headless=new --remote-debugging-port=9333
  --user-data-dir=<scratchpad>` e também em background
  `node node_modules/next/dist/bin/next start -p 3107`, que serve o build de produção e
  não depende do dev server do lead.
- `Input.dispatchKeyEvent` (rawKeyDown/keyDown+keyUp, com `windowsVirtualKeyCode` e
  `text` "\r"/" ") gera teclado nativo: Tab move o foco, setas trocam radio, Enter
  submete o form. Serve para provar roteiro de teclado, `:focus-visible` e contraste
  com `getComputedStyle`.
- Também dá para usar `Accessibility.getPartialAXTree` (nome/role reais),
  `Emulation.setDeviceMetricsOverride` (layout por breakpoint),
  `Emulation.setEmulatedMedia` (reduced-motion) e `Page.captureScreenshot` (recorte
  renderizado).
- `Runtime.consoleAPICalled` + `exceptionThrown` pegam hidratação no build de produção
  (#418). Limite: mismatch **só de atributo** só aparece em dev.
- No fim, matar só os PIDs com `next start -p 3107` e `remote-debugging-port=9333`.

**Why:** assim fechei AC1/AC6/AC9/AC11 da story 2.1 com evidência dura, onde o
implementer tinha deixado "requer navegador".

**How to apply:** o driver fica no scratchpad (`cdp.mjs`) e pode ser recriado. Qualquer
AC de teclado, foco, overflow ou console passa a ser verificável, e não precisa mais
virar NÃO VERIFICÁVEL.

Ver também [[env-execucao-comandos]].
