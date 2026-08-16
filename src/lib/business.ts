/**
 * NAP (Name, Address, Phone) da Nobre Cor Pinturas.
 *
 * REGRA DE OURO: estes dados precisam ser IDÊNTICOS no site, no Perfil da Empresa
 * no Google, no Instagram e em todo diretório local. Divergência de NAP é o erro
 * que mais derruba ranking no Maps.
 */

export const BUSINESS = {
  legalName: 'Nobre Cor Pinturas',
  shortName: 'Nobre Cor',
  tagline: 'Pintura de alto padrão em Campo Grande MS.',

  // ⚠️ PENDENTE: trocar pelo número comercial real antes do deploy.
  // Buscar por "5567999999999" em todo o projeto (scripts/check-rotas.mjs avisa).
  phone: '+5567999999999',
  phoneFormatted: '(67) 9 9999-9999',
  whatsappNumero: '5567999999999',

  email: 'contato@nobrecor.com.br',
  url: 'https://nobrecor.com.br',

  address: {
    locality: 'Campo Grande',
    region: 'MS',
    country: 'BR',
  },

  /** Coordenadas do centro de Campo Grande MS — usadas no schema LocalBusiness. */
  geo: {
    latitude: -20.4697,
    longitude: -54.6201,
  },

  hours: {
    segundaASexta: '08:00-18:00',
    sabado: '08:00-12:00',
    domingo: 'Fechado',
  },

  socials: {
    instagram: 'https://instagram.com/nobrecorpinturas',
    facebook: '',
    googleBusiness: '',
  },

  /** Os 4 diferenciais aprovados — usar o mesmo texto em todo material. */
  diferenciais: [
    {
      titulo: 'Confiança profissional',
      texto:
        'Equipe dedicada, uniformizada e organizada: obra protegida, ambiente limpo todos os dias e comunicação clara do início ao fim.',
    },
    {
      titulo: 'Entrega no prazo',
      texto:
        'Cronograma definido no orçamento e cumprido. Você sabe o dia que começa e o dia que termina.',
    },
    {
      titulo: 'Equipe de alta performance',
      texto:
        'Pintores capacitados e treinados para acabamentos de alto padrão: texturas especiais, efeitos decorativos e pintura fina de residências e comércios.',
    },
    {
      titulo: 'Orçamento sem compromisso',
      texto:
        'Avaliação técnica no local e proposta detalhada em até 24h, direto no seu WhatsApp.',
    },
  ],
} as const

/**
 * Fonte única da URL base.
 *
 * Nunca ler `process.env.NEXT_PUBLIC_SITE_URL` direto: uma env var salva com
 * quebra de linha vaza o `\n` para dentro do sitemap.xml e de todo o JSON-LD,
 * invalidando as URLs. `new URL().origin` normaliza e descarta path e whitespace.
 *
 * O canonical aponta para produção inclusive em Preview Deploy — por isso a
 * constante literal, e não uma variável por ambiente.
 */
export const SITE_URL = new URL(BUSINESS.url).origin

export const OG_DEFAULT = {
  url: `${SITE_URL}/images/og-default.jpg`,
  width: 1200,
  height: 630,
  alt: `${BUSINESS.legalName}, ${BUSINESS.tagline}`,
} as const

export function buildWhatsAppLink(mensagem?: string): string {
  const base = `https://wa.me/${BUSINESS.whatsappNumero}`
  if (!mensagem) return base
  return `${base}?text=${encodeURIComponent(mensagem)}`
}

export function buildWhatsAppMessage(servico?: string, bairro?: string): string {
  const partes = ['Olá! Vim pelo site da Nobre Cor e gostaria de um orçamento de pintura.']
  if (servico) partes.push(`Serviço: ${servico}`)
  if (bairro) partes.push(`Bairro: ${bairro}`)
  partes.push('Pode me ajudar?')
  return partes.join('\n')
}
