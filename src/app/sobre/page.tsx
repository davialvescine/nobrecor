import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import FundadorSection from '@/components/sections/FundadorSection'
import DiferenciaisSection from '@/components/sections/DiferenciaisSection'
import ProcessoSection from '@/components/sections/ProcessoSection'
import CtaSection from '@/components/sections/CtaSection'
import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'A Empresa Nobre Cor Pinturas em Campo Grande MS',
  description:
    'Empresa de pintura de alto padrão em Campo Grande MS, com mais de 20 anos de experiência. Equipe uniformizada, obra protegida e limpa e cronograma cumprido.',
  path: '/sobre',
  tituloAbsoluto: true,
})

export default function SobrePage() {
  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildBreadcrumbSchema([
            { name: 'Início', url: '/' },
            { name: 'A empresa', url: '/sobre' },
          ])
        )}
      />

      <Hero
        compacta
        eyebrow="A empresa"
        titulo={
          <>
            Transformando ambientes pela{' '}
            <span className="text-[#c8963e]">cor</span> há mais de 20 anos
          </>
        }
        subtitulo="A Nobre Cor é uma empresa de pintura de alto padrão em Campo Grande MS, com mais de duas décadas de experiência em pintura residencial, comercial e predial. Nasceu para resolver o problema mais comum de quem contrata pintura: obra que atrasa, equipe que suja e acabamento que não resiste a uma olhada de perto."
      />

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl md:text-3xl heading-line">
            O que fazemos diferente
          </h2>
          <p className="mt-7 text-[#2b2b2b]/80 leading-relaxed text-lg">
            Em pintura, quase todo mundo cobra parecido pela hora trabalhada. O que muda o resultado
            é o que acontece antes da tinta: quanto tempo se investe na preparação da superfície,
            quão bem o ambiente é protegido e se o prazo prometido é o prazo cumprido.
          </p>
          <p className="mt-5 text-[#2b2b2b]/80 leading-relaxed">
            É aí que os mais de 20 anos de experiência pesam. Superfície mal lida gera serviço
            refeito, e serviço refeito é prejuízo dos dois lados. Por isso toda obra começa com
            avaliação técnica no local: o estado real da parede define o preparo, o preparo define
            o material e só então existe um número. Orçamento por telefone, sem ver a obra, é
            chute, e chute em pintura sempre aparece depois.
          </p>
          <p className="mt-5 text-[#2b2b2b]/80 leading-relaxed">
            A Nobre Cor trabalha com um processo fixo de cinco etapas, do primeiro contato à
            vistoria de entrega. Cada obra tem data de início e data de término definidas no
            orçamento. É por elas que respondemos. A equipe é uniformizada, identificada e
            treinada para acabamentos que arquiteto e designer conferem de perto: marmorato,
            grafiato, pintura decorativa e pintura fina.
          </p>
          <p className="mt-5 text-[#2b2b2b]/80 leading-relaxed">
            Atendemos Campo Grande MS inteira, incluindo Chácara Cachoeira, Carandá Bosque,
            Santa Fé, Jardim dos Estados, Mata do Jacinto, Parque dos Poderes, Itanhangá e o
            eixo dos Altos da Afonso Pena. O padrão de execução é o mesmo em qualquer endereço
            da cidade: o que muda de uma obra para outra é o tipo de imóvel e o acabamento
            contratado, nunca o cuidado.
          </p>
        </div>
      </section>

      <FundadorSection />
      <DiferenciaisSection />
      <ProcessoSection />
      <CtaSection />
    </PageWrapper>
  )
}
