/**
 * Scss препроцессор
 *
 * Объединяет указанные scss файлы в один общий css файл и минифицирует
 */

// Сторонние библиотеки
import { src, dest, watch, series } from 'gulp' // gulp плагин
import plumber from 'gulp-plumber' // перехватывает ошибки
import notify from 'gulp-notify' // уведомляет об ошибках
import sassGlob from 'gulp-sass-glob' // позволяет использовать /**/*.scss конструкцию
import dartSass from 'sass' // препроцессор sass
import gulpSass from 'gulp-sass' // препроцессор sass
import postcss from 'gulp-postcss' // позволяет использовать PostCSS для обработки CSS-файлов
import autoPrefixer from 'autoprefixer' // автоматически добавляет префиксы для поддержки старых браузеров
import cssnano from 'cssnano' // минифицирует css файл
import postcssCustomMedia from 'postcss-custom-media' // позволяет вам определять @custom-media
import postcssMediaMinMax from '@csstools/postcss-media-minmax' // переводит новый формат диапазона в медиазапросах в старый
import sortMediaQueries from 'postcss-sort-media-queries' // группирует стили под общими медиа запросами
import comments from 'postcss-discard-comments' // группирует стили под общими медиа запросами
import cssImport from 'postcss-import' // импорт css файлов

// Конфиги
import config from '../config.mjs'

// Подключение библиотеки sass
const sass = gulpSass(dartSass)

// Сборка таска
export const stylesBuild = () => {
  const minify = config.isProd ? cssnano() : () => {} // минификация стилей
  const clear = config.isProd ? comments({ removeAll: true }) : () => {} // удаление комментариев

  return src(`${config.src.style}/**/*.{scss,sass}`, {
    sourcemaps: config.isDev,
  }) // входящие файлы
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче stylesBuild', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
    .pipe(
      sassGlob({
        // Эти стили добавлены в _critical.scss и не нужны в main.scss
        ignorePaths: config.ignoreScssPaths,
      }),
    ) // проходит по всем файлам в scss, подключенным через шаблон /**/*
    .pipe(
      sass.sync({
        // Ищет зависимости в node_modules, не работает для @use
        // кроме __critical.scss, так как его обрабатывает сам pug.
        // @use '../../node_modules/highlight.js/styles/a11y-light.css';
        // @import 'highlight.js/styles/a11y-light.css';
        includePaths: ['./node_modules'],
      }),
    )
    .pipe(
      postcss([
        cssImport(),
        postcssCustomMedia(), // позволяет вам определять @custom-media
        postcssMediaMinMax(), // переводит новый формат диапазона в медиазапросах в старый
        sortMediaQueries({ sort: 'desktop-first' }), // объединяет медиа запросы
        autoPrefixer(), // автопрефиксер
        minify, // минификация
        clear, // очистка комментариев
      ]),
    )
    .pipe(dest(config.build.style, { sourcemaps: config.isDev })) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере
}

// Слежение за изменением файлов
export const stylesWatch = () => watch(`${config.src.style}/**/*.{scss,sass}`, stylesBuild)
