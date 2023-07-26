/**
 * Удаления продакшен версии проекта
 *
 * Полностью удаляет каталог build
 *
 * @link https://gulpjs.com/docs/en/api/src#options
 * @link https://www.npmjs.com/package/gulp-clean
 */

// Сторонние библиотеки
import { src } from 'gulp' // gulp плагин
import clean from 'gulp-clean' // плагин для удаления каталогов

// Конфиги
import config from '../config'

// Таск
const clear = () =>
  src(config.build.root, {
    // указываем путь к каталогу который хотим удалить
    read: false, // запрещаем читать содержимое файлов
    allowEmpty: true, // отключаем ошибки о не существующем каталоге
  }).pipe(
    clean({
      // удаляем каталог
      force: true, // разрешаем удаление каталогов и файлов за пределами каталога с тасками
    }),
  )

export default clear
