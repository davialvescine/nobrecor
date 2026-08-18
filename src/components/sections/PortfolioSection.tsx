import Image from 'next/image'
import Link from 'next/link'
import { PORTFOLIO, getObrasPorBairro, getObrasPorServico } from '@/content/portfolio'
import { getBairro } from '@/content/bairros'
import Reveal from '@/components/ui/Reveal'

interface PortfolioSectionProps {
  titulo?: string
  subtitulo?: string
  /** Filtra as obras por bairro ou serviço. Sem filtro, mostra as mais recentes. */
  bairroSlug?: string
  servicoSlug?: string
  limite?: number
}

/**
 * Galeria antes/depois.
 *
 * Renderiza `null` quando não há obra cadastrada. É proposital: seção vazia com
 * placeholder cinza passa a impressão de site inacabado, e foto de banco de
 * imagens apresentada como obra da empresa é propaganda enganosa.
 */
export default function PortfolioSection({
  titulo = 'Obras entregues em Campo Grande',
  subtitulo = 'Antes e depois de obras reais executadas pela nossa equipe.',
  bairroSlug,
  servicoSlug,
  limite = 6,
}: PortfolioSectionProps) {
  let obras = PORTFOLIO
  if (bairroSlug) obras = getObrasPorBairro(bairroSlug)
  if (servicoSlug) obras = getObrasPorServico(servicoSlug)
  obras = obras.slice(0, limite)

  if (obras.length === 0) return null

  return (
    <section className="py-20 bg-white" aria-labelledby="portfolio-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[#906928] font-semibold text-xs uppercase tracking-[0.18em] mb-3">
            Portfólio
          </p>
          <h2 id="portfolio-heading" className="font-display text-3xl md:text-4xl heading-line-center">
            {titulo}
          </h2>
          <p className="mt-7 text-[#2b2b2b]/75 leading-relaxed">{subtitulo}</p>
        </Reveal>

        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {obras.map((obra, i) => {
            const bairro = getBairro(obra.bairro)
            return (
              <Reveal as="li" key={obra.slug} delay={(i % 3) * 100}>
                <article className="group overflow-hidden rounded-[var(--radius-card)] border border-[#1b3a5c]/10 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-card-hover)]">
                  <div className="relative grid grid-cols-2">
                    {[
                      { rotulo: 'Antes', foto: obra.antes },
                      { rotulo: 'Depois', foto: obra.depois },
                    ].map(({ rotulo, foto }) => (
                      <div key={rotulo} className="relative aspect-4/3 overflow-hidden">
                        <Image
                          src={foto.src}
                          alt={foto.alt}
                          fill
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 17vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-2 top-2 rounded-full bg-[#1b3a5c]/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                          {rotulo}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg text-[#1b3a5c]">{obra.titulo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#2b2b2b]/72">
                      {obra.descricao}
                    </p>
                    <p className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#2b2b2b]/55">
                      {bairro && (
                        <Link
                          href={`/bairros/${bairro.slug}`}
                          className="rounded-full border border-[#1b3a5c]/12 bg-[#f7f4ef] px-2.5 py-1 transition-colors hover:border-[#c8963e] hover:text-[#906928]"
                        >
                          {bairro.nome}
                        </Link>
                      )}
                      <span>{obra.ano}</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
