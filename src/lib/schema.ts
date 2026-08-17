/**
 * Builders de JSON-LD (schema.org).
 *
 * Regras que não podem ser quebradas:
 * - NADA de `aggregateRating` inventado. Nota inexistente é causa direta de ação
 *   manual em dados estruturados, e a punição atinge os rich results do site todo.
 *   Só entra quando houver avaliação real no Perfil da Empresa no Google.
 * - `areaServed` sempre com bairros/cidade específicos (regra SAB do Google —
 *   "Brasil" ou "MS inteiro" é proibido para Service Area Business).
 */

import { BUSINESS, SITE_URL } from './business'
import type { Servico } from '@/content/servicos'
import type { Bairro } from '@/content/bairros'
import { BAIRROS } from '@/content/bairros'
import { SERVICOS } from '@/content/servicos'

const LOGO = `${SITE_URL}/images/marca/nobrecor-principal.png`

export function buildLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['HousePainter', 'LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.shortName,
    description:
      'Empresa de pintura de alto padrão em Campo Grande MS. Pintura residencial, comercial e predial, grafiato, marmorato e efeitos decorativos, com equipe uniformizada e prazo cumprido.',
    slogan: BUSINESS.tagline,
    telephone: BUSINESS.phone,
    url: BUSINESS.url,
    image: LOGO,
    logo: LOGO,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.address.locality,
      addressRegion: BUSINESS.address.region,
      addressCountry: BUSINESS.address.country,
    },
    /*
      `serviceArea`, e não `geo`.

      Em schema.org, `geo` é a coordenada DO ESTABELECIMENTO. Como a Nobre Cor
      atende no endereço do cliente e não tem loja aberta ao público, publicar a
      coordenada do centro de Campo Grande como `geo` inventava uma sede que não
      existe — o mesmo tipo de afirmação sem lastro que a regra do projeto
      proíbe, só que em número em vez de texto.

      `serviceArea` com GeoCircle diz o que é verdade: a área coberta a partir
      daquele ponto. O raio de 30 km cobre a mancha urbana de Campo Grande.
      O `areaServed` nominal abaixo continua sendo o sinal principal.
    */
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: BUSINESS.geo.latitude,
        longitude: BUSINESS.geo.longitude,
      },
      geoRadius: '30000',
    },
    // Regra SAB: bairros nominais, nunca área genérica.
    areaServed: [
      { '@type': 'City', name: 'Campo Grande', addressRegion: 'MS' },
      ...BAIRROS.map((b) => ({
        '@type': 'Place' as const,
        name: `${b.nome}, Campo Grande MS`,
      })),
    ],
    serviceType: SERVICOS.map((s) => s.nome),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de pintura, Nobre Cor',
      itemListElement: SERVICOS.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.nome,
          url: `${SITE_URL}/servicos/${s.slug}`,
        },
      })),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      BUSINESS.socials.instagram,
      BUSINESS.socials.facebook,
      BUSINESS.socials.googleBusiness,
    ].filter(Boolean),
  }
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BUSINESS.legalName,
    url: BUSINESS.url,
    logo: LOGO,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: BUSINESS.phone,
      contactType: 'customer service',
      // Nominal, não 'BR'. A empresa atende Campo Grande, e declarar o país
      // inteiro é o oposto da regra SAB que o resto deste arquivo respeita:
      // área de cobertura inflada é sinal ruim para o Google local.
      areaServed: { '@type': 'City', name: 'Campo Grande', addressRegion: 'MS' },
      availableLanguage: 'Portuguese',
    },
  }
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.legalName,
    description: BUSINESS.tagline,
    inLanguage: 'pt-BR',
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

export function buildServiceSchema(servico: Servico, bairro?: Bairro) {
  const local = bairro ? `${bairro.nome}, Campo Grande MS` : 'Campo Grande MS'
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: bairro ? `${servico.nome} em ${bairro.nome}` : `${servico.nome} em Campo Grande MS`,
    description: servico.descricao,
    serviceType: servico.nome,
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Place', name: local },
    url: bairro
      ? `${SITE_URL}/${servico.slug}-${bairro.slug}`
      : `${SITE_URL}/servicos/${servico.slug}`,
  }
}

export function buildFaqSchema(faq: { pergunta: string; resposta: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.pergunta,
      acceptedAnswer: { '@type': 'Answer', text: item.resposta },
    })),
  }
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

/** Helper para injetar JSON-LD sem repetir o boilerplate em toda página. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data) }
}
