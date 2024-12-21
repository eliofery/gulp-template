/**
 * Шаблонизатор pug
 *
 * Компилирует pug разметку в html.
 *
 * @link https://github.com/pugjs/pug/issues/2561
 */

// Библиотеки
import { dest, series, src, watch } from 'gulp' // gulp плагин
import pug from 'gulp-pug' // шаблонизатор pug
import plumber from 'gulp-plumber' // перехватывает ошибки
import notify from 'gulp-notify' // уведомляет об ошибках
import pugIncludeGlob from 'pug-include-glob' // позволяет использовать /**/*.pug конструкцию
import fs from 'fs' // чтение файлов
import gulpif from 'gulp-if' // вызывает функции по условию
import replace from 'gulp-replace' // замена текста внутри файла

// Дополнительные markdown библиотеки
import jstransformer from 'jstransformer' // для преобразования содержимого
import markdownIt from 'jstransformer-markdown-it' // позволяет компилировать и преобразовывать Markdown-код
import kbd from 'markdown-it-kbd' // позволяет добавлять тег kbd через markdown разметку [[]]
import 'jstransformer-highlight' // подсветка синтаксиса
import markdownItAttrs from 'markdown-it-attrs' // позволяет добавлять markdown разметке атрибуты
import scss from 'jstransformer-scss' // компилирует scss в css
import cleanCss from 'jstransformer-clean-css' // минифицирует css

const md = jstransformer(markdownIt)
const jstscss = jstransformer(scss)
const jstminify = jstransformer(cleanCss)

// Конфиги
import config from '../config.mjs'

// Формирование объекта с данными
// Далее значение этого объекта в pug файле можно будет получить примерно так:
// #{jsonData.nav.home.link}
const getData = () => {
  const dir = config.src.pug.data // здесь ищем json файлы
  const files = fs.readdirSync(dir) // получаем список всех файлов в каталоге
  const data = {} // хранит данные файлов

  // Проходимся по каждому файлу
  files.forEach(file => {
    if (!file.endsWith('.json')) return // пропускаем только json файлы

    const fileName = file.replace('.json', '') // формируем имя файла без его расширения

    // Создаем ключ с названием файла в объекте data и помещаем в него содержимое файла
    data[fileName] = JSON.parse(fs.readFileSync(`${dir}/${file}`, 'utf8'))
  })

  return data
}

// Pug в Html
export const pugToHtml = () => {
  const jsonData = getData() // получаем данные

  return src([`${config.src.pug.pages}/**/*.pug`]) // входящие файлы
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче pugBuild', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
    .pipe(
      pug({
        doctype: 'html', // чтобы не было обратного слеша у одиночных тэгов
        pretty: true, // сжатие html разметки
        plugins: [pugIncludeGlob()], // подключаем сторонние pug плагины
        locals: {
          // передаем jsonData в pug, далее используем его примерно так: #{jsonData.nav.home.link}
          jsonData,
        },
        filters: {
          // Переопределяем pug фильтр markdown-it, улучшая его стандартную функциональность
          'markdown-it': (text, options) => {
            // inline режим добавляет/убирает обертку в виде тега <p>
            const inline = options.inline || false

            return md.render(text, {
              plugins: [kbd, markdownItAttrs], // подключаем дополнительные плагины
              inline, // включаем/отключаем inline режим
            }).body
          },

          // Пользовательский фильтр
          // @var options {} имеет один параметр path, хранящий путь до critical.scss
          'critical-css': (text, options) => {
            const css = jstscss.render(options.path).body // компилирует scss в css
            css.replaceAll('&quot;', '"') // jstscss при компиляции заменяет " на &quot; что не есть хорошо

            // минифицирует получившейся css файл, удаляя комментарии
            return jstminify.render(css, {
              level: {
                1: {
                  specialComments: 0,
                },
              },
            }).body
          },

          // Пользовательский фильтр экранирования html тегов
          'special-chars': text => text.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        },
      }),
    )
    .pipe(dest(config.build.root)) // исходящие файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере
}

// Определение окружения
const envSet = () => {
  const pattern = /(- (var|let|const) env = ")(prod|dev)(";?)/g

  return src(`${config.src.pug.data}/config.pug`)
    .pipe(gulpif(config.isDev, replace(pattern, '$1dev$4')))
    .pipe(gulpif(config.isProd, replace(pattern, '$1prod$4')))
    .pipe(dest(file => file.base))
}

// Определение версии
const versionSet = () => {
  const pattern = /(- (var|let|const) version = ")(.*)(";?)/g

  return src(`${config.src.pug.data}/config.pug`)
    .pipe(replace(pattern, `$1${config.version}$4`))
    .pipe(dest(file => file.base))
}

// Сборка таска
export const pugBuild = series(envSet, versionSet, pugToHtml)

// Слежение за изменением файлов
export const pugWatch = () => {
  watch(
    [
      `${config.src.pug.root}/**/*.pug`,
      `${config.src.pug.root}/data/**/*`,
      // `${config.src.assets.icons.root}/sprite-*.svg`,
    ],
    pugToHtml,
  )
}
