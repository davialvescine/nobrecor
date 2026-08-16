#!/usr/bin/env node
/**
 * Gate anti-thin-content.
 *
 * Mede o texto do `<main>` de cada página (header, footer e JSON-LD ficam de
 * fora, senão o boilerplate compartilhado mascararia página fina) e reprova
 * quem estiver abaixo do mínimo do seu tipo.
 *
 * Dois princípios que explicam os números:
 *
 * 1. O mínimo varia com a INTENÇÃO da página, não é um número único. Uma página
 *    de "pintura de alto padrão" precisa responder muito mais dúvida do que uma
 *    de "demarcação de pisos", que é um serviço de escopo estreito. Cobrar 700
 *    palavras da segunda só produziria enrolação, que é exatamente o que o
 *    Google penaliza.
 *
 * 2. O gate só cobra bairro com `copyRevisada: true`. Os demais estão na fila do
 *    agente `copywriter-hiperlocal` e aparecem como PENDENTE no relatório, nunca
 *    como aprovado silencioso.
 *
 * Uso:
 *   npm run dev                        # em outro terminal
 *   npm run check:thin-content [porta]
 */

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const PORTA = process.argv[2] || process.env.PORT || '3000'
const BASE = `http://localhost:${PORTA}`
const raiz = process.cwd()

const MINIMOS = {
  home: 400,
  'servico-estrela': 700,
  'servico-alto': 600,
  'servico-medio': 500,
  bairro: 500,
  landing: 450,
}

// ── amostra montada a partir do conteúdo real ────────────────────────────────

function extrairBlocos(arquivo) {
  const texto = readFileSync(join(raiz, arquivo), 'utf-8')
  const blocos = []
  const regex = /slug: '([^']+)',([\s\S]*?)(?=\n  \{\n    slug: '|\n\]\n)/g
  let m
  while ((m = regex.exec(texto)) !== null) blocos.push({ slug: m[1], corpo: m[2] })
  return blocos
}

const servicos = extrairBlocos('src/content/servicos.ts').map((b) => ({
  slug: b.slug,
  prioridade: b.corpo.match(/prioridade: '([^']+)'/)?.[1] ?? 'medio',
}))

const bairros = extrairBlocos('src/content/bairros.ts').map((b) => ({
  slug: b.slug,
  revisada: /copyRevisada: true/.test(b.corpo),
}))

const bairrosRevisados = bairros.filter((b) => b.revisada)
const bairrosPendentes = bairros.filter((b) => !b.revisada)

/** Pega o primeiro e o último de cada grupo: os casos limite são os que quebram. */
function pontas(lista) {
  if (lista.length <= 2) return lista
  return [lista[0], lista[Math.floor(lista.length / 2)], lista[lista.length - 1]]
}

const amostra = [
  { caminho: '/', tipo: 'home' },
  ...['estrela', 'alto', 'medio'].flatMap((prioridade) =>
    pontas(servicos.filter((s) => s.prioridade === prioridade)).map((s) => ({
      caminho: `/servicos/${s.slug}`,
      tipo: `servico-${prioridade}`,
    }))
  ),
  ...pontas(bairrosRevisados).map((b) => ({ caminho: `/bairros/${b.slug}`, tipo: 'bairro' })),
  { caminho: '/pintura-de-fachada-jardim-dos-estados', tipo: 'landing' },
  { caminho: '/grafiato-vilas-boas', tipo: 'landing' },
  { caminho: '/pintura-comercial-centro', tipo: 'landing' },
]

// ── medição ─────────────────────────────────────────────────────────────────

async function textoDaPagina(caminho) {
  const res = await fetch(`${BASE}${caminho}`)
  if (!res.ok) throw new Error(`respondeu ${res.status}`)
  const html = await res.text()

  const corpo = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html

  return corpo
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function contarPalavras(texto) {
  return texto.split(' ').filter((p) => p.length > 1).length
}

async function main() {
  console.log(`Medindo conteúdo único em ${BASE}\n`)
  const falhas = []

  // Em série de propósito: paralelizar sobrecarrega o dev server e distorce a medição.
  for (const { caminho, tipo } of amostra) {
    try {
      const palavras = contarPalavras(await textoDaPagina(caminho))
      const minimo = MINIMOS[tipo]
      const ok = palavras >= minimo
      console.log(
        `${ok ? '✓' : '✗'} ${String(palavras).padStart(5)} palavras (mín ${String(minimo).padStart(3)})  ${caminho}`
      )
      if (!ok) falhas.push(`${caminho}: ${palavras}/${minimo} palavras`)
    } catch (erro) {
      console.log(`✗ ERRO  ${caminho} — ${erro.message}`)
      falhas.push(`${caminho}: ${erro.message}`)
    }
  }

  console.log(
    `\nBairros com copy hiperlocal revisada: ${bairrosRevisados.length}/${bairros.length}`
  )
  if (bairrosPendentes.length > 0) {
    console.log(
      `⚠  ${bairrosPendentes.length} bairros AGUARDANDO copy (não são cobrados por este gate).`
    )
    console.log(
      `   Fila do agente copywriter-hiperlocal: ${bairrosPendentes.slice(0, 6).map((b) => b.slug).join(', ')}${bairrosPendentes.length > 6 ? ', ...' : ''}`
    )
  }

  if (falhas.length > 0) {
    console.error('\n✗ check:thin-content FALHOU\n')
    for (const f of falhas) console.error(`  - ${f}`)
    console.error('\nO servidor de dev está rodando? `npm run dev`')
    process.exit(1)
  }

  console.log('\n✓ check:thin-content OK')
}

main()
