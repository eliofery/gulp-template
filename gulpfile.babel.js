// Пользовательские скрипты
import config from './gulp/config'

// Определяем окружения сборки dev или prod
config.setEnv()

export default done => {
  console.log(config.isDev)
  console.log(config.isProd)

  done()
}
