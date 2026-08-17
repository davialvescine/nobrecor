import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import CtaSection from '@/components/sections/CtaSection'
import { getBairrosAgrupados, TOTAL_BAIRROS, BAIRROS_PRIORITARIOS } from '@/content/bairros'
import { REGIOES_URBANAS } from '@/content/regioes'
import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'Onde Atendemos, Bairros de Campo Grande MS',
  description: `A Nobre Cor atende ${TOTAL_BAIRROS} bairros nas 7 regiões urbanas de Campo Grande MS. Veja a lista completa por região e a página de pintura do seu bairro.`,
  path: '/bairros',
})

export default function BairrosPage() {
  const agrupados = getBairrosAgrupados()

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Onde atendemos', url: '/bairros' },
          ])
        )}
      />

      <Hero
        compacta
        eyebrow={`${TOTAL_BAIRROS} bairros · 7 regiões urbanas`}
        titulo={
          <>
            Pintura em todos os bairros de{' '}
            <span className="text-[#c8963e]">Campo Grande MS</span>
          </>
        }
        subtitulo="A Nobre Cor circula pela capital inteira, das superquadras do Centro aos condomínios do Prosa. Encontre o seu bairro abaixo e veja como atendemos na sua região."
      />

      <section className="py-16 bg-white" aria-labelledby="area-foco-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="area-foco-heading" className="font-display text-2xl md:text-3xl heading-line">
            Nosso foco de atendimento
          </h2>
          <p className="mt-6 max-w-3xl text-[#2b2b2b]/75 leading-relaxed">
            O acabamento de alto padrão da Nobre Cor foi construído para imóveis onde a parede é
            conferida de perto: residências com projeto de arquitetura, condomínios fechados e
            coberturas. É nos bairros abaixo que concentramos esse atendimento, e cada um tem
            página própria com o detalhe da execução. A cobertura, porém, é dos 81 bairros da
            cidade.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BAIRROS_PRIORITARIOS.map((b) => (
              <li key={b.slug}>
                <Link
                  href={`/bairros/${b.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border border-[#1b3a5c]/10 bg-[#f7f4ef] p-5 transition-all hover:-translate-y-0.5 hover:border-[#c8963e]/50 hover:shadow-[var(--shadow-card-hover)]"
                >
                  <span className="font-display text-lg text-[#1b3a5c] group-hover:text-[#a87b2f]">
                    {b.nome}
                  </span>
                  <span className="mt-2 text-sm text-[#2b2b2b]/70 leading-relaxed">{b.perfil}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 bg-[#f7f4ef]" aria-labelledby="regioes-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="regioes-heading" className="font-display text-2xl md:text-3xl heading-line">
            Todos os bairros, por região urbana
          </h2>
          <p className="mt-6 max-w-3xl text-[#2b2b2b]/75 leading-relaxed">
            Campo Grande é dividida em 7 regiões urbanas pela PLANURB. Atendemos as sete, abaixo
            está a lista completa dos {TOTAL_BAIRROS} bairros, na divisão oficial.
          </p>

          <div className="mt-10 space-y-10">
            {agrupados.map(({ regiao, bairros }) => (
              <section key={regiao.slug} aria-labelledby={`regiao-${regiao.slug}`}>
                <h3 id={`regiao-${regiao.slug}`} className="font-display text-xl text-[#1b3a5c]">
                  Região Urbana do {regiao.nome}
                  <span className="ml-2 text-sm font-body font-normal text-[#2b2b2b]/55">
                    {bairros.length} bairros · {regiao.posicao}
                  </span>
                </h3>
                <p className="mt-2 max-w-3xl text-sm text-[#2b2b2b]/70 leading-relaxed">
                  {regiao.descricao}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {bairros.map((b) => (
                    <li key={b.slug}>
                      <Link
                        href={`/bairros/${b.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[#1b3a5c]/15 bg-white px-3.5 py-1.5 text-sm text-[#1b3a5c] transition-colors hover:border-[#c8963e] hover:text-[#a87b2f]"
                      >
                        <MapPin className="w-3 h-3 text-[#c8963e]" aria-hidden="true" />
                        {b.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm text-[#2b2b2b]/55">
            Divisão em {REGIOES_URBANAS.length} regiões urbanas conforme a PLANURB, Prefeitura de
            Campo Grande.
          </p>
        </div>
      </section>

      <CtaSection
        titulo="Seu bairro está na lista?"
        subtitulo="Mande o endereço no WhatsApp que agendamos a visita técnica. Atendemos Campo Grande inteira."
      />
    </PageWrapper>
  )
}
