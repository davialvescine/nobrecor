'use client'

import { useState } from 'react'
import CardServico, { type ServicoCardData } from '@/components/ui/CardServico'

/**
 * Catálogo de serviços com filtro por categoria.
 *
 * A versão anterior empilhava os 4 grupos com todos os cards abertos — ~7 telas
 * de rolagem só de catálogo. Agora os chips filtram e o grid ocupa 4 colunas em
 * tela larga.
 *
 * REGRA DE SEO que este componente respeita e não pode perder: o estado inicial
 * é "todos", então o HTML estático do build contém os 20 cards — crawler e
 * Ctrl+F enxergam tudo, como no FAQ em <details> (CLAUDE.md §7). O filtro só
 * REMOVE card depois de interação do usuário; nenhum conteúdo nasce escondido.
 *
 * Recebe os dados por props em vez de importar `SERVICOS`: importar o content
 * aqui embarcaria o catálogo inteiro (FAQ, etapas, erroComum…) no bundle do
 * cliente. O pai manda só os 5 campos que o card usa.
 */

interface GrupoCatalogo {
  chave: string
  nome: string
  qtd: number
}

type ItemCatalogo = ServicoCardData & { grupo: string }

const CHIP_BASE =
  'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200'
const CHIP_INATIVO =
  'border-[#1b3a5c]/20 bg-white text-[#1b3a5c] hover:-translate-y-0.5 hover:border-[#c8963e]'
const CHIP_ATIVO = 'border-[#1b3a5c] bg-[#1b3a5c] text-white shadow-md'

export default function CatalogoServicos({
  grupos,
  itens,
}: {
  grupos: GrupoCatalogo[]
  itens: ItemCatalogo[]
}) {
  const [ativo, setAtivo] = useState('todos')
  const visiveis = ativo === 'todos' ? itens : itens.filter((i) => i.grupo === ativo)

  return (
    <>
      <div
        role="group"
        aria-label="Filtrar serviços por categoria"
        className="mt-12 flex flex-wrap justify-center gap-2.5"
      >
        <button
          type="button"
          onClick={() => setAtivo('todos')}
          aria-pressed={ativo === 'todos'}
          className={`${CHIP_BASE} ${ativo === 'todos' ? CHIP_ATIVO : CHIP_INATIVO}`}
        >
          Todos <span className="opacity-60">{itens.length}</span>
        </button>
        {grupos.map((g) => (
          <button
            key={g.chave}
            type="button"
            onClick={() => setAtivo(g.chave)}
            aria-pressed={ativo === g.chave}
            className={`${CHIP_BASE} ${ativo === g.chave ? CHIP_ATIVO : CHIP_INATIVO}`}
          >
            {g.nome} <span className="opacity-60">{g.qtd}</span>
          </button>
        ))}
      </div>

      {/*
        `key={ativo}` remonta o grid a cada troca de filtro, e o
        `animate-fade-up` escalonado faz os cards entrarem em cascata — é isso
        que dá a sensação de "dinâmico" sem nenhuma biblioteca.
      */}
      <ul key={ativo} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visiveis.map((s, i) => (
          <li
            key={s.slug}
            className="animate-fade-up"
            style={{
              animationDelay: `${Math.min(i * 45, 360)}ms`,
              // `backwards`: o card espera o delay INVISÍVEL. Sem isto, os
              // atrasados aparecem parados e "pulam" quando a animação começa.
              animationFillMode: 'backwards',
            }}
          >
            <CardServico servico={s} />
          </li>
        ))}
      </ul>
    </>
  )
}
