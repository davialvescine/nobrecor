import Reveal from '@/components/ui/Reveal'
import TituloSecao from '@/components/ui/TituloSecao'

const ETAPAS = [
  {
    titulo: 'Visita técnica',
    texto:
      'Avaliamos a superfície no local: estado da parede, umidade, trincas e metragem real. É o que permite orçar sem chute.',
  },
  {
    titulo: 'Proposta em até 24h',
    texto:
      'Você recebe no WhatsApp a proposta discriminada por ambiente, com a tinta especificada e as datas de início e término.',
  },
  {
    titulo: 'Preparação da superfície',
    texto:
      'A etapa mais longa e a que define o resultado: proteção do ambiente, correção, massa e lixamento conferido sob luz rasante.',
  },
  {
    titulo: 'Pintura e acabamento',
    texto:
      'Demãos até a cobertura uniforme, recorte à mão em teto, rodapé e esquadria. Limpeza ao fim de cada dia de obra.',
  },
  {
    titulo: 'Vistoria de entrega',
    texto:
      'Percorremos a obra com você sob a luz do ambiente. Qualquer ponto apontado é corrigido antes de considerarmos entregue.',
  },
]

export default function ProcessoSection() {
  return (
    <section className="animate-fundo py-24 md:py-28" style={{ background: 'linear-gradient(135deg, #0f2437 0%, #1b3a5c 55%, #16324f 100%)' }} aria-labelledby="processo-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TituloSecao
          id="processo-heading"
          eyebrow="Como trabalhamos"
          titulo="Da visita técnica à vistoria de entrega"
          subtitulo="Cinco etapas, sempre na mesma ordem. Você sabe o que acontece em cada dia da obra."
          escuro
        />

        <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {ETAPAS.map((etapa, i) => (
            <Reveal as="li" key={etapa.titulo} delay={i * 100} className="group rounded-[var(--radius-card)] border border-white/10 bg-white/[0.05] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c8963e]/45 hover:bg-white/[0.09]">
              <span className="font-display text-4xl text-[#c8963e] transition-transform duration-300 group-hover:scale-110 inline-block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-xl leading-tight text-white">{etapa.titulo}</h3>
              <p className="mt-2.5 text-sm text-white/70 leading-relaxed">{etapa.texto}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
