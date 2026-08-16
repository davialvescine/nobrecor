/**
 * Matriz serviço × bairro (SEO programático).
 *
 * O catálogo completo seria 22 serviços × 81 bairros = 1.782 páginas. Publicar
 * tudo de uma vez é receita de thin content e de penalização — por isso a
 * geração é POR ONDA, e a onda ativa é controlada por `ONDA_ATIVA`.
 *
 * Estratégia aprovada (foco em ÁREA NOBRE):
 *   Onda 1 → serviços estrela × bairros tier 1  (área nobre — prioridade máxima)
 *   Onda 2 → serviços estrela × bairros tier 2
 *   Onda 3 → serviços 'alto'   × bairros tier 1 e 2
 *   Onda 4 → o restante da matriz (cauda longa)
 *
 * Só avançar de onda depois de: ≥90% das páginas da onda anterior indexadas no
 * Search Console, CTR médio ≥ 1% e `npm run check:thin-content` verde.
 */

import { SERVICOS, type Servico } from '@/content/servicos'
import { BAIRROS, type Bairro } from '@/content/bairros'

export type Onda = 1 | 2 | 3 | 4

/** Onda publicada hoje. Aumentar SOMENTE após os gates de indexação. */
export const ONDA_ATIVA: Onda = 1

export interface LandingPage {
  slug: string
  servicoSlug: string
  bairroSlug: string
  onda: Onda
}

function ondaDe(servico: Servico, bairro: Bairro): Onda {
  if (servico.prioridade === 'estrela' && bairro.tier === 1) return 1
  if (servico.prioridade === 'estrela' && bairro.tier === 2) return 2
  if (servico.prioridade === 'alto' && bairro.tier <= 2) return 3
  return 4
}

/** Matriz inteira, com a onda de cada combinação. */
export function getTodasLandingPages(): LandingPage[] {
  const pages: LandingPage[] = []
  for (const servico of SERVICOS) {
    for (const bairro of BAIRROS) {
      pages.push({
        slug: `${servico.slug}-${bairro.slug}`,
        servicoSlug: servico.slug,
        bairroSlug: bairro.slug,
        onda: ondaDe(servico, bairro),
      })
    }
  }
  return pages
}

/** Apenas as páginas liberadas para publicação hoje (onda ≤ ONDA_ATIVA). */
export function getLandingPages(): LandingPage[] {
  return getTodasLandingPages().filter((lp) => lp.onda <= ONDA_ATIVA)
}

/**
 * Desmonta `pintura-de-fachada-chacara-cachoeira` em serviço + bairro.
 *
 * Os slugs são testados do MAIS LONGO para o mais curto: sem isso, um bairro
 * cujo slug é sufixo de outro (ex.: `centro` vs `centro-oeste`) casaria errado.
 */
export function parseLandingSlug(
  slug: string
): { servicoSlug: string; bairroSlug: string } | null {
  const bairrosOrdenados = [...BAIRROS].sort((a, b) => b.slug.length - a.slug.length)
  const servicosSlugs = new Set(SERVICOS.map((s) => s.slug))

  for (const bairro of bairrosOrdenados) {
    const sufixo = `-${bairro.slug}`
    if (slug.endsWith(sufixo)) {
      const servicoSlug = slug.slice(0, -sufixo.length)
      if (servicosSlugs.has(servicoSlug)) {
        return { servicoSlug, bairroSlug: bairro.slug }
      }
    }
  }
  return null
}

/** Estatística usada no CLAUDE.md e no relatório de rollout. */
export function getEstatisticasMatriz() {
  const todas = getTodasLandingPages()
  const porOnda = ([1, 2, 3, 4] as Onda[]).map((onda) => ({
    onda,
    total: todas.filter((lp) => lp.onda === onda).length,
  }))
  return {
    totalMatriz: todas.length,
    publicadas: getLandingPages().length,
    ondaAtiva: ONDA_ATIVA,
    porOnda,
  }
}
