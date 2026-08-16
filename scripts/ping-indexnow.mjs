#!/usr/bin/env node
/**
 * Avisa Bing e Yandex que o site mudou (protocolo IndexNow).
 *
 * Roda no `postbuild` e falha em silêncio de propósito: um ping que não sai
 * nunca pode quebrar um deploy.
 *
 * ⚠️ O HOST é lido de `src/lib/business.ts`, NÃO escrito à mão. A versão
 * anterior tinha `nobrecor.com.br` fixo e ficou apontando para um domínio que
 * nunca existiu depois que o domínio foi decidido (16/08/2026). Ping para host
 * errado é rejeitado pelo IndexNow e ninguém percebe, porque o script é
 * silencioso por natureza.
 *
 * Para ativar:
 *   1. gerar uma chave (32+ chars hex) e definir INDEXNOW_KEY na Vercel
 *   2. publicar `public/<chave>.txt` contendo a própria chave
 */

import { readFileSync } from 'node:fs'

const CHAVE = process.env.INDEXNOW_KEY

if (!CHAVE) {
  console.log('ℹ  IndexNow desativado (INDEXNOW_KEY não definida). Pulando.')
  process.exit(0)
}

// Lê o `url:` do BUSINESS sem importar TypeScript: o script roda em Node puro.
const business = readFileSync(new URL('../src/lib/business.ts', import.meta.url), 'utf8')
const achado = business.match(/url:\s*'https:\/\/([^']+)'/)

if (!achado) {
  console.warn('⚠  IndexNow: não consegui ler a URL de src/lib/business.ts. Pulando.')
  process.exit(0)
}

const HOST = achado[1]
const url = `https://api.indexnow.org/indexnow?url=https://${HOST}&key=${CHAVE}`

try {
  const res = await fetch(url)
  console.log(`IndexNow → ${HOST} → ${res.status} ${res.statusText}`)
} catch (erro) {
  console.warn(`⚠  IndexNow falhou (ignorado): ${erro.message}`)
}
