# Gulp сборка 2025

Gulp сборка для продуктивной верстки.

![Gulp сборка](https://raw.githubusercontent.com/eliofery/gulp-template/main/src/assets/images/build-logo.svg)

## Введение

Цель данной сборки, обеспечить комфортную работу с минимальной начальной настройкой проекта.

[Страница документации](https://eliofery.github.io/gulp-template-docs/)

## Обновление 

Это обновленная версия сборки, предыдущую доступна в ветке [v.0.1.13](https://github.com/eliofery/gulp-template/tree/v.0.1.13). 

1. Данная версия Gulp сборки полностью переписана на использование ECMAScript-модулей, поддержка которых была добавлена в Gulp 5 версии.
2. Добавлена поддержка Typescript.
3. Добавлен modernizr.
4. Обновлены зависимости.
5. Произведена общая оптимизация сборки.
6. Добавлен современный подход работы со стилями sass.
7. Исправлены баги.
8. Добавлена поддержка пакетного менеджера yarn.
9. И другие мелкие правки.

Данное обновление не состоялось бы, если мне не попалось видео на просторах Ютуб от коллеги по цеху [Александра Ламкова](https://www.youtube.com/watch?v=hkYzqTKnSIg).

Кстати данный мастер класс полностью сверстан с использованием этой Gulp сборки и доступен в ветке [futuretech](https://github.com/eliofery/gulp-template/tree/futuretech), а его собранную версию можно посмотреть по ссылке [Feature Tech](https://eliofery.github.io/gulp-template/futuretech).

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
  - Поддержка Typescript


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
- Modernizr

## Инструкция по установке

### Шаг 1

Скачать или клонировать **Gulp сборку**.

```bash
git clone git@github.com:eliofery/gulp-template.git
```

### Шаг 2

Установить зависимости.

```bash
sudo apt update && sudo apt install imagemagick graphicsmagick

npm install
# или если используете yarn
yarn install --ignore-engines
```

### Шаг 3

Загрузить свою svg favicon в каталог **./src/assets/favicons** с именем **icon.svg**.

Favicon должен быть размером не менее **512x512**, например.

```html
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">...</svg>
```

При сборке проекта на основе **icon.svg** будут созданы другие необходимые favicons.

### Шаг 4

Теперь вы готовы приступить к верстке своего проекта.

Запуск проекта в режиме разработки.

```bash
npm run dev
```

Сборка проекта.

```bash
npm run build
```

Только запуск виртуального сервера для просмотра проекта в браузере.

```bash
npm run proxy
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
