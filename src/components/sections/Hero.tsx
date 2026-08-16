import Link from 'next/link'
import { ArrowRight, ShieldCheck, CalendarCheck, Sparkles } from 'lucide-react'
import { BUSINESS, buildWhatsAppLink } from '@/lib/business'
import { IconeWhatsApp } from '@/components/whatsapp/FloatingWhatsApp'
import PainelMarca from './PainelMarca'

interface HeroProps {
  /** H1 da página. Deve ser único e conter a palavra-chave local. */
  titulo: React.ReactNode
  subtitulo: string
  eyebrow?: string
  mensagemWhatsApp?: string
  /**
   * Mostra o painel de marca ao lado do texto. Só na home: em página interna
   * ele roubaria espaço do conteúdo que precisa ser indexado.
   */
  painel?: boolean
  /** Hero compacta, para páginas internas. */
  compacta?: boolean
}

const SELOS = [
  { Icone: ShieldCheck, texto: 'Equipe uniformizada e obra protegida' },
  { Icone: CalendarCheck, texto: 'Cronograma definido e cumprido' },
  { Icone: Sparkles, texto: 'Acabamento de alto padrão' },
]

export default function Hero({
  titulo,
  subtitulo,
  eyebrow,
  mensagemWhatsApp,
  painel = false,
  compacta = false,
}: HeroProps) {
  return (
    <section
      className="animate-fundo relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f2437 0%, #1b3a5c 48%, #24486e 100%)',
      }}
    >
      {/* Textura de listras finas: dá profundidade sem competir com o texto. */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(115deg, #c8963e 0 1px, transparent 1px 26px)',
        }}
        aria-hidden="true"
      />
      {/* Halo dourado atrás do painel direito. */}
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c8963e 0%, transparent 68%)' }}
        aria-hidden="true"
      />

      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          compacta ? 'py-16 md:py-20' : 'py-20 md:py-28 lg:py-32'
        }`}
      >
        <div
          className={`grid items-center gap-16 ${painel ? 'lg:grid-cols-[1.05fr_0.95fr]' : ''}`}
        >
          {/* ── Coluna de texto ── */}
          <div className={painel ? '' : 'mx-auto max-w-3xl text-center'}>
            {eyebrow && (
              <p
                className={`animate-hero-in inline-flex items-center gap-2 rounded-full border border-[#c8963e]/40 bg-[#c8963e]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0bd77] ${
                  painel ? '' : 'mx-auto'
                }`}
              >
                {eyebrow}
              </p>
            )}

            <h1
              className={`animate-hero-in mt-7 font-display text-white leading-[1.06] text-balance ${
                compacta
                  ? 'text-4xl md:text-5xl lg:text-6xl'
                  : 'text-5xl md:text-6xl lg:text-[4.6rem]'
              }`}
              style={{ animationDelay: '90ms' }}
            >
              {titulo}
            </h1>

            <p
              className={`animate-hero-in mt-7 text-lg leading-relaxed text-white/75 ${
                painel ? 'max-w-xl' : 'mx-auto max-w-2xl'
              }`}
              style={{ animationDelay: '180ms' }}
            >
              {subtitulo}
            </p>

            <div
              className={`animate-hero-in mt-10 flex flex-col gap-4 sm:flex-row ${
                painel ? '' : 'justify-center'
              }`}
              style={{ animationDelay: '270ms' }}
            >
              <a
                href={buildWhatsAppLink(mensagemWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dourado inline-flex items-center justify-center gap-2.5 rounded-[var(--radius-btn)] px-8 py-4 text-base font-semibold"
              >
                <IconeWhatsApp className="h-5 w-5" />
                Orçamento sem compromisso
              </a>
              <Link
                href="/servicos"
                className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-white/25 px-7 py-4 font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                Ver serviços
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <p
              className="animate-hero-in mt-8 text-sm text-white/50"
              style={{ animationDelay: '340ms' }}
            >
              Campo Grande MS · {BUSINESS.phoneFormatted} · Resposta em até 24h
            </p>
          </div>

          {/* ── Painel de marca ── */}
          {painel && (
            <div className="animate-hero-in hidden lg:block" style={{ animationDelay: '380ms' }}>
              <PainelMarca />
            </div>
          )}
        </div>

        {/* ── Selos ── */}
        {!compacta && (
          <ul className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
            {SELOS.map(({ Icone, texto }, i) => (
              <li
                key={texto}
                className="animate-hero-in flex items-center gap-3.5"
                style={{ animationDelay: `${420 + i * 90}ms` }}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c8963e]/35 bg-[#c8963e]/10">
                  <Icone className="h-5 w-5 text-[#c8963e]" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <span className="text-sm leading-snug text-white/80">{texto}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
