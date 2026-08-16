# Domínio e DNS — nobrecorpinturas.com.br

> Decisão do dono em 16/08/2026: o domínio é **nobrecorpinturas.com.br**, para casar com o
> `@nobrecorpinturas` do Instagram. `SITE_URL` já aponta para ele em `src/lib/business.ts`.

---

## 1. Registro (só o dono pode fazer)

O `.com.br` é registrado no **[registro.br](https://registro.br)**, não na Vercel. Exige conta
com CPF ou CNPJ e pagamento — por isso é passo manual, não automatizável daqui.

- Custo: ~R$ 40/ano (mais barato no plano de 3 ou 5 anos).
- Registre em **CNPJ da Nobre Cor** se já existir. Domínio em CPF de terceiro vira problema
  no dia que a empresa mudar de mãos ou precisar comprovar titularidade.
- Ative a **renovação automática** na hora. Domínio de empresa que expira derruba site,
  e-mail e ranking de uma vez, e o retorno para o índice do Google leva semanas.

Confira também se o `@nobrecorpinturas` continua livre no Instagram e reserve junto.

---

## 2. Escolha do modo de DNS

Depois de registrado, o domínio precisa apontar para a Vercel. Há dois caminhos, e eles são
**excludentes** — escolha um.

### Opção A — nameservers da Vercel (recomendada)

A Vercel passa a ser a autoridade de DNS do domínio. Menos campos para errar, certificado TLS
emitido sozinho, e qualquer registro futuro (e-mail, verificação de domínio) se faz num lugar só.

1. Na Vercel, no projeto: **Settings → Domains → Add**, informe `nobrecorpinturas.com.br`.
2. A Vercel mostra dois nameservers, no formato `ns1.vercel-dns.com` e `ns2.vercel-dns.com`.
   **Copie os que aparecerem na tela** — não os daqui: a Vercel atribui o par por conta.
3. No registro.br: **Painel → o domínio → DNS → Alterar servidores DNS**, troque os
   `*.registro.br` pelos da Vercel e salve.

Ponto de atenção do registro.br: ele só publica o domínio depois de conseguir consultar a zona
nos nameservers informados. Por isso **adicione o domínio na Vercel antes** de trocar os
nameservers — se a zona ainda não existir, o registro.br deixa o domínio em
"Aguardando configuração de DNS" e nada resolve.

### Opção B — manter o DNS no registro.br

Escolha esta só se algum outro serviço já depende do DNS estar no registro.br. Aí, em
**DNS → Editar zona**, adicione:

| Tipo | Nome | Valor | TTL |
|---|---|---|---|
| `A` | `@` | o IPv4 que a Vercel mostrar (a doc traz `76.76.21.21`) | 3600 |
| `CNAME` | `www` | o alvo que a Vercel mostrar (`cname.vercel-dns.com`) | 3600 |

⚠️ **Não copie esses dois valores confiando neste arquivo.** A Vercel atribui IP e alvo de
CNAME por projeto e já mudou os padrões mais de uma vez. O valor válido é o que aparece na tela
ao adicionar o domínio, ou o que sai de:

```bash
vercel domains inspect nobrecorpinturas.com.br
```

O `A` no apex (`@`) é obrigatório: `.com.br` não aceita `CNAME` na raiz da zona.

---

## 3. Redirecionamento www → apex

Registre **os dois** na Vercel (`nobrecorpinturas.com.br` e `www.nobrecorpinturas.com.br`) e
marque o apex como o principal, com o `www` redirecionando para ele com 308.

Isso não é estética: o `canonical` de todas as 213 páginas é gerado a partir de `SITE_URL`, que
é o apex. Se o `www` responder 200 em vez de redirecionar, o Google enxerga duas cópias do site
inteiro e divide o sinal entre elas.

---

## 4. Conferir se ficou de pé

A propagação do `.com.br` costuma levar de minutos a algumas horas.

```bash
dig A nobrecorpinturas.com.br +short          # deve devolver o IP da Vercel
dig NS nobrecorpinturas.com.br +short         # confere os nameservers em vigor
dig CNAME www.nobrecorpinturas.com.br +short  # só na opção B

curl -sI https://nobrecorpinturas.com.br | head -1        # HTTP/2 200
curl -sI https://www.nobrecorpinturas.com.br | head -1    # HTTP/2 308
```

Na Vercel, a coluna do domínio precisa sair de *Invalid Configuration* para **Valid**, e o
certificado TLS aparece sozinho poucos minutos depois.

---

## 5. Depois que o domínio estiver no ar

Nesta ordem:

1. **Search Console e Bing Webmaster** — verificar a propriedade e enviar
   `https://nobrecorpinturas.com.br/sitemap.xml`.
2. **`NEXT_PUBLIC_GA_ID`** — criar a propriedade no Google Analytics e definir a variável na
   Vercel (Production, Preview e Development).
3. **Perfil da Empresa no Google** — o site oficial precisa ser exatamente o apex, com https.
   NAP idêntico ao de `src/lib/business.ts`, sem uma vírgula de diferença.
4. **Cache do card de link** — o WhatsApp guarda a imagem de preview por bastante tempo. Se o
   card sair errado, force pelo depurador de compartilhamento do Facebook (mesma infraestrutura
   de scraping).
5. **Instagram e materiais impressos** — atualizar a bio e qualquer arte com o domínio.

## 6. E-mail

Hoje o contato por e-mail é **nobrecorpinturas@gmail.com**, e é o que está em
`BUSINESS.email`. Funciona, mas gmail.com num site de alto padrão entrega que a empresa é nova
— e o Perfil da Empresa no Google trata e-mail no domínio próprio como sinal de legitimidade.

Assim que o domínio estiver de pé, crie **`contato@nobrecorpinturas.com.br`** e troque em
`src/lib/business.ts`. O caminho mais barato é encaminhamento: a caixa continua sendo o mesmo
Gmail, só muda o endereço que o cliente vê.

Onde criar os registros depende da opção escolhida na seção 2 (Vercel na A, registro.br na B).
Seja qual for, o e-mail exige, no mínimo:

| Tipo | Nome | Para quê |
|---|---|---|
| `MX` | `@` | para onde vai a mensagem recebida |
| `TXT` (SPF) | `@` | quem pode enviar em nome do domínio |
| `TXT` (DKIM) | conforme o provedor | assinatura das mensagens enviadas |

Sem SPF e DKIM, e-mail enviado pelo domínio cai em spam — inclusive resposta a orçamento.
