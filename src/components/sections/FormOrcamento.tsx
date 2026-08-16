'use client'

/**
 * Formulário de pedido de orçamento.
 *
 * DECISÃO DE ARQUITETURA (dono, 16/08/2026): não há backend. O formulário monta
 * a mensagem e abre o WhatsApp já escrito. Consequências, todas desejadas:
 *
 * - o site segue 100% estático (ver .claude/rules/nextjs.md);
 * - nenhum dado do cliente trafega ou fica armazenado em servidor nosso ou de
 *   terceiro, o que simplifica a LGPD a uma frase honesta no rodapé do card;
 * - o lead chega no mesmo canal de todos os outros CTAs do site.
 *
 * Bairro e serviço saem de `src/content/` — a mesma fonte única das 213 páginas.
 * Digitar região à mão (como faz o concorrente) devolve "asa sul", "Asa-Sul" e
 * "asasul"; o select devolve sempre o nome canônico do bairro.
 */

import { useId, useState } from 'react'
import { Send } from 'lucide-react'
import { BAIRROS } from '@/content/bairros'
import { REGIOES_URBANAS } from '@/content/regioes'
import { GRUPOS, SERVICOS } from '@/content/servicos'
import { buildWhatsAppLink } from '@/lib/business'
import { trackWhatsAppClick } from '@/lib/analytics'
import Reveal from '@/components/ui/Reveal'

const TIPOS_IMOVEL = [
  'Casa',
  'Apartamento',
  'Sala comercial',
  'Loja',
  'Clínica ou consultório',
  'Prédio ou condomínio',
  'Galpão',
  'Obra nova',
  'Outro',
]

/** Bairros agrupados pela região urbana, para o <optgroup> do select. */
const BAIRROS_POR_REGIAO = REGIOES_URBANAS.map((regiao) => ({
  nome: regiao.nome,
  bairros: BAIRROS.filter((b) => b.regiao === regiao.slug).sort((a, b) =>
    a.nome.localeCompare(b.nome, 'pt-BR'),
  ),
})).filter((g) => g.bairros.length > 0)

/** Serviços agrupados pelo grupo do catálogo, na mesma ordem da página /serviços. */
const SERVICOS_POR_GRUPO = (Object.keys(GRUPOS) as Array<keyof typeof GRUPOS>)
  .map((chave) => ({
    nome: GRUPOS[chave],
    itens: SERVICOS.filter((s) => s.grupo === chave),
  }))
  .filter((g) => g.itens.length > 0)

const CAMPO =
  'w-full rounded-[var(--radius-btn)] border border-[#1b3a5c]/20 bg-white px-4 py-3.5 text-[#2b2b2b] ' +
  'placeholder:text-[#2b2b2b]/45 transition-colors focus:border-[#c8963e] focus:outline-none ' +
  'focus:ring-2 focus:ring-[#c8963e]/30'

const ROTULO = 'mb-2 block text-sm font-semibold text-[#1b3a5c]'

interface FormOrcamentoProps {
  titulo?: string
  subtitulo?: string
  /** Pré-seleciona o bairro. Usado nas páginas de bairro e nas landings. */
  bairroPadrao?: string
  /** Pré-seleciona o serviço. Usado nas páginas de serviço e nas landings. */
  servicoPadrao?: string
}

export default function FormOrcamento({
  titulo = 'Peça seu orçamento',
  subtitulo = 'Preencha os campos abaixo. A mensagem chega pronta no nosso WhatsApp e você recebe a proposta detalhada em até 24 horas.',
  bairroPadrao = '',
  servicoPadrao = '',
}: FormOrcamentoProps) {
  const id = useId()
  const [nome, setNome] = useState('')
  const [bairro, setBairro] = useState(bairroPadrao)
  const [tipoImovel, setTipoImovel] = useState('')
  const [servico, setServico] = useState(servicoPadrao)
  const [detalhes, setDetalhes] = useState('')
  /**
   * Armadilha para robô: campo invisível para gente, irresistível para
   * preenchedor automático. Evita reCAPTCHA, que custa ~250 KB de JS de
   * terceiro e um cookie a mais — caro demais para um form que não tem servidor
   * para proteger.
   */
  const [armadilha, setArmadilha] = useState('')

  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (armadilha) return

    const linhas = [
      'Olá! Vim pelo site e gostaria de um orçamento de pintura.',
      '',
      `Nome: ${nome.trim()}`,
      bairro && `Bairro: ${bairro}`,
      tipoImovel && `Imóvel: ${tipoImovel}`,
      servico && `Serviço: ${servico}`,
      detalhes.trim() && `Detalhes: ${detalhes.trim()}`,
    ].filter(Boolean)

    trackWhatsAppClick('formulario-orcamento', servico || undefined, bairro || undefined)

    const link = buildWhatsAppLink(linhas.join('\n'))
    const janela = window.open(link, '_blank', 'noopener,noreferrer')
    // Bloqueador de pop-up: cai para navegação na própria aba em vez de falhar calado.
    if (!janela) window.location.href = link
  }

  return (
    <section
      className="relative scroll-mt-20 overflow-hidden py-24 md:py-28"
      aria-labelledby={`${id}-titulo`}
      id="orcamento"
    >
      {/* Fundo: a mesma fachada da hero, rebaixada e coberta pelo azul da marca. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero/rolo-detalhe.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, rgba(15,36,55,0.96) 0%, rgba(27,58,92,0.93) 55%, rgba(36,72,110,0.90) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[var(--radius-card)] bg-[#f7f4ef] p-8 shadow-2xl sm:p-10 md:p-12">
            <h2
              id={`${id}-titulo`}
              className="text-center font-display text-3xl text-[#1b3a5c] md:text-4xl"
            >
              {titulo}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-[#2b2b2b]/75">
              {subtitulo}
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              {/* Armadilha para robô. Fora da tela, mas não display:none — há bot que ignora. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor={`${id}-site`}>Não preencha este campo</label>
                <input
                  id={`${id}-site`}
                  name="site"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={armadilha}
                  onChange={(e) => setArmadilha(e.target.value)}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={ROTULO} htmlFor={`${id}-nome`}>
                    Seu nome <span className="text-[#a87b2f]">*</span>
                  </label>
                  <input
                    id={`${id}-nome`}
                    className={CAMPO}
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Como podemos te chamar"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div>
                  <label className={ROTULO} htmlFor={`${id}-bairro`}>
                    Bairro do imóvel
                  </label>
                  <select
                    id={`${id}-bairro`}
                    className={CAMPO}
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  >
                    <option value="">Selecione o bairro</option>
                    {BAIRROS_POR_REGIAO.map((grupo) => (
                      <optgroup key={grupo.nome} label={`Região ${grupo.nome}`}>
                        {grupo.bairros.map((b) => (
                          <option key={b.slug} value={b.nome}>
                            {b.nome}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={ROTULO} htmlFor={`${id}-imovel`}>
                    Tipo de imóvel
                  </label>
                  <select
                    id={`${id}-imovel`}
                    className={CAMPO}
                    value={tipoImovel}
                    onChange={(e) => setTipoImovel(e.target.value)}
                  >
                    <option value="">Selecione o tipo</option>
                    {TIPOS_IMOVEL.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={ROTULO} htmlFor={`${id}-servico`}>
                    Serviço desejado
                  </label>
                  <select
                    id={`${id}-servico`}
                    className={CAMPO}
                    value={servico}
                    onChange={(e) => setServico(e.target.value)}
                  >
                    <option value="">Selecione o serviço</option>
                    {SERVICOS_POR_GRUPO.map((grupo) => (
                      <optgroup key={grupo.nome} label={grupo.nome}>
                        {grupo.itens.map((s) => (
                          <option key={s.slug} value={s.nome}>
                            {s.nome}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                    <option value="Ainda não sei">Ainda não sei</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={ROTULO} htmlFor={`${id}-detalhes`}>
                  Conte um pouco sobre a obra
                </label>
                <textarea
                  id={`${id}-detalhes`}
                  className={`${CAMPO} min-h-32 resize-y`}
                  rows={4}
                  placeholder="Metragem aproximada, estado das paredes, prazo desejado, o que mais ajudar."
                  value={detalhes}
                  onChange={(e) => setDetalhes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn-dourado inline-flex w-full items-center justify-center gap-2.5 rounded-[var(--radius-btn)] px-8 py-4 text-base font-semibold"
              >
                Enviar pelo WhatsApp
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>

              <p className="text-center text-sm leading-relaxed text-[#2b2b2b]/60">
                Nada é gravado neste site: ao enviar, seus dados vão direto para a conversa
                no WhatsApp e ficam só entre você e a Nobre Cor.
              </p>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
