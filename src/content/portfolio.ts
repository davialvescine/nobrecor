/**
 * Portfólio de obras da Nobre Cor.
 *
 * ⚠️ REGRA: só entra aqui obra REAL, com foto REAL. Nada de banco de imagens
 * apresentado como obra da empresa, e nada de "projeto ilustrativo". Enquanto
 * este array estiver vazio, a seção de portfólio simplesmente não aparece no
 * site (ver `PortfolioSection`) — o que é melhor do que uma galeria falsa.
 *
 * COMO ADICIONAR UMA OBRA:
 *  1. Salve as fotos em `public/images/portfolio/` no formato WebP,
 *     1600px de largura, até ~200KB cada. Nomeie com o slug da obra:
 *       chacara-cachoeira-fachada-antes.webp
 *       chacara-cachoeira-fachada-depois.webp
 *  2. Adicione o objeto abaixo, com `bairro` batendo com um slug de
 *     `src/content/bairros.ts` e `servico` com um slug de `servicos.ts`.
 *  3. O `alt` precisa descrever a cena de verdade (é lido por leitor de tela e
 *     é sinal de SEO de imagem). Não repetir a palavra-chave sem contexto.
 *  4. Rode `npm run ci`.
 */

export interface ObraPortfolio {
  slug: string
  titulo: string
  /** slug do bairro em `bairros.ts` */
  bairro: string
  /** slug do serviço em `servicos.ts` */
  servico: string
  descricao: string
  antes: { src: string; alt: string }
  depois: { src: string; alt: string }
  /** Ano de execução, exibido no card. */
  ano: number
}

export const PORTFOLIO: ObraPortfolio[] = [
  // Vazio até a primeira obra fotografada. Ver instruções no topo do arquivo.
]

export function getObrasPorBairro(bairroSlug: string): ObraPortfolio[] {
  return PORTFOLIO.filter((o) => o.bairro === bairroSlug)
}

export function getObrasPorServico(servicoSlug: string): ObraPortfolio[] {
  return PORTFOLIO.filter((o) => o.servico === servicoSlug)
}

export const TEM_PORTFOLIO = PORTFOLIO.length > 0
