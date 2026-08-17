import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import ServicosSection from '@/components/sections/ServicosSection'
import CtaSection from '@/components/sections/CtaSection'
import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema'
import { TOTAL_SERVICOS } from '@/content/servicos'

export const metadata: Metadata = buildMetadata({
  title: 'Serviços de Pintura em Campo Grande MS',
  description:
    'Os serviços da Nobre Cor em Campo Grande MS: pintura residencial, apartamento, fachada, grafiato, marmorato, predial, epóxi e impermeabilização.',
  path: '/servicos',
})

export default function ServicosPage() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Serviços', url: '/servicos' },
          ])
        )}
      />

      <Hero
        compacta
        eyebrow={`${TOTAL_SERVICOS} tipos de pintura`}
        titulo={
          <>
            Serviços de pintura em <span className="text-[#c8963e]">Campo Grande MS</span>
          </>
        }
        subtitulo="Da pintura interna de um apartamento ao piso epóxi de um galpão, passando por grafiato, marmorato e pintura decorativa. Cada serviço com o processo e a preparação que ele exige."
      />

      <ServicosSection
        titulo="Serviços de pintura e acabamento em Campo Grande MS"
        subtitulo="Clique em qualquer serviço para ver como executamos, o que está incluso e as dúvidas mais frequentes."
      />

      <CtaSection
        titulo="Não achou o que precisa?"
        subtitulo="Descreva o serviço no WhatsApp. Se for pintura, provavelmente fazemos, e se não for, indicamos quem faz."
      />
    </PageWrapper>
  )
}
