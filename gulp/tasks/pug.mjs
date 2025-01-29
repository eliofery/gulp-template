/**
 * Шаблонизатор pug
 *
 * Компилирует pug разметку в html.
 *
 * @link https://pugjs.org/language/filters.html
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
import newer from 'gulp-newer'

// Дополнительные markdown библиотеки
import jstransformer from 'jstransformer' // для преобразования содержимого
import markdownIt from 'jstransformer-markdown-it' // позволяет компилировать и преобразовывать Markdown-код
import kbd from 'markdown-it-kbd' // позволяет добавлять тег kbd через markdown разметку [[]]
import 'jstransformer-highlight' // подсветка синтаксиса :highlight(lang="javascript")
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
  const dir = config.src.markup.data // основной каталог
  const data = {} // объект для хранения данных

  // Рекурсивная функция обхода файлов и каталогов
  const readDirRecursive = currentDir => {
    const files = fs.readdirSync(currentDir) // получаем список файлов и папок

    files.forEach(file => {
      const fullPath = `${currentDir}/${file}` // полный путь до файла или папки
      const stat = fs.statSync(fullPath) // проверяем тип (файл или каталог)

      if (stat.isDirectory()) {
        // Если это каталог, вызываем функцию рекурсивно
        readDirRecursive(fullPath)
      } else if (file.endsWith('.json')) {
        // Если это JSON-файл, добавляем его данные
        const fileName = file.replace('.json', '') // убираем расширение из имени
        // создаем ключ с названием файла в объекте data и помещаем в него содержимое файла
        data[fileName] = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
      }
    })
  }

  readDirRecursive(dir) // запускаем обход с основного каталога

  return data
}

const getOptions = () => ({
  doctype: 'html', // чтобы не было обратного слеша у одиночных тэгов
  pretty: true, // форматирует разметку без минификации
  plugins: [pugIncludeGlob()], // подключаем сторонние pug плагины
  locals: {
    // Пользовательские данные передаваемые в pug.
    // Пример использования в шаблоне pug: #{jsonData.nav.home.link}
    jsonData: getData(),
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
})

// При изменении страниц
const changePages = () =>
  src([`${config.src.markup.pages}/**/*.pug`]) // входящие файлы
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче changePages', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
    .pipe(
      // преобразуем только добавленные или измененные файлы
      newer({
        dest: config.build.root,
        ext: '.html',
      }),
    )
    .pipe(pug(getOptions()))
    .pipe(dest(config.build.root)) // исходящие файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере

// При изменении подключаемых файлов
const changeIncludes = () =>
  src([`${config.src.markup.pages}/**/*.pug`]) // входящие файлы
    .pipe(
      // Отлавливаем и показываем ошибки в таске
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Ошибка в задаче changeIncludes', // заголовок ошибки
          sound: false, // уведомлять звуком
          message: err.message, // описание ошибки
        })),
      }),
    )
    .pipe(pug(getOptions()))
    .pipe(dest(config.build.root)) // исходящие файлы
    .pipe(browserSync.stream()) // обновление страницы в браузере

// Определение окружения
const envSet = () => {
  const pattern = /(- (var|let|const) env = ")(prod|dev)(";?)/g

  return src(`${config.src.markup.root}/_config.pug`)
    .pipe(gulpif(config.isDev, replace(pattern, '$1dev$4')))
    .pipe(gulpif(config.isProd, replace(pattern, '$1prod$4')))
    .pipe(dest(file => file.base))
}

// Определение версии
const versionSet = () => {
  const pattern = /(- (var|let|const) version = ")(.*)(";?)/g

  return src(`${config.src.markup.root}/_config.pug`)
    .pipe(replace(pattern, `$1${config.version}$4`))
    .pipe(dest(file => file.base))
}

// Сборка таска
export const pugBuild = series(envSet, versionSet, changePages)

// Слежение за изменением файлов
export const pugWatch = () => {
  watch([`${config.src.markup.pages}/**/*.pug`], changePages)

  watch(
    [
      `${config.src.markup.root}/**/*.pug`,
      `!${config.src.markup.pages}/**/*.pug`,
      `${config.src.markup.data}/**/*`,
      `${config.src.assets.icons.root}/sprite-*.svg`,
      `${config.src.style}/**/*.{scss,sass}`,
    ],
    changeIncludes,
  )
}
