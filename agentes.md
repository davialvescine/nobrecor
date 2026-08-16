# agentes.md — Times de agentes da Nobre Cor Pinturas

> Quem faz o quê, em que ordem, e com qual critério de aprovação.
> Leitura obrigatória junto com `CLAUDE.md` e `.claude/rules/`.

---

## Filosofia

Projeto de SEO local não é linear e não cabe numa conversa só. Cada fase exige uma
especialidade diferente, e a maior parte dos erros caros vem de pular etapa — publicar
página sem copy única, subir schema com nota inventada, fazer deploy sem verificar o
canonical.

O papel deste documento é impedir que isso aconteça por esquecimento. Os agentes ficam
em `.claude/agents/` e são invocáveis por nome.

**Regra que vale para todos:** nunca inventar (ver `.claude/rules/conteudo.md`).
Página menor é sempre melhor que página falsa.

---

## Mapa rápido

| Agente | Quando usar | Veredito |
|---|---|---|
| `fase-executor` | todo bloco de trabalho não-trivial | relatório da fase |
| `copywriter-hiperlocal` | nova onda da matriz, bairro sem copy | páginas escritas |
| `seo-auditor` | toda página criada ou alterada | APROVADO / BLOQUEADO |
| `schema-auditor` | mudança em `schema.ts` ou no JSON-LD | GO / NO-GO |
| `deploy-verifier` | depois de todo deploy | SAUDÁVEL / ROLLBACK |

---

## Pipeline padrão de uma fase

Conduzido pelo `fase-executor`, sem pular etapa:

```
0. Contexto      CLAUDE.md + agentes.md + regras + docs/relatorio-pesquisa.md
1. Inventário    levantar TODOS os pontos tocados (grep amplo, não amostra)
2. Conteúdo      copywriter-hiperlocal escreve ANTES do código
3. Implementação Server Components, next/image, zero dependência nova sem motivo
4. Auditores     seo-auditor + schema-auditor (bloqueantes)
5. CI local      npm run ci  (lint + type-check + test + rotas + build) - NÃO há Actions
6. Commit/push   Conventional Commits em português, sem emoji
7. Deploy        Vercel
8. Verificação   deploy-verifier
9. Documentação  CLAUDE.md e docs/ atualizados — é parte da entrega
```

---

## FASE 0 — Fundação (concluída)

Scaffold Next.js 16 + TypeScript 7 + Tailwind 4, base de 20 serviços e 81 bairros,
arquitetura de SEO, arquivos de robô, gates de CI, animações. Não refazer.

---

## FASE 1 — Publicação (próxima)

### 1.1 Preparar produção

Responsável: dono + `fase-executor`.

- ✅ Telefone comercial real já configurado (`(67) 98152-2412`).
- ⬜ Registrar `nobrecor.com.br` no registro.br e garantir o @ no Instagram.
- ⬜ Criar propriedade do Google Analytics 4 e definir `NEXT_PUBLIC_GA_ID` na Vercel.

O `check:rotas` valida o telefone (formato E.164 e coerência entre `phone` e
`whatsappNumero`) e falha o CI se alguém quebrar isso.

### 1.2 Deploy

Agente: `deploy-verifier` (depois do deploy, não antes).

Checklist crítico do primeiro deploy: robots.txt sem `Disallow: /`, sitemap apontando para o
domínio de produção, canonical em `nobrecor.com.br` e não em `*.vercel.app`.

### 1.3 Local SEO

Responsável: dono.

Perfil da Empresa no Google (categoria "Pintor", área Campo Grande), Search Console, Bing
Webmaster Tools, cadastro nos diretórios que já rankeiam (GuiaFix, Guia Fácil, TeleListas, oHub).

**É a alavanca de maior retorno do projeto.** Quem tem mais avaliações recentes domina o mapa,
e o mapa aparece antes dos sites orgânicos.

---

## FASE 2 — Conteúdo hiperlocal

Agente: `copywriter-hiperlocal`.

66 bairros ainda estão com `copyRevisada: false`. A ordem é tier 2 primeiro (bairros
consolidados, boa demanda), tier 3 depois.

Cada bairro precisa de 3 a 4 parágrafos no campo `contexto` de `src/content/bairros.ts`,
respondendo: como o perfil de imóvel daquele bairro muda a execução da obra, que regra prática
decorre disso, e quais serviços o perfil mais demanda.

**Ponto de referência só entra verificado.** Bairro sem referência conhecida fica com array
vazio; o template já omite o bloco.

Gate: `npm run check:thin-content` verde para os bairros marcados como revisados.

---

## FASE 3 — Fotos e prova social

Responsável: dono + `fase-executor`.

- **Portfólio:** instruções no topo de `src/content/portfolio.ts`. WebP, 1600px, até ~200KB.
  A seção só aparece quando houver obra cadastrada.
- **Depoimentos:** só entram quando existirem clientes reais. Só então o schema `Review` pode
  ser adicionado, e ainda assim a avaliação agregada legítima vem do Perfil da Empresa no Google,
  não do site.
- **Fotos de serviço:** os caminhos em `servico.foto` já existem no tipo, apontando para
  `public/images/servicos/`. Enquanto não houver foto, os cards usam ícone.

---

## FASE 4 — Ondas 2, 3 e 4 da matriz

Agente: `fase-executor` + `copywriter-hiperlocal`.

Subir `ONDA_ATIVA` em `src/lib/landing-pages.ts` **um número por vez**, e só depois dos gates
de indexação do `CLAUDE.md` §6. Use `/onda` para conferir o status.

Publicar 1.620 páginas de uma vez é o erro que mata um projeto de SEO programático. A onda
seguinte é uma aposta que só se faz com o resultado da anterior na mão.

---

## FASE 5 — Blog

Os 3 artigos SEO já escritos estão em `~/Downloads/nobrecor-projeto/site/blog/`. Migrar para
`src/content/blog-posts.ts` + rota `/blog/[slug]`, com schema `BlogPosting` e autoria declarada
(`Person`), que é sinal de E-E-A-T.

Pauta de cauda longa (de `docs/relatorio-pesquisa.md` §4): quanto custa pintar um apartamento em
Campo Grande · quanto cobra um pintor por m² · qual a melhor tinta para fachada · como escolher
pintor de confiança.

---

## FASE 6 — Expansão para Brasília

A marca é neutra de propósito (sem cidade no nome), então a expansão não quebra nada: criam-se
páginas locais novas para o DF, sem tocar na identidade nem nas páginas de Campo Grande.

Referência de estrutura: `pintordebrasiliadf.com.br` e `altacor.com.br`.

---

## Regras de ouro

1. **Nunca inventar.** Depoimento, nota, preço, obra, condomínio, ponto de referência.
2. **Inventário, não amostra.** Antes de mexer, levantar todos os pontos afetados.
3. **Conteúdo antes de código.** Página sem copy única não deveria existir.
4. **CI verde ou não commita.** Sem `HUSKY=0`, sem `--no-verify`.
5. **Deploy sem verificação não existe.** Build verde não é garantia de site correto.
6. **Uma onda por vez.** Com o resultado da anterior medido no Search Console.
7. **Documentação é entrega.** `CLAUDE.md` desatualizado custa a próxima sessão inteira.
8. **Quando faltar informação, perguntar.** É mais barato que refazer.
