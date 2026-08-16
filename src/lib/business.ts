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

  // Número comercial confirmado pelo dono em 16/08/2026.
  // Formato E.164 no `phone` (exigência do schema.org e do href tel:),
  // formato de leitura no `phoneFormatted`, e só dígitos no `whatsappNumero`
  // (o wa.me rejeita qualquer separador).
  phone: '+5567981522412',
  phoneFormatted: '(67) 98152-2412',
  whatsappNumero: '5567981522412',

  // Caixa informada pelo dono em 16/08/2026. Quando o domínio estiver
  // registrado, criar `contato@nobrecorpinturas.com.br` com encaminhamento para
  // esta conta e trocar aqui: endereço no próprio domínio pesa mais no NAP e
  // no alto padrão que um gmail.com.
  email: 'nobrecorpinturas@gmail.com',

  // Domínio escolhido pelo dono em 16/08/2026. NÃO trocar por env var por
  // ambiente — canonical de preview destrói indexação (ver CLAUDE.md §14).
  url: 'https://nobrecorpinturas.com.br',

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

  /**
   * Sábado e domingo NÃO há atendimento (decisão do dono em 16/08/2026).
   * Horário aqui é a fonte única: schema, rodapé, CTA e página de contato leem daqui.
   */
  hours: {
    segundaASexta: '08:00-18:00',
    fimDeSemana: 'Fechado',
  },

  socials: {
    // Handle confirmado pelo dono em 16/08/2026.
    instagram: 'https://instagram.com/nobrecorpinturasaltopadrao',
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

/**
 * Mensagem padrão de abertura da conversa.
 *
 * Sai pré-preenchida no WhatsApp para que a pessoa só aperte enviar. Duas
 * razões: reduz o atrito de quem não sabe como começar, e faz toda conversa
 * chegar já identificada como vinda do site (dá para medir a origem do lead
 * sem depender de o cliente contar).
 */
export const MENSAGEM_PADRAO =
  'Olá! Vim pelo site e gostaria de um orçamento de pintura. Pode me ajudar?'

/**
 * Monta o link do wa.me.
 *
 * Sem argumento, usa a MENSAGEM_PADRAO em vez de abrir a conversa em branco.
 * Isso não é detalhe: o botão do cabeçalho e o CTA da hero chamavam esta função
 * sem parâmetro e abriam o WhatsApp vazio, jogando fora justamente o contexto
 * nos dois pontos de maior clique do site.
 */
export function buildWhatsAppLink(mensagem?: string): string {
  const texto = mensagem?.trim() || MENSAGEM_PADRAO
  return `https://wa.me/${BUSINESS.whatsappNumero}?text=${encodeURIComponent(texto)}`
}

/**
 * Mensagem contextual: acrescenta serviço e bairro quando a página souber.
 * A quebra de linha real (`\n`) é preservada pelo encodeURIComponent e chega
 * formatada no app.
 */
export function buildWhatsAppMessage(servico?: string, bairro?: string): string {
  if (!servico && !bairro) return MENSAGEM_PADRAO

  const partes = ['Olá! Vim pelo site e gostaria de um orçamento de pintura.']
  if (servico) partes.push(`Serviço: ${servico}`)
  if (bairro) partes.push(`Bairro: ${bairro}`)
  partes.push('Pode me ajudar?')
  return partes.join('\n')
}
