import { GRUPOS, SERVICOS, type Servico } from '@/content/servicos'
import CardServico from '@/components/ui/CardServico'
import Reveal from '@/components/ui/Reveal'
import TituloSecao from '@/components/ui/TituloSecao'

interface ServicosSectionProps {
  titulo?: string
  subtitulo?: string
  /** Quando omitido, mostra o catálogo inteiro agrupado. */
  servicos?: Servico[]
  /** Quando presente, cada card aponta para a landing daquele bairro. */
  bairroSlug?: string
  bairroNome?: string
}

export default function ServicosSection({
  titulo = 'Serviços de pintura e acabamento em Campo Grande',
  subtitulo = 'A Nobre Cor executa pintura, repintura, recuperação de superfícies, texturas e acabamentos técnicos em imóveis residenciais, comerciais e obras de alto padrão.',
  servicos = SERVICOS,
  bairroSlug,
  bairroNome,
}: ServicosSectionProps) {
  const grupos = (Object.keys(GRUPOS) as Array<keyof typeof GRUPOS>)
    .map((chave) => ({
      chave,
      nome: GRUPOS[chave],
      itens: servicos.filter((s) => s.grupo === chave),
    }))
    .filter((g) => g.itens.length > 0)

  return (
    <section className="bg-[#f7f4ef] py-24 md:py-28" aria-labelledby="servicos-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TituloSecao
          id="servicos-heading"
          eyebrow="Cardápio completo"
          titulo={titulo}
          subtitulo={subtitulo}
        />

        <div className="mt-16 space-y-16">
          {grupos.map((grupo) => (
            <div key={grupo.chave}>
              <Reveal>
                <h3 className="font-display text-xl text-[#1b3a5c]">
                  {grupo.nome}
                  <span className="ml-2.5 font-body text-sm font-normal text-[#2b2b2b]/50">
                    {grupo.itens.length}{' '}
                    {grupo.itens.length === 1 ? 'serviço' : 'serviços'}
                  </span>
                </h3>
              </Reveal>

              <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.itens.map((s, i) => (
                  <Reveal as="li" key={s.slug} delay={(i % 3) * 90}>
                    <CardServico servico={s} bairroSlug={bairroSlug} bairroNome={bairroNome} />
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
