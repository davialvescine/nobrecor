import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import CtaSection from '@/components/sections/CtaSection'
import FormOrcamento from '@/components/sections/FormOrcamento'
import { BUSINESS } from '@/lib/business'
import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Contato, Orçamento de Pintura em Campo Grande MS',
  description: `Fale com a Nobre Cor Pinturas pelo WhatsApp ${BUSINESS.phoneFormatted}. Avaliação técnica no local, sem compromisso, e proposta detalhada em até 24h.`,
  path: '/contato',
  tituloAbsoluto: true,
})

export default function ContatoPage() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Contato', url: '/contato' },
          ])
        )}
      />

      <Hero
        compacta
        eyebrow="Contato"
        titulo={
          <>
            Peça seu orçamento de <span className="text-[#c8963e]">pintura</span>
          </>
        }
        subtitulo="A forma mais rápida é o WhatsApp: descreva o serviço, mande foto se puder, e retornamos com a faixa de valor e a disponibilidade de agenda."
      />

      {/*
        Sem o grid "Canais de atendimento" (decisão do dono em 16/08/2026): o
        NAP que pesa para o SEO local já está no rodapé de TODAS as páginas e no
        schema LocalBusiness — repetir em cards aqui não somava sinal, só
        empurrava o formulário para baixo. Telefone e horário continuam nesta
        página pela CtaSection e pelo rodapé.
      */}
      <FormOrcamento
        titulo="Prefere preencher um formulário?"
        subtitulo="Preencha os campos abaixo: a mensagem chega pronta no nosso WhatsApp, com bairro e serviço já preenchidos, e você recebe a proposta detalhada em até 24 horas."
      />

      <CtaSection />
    </PageWrapper>
  )
}
