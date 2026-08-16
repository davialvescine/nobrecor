import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import IconeServico from './IconeServico'
import type { Servico } from '@/content/servicos'

interface CardServicoProps {
  servico: Servico
  /** Quando presente, o card aponta para a landing do bairro em vez da página do serviço. */
  bairroSlug?: string
  bairroNome?: string
  /** Texto do CTA. Padrão: "Ver <nome do serviço>". */
  cta?: string
}

/**
 * Card de serviço: ícone em traço fino, título, descrição, linha "Inclui:" e
 * CTA com seta. O ícone e a linha "Inclui:" são o que fazem o bloco ser lido
 * de relance, sem que a pessoa precise ler a descrição inteira.
 */
export default function CardServico({
  servico,
  bairroSlug,
  bairroNome,
  cta,
}: CardServicoProps) {
  const href = bairroSlug ? `/${servico.slug}-${bairroSlug}` : `/servicos/${servico.slug}`
  const titulo = bairroNome ? `${servico.nome} em ${bairroNome}` : servico.nome
  const textoCta = cta ?? `Ver ${servico.nome.toLowerCase()}`

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-[#1b3a5c]/10 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c8963e]/50 hover:shadow-[var(--shadow-card-hover)]"
    >
      <span className="text-[#1b3a5c] transition-all duration-300 group-hover:scale-110 group-hover:text-[#c8963e]">
        <IconeServico nome={servico.icone} className="w-9 h-9" />
      </span>

      <h3 className="mt-5 font-display text-2xl leading-tight text-[#1b3a5c] transition-colors group-hover:text-[#a87b2f]">
        {titulo}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#2b2b2b]/72">{servico.descricao}</p>

      {servico.inclui.length > 0 && (
        <p className="mt-5 border-t border-[#1b3a5c]/8 pt-4 text-xs leading-relaxed text-[#2b2b2b]/62">
          <strong className="font-semibold text-[#1b3a5c]">Inclui:</strong>{' '}
          {servico.inclui.join(', ')}.
        </p>
      )}

      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a87b2f]">
        {textoCta}
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}
