import { ShieldCheck, CalendarCheck, Users, FileText } from 'lucide-react'
import { BUSINESS } from '@/lib/business'
import Reveal from '@/components/ui/Reveal'
import TituloSecao from '@/components/ui/TituloSecao'

const ICONES = [ShieldCheck, CalendarCheck, Users, FileText]

/**
 * Os 4 diferenciais, em cards de azul-nobre sobre fundo claro.
 *
 * A versão anterior era off-white sobre branco e desaparecia na página — foi
 * apontado pelo dono em 16/08/2026. Invertida a polaridade: os cards agora são
 * o elemento mais escuro da seção, com ícone em chip dourado e halo dourado no
 * canto. O TEXTO não muda: é o aprovado em `BUSINESS.diferenciais`.
 */
export default function DiferenciaisSection() {
  return (
    <section className="bg-white py-24 md:py-28" aria-labelledby="diferenciais-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TituloSecao
          id="diferenciais-heading"
          eyebrow="Por que a Nobre Cor"
          titulo="O que você contrata além da tinta"
          subtitulo="Em pintura, o preço da hora é parecido no mercado inteiro. O que muda o resultado é organização, preparação de superfície e cumprimento de prazo, e é exatamente aí que trabalhamos."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BUSINESS.diferenciais.map((d, i) => {
            const Icone = ICONES[i] ?? ShieldCheck
            return (
              <Reveal
                key={d.titulo}
                as="article"
                delay={i * 110}
                from="baixo"
                className="group relative h-full overflow-hidden rounded-[var(--radius-card)] p-7 shadow-[0_18px_44px_-20px_rgba(27,58,92,0.55)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_56px_-20px_rgba(27,58,92,0.7)]"
                style={{
                  background: 'linear-gradient(150deg, #1f4066 0%, #1b3a5c 55%, #142c47 100%)',
                }}
              >
                {/* Halo dourado no canto: acende no hover. */}
                <div
                  className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-45"
                  style={{ background: 'radial-gradient(circle, #c8963e 0%, transparent 70%)' }}
                  aria-hidden="true"
                />
                {/* Fio dourado na base, crescendo no hover. */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-[0.28] bg-gradient-to-r from-[#c8963e] to-[#906928] transition-transform duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c8963e]/40 bg-[#c8963e]/15 transition-transform duration-300 group-hover:scale-110">
                  <Icone className="h-7 w-7 text-[#e0bd77]" strokeWidth={1.4} aria-hidden="true" />
                </span>

                <h3 className="relative mt-6 font-display text-2xl leading-tight text-white">
                  {d.titulo}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/70">{d.texto}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
