import type { Metadata } from 'next'
import { BUSINESS, SITE_URL } from './business'

interface SeoOptions {
  title: string
  description: string
  path?: string
  ogImage?: string
  noIndex?: boolean
  /** true = usa o título exato, sem o sufixo "| Nobre Cor" do template do root. */
  tituloAbsoluto?: boolean
}

/**
 * Builder único de metadata. Toda página DEVE usá-lo — o Next não faz merge
 * profundo: declarar `openGraph` numa página substitui inteiro o do root layout,
 * então uma página que declare OG sem `images` ficaria sem og:image.
 */
export function buildMetadata(opts: SeoOptions): Metadata {
  const url = opts.path ? `${SITE_URL}${opts.path}` : SITE_URL

  /**
   * Canonical SÓ quando a página tem endereço próprio.
   *
   * Sem `path`, `url` cai em SITE_URL — e a página passa a declarar a home como
   * sua canônica. É exatamente o que a regra do projeto evita ao não definir
   * canonical no root layout, e voltou pela porta dos fundos no 404: qualquer
   * endereço inexistente dizia ao Google "eu sou a home".
   */
  const canonical = opts.path ? { canonical: url } : {}

  /**
   * Imagem do card de link (WhatsApp, Instagram, Facebook, LinkedIn).
   *
   * O padrão é a imagem gerada por `src/app/opengraph-image.tsx`, referenciada
   * pela URL estável `/opengraph-image`.
   *
   * Por que declarar explicitamente em vez de confiar na convenção de arquivo:
   * o Next NÃO faz merge profundo de metadata. Toda página que declara o
   * próprio `openGraph` substitui inteiro o do layout, inclusive a imagem que a
   * convenção injetaria. Sem esta linha, só a home tinha `og:image` e as 216
   * páginas internas saíam sem imagem nenhuma no preview.
   */
  const ogImage = opts.ogImage
    ? `${SITE_URL}${opts.ogImage}`
    : `${SITE_URL}/opengraph-image`

  return {
    title: opts.tituloAbsoluto ? { absolute: opts.title } : opts.title,
    description: opts.description,
    metadataBase: new URL(SITE_URL),
    alternates: canonical,
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: BUSINESS.legalName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: opts.title }],
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.title,
      description: opts.description,
      images: [ogImage],
    },
    robots: opts.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

/** Limite prático do Google para o <title> antes de cortar com reticências. */
export const TITLE_MAX = 60
export const DESCRIPTION_MAX = 160

/**
 * Sufixo que o `template` do root layout acrescenta a todo título NÃO-absoluto.
 *
 * Precisa entrar no orçamento de caracteres: quem mede só o título da página
 * acha que cabe e estoura na hora de renderizar. Foi o que aconteceu com
 * impermeabilização e manutenção recorrente, que saíram com 67 e 63 chars.
 */
export const SUFIXO_TITULO = ' | Nobre Cor'

/**
 * Escolhe a primeira variação que cabe no limite.
 *
 * A ideia é encurtar por decisão nossa, e não deixar o Google cortar no meio de
 * "Campo Grande MS" — texto truncado com reticências perde a cidade inteira e
 * ainda fica feio na SERP. A última opção é a rede: entra mesmo se estourar,
 * porque página sem title/description é pior que uma longa.
 */
function primeiroQueCabe(opcoes: string[], limite: number): string {
  return opcoes.find((o) => o.length <= limite) ?? opcoes[opcoes.length - 1]!
}

export function buildTituloServico(servico: string, bairro?: string): string {
  if (bairro) return buildTituloLanding(servico, bairro)

  // Esta rota NÃO usa tituloAbsoluto, então o root ainda vai somar o sufixo.
  return primeiroQueCabe(
    [
      `${servico} em Campo Grande MS`,
      `${servico} em Campo Grande`,
      `${servico} em CG MS`,
      servico,
    ],
    TITLE_MAX - SUFIXO_TITULO.length
  )
}

/**
 * Título da landing serviço x bairro, encurtado até caber nos 60 chars.
 *
 * A rota usa `tituloAbsoluto`, então aqui não há sufixo a descontar. A keyword
 * completa continua no H1, na meta description e no corpo do texto.
 */
export function buildTituloLanding(servico: string, bairro: string): string {
  return primeiroQueCabe(
    [
      `${servico} em ${bairro}, Campo Grande MS`,
      `${servico} em ${bairro}, Campo Grande`,
      `${servico} em ${bairro} CG`,
      `${servico} em ${bairro}`,
    ],
    TITLE_MAX
  )
}

export function buildDescricaoServico(servico: string, bairro?: string): string {
  const local = bairro ? `${bairro}, Campo Grande MS` : 'Campo Grande MS'
  return primeiroQueCabe(
    [
      `${servico} em ${local} com acabamento de alto padrão. Equipe uniformizada, obra limpa e prazo cumprido. Orçamento sem compromisso em até 24h no WhatsApp.`,
      `${servico} em ${local} com acabamento de alto padrão. Obra limpa e prazo cumprido. Orçamento sem compromisso em até 24h no WhatsApp.`,
      `${servico} em ${local}. Alto padrão, obra limpa e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
      `${servico} em ${local}. Alto padrão e prazo cumprido. Orçamento no WhatsApp.`,
    ],
    DESCRIPTION_MAX
  )
}

/** Description da página de bairro. Mesma lógica de encurtamento por etapas. */
export function buildDescricaoBairro(bairro: string): string {
  return primeiroQueCabe(
    [
      `Pintura residencial, comercial e predial em ${bairro}, Campo Grande MS. Equipe uniformizada, obra limpa e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
      `Pintura residencial, comercial e predial em ${bairro}, Campo Grande MS. Obra limpa e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
      `Pintura residencial e predial em ${bairro}, Campo Grande MS. Alto padrão e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
      `Pintura em ${bairro}, Campo Grande MS. Alto padrão e prazo cumprido. Orçamento no WhatsApp.`,
    ],
    DESCRIPTION_MAX
  )
}

/** Description da landing serviço x bairro. */
export function buildDescricaoLanding(servico: string, bairro: string): string {
  return primeiroQueCabe(
    [
      `${servico} em ${bairro}, Campo Grande MS. Acabamento de alto padrão, equipe uniformizada e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
      `${servico} em ${bairro}, Campo Grande MS. Alto padrão, obra limpa e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
      `${servico} em ${bairro}, Campo Grande MS. Alto padrão e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
      `${servico} em ${bairro}, Campo Grande MS. Alto padrão e prazo cumprido. Orçamento no WhatsApp.`,
    ],
    DESCRIPTION_MAX
  )
}

export { SITE_URL }
