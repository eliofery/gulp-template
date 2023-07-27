// Сторонние библиотеки
import { series, parallel } from 'gulp'

// Таски
import clear from './gulp/tasks/clear'
import server from './gulp/tasks/server'
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack'

// Конфиги
import config from './gulp/config'

// Определяем окружения сборки dev или prod
config.setEnv()

// Запуск виртуального сервера
export const proxy = server

// Сборка проекта
export const build = series(clear, webpackBuild)

// Слежение за изменением файлов
export const watch = series(
  build,
  server,

  parallel(webpackWatch),
)

export default watch
