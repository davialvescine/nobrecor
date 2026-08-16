import { ShieldCheck, CalendarCheck, Users, FileText } from 'lucide-react'
import { BUSINESS } from '@/lib/business'
import Reveal from '@/components/ui/Reveal'
import TituloSecao from '@/components/ui/TituloSecao'

const ICONES = [ShieldCheck, CalendarCheck, Users, FileText]

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
              <Reveal key={d.titulo} as="article" delay={i * 110} from="baixo" className="group h-full rounded-[var(--radius-card)] border border-[#1b3a5c]/8 bg-[#f7f4ef] p-7 shadow-[var(--shadow-card)] hover:-translate-y-1.5 hover:border-[#c8963e]/45 hover:shadow-[var(--shadow-card-hover)]">
                <Icone
                  className="w-8 h-8 text-[#c8963e] transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <h3 className="mt-5 font-display text-2xl leading-tight">{d.titulo}</h3>
                <p className="mt-3 text-sm text-[#2b2b2b]/75 leading-relaxed">{d.texto}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
