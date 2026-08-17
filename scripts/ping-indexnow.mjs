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

/*
  Envia a LISTA de URLs, não só a home.

  A versão anterior mandava sempre `url=https://<host>`, ou seja, avisava que a
  home mudou e mais nada. Os 20 serviços, os 81 bairros e as 105 landings nunca
  eram submetidos. O retorno 202 confirmava só que o ping foi aceito, o que dava
  a impressão de que estava tudo indexado — clássico verde enganoso.

  O protocolo aceita submissão em lote por POST com `urlList` (até 10.000 URLs).
  A fonte é o sitemap que o próprio build acabou de gerar, então a lista
  acompanha sozinha a liberação das próximas ondas.
*/
function urlsDoSitemap() {
  for (const caminho of ['../.next/server/app/sitemap.xml.body', '../.next/server/app/sitemap.xml']) {
    try {
      const xml = readFileSync(new URL(caminho, import.meta.url), 'utf8')
      const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
      if (urls.length > 0) return urls
    } catch {
      // arquivo ausente: tenta o próximo
    }
  }
  return []
}

const urlList = urlsDoSitemap()

if (urlList.length === 0) {
  console.warn('⚠  IndexNow: sitemap do build não encontrado. Avisando só a home.')
}

try {
  const res =
    urlList.length > 0
      ? await fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({
            host: HOST,
            key: CHAVE,
            keyLocation: `https://${HOST}/${CHAVE}.txt`,
            urlList,
          }),
        })
      : await fetch(`https://api.indexnow.org/indexnow?url=https://${HOST}&key=${CHAVE}`)

  const quantas = urlList.length > 0 ? `${urlList.length} URLs` : 'só a home'
  console.log(`IndexNow → ${HOST} → ${quantas} → ${res.status} ${res.statusText}`)
} catch (erro) {
  console.warn(`⚠  IndexNow falhou (ignorado): ${erro.message}`)
}
