# Regra: conteúdo — nunca inventar

Esta é a regra mais importante do projeto e vale para TODO agente e TODA sessão.

## Proibido escrever como se existisse

- **Depoimento de cliente** — a empresa é nova; não há nenhum. Placeholder visual, jamais texto
  apresentado como avaliação real.
- **`aggregateRating` / `review` no schema** — nota inventada é causa direta de ação manual do
  Google, e a punição atinge os rich results do site inteiro.
- **Preço de tabela** — a Nobre Cor orça por avaliação técnica no local. "A partir de R$ X" sem
  base real vira reclamação no fechamento.
- **Ponto de referência, condomínio ou rua de bairro** que não foi verificado em fonte real
  (PLANURB, prefeitura, mapa, site do condomínio). Bairro sem referência conhecida fica com
  `pontosReferencia: []` — o template já omite o bloco. Página menor é melhor que página falsa.
- **Obra entregue / anos de mercado / número de clientes** — nada disso está estabelecido.

## Permitido e desejável

- Detalhe TÉCNICO do serviço (processo, material, norma) — é conhecimento do ofício, não invenção.
- Perfil de imóvel do bairro descrito de forma geral e verificável.
- Os 4 diferenciais declarados pelo dono (ver `BUSINESS.diferenciais`).

Quando a informação faltar, a saída correta é: escrever menos, ou perguntar ao dono.
