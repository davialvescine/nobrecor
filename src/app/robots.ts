import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/business'

/**
 * robots.txt.
 *
 * Os bots de IA são liberados EXPLICITAMENTE (não basta o `*`): vários deles
 * só respeitam a regra quando o próprio user-agent aparece nomeado. Em 2026,
 * aparecer no ChatGPT, Perplexity, Claude e Gemini vale tanto quanto ranquear
 * no Google — e bloquear esses bots é abrir mão do canal inteiro.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },

      // Buscadores tradicionais
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'DuckDuckBot', allow: '/' },
      { userAgent: 'YandexBot', allow: '/' },

      // Bots de IA / respostas generativas
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-SearchBot', allow: '/' },
      { userAgent: 'Claude-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'Amazonbot', allow: '/' },
      { userAgent: 'Meta-ExternalAgent', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'Bytespider', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Diffbot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'MistralAI-User', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
