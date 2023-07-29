// Сторонние библиотеки
import { series, parallel } from 'gulp'

// Таски
import clear from './gulp/tasks/clear'
import server from './gulp/tasks/server'
import { webpackBuild, webpackWatch } from './gulp/tasks/webpack'
import { stylesBuild, stylesWatch } from './gulp/tasks/styles'
import { spritesBuild, spritesWatch } from './gulp/tasks/sprites'
import { imagesBuild, imagesWatch } from './gulp/tasks/images'
import { assetsBuild, assetsWatch } from './gulp/tasks/assets'
import { pugBuild, pugWatch } from './gulp/tasks/pug'
import { faviconBuild, faviconWatch } from './gulp/tasks/favicons'
import { replaceText, prepareBuild } from './gulp/tasks/prepare'

// Конфиги
import config from './gulp/config'

// Определяем окружения сборки dev или prod
config.setEnv()

// Запуск виртуального сервера
export const proxy = server

// Сборка проекта
export const build = series(
  clear,
  spritesBuild,
  pugBuild,
  stylesBuild,
  webpackBuild,
  faviconBuild,
  imagesBuild,
  assetsBuild,
)

// Слежение за изменением файлов
export const watch = series(
  build,
  server,

  parallel(
    spritesWatch,
    pugWatch,
    stylesWatch,
    webpackWatch,
    faviconWatch,
    imagesWatch,
    assetsWatch,
  ),
)

// Подготовка сборки к работе над проектом
export const replaces = replaceText
export const prepare = prepareBuild

export default watch
