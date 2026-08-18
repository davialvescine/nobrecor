import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import IconeServico from './IconeServico'
import type { Servico } from '@/content/servicos'

/**
 * Só o que o card renderiza. O tipo estreito permite que componentes de cliente
 * (como o CatalogoServicos) recebam os dados por props sem arrastar FAQ, etapas
 * e o resto do catálogo para o bundle do navegador.
 */
export type ServicoCardData = Pick<Servico, 'slug' | 'nome' | 'descricao' | 'inclui' | 'icone'>

interface CardServicoProps {
  servico: ServicoCardData
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
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[#1b3a5c]/10 bg-white p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c8963e]/50 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Fio dourado na base, crescendo no hover — mesma assinatura dos diferenciais. */}
      <span
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#c8963e] to-[#906928] transition-transform duration-500 group-hover:scale-x-100"
        aria-hidden="true"
      />

      {/* Chip do ícone: azul-nobre em repouso, dourado no hover. */}
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1b3a5c] text-white shadow-[0_10px_22px_-10px_rgba(27,58,92,0.55)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#c8963e] group-hover:text-[#1b3a5c]">
        <IconeServico nome={servico.icone} className="w-7 h-7" />
      </span>

      <h3 className="mt-5 font-display text-2xl leading-tight text-[#1b3a5c] transition-colors group-hover:text-[#906928]">
        {titulo}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#2b2b2b]/72">{servico.descricao}</p>

      {servico.inclui.length > 0 && (
        <p className="mt-5 border-t border-[#1b3a5c]/8 pt-4 text-xs leading-relaxed text-[#2b2b2b]/62">
          <strong className="font-semibold text-[#1b3a5c]">Inclui:</strong>{' '}
          {servico.inclui.join(', ')}.
        </p>
      )}

      {/* mt-auto cola o CTA na base: com alturas de card diferentes na mesma
          linha, o CTA solto no meio parecia desalinhamento. */}
      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#906928]">
        {textoCta}
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
          aria-hidden="true"
        />
      </span>
    </Link>
  )
}
