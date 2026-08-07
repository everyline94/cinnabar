# Correções que se repetiram

Uma linha por regra preventiva. Entra aqui o que já custou tempo duas vezes.

## Texto

- **`text-wrap: balance` não entra em lugar nenhum.** Ele iguala o comprimento
  das linhas encurtando todas: o texto para antes do fim da coluna e abre um
  vão à direita. Medido no ds-hub em 29/07/2026, numa coluna de 940px, h2 de
  duas linhas deixou 358px de vão com balance contra 28px com pretty. Viúva se
  resolve com `pretty`, e só com `pretty`. Vale também: nada de `max-width` em
  `ch`, nada de `<br>` na mão. Ver `styles/tokens.css`, camada 6.
- Sem travessão e sem meia-risca em nenhum arquivo, comentário ou commit. Sem
  emoji. Isso **não** significa sem acento: string de interface, `aria-label`,
  título de story, comentário e markdown vão acentuados. Só identificador de
  código fica ASCII.
- Nome de export de story vai sem acento, porque o Storybook remove acento ao
  gerar o rótulo. O acento entra pelo campo `name`.

## Tokens

- Cravar o valor antes de nomear. O cinza da mesa é `#f7f7f7` exato, não
  `#f5f5f5` nem branco. A diferença decide se o cartão flutua ou some.
- Medir o contraste dos **compostos**, não só das cores puras. `#c4413f` passava
  5.03:1 sobre papel e reprovava em 4.24:1 dentro do próprio chip a 12%. Quatro
  dos seis erros que o `npm run contraste` pegou eram assim.
- Fundo forte sem par `--sobre-X` é dívida. E quando o fundo não muda entre os
  temas (`--pigmento`, `--aviso`, a pintura da capa), o `--sobre-X` **não** se
  redeclara no `.dark`: redeclarar só um dos dois quebra o par já medido.
- A pintura da capa não é superfície de interface, é um quadro: os tokens dela
  são idênticos nos dois temas. Modelar o véu da capa com `--tinta` deu um
  número falso, porque no escuro `--tinta` é clara e o véu clarearia a pintura
  em vez de escurecê-la.
- Cor de gráfico também precisa passar 3:1 (1.4.11). O teal medido `#43b0b7`
  dava 2.58:1 sobre papel branco: foi escurecido pro mínimo que passa.

## Tailwind e shadcn

- Registrar a escala tipográfica nomeada no `extendTailwindMerge`. Sem isso o
  merge lê `text-corpo` como COR e descarta a cor de verdade sem erro nenhum:
  `cn("text-sobre-acao", "text-corpo")` vira botão preto com texto preto.
- Ao vestir um componente com cor da marca, duplicar cada estado com `dark:`
  explícito. Sem isso o estilo stock ganha a cascata no escuro.
- Nunca rodar `shadcn init`: reescreve o `tokens.css` com tokens genéricos.
  Escrever `components.json` e `tokens.css` à mão **antes** do primeiro
  `shadcn add`.
- `bg-background` no shadcn é a **mesa**, não o papel. Usar em componente que
  cai dentro de cartão faz o componente sumir.
- `--color-input` do shadcn é a **borda** do campo, não o fundo. Variantes
  stock como `dark:bg-input/30` pintam a caixa de cinza médio.

## Storybook

- Adicionar componente com o Storybook de pé faz o Vite reotimizar dependência
  e misturar duas cópias do React ("Invalid hook call"). Parar o Storybook
  antes de `shadcn add`, e apagar `node_modules/.cache/storybook` antes da
  varredura final.
- Não montar `ThemeProvider` dentro de story: no catálogo quem manda no tema é
  o seletor da toolbar. O `next-themes` injeta um script que o React 19 acusa
  no console.
- `storySort` compara com o título **acentuado**. `"Fundacao"` nunca casa com
  `"Fundação"` e a ordenação quebra em silêncio.
- O manager só aplica o tema depois de **reiniciar** o Storybook. Recarregar a
  página não basta.

## Acessibilidade

- `id` de controle em ASCII: `htmlFor` não casa com espaço nem acento e o par
  `Label`/`Checkbox` quebra em silêncio. O rótulo visível continua acentuado.
- Dentro de `<dl>` só valem `dt`, `dd` e `div` como filhos. Ícone solto num
  wrapper quebra a lista de definição.
- Esperar uns 600ms de assentamento antes de rodar o axe, senão ele reporta
  contraste que não existe (a fonte ainda não trocou, o tema ainda não caiu).

## Build

- Servir o build com servidor de arquivo literal (`python3 -m http.server`).
  O `serve` faz clean-URL e redireciona `iframe.html`, o que parece bug do
  build e não é.
- `vercel link` roda de novo a cada publicação, porque o build limpa a pasta
  `out/` e leva o vínculo junto.
