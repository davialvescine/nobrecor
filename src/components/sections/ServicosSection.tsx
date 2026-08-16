import { GRUPOS, SERVICOS } from '@/content/servicos'
import CatalogoServicos from './CatalogoServicos'
import TituloSecao from '@/components/ui/TituloSecao'
import { Diamante } from '@/components/ui/Logo'

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
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-28"
      style={{
        // Off-white com um miolo levemente mais quente: o chapado #f7f4ef puro
        // deixava a seção morta ao lado das seções escuras (apontado pelo dono).
        background: 'linear-gradient(180deg, #f7f4ef 0%, #f1eadb 45%, #f7f4ef 100%)',
      }}
      aria-labelledby="servicos-heading"
    >
      {/* Listras finas douradas: saíram da hero (brigavam com as fotos) e
          vivem aqui, onde o fundo chapado precisa delas. */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, #c8963e 0 1px, transparent 1px 26px)',
        }}
        aria-hidden="true"
      />
      {/* Halo dourado atrás do título. */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse, rgba(200,150,62,0.22) 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      {/* Diamante da marca em marca d'água. */}
      <Diamante
        className="pointer-events-none absolute -right-20 top-16 h-80 w-80 opacity-[0.06]"
        variante="claro"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
