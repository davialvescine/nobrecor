import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/content/servicos'
import Reveal from '@/components/ui/Reveal'

interface FaqSectionProps {
  faq: FaqItem[]
  /** Vira o H2 da seção. Formato de pergunta ajuda em AI Overviews. */
  titulo?: string
  subtitulo?: string
}

/**
 * FAQ em `<details>/<summary>` nativo, e não em accordion controlado por estado.
 *
 * A diferença não é estética, é de indexação: num accordion em React só a
 * resposta ABERTA existe no HTML. As outras não chegam ao crawler nem a quem
 * está sem JavaScript, e o Ctrl+F do navegador não acha. Com `<details>`, todas
 * as respostas ficam no DOM desde o primeiro byte, apenas recolhidas
 * visualmente. De quebra, o componente deixa de precisar de `'use client'` e a
 * navegação por teclado e leitor de tela passa a ser nativa do browser.
 */
export default function FaqSection({
  faq,
  titulo = 'Perguntas frequentes',
  subtitulo,
}: FaqSectionProps) {
  if (faq.length === 0) return null

  return (
    <section
      id="faq"
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-28"
      style={{
        background: 'linear-gradient(180deg, #f7f4ef 0%, #f1eadb 50%, #f7f4ef 100%)',
      }}
      aria-labelledby="faq-heading"
    >
      {/* Mesma assinatura do resto do site: listras douradas e halo. */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, #c8963e 0 1px, transparent 1px 26px)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[22rem] w-[40rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(200,150,62,0.20) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#906928]">
            Tire suas dúvidas
          </p>
          <h2 id="faq-heading" className="heading-line-center font-display text-4xl leading-[1.08] md:text-5xl lg:text-[3.4rem]">
            {titulo}
          </h2>
          {subtitulo && <p className="mt-7 text-[#2b2b2b]/75">{subtitulo}</p>}
        </Reveal>

        <div className="space-y-3">
          {faq.map((item, idx) => (
            <Reveal key={item.pergunta} delay={idx * 60}>
              <details
                className="group overflow-hidden rounded-xl border border-[#1b3a5c]/10 bg-white transition-all duration-300 open:border-[#c8963e]/45 open:shadow-[0_16px_36px_-18px_rgba(27,58,92,0.35)] hover:shadow-[var(--shadow-card)]"
                // A primeira nasce aberta: mostra o padrão de interação e
                // garante conteúdo visível logo abaixo do título da seção.
                open={idx === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[#f7f4ef] [&::-webkit-details-marker]:hidden">
                  <h3 className="font-body text-base font-semibold text-[#1b3a5c] transition-colors group-open:text-[#906928]">
                    {item.pergunta}
                  </h3>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#c8963e]/35 bg-[#c8963e]/10 transition-colors duration-300 group-open:bg-[#c8963e]">
                    <ChevronDown
                      className="h-4 w-4 text-[#c8963e] transition-all duration-300 group-open:rotate-180 group-open:text-[#1b3a5c]"
                      aria-hidden="true"
                    />
                  </span>
                </summary>
                {/* Fio dourado à esquerda da resposta: liga o FAQ à assinatura visual do site. */}
                <div className="mx-6 mb-5 mt-1 border-l-2 border-[#c8963e]/60 pb-0 pl-4 pt-0 text-sm leading-relaxed text-[#2b2b2b]/80">
                  {item.resposta}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
