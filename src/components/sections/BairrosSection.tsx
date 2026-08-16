import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { BAIRROS_PRIORITARIOS, TOTAL_BAIRROS } from '@/content/bairros'
import Reveal from '@/components/ui/Reveal'
import TituloSecao from '@/components/ui/TituloSecao'

/**
 * Bloco de áreas atendidas na home.
 *
 * Mostra apenas os bairros tier 1 (área nobre — foco comercial da Nobre Cor) e
 * manda o restante para /bairros. Listar 81 nomes soltos na home viraria bloco
 * de keyword stuffing.
 */
export default function BairrosSection() {
  return (
    <section
      id="bairros"
      className="relative scroll-mt-20 overflow-hidden bg-white py-24 md:py-28"
      aria-labelledby="bairros-heading"
    >
      {/* Seção CLARA: a foto entra bem rebaixada, só para dar matéria ao fundo.
          Os chips de bairro são o conteúdo e precisam continuar legíveis.
          Ambientação, não obra da empresa (ver .claude/rules/conteudo.md). */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/fundos/bairros-fachada.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 75% at 50% 45%, rgba(255,255,255,0.975) 0%, rgba(255,255,255,0.94) 60%, rgba(247,244,239,0.86) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TituloSecao
          id="bairros-heading"
          eyebrow="Onde atendemos"
          titulo="Pintura nos bairros nobres de Campo Grande"
          subtitulo={`A Nobre Cor atende Campo Grande MS inteira, nas 7 regiões urbanas e ${TOTAL_BAIRROS} bairros. O foco do nosso acabamento de alto padrão está nas áreas abaixo, e é nelas que a equipe circula todos os dias.`}
        />

        <ul className="mt-14 flex flex-wrap justify-center gap-2.5">
          {BAIRROS_PRIORITARIOS.map((b, i) => (
            <Reveal as="li" key={b.slug} delay={i * 45} from="escala">
              <Link
                href={`/bairros/${b.slug}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1b3a5c]/15 bg-[#f7f4ef] px-4 py-2 text-sm text-[#1b3a5c] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c8963e] hover:bg-white hover:text-[#a87b2f]"
              >
                <MapPin className="w-3.5 h-3.5 text-[#c8963e]" aria-hidden="true" />
                {b.nome}
              </Link>
            </Reveal>
          ))}
        </ul>

        <Link
          href="/bairros"
          className="mx-auto mt-10 flex w-fit items-center gap-2 font-semibold text-[#a87b2f] hover:underline"
        >
          Ver os {TOTAL_BAIRROS} bairros atendidos, por região urbana →
        </Link>
      </div>
    </section>
  )
}
