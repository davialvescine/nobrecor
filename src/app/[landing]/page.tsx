import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, MapPin } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import CardServico from '@/components/ui/CardServico'
import { getServico, SERVICOS_ESTRELA } from '@/content/servicos'
import { getBairro } from '@/content/bairros'
import { getRegiaoUrbana } from '@/content/regioes'
import { buildWhatsAppMessage } from '@/lib/business'
import { buildMetadata, buildTituloLanding, buildDescricaoLanding } from '@/lib/seo'
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema, jsonLd } from '@/lib/schema'
import { getLandingPages, parseLandingSlug } from '@/lib/landing-pages'

interface Props {
  params: Promise<{ landing: string }>
}

export function generateStaticParams() {
  return getLandingPages().map((lp) => ({ landing: lp.slug }))
}

/**
 * Sem isto, o padrão do Next (`true`) renderiza SOB DEMANDA qualquer slug que
 * parseie — ou seja, as ~1.515 combinações das ondas 2, 3 e 4 respondiam 200
 * mesmo fora do sitemap (verificado em 16/08/2026). Isso fura a estratégia de
 * rollout por onda: página fora da onda é exatamente o thin content que os
 * gates do CLAUDE.md §6 existem para segurar.
 */
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { landing } = await params
  const parsed = parseLandingSlug(landing)
  if (!parsed) return {}

  const servico = getServico(parsed.servicoSlug)
  const bairro = getBairro(parsed.bairroSlug)
  if (!servico || !bairro) return {}

  const nomeCurto = servico.nomeSeo || servico.nome
  const bairroCurto = bairro.nomeSeo || bairro.nome

  return buildMetadata({
    // Título absoluto para controlar os 60 chars — o sufixo do template do root
    // estouraria o limite em boa parte das combinações.
    title: buildTituloLanding(nomeCurto, bairroCurto),
    description: buildDescricaoLanding(servico.nome, bairro.nome),
    path: `/${landing}`,
    tituloAbsoluto: true,
  })
}

export default async function LandingPage({ params }: Props) {
  const { landing } = await params
  const parsed = parseLandingSlug(landing)
  if (!parsed) notFound()

  const servico = getServico(parsed.servicoSlug)
  const bairro = getBairro(parsed.bairroSlug)
  if (!servico || !bairro) notFound()

  const regiao = getRegiaoUrbana(bairro.regiao)
  const mensagem = buildWhatsAppMessage(servico.nome, bairro.nome)

  const faq = [
    {
      pergunta: `Quanto custa ${servico.nome.toLowerCase()} em ${bairro.nome}?`,
      resposta: `O valor de ${servico.nome.toLowerCase()} em ${bairro.nome} é cobrado ${servico.unidade} e depende da metragem real, do estado da superfície e do acabamento contratado. A Nobre Cor faz avaliação técnica no local, sem compromisso, e envia a proposta discriminada em até 24 horas pelo WhatsApp, com material especificado e prazo definido.`,
    },
    {
      pergunta: `A Nobre Cor atende ${servico.nome.toLowerCase()} em ${bairro.nome}?`,
      resposta: `Sim. ${bairro.nome} fica na Região Urbana do ${regiao?.nome ?? 'Campo Grande'} e está na nossa área de atendimento. O perfil do bairro, ${bairro.perfil.toLowerCase()}, é exatamente o tipo de imóvel para o qual o nosso acabamento foi construído.`,
    },
    ...servico.faq.slice(0, 2),
  ]

  return (
    <PageWrapper whatsappMessage={mensagem}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(buildServiceSchema(servico, bairro))}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildFaqSchema(faq))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Serviços', url: '/servicos' },
            { name: servico.nome, url: `/servicos/${servico.slug}` },
            { name: bairro.nome, url: `/${landing}` },
          ])
        )}
      />

      <Hero
        compacta
        eyebrow={`${bairro.nome} · Região Urbana do ${regiao?.nome ?? 'Campo Grande'}`}
        titulo={
          <>
            {servico.nome} em <span className="text-[#c8963e]">{bairro.nome}</span>
          </>
        }
        subtitulo={servico.descricao}
        mensagemWhatsApp={mensagem}
      />

      <nav aria-label="Você está em" className="border-b border-[#1b3a5c]/10 bg-[#f7f4ef] text-sm">
        <ol className="max-w-4xl mx-auto flex flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8 py-3 text-[#2b2b2b]/70">
          <li>
            <Link href="/" className="hover:text-[#a87b2f]">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={`/servicos/${servico.slug}`} className="hover:text-[#a87b2f]">
              {servico.nome}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#1b3a5c] font-medium">{bairro.nome}</li>
        </ol>
      </nav>

      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl heading-line">
            {servico.nome} em {bairro.nome}, Campo Grande MS
          </h2>
          <p className="mt-7 text-[#2b2b2b]/80 leading-relaxed text-lg">{servico.descricaoLonga}</p>

          <h3 className="mt-10 font-display text-xl">
            Por que {bairro.nome} pede esse cuidado
          </h3>
          <p className="mt-4 text-[#2b2b2b]/80 leading-relaxed">
            O perfil predominante de {bairro.nome} é: {bairro.perfil.toLowerCase()}. Isso define
            desde a proteção usada na obra até o horário combinado com portaria e condomínio.
            {regiao ? ` ${regiao.descricao}` : ''}
          </p>

          {bairro.pontosReferencia.length > 0 && (
            <p className="mt-5 text-[#2b2b2b]/80 leading-relaxed">
              Atendemos {servico.nome.toLowerCase()} em toda a extensão de {bairro.nome}, incluindo
              as imediações de {bairro.pontosReferencia.slice(0, 3).join(', ')}.
            </p>
          )}

          <h3 className="mt-10 font-display text-xl">O que está incluso</h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {servico.beneficios.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-xl border border-[#1b3a5c]/10 bg-[#f7f4ef] p-4"
              >
                <CheckCircle2 className="w-5 h-5 text-[#c8963e] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-[#2b2b2b]/80 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>

      <section className="py-14 bg-[#f7f4ef]" aria-labelledby="outros-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="outros-heading" className="font-display text-2xl">
            Outros serviços em {bairro.nome}
          </h2>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICOS_ESTRELA.filter((s) => s.slug !== servico.slug).map((s) => (
              <li key={s.slug}>
                <CardServico
                  servico={s}
                  bairroSlug={bairro.slug}
                  bairroNome={bairro.nome}
                  cta="Ver detalhes"
                />
              </li>
            ))}
            <li>
              <Link
                href={`/bairros/${bairro.slug}`}
                className="flex items-center gap-2.5 rounded-xl border border-[#c8963e]/40 bg-white px-4 py-3 text-sm font-semibold text-[#a87b2f]"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                Tudo sobre pintura em {bairro.nome}
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <FaqSection faq={faq} titulo={`Dúvidas sobre ${servico.nome.toLowerCase()} em ${bairro.nome}`} />

      <CtaSection
        titulo={`Orçamento de ${servico.nome.toLowerCase()} em ${bairro.nome}`}
        servico={servico.nome}
        bairro={bairro.nome}
      />
    </PageWrapper>
  )
}
