import packageJson from '../package.json' assert { type: 'json' }

const srcPath = 'src' // исходники
const buildPath = 'build' // сборка

const config = {
  version: packageJson.version, // версия проекта

  // Настройки для modernizr
  // https://github.com/Modernizr/Modernizr/tree/master/feature-detects
  modernize: {
    file: 'modernizr.js',
    options: {
      'feature-detects': ['img/webp', 'img/avif'],
    },
  },

  // Настройки для виртуального сервера
  server: {
    proxy: 'http://localhost', // url виртуального хоста
    port: 3000, // порт виртуального хоста
  },

  // Пути к каталогам для разработки проекта
  src: {
    root: srcPath,

    // Шаблонизатор pug
    markup: {
      root: `${srcPath}/markup`, // корневой каталог
      data: `${srcPath}/markup/data`, // конфиги и json данные
      pages: `${srcPath}/markup/pages`, // страницы
    },

    // Препроцессор sass
    style: `${srcPath}/styles`, // scss стили

    // Скрипты javascript, typescript
    script: {
      root: `${srcPath}/scripts`, // корневой каталог
    },

    // Различные ресурсы
    assets: {
      root: `${srcPath}/assets`, // корневой каталог
      images: `${srcPath}/assets/images`, // изображения
      favicons: `${srcPath}/assets/favicons`, // фавиконка
      icons: {
        root: `${srcPath}/assets/icons`, // корневой каталог svg иконок
        mono: `${srcPath}/assets/icons/mono`, // черно-белые иконки
        multi: `${srcPath}/assets/icons/multi`, // цветные иконки
      },
      fonts: `${srcPath}/assets/fonts`, // шрифты
      videos: `${srcPath}/assets/videos`, // шрифты
    },
  },

  // Пути к каталогам для продакшен проекта
  build: {
    root: buildPath, // корневой каталог
    style: `${buildPath}/css`, // стили
    script: `${buildPath}/js`, // скрипты
    images: `${buildPath}/img`, // изображения
    fonts: `${buildPath}/fonts`, // шрифты
    videos: `${buildPath}/videos`, // видео
  },

  // Перечисленные стили не будут добавлены в итоговый main.css.
  // Нужно чтобы не дублировать стили, используемые в критических стилях.
  // Лучшим вариантом будет размещать стили либо в main.scss либо в _critical.scss,
  // если все таки подключаемые стили повторяются в этих файлах, то используем эту переменную.
  ignoreScssPaths: [
    // 'blocks/_header.scss',
  ],

  // Определение окружения сборки проекта
  setEnv() {
    this.isProd = process.argv.includes('--production') // режим производства
    this.isDev = !this.isProd // режим разработки
  },
}

export default config
