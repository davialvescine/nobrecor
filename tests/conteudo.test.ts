import { describe, it, expect } from 'vitest'
import { SERVICOS, SERVICOS_ESTRELA } from '@/content/servicos'
import { BAIRROS, BAIRROS_PRIORITARIOS, getBairro } from '@/content/bairros'
import { REGIOES_URBANAS } from '@/content/regioes'
import {
  parseLandingSlug,
  getLandingPages,
  getTodasLandingPages,
  ONDA_ATIVA,
} from '@/lib/landing-pages'
import { buildMetadata, buildTituloLanding, TITLE_MAX } from '@/lib/seo'
import { buildLocalBusinessSchema, buildFaqSchema } from '@/lib/schema'
import {
  buildWhatsAppLink,
  buildWhatsAppMessage,
  MENSAGEM_PADRAO,
} from '@/lib/business'

const SLUG_VALIDO = /^[a-z0-9]+(-[a-z0-9]+)*$/

describe('catálogo de serviços', () => {
  it('tem slugs válidos e únicos', () => {
    const slugs = SERVICOS.map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(SLUG_VALIDO)
  })

  it('tem pelo menos um serviço estrela por grupo relevante', () => {
    expect(SERVICOS_ESTRELA.length).toBeGreaterThanOrEqual(5)
  })

  it('todo serviço tem FAQ e benefícios (senão a página nasce fina)', () => {
    for (const s of SERVICOS) {
      expect(s.faq.length, `${s.slug} sem FAQ`).toBeGreaterThanOrEqual(2)
      expect(s.beneficios.length, `${s.slug} sem benefícios`).toBeGreaterThanOrEqual(4)
      expect(s.descricaoLonga.length, `${s.slug} com descrição curta`).toBeGreaterThan(300)
    }
  })
})

describe('base de bairros', () => {
  it('tem slugs válidos e únicos', () => {
    const slugs = BAIRROS.map((b) => b.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const slug of slugs) expect(slug).toMatch(SLUG_VALIDO)
  })

  it('todo bairro aponta para uma região urbana existente', () => {
    const regioes = new Set(REGIOES_URBANAS.map((r) => r.slug))
    for (const b of BAIRROS) {
      expect(regioes.has(b.regiao), `${b.slug} → região inexistente "${b.regiao}"`).toBe(true)
    }
  })

  it('não contém os bairros excluídos pelo dono', () => {
    const nomes = BAIRROS.map((b) => b.nome.toLowerCase())
    expect(nomes).not.toContain('los angeles')
    expect(nomes).not.toContain('aquários')
    expect(nomes).not.toContain('aquarios')
  })

  it('contém as áreas nobres exigidas', () => {
    for (const slug of [
      'chacara-cachoeira',
      'caranda-bosque',
      'jardim-dos-estados',
      'centro',
      'veraneio',
      'altos-da-afonso-pena',
      'santa-fe',
    ]) {
      const bairro = getBairro(slug)
      expect(bairro, `bairro "${slug}" ausente`).toBeDefined()
      expect(bairro!.tier, `${slug} deveria ser tier 1`).toBe(1)
    }
  })

  it('marca como não-oficial o que não é bairro da PLANURB', () => {
    expect(getBairro('altos-da-afonso-pena')!.oficialPlanurb).toBe(false)
    expect(getBairro('chacara-cachoeira')!.oficialPlanurb).toBe(true)
  })

  it('Parque dos Poderes é encontrável por alias', () => {
    const veraneio = getBairro('veraneio')!
    expect(veraneio.aliases).toContain('parque dos poderes')
  })
})

describe('matriz serviço × bairro', () => {
  it('a onda ativa publica só o que foi liberado', () => {
    const publicadas = getLandingPages()
    const todas = getTodasLandingPages()
    expect(publicadas.length).toBeLessThan(todas.length)
    for (const lp of publicadas) expect(lp.onda).toBeLessThanOrEqual(ONDA_ATIVA)
  })

  it('a onda 1 é serviço estrela × área nobre', () => {
    const onda1 = getTodasLandingPages().filter((lp) => lp.onda === 1)
    expect(onda1.length).toBe(SERVICOS_ESTRELA.length * BAIRROS_PRIORITARIOS.length)
  })

  it('todo slug publicado volta a desmontar no par correto', () => {
    for (const lp of getLandingPages()) {
      const parsed = parseLandingSlug(lp.slug)
      expect(parsed, `não desmontou: ${lp.slug}`).not.toBeNull()
      expect(parsed!.servicoSlug).toBe(lp.servicoSlug)
      expect(parsed!.bairroSlug).toBe(lp.bairroSlug)
    }
  })

  it('desambigua bairro cujo slug é sufixo de outro', () => {
    // "centro" é sufixo de nada, mas "centro-oeste" contém "centro":
    // o parse precisa testar do mais longo para o mais curto.
    expect(parseLandingSlug('pintura-residencial-centro-oeste')).toEqual({
      servicoSlug: 'pintura-residencial',
      bairroSlug: 'centro-oeste',
    })
    expect(parseLandingSlug('pintura-residencial-centro')).toEqual({
      servicoSlug: 'pintura-residencial',
      bairroSlug: 'centro',
    })
  })

  it('rejeita slug que não é uma combinação válida', () => {
    expect(parseLandingSlug('qualquer-coisa')).toBeNull()
    expect(parseLandingSlug('pintura-residencial')).toBeNull()
  })

  it('nenhuma combinação gera slug duplicado', () => {
    const slugs = getTodasLandingPages().map((lp) => lp.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('SEO', () => {
  it('buildMetadata define canonical absoluto', () => {
    const meta = buildMetadata({ title: 'X', description: 'Y', path: '/servicos' })
    expect(meta.alternates?.canonical).toBe('https://nobrecor.com.br/servicos')
  })

  it('títulos das landings da onda ativa cabem no limite do Google', () => {
    for (const lp of getLandingPages()) {
      const servico = SERVICOS.find((s) => s.slug === lp.servicoSlug)!
      const bairro = getBairro(lp.bairroSlug)!
      const titulo = buildTituloLanding(
        servico.nomeSeo || servico.nome,
        bairro.nomeSeo || bairro.nome
      )
      expect(titulo.length, `título longo demais: "${titulo}"`).toBeLessThanOrEqual(TITLE_MAX)
    }
  })
})

describe('schema JSON-LD', () => {
  const local = buildLocalBusinessSchema()

  it('não declara avaliação inventada (causa de ação manual do Google)', () => {
    expect(local).not.toHaveProperty('aggregateRating')
    expect(local).not.toHaveProperty('review')
  })

  it('areaServed é nominal, nunca genérico (regra SAB)', () => {
    const nomes = local.areaServed.map((a) => ('name' in a ? a.name : ''))
    expect(nomes.length).toBeGreaterThan(10)
    expect(nomes).not.toContain('Brasil')
    expect(nomes).not.toContain('MS')
  })

  it('URLs do schema não carregam quebra de linha nem espaço', () => {
    const serializado = JSON.stringify(local)
    expect(serializado).not.toMatch(/https:\/\/[^"]*[\s\n]/)
  })

  it('FAQPage monta pergunta e resposta', () => {
    const faq = buildFaqSchema([{ pergunta: 'P?', resposta: 'R.' }])
    expect(faq.mainEntity[0]!.name).toBe('P?')
    expect(faq.mainEntity[0]!.acceptedAnswer.text).toBe('R.')
  })
})

describe('WhatsApp', () => {
  it('nenhum link sai sem texto pré-preenchido', () => {
    // Conversa em branco desperdiça o contexto no ponto de maior clique do site.
    for (const link of [buildWhatsAppLink(), buildWhatsAppLink(''), buildWhatsAppLink('   ')]) {
      expect(link, `link sem ?text=: ${link}`).toContain('?text=')
    }
  })

  it('usa o número comercial real, só com dígitos', () => {
    expect(buildWhatsAppLink()).toMatch(/^https:\/\/wa\.me\/55\d{10,11}\?text=/)
  })

  it('a mensagem contextual carrega serviço e bairro', () => {
    const msg = buildWhatsAppMessage('Pintura de Fachada', 'Chácara Cachoeira')
    expect(msg).toContain('Vim pelo site')
    expect(msg).toContain('Serviço: Pintura de Fachada')
    expect(msg).toContain('Bairro: Chácara Cachoeira')
  })

  it('sem contexto, cai na mensagem padrão', () => {
    expect(buildWhatsAppMessage()).toBe(MENSAGEM_PADRAO)
  })
})
