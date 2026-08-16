import Link from 'next/link'
import { ArrowRight, ShieldCheck, CalendarCheck, Sparkles, Timer } from 'lucide-react'
import { BUSINESS, buildWhatsAppLink } from '@/lib/business'
import { IconeWhatsApp } from '@/components/whatsapp/FloatingWhatsApp'
import HeroSlideshow from './HeroSlideshow'

interface HeroProps {
  /** H1 da página. Deve ser único e conter a palavra-chave local. */
  titulo: React.ReactNode
  subtitulo: string
  eyebrow?: string
  mensagemWhatsApp?: string
  /** Hero compacta, para páginas internas. */
  compacta?: boolean
  /**
   * CTA secundário. O padrão leva ao catálogo; a home troca por `#orcamento`
   * para existir um caminho visível até o formulário já na primeira dobra.
   */
  ctaSecundarioHref?: string
  ctaSecundarioLabel?: string
  /**
   * Fundo com as cinco fotos em transição cruzada. Só na home: em página interna
   * seriam cinco downloads sem ajudar o conteúdo que precisa ser indexado.
   *
   * As fotos são ambientação de marca, NÃO obra da Nobre Cor — nunca rotular
   * como portfólio (ver .claude/rules/conteudo.md).
   */
  fotos?: boolean
}

const SELOS = [
  { Icone: ShieldCheck, texto: 'Equipe uniformizada e obra protegida' },
  { Icone: CalendarCheck, texto: 'Cronograma definido e cumprido' },
  { Icone: Sparkles, texto: 'Acabamento de alto padrão' },
  { Icone: Timer, texto: 'Proposta detalhada em até 24h' },
]

export default function Hero({
  titulo,
  subtitulo,
  eyebrow,
  mensagemWhatsApp,
  compacta = false,
  fotos = false,
  ctaSecundarioHref = '/servicos',
  ctaSecundarioLabel = 'Ver serviços',
}: HeroProps) {
  // Âncora usa <a> puro: o <Link> do Next intercepta o clique e a navegação de
  // hash se perde (mesmo bug corrigido no Header em 16/08/2026).
  const CtaSecundario = ctaSecundarioHref.includes('#') ? 'a' : Link
  return (
    <section
      className="animate-fundo relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f2437 0%, #1b3a5c 48%, #24486e 100%)',
      }}
    >
      {fotos && <HeroSlideshow />}

      {/*
        Véu azul sobre as fotos, em duas camadas.

        A primeira é vertical e simétrica, porque o texto da hero é centralizado:
        um degradê lateral deixaria uma das pontas do h1 sem contraste. A segunda
        é uma vinheta radial que escurece só o miolo — é o que segura o branco
        legível nas fotos de parede clara, sem apagar a luz dourada das bordas,
        que é justamente o que as torna bonitas.
      */}
      {fotos && (
        <>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(15,36,55,0.92) 0%, rgba(15,36,55,0.74) 45%, rgba(15,36,55,0.93) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 62% 58% at 50% 46%, rgba(15,36,55,0.62) 0%, rgba(15,36,55,0.28) 55%, transparent 100%)',
            }}
            aria-hidden="true"
          />
        </>
      )}

      {/*
        Textura. São duas, e a escolha depende do que está atrás:

        - Com fundo de fotos, GRÃO DE FILME. As listras diagonais competiam com a
          arquitetura das cenas e cortavam as fachadas. O grão faz o contrário:
          amarra as seis cenas num acabamento só e disfarça o banding que o JPEG
          deixa no céu azul-escuro, que é onde o degradê mais aparece.
        - Sem fotos (páginas internas, gradiente chapado), as LISTRAS, que ali dão
          profundidade a uma superfície que não tem nenhuma.

        O grão é SVG inline, não data URI, para não depender do `img-src data:`
        da CSP em `next.config.ts`.
      */}
      {fotos ? (
        <svg
          // Sem mix-blend: `overlay` e `soft-light` praticamente não mexem em
          // tom quase preto, que é justamente onde o banding aparece. Ruído
          // cinza em opacidade baixa levanta o preto o suficiente para quebrar
          // as faixas do JPEG, e é assim que grão de filme funciona de verdade.
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
          aria-hidden="true"
        >
          <filter id="grao-hero">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.82"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grao-hero)" />
        </svg>
      ) : (
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, #c8963e 0 1px, transparent 1px 26px)',
          }}
          aria-hidden="true"
        />
      )}
      {/* Halo dourado de canto: dá calor à composição sem lavar o texto central. */}
      <div
        className="pointer-events-none absolute -right-40 top-1/2 h-[38rem] w-[38rem] -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c8963e 0%, transparent 68%)' }}
        aria-hidden="true"
      />

      <div
        className={`relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          compacta ? 'py-16 md:py-20' : 'py-20 md:py-28 lg:py-32'
        }`}
      >
        <div>
          {/* ── Coluna de texto ── */}
          <div className="mx-auto max-w-4xl text-center">
            {eyebrow && (
              <p className="animate-hero-in mx-auto inline-flex items-center gap-2 rounded-full border border-[#c8963e]/40 bg-[#c8963e]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#e0bd77]">
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
              className="animate-hero-in mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/75"
              style={{ animationDelay: '180ms' }}
            >
              {subtitulo}
            </p>

            <div
              className="animate-hero-in mt-10 flex flex-col justify-center gap-4 sm:flex-row"
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
              <CtaSecundario
                href={ctaSecundarioHref}
                className="group inline-flex items-center justify-center gap-2 rounded-[var(--radius-btn)] border border-white/25 px-7 py-4 font-medium text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                {ctaSecundarioLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </CtaSecundario>
            </div>

            <p
              className="animate-hero-in mt-8 text-sm text-white/50"
              style={{ animationDelay: '340ms' }}
            >
              Campo Grande MS · {BUSINESS.phoneFormatted} · Resposta em até 24h
            </p>
          </div>
        </div>

        {/* ── Selos ── */}
        {!compacta && (
          <ul className="mt-16 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
            {SELOS.map(({ Icone, texto }, i) => (
              <li
                key={texto}
                className="animate-hero-in flex items-center gap-3.5"
                style={{ animationDelay: `${420 + i * 90}ms` }}
              >
                <span
                  className="animate-pulso-selo flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c8963e]/35 bg-[#c8963e]/10"
                  style={{ animationDelay: `${i * 700}ms` }}
                >
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
