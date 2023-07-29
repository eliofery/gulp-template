# Gulp сборка

Gulp сборка для продуктивной верстки.

![Gulp сборка](https://raw.githubusercontent.com/eliofery/gulp-template/main/src/assets/images/build-logo.svg)

## Введение

Цель данной сборки, обеспечить комфортную работу с минимальной начальной настройкой проекта.

### Основа сборки

Сборка содержит шаблонизатор **Pug**, препроцессор **SCSS**, сборщик модулей **Webpack**.

### Особенности сборки

- Оптимизация под Page Speed
  - Отложенная загрузка
  - Критические стили


- Базовая SEO оптимизация
  - Open Graph / Twitter Cards
  - JSON-LD микроразметка
  - Google Analytics / Yandex Metrika


- Pug шаблонизатор
  - Улучшенный фильтр markdown-it
  - Возможность добавлять свои фильтры на примере фильтра special-chars
  - Работа с json данными


- SCSS препроцессор


- Webpack сборщик
  - Возможность использовать новый формат JS по максимуму
  - Оптимизация кода через Babel


- SVG спрайты
  - Цветные
  - Черно-белые


- Оптимизированные изображения
  - Генерация webp и avif форматов


- Настроенные линтеры
  - Stylelint
  - Pug-lint
  - ES-Lint
  - Prettier
  - Editorconfig


- Автоматическая генерация favicons

## Инструкция по установке

### Шаг 1

Скачать или клонировать **Gulp сборку**.

```bash
git clone git@github.com:eliofery/gulp-template.git
```

### Шаг 2

Установить зависимости.

```bash
npm i
```

### Шаг 3

**Опционально**: если хотите поддерживать единообразие в стиле написания кода установите **linter**.

```bash
git init
npm run lint
```

Так же необходимо будет установить расширения для вашего текстового редактора или IDE.

**Например для VSCode это будут**: puglint, stylelint, ESLint, editorconfig, prettier.

### Шаг 4

Загрузите свою svg favicon в каталог **./src/assets/favicons** с именем **icon.svg**.

Favicon должен быть размером не менее **512x512**, например.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">...</svg>
```

При сборке проекта на основе **icon.svg** будут созданы другие необходимые favicons.

### Шаг 5

Внести изменения в файл **./gulp/config.js**, в разделе **replacement**, согласно наименованию вашего проекта. Изменять следует только свойство **new**, например:

```js
const config = { 
  //...
  replacement: {
    env: { old: 'dev', new: 'prod' },
    url: { old: 'http://localhost', new: 'https://site.domen' },
    title: { old: 'Название сайта', new: 'Новое имя сайта' },
    desc: { old: 'Описание сайта', new: 'Новое описание сайта' },
    version: { old: '1.0.0', new: '2.0.0' },
    color: { old: '#000', new: '#777' },
    google: { old: 'GTM-XXXXXX', new: 'GTX-325264' },
    yandex: { old: 'XXXXXX', new: 'jsdhgy7562' },
  }
  //...
}
```

**Gulp** будет искать значения прописанные в параметрах **old** и менять их на значения параметров **new**, в файлах:

```js
const config = { 
  //...
  files: [
    `${srcPath}}/assets/manifest.json`,
    `${srcPath}}/pug/data/config.pug`,
    `${srcPath}/pug/pages/index.pug`,
  ],
  //...
}
```

После чего выполните команду, которая заменит текст:

```bash
npm run replaces
```

Или, чтобы заменить текст и автоматически удалить промо страницу с инструкцией, выполните команду.

```bash
npm run prepare
```

### Шаг 6

Теперь вы готовы приступить к верстке своего проекта.

Скомпилирует проект и запустит Live Server в режиме разработки. Файлы не будут минифицированы, а картинки оптимизированы.

```bash
npm run dev
```

Скомпилирует проект в режиме продакшн. Файлы будут минифицированы, а картинки оптимизированы.

```bash
npm run build
```

Запустит Live Server без компиляции проекта. Если не хочется заново компилировать проект, а только запустить сервер.

```bash
npm run proxy
```

<hr>

Если при сборке возникнет ошибка: **DSO support routines:DLFCN_LOAD:could not load the shared library:dso_dlfcn.c:185:filename(libproviders.so)**.

Обнулите значение переменной **OPENSSL_CONF**:

```bash
export OPENSSL_CONF=/dev/null
```

## Примеры верстки с Pug

### Json данные в Pug

Хранятся в каталоге **./src/pug/data**. Например файл **mainNav.json**.

Чтобы получить доступ к его значениям, нужно обратиться к глобальной переменной **jsonData**, которая отвечает за вывод данных из **json** файлов, хранящихся в каталоге **data**.

```
jsonData.имя_файла
```

Получение содержимого из файла **mainNav.json** будет выглядеть следующим образом:

```
jsonData.mainNav
```

### Вывода навигации

Рассмотрим пример вывода навигации на основе **json** данных из файла **mainNav.json**.

Ознакомиться с содержимым файла **mainNav.json** можно по пути **./src/pug/data/mainNav.json**.

```pug
ul
  each item, index in jsonData.mainNav.items
    li #{ index }
    li #{ item.title }

    if item.links
      ul
      each link in item.links
        li #{ link.title }
        li #{ link.link }
```

### Вывод code

Рассмотрим пример вывода разметки в теге code.

**Внимание**: символ **\\** здесь исключительно для экранирования, не используйте его в коде.

```pug
pre
  code
    :special-chars
      <div>
        Тут разметка которая экранируется
      </div>

// Короткая версия конструкции выше
:markdown-it
  \```html 
  <div>
    Тут разметка которая экранируется
  </div>
  \```
```

### Markdown разметка

Рассмотрим пример вывода Markdown разметки.

**Внимание**: символ **\\** здесь исключительно для экранирования, не используйте его в коде.

```pug
:markdown-it(inline) **текст**
  
:markdown-it
  Многострочный **текст**

include:markdown-it ../markdown/docs.md

:markdown-it
  \```js
  var codeBlocks;
  \```
```













