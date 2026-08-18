# Regra: identidade da marca Nobre Cor

Não alterar nada abaixo sem pedido explícito do dono.

## Paleta

| Token | Hex | Uso |
|---|---|---|
| Azul Nobre | `#1B3A5C` | base, seções escuras, títulos |
| Off-White | `#F7F4EF` | fundo claro |
| Dourado | `#C8963E` | acento premium, CTA, detalhes |
| Dourado Escuro | `#906928` | facetas, hover, texto de apoio em fundo claro |
| Aço | `#5B7FA6` | facetas do diamante |
| Carvão | `#2B2B2B` | texto corrido |
| Verde WhatsApp | `#25D366` | **só** o botão do WhatsApp |

O verde é o ÚNICO elemento verde do site, e é proposital. Não usar verde para nada mais.

## Botão dourado

Fundo dourado com texto **azul-escuro** (`#1B3A5C`), 14px semibold.
NÃO trocar para texto branco — cai para ~2,1:1 e reprova.

O fundo é um gradiente de três paradas, e **cada uma foi medida sozinha**:
`#dcac52` (5,57) → `#d0a047` (4,87) → `#ca9944` (4,51). Todas passam nos 4,5:1 exigidos
para texto abaixo de 18,66px. Medir a média do botão não serve: o contraste vale para o
pixel onde a letra está, e era exatamente a ponta direita que reprovava.

⚠️ Histórico: até 17/08/2026 a regra afirmava "contraste aferido 5:1". O número nunca
existiu. O gradiente terminava em `#a87b2f` e a ponta direita media **3,07** — reprovava
na parte do botão onde costuma cair o fim do texto. Foi achado medindo o site no ar.

## Tipografia

- Títulos e logotipo: **Bebas Neue** (condensada, geométrica, peso 400)
- Texto: **Plus Jakarta Sans** (400/500/600/700)
- Ambas via `next/font/google`, nunca via `<link>` no head (causa CLS).

**Bebas Neue é exclusivamente caixa-alta.** Não use em parágrafo, label longo ou
qualquer texto de leitura: só título. Os `h1..h4` já recebem
`text-transform: uppercase` no `globals.css`, então escrever em caixa mista no
JSX é seguro (e ajuda quem lê o código).

Trocada por pedido do dono em 16/08/2026; antes era Marcellus (serifada).

## Símbolo

Diamante **facetado e preenchido**, com 5 polígonos. Componente `Diamante` em
`src/components/ui/Logo.tsx`, reproduzido a partir de
`public/images/marca/nobrecor-principal.svg`.

Não substituir por versão em contorno: são as facetas e suas cores que dão a
leitura de "diamante" em vez de "losango". Há duas variantes, como no manual:
fundo claro e fundo escuro (nesta, a base clareia para `#2E5580` para não sumir
contra o azul da marca).
