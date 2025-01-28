# Шпаргалка по Спрайтам

Сборка поддерживает генерацию **цветного (sprite-multi.svg)** и **черно-белого (sprite-mono.svg)** спрайтов.

Спрайты генерируются из **svg** иконок, расположенных в директории **src/assets/icons/mono|multi**.

Все **svg** иконки должны начинаться с префикса **icon-**, например **icon-card.svg**.

Так же следует обратить внимание на пустые файлы **sprite-mono.svg** и **sprite-multi.svg**, не удаляйте их, даже если у вас не будет **svg** иконок в проекте. Так как данные спрайты подключаются в основном шаблоне **pug**, то их удаление приведет к тому, что шаблонизатор выкинет ошибку и не соберется.

Если вам все же не нужны данные файлы, то после их удаления так же удалите разметку в файле **src/markup/layouts/default.pug**:

```pug
div(hidden)
  include ../../assets/icons/sprite-mono.svg
  include ../../assets/icons/sprite-multi.svg
```

## Использование иконок из спрайта

Использовании иконок из спрайта в **стилях**:

```css
.icon {
  display: inline-block;
  width: 200px;
  height: 200px;
  background: #ffd11a center no-repeat;
  background-size: 200px;
}

.icon-card {
  background-image: url('../img/sprite-mono.svg#icon-card-view');
}
```

```html
<span class="icon icon-card" aria-hidden="true"></span>
```

Использовании иконок из спрайта в **pug**:

```pug
//- Вызов миксина
+icon("icon-card")(width="200", height="200", aria-hidden="true")

//- На выходе получится следующая разметка
<svg class="icon icon-card" width="200" height="200" aria-hidden="true">
  <use xlink:href="#icon-card"></use>
</svg>
```
