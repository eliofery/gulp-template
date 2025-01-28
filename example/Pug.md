# Шпаргалка по Pug

Для верстки используется шаблонизатор **Pug**, исходные файлы располагаются в каталоге **src/markup**.

## Переменные, условия, интерполяция

```pug
- var isActive = true
- const isActive = true
- let isActive = true

li(class=isActive ? "active" : "")

#{isActive}
p Следует #[a(href="https://browsehappy.com/") обновить браузер]

:special-chars
  <svg class="icon icon-copy">
    <use xlink:href="#icon-copy"></use>
  </svg>
```

## Атрибуты

```pug
a#id.class(href="//site") Заголовок ссылки

img(src="", width="", height="", alt="")

input(data-json=`
  {
    "very-long": "piece of ",
    "data": true
  }
`)

p Инлайн текст

p.
  Многострочный текст
  Вторая строка

p
  | Еще один вариант
  | многострочного содержимого
```

## Миксины

```pug
mixin code(language="html")
  if block
    block

+code("js").
  Содержимое
```

```pug
mixin icon(name)
  svg(class="icon " + name)&attributes(attributes)
    use(xlink:href="#" + name)

+icon("icon-copy")(width="20", height="20", aria-hidden="true")
```

## Json Data

./data/mainNav.json

```json
{
  "items": [
    {
      "title": "Ссылка 1",
      "icon": "icon-some",
      "link": "/link-1",
      "links": [
        {
          "name": "Ссылка 1.1",
          "link": "/link-1-1"
        },
        {
          "name": "Ссылка 1.2",
          "link": "/link-1-2"
        }
      ]
    },
    {
      "title": "Ссылка 2",
      "icon": "/link-2",
      "links": [
        {
          "name": "Ссылка 2.1",
          "link": "/link-2-1"
        },
        {
          "name": "Ссылка 2.2",
          "link": "/link-2-2"
        }
      ]
    }
  ]
}
```

Вывод данных с json файла

```pug
ul
  each item, index in jsonData.mainNav.items
    li #{ index } | #{ item.title } | #{ item.link }

    if item.links
      each link, i in item.links
        li #{ index }.#{ i } | #{ item.title } | #{ item.link }

each button, index in jsonData.exploreTabs
  button.btn(
    id=("tab-" + (index + 1))
    class=(!index && 'is_active')
    type="button",
    data-js-tabs-button,
    role="tab",
    aria-controls=("tabpanel-" + (index + 1))
    aria-selected="false",
  ) #{button.name}
```

## Markdown разметка

````pug
:markdown-it
  This is in **markdown**

:markdown-it(inline) **BOLD TEXT**

include:markdown-it ../markdown/docs.md

:markdown-it
или
:markdown-it(linkify langPrefix="highlight-")
  \```js
    var codeBlocks;
  \```
````

## Hightlight

```pug
pre
  code.hljs
    :highlight(lang="javascript")
      function foo() {
        alert('This is JavaScript');
      }
```

## Layout

```pug
block header
  include ../parts/header.pug

block content

block footer
  include ../parts/footer.pug

block scripts
  script(src="/js/main.js?v=" + siteVersion)
```

## Страница

```pug
extends ../layouts/default.pug

block variables
  - var pageTitle = "Главная страница";

block content
  h2 Content

append content
  h2 Content

prepend content
  h2 Content
```

## Атрибуты

```pug
  +mixinName(class="some")
    - var className = attributes.class // some
    - delete attributes.class
```
