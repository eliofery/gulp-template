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
import postcssCustomMedia from 'postcss-custom-media' // группирует стили под общими медиа запросами
import comments from 'postcss-discard-comments' // группирует стили под общими медиа запросами
import { pugBuild } from './pug' // чтобы pug обновлял критические стили

// Конфиги
import config from '../config'

// Подключение библиотеки sass
const sass = gulpSass(dartSass)

// Сборка таска
export const stylesBuild = () => {
  const minify = config.isProd ? cssnano() : () => {} // минификация стилей
  const clear = config.isProd ? comments({ removeAll: true }) : () => {} // удаление комментариев

  return src(`${config.src.scss}/**/*.{scss,sass}`, {
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
    .pipe(sassGlob()) // проходит по всем файлам в scss, подключенным через шаблон /**/*
    .pipe(
      sass.sync({
        includePaths: ['./node_modules'], // ищет зависимости в node_modules, например normalize.css
      }),
    )
    .pipe(
      postcss([
        postcssCustomMedia(), // объединяет медиа запросы
        autoPrefixer(), // автопрефиксер
        minify, // минификация
        clear, // очистка комментариев
      ]),
    )
    .pipe(dest(config.build.css, { sourcemaps: config.isDev })) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере
}

// Слежение за изменением файлов
export const stylesWatch = () => {
  watch(`${config.src.scss}/**/*.{scss,sass}`, series(stylesBuild, pugBuild))
}
