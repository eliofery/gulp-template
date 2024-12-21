import packageJson from '../package.json' assert { type: 'json' }

const srcPath = 'src'
const buildPath = 'build'

const config = {
  version: packageJson.version,

  // Настройки для виртуального сервера
  server: {
    proxy: 'http://localhost', // url виртуального хоста
    port: 3000, // порт виртуального хоста
  },

  // Пути к каталогам для разработки проекта
  src: {
    root: srcPath,

    // Шаблонизатор pug
    pug: {
      root: `${srcPath}/pug`, // корневой каталог pug
      data: `${srcPath}/pug/data`, // конфиги и json данные
      pages: `${srcPath}/pug/pages`, // pug страницы для компиляции в html
    },

    // Скрипты javascript, typescript
    script: {
      root: `${srcPath}/scripts`,
      components: `${srcPath}/scripts/components`,
    },
  },

  // Пути к каталогам для продакшен проекта
  build: {
    root: buildPath,

    script: `${buildPath}/js`,
  },

  // Определение окружения сборки проекта
  setEnv() {
    this.isProd = process.argv.includes('--production')
    this.isDev = !this.isProd
  },
}

export default config
