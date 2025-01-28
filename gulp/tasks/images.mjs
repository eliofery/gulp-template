/**
 * Оптимизация изображений
 *
 * Уменьшает размер изображений и создает webp, avif форматы
 */

// Сторонние библиотеки
import { src, dest, watch, series } from 'gulp' // gulp плагин
import gulpif from 'gulp-if' // вызывает функции по условию
import newer from 'gulp-newer' // пропускает старые файлы
// import flatten from 'gulp-flatten' // настраивает исходную структуру каталогов
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin' // оптимизирует изображения
import pngQuant from 'imagemin-pngquant' // оптимизирует png изображения
import webp from 'gulp-webp' // создает webp файлы
import avif from 'gulp-avif' // создает avif файлы
import plumber from 'gulp-plumber' // перехватывает ошибки
import notify from 'gulp-notify' // уведомляет об ошибках
// import filter from 'gulp-filter'

// Конфиги
import config from '../config.mjs'

// Оптимизация изображений
export const imageOptim = () =>
  src([`${config.src.assets.images}/**/*`, `${config.src.assets.favicons}/**/*`], {
    encoding: false,
  }) // входящие файлы
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче imageOptim', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
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
                { name: 'cleanupIDs', active: true }, // удаляет неиспользуемые id
                { name: 'removeUselessDefs', active: true }, // удаляет <defs>
                { name: 'removeViewBox', active: true }, // удаляет атрибут viewBox
                { name: 'removeComments', active: true }, // удаляет комментарии
                // { name: 'inlineStyles', active: { removeMatchedSelectors: false, onlyMatchedOnce: false } }, // оставляет стили в теге style
                { name: 'mergePaths', active: true }, // объединяет несколько путей в один
                { name: 'minifyStyles', active: false }, // не удаляет @keyframes из тега style
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
  src(`${config.src.assets.images}/**/*.{jpg,png,jpeg}`, {
    encoding: false,
  }) // для всех файлов формата jpg,png,jpeg будет создан файл webp
    // .on('data', file => console.log(`Файл: ${file.path}`))
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче toWebp', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
    .pipe(newer({ dest: config.build.images, ext: '.webp' })) // только те изображения которые изменились или были добавлены
    .pipe(
      webp({
        quality: 80, // уровень оптимизации webp файла
      }),
    )
    .pipe(dest(config.build.images)) // разместит оптимизированные webp файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Создание Avif изображения
export const toAvif = () =>
  src(`${config.src.assets.images}/**/*.{jpg,png,jpeg}`, {
    encoding: false,
  }) // для всех файлов формата jpg,png,jpeg будет создан файл webp
    // .on('data', file => console.log(`Файл: ${file.path}`))
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче toAvif', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
    // .pipe(filter(file => console.log(/\.(jpg|jpeg|png)$/.test(file.extname))))
    .pipe(newer({ dest: config.build.images, ext: '.avif' })) // только те изображения которые изменились или были добавлены
    .pipe(
      avif({
        quality: 80, // уровень оптимизации avif файла
        speed: 8, // нагрузка на CPU, максимум 8, для быстрой оптимизации картинок
      }),
    )
    .pipe(dest(config.build.images)) // разместит оптимизированные webp файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Выполнение всех тасков
export const imagesBuild = series(imageOptim, toWebp, toAvif)

// Слежение за изменением файлов
export const imagesWatch = () =>
  watch(
    [`${config.src.assets.images}/**/*`, `${config.src.assets.favicons}/**/*`],
    { ignoreInitial: false },
    imagesBuild,
  )
