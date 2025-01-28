/**
 * Перенос файлов в продакшн
 *
 * Копирует файлы из src в build
 */

// Сторонние библиотеки
import { src, dest, watch, series } from 'gulp' // gulp плагин
import merge from 'merge-stream' // слияние gulp потоков

// Конфиги
import config from '../config.mjs'

// Переносит в корень build
const rootBuild = () =>
  src([`${config.src.assets.root}/robots.txt`, `${config.src.assets.root}/manifest.json`]).pipe(
    dest(`${config.build.root}`),
  )

// Переносит в build/fonts
const fontsBuild = () => src([`${config.src.assets.fonts}/**/*`]).pipe(dest(`${config.build.fonts}`))

// Переносит в build/videos
const videosBuild = () =>
  src([`${config.src.assets.videos}/**/*`], {
    encoding: false,
  }).pipe(dest(`${config.build.videos}`))

// Выполнение всех тасков
export const assetsBuild = series(rootBuild, fontsBuild)

// Слежение за изменением файлов
export const assetsWatch = () => {
  watch(`${config.src.assets.fonts}/**/*`, fontsBuild)
  watch(`${config.src.assets.videos}/**/*`, videosBuild())
  watch(`${config.src.assets.root}/*`, rootBuild)
}
