'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { BUSINESS, buildWhatsAppLink } from '@/lib/business'
import { trackWhatsAppClick, trackPhoneClick } from '@/lib/analytics'
import Logo from '@/components/ui/Logo'

const NAV = [
  { href: '/', label: 'Início' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/bairros', label: 'Onde atendemos' },
  { href: '/sobre', label: 'A empresa' },
  { href: '/contato', label: 'Contato' },
]

export default function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-[#1b3a5c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="group" aria-label="Nobre Cor Pinturas, início">
            <Logo variante="escuro" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Navegação principal">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="link-sublinhado text-sm text-white/85 hover:text-[#c8963e] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${BUSINESS.phone}`}
              onClick={() => trackPhoneClick('header')}
              className="flex items-center gap-2 text-sm text-white/85 hover:text-white"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {BUSINESS.phoneFormatted}
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('header')}
              className="btn-dourado text-sm font-semibold px-5 py-2.5 rounded-[var(--radius-btn)]"
            >
              Pedir orçamento
            </a>
          </div>

          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setAberto(!aberto)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          >
            {aberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav
          id="menu-mobile"
          className="animate-fade-up lg:hidden border-t border-white/10 bg-[#1b3a5c] px-4 py-4 space-y-1"
          aria-label="Navegação principal (mobile)"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setAberto(false)}
              className="block py-2.5 text-white/90 hover:text-[#c8963e]"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('menu_mobile')}
            className="btn-dourado block text-center font-semibold px-5 py-3 rounded-[var(--radius-btn)] mt-3"
          >
            Pedir orçamento no WhatsApp
          </a>
        </nav>
      )}
    </header>
  )
}

