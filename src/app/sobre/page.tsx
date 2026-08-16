import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/sections/Hero'
import DiferenciaisSection from '@/components/sections/DiferenciaisSection'
import ProcessoSection from '@/components/sections/ProcessoSection'
import CtaSection from '@/components/sections/CtaSection'
import { buildMetadata } from '@/lib/seo'
import { buildBreadcrumbSchema, jsonLd } from '@/lib/schema'

export const metadata: Metadata = buildMetadata({
  title: 'A Empresa Nobre Cor Pinturas em Campo Grande MS',
  description:
    'Conheça a Nobre Cor Pinturas: empresa de pintura de alto padrão em Campo Grande MS, com equipe uniformizada, obra organizada e cronograma cumprido.',
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
        eyebrow="A empresa"
        titulo={
          <>
            Uma empresa de pintura construída para o{' '}
            <span className="text-[#c8963e]">alto padrão</span>
          </>
        }
        subtitulo="A Nobre Cor nasceu para resolver o problema mais comum de quem contrata pintura em Campo Grande: obra que atrasa, equipe que suja e acabamento que não resiste a uma olhada de perto."
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
            A Nobre Cor trabalha com um processo fixo de cinco etapas, do primeiro contato à
            vistoria de entrega. Cada obra tem data de início e data de término definidas no
            orçamento. É por elas que respondemos. A equipe é uniformizada, identificada e
            treinada para acabamentos que arquiteto e designer conferem de perto: marmorato,
            grafiato, pintura decorativa e pintura fina.
          </p>
          <p className="mt-5 text-[#2b2b2b]/80 leading-relaxed">
            Atendemos Campo Grande MS inteira, com foco nas áreas nobres da capital: Chácara
            Cachoeira, Carandá Bosque, Santa Fé, Jardim dos Estados, Mata do Jacinto, Parque dos
            Poderes, Itanhangá e o eixo dos Altos da Afonso Pena.
          </p>
        </div>
      </section>

      <DiferenciaisSection />
      <ProcessoSection />
      <CtaSection />
    </PageWrapper>
  )
}
