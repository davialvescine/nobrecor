# Search Console e Bing Webmaster

> Estado em 16/08/2026: domínio **no ar** (`https://nobrecorpinturas.com.br`), sitemap com
> **211 URLs** servindo, IndexNow **ativo**. Falta verificar a propriedade e enviar o sitemap.

---

## Por que só agora

Enquanto o domínio não existia, enviar o sitemap era inútil: as 211 URLs declaram
`nobrecorpinturas.com.br` como canônica, e o Google descartaria todas por apontarem para um
domínio que não resolvia. Com o domínio de pé, o caminho está livre.

---

## 1. Google Search Console

### Escolha o tipo certo de propriedade

Use **Propriedade de domínio** (a opção da esquerda, que pede DNS), não "Prefixo do URL".

O motivo é concreto neste projeto: existem quatro endereços possíveis
(`http://`, `https://`, com e sem `www`). A propriedade de domínio cobre os quatro numa
verificação só. O prefixo de URL cobriria um, e os relatórios ficariam divididos.

### Passo a passo

1. Abra [search.google.com/search-console](https://search.google.com/search-console) e escolha
   **Propriedade de domínio** → digite `nobrecorpinturas.com.br` (sem `https://`, sem `www`).
2. O Google mostra um registro TXT, algo como
   `google-site-verification=AbC123...`.
3. **Me passe esse valor.** Como o DNS agora é gerenciado pela Vercel, eu adiciono com um
   comando e você só clica em "Verificar":

   ```bash
   vercel dns add nobrecorpinturas.com.br @ TXT "google-site-verification=SEU_VALOR" \
     --scope davialvescine
   ```

4. Volte ao Search Console e clique em **Verificar**. Se reclamar, espere alguns minutos: o TXT
   precisa propagar.

### Alternativa, se o Google só oferecer meta tag

O código já aceita, sem precisar de alteração:

```bash
vercel env add NEXT_PUBLIC_GOOGLE_VERIFICATION production --scope davialvescine
# cole só o conteúdo do content="...", sem a tag inteira
vercel deploy --prod --yes --scope davialvescine
```

### Depois de verificar

1. **Sitemaps** → enviar `sitemap.xml` (só o caminho, não a URL inteira).
2. **Inspeção de URL** na home → "Solicitar indexação". Adianta a primeira visita do robô.
3. Repita a inspeção em 3 ou 4 landings da onda 1, por exemplo
   `/pintura-de-alto-padrao-chacara-cachoeira`.
4. Em **Configurações → Usuários e permissões**, confira que a conta do dono é proprietária.

---

## 2. Bing Webmaster Tools

O caminho curto: [bing.com/webmasters](https://www.bing.com/webmasters) → **Importar do Google
Search Console**. Ele traz propriedade, verificação e sitemap prontos. Só funciona depois do
passo 1.

Se preferir verificar direto, o código também aceita a meta tag do Bing:

```bash
vercel env add NEXT_PUBLIC_BING_VERIFICATION production --scope davialvescine
```

---

## 3. IndexNow — já está ativo

Chave gerada e registrada em 16/08/2026:

- arquivo público: `public/<chave>.txt` (o nome do arquivo É a chave, exigência do protocolo)
- variável `INDEXNOW_KEY` definida na Vercel, ambiente Production
- `scripts/ping-indexnow.mjs` roda no `postbuild` e avisa Bing e Yandex a cada deploy

O ping foi testado e voltou **202 Accepted**.

⚠️ Um bug que já existiu e não deve voltar: o script tinha o host escrito à mão, e ficou
apontando para um domínio que nunca existiu quando o domínio foi decidido. Agora ele **lê a URL
de `src/lib/business.ts`**. Ping para host errado é rejeitado em silêncio, e como o script
falha calado por natureza, ninguém percebe.

---

## 4. O que observar nas primeiras semanas

| Onde | O que olhar |
|---|---|
| Cobertura / Páginas | Quantas das 211 saíram de "Descoberta" para "Indexada" |
| Desempenho | Consultas que trazem impressão, mesmo sem clique ainda |
| Experiência na página | Core Web Vitals, quando houver dados de campo |

Os **gates da onda 2** (CLAUDE.md §6) se medem aqui: ≥90% das páginas da onda 1 indexadas, CTR
médio ≥1,0% e zero páginas em "Rastreada, não indexada" há mais de 30 dias. Não suba
`ONDA_ATIVA` antes disso.

Indexação de site novo leva de dias a semanas. Não é motivo de alarme na primeira semana.

---

## 5. Google Analytics, ainda pendente

`NEXT_PUBLIC_GA_ID` continua sem valor. Quando criar a propriedade (GA4, formato `G-XXXXXXXXXX`):

```bash
vercel env add NEXT_PUBLIC_GA_ID production --scope davialvescine
vercel deploy --prod --yes --scope davialvescine
```
