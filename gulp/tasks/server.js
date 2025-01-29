/**
 * Виртуальный сервер
 *
 * Создает виртуальный сервер, автоматически обновляет браузер при изменении файлов
 *
 * @link https://browsersync.io/docs/gulp
 * @link https://browsersync.io/docs/options
 */

// Конфиги
import config from '../config'

// Создаем browserSync
global.browserSync = require('browser-sync').create()

const server = done => {
  browserSync.init({
    // proxy: `${config.proxy}:${config.port}`, // хост по заданной ссылке
    // port: config.port, // использовать заданный порт

    server: config.build.root, // хост по заданному каталогу

    open: true, // автоматически открыть страницу в браузере после запуска таска
    notify: false, // показать уведомление
    cors: true, // добавить HTTP заголовок CORS
    ui: false, // включить доступ к интерфейсу настроек browser-sync
  })

  done() // скрипт завершен
}

export default server
