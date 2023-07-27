/**
 * JS Webpack
 *
 * Объединяет указанные js файлы в один общий и минифицирует его
 */

// Сторонние библиотеки
import { dest, src, watch } from 'gulp' // gulp плагин
import plumber from 'gulp-plumber' // перехватывает ошибки
import notify from 'gulp-notify' // уведомляет об ошибках
import gulpif from 'gulp-if' // вызывает функции по условию
import webpackStream from 'webpack-stream' // webpack плагин
import named from 'vinyl-named-with-path' // дает возможность использовать ${config.src.js}/*.js конструкцию
import strip from 'gulp-strip-comments' // очищает комментарии

// Конфиги
import config from '../config'
import webpackConfig from '../../webpack.config'

// Сборка таска
export const webpackBuild = () =>
  src([`${config.src.js.root}/*.js`]) // входящие файлы
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
    .pipe(dest(`${config.build.js}`)) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Слежение за изменением файлов
export const webpackWatch = () =>
  watch(`${config.src.js.root}/**/*.js`, webpackBuild)
