/**
 * Catálogo de serviços da Nobre Cor Pinturas.
 *
 * Origem: seção 8 de `docs/relatorio-pesquisa.md` (20 tipos de pintura) + as duas
 * páginas guarda-chuva de maior volume de busca ("pintura residencial" e
 * "pintura de alto padrão").
 *
 * `prioridade` governa a ordem de publicação das landings hiperlocais e o
 * destaque na home. Como o posicionamento da marca é ALTO PADRÃO, as estrelas
 * são os serviços que o público nobre contrata — não os de maior volume bruto.
 */

export interface FaqItem {
  pergunta: string
  resposta: string
}

export interface Servico {
  slug: string
  nome: string
  /** Nome curto para o <title> quando o completo estoura 60 chars. */
  nomeSeo?: string
  grupo: 'residencial' | 'texturas' | 'comercial' | 'tecnica'
  descricao: string
  descricaoLonga: string
  /** Nome do ícone lucide-react. */
  icone: string
  foto: string
  ogImage?: string
  prioridade: 'estrela' | 'alto' | 'medio'
  unidade: string
  /** Itens curtos exibidos na linha "Inclui:" do card. Frases nominais, sem verbo. */
  inclui: string[]
  /**
   * Passo a passo REAL da execução deste serviço. É o conteúdo que diferencia
   * uma página de serviço de um panfleto, e o que impede thin content: cada
   * serviço tem um processo diferente e isso precisa aparecer na página.
   */
  etapas: { titulo: string; texto: string }[]
  /**
   * O erro que mais aparece neste serviço quando ele é feito às pressas.
   * Conteúdo técnico do ramo, útil para o cliente decidir e único por serviço.
   */
  erroComum: { titulo: string; texto: string }
  keywords: string[]
  beneficios: string[]
  faq: FaqItem[]
}

export const GRUPOS = {
  residencial: 'Residencial',
  texturas: 'Texturas e efeitos decorativos',
  comercial: 'Comercial e predial',
  tecnica: 'Técnica e manutenção',
} as const

export const SERVICOS: Servico[] = [
  // ───────────────────────────────────────────────────────────── RESIDENCIAL
  {
    slug: 'pintura-de-alto-padrao',
    nome: 'Pintura de Alto Padrão',
    nomeSeo: 'Pintura Alto Padrão',
    grupo: 'residencial',
    descricao:
      'Acabamento fino para residências exigentes: preparação impecável de parede, tinta premium e nível de detalhe que aparece sob luz rasante.',
    descricaoLonga:
      'Pintura de alto padrão é o serviço que define a Nobre Cor. Trabalhamos em residências e coberturas em Campo Grande MS onde o acabamento não admite falha: parede lixada até ficar plana no toque, recorte de teto e rodapé feito à mão, emassamento em demãos controladas e tinta premium aplicada com equipamento adequado a cada superfície. A equipe é uniformizada, o ambiente fica protegido com lona e fita de baixa aderência do primeiro ao último dia, e a obra é entregue limpa. Atendemos com esse padrão toda Campo Grande, incluindo Chácara Cachoeira, Carandá Bosque, Santa Fé, Jardim dos Estados, Parque dos Poderes e o eixo da Afonso Pena.',
    icone: 'Gem',
    foto: '/images/servicos/pintura-de-alto-padrao.jpg',
    prioridade: 'estrela',
    unidade: 'por m² ou por projeto',
    inclui: [
      'Nivelamento sob luz rasante',
      'Tinta premium',
      'Recorte à mão',
      'Proteção integral do ambiente',
      'Vistoria de entrega',
    ],
    etapas: [
      {
        titulo: 'Leitura da superfície',
        texto:
          'Percorremos o imóvel com lanterna em luz rasante, paralela à parede. É esse teste que revela ondulação, emenda de gesso e remendo antigo que a luz do teto esconde. O que for encontrado entra no orçamento como item, não como surpresa depois.',
      },
      {
        titulo: 'Correção e emassamento',
        texto:
          'Massa aplicada em camadas finas, com lixamento entre elas. Camada grossa seca por fora e continua mole por dentro, trinca meses depois. O número de demãos varia conforme o estado real da parede.',
      },
      {
        titulo: 'Amostra aprovada',
        texto:
          'Antes de fechar a área toda, aplicamos a cor na própria parede e conferimos com você sob a luz do ambiente. Cor em leque não reproduz o que a luz do local faz com o pigmento.',
      },
      {
        titulo: 'Pintura em demãos cruzadas',
        texto:
          'Aplicação em sentidos alternados, o que elimina a marca de rolo. Recorte de teto, rodapé e esquadria feito à mão, com pincel, e não com fita apenas.',
      },
      {
        titulo: 'Vistoria de entrega',
        texto:
          'Percorremos a obra com você sob a mesma luz rasante do início. Qualquer ponto apontado é corrigido antes de a equipe desmontar a proteção.',
      },
    ],
    erroComum: {
      titulo: 'Pular a conferência em luz rasante',
      texto:
        'O defeito que ninguém vê na obra é o que aparece na primeira noite com as luminárias acesas. Luz de teto bate de cima e disfarça ondulação; luz de spot e luz natural pela janela batem de lado e revelam tudo. Conferir a parede na mesma luz do projeto, antes de liberar a tinta, é o que separa alto padrão de pintura bem feita.',
    },
    keywords: [
      'pintura de alto padrão campo grande',
      'pintor alto padrão campo grande ms',
      'empresa de pintura de luxo campo grande',
      'acabamento fino pintura campo grande',
    ],
    beneficios: [
      'Preparação de parede em demãos controladas até o nivelamento perfeito',
      'Tintas premium (linha superior de fabricantes reconhecidos)',
      'Recorte à mão em teto, rodapé e esquadria, sem transbordo',
      'Proteção total de piso, móveis e esquadrias durante toda a obra',
      'Equipe uniformizada e obra limpa ao fim de cada dia',
      'Cronograma definido no orçamento e cumprido',
    ],
    faq: [
      {
        pergunta: 'O que diferencia uma pintura de alto padrão de uma pintura comum?',
        resposta:
          'A diferença está quase toda na preparação. Numa pintura comum, aplica-se tinta sobre a parede como ela está. No alto padrão, a parede é corrigida antes: massa em camadas finas, lixamento até o nivelamento e conferência com luz rasante, a luz de lanterna paralela à parede, que revela qualquer ondulação. Só depois entra a tinta, em demãos cruzadas com produto de linha superior. O resultado é uma parede que continua impecável sob luz de spot e luz natural.',
      },
      {
        pergunta: 'Vocês executam paleta e especificação já definidas por um projeto?',
        resposta:
          'Executamos exatamente o que está especificado: cor, marca, linha e acabamento fosco, acetinado ou semibrilho. Antes de seguir com a área toda, fazemos amostra na própria parede e sob a luz do ambiente, porque a mesma cor muda de leitura conforme a iluminação e o tamanho da superfície: um tom aprovado num leque de 5 cm costuma parecer mais escuro e mais saturado quando cobre a parede inteira.',
      },
      {
        pergunta: 'Quanto tempo leva uma pintura de alto padrão?',
        resposta:
          'Depende da metragem e do estado da parede, mas o cronograma é definido no orçamento e cumprido. Numa residência que exige correção completa de superfície, a preparação costuma consumir mais dias do que a pintura em si. Você recebe as datas de início e término antes de fechar, e é por elas que respondemos.',
      },
      {
        pergunta: 'A obra fica suja durante o serviço?',
        resposta:
          'Não. Piso, móveis, esquadrias, interruptores e luminárias são protegidos antes de qualquer aplicação, e a equipe faz limpeza ao fim de cada dia de trabalho. Em residências habitadas, isolamos a área em execução para que o restante da casa continue em uso normal.',
      },
    ],
  },
  {
    slug: 'pintura-residencial',
    nome: 'Pintura Residencial',
    grupo: 'residencial',
    descricao:
      'Pintura completa de casas e apartamentos em Campo Grande MS, com preparação de parede, proteção de móveis e prazo cumprido.',
    descricaoLonga:
      'A Nobre Cor executa pintura residencial completa em Campo Grande MS, interna, externa ou a casa inteira. O serviço inclui avaliação técnica no local, correção de imperfeições da parede, aplicação de massa e selador quando necessário e pintura em demãos até a cobertura uniforme. Trabalhamos com proteção integral de piso, móveis e esquadrias e devolvemos o imóvel limpo. O orçamento é detalhado por ambiente, com cronograma de início e término definido antes de a equipe entrar.',
    icone: 'House',
    foto: '/images/servicos/pintura-residencial.jpg',
    prioridade: 'estrela',
    unidade: 'por m²',
    inclui: [
      'Paredes e tetos',
      'Área interna e externa',
      'Preparação de superfície',
      'Proteção de móveis e piso',
      'Orçamento por ambiente',
    ],
    etapas: [
      {
        titulo: 'Visita técnica',
        texto:
          'Medimos a superfície real, verificamos o estado da parede e identificamos pontos de umidade. Sem isso, todo orçamento é chute e vira aditivo no meio da obra.',
      },
      {
        titulo: 'Proteção do ambiente',
        texto:
          'Móveis afastados e cobertos, piso forrado, interruptores, luminárias e maçanetas protegidos. Essa etapa vem antes de qualquer lata ser aberta.',
      },
      {
        titulo: 'Preparação da parede',
        texto:
          'Correção de furos, trincas e imperfeições, aplicação de selador ou fundo preparador conforme o estado da superfície.',
      },
      {
        titulo: 'Pintura e recorte',
        texto:
          'Demãos até a cobertura uniforme, com recorte à mão em teto, rodapé e esquadria.',
      },
      {
        titulo: 'Limpeza e entrega',
        texto:
          'Retirada da proteção, limpeza do ambiente e vistoria final com você.',
      },
    ],
    erroComum: {
      titulo: 'Orçar por telefone, sem ver a parede',
      texto:
        'O preço por metro quadrado só faz sentido depois de saber o estado da superfície. Parede firme que precisa só de repintura e parede que exige massa, correção de trinca e selador têm custos completamente diferentes. Orçamento fechado sem visita costuma virar aditivo no meio da obra, e aí quem escolheu pelo menor preço acaba pagando mais.',
    },
    keywords: [
      'pintura residencial campo grande',
      'pintor residencial campo grande ms',
      'pintura de casa campo grande',
      'empresa de pintura residencial campo grande',
    ],
    beneficios: [
      'Avaliação técnica no local, sem compromisso',
      'Orçamento detalhado por ambiente em até 24h no WhatsApp',
      'Correção de imperfeições antes da tinta',
      'Proteção de piso, móveis e esquadrias',
      'Equipe uniformizada e obra organizada',
      'Cronograma definido e cumprido',
    ],
    faq: [
      {
        pergunta: 'Quanto custa pintar uma casa em Campo Grande MS?',
        resposta:
          'O valor depende da metragem, do estado atual da parede, do número de demãos e da tinta escolhida, uma parede que só precisa de repintura custa bem menos que uma que exige massa e correção. Por isso fazemos avaliação técnica no local e enviamos proposta detalhada em até 24h pelo WhatsApp, sem compromisso.',
      },
      {
        pergunta: 'Preciso sair de casa durante a pintura?',
        resposta:
          'Na maioria dos casos, não. Trabalhamos por ambiente, isolando e protegendo a área em execução para que o resto da casa continue em uso. Em obras de casa inteira com prazo curto, combinamos a sequência de ambientes junto com você antes de começar.',
      },
      {
        pergunta: 'A tinta está inclusa no orçamento?',
        resposta:
          'Trabalhamos das duas formas: com material incluso ou só mão de obra, conforme sua preferência. Quando o material é nosso, a marca e a linha da tinta vão especificadas na proposta, você sabe exatamente o que vai para a parede.',
      },
      {
        pergunta: 'Quantas demãos são necessárias?',
        resposta:
          'Duas demãos é o padrão de referência, mas o número real depende do contraste entre a cor velha e a nova e do poder de cobertura da linha escolhida. Cobrir vermelho, azul forte ou parede encardida com um tom claro costuma exigir uma demão a mais, ou um fundo preparador que neutraliza a base antes da cor. Tinta econômica esticada em três demãos sai mais cara e cobre pior que tinta de linha superior em duas, e é por isso que a marca e a linha vão especificadas na proposta.',
      },
    ],
  },
  {
    slug: 'pintura-de-apartamento',
    nome: 'Pintura de Apartamento',
    grupo: 'residencial',
    descricao:
      'Pintura de apartamentos com proteção total de piso e móveis, respeito às regras do condomínio e obra limpa todo dia.',
    descricaoLonga:
      'Pintar apartamento tem regras próprias: horário de obra do condomínio, uso de elevador de serviço, cadastro da equipe na portaria e zero sujeira em área comum. A Nobre Cor executa pintura de apartamentos em Campo Grande MS cuidando de tudo isso. Protegemos piso, móveis, bancadas e esquadrias antes de abrir a primeira lata, aplicamos massa e tinta com equipamento que minimiza respingo e limpamos o ambiente ao fim de cada dia. Atendemos desde apartamento vazio na entrega das chaves até imóvel habitado, ambiente por ambiente.',
    icone: 'Building2',
    foto: '/images/servicos/pintura-de-apartamento.jpg',
    prioridade: 'estrela',
    unidade: 'por m²',
    inclui: [
      'Salas, quartos e cozinha',
      'Sacada e área de serviço',
      'Cadastro na portaria',
      'Execução por ambiente',
      'Entrega de chaves',
    ],
    etapas: [
      {
        titulo: 'Conferência do regimento',
        texto:
          'Antes de agendar, checamos com você ou com o síndico o horário permitido de obra, os dias liberados, o uso do elevador de serviço e o cadastro da equipe na portaria.',
      },
      {
        titulo: 'Logística de acesso',
        texto:
          'Material sobe pelo elevador de serviço, com proteção nas paredes da cabine. Nada de respingo em hall, corredor ou área comum.',
      },
      {
        titulo: 'Proteção interna',
        texto:
          'Piso, bancadas, armários, esquadrias e box protegidos. Em apartamento habitado, isolamos o ambiente em execução para o resto seguir em uso.',
      },
      {
        titulo: 'Execução por ambiente',
        texto:
          'Cada cômodo é preparado, pintado e liberado antes de o próximo começar. Você nunca fica com o apartamento inteiro parado.',
      },
      {
        titulo: 'Limpeza diária',
        texto:
          'Ao fim de cada dia, o ambiente fica limpo e as áreas comuns do prédio também.',
      },
    ],
    erroComum: {
      titulo: 'Ignorar o regimento do condomínio',
      texto:
        'Começar a obra fora do horário permitido ou sem cadastrar a equipe na portaria gera multa para o morador, não para o pintor. Cada condomínio tem sua regra de horário, de dia da semana e de uso do elevador de serviço. Conferir isso antes de agendar leva cinco minutos e evita transtorno com o síndico e com os vizinhos.',
    },
    keywords: [
      'pintura de apartamento campo grande',
      'pintor de apartamento campo grande ms',
      'pintura apartamento entrega de chaves campo grande',
    ],
    beneficios: [
      'Cumprimento do regimento e do horário de obras do condomínio',
      'Equipe cadastrada na portaria, uniformizada e identificada',
      'Proteção integral de piso, bancadas, móveis e esquadrias',
      'Área comum sempre limpa, sem respingo em hall e elevador',
      'Execução por ambiente em apartamento habitado',
      'Orçamento em até 24h no WhatsApp',
    ],
    faq: [
      {
        pergunta: 'Vocês seguem o horário de obras do condomínio?',
        resposta:
          'Sempre. Antes de iniciar, conferimos o regimento interno com você ou com o síndico: horário permitido, dias de obra, uso de elevador de serviço e cadastro da equipe na portaria. Trabalhar fora da regra do condomínio gera multa para o morador, isso não acontece nas nossas obras.',
      },
      {
        pergunta: 'Dá para pintar o apartamento morando nele?',
        resposta:
          'Dá. Executamos ambiente por ambiente, isolando a área em obra com lona e mantendo o restante do apartamento em uso. Combinamos a ordem dos cômodos com você, geralmente deixando quartos e área de dormir para momentos que menos atrapalham a rotina.',
      },
      {
        pergunta: 'Quanto tempo leva a pintura de um apartamento?',
        resposta:
          'Um apartamento vazio, de metragem média e parede em bom estado, costuma sair em poucos dias. Quando há correção de parede, textura a remover ou mudança de cor escura para clara (que exige demãos extras), o prazo aumenta. O cronograma exato vai no orçamento, com data de início e de entrega.',
      },
    ],
  },
  {
    slug: 'pintura-interna',
    nome: 'Pintura Interna',
    grupo: 'residencial',
    descricao:
      'Salas, quartos, cozinhas e banheiros com acabamento uniforme, recorte preciso e tinta adequada a cada ambiente.',
    descricaoLonga:
      'Pintura interna bem feita começa na escolha certa do produto para cada ambiente: acabamento lavável em cozinha e área de circulação, tinta antimofo em banheiro e área úmida, fosco aveludado em quarto e sala. A Nobre Cor executa pintura interna em Campo Grande MS com preparação da parede, correção de trincas e furos, recorte à mão em teto e rodapé e demãos até a cobertura ficar uniforme sob luz natural e artificial.',
    icone: 'PaintRoller',
    foto: '/images/servicos/pintura-interna.jpg',
    prioridade: 'alto',
    unidade: 'por m²',
    inclui: [
      'Salas e quartos',
      'Cozinha e área de serviço',
      'Banheiro com antimofo',
      'Teto e rodapé',
      'Recorte de esquadria',
    ],
    etapas: [
      {
        titulo: 'Escolha do produto por ambiente',
        texto:
          'Acetinado ou semibrilho onde há limpeza frequente, antimofo em área úmida, fosco aveludado em quarto e sala. Produto errado no ambiente errado é a causa mais comum de repintura precoce.',
      },
      {
        titulo: 'Correção da superfície',
        texto:
          'Furos, trincas e emendas corrigidos e lixados antes de qualquer tinta.',
      },
      {
        titulo: 'Teste de cobertura',
        texto:
          'Mudança de cor escura para clara pede demão extra ou fundo preparador. Isso é avaliado na visita e já entra no orçamento.',
      },
      {
        titulo: 'Aplicação e recorte',
        texto:
          'Demãos cruzadas no rolo, recorte à mão em teto, rodapé e esquadria.',
      },
    ],
    erroComum: {
      titulo: 'Usar a mesma tinta em todos os ambientes',
      texto:
        'Tinta fosca em cozinha e corredor não resiste à limpeza com pano úmido e desbota em manchas. Tinta sem proteção antimofo em banheiro mal ventilado escurece em poucos meses. E acabamento brilhante em sala grande evidencia cada imperfeição da parede. A escolha certa por ambiente custa igual e dura muito mais.',
    },
    keywords: [
      'pintura interna campo grande',
      'pintor de parede interna campo grande ms',
      'pintura de quarto e sala campo grande',
    ],
    beneficios: [
      'Tinta escolhida por ambiente (lavável, antimofo, fosco aveludado)',
      'Correção de trincas, furos e imperfeições antes da tinta',
      'Recorte à mão em teto, rodapé e esquadria',
      'Proteção de móveis e piso',
      'Cobertura uniforme conferida sob luz rasante',
    ],
    faq: [
      {
        pergunta: 'Qual tinta usar em cozinha e banheiro?',
        resposta:
          'Em cozinha, área de serviço e circulação, o indicado é acabamento acetinado ou semibrilho, resiste à limpeza com pano úmido sem desbotar. Em banheiro e área com pouca ventilação, usamos tinta com proteção antimofo. Em quarto e sala, o fosco aveludado dá o visual mais sofisticado e disfarça pequenas imperfeições da parede.',
      },
      {
        pergunta: 'É preciso tirar todos os móveis do ambiente?',
        resposta:
          'Não. Afastamos os móveis para o centro do cômodo e cobrimos tudo com lona; só peças muito grandes ou frágeis pedem remoção, e isso é combinado antes. O piso é protegido integralmente.',
      },
      {
        pergunta: 'Quantas demãos são necessárias?',
        resposta:
          'O padrão é duas demãos sobre parede preparada. Mudanças drásticas de cor, escuro para claro, ou vermelho e amarelo forte, costumam exigir uma demão extra ou uma base de fundo preparador. Isso é avaliado na visita técnica e já entra no orçamento, sem surpresa depois.',
      },
      {
        pergunta: 'Dá para pintar por cima de parede com textura ou grafiato interno?',
        resposta:
          'Dá, e é o caminho mais econômico quando a textura está firme: aplica-se tinta acrílica por cima, o que muda a cor sem refazer o revestimento. Vale saber que cada demão preenche um pouco o sulco, então texturas de risco fino ficam mais suaves a cada repintura. Se a intenção é voltar à parede lisa, aí a textura precisa ser removida e a parede emassada, o que é um serviço bem diferente em prazo e custo.',
      },
    ],
  },
  {
    slug: 'pintura-de-fachada',
    nome: 'Pintura de Fachada',
    grupo: 'residencial',
    descricao:
      'Pintura externa e de fachadas com tratamento prévio da superfície e tinta acrílica resistente ao sol e à chuva de Campo Grande.',
    descricaoLonga:
      'A fachada é o que o cliente vê primeiro, e é a superfície que mais sofre com o clima de Campo Grande MS: sol forte o ano inteiro e chuva concentrada. A Nobre Cor executa pintura de fachada com o tratamento que faz a tinta durar: lavagem, remoção de tinta solta e mofo, correção de trincas, aplicação de fundo preparador e tinta acrílica de linha superior com proteção UV. Trabalhamos em residências, sobrados e edifícios, com equipamento de acesso adequado a cada altura.',
    icone: 'PaintBucket',
    foto: '/images/servicos/pintura-de-fachada.jpg',
    prioridade: 'estrela',
    unidade: 'por m²',
    inclui: [
      'Lavagem e remoção de mofo',
      'Correção de trincas',
      'Fundo preparador',
      'Tinta acrílica com proteção UV',
      'Andaime ou balancim',
    ],
    etapas: [
      {
        titulo: 'Lavagem da superfície',
        texto:
          'Lavagem com equipamento de pressão para remover poeira, fuligem e o filme de sujeira que impede a tinta de aderir.',
      },
      {
        titulo: 'Remoção de mofo e tinta solta',
        texto:
          'Raspagem do que estiver descolando e tratamento fungicida nos pontos de mofo. Pintar por cima de mofo é garantir que ele volte por baixo da tinta nova.',
      },
      {
        titulo: 'Tratamento de trincas',
        texto:
          'Abertura, selagem e correção das trincas. Trinca ativa recebe tratamento específico, não só massa.',
      },
      {
        titulo: 'Fundo preparador',
        texto:
          'Aplicação do fundo que ancora a tinta na superfície. É a etapa que mais se corta em orçamento barato e a que mais determina a durabilidade.',
      },
      {
        titulo: 'Tinta acrílica com proteção UV',
        texto:
          'Duas ou mais demãos de tinta de linha superior, aplicadas com o equipamento adequado à altura e ao tipo de fachada.',
      },
    ],
    erroComum: {
      titulo: 'Pintar sem lavar e sem fundo preparador',
      texto:
        'É o atalho mais caro que existe em fachada. A tinta aplicada sobre poeira, fuligem ou mofo não ancora: ela adere ao sujo, não à parede, e descola em placas na primeira estação de chuva forte. A lavagem e o fundo preparador somam poucos por cento ao orçamento e multiplicam a vida útil da pintura.',
    },
    keywords: [
      'pintura de fachada campo grande',
      'pintura externa campo grande ms',
      'pintor de fachada campo grande',
    ],
    beneficios: [
      'Lavagem e remoção de mofo e tinta solta antes da aplicação',
      'Correção de trincas e pontos de infiltração',
      'Fundo preparador para ancoragem da tinta',
      'Tinta acrílica de linha superior com proteção UV',
      'Equipamento de acesso adequado (andaime, balancim ou corda)',
      'Equipe com equipamento de segurança conforme a norma',
    ],
    faq: [
      {
        pergunta: 'De quanto em quanto tempo se repinta uma fachada?',
        resposta:
          'Com preparação correta e tinta acrílica de linha superior, uma fachada em Campo Grande costuma manter bom aspecto por vários anos. O que encurta esse prazo é pintura aplicada sobre superfície suja, mofada ou sem fundo preparador, a tinta descola em placas e a repintura vira necessidade em pouco tempo. É exatamente por isso que a preparação é a parte mais longa do nosso serviço de fachada.',
      },
      {
        pergunta: 'Vocês pintam fachada de prédio?',
        resposta:
          'Sim. Atendemos edifícios residenciais e comerciais com o equipamento de acesso adequado à altura, andaime, balancim ou trabalho em corda, sempre com equipe usando EPI e seguindo as normas de trabalho em altura. Para condomínios, emitimos proposta detalhada para apresentação em assembleia.',
      },
      {
        pergunta: 'A pintura resolve infiltração na parede?',
        resposta:
          'Tinta não resolve infiltração, ela esconde por pouco tempo e o problema volta, agora empolando a tinta nova. Quando encontramos infiltração na avaliação, apontamos a origem e indicamos a impermeabilização necessária antes da pintura. É mais honesto e sai mais barato do que pintar duas vezes.',
      },
    ],
  },
  {
    slug: 'pintura-de-casas',
    nome: 'Pintura de Casas Completa',
    nomeSeo: 'Pintura de Casas',
    grupo: 'residencial',
    descricao:
      'Casa inteira, interna, externa, teto, esquadrias e muro, executada com cronograma único e uma só equipe responsável.',
    descricaoLonga:
      'Pintura de casa completa em Campo Grande MS: interna, externa, tetos, esquadrias, portões e muro em um único contrato, com cronograma unificado e uma equipe responsável do começo ao fim. Evita o transtorno de contratar prestadores diferentes para cada parte e garante padrão de acabamento igual em toda a casa. A proposta sai discriminada por área, para você enxergar exatamente onde está cada valor.',
    // HousePlus, não Home: no lucide, Home e House são apelidos do MESMO desenho,
    // e este card ficava idêntico ao de Pintura Residencial (House).
    icone: 'HousePlus',
    foto: '/images/servicos/pintura-de-casas.jpg',
    prioridade: 'alto',
    unidade: 'por m² ou por projeto',
    inclui: [
      'Interna e externa',
      'Tetos e forros',
      'Esquadrias e portões',
      'Muro e área externa',
      'Cronograma único',
    ],
    etapas: [
      {
        titulo: 'Levantamento completo',
        texto:
          'Medição de todas as áreas: interna, externa, tetos, esquadrias, portões e muro. A proposta sai discriminada por área.',
      },
      {
        titulo: 'Cronograma por frente',
        texto:
          'Definimos a ordem das áreas junto com você, para que a casa nunca fique inteira em obra ao mesmo tempo.',
      },
      {
        titulo: 'Execução sequenciada',
        texto:
          'A mesma equipe percorre todas as frentes, o que garante padrão de acabamento igual do primeiro ao último ambiente.',
      },
      {
        titulo: 'Entrega por etapa',
        texto:
          'Cada frente concluída é vistoriada e liberada, em vez de tudo ser conferido só no último dia.',
      },
    ],
    erroComum: {
      titulo: 'Contratar prestadores diferentes por área',
      texto:
        'Uma equipe para o interior, outra para a fachada e um terceiro para o portão significa três padrões de acabamento na mesma casa, três cronogramas que não conversam e ninguém responsável pelo conjunto. Contratar tudo num contrato só custa menos, porque proteção e acesso são montados uma vez, e o resultado fica visualmente coerente.',
    },
    keywords: [
      'pintura de casa completa campo grande',
      'pintar casa inteira campo grande ms',
      'pintor de casas campo grande',
    ],
    beneficios: [
      'Contrato único para interna, externa, teto, esquadrias e muro',
      'Cronograma unificado com data de início e término',
      'Mesma equipe do começo ao fim, padrão de acabamento igual',
      'Proposta discriminada por área',
      'Obra protegida e limpa todos os dias',
    ],
    faq: [
      {
        pergunta: 'Compensa contratar a casa inteira de uma vez?',
        resposta:
          'Compensa em prazo e em padrão. Uma equipe única mantém o mesmo acabamento em toda a casa, e o cronograma fecha mais rápido do que contratando serviço por serviço. Além disso, a montagem de proteção e de acesso é feita uma vez só, o que reduz o custo total frente a chamar de novo depois.',
      },
      {
        pergunta: 'Dá para fazer por etapas?',
        resposta:
          'Dá. Muitos clientes preferem começar pela área social, depois quartos, depois a parte externa. Montamos o orçamento em etapas com valores fechados por fase, e você libera cada uma quando quiser, sem perder o preço combinado no início.',
      },
    ],
  },
  {
    slug: 'pintura-de-portas-e-esquadrias',
    nome: 'Pintura de Portas, Portões e Esquadrias',
    nomeSeo: 'Pintura de Esquadrias',
    grupo: 'residencial',
    descricao:
      'Portas, portões, grades e esquadrias de metal e madeira com lixamento, tratamento antiferrugem e esmalte de acabamento.',
    descricaoLonga:
      'Portas, portões, grades e esquadrias exigem processo diferente da parede: lixamento até a superfície firme, remoção de ferrugem, aplicação de fundo específico (antiferrugem em metal, seladora em madeira) e esmalte em demãos finas. A Nobre Cor executa esse serviço em Campo Grande MS com acabamento liso, sem escorrido e sem marca de pincel, inclusive em portão de correr e grade de segurança, onde o erro aparece de longe.',
    icone: 'DoorOpen',
    foto: '/images/servicos/pintura-de-portas-e-esquadrias.jpg',
    prioridade: 'medio',
    unidade: 'por peça ou por m²',
    inclui: [
      'Portas de madeira',
      'Portas e janelas de ferro',
      'Portões metálicos',
      'Grades e corrimãos',
      'Tratamento antiferrugem',
    ],
    etapas: [
      {
        titulo: 'Lixamento até a base firme',
        texto:
          'Remoção da tinta velha solta e da ferrugem, por lixa e escova, até chegar em superfície que segura o produto novo.',
      },
      {
        titulo: 'Fundo específico do material',
        texto:
          'Antiferrugem no metal, seladora na madeira. Fundo errado descasca em poucos meses, principalmente em portão exposto ao sol.',
      },
      {
        titulo: 'Esmalte em demãos finas',
        texto:
          'Camadas finas e sucessivas em vez de uma grossa. É o que evita escorrido e marca de pincel.',
      },
      {
        titulo: 'Cura antes do uso',
        texto:
          'Orientamos o tempo de espera antes de voltar a usar o portão. Atrito na tinta ainda em cura marca o acabamento.',
      },
    ],
    erroComum: {
      titulo: 'Pintar sobre a ferrugem',
      texto:
        'Tinta cobre a ferrugem por algumas semanas, mas a corrosão continua por baixo e volta empolando o esmalte novo. O único caminho é remover mecanicamente com lixa e escova até chegar em metal firme e aplicar fundo antiferrugem antes do esmalte. Portão pintado por cima da ferrugem precisa ser refeito em menos de um ano.',
    },
    keywords: [
      'pintura de portão campo grande',
      'pintura de esquadria campo grande ms',
      'pintar grade e portão campo grande',
    ],
    beneficios: [
      'Lixamento até a superfície firme',
      'Tratamento antiferrugem em metal',
      'Fundo específico por material (metal ou madeira)',
      'Esmalte em demãos finas, sem escorrido e sem marca de pincel',
      'Proteção de piso, muro e fechadura durante a aplicação',
    ],
    faq: [
      {
        pergunta: 'Portão enferrujado precisa ser trocado?',
        resposta:
          'Na maioria dos casos, não. Enquanto a chapa mantiver estrutura, a ferrugem é removida por lixamento e escova, a superfície recebe fundo antiferrugem e depois o esmalte. Só indicamos troca quando a corrosão já perfurou o metal, e nesse caso dizemos com clareza, em vez de pintar por cima de um problema.',
      },
      {
        pergunta: 'Quanto tempo até poder usar o portão pintado?',
        resposta:
          'O esmalte fica seco ao toque em poucas horas, mas a cura completa leva mais tempo. Orientamos evitar atrito e encostar objetos nas primeiras 24 a 48 horas para não marcar o acabamento, em portão de correr, isso faz diferença no resultado final.',
      },
    ],
  },
  {
    slug: 'verniz-e-tratamento-de-madeira',
    nome: 'Verniz e Tratamento de Madeira',
    nomeSeo: 'Verniz em Madeira',
    grupo: 'residencial',
    descricao:
      'Decks, portas, forros e móveis fixos de madeira com lixamento, tratamento e verniz ou stain com proteção UV.',
    descricaoLonga:
      'Madeira exposta ao sol de Campo Grande resseca, acinzenta e trinca. O tratamento correto, lixamento, remoção do verniz velho, aplicação de produto com proteção UV e demãos de verniz ou stain, devolve o tom original e protege a peça por anos. A Nobre Cor executa esse serviço em decks, pergolados, portas maciças, forros e móveis fixos, escolhendo entre acabamento brilhante, acetinado ou fosco conforme o projeto.',
    icone: 'TreePine',
    foto: '/images/servicos/verniz-e-tratamento-de-madeira.jpg',
    prioridade: 'medio',
    unidade: 'por m²',
    inclui: [
      'Decks e pergolados',
      'Portas maciças',
      'Forro de madeira',
      'Móveis fixos',
      'Stain com proteção UV',
    ],
    etapas: [
      {
        titulo: 'Remoção do produto antigo',
        texto:
          'Lixamento até abrir o poro da madeira. Verniz novo sobre verniz velho não penetra e descasca em placas.',
      },
      {
        titulo: 'Tratamento da madeira',
        texto:
          'Correção de pontos ressecados ou acinzentados e aplicação de produto de proteção antes do acabamento.',
      },
      {
        titulo: 'Escolha entre verniz e stain',
        texto:
          'Stain para peça sob sol direto, porque desgasta uniformemente. Verniz para área coberta, onde o brilho compensa.',
      },
      {
        titulo: 'Demãos e manutenção',
        texto:
          'Aplicação em demãos finas e orientação sobre quando repassar o produto, antes de a madeira chegar ao ponto de trincar.',
      },
    ],
    erroComum: {
      titulo: 'Esperar a madeira trincar para tratar',
      texto:
        'Enquanto a peça só perdeu o tom e ficou opaca, a manutenção é rápida e barata: lixamento leve e reaplicação. Depois que o sol resseca a ponto de trincar e levantar fibra, é preciso lixamento completo e às vezes restauro da peça. O sinal de repassar o produto é a madeira perder o brilho, não descascar.',
    },
    keywords: [
      'verniz em madeira campo grande',
      'tratamento de deck campo grande ms',
      'envernizar porta de madeira campo grande',
    ],
    beneficios: [
      'Lixamento e remoção do verniz antigo',
      'Produto com proteção UV para madeira exposta ao sol',
      'Escolha de acabamento: brilhante, acetinado ou fosco',
      'Aplicação em demãos finas, sem acúmulo nos cantos',
      'Indicação honesta quando a peça exige restauro antes do verniz',
    ],
    faq: [
      {
        pergunta: 'Verniz ou stain: qual é melhor para deck externo?',
        resposta:
          'Para deck exposto ao sol, o stain costuma ser a melhor escolha: ele penetra na madeira em vez de formar película, então não descasca em placas, desgasta de forma uniforme e a manutenção é só reaplicar. O verniz forma película e dá mais brilho, o que funciona melhor em áreas cobertas e em peças internas.',
      },
      {
        pergunta: 'De quanto em quanto tempo repassar o produto?',
        resposta:
          'Madeira sob sol direto pede manutenção mais frequente do que peça abrigada. O sinal de que chegou a hora é a madeira começar a perder o tom e ficar opaca ou acinzentada, repassar nesse ponto é rápido e barato; deixar chegar ao trincado exige lixamento completo de novo.',
      },
    ],
  },

  // ────────────────────────────────────────────────────────────── TEXTURAS
  {
    slug: 'grafiato',
    nome: 'Grafiato',
    grupo: 'texturas',
    descricao:
      'Aplicação de grafiato em fachadas e paredes internas, com desenho uniforme e emenda invisível.',
    descricaoLonga:
      'Grafiato bem aplicado se reconhece por duas coisas: o desenho uniforme em toda a parede e a ausência de emenda visível entre panos. Isso depende de superfície bem preparada, massa na consistência certa e equipe suficiente para fechar cada pano sem parar no meio. A Nobre Cor aplica grafiato em fachadas, muros e paredes internas de destaque em Campo Grande MS, nos riscos vertical, horizontal ou circular, com selamento posterior para facilitar a limpeza.',
    icone: 'Grid2x2',
    foto: '/images/servicos/grafiato.jpg',
    prioridade: 'estrela',
    unidade: 'por m²',
    inclui: [
      'Risco vertical, horizontal ou circular',
      'Fachada e muro',
      'Parede interna de destaque',
      'Selamento final',
      'Emenda invisível entre panos',
    ],
    etapas: [
      {
        titulo: 'Preparo e selagem da base',
        texto:
          'A parede é lavada, testada quanto à aderência e recebe fundo. Grafiato sobre base solta cai junto com ela.',
      },
      {
        titulo: 'Definição do risco',
        texto:
          'Vertical, horizontal ou circular, escolhido com você. O risco muda completamente a leitura da fachada.',
      },
      {
        titulo: 'Aplicação por pano fechado',
        texto:
          'Cada pano é aplicado sem interrupção, do começo ao fim. Parar no meio cria emenda visível que nenhuma tinta posterior disfarça.',
      },
      {
        titulo: 'Selamento final',
        texto:
          'Selador que protege o grafiato e facilita a lavagem da fachada depois.',
      },
    ],
    erroComum: {
      titulo: 'Parar a aplicação no meio de um pano',
      texto:
        'O grafiato seca rápido, e o ponto onde a aplicação foi interrompida vira uma emenda visível que nenhuma tinta posterior disfarça. Cada pano precisa ser fechado de uma vez só, o que exige dimensionar a equipe conforme o tamanho da parede. Obra com pintor sozinho em fachada grande quase sempre entrega emenda aparente.',
    },
    keywords: [
      'grafiato campo grande',
      'aplicação de grafiato campo grande ms',
      'grafiato fachada campo grande',
    ],
    beneficios: [
      'Desenho uniforme, sem variação de risco entre panos',
      'Emenda invisível, cada pano fechado sem interrupção',
      'Riscos vertical, horizontal ou circular',
      'Superfície preparada e selada antes da aplicação',
      'Selamento final que facilita a limpeza da fachada',
    ],
    faq: [
      {
        pergunta: 'Qual a diferença entre grafiato e textura?',
        resposta:
          'Grafiato é uma massa aplicada com desempenadeira e depois riscada com movimento controlado, formando sulcos regulares: o desenho fica uniforme e o efeito é o mais nobre entre os revestimentos de fachada. As texturas comuns são lançadas na parede com equipamento e têm aspecto granulado irregular, mais barato e sem o mesmo acabamento. A Nobre Cor trabalha com grafiato justamente porque ele é o que valoriza a fachada de um imóvel de alto padrão.',
      },
      {
        pergunta: 'Dá para aplicar grafiato sobre parede já pintada?',
        resposta:
          'Dá, desde que a tinta existente esteja firme e bem aderida. A parede é lavada, testada quanto à aderência e recebe fundo preparador antes da massa. Se a tinta velha estiver soltando ou empolando, ela precisa ser removida primeiro, aplicar grafiato sobre base solta é jogar dinheiro fora.',
      },
      {
        pergunta: 'Grafiato pode ser pintado depois?',
        resposta:
          'Pode, e é comum: aplica-se o grafiato na cor base e depois se pinta por cima com tinta acrílica, o que permite mudar a cor da fachada sem refazer a textura. Vale lembrar que a tinta preenche levemente o sulco, então quanto mais demãos, mais suave fica o desenho.',
      },
      {
        pergunta: 'Quanto tempo dura o grafiato numa fachada?',
        resposta:
          'É um dos revestimentos mais duráveis para fachada justamente por ter espessura: a massa forma uma camada com corpo, que resiste à chuva e à variação de temperatura muito melhor do que uma película de tinta. O que costuma envelhecer primeiro não é o grafiato, é a sujeira acumulada no sulco e o desbotamento da cor pelo sol. Uma lavagem periódica com baixa pressão recupera boa parte do aspecto, e a repintura por cima, quando a cor cansa, dispensa refazer a textura.',
      },
      {
        pergunta: 'Grafiato serve para área interna?',
        resposta:
          'Serve, e funciona bem em parede de destaque de sala, hall e área gourmet, onde o relevo cria sombra própria e dá profundidade que parede lisa não tem. Dois cuidados mudam de figura no ambiente interno: o sulco acumula poeira e pede pano ou aspirador de vez em quando, e o relevo é abrasivo, então não é o acabamento indicado para corredor estreito e parede de escada, onde o braço encosta o tempo todo.',
      },
    ],
  },
  {
    slug: 'efeito-marmorizado',
    nome: 'Efeito Marmorizado',
    grupo: 'texturas',
    descricao:
      'Marmorato e efeitos decorativos de veio, aplicados à mão em paredes de destaque e halls de alto padrão.',
    descricaoLonga:
      'O efeito marmorizado, marmorato, veneziano e derivados, é acabamento de parede de destaque: hall de entrada, painel de sala, parede de lareira, recepção de escritório. A aplicação é inteiramente manual, em camadas finas com espátula, e o veio é construído aos poucos até chegar ao desenho do mármore. A Nobre Cor executa esse serviço em Campo Grande MS com amostra prévia aprovada e polimento final que dá o brilho característico.',
    icone: 'Sparkles',
    foto: '/images/servicos/efeito-marmorizado.jpg',
    prioridade: 'alto',
    unidade: 'por m²',
    inclui: [
      'Marmorato e veneziano',
      'Hall de entrada',
      'Painel de sala',
      'Recepção comercial',
      'Polimento final',
    ],
    etapas: [
      {
        titulo: 'Definição da referência',
        texto:
          'Você traz a imagem do mármore desejado (Carrara, Calacatta, Nero) e definimos fundo, tom e desenho do veio.',
      },
      {
        titulo: 'Base preparada e nivelada',
        texto:
          'O marmorato exige parede plana. Qualquer ondulação aparece ampliada no brilho final.',
      },
      {
        titulo: 'Construção do veio',
        texto:
          'Camadas finas com espátula, veio construído aos poucos, à mão. Não existe atalho nem gabarito nessa etapa.',
      },
      {
        titulo: 'Polimento',
        texto:
          'Polimento final que dá o brilho característico e fecha a superfície.',
      },
    ],
    erroComum: {
      titulo: 'Aplicar sobre parede não nivelada',
      texto:
        'O marmorato é polido e reflete a luz. Qualquer ondulação da base aparece ampliada no brilho final, e não há como corrigir depois sem refazer a parede inteira. A superfície precisa estar plana antes de a primeira camada entrar. É por isso que a preparação costuma custar mais do que o próprio acabamento decorativo.',
    },
    keywords: [
      'efeito marmorizado campo grande',
      'marmorato campo grande ms',
      'parede marmorizada campo grande',
    ],
    beneficios: [
      'Aplicação manual em camadas finas com espátula',
      'Veio construído até o desenho natural do mármore',
      'Amostra aprovada antes da parede definitiva',
      'Polimento final com brilho característico',
      'Indicado para hall, painel de sala e recepção',
    ],
    faq: [
      {
        pergunta: 'Marmorato dá para aplicar na parede inteira de um ambiente?',
        resposta:
          'Tecnicamente sim, mas o efeito rende mais como parede de destaque, hall, painel atrás do sofá, parede da lareira, recepção. Aplicado em ambiente inteiro, o desenho compete com a decoração em vez de valorizá-la. Costumamos sugerir a parede de maior impacto visual e manter as outras em acabamento liso.',
      },
      {
        pergunta: 'É possível reproduzir um mármore específico?',
        resposta:
          'É possível chegar bem próximo de referências clássicas, Carrara, Calacatta, Nero. Trabalhamos com a sua imagem de referência e fazemos amostra na parede até bater com o que você imaginou. Uma reprodução idêntica não existe, porque cada aplicação é manual, mas o tom, o fundo e o desenho do veio seguem a referência.',
      },
      {
        pergunta: 'Marmorato pode ser aplicado em banheiro ou área com umidade?',
        resposta:
          'Pode, desde que a parede não receba água direta e o acabamento seja protegido com cera ou resina própria para o produto. Marmorato de base mineral, à base de cal, convive bem com a umidade do vapor porque é permeável e deixa a parede respirar. O que não funciona é box de chuveiro e faixa de respingo da bancada, onde a água bate direto e todo dia: ali o revestimento cerâmico continua sendo a resposta certa, e insistir em marmorato só antecipa o retrabalho.',
      },
      {
        pergunta: 'Como se limpa uma parede em marmorato?',
        resposta:
          'Pano macio levemente úmido, sem produto abrasivo, sem esponja de lado verde e sem álcool. O brilho do marmorato vem do polimento da própria massa e da cera de acabamento, então esfregar com produto forte tira exatamente o que dá o efeito. Marca de dedo e poeira saem só com o pano. Para manchas de gordura, sabão neutro bem diluído resolve, sempre com movimento leve e secando em seguida.',
      },
    ],
  },
  {
    slug: 'pintura-decorativa',
    nome: 'Pintura Decorativa',
    grupo: 'texturas',
    descricao:
      'Paredes geométricas, meia-parede, boiserie pintada e efeitos autorais executados com precisão milimétrica.',
    descricaoLonga:
      'Pintura decorativa é onde o acabamento vira projeto: parede geométrica, meia-parede com faixa, boiserie pintada, listras, blocos de cor e paredes de destaque em tons contrastantes. Tudo depende de marcação precisa e recorte perfeito, um milímetro de desvio aparece. A Nobre Cor executa esse tipo de trabalho em Campo Grande MS a partir do desenho do arquiteto ou de referência trazida pelo cliente, com marcação a laser quando o projeto exige.',
    icone: 'Palette',
    foto: '/images/servicos/pintura-decorativa.jpg',
    prioridade: 'medio',
    unidade: 'por m² ou por projeto',
    inclui: [
      'Parede geométrica',
      'Meia-parede e faixas',
      'Boiserie pintada',
      'Blocos de cor',
      'Marcação a laser',
    ],
    etapas: [
      {
        titulo: 'Estudo na parede real',
        texto:
          'Avaliamos a proporção do desenho no seu pé-direito e a posição de tomadas, interruptores e quadros de luz.',
      },
      {
        titulo: 'Marcação',
        texto:
          'Marcação a laser ou a nível quando o projeto exige precisão. Um milímetro de desvio aparece em parede geométrica.',
      },
      {
        titulo: 'Fita de baixa aderência',
        texto:
          'Fita apropriada para pintura, aplicada só depois da cura da base. Fita comum arranca a tinta e refaz o trabalho.',
      },
      {
        titulo: 'Aplicação e remoção no ponto',
        texto:
          'A fita sai no tempo certo, ainda antes da cura total, o que garante linha limpa sem repuxar.',
      },
    ],
    erroComum: {
      titulo: 'Usar fita comum de embalagem',
      texto:
        'Fita de embalagem tem adesivo forte demais para tinta: ao ser removida, arranca a base junto e deixa a borda esfarelada, obrigando a refazer o trecho. Fita de baixa aderência, aplicada só depois da cura da base e removida no tempo certo, é o que entrega a linha reta e limpa que o desenho geométrico exige.',
    },
    keywords: [
      'pintura decorativa campo grande',
      'parede geométrica campo grande ms',
      'meia parede pintura campo grande',
    ],
    beneficios: [
      'Marcação precisa (a laser quando o projeto exige)',
      'Recorte sem transbordo entre cores',
      'Execução a partir do desenho do arquiteto ou de referência',
      'Fita de baixa aderência que não arranca a tinta da base',
    ],
    faq: [
      {
        pergunta: 'Vocês executam a partir de uma foto de referência?',
        resposta:
          'Executamos. Você manda a referência pelo WhatsApp, avaliamos a viabilidade na sua parede, proporção, altura de pé-direito, posição de tomadas e interruptores, e propomos a adaptação necessária. Depois marcamos na parede para você aprovar antes de aplicar a cor.',
      },
      {
        pergunta: 'A fita não descasca a tinta que já está na parede?',
        resposta:
          'Não, porque usamos fita de baixa aderência apropriada para pintura e respeitamos o tempo de cura da base antes de colar. Fita comum de embalagem, aplicada sobre tinta nova, é o que arranca a parede, esse é um dos erros mais frequentes em trabalho amador.',
      },
    ],
  },

  // ───────────────────────────────────────────────────── COMERCIAL E PREDIAL
  {
    slug: 'pintura-comercial',
    nome: 'Pintura Comercial',
    grupo: 'comercial',
    descricao:
      'Lojas, escritórios, clínicas e restaurantes pintados fora do horário de funcionamento, sem parar o seu faturamento.',
    descricaoLonga:
      'Em ponto comercial, cada dia fechado é prejuízo. A Nobre Cor executa pintura comercial em Campo Grande MS trabalhando fora do horário de funcionamento, noite, madrugada ou fim de semana, para que loja, escritório, clínica ou restaurante abra normalmente no dia seguinte. Protegemos mobiliário, equipamento e vitrine, usamos tinta de baixo odor em ambientes sensíveis como consultório e área de alimentação, e entregamos o espaço limpo e pronto para operar.',
    icone: 'Store',
    foto: '/images/servicos/pintura-comercial.jpg',
    prioridade: 'estrela',
    unidade: 'por m² ou por projeto',
    inclui: [
      'Lojas e salas comerciais',
      'Clínicas e consultórios',
      'Restaurantes',
      'Trabalho noturno e fim de semana',
      'Tinta de baixo odor',
    ],
    etapas: [
      {
        titulo: 'Definição da janela de trabalho',
        texto:
          'Combinamos noite, madrugada ou fim de semana conforme o funcionamento do seu ponto. O objetivo é abrir normalmente no dia seguinte.',
      },
      {
        titulo: 'Proteção de mobiliário e equipamento',
        texto:
          'Vitrine, balcão, equipamento e estoque protegidos. Em clínica e restaurante, cuidado extra com superfície de contato.',
      },
      {
        titulo: 'Tinta de baixo odor',
        texto:
          'Produto base água em ambiente sensível, o que permite reabrir sem incomodar cliente, paciente ou alimento.',
      },
      {
        titulo: 'Entrega pronta para operar',
        texto:
          'Espaço limpo, mobiliário reposicionado e ponto liberado no horário combinado.',
      },
    ],
    erroComum: {
      titulo: 'Pintar em horário de funcionamento',
      texto:
        'Além de afastar cliente, o movimento no ambiente levanta poeira que gruda na tinta fresca e deixa a superfície com aspecto áspero. Trabalhar na janela em que o ponto está fechado protege o acabamento e o faturamento ao mesmo tempo. Em clínica e restaurante, soma-se a isso a escolha de tinta de baixo odor.',
    },
    keywords: [
      'pintura comercial campo grande',
      'pintura de loja campo grande ms',
      'pintor para escritório campo grande',
    ],
    beneficios: [
      'Execução fora do horário comercial, noite, madrugada ou fim de semana',
      'Tinta de baixo odor para clínica, consultório e área de alimentação',
      'Proteção de mobiliário, equipamento e vitrine',
      'Espaço entregue limpo e pronto para operar',
      'Nota fiscal e proposta formal para o financeiro da empresa',
    ],
    faq: [
      {
        pergunta: 'Vocês trabalham à noite e no fim de semana?',
        resposta:
          'Sim, é o padrão em obra comercial. Combinamos a janela de trabalho conforme o funcionamento do seu ponto e organizamos a equipe para que o espaço esteja limpo e liberado na abertura seguinte. Isso vale para loja de rua, sala comercial, clínica e restaurante.',
      },
      {
        pergunta: 'A tinta deixa cheiro forte na clínica ou no restaurante?',
        resposta:
          'Em ambientes sensíveis usamos tinta de baixo odor e base água, que dispersa rapidamente com ventilação. Isso permite reabrir o espaço no dia seguinte sem incomodar cliente, paciente ou alimento, coisa que tinta à base de solvente não permitiria.',
      },
      {
        pergunta: 'Emitem nota fiscal e proposta formal?',
        resposta:
          'Emitimos. A proposta sai discriminada por área e etapa, no formato que o financeiro da empresa precisa para aprovação, e a nota fiscal acompanha a entrega do serviço.',
      },
    ],
  },
  {
    slug: 'pintura-predial',
    nome: 'Pintura Predial e de Condomínios',
    nomeSeo: 'Pintura Predial',
    grupo: 'comercial',
    descricao:
      'Fachadas de edifícios, halls, garagens e áreas comuns, com proposta pronta para assembleia e cronograma por etapa.',
    descricaoLonga:
      'Pintura predial envolve mais do que tinta: exige proposta que o síndico consiga defender em assembleia, cronograma por etapa que não paralise o condomínio inteiro e equipe habilitada para trabalho em altura. A Nobre Cor atende edifícios residenciais e comerciais em Campo Grande MS com levantamento técnico da fachada, tratamento de trincas e infiltrações antes da tinta, e execução por trecho, mantendo acesso, garagem e áreas comuns em uso durante toda a obra.',
    icone: 'Building',
    foto: '/images/servicos/pintura-predial.jpg',
    prioridade: 'estrela',
    unidade: 'por m² ou por projeto',
    inclui: [
      'Fachada de edifício',
      'Hall e áreas comuns',
      'Garagem e escadaria',
      'Tratamento de trinca e infiltração',
      'Proposta para assembleia',
    ],
    etapas: [
      {
        titulo: 'Levantamento técnico',
        texto:
          'Vistoria da fachada e das áreas comuns, com medição e registro dos pontos de trinca e infiltração.',
      },
      {
        titulo: 'Proposta para assembleia',
        texto:
          'Documento discriminado por etapa e por área, no formato que o síndico consegue apresentar e o condômino consegue entender.',
      },
      {
        titulo: 'Tratamento antes da tinta',
        texto:
          'Trincas e infiltrações resolvidas primeiro. Pintar por cima é garantir tinta empolando na primeira chuva forte.',
      },
      {
        titulo: 'Execução por trecho',
        texto:
          'Isolamos e sinalizamos só a área do dia. Garagem, hall e acessos continuam em uso durante toda a obra.',
      },
      {
        titulo: 'Comunicação com o síndico',
        texto:
          'Aviso prévio de qualquer bloqueio temporário, com data e horário combinados.',
      },
    ],
    erroComum: {
      titulo: 'Pintar a fachada sem tratar a infiltração',
      texto:
        'É o erro que faz o condomínio pagar duas vezes. A tinta cobre a mancha por uma estação, e na primeira chuva forte a umidade empurra o acabamento novo de dentro para fora, empolando exatamente onde estava antes. Trincas e pontos de entrada de água entram no orçamento como etapa própria, antes de qualquer tinta.',
    },
    keywords: [
      'pintura predial campo grande',
      'pintura de condomínio campo grande ms',
      'pintura de fachada de prédio campo grande',
    ],
    beneficios: [
      'Levantamento técnico da fachada antes do orçamento',
      'Proposta detalhada, pronta para apresentação em assembleia',
      'Tratamento de trincas e infiltrações antes da pintura',
      'Execução por etapa, condomínio segue em uso normal',
      'Equipe com EPI e procedimento de trabalho em altura',
      'Comunicação direta com síndico e administradora',
    ],
    faq: [
      {
        pergunta: 'Como funciona o orçamento para condomínio?',
        resposta:
          'Fazemos levantamento técnico da fachada e das áreas comuns, medimos as superfícies e emitimos proposta discriminada por etapa e por área. O documento é montado para ser apresentado em assembleia: o condômino enxerga o que está sendo contratado, em que ordem e por quanto.',
      },
      {
        pergunta: 'O condomínio precisa parar durante a obra?',
        resposta:
          'Não. Executamos por trecho, sinalizando e isolando apenas a área em trabalho no dia. Garagem, hall e acessos permanecem em uso, e avisamos previamente quando algum ponto específico precisar de bloqueio temporário, sempre com data e horário combinados com o síndico.',
      },
      {
        pergunta: 'Vocês tratam infiltração e trinca antes de pintar?',
        resposta:
          'Sim, e isso vai destacado na proposta. Pintar fachada de prédio sem tratar trinca e infiltração é garantir que a tinta empole no primeiro período de chuva forte. Apontamos os pontos no levantamento e orçamos o tratamento separadamente, para o condomínio decidir com clareza.',
      },
    ],
  },
  {
    slug: 'pintura-industrial-epoxi',
    nome: 'Pintura Industrial e Epóxi',
    nomeSeo: 'Piso Epóxi',
    grupo: 'comercial',
    descricao:
      'Piso epóxi para galpões, garagens e áreas industriais, com preparo mecânico do concreto e alta resistência a tráfego.',
    descricaoLonga:
      'Piso epóxi só dura quando o concreto é preparado mecanicamente antes, lixadeira ou fresa para abrir o poro, correção de falhas e aplicação de primer. A Nobre Cor executa pintura industrial e epóxi em Campo Grande MS para galpões, garagens de condomínio, oficinas e áreas de produção, com sistema dimensionado ao tráfego real do local: veículo leve, empilhadeira ou carga pesada exigem espessuras e produtos diferentes.',
    icone: 'Factory',
    foto: '/images/servicos/pintura-industrial-epoxi.jpg',
    prioridade: 'alto',
    unidade: 'por m²',
    inclui: [
      'Piso de galpão',
      'Garagem de condomínio',
      'Oficina e área de produção',
      'Preparo mecânico do concreto',
      'Primer e sistema dimensionado',
    ],
    etapas: [
      {
        titulo: 'Teste de umidade do contrapiso',
        texto:
          'Concreto com umidade ascendente não recebe epóxi: o piso descola em placas. O teste vem antes do orçamento.',
      },
      {
        titulo: 'Preparo mecânico',
        texto:
          'Lixamento ou fresamento para abrir o poro do concreto. É essa abertura que ancora o sistema.',
      },
      {
        titulo: 'Correção de falhas e primer',
        texto:
          'Buracos e juntas corrigidos, primer aplicado para selar e uniformizar a absorção.',
      },
      {
        titulo: 'Sistema dimensionado ao tráfego',
        texto:
          'Espessura e produto escolhidos conforme o uso real: veículo leve, empilhadeira ou carga pesada pedem sistemas diferentes.',
      },
      {
        titulo: 'Cura antes da liberação',
        texto:
          'Respeito ao tempo de cura antes de liberar tráfego. Liberar cedo compromete o piso inteiro.',
      },
    ],
    erroComum: {
      titulo: 'Aplicar sobre contrapiso úmido',
      texto:
        'A umidade ascendente do concreto empurra o epóxi por baixo e descola o piso em placas, geralmente meses depois, com o galpão já em operação. O teste de umidade custa quase nada e é o que define se o piso pode receber o sistema ou se precisa de barreira antes. Nenhum preparo mecânico compensa essa etapa.',
    },
    keywords: [
      'piso epóxi campo grande',
      'pintura industrial campo grande ms',
      'epóxi para galpão campo grande',
    ],
    beneficios: [
      'Preparo mecânico do concreto (lixamento ou fresamento)',
      'Correção de falhas e aplicação de primer',
      'Sistema dimensionado ao tráfego real do local',
      'Alta resistência a abrasão, óleo e produto químico',
      'Piso lavável, que facilita a limpeza da operação',
    ],
    faq: [
      {
        pergunta: 'Por que o epóxi descola em alguns pisos?',
        resposta:
          'Quase sempre por falha de preparação. Epóxi aplicado sobre concreto liso, sujo, úmido ou sem abertura de poro não ancora, descola em placas com o tráfego. O preparo mecânico e o teste de umidade do contrapiso antes da aplicação são o que separa um piso que dura anos de um que falha em meses.',
      },
      {
        pergunta: 'Quanto tempo o galpão fica parado?',
        resposta:
          'Depende da área e do sistema especificado, e há um tempo de cura obrigatório antes de liberar tráfego pesado. Montamos o cronograma por setor sempre que possível, para que a operação continue rodando em parte do galpão enquanto a outra cura.',
      },
      {
        pergunta: 'Qual a diferença entre epóxi autonivelante e epóxi pintura?',
        resposta:
          'O epóxi pintura é aplicado em camada fina, com rolo, e serve para áreas de tráfego leve a moderado: garagem de condomínio, depósito, área de circulação. O autonivelante é aplicado em espessura maior e se acomoda sozinho, formando uma superfície contínua sem emenda, indicada para tráfego pesado, empilhadeira e ambientes que exigem limpeza rigorosa. A escolha depende do uso real do piso, e é definida na visita técnica.',
      },
    ],
  },
  {
    slug: 'demarcacao-de-pisos',
    nome: 'Demarcação de Pisos e Vagas',
    nomeSeo: 'Demarcação de Pisos',
    grupo: 'comercial',
    descricao:
      'Vagas, faixas de circulação, sinalização de segurança e numeração em garagens e áreas industriais.',
    descricaoLonga:
      'Demarcação de piso organiza a circulação e atende exigência de segurança em garagens de condomínio, estacionamentos, galpões e áreas de produção. A Nobre Cor executa em Campo Grande MS com tinta demarcatória de alta resistência ao tráfego: vagas, numeração, vagas de idoso e PCD conforme norma, faixas de pedestre, corredores de circulação e sinalização de área de risco.',
    icone: 'Ruler',
    foto: '/images/servicos/demarcacao-de-pisos.jpg',
    prioridade: 'medio',
    unidade: 'por metro linear ou por vaga',
    inclui: [
      'Vagas numeradas',
      'Vagas de idoso e PCD',
      'Faixas de pedestre',
      'Corredores de circulação',
      'Sinalização de área de risco',
    ],
    etapas: [
      {
        titulo: 'Projeto da marcação',
        texto:
          'Definição do layout de vagas, corredores e áreas de risco, respeitando as medidas mínimas e as vagas de idoso e PCD conforme norma.',
      },
      {
        titulo: 'Preparo do piso',
        texto:
          'Limpeza e desengraxe. Tinta demarcatória sobre piso oleoso sai no primeiro mês.',
      },
      {
        titulo: 'Marcação e aplicação',
        texto:
          'Linhas marcadas e aplicadas com tinta de alta resistência ao tráfego.',
      },
      {
        titulo: 'Liberação por setor',
        texto:
          'Trabalhamos em blocos de vagas, sinalizando o tempo de secagem. A garagem segue em uso.',
      },
    ],
    erroComum: {
      titulo: 'Marcar sobre piso oleoso',
      texto:
        'Garagem e área de produção acumulam óleo e borracha de pneu. Tinta demarcatória aplicada sobre essa película não adere e sai nas primeiras semanas, justamente nas faixas de maior tráfego, que é onde a marcação mais importa. Limpeza e desengraxe antes da marcação são o que fazem o serviço durar.',
    },
    keywords: [
      'demarcação de vagas campo grande',
      'pintura de piso de garagem campo grande ms',
      'sinalização de piso industrial campo grande',
    ],
    beneficios: [
      'Tinta demarcatória de alta resistência ao tráfego',
      'Vagas de idoso e PCD conforme norma',
      'Numeração, faixas e corredores de circulação',
      'Execução fora do horário de pico da garagem',
      'Marcação precisa, alinhada e legível',
    ],
    faq: [
      {
        pergunta: 'A garagem precisa ficar vazia?',
        resposta:
          'Só o trecho em execução. Trabalhamos por setor, combinando com o síndico ou o responsável a liberação de um bloco de vagas por vez e sinalizando o tempo de secagem. A garagem continua em uso durante toda a obra.',
      },
      {
        pergunta: 'Quanto tempo a demarcação dura?',
        resposta:
          'Depende do tráfego e do preparo do piso. Sobre concreto limpo e com o produto correto, a marcação resiste bem ao rodar de veículos leves por bastante tempo; em área de empilhadeira e giro constante de pneu no mesmo ponto, o desgaste é mais rápido e a manutenção é pontual, só nos trechos afetados.',
      },
    ],
  },

  // ────────────────────────────────────────────────────── TÉCNICA E MANUTENÇÃO
  {
    slug: 'repintura-e-recuperacao',
    nome: 'Repintura e Recuperação de Superfícies',
    nomeSeo: 'Repintura de Parede',
    grupo: 'tecnica',
    descricao:
      'Trincas, mofo, tinta descascando e parede manchada, tratados na origem antes da nova pintura.',
    descricaoLonga:
      'Repintura de qualidade começa por descobrir por que a pintura anterior falhou. A Nobre Cor avalia a superfície em Campo Grande MS antes de orçar: tinta descascando indica base sem aderência; mofo recorrente indica umidade não resolvida; trinca ativa indica movimentação estrutural. Tratamos a causa, remoção de tinta solta, eliminação de fungo, correção e selagem de trinca, aplicação de fundo preparador, e só então executamos a nova pintura. Sem isso, o problema volta em poucos meses.',
    icone: 'Wrench',
    foto: '/images/servicos/repintura-e-recuperacao.jpg',
    prioridade: 'alto',
    unidade: 'por m²',
    inclui: [
      'Remoção de tinta solta',
      'Eliminação de mofo',
      'Correção de trinca',
      'Fundo preparador',
      'Diagnóstico da causa',
    ],
    etapas: [
      {
        titulo: 'Diagnóstico da causa',
        texto:
          'Antes de orçar, descobrimos por que a pintura anterior falhou: base sem aderência, umidade não resolvida ou trinca ativa. Cada caso tem tratamento diferente.',
      },
      {
        titulo: 'Teste de aderência',
        texto:
          'Verificamos se a tinta existente segura. Se sai pó ao passar a mão ou descola na fita, ela precisa ser removida nos trechos comprometidos.',
      },
      {
        titulo: 'Tratamento do problema',
        texto:
          'Remoção da tinta solta, eliminação do fungo, selagem de trinca. Só depois entra o acabamento.',
      },
      {
        titulo: 'Fundo preparador e pintura',
        texto:
          'Fundo que ancora a tinta nova na base tratada, seguido das demãos de acabamento.',
      },
    ],
    erroComum: {
      titulo: 'Repintar sem descobrir por que a tinta falhou',
      texto:
        'Se a pintura anterior descascou, existe uma causa: base sem aderência, umidade não resolvida ou movimentação estrutural. Aplicar tinta nova por cima trata o sintoma e devolve o problema em poucos meses, agora com o custo repetido. O diagnóstico vem antes do orçamento, mesmo quando a conclusão é que o serviço precisa esperar outro reparo.',
    },
    keywords: [
      'repintura campo grande',
      'parede descascando campo grande ms',
      'recuperação de parede com mofo campo grande',
    ],
    beneficios: [
      'Diagnóstico da causa antes do orçamento',
      'Remoção de tinta solta e eliminação de fungo',
      'Correção e selagem de trincas',
      'Fundo preparador para ancoragem da nova tinta',
      'Aviso honesto quando o problema exige impermeabilização, não pintura',
    ],
    faq: [
      {
        pergunta: 'Por que minha parede descasca sempre no mesmo lugar?',
        resposta:
          'Repetição no mesmo ponto quase sempre indica umidade chegando por trás da parede, infiltração de laje, de tubulação ou de solo. Nesse caso, repintar é remediar: a tinta nova empola de novo. Identificamos a origem na avaliação e dizemos com clareza o que precisa ser resolvido antes, mesmo quando isso adia o nosso serviço.',
      },
      {
        pergunta: 'Dá para pintar por cima da tinta velha?',
        resposta:
          'Dá quando a tinta existente está firme e bem aderida, fazemos o teste de aderência na visita. Se estiver descascando, empolada ou com pó ao passar a mão, ela precisa ser removida nos trechos comprometidos e a base precisa de fundo preparador. Pintar por cima de base solta desperdiça a tinta nova.',
      },
    ],
  },
  {
    slug: 'massa-corrida-e-preparacao',
    nome: 'Massa Corrida, Gesso e Preparação de Paredes',
    nomeSeo: 'Massa Corrida e Preparação',
    grupo: 'tecnica',
    descricao:
      'Nivelamento de parede com massa corrida ou acrílica, correção de furos e trincas e lixamento até a superfície plana.',
    descricaoLonga:
      'A preparação é a etapa que decide o resultado final da pintura, e a que mais se corta em orçamento barato. A Nobre Cor executa emassamento em Campo Grande MS com massa corrida (áreas internas) ou massa acrílica (áreas externas e úmidas), em demãos finas, com lixamento entre camadas e conferência sob luz rasante até a parede ficar plana. É esse trabalho invisível que faz a tinta refletir de forma uniforme depois.',
    icone: 'Layers2',
    foto: '/images/servicos/massa-corrida-e-preparacao.jpg',
    prioridade: 'alto',
    unidade: 'por m²',
    inclui: [
      'Massa corrida interna',
      'Massa acrílica externa',
      'Correção de furos e trincas',
      'Emenda de drywall',
      'Lixamento entre camadas',
    ],
    etapas: [
      {
        titulo: 'Escolha da massa',
        texto:
          'Corrida (base PVA) em área interna seca, acrílica em área externa e úmida. Massa corrida em fachada é causa clássica de tinta empolando.',
      },
      {
        titulo: 'Camadas finas',
        texto:
          'Aplicação em demãos finas sucessivas. Camada grossa racha ao secar.',
      },
      {
        titulo: 'Lixamento entre camadas',
        texto:
          'Cada camada é lixada antes da próxima, o que evita acúmulo e degrau.',
      },
      {
        titulo: 'Conferência em luz rasante',
        texto:
          'A parede é conferida com luz paralela, que revela o que a luz do teto esconde. Só então é liberada para a tinta.',
      },
    ],
    erroComum: {
      titulo: 'Usar massa corrida em área externa',
      texto:
        'Massa corrida é à base de PVA e não resiste à umidade. Aplicada em fachada, muro ou banheiro, ela absorve água, incha e empurra a tinta, que empola em placas. A alternativa correta é a massa acrílica, que custa pouco mais e é feita para isso. Esse é um dos erros mais frequentes em obra tocada às pressas.',
    },
    keywords: [
      'massa corrida campo grande',
      'nivelamento de parede campo grande ms',
      'emassamento de parede campo grande',
    ],
    beneficios: [
      'Massa corrida em área interna, massa acrílica em área externa e úmida',
      'Demãos finas com lixamento entre camadas',
      'Conferência com luz rasante até o nivelamento',
      'Correção de furos, trincas e emendas de drywall',
      'Base pronta para tinta de acabamento fosco, onde o defeito mais aparece',
    ],
    faq: [
      {
        pergunta: 'Qual a diferença entre massa corrida e massa acrílica?',
        resposta:
          'Massa corrida é à base de PVA e serve para áreas internas secas, ela não resiste à umidade e não deve ir para fachada, área externa ou banheiro. Massa acrílica resiste à água e é a indicada para essas áreas. Usar massa corrida em local errado é causa clássica de tinta empolando meses depois.',
      },
      {
        pergunta: 'Preciso emassar toda a parede ou só os defeitos?',
        resposta:
          'Depende do acabamento pretendido. Para tinta fosca em ambiente com luz de spot ou luz natural rasante, o emassamento completo é o que garante superfície uniforme, o remendo pontual aparece como mancha de brilho diferente. Em ambientes de menor exigência, corrigir só os defeitos resolve bem e reduz o custo. Avaliamos e explicamos as duas opções no orçamento.',
      },
    ],
  },
  {
    slug: 'impermeabilizacao',
    nome: 'Impermeabilização de Paredes e Lajes',
    grupo: 'tecnica',
    descricao:
      'Lajes, muros, box e áreas úmidas impermeabilizados na origem, para a pintura seguinte durar.',
    descricaoLonga:
      'Impermeabilização é o serviço que evita refazer pintura todo ano. A Nobre Cor executa em Campo Grande MS em lajes expostas, muros de divisa, áreas úmidas, box de banheiro e platibandas, com sistema escolhido conforme o ponto: manta líquida, argamassa polimérica ou impermeabilizante cimentício. Executamos sempre antes da pintura de acabamento, impermeabilizar depois de pintar é jogar a pintura nova fora.',
    icone: 'Droplets',
    foto: '/images/servicos/impermeabilizacao.jpg',
    prioridade: 'alto',
    unidade: 'por m²',
    inclui: [
      'Laje exposta',
      'Muro de divisa',
      'Box de banheiro',
      'Platibanda',
      'Encontro de laje com parede',
    ],
    etapas: [
      {
        titulo: 'Identificação da origem',
        texto:
          'Descobrimos de onde a água entra: laje, muro, platibanda, tubulação ou solo. Impermeabilizar o lado errado só empurra a umidade para outro ponto.',
      },
      {
        titulo: 'Preparo e correção',
        texto:
          'Limpeza, correção de trinca e regularização da superfície que vai receber o sistema.',
      },
      {
        titulo: 'Escolha do sistema',
        texto:
          'Manta líquida, argamassa polimérica ou cimentício, conforme o ponto e o tipo de exposição.',
      },
      {
        titulo: 'Cura antes do acabamento',
        texto:
          'Respeito ao tempo de cura do impermeabilizante antes de qualquer pintura por cima.',
      },
    ],
    erroComum: {
      titulo: 'Impermeabilizar o lado errado da parede',
      texto:
        'Aplicar o produto pela face interna, onde a mancha aparece, bloqueia a saída da água mas não a entrada. A umidade continua chegando e sai por outro ponto, geralmente empolando o rodapé ou a parede vizinha. O tratamento é sempre na origem: laje, muro, platibanda ou solo, mesmo que dê mais trabalho chegar até lá.',
    },
    keywords: [
      'impermeabilização campo grande',
      'impermeabilizar laje campo grande ms',
      'impermeabilização de parede campo grande',
    ],
    beneficios: [
      'Sistema escolhido conforme o ponto (manta líquida, polimérica ou cimentícia)',
      'Execução antes da pintura de acabamento',
      'Tratamento de rodapé e encontro de laje com parede',
      'Correção de trinca e ponto de entrada de água',
      'Evita o ciclo de repintar a mesma parede todo ano',
    ],
    faq: [
      {
        pergunta: 'Impermeabilização resolve mancha de umidade na parede interna?',
        resposta:
          'Resolve quando a origem é externa, laje, muro, platibanda ou solo, e é ali que se aplica o produto. Impermeabilizar a face interna sem tratar a origem apenas empurra a umidade para outro ponto da parede. Identificamos de onde a água vem antes de orçar.',
      },
      {
        pergunta: 'Dá para impermeabilizar e pintar no mesmo serviço?',
        resposta:
          'Dá, e é a sequência correta: impermeabiliza-se primeiro, respeita-se o tempo de cura do sistema e só depois entra a pintura de acabamento. Fazemos os dois no mesmo contrato, com o cronograma já contemplando esse intervalo.',
      },
      {
        pergunta: 'Quanto tempo dura uma impermeabilização?',
        resposta:
          'Depende do sistema e da exposição. Laje sob sol direto sofre mais do que área interna protegida, e o desgaste começa sempre pelos pontos de detalhe: ralo, rodapé e encontro de laje com parede. Por isso esses pontos recebem reforço na execução. O sinal de que chegou a hora de revisar é a mancha reaparecer no teto do ambiente de baixo, e revisar nesse momento é muito mais barato do que esperar a infiltração comprometer o reboco.',
      },
    ],
  },
  {
    slug: 'pintura-de-telhado',
    nome: 'Pintura de Telhados',
    grupo: 'tecnica',
    descricao:
      'Telha cerâmica e de fibrocimento lavadas, tratadas contra limo e pintadas com tinta específica e proteção UV.',
    descricaoLonga:
      'Pintura de telhado recupera o aspecto da cobertura e protege a telha do desgaste do sol e da chuva de Campo Grande MS. O processo é lavagem com equipamento de pressão, remoção de limo e musgo, tratamento fungicida, substituição de telhas quebradas e aplicação de tinta específica para telha, com proteção UV. Trabalhamos com equipe habilitada para trabalho em altura e uso de EPI conforme a norma.',
    icone: 'Warehouse',
    foto: '/images/servicos/pintura-de-telhado.jpg',
    prioridade: 'medio',
    unidade: 'por m²',
    inclui: [
      'Telha cerâmica',
      'Telha de fibrocimento',
      'Lavagem com alta pressão',
      'Tratamento fungicida',
      'Troca de telha quebrada',
    ],
    etapas: [
      {
        titulo: 'Lavagem com alta pressão',
        texto:
          'Remoção de poeira, limo e musgo acumulados. Tinta sobre limo não adere.',
      },
      {
        titulo: 'Tratamento fungicida',
        texto:
          'Aplicação de produto que impede o limo de voltar logo em seguida.',
      },
      {
        titulo: 'Vistoria e troca de telhas',
        texto:
          'Telhas trincadas ou quebradas identificadas e substituídas antes da pintura. Também apontamos rufo e calha com problema.',
      },
      {
        titulo: 'Tinta específica para telha',
        texto:
          'Produto próprio para cerâmica ou fibrocimento, com proteção UV. Tinta de parede em telha descasca na primeira estação de chuva.',
      },
    ],
    erroComum: {
      titulo: 'Usar tinta de parede na telha',
      texto:
        'Tinta acrílica comum não foi feita para a dilatação térmica e a porosidade da telha. Ela adere mal, descasca em placas na primeira estação de chuva e ainda dificulta a aplicação do produto correto depois, porque precisa ser removida antes. Telha cerâmica e fibrocimento pedem tinta específica, com proteção UV.',
    },
    keywords: [
      'pintura de telhado campo grande',
      'pintar telha campo grande ms',
      'limpeza e pintura de telhado campo grande',
    ],
    beneficios: [
      'Lavagem com equipamento de pressão',
      'Remoção de limo e musgo com tratamento fungicida',
      'Substituição de telhas quebradas identificadas na obra',
      'Tinta específica para telha com proteção UV',
      'Equipe habilitada para trabalho em altura, com EPI',
    ],
    faq: [
      {
        pergunta: 'Pintar telhado ajuda contra goteira?',
        resposta:
          'Ajuda no aspecto e na proteção da telha, mas não substitui reparo. Goteira costuma vir de telha trincada, encaixe mal feito, rufo ou calha entupida. Na lavagem, identificamos e apontamos esses pontos, reparar sai mais barato do que pintar por cima e continuar com a infiltração.',
      },
      {
        pergunta: 'Telha de fibrocimento pode ser pintada?',
        resposta:
          'Pode, e a pintura inclusive reduz o aquecimento do ambiente sob a cobertura quando se usa cor clara. O processo exige lavagem, tratamento contra limo e tinta específica para fibrocimento, tinta comum de parede não adere bem e descasca na primeira estação de chuva.',
      },
    ],
  },
  {
    slug: 'manutencao-recorrente',
    nome: 'Manutenção Recorrente para Empresas e Condomínios',
    nomeSeo: 'Manutenção de Pintura Recorrente',
    grupo: 'tecnica',
    descricao:
      'Contrato periódico de retoque e manutenção de pintura para condomínios, redes e empresas, o padrão nunca cai.',
    descricaoLonga:
      'Ambiente comercial e área comum de condomínio se desgastam continuamente: marca de móvel, risco de carrinho, mão na parede do hall, sol na fachada. A Nobre Cor oferece contrato de manutenção recorrente em Campo Grande MS, com visitas periódicas de retoque e um plano de repintura por área. O condomínio ou a empresa deixa de conviver com a degradação até a próxima obra grande, e dilui o custo ao longo do ano em vez de concentrar tudo numa reforma.',
    icone: 'CalendarCheck',
    foto: '/images/servicos/manutencao-recorrente.jpg',
    prioridade: 'medio',
    unidade: 'contrato mensal ou trimestral',
    inclui: [
      'Visitas programadas',
      'Retoque de hall e circulação',
      'Plano anual de repintura',
      'Relatório por visita',
      'Contrato mensal ou trimestral',
    ],
    etapas: [
      {
        titulo: 'Levantamento inicial',
        texto:
          'Mapeamos as áreas, o nível de desgaste e a frequência de uso de cada uma. É isso que define a periodicidade das visitas.',
      },
      {
        titulo: 'Plano anual',
        texto:
          'Definimos quais áreas recebem retoque e quais entram em repintura completa em cada trimestre do ano.',
      },
      {
        titulo: 'Visitas programadas',
        texto:
          'Equipe fixa, que já conhece o imóvel, executa o escopo previsto sem precisar de orçamento novo a cada chamado.',
      },
      {
        titulo: 'Relatório por visita',
        texto:
          'Registro do que foi executado e do que foi identificado para a próxima visita.',
      },
    ],
    erroComum: {
      titulo: 'Deixar acumular até virar obra grande',
      texto:
        'Área comum de condomínio e ponto comercial se degradam de forma contínua e silenciosa, até o dia em que a única saída é reforma completa, com rateio extra ou uso do fundo de reserva. Retoque programado custa uma fração disso, mantém o padrão visual o ano inteiro e evita a decisão sob pressão em assembleia.',
    },
    keywords: [
      'manutenção de pintura campo grande',
      'contrato de pintura condomínio campo grande ms',
      'retoque de pintura empresa campo grande',
    ],
    beneficios: [
      'Visitas periódicas com retoque programado',
      'Plano de repintura por área ao longo do ano',
      'Custo diluído em vez de concentrado numa reforma',
      'Mesma equipe conhecendo o imóvel a cada visita',
      'Padrão visual constante em hall, fachada e área comum',
    ],
    faq: [
      {
        pergunta: 'Como funciona o contrato de manutenção?',
        resposta:
          'Fazemos um levantamento inicial das áreas e definimos a frequência de visita, mensal ou trimestral, conforme o desgaste real do local. Cada visita tem escopo previsto (retoques, áreas do plano de repintura) e relatório do que foi executado. O valor é fechado por período, sem surpresa de orçamento a cada chamado.',
      },
      {
        pergunta: 'Vale a pena para um condomínio pequeno?',
        resposta:
          'Costuma valer quando há área comum de circulação intensa, hall, corredor, garagem. O ganho é evitar chegar ao ponto de precisar de obra completa de fachada e áreas comuns de uma vez, o que normalmente exige rateio extra ou uso de fundo de reserva.',
      },
    ],
  },
]

export function getServico(slug: string): Servico | undefined {
  return SERVICOS.find((s) => s.slug === slug)
}

export function getServicosPorGrupo(grupo: Servico['grupo']): Servico[] {
  return SERVICOS.filter((s) => s.grupo === grupo)
}

/** Serviços destaque — usados na home e na onda 1 de landings hiperlocais. */
export const SERVICOS_ESTRELA = SERVICOS.filter((s) => s.prioridade === 'estrela')

export const TOTAL_SERVICOS = SERVICOS.length
