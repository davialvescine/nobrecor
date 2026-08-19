# E-mail no domínio — contato@nobrecorpinturas.com.br

> ✅ **Feito em 19/08/2026.** O site publica `contato@nobrecorpinturas.com.br`, pela **Opção A**
> (encaminhamento ImprovMX, grátis). Teste confirmado no log do ImprovMX: entrou pelo
> `mx1.improvmx.com` e foi entregue no `gmail-smtp-in.l.google.com` em **1,0 segundo**, com
> `250 OK`. Aliases ativos: `contato@` e o catch-all `*@`, ambos para
> `nobrecorpinturas@gmail.com`.
>
> Duas diferenças em relação ao que este arquivo previa:
>
> 1. **O SPF inclui `_spf.google.com` junto com o ImprovMX** — assim dá para usar o "Enviar
>    e-mail como" do Gmail e responder como `contato@` de graça, sem o plano pago do ImprovMX.
>    Sem esse include, essas respostas cairiam em spam.
> 2. **O SPF termina em `~all`, não no `-all`** que o painel do ImprovMX recomenda. Com `-all`,
>    qualquer serviço que a gente esquecer de incluir tem o e-mail rejeitado de vez, em lugar
>    de só marcado. Endurecer depois, junto com o DMARC.
>
> ⚠️ **Encaminhamento quebra o SPF do remetente** — é inerente, não é erro de configuração. A
> mensagem diz "sou do gmail.com" mas quem entrega é o ImprovMX, que não está no SPF do
> gmail.com. Por isso o primeiro teste caiu no spam. O DKIM sobrevive ao encaminhamento, então
> e-mail do Google (assinado por `google.com`) se sai melhor — mas vale criar um filtro no Gmail
> em **Para: `@nobrecorpinturas.com.br`** com "Nunca enviar para o Spam", para não perder
> verificação.

---

## A pergunta que decide tudo

**Você precisa RESPONDER como `contato@`, ou só RECEBER nele?**

- Só receber → o encaminhamento grátis resolve, e nada muda na sua rotina.
- Responder também → precisa de caixa de verdade, e aí há um grátis e um pago.

Para a Nobre Cor isso pesa menos do que pareceria: o canal de conversão é o WhatsApp, e o
formulário do site entrega o lead lá. O e-mail serve para arquiteto, síndico e administradora
de condomínio, que costumam mandar pedido por escrito.

---

## Opção A — Encaminhamento grátis (ImprovMX)

Tudo que chega em `contato@nobrecorpinturas.com.br` cai no Gmail que você já lê.

| | |
|---|---|
| Custo | **R$ 0** |
| Recebe | ✅ |
| Envia como `contato@` | ❌ sai como o Gmail |
| Limite | 1 domínio, 25 apelidos, 500 encaminhamentos/dia |
| Onde você lê | no seu Gmail de sempre |

**Registros:**

```bash
vercel dns add nobrecorpinturas.com.br @ MX mx1.improvmx.com 10 --scope davialvescine
vercel dns add nobrecorpinturas.com.br @ MX mx2.improvmx.com 20 --scope davialvescine
vercel dns add nobrecorpinturas.com.br @ TXT "v=spf1 include:spf.improvmx.com ~all" --scope davialvescine
```

---

## Opção B — Caixa grátis de verdade (Zoho Mail)

Caixa própria, envia e recebe pelo `contato@`. O plano grátis cobre 1 domínio e até 5 usuários.

| | |
|---|---|
| Custo | **R$ 0** |
| Recebe | ✅ |
| Envia como `contato@` | ✅ |
| Armazenamento | 5 GB por usuário |
| Onde você lê | **só** no webmail e no app do Zoho |

⚠️ O plano grátis **não tem IMAP nem POP**. Na prática: não dá para puxar esse e-mail para
dentro do Gmail, do Outlook nem do app de e-mail do celular. Vira um segundo lugar para olhar
todo dia — e caixa que ninguém olha é pior que não ter caixa. O grátis também **não faz
encaminhamento**, então não dá para resolver isso mandando cópia para o Gmail.

**Registros** (confira no painel do Zoho: variam conforme o data center que ele atribuir):

```bash
vercel dns add nobrecorpinturas.com.br @ MX mx.zoho.com 10 --scope davialvescine
vercel dns add nobrecorpinturas.com.br @ MX mx2.zoho.com 20 --scope davialvescine
vercel dns add nobrecorpinturas.com.br @ MX mx3.zoho.com 50 --scope davialvescine
vercel dns add nobrecorpinturas.com.br @ TXT "v=spf1 include:zoho.com ~all" --scope davialvescine
```

Mais um TXT de verificação de domínio e o DKIM, que o Zoho gera na hora do cadastro.

---

## Opção C — Google Workspace

O `contato@` vira uma conta Google completa: Gmail, Drive, Agenda, tudo dentro da interface que
você já usa. É a que menos muda hábito.

| | |
|---|---|
| Custo | **~R$ 33 a R$ 42 por usuário/mês** (Business Starter; varia com o câmbio, pago em dólar com IOF, ou em real via revenda) |
| Recebe / envia | ✅ |
| Armazenamento | 30 GB |
| Onde você lê | no Gmail, junto com o resto |

Vantagem que só aparece aqui: a conta do **Perfil da Empresa no Google**, do **Analytics** e do
**Search Console** passa a ser a mesma conta corporativa. Hoje está tudo num Gmail pessoal, e
isso vira problema no dia em que o acesso precisar ser transferido.

**Registro:**

```bash
vercel dns add nobrecorpinturas.com.br @ MX smtp.google.com 1 --scope davialvescine
vercel dns add nobrecorpinturas.com.br @ TXT "v=spf1 include:_spf.google.com ~all" --scope davialvescine
```

---

## Recomendação

**Comece pela A.** Custa zero, coloca o `contato@nobrecorpinturas.com.br` no ar hoje — no site,
no Perfil da Empresa e no Instagram — e o e-mail continua caindo no Gmail que você já abre. O
único porém, a resposta sair do Gmail, quase não aparece na prática: quem escreve para uma
pintora de alto padrão espera resposta, não confere o remetente.

**Migre para a C quando** o e-mail virar canal de verdade (proposta para condomínio, orçamento
para arquiteto) ou quando a empresa tiver mais de uma pessoa atendendo. Aí o ganho de ter tudo
sob conta corporativa passa a valer os R$ 40.

**Pularia a B.** Caixa grátis sem IMAP é caixa que vira segundo lugar para olhar, e na primeira
semana corrida ninguém olha.

---

## Independente da opção: SPF, DKIM e DMARC

Sem esses três, e-mail enviado pelo domínio cai em spam — inclusive resposta de orçamento.

| Registro | Para quê |
|---|---|
| **SPF** (TXT) | diz quais servidores podem enviar em nome do domínio |
| **DKIM** (TXT) | assina cada mensagem; o provedor gera a chave |
| **DMARC** (TXT) | diz ao mundo o que fazer quando SPF ou DKIM falham |

DMARC inicial, permissivo de propósito (só observa, não rejeita):

```bash
vercel dns add nobrecorpinturas.com.br _dmarc TXT "v=DMARC1; p=none; rua=mailto:nobrecorpinturas@gmail.com" --scope davialvescine
```

Depois de algumas semanas sem falso positivo, dá para endurecer para `p=quarantine`.

---

## Depois que o e-mail estiver de pé

1. Trocar `email` em `src/lib/business.ts` para `contato@nobrecorpinturas.com.br` e publicar.
2. Atualizar no Perfil da Empresa no Google e na bio do Instagram.
3. Conferir que o rodapé do site e a página de contato mostram o novo endereço (os dois leem do
   `BUSINESS`, então mudam sozinhos).
