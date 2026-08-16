/**
 * As 7 regiões urbanas de Campo Grande MS (divisão oficial da PLANURB).
 *
 * Servem para: (a) agrupar os bairros na página /bairros, (b) dar contexto
 * geográfico às landings hiperlocais, (c) alimentar o `areaServed` do Schema.
 */

export interface RegiaoUrbana {
  slug: string
  nome: string
  nomeCompleto: string
  descricao: string
  /** Posição relativa ao centro da cidade — usado na copy das páginas. */
  posicao: string
}

export const REGIOES_URBANAS: RegiaoUrbana[] = [
  {
    slug: 'centro',
    nome: 'Centro',
    nomeCompleto: 'Região Urbana do Centro, Campo Grande MS',
    descricao:
      'Coração histórico e comercial da cidade, com os bairros mais tradicionais e de maior valor por metro quadrado. Concentra prédios antigos que exigem repintura de fachada e imóveis de alto padrão no Jardim dos Estados e no Itanhangá.',
    posicao: 'centro da cidade',
  },
  {
    slug: 'prosa',
    nome: 'Prosa',
    nomeCompleto: 'Região Urbana do Prosa, Campo Grande MS',
    descricao:
      'A região mais nobre de Campo Grande. Reúne Chácara Cachoeira, Carandá Bosque, Santa Fé, Mata do Jacinto e o Parque dos Poderes, condomínios fechados, casas de alto padrão e os principais projetos de arquitetura da capital.',
    posicao: 'nordeste e leste',
  },
  {
    slug: 'segredo',
    nome: 'Segredo',
    nomeCompleto: 'Região Urbana do Segredo, Campo Grande MS',
    descricao:
      'Região a norte do centro, com bairros consolidados como Nova Lima, Coronel Antonino e Monte Castelo. Mix de residências e comércio de bairro, com forte demanda por repintura e recuperação de fachadas.',
    posicao: 'norte',
  },
  {
    slug: 'bandeira',
    nome: 'Bandeira',
    nomeCompleto: 'Região Urbana do Bandeira, Campo Grande MS',
    descricao:
      'Sudeste da capital, onde ficam Tiradentes, Rita Vieira, Vilas Boas e o Universitário. Área de expansão vertical recente, com muitos condomínios de apartamentos novos e entregas de obra.',
    posicao: 'sudeste e parte do sul',
  },
  {
    slug: 'anhanduizinho',
    nome: 'Anhanduizinho',
    nomeCompleto: 'Região Urbana do Anhanduizinho, Campo Grande MS',
    descricao:
      'A região mais populosa da cidade, ao sul e sudoeste. Aero Rancho, Guanandi, Centenário e Jockey Club concentram grande volume de residências que demandam pintura interna e externa.',
    posicao: 'sul e sudoeste',
  },
  {
    slug: 'lagoa',
    nome: 'Lagoa',
    nomeCompleto: 'Região Urbana da Lagoa, Campo Grande MS',
    descricao:
      'Sudoeste da capital, com bairros de grande porte como Bandeirantes, Taveirópolis, Caiçara e Tijuca. Área de forte atividade comercial de bairro e conjuntos habitacionais.',
    posicao: 'sudoeste',
  },
  {
    slug: 'imbirussu',
    nome: 'Imbirussu',
    nomeCompleto: 'Região Urbana do Imbirussu, Campo Grande MS',
    descricao:
      'Oeste da cidade, onde fica o Núcleo Industrial de Campo Grande. Reúne demanda residencial (Santo Amaro, Popular, Nova Campo Grande) e industrial (galpões, pintura epóxi e demarcação de piso).',
    posicao: 'oeste',
  },
]

export function getRegiaoUrbana(slug: string): RegiaoUrbana | undefined {
  return REGIOES_URBANAS.find((r) => r.slug === slug)
}
