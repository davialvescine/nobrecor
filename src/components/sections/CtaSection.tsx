import { Phone } from 'lucide-react'
import { BUSINESS, buildWhatsAppLink, buildWhatsAppMessage } from '@/lib/business'
import { IconeWhatsApp } from '@/components/whatsapp/FloatingWhatsApp'

interface CtaSectionProps {
  titulo?: string
  subtitulo?: string
  servico?: string
  bairro?: string
}

export default function CtaSection({
  titulo = 'Peça seu orçamento de pintura',
  subtitulo = 'Avaliação técnica no local, sem compromisso, e proposta detalhada em até 24h direto no seu WhatsApp.',
  servico,
  bairro,
}: CtaSectionProps) {
  return (
    <section
      className="animate-fundo py-24 md:py-28"
      style={{ background: 'linear-gradient(135deg, #12293f 0%, #1b3a5c 60%, #12293f 100%)' }}
      aria-labelledby="cta-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        <h2 id="cta-heading" className="font-display text-balance text-4xl leading-[1.06] text-white md:text-5xl lg:text-[3.6rem]">
          {titulo}
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">{subtitulo}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <a
            href={buildWhatsAppLink(buildWhatsAppMessage(servico, bairro))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dourado inline-flex items-center justify-center gap-3 font-semibold px-8 py-4 rounded-[var(--radius-btn)] text-base"
          >
            <IconeWhatsApp className="w-5 h-5" />
            Falar no WhatsApp agora
          </a>
          <a
            href={`tel:${BUSINESS.phone}`}
            className="inline-flex items-center justify-center gap-3 border border-white/30 text-white font-medium px-8 py-4 rounded-[var(--radius-btn)] hover:bg-white/10 transition-colors"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            {BUSINESS.phoneFormatted}
          </a>
        </div>

        <p className="text-white/50 text-sm pt-2">
          Segunda a sexta {BUSINESS.hours.segundaASexta}
        </p>
      </div>
    </section>
  )
}
