/**
 * Webpack
 *
 * Сборка и минификация javascript и typescript.
 */

// Библиотеки
import { dest, series, src, watch } from 'gulp' // gulp плагин
import plumber from 'gulp-plumber' // перехватывает ошибки
import notify from 'gulp-notify' // уведомляет об ошибках
import gulpif from 'gulp-if' // вызывает функции по условию
import webpackStream from 'webpack-stream' // webpack плагин
import named from 'vinyl-named-with-path' // подстановка имени файла в webpack output [name].js
import strip from 'gulp-strip-comments' // очищает комментарии

// Конфиги
import config from '../config.mjs'
import webpackConfig from '../../webpack.config.mjs'

// Сборка таска
export const webpackBuild = () =>
  src([`${config.src.script.root}/*.{js,ts}`]) // входящие файлы
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче webpackBuild', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
    .pipe(named()) // меняем [name] на имя файла
    .pipe(webpackStream(webpackConfig)) // настройки webpack
    .pipe(gulpif(config.isProd, strip())) // удаляем комментарии в коде
    .pipe(dest(config.build.script)) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Слежение за изменением файлов
export const webpackWatch = () => watch(`${config.src.script.root}/**/*.{js,ts}`, webpackBuild)
