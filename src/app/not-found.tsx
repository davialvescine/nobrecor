import type { Metadata } from 'next'
import Link from 'next/link'
import PageWrapper from '@/components/layout/PageWrapper'
import { buildMetadata } from '@/lib/seo'

/**
 * O 404 herdava o title e a description do root, ficando idêntico à home aos
 * olhos do Google — title duplicado é sinal de conteúdo duplicado. Agora tem
 * texto próprio e `noIndex`: página de erro não deve disputar busca com nada.
 */
export const metadata: Metadata = buildMetadata({
  title: 'Página não encontrada',
  description: 'O endereço não existe ou foi movido. Veja os serviços de pintura da Nobre Cor e o atendimento por bairro em Campo Grande MS.',
  noIndex: true,
})

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="py-28 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-display text-6xl text-[#c8963e]">404</p>
          <h1 className="mt-4 font-display text-3xl md:text-4xl">Página não encontrada</h1>
          <p className="mt-5 text-[#2b2b2b]/75 leading-relaxed">
            O endereço que você abriu não existe ou foi movido. Talvez você esteja procurando um
            serviço ou o atendimento no seu bairro.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/servicos"
              className="btn-dourado inline-flex items-center justify-center font-semibold px-7 py-3.5 rounded-[var(--radius-btn)]"
            >
              Ver serviços de pintura
            </Link>
            <Link
              href="/bairros"
              className="inline-flex items-center justify-center border border-[#1b3a5c]/25 text-[#1b3a5c] font-medium px-7 py-3.5 rounded-[var(--radius-btn)] hover:bg-[#f7f4ef]"
            >
              Onde atendemos
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
