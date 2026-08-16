import { SERVICOS } from '@/content/servicos'

/**
 * Faixa de serviços deslizando abaixo da hero.
 *
 * A lista é duplicada porque a animação translada 50% da largura: com uma cópia
 * só, o loop daria um salto visível ao voltar ao início. A segunda cópia fica
 * `aria-hidden` para o leitor de tela não ler tudo duas vezes.
 */
export default function MarqueeServicos() {
  const itens = SERVICOS.map((s) => s.nome)

  return (
    <div
      className="overflow-hidden border-y border-[#c8963e]/25 bg-[#12293f] py-3.5"
      aria-label="Serviços da Nobre Cor"
    >
      <div className="flex w-max animate-marquee gap-10 motion-reduce:animate-none">
        {[0, 1].map((copia) => (
          <ul
            key={copia}
            className="flex shrink-0 items-center gap-10"
            aria-hidden={copia === 1 ? 'true' : undefined}
          >
            {itens.map((nome) => (
              <li
                key={nome}
                className="flex shrink-0 items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/60"
              >
                <span className="text-[#c8963e]" aria-hidden="true">
                  ◆
                </span>
                {nome}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
