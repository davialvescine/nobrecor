---
description: Mostra o status do rollout da matriz serviço × bairro e o que falta para liberar a próxima onda
---

1. Leia `ONDA_ATIVA` em `src/lib/landing-pages.ts` e rode:
   `node -e "import('./src/lib/landing-pages.ts')"` — ou simplesmente `npm run check:rotas`,
   que já imprime serviços × bairros × total da matriz.
2. Reporte: onda ativa · páginas publicadas · páginas na próxima onda · total da matriz.
3. Verifique os gates de liberação da próxima onda (CLAUDE.md §Rollout):
   - [ ] ≥ 90% das páginas da onda atual indexadas no Search Console
   - [ ] CTR médio da onda atual ≥ 1,0%
   - [ ] zero páginas em "Rastreada — não indexada no momento" há mais de 30 dias
   - [ ] `npm run check:thin-content` verde para a próxima onda inteira
   - [ ] Lighthouse mobile ≥ 90 em amostra de 10 páginas
4. Se todos os gates passarem, proponha subir `ONDA_ATIVA` — mas NÃO suba sem o aval do Davi.
5. Se algum gate falhar, diga qual e qual é o próximo passo concreto.
