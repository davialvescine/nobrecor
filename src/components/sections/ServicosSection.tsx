import { GRUPOS, SERVICOS } from '@/content/servicos'
import CatalogoServicos from './CatalogoServicos'
import TituloSecao from '@/components/ui/TituloSecao'

interface ServicosSectionProps {
  titulo?: string
  subtitulo?: string
}

/**
 * Seção do catálogo completo (home e /servicos — as outras páginas montam seus
 * próprios grids com CardServico direto).
 *
 * Server Component de casca: computa grupos e recorta cada serviço para os 5
 * campos que o card usa, e entrega ao CatalogoServicos (cliente) fazer o filtro.
 * O recorte não é frescura: mandar o `Servico` inteiro por props embarcaria
 * FAQ, etapas e erroComum de 20 serviços no payload da página.
 */
export default function ServicosSection({
  titulo = 'Serviços de pintura e acabamento em Campo Grande MS',
  subtitulo = 'A Nobre Cor executa pintura, repintura, recuperação de superfícies, texturas e acabamentos técnicos em imóveis residenciais, comerciais e obras de alto padrão.',
}: ServicosSectionProps) {
  const grupos = (Object.keys(GRUPOS) as Array<keyof typeof GRUPOS>)
    .map((chave) => ({
      chave,
      nome: GRUPOS[chave],
      qtd: SERVICOS.filter((s) => s.grupo === chave).length,
    }))
    .filter((g) => g.qtd > 0)

  const itens = SERVICOS.map((s) => ({
    slug: s.slug,
    nome: s.nome,
    descricao: s.descricao,
    inclui: s.inclui,
    icone: s.icone,
    grupo: s.grupo,
  }))

  return (
    <section
      id="servicos"
      className="scroll-mt-20 bg-[#f7f4ef] py-24 md:py-28"
      aria-labelledby="servicos-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TituloSecao
          id="servicos-heading"
          eyebrow="Catálogo completo"
          titulo={titulo}
          subtitulo={subtitulo}
        />

        <CatalogoServicos grupos={grupos} itens={itens} />
      </div>
    </section>
  )
}
