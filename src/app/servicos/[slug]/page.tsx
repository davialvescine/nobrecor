import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle2, MapPin } from 'lucide-react'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import CardServico from '@/components/ui/CardServico'
import IconeServico from '@/components/ui/IconeServico'
import { SERVICOS, getServico, GRUPOS } from '@/content/servicos'
import { BAIRROS_PRIORITARIOS } from '@/content/bairros'
import { buildWhatsAppMessage } from '@/lib/business'
import { buildMetadata, buildTituloServico, buildDescricaoServico } from '@/lib/seo'
import { buildServiceSchema, buildFaqSchema, buildBreadcrumbSchema, jsonLd } from '@/lib/schema'
import { ONDA_ATIVA } from '@/lib/landing-pages'

/**
 * O `foto` de cada serviço já existe no catálogo há tempo, mas os arquivos vão
 * sendo criados aos poucos. Em vez de manter uma lista paralela de "quem já tem
 * foto" — que sempre sai de sincronia — a página checa o arquivo no build.
 *
 * Roda só no servidor, durante a geração estática: nada disso vai para o
 * navegador. Consequência prática: basta soltar o .jpg em public/images/servicos
 * com o nome certo e a foto aparece no próximo deploy, sem tocar em código.
 */
function existeFoto(caminhoPublico: string): boolean {
  return existsSync(join(process.cwd(), 'public', caminhoPublico))
}

interface Props {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return SERVICOS.map((s) => ({ slug: s.slug }))
}

/** Slug fora do catálogo responde 404 direto, sem render sob demanda. */
export const dynamicParams = false

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const servico = getServico(slug)
  if (!servico) return {}

  return buildMetadata({
    title: buildTituloServico(servico.nomeSeo || servico.nome),
    description: buildDescricaoServico(servico.nome),
    path: `/servicos/${servico.slug}`,
  })
}

export default async function ServicoPage({ params }: Props) {
  const { slug } = await params
  const servico = getServico(slug)
  if (!servico) notFound()

  const temFoto = existeFoto(servico.foto)

  const relacionados = SERVICOS.filter(
    (s) => s.grupo === servico.grupo && s.slug !== servico.slug
  ).slice(0, 3)

  // Só linkamos bairros cuja landing já está publicada na onda ativa.
  const bairrosComLanding =
    servico.prioridade === 'estrela' && ONDA_ATIVA >= 1 ? BAIRROS_PRIORITARIOS : []

  return (
    <PageWrapper whatsappMessage={buildWhatsAppMessage(servico.nome)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildServiceSchema(servico))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(buildFaqSchema(servico.faq))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'Serviços', url: '/servicos' },
            { name: servico.nome, url: `/servicos/${servico.slug}` },
          ])
        )}
      />

      <Hero
        compacta
        eyebrow={GRUPOS[servico.grupo]}
        titulo={
          <>
            {servico.nome} em <span className="text-[#c8963e]">Campo Grande MS</span>
          </>
        }
        subtitulo={servico.descricao}
        mensagemWhatsApp={buildWhatsAppMessage(servico.nome)}
      />

      {/* Breadcrumb visível, reforça o BreadcrumbList do JSON-LD */}
      <nav
        aria-label="Você está em"
        className="border-b border-[#1b3a5c]/10 bg-[#f7f4ef] text-sm"
      >
        <ol className="max-w-4xl mx-auto flex flex-wrap items-center gap-2 px-4 sm:px-6 lg:px-8 py-3 text-[#2b2b2b]/70">
          <li>
            <Link href="/" className="hover:text-[#a87b2f]">
              Início
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/servicos" className="hover:text-[#a87b2f]">
              Serviços
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#1b3a5c] font-medium">{servico.nome}</li>
        </ol>
      </nav>

      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Foto ilustrativa do acabamento deste serviço.

            ⚠️ É imagem GERADA, ambientação — NÃO é obra da Nobre Cor. Por isso
            não tem legenda de obra, e o `alt` descreve o tipo de acabamento, não
            um trabalho executado (ver .claude/rules/conteudo.md). Quando houver
            foto de obra real, ela substitui aqui e só então pode ser legendada
            como obra.

            `priority` porque é o elemento de LCP desta página.
          */}
          {temFoto && (
            <div className="relative mb-10 aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] shadow-[0_20px_44px_-24px_rgba(27,58,92,0.45)]">
              <Image
                src={servico.foto}
                alt={`Acabamento de ${servico.nome.toLowerCase()}`}
                fill
                sizes="(min-width: 1024px) 56rem, 100vw"
                quality={78}
                priority
                className="object-cover"
              />
            </div>
          )}

          <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-[#c8963e]/30 bg-[#c8963e]/10 text-[#a87b2f]">
            <IconeServico nome={servico.icone} className="h-8 w-8" />
          </span>
          <h2 className="mt-6 font-display text-2xl md:text-3xl heading-line">
            Como a Nobre Cor executa {servico.nome.toLowerCase()} em Campo Grande
          </h2>
          <p className="mt-7 text-[#2b2b2b]/80 leading-relaxed text-lg">
            {servico.descricaoLonga}
          </p>

          <h3 className="mt-12 font-display text-xl">O que está incluso no serviço</h3>
          {servico.inclui.length > 0 && (
            <p className="mt-4 text-sm text-[#2b2b2b]/70">
              <strong className="font-semibold text-[#1b3a5c]">Inclui:</strong>{' '}
              {servico.inclui.join(', ')}.
            </p>
          )}
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

          <h3 className="mt-12 font-display text-xl">
            Passo a passo de como executamos
          </h3>
          <ol className="mt-6 space-y-5">
            {servico.etapas.map((etapa, i) => (
              <li key={etapa.titulo} className="flex gap-4">
                <span
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c8963e]/40 bg-[#c8963e]/10 font-display text-sm text-[#a87b2f]"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-display text-base text-[#1b3a5c]">{etapa.titulo}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#2b2b2b]/78">{etapa.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 rounded-[var(--radius-card)] border-l-4 border-[#c8963e] bg-[#f7f4ef] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a87b2f]">
              O erro mais comum
            </p>
            <h3 className="mt-2 font-display text-xl">{servico.erroComum.titulo}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#2b2b2b]/80">
              {servico.erroComum.texto}
            </p>
          </div>

          <h3 className="mt-12 font-display text-xl">
            Quanto custa {servico.nome.toLowerCase()} em Campo Grande MS?
          </h3>
          <p className="mt-4 text-[#2b2b2b]/80 leading-relaxed">
            O valor é cobrado {servico.unidade} e depende da metragem real, do estado da superfície e
            do acabamento contratado. A Nobre Cor não trabalha com preço de tabela por telefone
            justamente porque isso costuma virar aditivo depois: fazemos a avaliação técnica no
            local, sem compromisso, e enviamos a proposta discriminada em até 24 horas pelo
            WhatsApp, já com material especificado e prazo de início e término definidos.
          </p>
        </div>
      </article>

      {bairrosComLanding.length > 0 && (
        <section className="py-14 bg-[#f7f4ef]" aria-labelledby="bairros-servico-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="bairros-servico-heading" className="font-display text-2xl">
              {servico.nome} por bairro em Campo Grande
            </h2>
            <p className="mt-3 text-[#2b2b2b]/75">
              Páginas com o atendimento detalhado em cada área nobre da capital.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {bairrosComLanding.map((b) => (
                <li key={b.slug}>
                  <Link
                    href={`/${servico.slug}-${b.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1b3a5c]/15 bg-white px-4 py-2 text-sm text-[#1b3a5c] transition-colors hover:border-[#c8963e] hover:text-[#a87b2f]"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#c8963e]" aria-hidden="true" />
                    {servico.nome} em {b.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <PortfolioSection
        servicoSlug={servico.slug}
        titulo={`Obras de ${servico.nome.toLowerCase()} em Campo Grande`}
      />

      <FaqSection faq={servico.faq} titulo={`Dúvidas sobre ${servico.nome.toLowerCase()}`} />

      {relacionados.length > 0 && (
        <section className="py-14 bg-white" aria-labelledby="relacionados-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="relacionados-heading" className="font-display text-2xl">
              Serviços relacionados
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {relacionados.map((s) => (
                <li key={s.slug}>
                  <CardServico servico={s} cta="Ver serviço" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection
        titulo={`Precisa de ${servico.nome.toLowerCase()}?`}
        servico={servico.nome}
      />
    </PageWrapper>
  )
}
