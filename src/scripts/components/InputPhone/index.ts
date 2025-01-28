import IMask from 'imask'

export default class InputPhone {
  constructor(private rootElement: HTMLInputElement) {
    this.init()
  }

  protected init() {
    IMask(this.rootElement, {
      mask: this.rootElement.dataset.jsInputMask,
    })
  }
}
