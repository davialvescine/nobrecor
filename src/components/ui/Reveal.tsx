'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  /** Atraso em ms, para escalonar itens de uma lista. */
  delay?: number
  /** Direção da entrada. */
  from?: 'baixo' | 'esquerda' | 'direita' | 'escala'
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
  /** Estilos extras do chamador; mesclados com o transitionDelay interno. */
  style?: React.CSSProperties
}

/**
 * Reveal on scroll com IntersectionObserver.
 *
 * Duas decisões que importam:
 * 1. O conteúdo nasce visível quando não há JS ou quando o usuário pede menos
 *    movimento — animação nunca pode esconder texto do crawler nem de quem
 *    ativou `prefers-reduced-motion`.
 * 2. O observer desconecta depois de disparar: reanimar a cada scroll enjoa e
 *    custa CPU em página longa.
 */
export default function Reveal({
  children,
  delay = 0,
  from = 'baixo',
  className = '',
  as: Tag = 'div',
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visivel, setVisivel] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semMovimento || typeof IntersectionObserver === 'undefined') {
      setVisivel(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisivel(true)
          observer.disconnect()
        }
      },
      {
        // rootMargin POSITIVO embaixo: o observer dispara ~200px ANTES de o
        // elemento entrar na viewport. Com margem negativa (o padrão intuitivo)
        // a animação só começava depois de o bloco já estar visível, e em
        // rolagem rápida o usuário via o conteúdo em branco.
        threshold: 0,
        rootMargin: '0px 0px 200px 0px',
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const inicial = {
    baixo: 'translate-y-6',
    esquerda: '-translate-x-6',
    direita: 'translate-x-6',
    escala: 'scale-[0.97]',
  }[from]

  return (
    <Tag
      ref={ref as never}
      className={`transition-all duration-500 ease-out will-change-transform motion-reduce:transition-none ${
        visivel ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${inicial}`
      } ${className}`}
      // Teto de 300ms: escalonar dá elegância, mas uma lista longa com delay
      // linear deixa os últimos itens quase meio segundo em branco.
      style={{ ...style, transitionDelay: visivel ? `${Math.min(delay, 300)}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
