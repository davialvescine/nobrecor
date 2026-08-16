# Regra: convenções Next.js 16 / TypeScript 7 neste projeto

## Stack fixa

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript 7 · Tailwind CSS 4 (CSS-first,
`@theme` em `src/styles/globals.css`) · lucide-react · Vercel.

Toda dependência nova precisa de justificativa. O site é 100% estático — nada de banco,
nada de API route sem necessidade real.

## Padrões

- **Server Component por padrão.** `'use client'` só onde há estado ou evento: menu mobile,
  accordion do FAQ, botões com tracking de analytics.
- **`params` é Promise** no App Router do Next 16: `const { slug } = await params`.
- **`generateStaticParams`** em toda rota dinâmica — o site inteiro é SSG.
- **`next/image`** obrigatório, com `sizes` responsivo e `priority` no elemento de LCP.
- **`next/font`** para as fontes — evita CLS.
- **Metadata:** sempre pelo builder `buildMetadata()` de `src/lib/seo.ts`. Cada página define
  o SEU `canonical`; o root layout NÃO define de propósito (seria herdado e faria toda rota
  declarar a home como canônica).
- **JSON-LD:** sempre pelos builders de `src/lib/schema.ts`, injetado com o helper `jsonLd()`.

## Conteúdo

Serviços e bairros vivem em `src/content/` e são a fonte única. Nunca duplicar nome de bairro
ou de serviço em componente — importar do content.

## Nomes

- Componentes: `PascalCase.tsx` · libs: `camelCase.ts` · slugs de rota: `kebab-case` sem acento.
- Commits: Conventional Commits em português, sem emoji.
