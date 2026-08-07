# Cinnabar

Um design system de tinta preta, papel branco e uma cor só.

Cinábrio é a pedra de onde sai o vermelhão. Cara e venenosa, e os pintores
usaram por dois mil anos assim mesmo, porque nada mais era tão vermelho. Fiz o
sistema em cima disso: preto, branco e uma cor só. Ela não divide espaço com
ninguém.

Na prática isso virou três decisões que valem mais que qualquer lista de
componente:

**O neutro é absoluto.** O fundo da página é cinza sem tempero, o cartão é
branco puro e o rail é preto puro. Nada de creme, nada de cinza-azulado. Cinza
temperado rouba atenção do vermelhão, e o vermelhão é o ponto.

**A ação primária é preta, não colorida.** O laranja é pigmento de marca:
sobre papel ele dá 3.03:1, então preenche e assina, mas nunca escreve. Botão
laranja com texto branco reprovaria em contraste, e quase todo mundo faz isso
mesmo assim.

**Todo contraste é medido, nenhum é estimado.** São 88 pares conferidos entre
os dois temas por script, e o build reprova se algum cair abaixo do mínimo.
Isso incluiu quatro cores que passavam sozinhas e reprovavam dentro do próprio
chip, coisa que a olho nu ninguém pega.

## Como rodar

```bash
npm install
npm run storybook      # o catálogo, em localhost:6007
npm run dev            # a vitrine, em localhost:3000
npm run contraste      # mede os 88 pares e reprova se algum cair
npm run kit-diff       # o que ainda é shadcn puro e o que já foi vestido
npm run typecheck      # tsc --noEmit
npm run build-site     # a vitrine em out/ e o catálogo em out/catalogo/
npm run a11y           # o axe em toda story nos dois temas, mais a vitrine
```

O `a11y` precisa do `build-site` antes. Pra conferir o build na mão, sirva com
um servidor de arquivo literal:

```bash
npm run build-site && (cd out && python3 -m http.server 8899)
```

Servidor com clean-URL redireciona `iframe.html` e faz o catálogo parecer
quebrado quando não está.

## Os tokens

Tudo mora em `styles/tokens.css`. Não existe `tailwind.config.js`. Cada token é
nomeado pelo **papel** que cumpre, nunca pela cor que tem: ninguém precisa
saber que `--mesa` é cinza, precisa saber que é onde o papel se apoia.

| grupo | tokens |
|---|---|
| Superfícies | `--mesa` `--papel` `--papel-fundo` `--tinta` `--sobre-tinta` |
| Texto | `--texto` `--texto-suave` `--texto-tenue` |
| Linhas | `--linha` `--linha-campo` |
| Ação | `--acao` `--sobre-acao` `--foco` `--foco-tinta` |
| Marca | `--pigmento` `--sobre-pigmento` `--brasa` `--mare` |
| Dados | `--alta` `--sobre-alta` `--queda` `--sobre-queda` `--aviso` `--sobre-aviso` `--ametista` `--lagoa` |
| A pintura | `--capa-quente` `--capa-viva` `--capa-fria` `--sobre-capa` `--capa-veu` `--capa-vidro` |
| Forma | `--raio` e a família derivada por `calc()`, mais `--sombra-papel` `--sombra-flutuante` `--sombra-tile` |

Quatro regras de arquitetura que valem mais que a lista:

1. **Todo fundo forte tem par `--sobre-X`.** E quando o fundo não muda entre os
   temas (`--pigmento`, `--aviso`, os quatro da pintura), o `--sobre-X` também
   **não** se redeclara no `.dark`: redeclarar só um dos dois quebra o par já
   medido. Cada caso tem comentário no arquivo dizendo isso.
2. **A borda de campo é token separado da decorativa.** `--linha-campo` é
   calibrada pra passar 3:1 (WCAG 1.4.11) porque é a única coisa que diz onde o
   campo começa. `--linha` só desenha, então pode ser fraca.
3. **`secondary`, `muted` e `accent` da ponte nunca apontam pro fundo puro.**
   Saem de `color-mix()` com um degrau do texto, senão botão secundário some
   na página.
4. **A pintura da capa é um quadro, não superfície de interface.** Os tokens
   dela são idênticos nos dois temas, e o véu por baixo do conteúdo é o piso de
   contraste: sem ele, texto branco sobre o ponto mais claro daria 2.7:1.

A lista de tokens vive em `lib/paleta.ts`, e três coisas leem do mesmo arquivo:
o script que reprova o build, a story de Fundação/Paleta e a vitrine. Duas
listas escritas à mão divergem em uma semana.

## O que é medido, e por quem

- `scripts/auditar-contraste.mjs` (`npm run contraste`) mede os 88 pares entre
  os dois temas, incluindo os compostos (um chip a 12% só vale se você compôs a
  tinta sobre o fundo antes de medir) e as cadeias da pintura, que tem duas
  camadas antes do texto. Sai com erro se algum par cair abaixo do mínimo.
- `scripts/a11y.mjs` (`npm run a11y`) passa o axe em todas as stories nos dois
  temas mais a vitrine, e mede o pixel mais claro da capa renderizada. Esse
  último teste existe porque o modelo de cor não enxergava as pinceladas
  claras: elas furaram o piso e ninguém teria visto.

A vitrine roda o conjunto completo de regras, porque é página de verdade. As
stories rodam o completo menos `landmark-one-main`, `region` e
`page-has-heading-one`, que cobram estrutura de documento inteiro e não fazem
sentido numa peça isolada dentro de um iframe.

## O kit: puro versus customizado

`npm run kit-diff` refaz esta tabela contra o registry a qualquer momento.

**Puro (17).** Idêntico ao registry, pode rodar `shadcn add <x> --overwrite`:

`alert` `avatar` `badge` `breadcrumb` `button-group` `kbd` `label` `pagination`
`progress` `scroll-area` `separator` `skeleton` `switch` `table` `toggle`
`toggle-group` `tooltip`

**Customizado (19).** Nunca sobrescrever, apaga a marca:

| componente | o que mudou |
|---|---|
| `button` | ação preta que clareia no hover em vez de sumir, outline sobre papel, link em brasa, largura de pílula |
| `card` | sombra no lugar do anel, respiro maior, título pesado |
| `input` | altura e raio de campo, fundo em papel, borda na linha de campo |
| `combobox` | rótulo acessível no gatilho e no limpar (o stock reprova em `button-name`) |
| `command` | separador fora da árvore de acessibilidade (`role=separator` não é filho válido de `listbox`) |
| `alert-dialog` `calendar` `checkbox` `dialog` `dropdown-menu` `field` `input-group` `input-otp` `popover` `radio-group` `select` `sheet` `tabs` `textarea` | varredura de tokens: `bg-input` deixa de ser usado como fundo, superfície flutuante troca anel por sombra, `bg-background` vira papel dentro de cartão |

Na dúvida, rode o diff antes de mexer.

## A camada da marca

Em `components/*.tsx`, e nada de dado, fetch ou regra de negócio aqui dentro:
tudo entra por prop.

`Marca` `BotaoAcao` `ContainerPagina` `CabecalhoPagina` `Secao` `TileMetrica`
`EstadoVazio` `ProvedorTema` `ToggleTema` `Toaster`, mais os blocos-assinatura:
`CapaPintada` (a pintura, feita só em CSS, sem imagem), `FaixaMetricas` (a
régua de KPIs em vidro), `ChipVariacao`, `LinhaConta`, `AnelComposicao` e
`TileAviso`.

## Armadilhas que já custaram tempo

Estão em `tasks/lessons.md`, com o porquê de cada uma. As três que mais doem:

- O `tailwind-merge` não conhece escala tipográfica nomeada. Sem registrar os
  degraus em `font-size` no `lib/utils.ts`, `cn("text-sobre-acao", "text-corpo")`
  vira botão preto com texto preto, sem erro nenhum.
- Nunca rodar `shadcn init`: ele reescreve o `tokens.css` com tokens genéricos.
- `text-wrap: balance` não entra em lugar nenhum. Ele iguala o comprimento das
  linhas encurtando todas, e abre vão à direita. Viúva se resolve com `pretty`.
