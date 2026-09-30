---
name: checagens-imagem-licenca-fuso
description: Três checagens que só aparecem lendo além do pedido: CC BY-SA exige aviso de modificação, Intl sem timeZone em server component estático, e opacity/alpha no cálculo de contraste
metadata:
  type: feedback
---

Aprendido no QA do épico 2 do site do Galo (2026-09-30). O implementer pediu que eu
confirmasse contraste, crop e atribuição. Os problemas reais estavam ao lado disso:

1. **CC BY-SA 4.0 não é só autor + licença + link.** A §3(a)(1)(B) exige indicar
   **modificação**, e recorte conta como modificação. Pela §6(a), descumprir os termos
   encerra a licença automaticamente (dá para corrigir em até 30 dias). Confirmar autor
   e licença direto na API do Commons
   (`w/api.php?action=query&prop=imageinfo&iiprop=extmetadata`). A rede funciona aqui.
2. **`Intl.DateTimeFormat` sem `timeZone` dentro de server component estático** congela
   o fuso da máquina de build. Local (BRT) parece certo; em CI/Vercel (UTC) publica hora
   e dia errados. Teste: rodar o formatter com `TZ=UTC node -e ...`.
   **O outro lado do fix (rodada 2):** `timeZone: "America/Sao_Paulo"` só serve
   para strings com hora e offset. Uma string **date-only** (`"2026-03-25"`) é
   lida como meia-noite UTC, e com o fuso de SP vira o dia anterior em qualquer
   build. Para date-only o certo é `timeZone: "UTC"`. Ao revisar um fix de
   fuso, grepar **todos** os formatadores e comparar o texto de `<time>` com o
   próprio `dateTime` no HTML de build UTC e local (dar `diff` nas datas).
3. **Contraste precisa considerar `opacity-*`/alpha do elemento**, não só o token.
   Compor a cor com o fundo antes de calcular.
4. **Risco de crop no Next/Image:** o `srcset` só redimensiona e o `object-cover` só
   remove área. O teto de detalhe é o arquivo-fonte. Então basta inspecionar os pixels
   nativos com zoom via `sharp` (`extract` + `resize`), e não cada breakpoint.

**Why:** os pontos 1 e 2 passaram pela tríade verde e pelo auto-relato do alpha, e o
lead só perguntou "a atribuição está correta?".

**How to apply:** em qualquer imagem de terceiros, rodar a checagem de licença completa
(incluindo modificação). Em qualquer data formatada no servidor, testar com `TZ=UTC`.
Ver [[defeitos-recorrentes-site-galo]] e [[qa-evidencia-sem-browser]].
