'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'

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
 *   O crawler vê todas, como no FAQ em <details> — e para uma empresa de
 *   pintura o Google Imagens é canal de busca real, não detalhe;
 * - as imagens são ilustrativas do acabamento e NÃO são obra da Nobre Cor, por
 *   isso não há legenda (ver .claude/rules/conteudo.md).
 *
 * Sobre pausar (WCAG 2.2.2): conteúdo que se move sozinho por mais de 5s precisa
 * de um controle de parada. Pausa no hover NÃO cumpre isso — quem navega por
 * teclado ou leitor de tela nunca passa o mouse. Por isso existe o botão
 * explícito, e a pausa dele é "grudenta": não é desfeita ao tirar o mouse.
 */

/** Tempo de cada foto no ar. Abaixo de ~4s vira propaganda piscando. */
const INTERVALO = 4500

interface GaleriaServicoProps {
  fotos: string[]
  nomeServico: string
}

export default function GaleriaServico({ fotos, nomeServico }: GaleriaServicoProps) {
  const [ativa, setAtiva] = useState(0)
  /** Pausa pedida pela pessoa. Só ela mesma desfaz. */
  const [pausado, setPausado] = useState(false)
  /** Pausa temporária enquanto o ponteiro ou o foco está na galeria. */
  const [suspenso, setSuspenso] = useState(false)
  const [semMovimento, setSemMovimento] = useState(false)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  // Reage também a quem MUDA a preferência com a página já aberta.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setSemMovimento(mq.matches)
    const aoMudar = (e: MediaQueryListEvent) => setSemMovimento(e.matches)
    mq.addEventListener('change', aoMudar)
    return () => mq.removeEventListener('change', aoMudar)
  }, [])

  const rodando = fotos.length > 1 && !pausado && !suspenso && !semMovimento

  useEffect(() => {
    if (!rodando) return

    timer.current = setInterval(() => {
      setAtiva((i) => (i + 1) % fotos.length)
    }, INTERVALO)

    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [rodando, fotos.length])

  if (fotos.length === 0) return null

  const varias = fotos.length > 1

  return (
    // Os manipuladores ficam no elemento que envolve as fotos E os controles.
    // Quando estavam só no contêiner das imagens, o onFocus nunca disparava:
    // não há nada focável entre as fotos, e os botões ficam fora dele.
    <div
      className="mb-10"
      onMouseEnter={() => setSuspenso(true)}
      onMouseLeave={() => setSuspenso(false)}
      onFocus={() => setSuspenso(true)}
      onBlur={() => setSuspenso(false)}
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-card)] bg-[#1b3a5c]/5 shadow-[0_20px_44px_-24px_rgba(27,58,92,0.45)]">
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
            // Sem `quality`: o Next 16 valida o `q` contra images.qualities, que
            // por padrão só aceita 75. Qualquer outro valor devolve 400 e a foto
            // some — e o build passa verde, porque o erro é de runtime.
            // Só a primeira é crítica: é o elemento de LCP da página.
            priority={i === 0}
            // As invisíveis continuam no HTML (crawler e Google Imagens), mas
            // saem da árvore de acessibilidade: sem isto o leitor de tela anuncia
            // as três fotos como se as três estivessem à mostra.
            aria-hidden={i !== ativa}
            className={`object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none ${
              i === ativa ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Véu discreto na base, para os controles terem contraste sobre qualquer foto. */}
        {varias && (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{ background: 'linear-gradient(to top, rgba(15,36,55,0.45), transparent)' }}
            aria-hidden="true"
          />
        )}
      </div>

      {varias && (
        <div className="mt-4 flex items-center justify-center gap-3">
          {/*
            O ponto visível tem 10px, mas quem recebe o toque é o botão em volta.

            Medido no site no ar: os pontos eram 10x10 com 20px entre centros, e
            a WCAG 2.5.8 pede 24px (por tamanho ou por espaçamento). Antes de ser
            norma, é problema de dedo: alvo de 10px no celular erra muito. O
            padding resolve os dois sem mudar o desenho — por isso o `gap` do
            contêiner caiu para zero, já que o espaçamento agora vem do botão.
          */}
          <div
            className="flex items-center"
            role="group"
            aria-label={`Fotos de ${nomeServico.toLowerCase()}`}
          >
            {fotos.map((foto, i) => (
              <button
                key={foto}
                type="button"
                onClick={() => setAtiva(i)}
                aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
                aria-current={i === ativa}
                className="flex items-center justify-center px-2 py-2"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    i === ativa
                      ? 'w-8 bg-[#c8963e]'
                      : 'w-2.5 bg-[#1b3a5c]/25 hover:bg-[#1b3a5c]/45'
                  }`}
                />
              </button>
            ))}
          </div>

          {/*
            Escondido quando a pessoa já pediu menos movimento: aí nada gira, e
            um botão de pausar sem nada para pausar só confunde.
          */}
          {!semMovimento && (
            <button
              type="button"
              onClick={() => setPausado((p) => !p)}
              aria-pressed={pausado}
              aria-label={pausado ? 'Retomar a passagem das fotos' : 'Pausar a passagem das fotos'}
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#1b3a5c]/15 text-[#1b3a5c]/60 transition-colors hover:border-[#c8963e] hover:text-[#a87b2f]"
            >
              {pausado ? (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
