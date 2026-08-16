/**
 * Marca Nobre Cor.
 *
 * O símbolo é o diamante FACETADO da identidade, reproduzido polígono a
 * polígono a partir de `public/images/marca/nobrecor-principal.svg` — não é
 * uma releitura em contorno. As cinco facetas e suas cores são o que dá a
 * leitura de "diamante" em vez de "losango".
 *
 * Duas versões, como no manual: fundo claro e fundo escuro (nesta, a base do
 * diamante clareia para #2E5580 para não sumir contra o azul da marca).
 */

interface DiamanteProps {
  className?: string
  variante?: 'claro' | 'escuro'
}

export function Diamante({ className = 'h-8 w-8', variante = 'claro' }: DiamanteProps) {
  const base = variante === 'escuro' ? '#2E5580' : '#1B3A5C'

  return (
    <svg
      viewBox="-70 -86 140 172"
      className={className}
      role="img"
      aria-label="Símbolo da Nobre Cor: diamante facetado"
    >
      {/* corpo */}
      <polygon points="0,-78 62,0 0,78 -62,0" fill={base} />
      {/* faceta superior direita */}
      <polygon points="0,-78 62,0 0,10" fill="#5B7FA6" />
      {/* faceta superior esquerda */}
      <polygon points="0,-78 -62,0 0,10" fill={base} />
      {/* faceta inferior esquerda */}
      <polygon points="-62,0 0,10 0,78" fill="#C8963E" />
      {/* faceta inferior direita */}
      <polygon points="62,0 0,10 0,78" fill="#A87B2F" />
    </svg>
  )
}

interface LogoProps {
  /** 'escuro' = para usar sobre o azul da marca. */
  variante?: 'claro' | 'escuro'
  /** Esconde o "PINTURAS" abaixo do nome (útil em barra compacta). */
  semAssinatura?: boolean
  className?: string
}

export default function Logo({
  variante = 'claro',
  semAssinatura = false,
  className = '',
}: LogoProps) {
  const corNome = variante === 'escuro' ? 'text-[#f7f4ef]' : 'text-[#1b3a5c]'
  const corAssinatura = variante === 'escuro' ? 'text-white/65' : 'text-[#2b2b2b]/70'

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Diamante
        className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-y-180"
        variante={variante}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.7rem] leading-none tracking-[0.04em] ${corNome}`}>
          Nobre <span className="text-[#c8963e]">Cor</span>
        </span>
        {!semAssinatura && (
          <span
            className={`mt-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.42em] ${corAssinatura}`}
          >
            Pinturas
          </span>
        )}
      </span>
    </span>
  )
}
