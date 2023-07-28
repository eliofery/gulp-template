/**
 * Оптимизация изображений
 *
 * Уменьшает размер изображений и создает webp, avif форматы
 */

// Сторонние библиотеки
import { src, dest, watch, series } from 'gulp' // gulp плагин
import gulpif from 'gulp-if' // вызывает функции по условию
import newer from 'gulp-newer' // пропускает старые файлы
//import flatten from 'gulp-flatten' // настраивает исходную структуру каталогов
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin' // оптимизирует изображения
import pngQuant from 'imagemin-pngquant' // оптимизирует png изображения
import webp from 'gulp-webp' // создает webp файлы
import avif from 'gulp-avif' // создает avif файлы

// Конфиги
import config from '../config'

// Оптимизация изображений
export const imageOptim = () =>
  src([`${config.src.assets.images}/**/*`]) // входящие файлы
    .pipe(newer(config.build.images)) // только те изображения которые изменились или были добавлены
    .pipe(
      gulpif(
        config.isProd,
        imagemin(
          [
            gifsicle({
              interlaced: true, // чересстрочная загрузка изображения
            }),
            optipng({
              optimizationLevel: 5, // уровень оптимизации png файла
            }),
            pngQuant({
              quality: [0.8, 0.9], // уровень оптимизации png файла
            }),
            mozjpeg({
              quality: 75, // уровень оптимизации jpg файла
              progressive: true, // чересстрочная загрузка изображения
            }),
            svgo({
              plugins: [
                { cleanupIds: true }, // удаляет неиспользуемые id
                { removeUselessDefs: true }, // удаляет <defs>
                { removeViewBox: true }, // удаляет атрибут viewBox
                { removeComments: true }, // удаляет комментарии
                // { inlineStyles: { removeMatchedSelectors: false, onlyMatchedOnce: false } }, // оставляет стили в теге style
                { mergePaths: true }, // объединяет несколько путей в один
                { minifyStyles: false }, // не удаляет @keyframes из тега style
              ],
            }),
          ],
          {
            verbose: config.isProd, // каждая оптимизированная картинка отобразится в терминале
          },
        ),
      ),
    )
    // .pipe(flatten({ includeParents: [1, 1] })) // изменяет уровень вложенности каталогов
    .pipe(dest(config.build.images)) // исходящие файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Создание Webp изображения
export const toWebp = () =>
  src(`${config.src.assets.images}/**/*.{jpg,png,jpeg}`) // для всех файлов формата jpg,png,jpeg будет создан файл webp
    .pipe(
      webp({
        quality: 80, // уровень оптимизации webp файла
      }),
    )
    .pipe(dest(config.build.images)) // разместит оптимизированные webp файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Создание Avif изображения
export const toAvif = () =>
  src(`${config.src.assets.images}/**/*.{jpg,png,jpeg}`) // для всех файлов формата jpg,png,jpeg будет создан файл webp
    .pipe(
      avif({
        quality: 80, // уровень оптимизации avif файла
      }),
    )
    .pipe(dest(config.build.images)) // разместит оптимизированные webp файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Выполнение всех тасков
export const imagesBuild = series(imageOptim, toWebp, toAvif)

// Слежение за изменением файлов
export const imagesWatch = () =>
  watch(
    `${config.src.assets.images}/**/*`,
    { ignoreInitial: false },
    imagesBuild,
  )
