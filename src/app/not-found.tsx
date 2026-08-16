import Link from 'next/link'
import PageWrapper from '@/components/layout/PageWrapper'

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
