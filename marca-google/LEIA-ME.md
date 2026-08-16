# Imagens para o Perfil da Empresa no Google

Gerado em 16/08/2026. Texto da descrição e resto do cadastro: `docs/perfil-google.md`.

## O que subir onde

| Arquivo | Onde | Por quê este tamanho |
|---|---|---|
| `logo-nobrecor-1080x1080.png` | **Logotipo** | O Google pede quadrado, aceita de 250 a 5200 px e recomenda 720. 1080 dá folga sem estourar |
| `logo-nobrecor-1080x1080.jpg` | alternativa | Só se a interface recusar PNG |
| `logo-nobrecor-720x720.png` · `512` · `250` | reserva | Outros diretórios locais costumam pedir estes |
| `capa-1920x1080.jpg` | **Foto de capa** | 16:9, o formato da capa. A sala em azul-nobre é a que mais mostra a paleta da marca |
| `foto-fachada-1920x1080.jpg` | Fotos → Exterior | |
| `foto-detalhe-1920x1080.jpg` | Fotos → Em ação | |

O logotipo é o **diamante sobre o azul da marca**, sem o texto. Foi decisão, não descuido: o
Google exibe o logotipo pequeno e, em várias telas, recortado em círculo. Marca com nome escrito
vira borrão nesse tamanho; o símbolo sozinho continua legível.

## As três fotos são geradas

Elas ambientam a marca — **não são obra da Nobre Cor**. Enquanto forem essas, não escreva
legenda dizendo "obra realizada", "serviço executado" ou nome de cliente. Assim que houver foto
de obra de verdade, ela substitui estas: no Perfil da Empresa a foto tosca tirada no celular no
fim do serviço rende mais que imagem produzida, porque o Google privilegia foto recente e
frequente.

## ⚠️ Pendência nos arquivos de marca do site

`public/images/marca/nobrecor-principal.svg` e `nobrecor-horizontal.svg` ainda declaram
`font-family="Marcellus"` — a tipografia **antiga**, trocada por Bebas Neue em 16/08/2026
(ver `.claude/rules/marca.md`).

Consequência prática: quem abrir ou rasterizar esses SVGs recebe o nome "Nobre Cor" numa fonte
de fallback qualquer, não na tipografia da marca. Isso não afeta o site, que desenha a logo em
componente React com a fonte certa, nem os arquivos desta pasta, que não têm texto nenhum.

Antes de usar qualquer lockup **com o nome escrito** em papelaria, fachada ou anúncio, os dois
SVGs precisam ser refeitos com a Bebas Neue convertida em curvas.
