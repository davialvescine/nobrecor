import Reveal from './Reveal'

interface TituloSecaoProps {
  /** Texto pequeno em caixa-alta acima do título. */
  eyebrow?: string
  titulo: string
  subtitulo?: string
  id: string
  /** 'centro' é o padrão do site; 'esquerda' só quando houver conteúdo ao lado. */
  alinhamento?: 'centro' | 'esquerda'
  /** true = seção de fundo escuro, inverte as cores do texto. */
  escuro?: boolean
  /** Nível do heading. Padrão h2. */
  nivel?: 2 | 3
}

/**
 * Cabeçalho padrão de seção.
 *
 * Existe para que as seções não divirjam em espaçamento, tamanho e alinhamento
 * conforme vão sendo escritas. Alinhamento centralizado é o padrão: é o que dá
 * o ritmo de página de alto padrão e evita o vazio à direita que aparece quando
 * um bloco de texto estreito fica encostado à esquerda de um container largo.
 */
export default function TituloSecao({
  eyebrow,
  titulo,
  subtitulo,
  id,
  alinhamento = 'centro',
  escuro = false,
  nivel = 2,
}: TituloSecaoProps) {
  const centro = alinhamento === 'centro'
  const Heading = nivel === 2 ? 'h2' : 'h3'

  return (
    <Reveal className={centro ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p
          className={`mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] ${
            escuro ? 'text-[#e0bd77]' : 'text-[#906928]'
          }`}
        >
          {eyebrow}
        </p>
      )}

      <Heading
        id={id}
        className={`font-display text-balance text-4xl leading-[1.08] md:text-5xl lg:text-[3.4rem] ${
          escuro ? 'text-white' : ''
        } ${centro ? 'heading-line-center' : 'heading-line'}`}
      >
        {titulo}
      </Heading>

      {subtitulo && (
        <p
          className={`mt-7 text-[17px] leading-relaxed ${
            escuro ? 'text-white/72' : 'text-[#2b2b2b]/72'
          }`}
        >
          {subtitulo}
        </p>
      )}
    </Reveal>
  )
}
