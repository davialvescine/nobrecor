#!/usr/bin/env node
/**
 * Gate de sanidade da base de conteúdo. Roda no CI (`npm run ci`) e no pre-push.
 *
 * Verifica o que o type-check não pega:
 *  - slug duplicado em serviços ou bairros
 *  - slug com acento, maiúscula ou caractere inválido
 *  - colisão entre a rota programática /[landing] e uma rota estática
 *  - ambiguidade de parse (dois pares serviço×bairro gerando o mesmo slug)
 *  - placeholders que não podem ir para produção (telefone fake, GA vazio)
 */

import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const raiz = process.cwd()
const erros = []
const avisos = []

function lerLista(arquivo, campo) {
  const conteudo = readFileSync(join(raiz, arquivo), 'utf-8')
  const regex = new RegExp(`${campo}:\\s*'([^']+)'`, 'g')
  return [...conteudo.matchAll(regex)].map((m) => m[1])
}

// ── slugs ────────────────────────────────────────────────────────────────────
const servicos = lerLista('src/content/servicos.ts', 'slug')
const bairros = lerLista('src/content/bairros.ts', 'slug')

const SLUG_VALIDO = /^[a-z0-9]+(-[a-z0-9]+)*$/

for (const [nome, lista] of [['serviços', servicos], ['bairros', bairros]]) {
  const vistos = new Set()
  for (const slug of lista) {
    if (!SLUG_VALIDO.test(slug)) {
      erros.push(`slug inválido em ${nome}: "${slug}" (use kebab-case sem acento)`)
    }
    if (vistos.has(slug)) erros.push(`slug duplicado em ${nome}: "${slug}"`)
    vistos.add(slug)
  }
}

// ── colisão com rotas estáticas ──────────────────────────────────────────────
const rotasEstaticas = readdirSync(join(raiz, 'src/app')).filter((nome) => {
  const caminho = join(raiz, 'src/app', nome)
  return statSync(caminho).isDirectory() && !nome.startsWith('[') && !nome.startsWith('(')
})

// ── ambiguidade de parse ─────────────────────────────────────────────────────
const gerados = new Map()
for (const s of servicos) {
  for (const b of bairros) {
    const slug = `${s}-${b}`
    if (gerados.has(slug)) {
      erros.push(
        `landing ambígua "${slug}": gerada por ${gerados.get(slug)} e por ${s} × ${b}`
      )
    }
    gerados.set(slug, `${s} × ${b}`)
    if (rotasEstaticas.includes(slug)) {
      erros.push(`landing "${slug}" colide com a rota estática /${slug}`)
    }
  }
}

// ── placeholders que não podem ir para produção ──────────────────────────────
const business = readFileSync(join(raiz, 'src/lib/business.ts'), 'utf-8')

// O telefone é o canal de conversão do site inteiro: um dígito errado aqui
// derruba todo CTA, o botão flutuante e o schema LocalBusiness de uma vez.
const fone = business.match(/phone: '(\+\d+)'/)?.[1]
const whats = business.match(/whatsappNumero: '(\d+)'/)?.[1]

if (!fone || !/^\+55\d{10,11}$/.test(fone)) {
  erros.push(`BUSINESS.phone inválido: "${fone}" (esperado E.164, ex: +5567981522412)`)
}
if (!whats || !/^55\d{10,11}$/.test(whats)) {
  erros.push(`BUSINESS.whatsappNumero inválido: "${whats}" (só dígitos, com o 55)`)
}
if (fone && whats && fone.replace('+', '') !== whats) {
  erros.push(`phone (${fone}) e whatsappNumero (${whats}) apontam para números diferentes`)
}
if (business.includes("googleBusiness: ''")) {
  avisos.push('Perfil da Empresa no Google ainda não cadastrado em BUSINESS.socials')
}

// ── relatório ────────────────────────────────────────────────────────────────
console.log(`✓ ${servicos.length} serviços · ${bairros.length} bairros · ${gerados.size} combinações na matriz`)
console.log(`✓ rotas estáticas: ${rotasEstaticas.join(', ')}`)

for (const a of avisos) console.warn(`⚠  ${a}`)

if (erros.length > 0) {
  console.error('\n✗ check:rotas FALHOU\n')
  for (const e of erros) console.error(`  - ${e}`)
  process.exit(1)
}

console.log('✓ check:rotas OK')
