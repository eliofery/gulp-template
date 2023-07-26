// Сторонние библиотеки
import { series } from 'gulp'

// Таски
import clear from './gulp/tasks/clear'

// Конфиги
import config from './gulp/config'

// Определяем окружения сборки dev или prod
config.setEnv()

// Сборка проекта
export const build = series(clear)

// Слежение за изменением файлов
export const watch = series(build)

export default watch
