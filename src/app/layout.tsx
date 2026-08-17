import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Plus_Jakarta_Sans } from 'next/font/google'
import '@/styles/globals.css'
import { BUSINESS, SITE_URL } from '@/lib/business'
import {
  buildLocalBusinessSchema,
  buildOrganizationSchema,
  buildWebSiteSchema,
  jsonLd,
} from '@/lib/schema'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'

/**
 * Bebas Neue é a display da marca: condensada, geométrica e só caixa-alta.
 * Por ser exclusivamente maiúscula, NÃO serve para texto corrido — todo
 * parágrafo usa Plus Jakarta Sans.
 */
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-display-marca',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  /**
   * Verificação de propriedade nos buscadores.
   *
   * O caminho PREFERIDO é o registro TXT no DNS (propriedade de domínio no
   * Search Console): cobre http, https, www e todo subdomínio de uma vez, e o
   * DNS está na Vercel, a um comando de distância. Estas variáveis existem para
   * o caso de o Google oferecer só a verificação por meta tag — aí basta
   * definir a env var e publicar, sem tocar no código.
   *
   * Só emite a tag quando a variável existe: meta de verificação vazia é lixo
   * no <head> de 217 páginas.
   */
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION && {
      other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION },
    }),
  },
  title: {
    default: 'Pintor Profissional em Campo Grande MS | Nobre Cor Pinturas',
    // Sufixo curto de propósito: " | Nobre Cor" custa 12 chars dos 60 do Google.
    // Quem monta título para ESTA rota precisa descontá-los — é o que
    // SUFIXO_TITULO faz em src/lib/seo.ts.
    template: '%s | Nobre Cor',
  },
  description:
    'Pintura de alto padrão em Campo Grande MS: residencial, comercial, predial, grafiato, marmorato e efeitos decorativos. Orçamento sem compromisso em até 24h.',
  keywords: [
    'pintor em campo grande ms',
    'empresa de pintura campo grande',
    'pintura residencial campo grande',
    'pintura de alto padrão campo grande',
    'grafiato campo grande',
    'pintura predial campo grande ms',
  ],
  authors: [{ name: BUSINESS.legalName }],
  creator: BUSINESS.legalName,
  publisher: BUSINESS.legalName,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    // Sem `url` aqui: seria herdado por páginas sem openGraph próprio, fazendo
    // cada uma anunciar a home como sua URL canônica social.
    siteName: BUSINESS.legalName,
    title: 'Pintor Profissional em Campo Grande MS | Nobre Cor Pinturas',
    description:
      'Pintura de alto padrão em Campo Grande MS: residencial, comercial, predial, grafiato e efeitos decorativos.',
    // Sem `images` aqui de propósito: quem fornece a imagem é
    // `src/app/opengraph-image.tsx` (convenção de arquivo do Next), que a gera
    // no build. Declarar `images` manualmente sobrescreveria a gerada.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pintor Profissional em Campo Grande MS | Nobre Cor Pinturas',
    description: 'Pintura de alto padrão em Campo Grande MS. Orçamento sem compromisso.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Sem `alternates.canonical` aqui de propósito: metadata do root é herdada por
  // qualquer rota que não defina a sua, e isso faria /servicos e /bairros
  // declararem a home como canônica. Cada página define o seu canonical.
}

export const viewport: Viewport = {
  themeColor: '#1b3a5c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${jakarta.variable}`}>
      <head>
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildLocalBusinessSchema())} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildOrganizationSchema())} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildWebSiteSchema())} />
        {/*
          Resgate do Reveal quando o JavaScript não roda.

          O Reveal nasce com `opacity-0` e só o efeito o torna visível. Sem JS —
          bundle que falhou, extensão que bloqueou, navegador simplificado — esse
          estado inicial vira permanente, e a home ficava com 43 blocos
          invisíveis. O CLAUDE.md sempre afirmou o contrário; era o código que
          não cumpria.

          <noscript> no <head> é a forma que funciona em qualquer navegador,
          diferente de @media (scripting: none), que ainda é recente demais.
        */}
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Pular para o conteúdo principal
        </a>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  )
}
