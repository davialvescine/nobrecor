'use client'

import { buildWhatsAppLink } from '@/lib/business'
import { trackWhatsAppClick } from '@/lib/analytics'

/** Ícone oficial do WhatsApp — único elemento verde do site, proposital. */
export function IconeWhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.9 15.9 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.312 22.594c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.8-8.064-7.114-.23-.314-1.928-2.568-1.928-4.896s1.222-3.472 1.654-3.948c.434-.476.946-.594 1.262-.594.316 0 .63.002.906.016.29.016.68-.11 1.064.812.39.942 1.326 3.234 1.442 3.468.116.234.194.508.04.82-.156.314-.234.508-.468.782-.234.274-.49.612-.702.822-.234.234-.478.488-.206.958.274.468 1.214 2.002 2.606 3.244 1.79 1.598 3.298 2.092 3.766 2.326.468.234.742.196 1.016-.118.274-.314 1.176-1.372 1.49-1.842.314-.47.628-.39 1.058-.234.434.156 2.724 1.284 3.192 1.518.468.234.778.352.894.546.116.196.116 1.12-.274 2.196z" />
    </svg>
  )
}

export default function FloatingWhatsApp({ mensagem }: { mensagem?: string }) {
  const link = buildWhatsAppLink(
    mensagem ||
      'Olá! Vim pelo site da Nobre Cor e gostaria de um orçamento de pintura. Pode me ajudar?'
  )

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('botao_flutuante')}
      className="animate-pulso-whatsapp fixed bottom-6 right-6 z-50 flex items-center justify-center p-4 rounded-full shadow-2xl transition-transform duration-200 hover:scale-110 active:scale-95"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Falar com a Nobre Cor pelo WhatsApp"
      title="Falar com a Nobre Cor pelo WhatsApp"
    >
      <IconeWhatsApp className="w-7 h-7 text-white" />
    </a>
  )
}
