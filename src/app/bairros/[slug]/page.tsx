import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, ArrowRight } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import { BAIRROS, getBairro, getBairrosPorRegiao } from '@/content/bairros'
import { getRegiaoUrbana } from '@/content/regioes'
import { SERVICOS, SERVICOS_ESTRELA } from '@/content/servicos'
import { buildWhatsAppMessage } from '@/lib/business'
import { buildMetadata } from '@/lib/seo'
import { buildFaqSchema, buildBreadcrumbSchema, jsonLd } from '@/lib/schema'
import { ONDA_ATIVA } from '@/lib/landing-pages'

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return BAIRROS.map((b) => ({ slug: b.slug }))
}

/** Slug fora da base responde 404 direto, sem render sob demanda. */
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const bairro = getBairro(slug)
  if (!bairro) return {}

  return buildMetadata({
    title: `Pintor em ${bairro.nomeSeo || bairro.nome}, Campo Grande MS`,
    description: `Pintura residencial, comercial e predial em ${bairro.nome}, Campo Grande MS. Equipe uniformizada, obra limpa e prazo cumprido. Orçamento sem compromisso no WhatsApp.`,
    path: `/bairros/${bairro.slug}`,
    tituloAbsoluto: true,
  })
}

export default async function BairroPage({ params }: Props) {
  const { slug } = await params
  const bairro = getBairro(slug)
  if (!bairro) notFound()

  const regiao = getRegiaoUrbana(bairro.regiao)
  const vizinhos = getBairrosPorRegiao(bairro.regiao)
    .filter((b) => b.slug !== bairro.slug)
    .slice(0, 8)

  const temLanding = bairro.tier === 1 && ONDA_ATIVA >= 1
  const mensagem = buildWhatsAppMessage(undefined, bairro.nome)

  const faq = [
    {
      pergunta: `A Nobre Cor atende em ${bairro.nome}?`,
      resposta: `Sim. ${bairro.nome} fica na Região Urbana do ${regiao?.nome ?? 'Campo Grande'} e faz parte da nossa área de atendimento em Campo Grande MS. Agendamos a visita técnica no seu endereço, sem compromisso, e a proposta detalhada chega em até 24 horas no WhatsApp.`,
    },
    {
      pergunta: `Quanto custa pintar uma casa em ${bairro.nome}?`,
      resposta: `Não existe preço fechado por telefone, e desconfie de quem dá. O valor depende da metragem real, do estado da parede e do acabamento. Em ${bairro.nome}, o perfil predominante é: ${bairro.perfil.toLowerCase()}. Fazemos a avaliação no local e o orçamento sai discriminado por ambiente.`,
    },
    {
      pergunta: `Qual o prazo para começar a obra em ${bairro.nome}?`,
      resposta: `Depende da agenda da semana, mas a visita técnica costuma ser marcada em poucos dias. A data de início e a de término entram por escrito na proposta antes de você fechar. É por elas que respondemos.`,
    },
  ]

  return (
    <PageWrapper whatsappMessage={mensagem}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildFaqSchema(faq))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Onde atendemos', url: '/bairros' },
            { name: bairro.nome, url: `/bairros/${bairro.slug}` },
          ])
        )}
      />

      <Hero
        compacta
        eyebrow={regiao ? `Região Urbana do ${regiao.nome}` : 'Campo Grande MS'}
        titulo={
          <>
            Pintor em <span className="text-[#c8963e]">{bairro.nome}</span>, Campo Grande MS
          </>
        }
        subtitulo={`Pintura residencial, comercial e predial em ${bairro.nome} com acabamento de alto padrão, equipe uniformizada e prazo cumprido.`}
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
            <Link href="/bairros" className="hover:text-[#a87b2f]">
              Onde atendemos
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#1b3a5c] font-medium">{bairro.nome}</li>
        </ol>
      </nav>

      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl heading-line">
            Como a Nobre Cor atende {bairro.nome}
          </h2>
          <p className="mt-7 text-[#2b2b2b]/80 leading-relaxed text-lg">
            {bairro.nome} está na Região Urbana do {regiao?.nome ?? 'Campo Grande'}
            {regiao ? `, ${regiao.posicao} de Campo Grande` : ''}. O perfil predominante do bairro
            é: {bairro.perfil.toLowerCase()}. Isso muda a forma como planejamos a obra, do tipo
            de proteção usada até o horário de trabalho combinado com o condomínio ou a portaria.
          </p>
          {regiao && (
            <p className="mt-5 text-[#2b2b2b]/80 leading-relaxed">{regiao.descricao}</p>
          )}

          {bairro.contexto?.map((paragrafo) => (
            <p key={paragrafo.slice(0, 40)} className="mt-5 text-[#2b2b2b]/80 leading-relaxed">
              {paragrafo}
            </p>
          ))}

          {bairro.pontosReferencia.length > 0 && (
            <>
              <h3 className="mt-10 font-display text-xl">
                Referências que atendemos em {bairro.nome}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {bairro.pontosReferencia.map((ponto) => (
                  <li
                    key={ponto}
                    className="rounded-full border border-[#1b3a5c]/12 bg-[#f7f4ef] px-3.5 py-1.5 text-sm text-[#2b2b2b]/75"
                  >
                    {ponto}
                  </li>
                ))}
              </ul>
            </>
          )}

          {!bairro.oficialPlanurb && (
            <p className="mt-8 rounded-xl border border-[#c8963e]/30 bg-[#c8963e]/[0.07] p-4 text-sm text-[#2b2b2b]/75">
              <strong className="text-[#1b3a5c]">Nota:</strong> {bairro.nome} é uma área
              amplamente conhecida da capital, mas não consta como bairro na divisão oficial da
              PLANURB: ela se distribui entre bairros vizinhos da Região Urbana do{' '}
              {regiao?.nome ?? 'Prosa'}.
            </p>
          )}
        </div>
      </article>

      <section className="py-14 bg-[#f7f4ef]" aria-labelledby="servicos-bairro-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="servicos-bairro-heading" className="font-display text-2xl">
            Serviços de pintura em {bairro.nome}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {(temLanding ? SERVICOS_ESTRELA : SERVICOS.slice(0, 8)).map((s) => (
              <li key={s.slug}>
                <Link
                  href={temLanding ? `/${s.slug}-${bairro.slug}` : `/servicos/${s.slug}`}
                  className="flex items-center gap-2.5 rounded-xl border border-[#1b3a5c]/10 bg-white px-4 py-3 text-sm font-medium text-[#1b3a5c] transition-colors hover:border-[#c8963e] hover:text-[#a87b2f]"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#c8963e] shrink-0" aria-hidden="true" />
                  {temLanding ? `${s.nome} em ${bairro.nome}` : s.nome}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/servicos" className="mt-6 inline-block font-semibold text-[#a87b2f] hover:underline">
            Ver todos os serviços →
          </Link>
        </div>
      </section>

      <PortfolioSection
        bairroSlug={bairro.slug}
        titulo={`Obras entregues em ${bairro.nome}`}
      />

      <section className="py-16 bg-white" aria-labelledby="como-trabalhamos-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="como-trabalhamos-heading" className="font-display text-2xl md:text-3xl heading-line">
            Como funciona uma obra em {bairro.nome}
          </h2>
          <ol className="mt-8 space-y-6">
            {[
              {
                titulo: 'Visita técnica no seu endereço',
                texto: `Vamos até o imóvel em ${bairro.nome}, medimos a superfície real, conferimos o estado da parede com luz rasante e identificamos pontos de umidade. Sem essa visita, qualquer valor passado por telefone é chute que vira aditivo depois.`,
              },
              {
                titulo: 'Proposta em até 24 horas',
                texto: `A proposta chega no seu WhatsApp discriminada por ambiente, com a tinta especificada por marca e linha e com as datas de início e término definidas. Você aprova antes de qualquer equipe entrar.`,
              },
              {
                titulo: 'Preparação e proteção',
                texto: `Piso, móveis, bancadas, esquadrias e luminárias protegidos antes da primeira lata. Em condomínio de ${bairro.nome}, a equipe é cadastrada na portaria e o horário segue o regimento interno.`,
              },
              {
                titulo: 'Execução e limpeza diária',
                texto: `Trabalhamos por ambiente, mantendo o restante do imóvel em uso. Ao fim de cada dia o local fica limpo, e isso vale também para a área comum do prédio.`,
              },
              {
                titulo: 'Vistoria de entrega',
                texto: `Percorremos a obra com você sob a luz do ambiente. O que for apontado é corrigido antes de considerarmos entregue.`,
              },
            ].map((etapa, i) => (
              <li key={etapa.titulo} className="flex gap-4">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c8963e]/40 bg-[#c8963e]/10 font-display text-sm text-[#a87b2f]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-base text-[#1b3a5c]">{etapa.titulo}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#2b2b2b]/78">{etapa.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection faq={faq} titulo={`Dúvidas sobre pintura em ${bairro.nome}`} />

      {vizinhos.length > 0 && (
        <section className="py-14 bg-white" aria-labelledby="vizinhos-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="vizinhos-heading" className="font-display text-2xl">
              Também atendemos perto de {bairro.nome}
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {vizinhos.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/bairros/${v.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1b3a5c]/15 bg-[#f7f4ef] px-4 py-2 text-sm text-[#1b3a5c] transition-colors hover:border-[#c8963e] hover:text-[#a87b2f]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#c8963e]" aria-hidden="true" />
                    {v.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection titulo={`Orçamento de pintura em ${bairro.nome}`} bairro={bairro.nome} />
    </PageWrapper>
  )
}
