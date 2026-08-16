import Image from 'next/image'
import { BUSINESS } from '@/lib/business'
import Reveal from '@/components/ui/Reveal'

/**
 * Bloco do fundador na página /sobre.
 *
 * Existe por um motivo medido, não decorativo: em site de prestador de serviço
 * que entra na casa do cliente, o rosto de quem responde pela obra é o elemento
 * que mais move confiança — a literatura de copy para contratados aponta ganho
 * de conversão de dois dígitos só por mostrar o fundador.
 *
 * ⚠️ A foto é retrato do fundador com o uniforme reconstruído por IA a partir de
 * uma foto real dele. Não é montagem de pessoa inventada, mas também não é
 * fotografia documental: substituir por foto real assim que houver uma.
 *
 * ⚠️ Falta o NOME do fundador. Assinatura com nome vale mais que "o fundador";
 * quando o dono informar, trocar em `NOME_FUNDADOR` e no `alt` da imagem.
 */

const NOME_FUNDADOR: string | null = null

export default function FundadorSection() {
  const legenda = NOME_FUNDADOR ?? `Fundador da ${BUSINESS.legalName}`

  return (
    <section className="bg-[#f7f4ef] py-24 md:py-28" aria-labelledby="fundador-heading">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-8">
        <Reveal>
          <figure className="m-0">
            <div className="relative overflow-hidden rounded-[var(--radius-card)] shadow-2xl">
              <Image
                src="/images/equipe/fundador.jpg"
                alt={`${legenda}, de uniforme de pintura`}
                width={900}
                height={1193}
                sizes="(min-width: 1024px) 32rem, 100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-4 text-sm text-[#2b2b2b]/60">
              <span className="font-semibold text-[#1b3a5c]">{legenda}</span>
              <br />
              Mais de 20 anos de experiência em pintura
            </figcaption>
          </figure>
        </Reveal>

        <Reveal>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a87b2f]">
              Quem responde pela obra
            </p>

            <h2
              id="fundador-heading"
              className="mt-5 font-display text-3xl text-[#1b3a5c] md:text-4xl"
            >
              Vinte anos de experiência onde ela se constrói: dentro da obra
            </h2>

            <div className="mt-7 space-y-5 leading-relaxed text-[#2b2b2b]/80">
              <p>
                A Nobre Cor não começou num escritório. Começou em canteiro de obra, com mais de
                20 anos de pintura residencial, comercial e predial executada em Campo Grande MS,
                parede por parede, fachada por fachada.
              </p>
              <p>
                Vinte anos mudam o que se enxerga numa parede. É a diferença entre orçar por metro
                quadrado e orçar depois de entender <em>por que</em> a tinta soltou naquele trecho:
                se é umidade subindo do baldrame, massa aplicada sobre superfície ainda úmida ou
                tinta que não era para aquele substrato. Preparo malfeito não aparece na entrega.
                Aparece dois anos depois, em bolha, trinca e descascado, e aí o barato saiu caro
                para o cliente.
              </p>
              <p>
                É essa leitura que sustenta o padrão de atendimento da Nobre Cor. Não prometemos
                &ldquo;excelência&rdquo;: prometemos coisas que dá para conferir. Chegamos no horário
                combinado. Explicamos o que será feito antes de começar. Protegemos piso, móveis,
                bancadas e esquadrias antes de abrir a primeira lata. Devolvemos o ambiente limpo ao
                fim de cada dia, não só no último. E a data de término está escrita no orçamento,
                porque é por ela que respondemos.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
