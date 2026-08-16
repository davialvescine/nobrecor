import { Diamante } from '@/components/ui/Logo'

/**
 * Painel visual da hero da home.
 *
 * Substitui o vídeo de fundo que existia no protótipo: o arquivo estava
 * corrompido (travava carregando até aberto direto no navegador) e era material
 * gerado, não filmagem de obra real. Enquanto não houver foto ou vídeo de obra
 * de verdade, este painel ocupa o lugar de forma intencional em vez de deixar
 * uma caixa escura vazia.
 *
 * O conteúdo é honesto e on-brand: a paleta que a empresa aplica, apresentada
 * como amostra de tinta. Quando chegar a primeira foto de obra, trocar por ela
 * (ver TAREFAS PENDENTES no CLAUDE.md).
 */

const PALETA = [
  { nome: 'Azul Nobre', hex: '#1B3A5C', acabamento: 'Fosco aveludado' },
  { nome: 'Off-White', hex: '#F7F4EF', acabamento: 'Acetinado lavável' },
  { nome: 'Dourado', hex: '#C8963E', acabamento: 'Efeito metálico' },
  { nome: 'Carvão', hex: '#2B2B2B', acabamento: 'Fosco absoluto' },
]

export default function PainelMarca() {
  return (
    <div className="relative">
      {/* Cartão principal */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.04] p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-sm">
        {/* Diamante em marca d'água */}
        <Diamante
          className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 opacity-[0.09]"
          variante="escuro"
        />

        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0bd77]">
          Amostra aprovada antes da parede
        </p>

        <ul className="mt-7 space-y-3.5">
          {PALETA.map((cor, i) => (
            <li
              key={cor.hex}
              className="animate-hero-in flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 transition-all duration-300 hover:border-[#c8963e]/40 hover:bg-white/[0.09]"
              style={{ animationDelay: `${420 + i * 90}ms` }}
            >
              <span
                className="h-12 w-12 shrink-0 rounded-xl border border-white/20 shadow-inner"
                style={{ backgroundColor: cor.hex }}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block font-display text-lg leading-tight tracking-wide text-white">{cor.nome}</span>
                <span className="block text-xs text-white/55">{cor.acabamento}</span>
              </span>
              <span className="ml-auto font-mono text-[11px] uppercase tracking-wider text-white/35">
                {cor.hex}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#c8963e]/35 bg-[#c8963e]/10 font-display text-xl text-[#c8963e]">
            24h
          </span>
          <p className="text-sm leading-relaxed text-white/65">
            É o prazo para a proposta detalhada chegar no seu WhatsApp depois da visita técnica.
          </p>
        </div>
      </div>
    </div>
  )
}
