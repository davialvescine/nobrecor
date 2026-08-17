import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { BUSINESS, buildWhatsAppLink } from '@/lib/business'
import { IconeWhatsApp } from '@/components/whatsapp/FloatingWhatsApp'
import { SERVICOS_ESTRELA } from '@/content/servicos'
import { BAIRROS_PRIORITARIOS } from '@/content/bairros'
import Logo from '@/components/ui/Logo'

/** lucide-react v1 removeu os ícones de marca — Instagram vai inline. */
function IconeInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  const ano = 2026

  return (
    <footer className="bg-[#1b3a5c] text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variante="escuro" className="mb-5" />
            <p className="text-sm leading-relaxed">
              Pintura de alto padrão em Campo Grande MS. Equipe uniformizada, obra protegida e limpa,
              cronograma cumprido e orçamento sem compromisso.
            </p>
            {BUSINESS.socials.instagram && (
              <a
                href={BUSINESS.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm hover:text-[#c8963e]"
              >
                <IconeInstagram className="w-4 h-4" />
                Instagram
              </a>
            )}
          </div>

          <div>
            <h2 className="font-display text-base text-white mb-4">Serviços em destaque</h2>
            <ul className="space-y-2 text-sm">
              {SERVICOS_ESTRELA.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicos/${s.slug}`} className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-[#c8963e]">
                    {s.nome}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/servicos" className="text-[#c8963e] hover:underline">
                  Ver todos os serviços →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            {/*
              "Bairros atendidos", não "Bairros de alto padrão".

              O rodapé aparece nas 213 páginas, e o título anterior classificava
              bairro em categoria social na frente de qualquer visitante — quem
              mora fora da lista lia que o seu bairro não é de alto padrão.
              A lista continua sendo a dos bairros de foco comercial; o que muda
              é que o site não emite juízo sobre endereço de ninguém.
            */}
            <h2 className="font-display text-base text-white mb-4">Bairros atendidos</h2>
            <ul className="space-y-2 text-sm">
              {BAIRROS_PRIORITARIOS.slice(0, 8).map((b) => (
                <li key={b.slug}>
                  <Link href={`/bairros/${b.slug}`} className="inline-block transition-all duration-200 hover:translate-x-1 hover:text-[#c8963e]">
                    {b.nome}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/bairros" className="text-[#c8963e] hover:underline">
                  Todos os bairros de Campo Grande →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-base text-white mb-4">Contato</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 text-[#c8963e] shrink-0" aria-hidden="true" />
                <a href={`tel:${BUSINESS.phone}`} className="hover:text-[#c8963e]">
                  {BUSINESS.phoneFormatted}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 mt-0.5 text-[#c8963e] shrink-0" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-[#c8963e]">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <IconeWhatsApp className="w-4 h-4 mt-0.5 text-[#c8963e] shrink-0" />
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#c8963e]"
                >
                  Orçamento pelo WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 text-[#c8963e] shrink-0" aria-hidden="true" />
                <span>
                  {BUSINESS.address.locality}, {BUSINESS.address.region}
                </span>
              </li>
            </ul>
            <h3 className="font-display text-sm text-white mt-6 mb-2">Horário de atendimento</h3>
            <p className="text-sm">
              Segunda a sexta: {BUSINESS.hours.segundaASexta}
              <br />
              Sábado e domingo: {BUSINESS.hours.fimDeSemana}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 justify-between text-xs text-white/55">
          <p>
            © {ano} {BUSINESS.legalName}. Todos os direitos reservados.
          </p>
          <p>Pintura residencial, comercial e predial em Campo Grande MS.</p>
        </div>
      </div>
    </footer>
  )
}
