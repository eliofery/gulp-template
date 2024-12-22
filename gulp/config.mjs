import packageJson from '../package.json' assert { type: 'json' }

const srcPath = 'src' // исходники
const buildPath = 'build' // сборка

const config = {
  version: packageJson.version, // версия проекта

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

    // Скрипты javascript, typescript
    script: {
      root: `${srcPath}/scripts`, // корневой каталог
      components: `${srcPath}/scripts/components`, // компоненты
    },
  },

  // Пути к каталогам для продакшен проекта
  build: {
    root: buildPath,

    script: `${buildPath}/js`,
  },

  // Определение окружения сборки проекта
  setEnv() {
    this.isProd = process.argv.includes('--production') // режим производства
    this.isDev = !this.isProd // режим разработки
  },
}

export default config
