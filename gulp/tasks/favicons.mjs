/**
 * Favicons
 *
 * Создает фавиконки различного разрешения и типа из svg файла
 *
 * Если возникает ошибка у gulp-svg2png
 * Ошибка: DSO support routines:DLFCN_LOAD:could not load the shared library:dso_dlfcn.c:185:filename(libproviders.so):
 * Ввести в терминале: export OPENSSL_CONF=/dev/null
 *
 * Команда для оптимизации svg: npx svgo --multipass ./src/assets/favicons/icon.svg
 *
 * @link https://habr.com/ru/articles/672844/
 */

// Сторонние библиотеки
import { src, dest, watch, series } from 'gulp' // gulp плагин
import plumber from 'gulp-plumber' // перехватывает ошибки
import notify from 'gulp-notify' // уведомляет об ошибках
import svg2png from 'gulp-svg2png' // svg в png
import rename from 'gulp-rename' // переименование файла
import imageResize from 'gulp-image-resize' // изменение разрешения картинки
import ico from 'gulp-to-ico' // png в ico

// Конфиги
import config from '../config.mjs'

const faviconSvg = `${config.src.assets.favicons}/favicon.svg`

// Сборка таска
export const faviconBuild = () => {
  process.env.OPENSSL_CONF = '/dev/null'

  return (
    src(faviconSvg) // входящий файл
      .pipe(
        // Отлавливаем и показываем ошибки в таске
        plumber({
          errorHandler: notify.onError(err => ({
            title: 'Ошибка в задаче faviconBuild', // заголовок ошибки
            sound: false, // уведомлять звуком
            message: err.message, // описание ошибки
          })),
        }),
      )
      .pipe(svg2png()) // svg в png

      // изменение разрешения картинки на 512х512
      .pipe(
        imageResize({
          width: 512,
          height: 512,
          crop: true, // должно ли изображение быть обрезано до заданных размеров
          upscale: false, // может ли изображение быть увеличено, если указанные размеры больше, чем оригинальные размеры
        }),
      )
      .pipe(rename('favicon-512.png')) // переименование файла
      .pipe(dest(config.src.assets.favicons)) // исходящий файл

      // изменение разрешения картинки на 192х192
      .pipe(
        imageResize({
          width: 192,
          height: 192,
          crop: true, // должно ли изображение быть обрезано до заданных размеров
          upscale: false, // может ли изображение быть увеличено, если указанные размеры больше, чем оригинальные размеры
        }),
      )
      .pipe(rename('favicon-192.png')) // переименование файла
      .pipe(dest(config.src.assets.favicons)) // исходящий файл

      // изменение разрешения картинки на 180х180
      .pipe(
        imageResize({
          width: 180,
          height: 180,
          crop: true, // должно ли изображение быть обрезано до заданных размеров
          upscale: false, // может ли изображение быть увеличено, если указанные размеры больше, чем оригинальные размеры
        }),
      )
      .pipe(rename('apple-touch-icon.png')) // переименование файла
      .pipe(dest(config.src.assets.favicons)) // исходящий файл

      // изменение разрешения картинки на 32х32
      .pipe(
        imageResize({
          width: 32,
          height: 32,
          crop: true, // должно ли изображение быть обрезано до заданных размеров
          upscale: false, // может ли изображение быть увеличено, если указанные размеры больше, чем оригинальные размеры
        }),
      )
      .pipe(ico('favicon.ico')) // переименование файла
      .pipe(dest(config.src.assets.favicons)) // исходящий файл
      .pipe(browserSync.stream()) // обновление страницы в браузере
  )
}

// Слежение за изменением файлов
export const faviconWatch = () => watch(faviconSvg, faviconBuild)
