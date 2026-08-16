#!/usr/bin/env node
/**
 * Avisa Bing e Yandex que o site mudou (protocolo IndexNow).
 *
 * Roda no `postbuild` e falha em silêncio de propósito: um ping que não sai
 * nunca pode quebrar um deploy.
 *
 * Para ativar:
 *   1. gerar uma chave (32+ chars hex) e definir INDEXNOW_KEY
 *   2. publicar `public/<chave>.txt` contendo a própria chave
 */

const CHAVE = process.env.INDEXNOW_KEY
const HOST = 'nobrecor.com.br'

if (!CHAVE) {
  console.log('ℹ  IndexNow desativado (INDEXNOW_KEY não definida). Pulando.')
  process.exit(0)
}

const url = `https://api.indexnow.org/indexnow?url=https://${HOST}&key=${CHAVE}`

try {
  const res = await fetch(url)
  console.log(`IndexNow → ${res.status} ${res.statusText}`)
} catch (erro) {
  console.warn(`⚠  IndexNow falhou (ignorado): ${erro.message}`)
}
