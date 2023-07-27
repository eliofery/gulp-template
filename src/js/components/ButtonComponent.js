export default class ButtonComponent {
  _element = null

  constructor(selector) {
    this._element = document.querySelector(selector)
  }

  get element() {
    return this._element
  }
}
