/**
 * Конфигурационный файл
 *
 * Содержит пути к каталогам и параметры для тасков
 */

const srcPath = 'src' // ресурсы для разработки проекта
const buildPath = 'build' // готовый продакшен проект

const config = {
  // Файлы в которых производится замена текста
  files: [
    `${srcPath}/assets/manifest.json`,
    `${srcPath}/pug/data/config.pug`,
    `${srcPath}/pug/pages/index.pug`,
  ],

  // Замена текста в файлах указанных выше, укажите в параметре new свое значение
  replacement: {
    // ссылка на сайт, используется для seo
    url: {
      old: 'http://localhost:3000',
      new: 'http://localhost:3000',
    },
    // ссылка используется в теге <base>
    baseUrl: {
      old: '/gulp-template/',
      new: '/',
    },
    title: {
      old: 'Название проекта',
      new: 'Название проекта',
    },
    desc: {
      old: 'Описание проекта',
      new: 'Описание проекта',
    },
    // версия проекта, используется для сброса кеша стилей и скриптов
    version: {
      old: '0.1.10',
      new: '0.1.10',
    },
    // акцентный цвет проекта
    color: {
      old: '#000',
      new: '#000',
    },
    // google analytics
    google: {
      old: 'GTM-XXXXXX',
      new: 'GTM-XXXXXX',
    },
    // yandex metrika
    yandex: {
      old: 'XXXXXX',
      new: 'XXXXXX',
    },
  },

  // Эти стили не будут добавлены в main.scss
  ignoreScssPaths: [
    // 'scaffolds/components/_navigation.scss',
  ],

  proxy: 'http://localhost', // url виртуального хоста
  port: 3000, // порт виртуального хоста

  // Пути к каталогам для разработки проекта
  src: {
    root: srcPath, // корневой каталог

    // Шаблонизатор pug
    pug: {
      root: `${srcPath}/pug`, // корневой каталог pug
      data: `${srcPath}/pug/data`, // конфиги и json данные
      pages: `${srcPath}/pug/pages`, // pug страницы для компиляции в html
    },

    // Препроцессор Scss
    scss: `${srcPath}/scss`, // scss стили

    // Скрипты
    js: {
      root: `${srcPath}/js`, // корневой каталог js
      components: `${srcPath}/js/components`, // компоненты js
    },

    libs: `${srcPath}/libs`, // сторонние библиотеки

    // Различные ресурсы
    assets: {
      root: `${srcPath}/assets`, // корневой каталог js
      images: `${srcPath}/assets/images`, // изображения
      favicons: `${srcPath}/assets/favicons`, // фавиконки
      icons: {
        root: `${srcPath}/assets/icons`, // корневой каталог svg иконок
        mono: `${srcPath}/assets/icons/mono`, // черно-белые иконки
        multi: `${srcPath}/assets/icons/multi`, // цветные иконки
      },
      fonts: `${srcPath}/assets/fonts`, // шрифты
    },
  },

  // Пути к каталогам для продакшен проекта
  build: {
    root: buildPath, // корневой каталог js
    css: `${buildPath}/css`, // стили
    js: `${buildPath}/js`, // скрипты
    images: `${buildPath}/img`, // изображения
    fonts: `${buildPath}/fonts`, // шрифты
  },

  // Определение окружения сборки проекта
  setEnv() {
    this.isProd = process.argv.includes('--prod') // true если сборка проекта выполнена с ключом --prod
    this.isDev = !this.isProd // false если сборка проекта выполнена без ключа --prod
  },
}

export default config
