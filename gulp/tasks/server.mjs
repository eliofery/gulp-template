/**
 * Виртуальный сервер
 *
 * Создает виртуальный сервер, автоматически обновляет браузер при изменении файлов.
 *
 * @link https://browsersync.io/docs/gulp
 * @link https://browsersync.io/docs/options
 */

// Библиотеки
import browser from 'browser-sync' // локальный сервер

// Конфиги
import config from '../config.mjs'

// Глобальный browserSync, позволяет без импорта обращаться к browserSync внутри других модулей
global.browserSync = browser.create()

// Запуск таска
const server = done => {
  browserSync.init({
    // Вариант 1
    //proxy: `${config.server.proxy}:${config.server.port}`, // хост по заданной ссылке

    // Вариант 2
    server: config.build.root, // хост по заданному каталогу
    port: config.server.port, // использовать заданный порт

    open: true, // автоматически открыть страницу в браузере после запуска таска
    notify: false, // показать уведомление
    cors: true, // добавить HTTP заголовок CORS
    ui: false, // включить доступ к интерфейсу настроек browser-sync
  })

  done() // скрипт завершен
}

export default server
