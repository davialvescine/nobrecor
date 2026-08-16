# Perfil da Empresa no Google — Nobre Cor Pinturas

> É o que mais move ranking local, mais que o site. Preencher inteiro e alimentar toda semana.

---

## Descrição da empresa

Limite do Google: **750 caracteres**. O campo recusa preço, promoção, link e texto em caixa-alta —
Google chega a suspender o perfil por isso. O texto abaixo tem **746 caracteres**.

Os "mais de 20 anos" são fato declarado pelo dono em 16/08/2026, não estimativa (ver a tabela
em `.claude/rules/conteudo.md`). O resto respeita a regra de não inventar: nenhum número de
obras, nenhum cliente, nenhuma avaliação.

```
A Nobre Cor Pinturas é uma empresa de pintura de alto padrão em Campo Grande MS, com mais de
20 anos de experiência. Executamos pintura residencial, comercial e predial, repintura, fachada,
grafiato, marmorato, pintura decorativa e piso epóxi em casas, apartamentos, condomínios e salas
comerciais.

Cada serviço começa com avaliação técnica no local e proposta detalhada em até 24 horas. A
equipe é uniformizada, o ambiente é protegido antes da primeira lata e a obra é
entregue limpa ao fim de cada dia. Cumprimos o cronograma e o regimento de obras de cada
condomínio.

Atendemos Campo Grande, com foco em Chácara Cachoeira, Carandá Bosque, Santa Fé, Mata do
Jacinto, Jardim dos Estados e Parque dos Poderes.

Transformando ambientes pela cor.
```

Por que está escrita assim:

- **Primeira frase** carrega "empresa de pintura" + "alto padrão" + "Campo Grande MS". O Google
  corta a descrição no resultado, então o que importa vem antes de tudo.
- **Segundo parágrafo** são os 4 diferenciais declarados pelo dono, em forma de frase.
- **Terceiro** são bairros tier 1 — reforça a área de atuação sem prometer "MS inteiro", que é
  proibido pela regra de negócio sem endereço (SAB) e é a mesma trava do `areaServed` no schema.
- **Nada de CTA com link**: o Google remove, e perfil com link na descrição entra em revisão.

---

## Resto do cadastro

| Campo | O que preencher |
|---|---|
| Nome | `Nobre Cor Pinturas` — exatamente assim, sem "Campo Grande" colado. Nome com palavra-chave enfiada é a causa nº 1 de suspensão |
| Categoria principal | **Pintor** |
| Categorias extras | Empreiteiro de pintura · Serviço de reforma residencial |
| Endereço | Sem endereço público. Marcar como **negócio de atendimento** (SAB) e definir a área de atuação |
| Área de atendimento | Campo Grande MS, e os bairros nominalmente. Nunca "Mato Grosso do Sul" |
| Telefone | `(67) 98152-2412` — idêntico ao do site, letra por letra |
| Site | o apex com https, assim que o domínio estiver de pé (ver `docs/dominio-e-dns.md`) |
| Horário | Segunda a sexta, 08:00 às 18:00. Sábado e domingo fechado |
| Serviços | Cadastrar os 20 do catálogo (`src/content/servicos.ts`), um a um |
| Atributos | "Orçamento on-line", "Atende no local" |

**NAP idêntico ao de `src/lib/business.ts`.** Divergência de nome, telefone ou endereço entre site,
Google e Instagram é o erro que mais derruba posição no Maps.

---

## Rotina depois de cadastrado

1. **Fotos toda semana.** Perfil sem foto nova cai. Foto de obra real, tirada no celular, vale mais
   que imagem produzida — e, ao contrário do site, aqui a foto pode ser do dia a dia.
2. **Pedir avaliação ao fim de cada obra**, enquanto o cliente ainda está satisfeito com o
   resultado na frente dele. É o sinal de maior peso no ranking local.
3. **Responder toda avaliação**, inclusive a ruim, em até 24h.
4. **Postagens** de serviço concluído, uma por semana.

⚠️ Enquanto não houver avaliação real, o site continua **sem** `aggregateRating` e sem `review` no
schema. As estrelas do Google vêm do perfil, não da marcação — inventar no site gera ação manual
(ver `.claude/rules/conteudo.md`).
