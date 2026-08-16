# Procedência da base de bairros de Campo Grande

> Documenta de onde veio cada nome em `src/content/bairros.ts`, o que foi verificado e o que
> **não** foi. Levantamento feito em 16/08/2026.
>
> Leia antes de escalar as ondas 2 e 3 da matriz de SEO: publicar landing de um bairro que não
> existe é conteúdo errado com URL própria, e o Google indexa igual.

---

## 1. Resumo honesto

| Item | Situação |
|---|---|
| Bairros na base | **81** (80 marcados como oficiais + 1 área não oficial) |
| Regiões urbanas | 7, conforme a divisão da PLANURB |
| Fonte primária usada | Série jornalística "Um giro na sua região", do Aquele Mato |
| Documento oficial da PLANURB | **não consultado com sucesso** (ver §4) |
| Grau de confiança | **médio.** Os nomes e o agrupamento por região batem entre as fontes; a contagem total tem divergência de 1 a 2 nomes |

**Tradução prática:** a lista serve com folga para a onda 1 (que só usa os 15 bairros tier 1,
todos amplamente conhecidos e de nome incontroverso). Antes das ondas 2 e 3, que entram na
cauda longa, vale a validação descrita em §5.

---

## 2. O que cada fonte entregou

A série "Um giro na sua região" cobre as 7 regiões em 4 matérias. Foi a única fonte encontrada
que lista os bairros **nomeadamente e agrupados por região urbana**, em formato legível por
máquina.

| Região | Bairros na fonte | Matéria |
|---|---|---|
| Prosa | 11 | [Prosa](https://aquelemato.org/blog/um-giro-na-sua-regiao-prosa/) |
| Centro | 13 | [Centro e Segredo](https://aquelemato.org/blog/um-giro-na-sua-regiao-centro-e-segredo/) |
| Segredo | 13 + Cerejeira citada à parte | [Centro e Segredo](https://aquelemato.org/blog/um-giro-na-sua-regiao-centro-e-segredo/) |
| Bandeira | 11 | [Bandeira e Anhanduizinho](https://aquelemato.org/blog/um-giro-na-sua-regiao-bandeira-e-anhanduizinho/) |
| Anhanduizinho | 14 | [Bandeira e Anhanduizinho](https://aquelemato.org/blog/um-giro-na-sua-regiao-bandeira-e-anhanduizinho/) |
| Lagoa | 11 | [Lagoa e Imbirussu](https://aquelemato.org/blog/um-giro-na-sua-regiao-lagoa-e-imbirussu/) |
| Imbirussu | 7 | [Lagoa e Imbirussu](https://aquelemato.org/blog/um-giro-na-sua-regiao-lagoa-e-imbirussu/) |

**Total da fonte:** 80 nomes (81 contando Cerejeira, citada no corpo do texto como bairro novo
da região do Segredo e por isso incluída na base).

### Fontes de apoio

- **PLANURB / Prefeitura de Campo Grande** — confirmam a existência e os nomes das 7 regiões
  urbanas: [PLANURB](https://www.campogrande.ms.gov.br/planurb/) ·
  [Mapa de regiões urbanas e bairros](https://www.campogrande.ms.gov.br/planurb/sec-downloads/mapa-de-campo-grande-com-regioes-urbanas-bairros-e-malha-urbana/) ·
  [SISGRAN](https://www.campogrande.ms.gov.br/sisgran/)
- **Contagem total** — fontes de mercado citam **79 bairros** distribuídos nas 7 regiões
  ([MRV](https://sonharemorar.mrv.com.br/veja-um-panorama-sobre-os-bairros-de-campo-grande-ms/)).
  Materiais mais antigos da PLANURB citam **74**, número usado nas rodadas de audiência de 2017.

---

## 3. Divergência de contagem

| Fonte | Total |
|---|---|
| PLANURB, materiais de 2017 | 74 |
| Fontes de mercado, atuais | 79 |
| Nossa base | 80 oficiais |

A diferença é esperada e tem explicação plausível: bairros são criados e desmembrados por lei
municipal ao longo do tempo, então 74 → 79 reflete crescimento real da cidade. Nossos 80 podem
conter **um a dois nomes que são parcelamento e não bairro** — Campo Grande tem 793
parcelamentos, e é comum um loteamento conhecido ser tratado como bairro na fala corrente.

Os candidatos mais prováveis a essa confusão, por serem os menos citados nas fontes de apoio:
`cerejeira`, `dona-dede`, `carvalho`, `marli`, `jacy`.

**Nenhum deles é tier 1**, então não afeta a onda 1.

---

## 4. O que foi tentado e não funcionou

Registro para ninguém repetir o caminho:

| Tentativa | Resultado |
|---|---|
| `ANEXO-4.pdf` (mapa oficial de regiões e bairros) | PDF é **imagem escaneada**, sem camada de texto |
| `20120403102311.pdf` (mapa PLANURB) | Idem: mapa, não tabela |
| `perfil-socioeconomico-2017.pdf` | Servidor retorna **HTTP 500** |
| Página de edições do Perfil Socioeconômico | Carrega, mas sem link de PDF acessível |
| SISGRAN → "Regiões Urbanas e Bairros" | Leva a indicadores gerais; os dados exportáveis são de população, domicílio e economia, **nenhum com a lista de bairros** |
| Wikipédia (pt) | **Não existe** artigo "Lista de bairros de Campo Grande" |

O certificado TLS de `campogrande.ms.gov.br` não valida na cadeia padrão (precisou de `curl -k`),
o que também bloqueia ferramentas de fetch mais estritas.

---

## 5. Como validar antes das ondas 2 e 3

Em ordem de custo, do mais barato ao mais caro:

1. **Perfil Socioeconômico de Campo Grande**, edição mais recente (a 31ª é de 2024). É a
   publicação anual da PLANURB e traz a tabela de bairros por região urbana. Baixar em
   [planurb/perfil-socioeconomico-de-campo-grande-edicoes](https://www.campogrande.ms.gov.br/planurb/perfil-socioeconomico-de-campo-grande-edicoes/).
   Para extrair texto de PDF nesta máquina falta o poppler: `brew install poppler`, depois
   `pdftotext -layout arquivo.pdf -`.
2. **Lei de Uso e Ocupação do Solo** e as leis posteriores de criação de bairro, no portal da
   Câmara Municipal. É a fonte com valor jurídico.
3. **Pedido à PLANURB** pelo canal de dados abertos ou e-SIC, solicitando a listagem em CSV.

Ao validar, atualizar: esta seção, a contagem no `CLAUDE.md` §0 e o teste de bairros em
`tests/conteudo.test.ts`.

---

## 6. Decisões do dono registradas (16/08/2026)

| Nome | Decisão | Observação |
|---|---|---|
| **Los Angeles** | ❌ fora da base | Aparece na fonte, na região do Anhanduizinho. Removido a pedido do dono. Há teste garantindo que não volte |
| **Aquários** | ❌ fora da base | Removido a pedido do dono. Não constava na fonte |
| **Altos da Afonso Pena** | ✅ dentro, com `oficialPlanurb: false` | Não é bairro na divisão oficial: é a faixa nobre ao longo da avenida, distribuída entre bairros vizinhos do Prosa. Entrou por ser termo de busca forte no alto padrão. A página exibe uma nota explicando isso ao visitante |
| **Parque dos Poderes** | ✅ como *alias* de `veraneio` | O bairro oficial se chama Veraneio; "Parque dos Poderes" é como as pessoas buscam |

---

## 7. Composição atual da base

80 oficiais + 1 não oficial = **81**. Tier 1 marcado com ★.

### Prosa — 11 oficiais + 1 não oficial
★ Chácara Cachoeira · ★ Carandá Bosque · ★ Santa Fé · ★ Mata do Jacinto ·
★ Veraneio (Parque dos Poderes) · ★ Chácara dos Poderes · ★ Novos Estados · ★ Autonomista ·
Noroeste · Margarida · Estrela Dalva · ★ Altos da Afonso Pena *(não oficial)*

### Centro — 13
★ Jardim dos Estados · ★ Itanhangá · ★ Monte Líbano · ★ Centro · São Francisco · Amambaí ·
Cruzeiro · Bela Vista · Planalto · Cabreúva · São Bento · Glória · Carvalho

### Bandeira — 11
★ Vilas Boas · ★ Rita Vieira · Tiradentes · Universitário · TV Morena · Jardim Paulista ·
Moreninha · São Lourenço · Maria Aparecida Pedrossian · Carlota · Dr. Albuquerque

### Segredo — 14
Seminário · Monte Castelo · Coronel Antonino · Nova Lima · Nasser · Mata do Segredo ·
José Abrão · Presidente · Santa Luzia · Marli · Bom Retiro · Parque dos Laranjais ·
Dona Dedé · Cerejeira

### Anhanduizinho — 13
Aero Rancho · Jockey Club · Centenário · Guanandi · Centro-Oeste · Parati · Alves Pereira ·
América · Jacy · Lageado · Pioneiros · Piratininga · Taquarussu

### Lagoa — 11
Bandeirantes · Tijuca · São Conrado · Leblon · Caiçara · Taveirópolis · União ·
Coophavila II · Tarumã · Caiobá · Batistão

### Imbirussu — 7
Santo Amaro · Santo Antônio · Nova Campo Grande · Popular · Panamá · Sobrinho ·
Núcleo Industrial

---

## 8. Regra para quem mexer nesta base

Bairro novo só entra com fonte. Se a fonte for a fala de alguém ou um site de classificados,
entra com `oficialPlanurb: false` e a página exibe a nota — como foi feito com os Altos da
Afonso Pena. Inventar bairro, ou promover parcelamento a bairro sem verificar, cria uma URL que
o Google indexa e que ninguém consegue defender depois.

`pontosReferencia` segue a mesma regra e é ainda mais sensível: array vazio é resposta correta.
Ver `.claude/rules/conteudo.md`.
