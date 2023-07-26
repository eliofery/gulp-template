// Сторонние библиотеки
import { series } from 'gulp'

// Таски
import clear from './gulp/tasks/clear'
import server from './gulp/tasks/server'

// Конфиги
import config from './gulp/config'

// Определяем окружения сборки dev или prod
config.setEnv()

// Запуск виртуального сервера
export const proxy = server

// Сборка проекта
export const build = series(clear)

// Слежение за изменением файлов
export const watch = series(build, server)

export default watch
