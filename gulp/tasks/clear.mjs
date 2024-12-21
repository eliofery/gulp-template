/**
 * Удаления продакшен версии проекта
 *
 * Полностью удаляет каталог build
 *
 * @link https://gulpjs.com/docs/en/api/src#options
 */

// Библиотеки
import { src } from 'gulp' // gulp плагин
import clean from 'gulp-clean' // плагин для удаления каталогов

// Конфиги
import config from '../config.mjs'

// Запуск таска
const clear = () =>
  // Удаляемый каталог
  src(config.build.root, {
    read: false, // запрещаем читать содержимое файлов
    allowEmpty: true, // отключаем ошибки о не существующем каталоге
  }).pipe(
    // Удаление каталога
    clean({
      force: true, // разрешаем удаление каталогов и файлов за пределами каталога
    }),
  )

export default clear
