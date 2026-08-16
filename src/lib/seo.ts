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
    alternates: { canonical: url },
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

export function buildTituloServico(servico: string, bairro?: string): string {
  return bairro
    ? `${servico} em ${bairro}, Campo Grande MS`
    : `${servico} em Campo Grande MS`
}

/**
 * Título da landing serviço x bairro, encurtado até caber nos 60 chars.
 *
 * O Google corta o que passa disso, e um título cortado no meio de "Campo
 * Grande MS" fica pior do que um título sem a cidade. Vai reduzindo por etapas:
 * a keyword completa continua no H1, na meta description e no corpo do texto.
 */
export function buildTituloLanding(servico: string, bairro: string): string {
  const opcoes = [
    `${servico} em ${bairro}, Campo Grande MS`,
    `${servico} em ${bairro}, Campo Grande`,
    `${servico} em ${bairro} CG`,
    `${servico} em ${bairro}`,
  ]
  return opcoes.find((t) => t.length <= TITLE_MAX) ?? opcoes[opcoes.length - 1]!
}

export function buildDescricaoServico(servico: string, bairro?: string): string {
  const local = bairro ? `${bairro}, Campo Grande MS` : 'Campo Grande MS'
  return `${servico} em ${local} com acabamento de alto padrão. Equipe uniformizada, obra limpa e prazo cumprido. Orçamento sem compromisso em até 24h no WhatsApp.`
}

export { SITE_URL }
