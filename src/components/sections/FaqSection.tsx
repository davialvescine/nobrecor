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
    <section className="bg-[#f7f4ef] py-24 md:py-28" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-14 text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a87b2f]">
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
                className="group overflow-hidden rounded-xl border border-[#1b3a5c]/10 bg-white transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
                // A primeira nasce aberta: mostra o padrão de interação e
                // garante conteúdo visível logo abaixo do título da seção.
                open={idx === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-[#f7f4ef] [&::-webkit-details-marker]:hidden">
                  <h3 className="font-body text-base font-semibold text-[#1b3a5c]">
                    {item.pergunta}
                  </h3>
                  <ChevronDown
                    className="h-5 w-5 shrink-0 text-[#c8963e] transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="border-t border-[#1b3a5c]/10 px-6 pb-5 pt-4 text-sm leading-relaxed text-[#2b2b2b]/80">
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
