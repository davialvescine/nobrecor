import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import CtaSection from '@/components/sections/CtaSection'
import { BUSINESS } from '@/lib/business'
import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Contato, Orçamento de Pintura em Campo Grande MS',
  description: `Fale com a Nobre Cor Pinturas: ${BUSINESS.phoneFormatted}, ${BUSINESS.email}. Avaliação técnica no local, sem compromisso, e proposta em até 24h no WhatsApp.`,
  path: '/contato',
  tituloAbsoluto: true,
})

export default function ContatoPage() {
  const itens = [
    { Icone: Phone, titulo: 'Telefone e WhatsApp', valor: BUSINESS.phoneFormatted, href: `tel:${BUSINESS.phone}` },
    { Icone: Mail, titulo: 'E-mail', valor: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
    { Icone: MapPin, titulo: 'Atendimento', valor: `${BUSINESS.address.locality}, ${BUSINESS.address.region}`, href: '/bairros' },
    { Icone: Clock, titulo: 'Horário', valor: `Seg a sex ${BUSINESS.hours.segundaASexta} · Sáb ${BUSINESS.hours.sabado}` },
  ]

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
        eyebrow="Contato"
        titulo={
          <>
            Peça seu orçamento de <span className="text-[#c8963e]">pintura</span>
          </>
        }
        subtitulo="A forma mais rápida é o WhatsApp: descreva o serviço, mande foto se puder, e retornamos com a faixa de valor e a disponibilidade de agenda."
      />

      <section className="py-16 bg-white" aria-labelledby="canais-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="canais-heading" className="font-display text-2xl md:text-3xl heading-line">
            Canais de atendimento
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {itens.map(({ Icone, titulo, valor, href }) => (
              <li
                key={titulo}
                className="rounded-[var(--radius-card)] border border-[#1b3a5c]/10 bg-[#f7f4ef] p-6"
              >
                <Icone className="w-7 h-7 text-[#c8963e]" strokeWidth={1.4} aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg">{titulo}</h3>
                {href ? (
                  <a href={href} className="mt-1.5 block text-[#2b2b2b]/80 hover:text-[#a87b2f]">
                    {valor}
                  </a>
                ) : (
                  <p className="mt-1.5 text-[#2b2b2b]/80">{valor}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </PageWrapper>
  )
}
