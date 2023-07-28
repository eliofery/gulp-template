/**
 * SVG спрайт
 *
 * Создает svg спрайт
 *
 * Пример использования в css:
 * background: url('sprite-mono.svg#icon-name-view') no-repeat;
 * background-size: 20px;
 *
 * Пример использования в html:
 * <svg width="50" height="50" aria-hidden="true"><use href="#icon-name"></use></svg>
 *
 * @link https://github.com/svg/svgo
 */

// Сторонние библиотеки
import { src, dest, watch, parallel } from 'gulp' // gulp плагин
import filesExist from 'files-exist' // проверяет файл на существование
import concat from 'gulp-concat' // объединяет несколько файлов в один
import svgSprite from 'gulp-svg-symbol-view' // создает спрайт

// Конфиги
import config from '../config'

// Создание черно-белого svg спрайта
const spriteMono = () =>
  // входящие файлы
  src(
    filesExist(`${config.src.assets.icons.mono}/**/icon-*.svg`, {
      exceptionMessage: 'Нет ни одного файла svg',
    }),
  )
    .pipe(
      svgSprite({
        svgo: {
          plugins: [
            { cleanupIDs: true }, // удалить id
            { removeRasterImages: true }, // удалить растровые изображения
            { removeStyleElement: true }, // удалить <style>
            { removeUselessDefs: true }, // удалить <defs>
            { removeViewBox: false }, // удалить ViewBox
            { removeComments: true }, // удалить комментарии
            {
              removeAttrs: {
                attrs: ['class', 'data-name'], // удалить указанные атрибуты, 'fill', 'stroke.*'
              },
            },
          ],
        },
      }),
    )
    .pipe(concat('sprite-mono.svg')) // объединение файлов
    .pipe(dest(config.src.assets.images)) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Создание цветного svg спрайта
const spriteMulti = () =>
  // входящие файлы
  src(
    filesExist(`${config.src.assets.icons.multi}/**/icon-*.svg`, {
      exceptionMessage: 'Нет ни одного файла svg',
    }),
  )
    .pipe(
      svgSprite({
        svgo: {
          plugins: [
            { cleanupIDs: true }, // удалить id
            { removeUselessDefs: true }, // удалить <defs>
            { removeViewBox: false }, // удалить ViewBox
            { removeComments: true }, // удалить комментарии
            { removeUselessStrokeAndFill: false }, // удалить атрибуты stroke и fill
            { inlineStyles: true }, // поддержка встроенных стилей <style></style>
            {
              removeAttrs: {
                attrs: ['class', 'data-name'], // удалить указанные атрибуты
              },
            },
          ],
        },
      }),
    )
    .pipe(concat('sprite-multi.svg')) // объединение файлов
    .pipe(dest(config.src.assets.images)) // исходящий файл
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Сборка всех тасков
export const spritesBuild = parallel(spriteMono, spriteMulti)

// Слежение за изменением файлов
export const spritesWatch = () => {
  watch(
    `${config.src.assets.icons.mono}/**/*.svg`,
    { ignoreInitial: false },
    spriteMono,
  )
  watch(
    `${config.src.assets.icons.multi}/**/*.svg`,
    { ignoreInitial: false },
    spriteMulti,
  )
}
