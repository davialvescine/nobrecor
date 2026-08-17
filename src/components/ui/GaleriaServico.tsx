'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

/**
 * Galeria da página de serviço: as fotos passam sozinhas, em transição cruzada.
 *
 * Por que componente de cliente, e não CSS puro como o fundo da hero: ali o
 * número de cenas é fixo, então dá para calcular as porcentagens do keyframe na
 * mão. Aqui cada serviço tem uma quantidade diferente de fotos, e keyframe em
 * CSS não aceita variável na porcentagem. Com estado, funciona para 2, 3 ou 6.
 *
 * O que NÃO muda em relação ao resto do site:
 * - todas as fotos ficam no HTML desde o primeiro byte, apenas com opacidade 0.
 *   O crawler vê todas, como no FAQ em <details>;
 * - quem pede menos movimento não recebe rotação automática;
 * - as imagens são ilustrativas do acabamento e NÃO são obra da Nobre Cor, por
 *   isso não há legenda (ver .claude/rules/conteudo.md).
 */

/** Tempo de cada foto no ar. Abaixo de ~4s vira propaganda piscando. */
const INTERVALO = 4500

interface GaleriaServicoProps {
  fotos: string[]
  nomeServico: string
}

export default function GaleriaServico({ fotos, nomeServico }: GaleriaServicoProps) {
  const [ativa, setAtiva] = useState(0)
  const [rodando, setRodando] = useState(true)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (fotos.length < 2 || !rodando) return

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (semMovimento) return

    timer.current = setInterval(() => {
      setAtiva((i) => (i + 1) % fotos.length)
    }, INTERVALO)

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [fotos.length, rodando])

  if (fotos.length === 0) return null

  return (
    <div className="mb-10">
      <div
        className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-[#1b3a5c]/5 shadow-[0_20px_44px_-24px_rgba(27,58,92,0.45)]"
        // Pausa quando o visitante está olhando de perto ou usando os controles.
        onMouseEnter={() => setRodando(false)}
        onMouseLeave={() => setRodando(true)}
        onFocus={() => setRodando(false)}
        onBlur={() => setRodando(true)}
      >
        {fotos.map((foto, i) => (
          <Image
            key={foto}
            src={foto}
            alt={
              i === 0
                ? `Acabamento de ${nomeServico.toLowerCase()}`
                : `${nomeServico}, exemplo de acabamento ${i + 1}`
            }
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            quality={78}
            // Só a primeira é crítica: é o elemento de LCP da página.
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              i === ativa ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Véu discreto na base, para os controles terem contraste sobre qualquer foto. */}
        {fotos.length > 1 && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, rgba(15,36,55,0.45), transparent)' }}
            aria-hidden="true"
          />
        )}
      </div>

      {fotos.length > 1 && (
        <div
          className="mt-4 flex items-center justify-center gap-2.5"
          role="group"
          aria-label={`Fotos de ${nomeServico.toLowerCase()}`}
        >
          {fotos.map((foto, i) => (
            <button
              key={foto}
              type="button"
              onClick={() => {
                setAtiva(i)
                setRodando(false)
              }}
              aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
              aria-current={i === ativa}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === ativa
                  ? 'w-8 bg-[#c8963e]'
                  : 'w-2.5 bg-[#1b3a5c]/25 hover:bg-[#1b3a5c]/45'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
