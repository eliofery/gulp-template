# Шпаргалка по Favicon

Для генерации **favicons** разместите в директории **src/assets/favicons** файл **favicon.svg** размером не менее 512x512px.

**При сборке будут сгенерированы следующие файлы:**

- apple-touch-icon.png
- favicon.ico
- favicon-192.png
- favicon-512.png

Плюс исходный файл:

- favicon.svg

Если расширение **gulp-svg2png** не устанавливается добавьте флаг **--ignore-engines**, например **yarn add gulp-svg2png --ignore-engines**.

Для оптимизации исходной **svg favicon** можно воспользоваться командой:

```bash
npx svgo --multipass ./src/assets/favicons/favicon.svg
```
