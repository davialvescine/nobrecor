---
description: Roda o CI local completo (lint + type-check + test + rotas + build) — obrigatório antes de todo commit/push
---

Rode o CI local completo da Nobre Cor, na ordem, e reporte o resultado de cada etapa:

1. `npm run lint` — 0 ERROS é o gate (warnings pré-existentes são tolerados; não introduzir novos)
2. `npm run type-check` — TypeScript 7, `tsc --noEmit`
3. `npm test -- --run` — suite completa
4. `npm run check:rotas` — slugs duplicados, colisão de rota, ambiguidade de landing, placeholders
5. `npm run build` — precisa gerar as páginas estáticas sem erro

Atalho: `npm run ci` roda tudo na ordem.

Regras:
- Falhou qualquer etapa → NÃO commitar/pushar; corrigir e rodar de novo.
- NUNCA usar `HUSKY=0` / `--no-verify`.
- Se o diff tocou `src/content/` (serviços, bairros) rode também `npm run check:thin-content`.
- Ao final, apresente um resumo: etapa · resultado · número de páginas geradas no build.
