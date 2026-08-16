---
description: Publica na Vercel seguindo o procedimento completo (CI → push → verificação pós-deploy)
---

1. Rode `npm run ci` completo. Falhou qualquer etapa → PARE e corrija.
2. Confira as pendências que travam produção:
   - telefone real no lugar do placeholder `5567999999999` (o `check:rotas` avisa)
   - `NEXT_PUBLIC_GA_ID` configurado na Vercel
   - `SITE_URL` = https://nobrecor.com.br
3. Commit em Conventional Commits (português, sem emoji) e push em `main`.
4. Acompanhe o build na Vercel.
5. Rode o agente `deploy-verifier` contra produção.
6. Se o veredito for ROLLBACK, promova o deployment anterior no painel e reporte a causa.
7. Atualize o CLAUDE.md se a estrutura ou os números mudaram.
