import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/business'
import { SERVICOS } from '@/content/servicos'
import { BAIRROS } from '@/content/bairros'
import { getLandingPages } from '@/lib/landing-pages'

/**
 * Data da última revisão ESTRUTURAL de conteúdo. Atualizar à mão quando a copy
 * ou a estrutura mudar de verdade.
 *
 * Não usar `new Date()`: isso faria o Google ver "tudo atualizado agora" a cada
 * deploy, o que dilui o sinal de frescor em vez de reforçá-lo.
 */
const LASTMOD = '2026-08-16'

export default function sitemap(): MetadataRoute.Sitemap {
  const estaticas: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: LASTMOD, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/servicos`, lastModified: LASTMOD, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/bairros`, lastModified: LASTMOD, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${SITE_URL}/sobre`, lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contato`, lastModified: LASTMOD, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const servicos: MetadataRoute.Sitemap = SERVICOS.map((s) => ({
    url: `${SITE_URL}/servicos/${s.slug}`,
    lastModified: LASTMOD,
    changeFrequency: 'weekly' as const,
    // Serviço estrela pesa mais na hierarquia interna.
    priority: s.prioridade === 'estrela' ? 0.9 : s.prioridade === 'alto' ? 0.8 : 0.7,
  }))

  // Prioridade escalonada por tier: a área nobre é o foco comercial declarado.
  const bairros: MetadataRoute.Sitemap = BAIRROS.map((b) => ({
    url: `${SITE_URL}/bairros/${b.slug}`,
    lastModified: LASTMOD,
    changeFrequency: 'monthly' as const,
    priority: b.tier === 1 ? 0.85 : b.tier === 2 ? 0.7 : 0.6,
  }))

  const landings: MetadataRoute.Sitemap = getLandingPages().map((lp) => ({
    url: `${SITE_URL}/${lp.slug}`,
    lastModified: LASTMOD,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...estaticas, ...servicos, ...bairros, ...landings]
}
