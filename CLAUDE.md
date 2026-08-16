# CLAUDE.md — Nobre Cor Pinturas

> Contexto completo do projeto. Leia este arquivo antes de qualquer tarefa.
> Complementos: `agentes.md` (times de agentes), `.claude/rules/` (regras invioláveis),
> `docs/relatorio-pesquisa.md` (pesquisa de mercado e SEO).

---

## 0. Estado atual (16/08/2026)

| Item | Situação |
|---|---|
| Stack | Next.js 16.3.1 · React 19.2.8 · **TypeScript 7.0.2** · Tailwind CSS 4.3.3 |
| Build | 213 páginas estáticas (SSG), verde |
| Repositório | `git@github.com:davialvescine/nobrecor.git` |
| Deploy | ❌ ainda não publicado |
| Domínio | ❌ `nobrecor.com.br` ainda não registrado |
| Telefone | ⚠️ **placeholder** `5567999999999` — trocar antes do deploy |
| Google Analytics | ⚠️ falta criar a propriedade e definir `NEXT_PUBLIC_GA_ID` |
| Perfil da Empresa no Google | ❌ não cadastrado |
| Fotos de obra | ❌ nenhuma (portfólio vazio de propósito) |
| Vídeo da hero | ❌ removido: o arquivo do protótipo estava corrompido |
| Depoimentos | ❌ nenhum real |

### Números do conteúdo

| Item | Qtd |
|---|---|
| Serviços | 20 |
| Bairros | 81 (80 oficiais da PLANURB + Altos da Afonso Pena) |
| Regiões urbanas | 7 |
| Bairros com copy hiperlocal revisada | 15 (todos tier 1) |
| Landings publicadas (onda 1) | 105 |
| Matriz completa serviço × bairro | 1.620 |

---

## 1. O negócio

**Nobre Cor Pinturas** — empresa de pintura de **alto padrão** em Campo Grande MS
(expansão futura: Brasília DF, sem trocar a marca).

- **Posicionamento:** alto padrão. Não competimos por preço; competimos por acabamento,
  organização e prazo cumprido.
- **Foco geográfico:** a **área nobre** da capital. É decisão explícita do dono.
- **Conversão:** WhatsApp. Todo CTA leva para lá.
- **Concorrente a superar:** RR Pinturas (pintoremcampogrande.com.br).
  Meta: 1º orgânico em "pintor campo grande ms" em 3–6 meses.
- **Referência de mercado:** [altacor.com.br](https://altacor.com.br) (Brasília) — modelo de
  estrutura de cards, catálogo por serviço e cobertura por região.

### Os 4 diferenciais (texto aprovado, usar sempre igual)

Estão em `BUSINESS.diferenciais` (`src/lib/business.ts`). Não reescrever sem pedido do dono.

1. Confiança profissional · 2. Entrega no prazo · 3. Equipe de alta performance ·
4. Orçamento sem compromisso

---

## 2. Marca

| Token | Hex | Uso |
|---|---|---|
| Azul Nobre | `#1B3A5C` | base, seções escuras, títulos |
| Off-White | `#F7F4EF` | fundo claro |
| Dourado | `#C8963E` | acento premium, CTA |
| Dourado Escuro | `#A87B2F` | facetas, hover, texto de apoio |
| Aço | `#5B7FA6` | facetas do diamante |
| Carvão | `#2B2B2B` | texto |
| Verde WhatsApp | `#25D366` | **só** o botão do WhatsApp |

- **Tipografia:** **Bebas Neue** (títulos e logotipo) + **Plus Jakarta Sans** (texto), via
  `next/font/google`. Escolhida pelo dono em 16/08/2026 no lugar da Marcellus, por referência a
  grotescas condensadas (Postamp Grotesk / Neurath Mono). Bebas Neue é **só caixa-alta**: nunca
  usar em texto corrido — os `h1..h4` já aplicam `text-transform: uppercase` no `globals.css`.
- **Símbolo:** diamante facetado (componente `Diamante` em `Header.tsx`; arquivos em
  `public/images/marca/`).
- **Botão dourado tem texto azul-escuro.** Contraste 5:1. NÃO trocar para branco (cai para 2,1:1).

Detalhes completos: `.claude/rules/marca.md`.

---

## 3. Regra número um: nunca inventar

Está em `.claude/rules/conteudo.md` e vale para toda sessão e todo agente.

Proibido escrever como se existisse: depoimento, `aggregateRating`/`review` no schema, preço de
tabela, anos de mercado, número de obras, ponto de referência ou condomínio não verificado.

Permitido e desejável: detalhe técnico do ofício (processo, material, norma), perfil geral e
verificável do bairro, e os 4 diferenciais declarados pelo dono.

Quando faltar informação, a saída é escrever menos ou perguntar ao dono.

---

## 4. Estrutura de pastas

```
nobrecor/
├── CLAUDE.md · agentes.md
├── .claude/
│   ├── agents/          seo-auditor · schema-auditor · copywriter-hiperlocal
│   │                    deploy-verifier · fase-executor
│   ├── commands/        /ci · /deploy · /onda
│   └── rules/           conteudo.md · marca.md · nextjs.md
├── .github/
│   ├── workflows/ci.yml
│   └── dependabot.yml
├── .husky/pre-push      lint + type-check + test + rotas + build
├── docs/
│   └── relatorio-pesquisa.md      pesquisa de concorrentes, SEO e serviços
├── public/
│   ├── llms.txt                   descrição do site para IAs
│   ├── images/marca/              logos finais (SVG + PNG)
│   └── images/portfolio/          ⬅ fotos antes/depois entram aqui
├── scripts/
│   ├── check-rotas.mjs            slugs, colisões, placeholders
│   ├── check-thin-content.mjs     palavras únicas por tipo de página
│   └── ping-indexnow.mjs          ping para Bing/Yandex no postbuild
├── src/
│   ├── app/
│   │   ├── page.tsx                       home
│   │   ├── servicos/ + servicos/[slug]/    20 serviços
│   │   ├── bairros/  + bairros/[slug]/     81 bairros
│   │   ├── [landing]/                      matriz serviço-bairro (105 hoje)
│   │   ├── sobre/ · contato/
│   │   ├── sitemap.ts · robots.ts · not-found.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/      Header · Footer · PageWrapper
│   │   ├── sections/    Hero · PainelMarca · Marquee · Diferenciais · Servicos
│   │   │                Processo · Bairros · Portfolio · Faq · Cta
│   │   ├── ui/          Reveal · TituloSecao · CardServico · IconeServico · Logo
│   │   ├── whatsapp/    FloatingWhatsApp
│   │   └── analytics/   GoogleAnalytics
│   ├── content/         servicos.ts · bairros.ts · regioes.ts
│   │                    faq-home.ts · portfolio.ts
│   ├── lib/             business.ts · seo.ts · schema.ts
│   │                    landing-pages.ts · analytics.ts
│   └── styles/globals.css
└── tests/conteudo.test.ts
```

---

## 5. Base de bairros

81 entradas em `src/content/bairros.ts`, agrupadas nas 7 regiões urbanas da PLANURB.
Procedência de cada lista: `docs/bairros-campo-grande.md`.

**Decisões registradas (pedidos do dono, 16/08/2026):**
- "Los Angeles" e "Aquários" **não entram** (há teste que garante isso).
- "Altos da Afonso Pena" **entra** com `oficialPlanurb: false` — não é bairro da PLANURB, mas é
  termo de busca forte no alto padrão.
- "Parque dos Poderes" é *alias* do bairro oficial "Veraneio".

**Tiers** (governam ordem de publicação, prioridade no sitemap e destaque na home):

| Tier | O que é | Qtd |
|---|---|---|
| 1 | Área nobre — foco comercial declarado | 15 |
| 2 | Classe média-alta, bairros consolidados | ~24 |
| 3 | Demais bairros (cobertura de cauda longa) | ~42 |

Os 15 do tier 1: Chácara Cachoeira · Carandá Bosque · Santa Fé · Mata do Jacinto ·
Veraneio (Parque dos Poderes) · Chácara dos Poderes · Novos Estados · Autonomista ·
Altos da Afonso Pena · Jardim dos Estados · Itanhangá · Monte Líbano · Centro ·
Vilas Boas · Rita Vieira.

---

## 6. SEO programático: a matriz e o rollout

20 serviços × 81 bairros = **1.620 combinações possíveis**. Publicar tudo de uma vez é receita de
thin content e de penalização. A geração é **por onda**, controlada por `ONDA_ATIVA` em
`src/lib/landing-pages.ts`.

| Onda | Regra | Páginas |
|---|---|---|
| **1 (ativa)** | serviços estrela × bairros tier 1 | 105 |
| 2 | serviços estrela × bairros tier 2 | ~168 |
| 3 | serviços 'alto' × tier 1 e 2 | ~234 |
| 4 | resto da matriz | ~1.113 |

**Gates para liberar a próxima onda** (todos verdadeiros, sem exceção):

- [ ] ≥ 90% das páginas da onda atual indexadas no Search Console
- [ ] CTR médio da onda atual ≥ 1,0%
- [ ] zero páginas em "Rastreada, não indexada" há mais de 30 dias
- [ ] `npm run check:thin-content` verde
- [ ] Lighthouse mobile ≥ 90 em amostra de 10 páginas

Use `/onda` para ver o status.

---

## 7. Arquitetura de SEO e AI Search

### Arquivos de robô

- **`src/app/robots.ts`** → robots.txt com 24 bots liberados **nominalmente**, incluindo os de IA
  (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot, Google-Extended, Applebot-Extended…). Vários
  só respeitam a regra quando o user-agent aparece pelo nome — o `*` não basta.
- **`src/app/sitemap.ts`** → sitemap.xml. `lastModified` é uma **constante manual**, não
  `new Date()`: data automática faz o Google ver "tudo novo" a cada deploy e dilui o sinal de
  frescor. Prioridade escalonada por tier de bairro e por prioridade de serviço.
- **`public/llms.txt`** → descrição do site em Markdown para LLMs.

### Títulos e hierarquia (checklist por página)

- `<title>` único, ≤ **60 caracteres**. Para as landings use `buildTituloLanding()`, que encurta
  sozinho por etapas em vez de deixar o Google cortar no meio.
- `<meta description>` ≤ 160 caracteres, com benefício + CTA + localização.
- **Um** `<h1>`, com a palavra-chave da página.
- `<h2>` por seção, de preferência em formato de pergunta. `<h3>` nos blocos e nas perguntas do FAQ.
  Nunca pular nível.
- `canonical` definido **na própria página** — o root layout não define de propósito (seria
  herdado e faria toda rota declarar a home como canônica).
- `openGraph` sempre com `images`: o Next não faz merge profundo, e declarar OG sem imagem numa
  página apaga a do root.

### Schema (JSON-LD)

Builders em `src/lib/schema.ts`, injetados pelo helper `jsonLd()`:
`HousePainter/LocalBusiness` · `Organization` · `WebSite` · `Service` · `FAQPage` · `BreadcrumbList`.

Duas travas que há teste garantindo:
- **zero `aggregateRating`/`review`** — nota inventada gera ação manual, e a punição derruba os
  rich results do site inteiro;
- **`areaServed` sempre nominal** (regra SAB do Google: "MS inteiro" é proibido).

### FAQ em `<details>`, não em accordion

Decisão técnica com impacto direto em SEO: num accordion controlado por estado, só a resposta
aberta existe no HTML. Com `<details>`, todas ficam no DOM desde o primeiro byte — crawler, IA,
leitor de tela e Ctrl+F acham tudo. Foi o que levou as páginas de serviço de ~580 para ~700+
palavras reais. **Não voltar para accordion em React.**

---

## 8. Comandos

```bash
npm run dev                  # servidor local
npm run ci                   # lint + type-check + test + rotas + build  ⬅ antes de todo push
npm run type-check           # tsc --noEmit (TypeScript 7)
npm test -- --run            # vitest
npm run check:rotas          # slugs, colisões, placeholders
npm run check:thin-content   # palavras únicas por página (precisa do dev rodando)
npm run build
```

Slash commands: `/ci` · `/deploy` · `/onda`.

### Por que oxlint no lugar do ESLint

O `typescript-eslint` **não suporta TypeScript 7** (issue #10940): o TS 7 é a reescrita em Go e a
API interna que ele usa mudou, então há um `throw` explícito de versão no carregamento. Como o
dono pediu o TypeScript na última versão, trocamos o linter em vez de rebaixar o compilador:
**oxlint** (Rust, não depende da API do TS), configurado em `.oxlintrc.json` com as regras de
Next, React Hooks e acessibilidade. A checagem de tipos continua com `tsc --noEmit`.

Quando o typescript-eslint suportar TS 7, dá para voltar ao `eslint-config-next`.

---

## 9. Animações

Todas respeitam `prefers-reduced-motion` (bloco no fim de `globals.css`).

| Animação | Onde |
|---|---|
| `Reveal` (IntersectionObserver) | seções e cards, com delay escalonado |
| `animate-hero-in` | entrada escalonada da hero |
| `animate-marquee` | faixa de serviços abaixo da hero (pausa no hover) |
| `animate-fundo` | gradiente lento nas seções azuis |
| `animate-pulso-whatsapp` | anel pulsante do botão flutuante |
| `.btn-dourado::after` | brilho atravessando o CTA |
| `.link-sublinhado` | sublinhado dourado crescendo no hover |

`Reveal` nasce **visível** quando não há JS ou quando o usuário pede menos movimento: animação
nunca pode esconder texto do crawler.

---

## 10. TAREFAS PENDENTES (ordem de prioridade)

1. **Telefone real** — trocar `5567999999999` em `src/lib/business.ts` (`phone`,
   `phoneFormatted`, `whatsappNumero`). O `check:rotas` avisa enquanto estiver placeholder.
2. **Registrar `nobrecor.com.br`** no registro.br (~R$40/ano) + garantir o @ no Instagram.
3. **Deploy na Vercel** e apontar o domínio. Definir `NEXT_PUBLIC_GA_ID`. Rodar `deploy-verifier`.
4. **Fotos e vídeo de obra** — ver instruções no topo de `src/content/portfolio.ts`. A seção de
   portfólio só aparece quando houver obra cadastrada (nunca colocar banco de imagens como obra
   da empresa). Quando houver imagem real, ela substitui o `PainelMarca` na hero da home.
5. **Perfil da Empresa no Google** — categoria "Pintor", área Campo Grande, fotos toda semana,
   pedido de avaliação 5★ ao fim de cada obra. É o que mais move o ranking local.
6. **Search Console + Bing Webmaster** — verificar e enviar o sitemap.
7. **Copy hiperlocal dos 66 bairros restantes** — agente `copywriter-hiperlocal`, tier 2 primeiro.
8. **Blog** — ainda não migrado. Os 3 artigos SEO estão em
   `~/Downloads/nobrecor-projeto/site/blog/`.
9. **Depoimentos reais** quando existirem (com `Review` no schema só então).
10. **Onda 2 da matriz** — só depois dos gates da seção 6.

---

## 11. O que NÃO fazer

- Não inventar depoimento, nota, preço, ponto de referência ou obra.
- Não subir `ONDA_ATIVA` sem os gates de indexação.
- Não trocar `SITE_URL` por env var por ambiente: canonical de preview destrói indexação.
- Não usar `new Date()` no `lastModified` do sitemap.
- Não voltar o FAQ para accordion controlado por estado.
- Não trocar o texto do botão dourado para branco.
- Não usar verde em nada além do WhatsApp.
- Não usar `HUSKY=0` nem `--no-verify`.
- Não rebaixar o TypeScript para fazer o ESLint funcionar (foi decisão consciente).

---

## 12. Serviços removidos do catálogo

Por decisão do dono em 16/08/2026, saíram do catálogo:

- **Textura projetada e rústica** (`textura-projetada`)
- **Cimento queimado** (`cimento-queimado`)

Não reintroduzir sem pedido explícito. As menções em copy foram substituídas por
grafiato, marmorato e pintura decorativa, que continuam no catálogo.

### Nota sobre `jsx-a11y/prefer-tag-over-role`

A regra está desligada em `.oxlintrc.json`. Ela assume HTML e sugere trocar
`role="img"` por `<img>`, mas em **SVG inline** `role="img"` + `aria-label` é
justamente o padrão recomendado de acessibilidade — seguir a regra significaria
perder o SVG (e a logo vetorial da marca).

---

## 13. Decisões de design registradas (16/08/2026)

| Decisão | Motivo |
|---|---|
| Bebas Neue no lugar de Marcellus | Pedido do dono, por referência a grotescas condensadas |
| Vídeo da hero removido | Arquivo corrompido: travava carregando até aberto direto no navegador |
| `PainelMarca` no lugar do vídeo | Ocupa o espaço de forma intencional até haver foto de obra real |
| Logo redesenhada com as 5 facetas | A versão anterior era contorno; a marca real é diamante preenchido |
| Títulos de seção centralizados | Padrão `TituloSecao`; evita o vazio à direita em container largo |
| FAQ em `<details>` | Conteúdo no DOM desde o primeiro byte (ver §7) |
| `Reveal` com `rootMargin` positivo | Dispara antes de entrar na viewport; margem negativa deixava o bloco em branco na rolagem rápida |
| Cards de serviço com ícone + "Inclui:" | Referência: altacor.com.br. Deixa o card legível de relance |
