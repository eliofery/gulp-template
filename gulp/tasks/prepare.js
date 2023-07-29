/**
 * Подготовка сборки к работе над проектом
 *
 * Заменяет повторяющийся текст в различных файлах, удаляет промо страницу с инструкцией
 *
 * Смотреть gulp/config.js параметр replacement
 */

import { src, dest, series } from 'gulp' // gulp плагин
import replace from 'gulp-replace' // изменяет текст в фалах
import clean from 'gulp-clean' // плагин для удаления каталогов
import rename from 'gulp-rename' // переименование файла

import config from '../config'

// Замена текста в файлах
export const replaceText = () => {
  const oldValues = [] // старые значения
  const newValues = [] // новые значения

  // Заполняем массивы значениями
  Object.keys(config.replacement).forEach(key => {
    oldValues.push(config.replacement[key].old)
    newValues.push(config.replacement[key].new)
  })

  // Заменяем текст в файлах
  let stream = src(config.files)

  oldValues.forEach((oldValue, key) => {
    // Поиск указанного в config.replacement old текста
    const regex = new RegExp(`([^\\w]+)(${oldValue})([^\\w]+)`, 'g')

    stream = stream
      .pipe(replace(regex, `$1${newValues[key]}$3`)) // заменяем old текст на значение new
      .pipe(dest(file => file.base)) // сохраняем измененный файл в той же директории
  })

  return stream
}

// Удаление промо страницы
const removePromo = () =>
  src([
    `${config.src.pug.pages}/index.pug`,
    `${config.src.assets.images}/build-logo.svg`,
  ]).pipe(clean())

// Создание чистого файла index.pug
const renameIndex = () =>
  src(`${config.src.pug.pages}/index-example.pug`) // исходный файл
    .pipe(rename('index.pug')) // переименовываем
    .pipe(dest(file => file.base)) // сохраняем измененный файл в той же директории

// Подготовка сборки к работе
export const prepareBuild = series(replaceText, removePromo, renameIndex)

export default prepareBuild
