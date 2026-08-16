import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import MarqueeServicos from '@/components/sections/MarqueeServicos'
import DiferenciaisSection from '@/components/sections/DiferenciaisSection'
import ServicosSection from '@/components/sections/ServicosSection'
import ProcessoSection from '@/components/sections/ProcessoSection'
import FormOrcamento from '@/components/sections/FormOrcamento'
import BairrosSection from '@/components/sections/BairrosSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import { FAQ_HOME } from '@/content/faq-home'
import { buildFaqSchema, jsonLd } from '@/lib/schema'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Pintor Profissional em Campo Grande MS | Nobre Cor Pinturas',
  description:
    'Empresa de pintura de alto padrão em Campo Grande MS. Pintura residencial, comercial e predial, grafiato e marmorato. Equipe uniformizada, prazo cumprido e orçamento em até 24h.',
  path: '/',
  tituloAbsoluto: true,
})

export default function HomePage() {
  return (
    <PageWrapper>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildFaqSchema(FAQ_HOME))} />

      <Hero
        eyebrow="Campo Grande MS"
        fotos
        ctaSecundarioHref="#orcamento"
        ctaSecundarioLabel="Preencher formulário"
        titulo={
          <>
            Pintura profissional em Campo Grande MS: obra limpa, prazo cumprido e{' '}
            <span className="text-[#c8963e]">acabamento de alto padrão</span>
          </>
        }
        subtitulo="A Nobre Cor executa pintura residencial, comercial e predial em Campo Grande com equipe uniformizada, obra protegida e limpa todos os dias e cronograma cumprido. Avaliação técnica no local e proposta detalhada em até 24 horas."
      />

      <MarqueeServicos />
      <DiferenciaisSection />
      <ServicosSection />
      <ProcessoSection />
      <FormOrcamento />
      <BairrosSection />
      <PortfolioSection />

      <FaqSection
        faq={FAQ_HOME}
        titulo="Dúvidas sobre pintura em Campo Grande MS"
        subtitulo="As perguntas que mais chegam no nosso WhatsApp, respondidas sem enrolação."
      />

      <CtaSection />
    </PageWrapper>
  )
}
