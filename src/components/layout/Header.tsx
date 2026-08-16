'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { BUSINESS, buildWhatsAppLink } from '@/lib/business'
import { trackEvent, trackWhatsAppClick, trackPhoneClick } from '@/lib/analytics'
import Logo from '@/components/ui/Logo'

/**
 * Menu estilo landing page, com destino FIXO por item (decisão do dono em
 * 16/08/2026): cada link leva sempre para a mesma seção da home, esteja o
 * usuário onde estiver. A versão anterior era híbrida — âncora na home, página
 * fora dela — e o dono apontou o problema na prática: "Serviços" ora rolava a
 * página, ora abria /servicos, que repete o catálogo da home.
 *
 * /servicos e /bairros continuam existindo e indexáveis: são os hubs que linkam
 * as 213 páginas de serviço, bairro e landing. Só saem do MENU — seguem
 * linkados no rodapé, nas seções da home ("Ver os 81 bairros…") e no sitemap.
 *
 * A ordem dos itens segue a ordem das seções na home.
 */
const NAV = [
  { href: '/', label: 'Início' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#processo', label: 'Processo' },
  { href: '/#bairros', label: 'Onde atendemos' },
  { href: '/#faq', label: 'Dúvidas' },
  { href: '/sobre', label: 'A empresa' },
  { href: '/#orcamento', label: 'Contato' },
]

/**
 * Âncora usa <a> puro, NÃO o <Link> do Next: o Link intercepta o clique para
 * rotear e a navegação de hash se perdia — o item acendia no menu mas a página
 * não rolava (bug visto em 16/08/2026). `/#secao` no <a> também resolve certo
 * nos dois casos: na home vira rolagem local; fora dela navega e ancora.
 * Para rota de verdade, o <Link> fica, pelo prefetch.
 */
function ItemNav({
  href,
  label,
  className,
  onClick,
}: {
  href: string
  label: string
  className: string
  onClick?: () => void
}) {
  if (href.includes('#')) {
    return (
      <a href={href} onClick={onClick} className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={className}>
      {label}
    </Link>
  )
}

export default function Header() {
  const [aberto, setAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-[#1b3a5c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="group" aria-label="Nobre Cor Pinturas, início">
            <Logo variante="escuro" />
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
            {NAV.map((item) => (
              <ItemNav
                key={item.href}
                href={item.href}
                label={item.label}
                className="link-sublinhado text-sm text-white/85 hover:text-[#c8963e] transition-colors"
              />
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
            {/*
              Leva ao FORMULÁRIO, não direto ao WhatsApp (pedido do dono em
              16/08/2026): o form chega no mesmo WhatsApp, mas com nome, bairro
              e serviço já preenchidos — lead melhor que conversa em branco.
              O WhatsApp direto continua a um clique no botão flutuante.
            */}
            {/* eslint-disable-next-line next/no-html-link-for-pages -- âncora precisa de <a> puro; ver ItemNav */}
            <a
              href="/#orcamento"
              onClick={() => trackEvent('clique_cta_formulario', { origem: 'header' })}
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
            <ItemNav
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={() => setAberto(false)}
              className="block py-2.5 text-white/90 hover:text-[#c8963e]"
            />
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

