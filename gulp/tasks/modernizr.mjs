/**
 * Modernizer
 *
 * Позволяет определить поддержку браузером различных фич.
 *
 * https://github.com/Modernizr/Modernizr/tree/master/feature-detects
 */

// Сторонние библиотеки
import fs from 'fs'
import { build } from 'modernizr' // modernizr
import { minify } from 'uglify-js' // минификация

// Конфиги
import config from '../config.mjs'

// Обработчик ошибок
const errorHandler = err => {
  if (err) {
    console.error('Ошибка при сохранении файла:', err)
  } else {
    console.log(`Modernizr сохранён в ${config.modernize.file}`)
  }
}

// Запись в файл
const writeFile = result => {
  const minified = minify(result)

  if (minified.error) {
    console.error('Ошибка минификации:', minified.error)
    return
  }

  fs.writeFile(config.modernize.file, minified.code, 'utf8', errorHandler)
}

// Сборка таска
export const modernizrBuild = done => {
  build(config.modernize.options, writeFile)

  done()
}
