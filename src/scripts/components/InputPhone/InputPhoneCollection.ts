import InputPhone from '@/components/InputPhone/index'

export default class InputPhoneCollection {
  private readonly rootSelector = '[data-js-input-mask]'

  constructor() {
    document.querySelectorAll(this.rootSelector).forEach(inputElement => {
      new InputPhone(inputElement as HTMLInputElement)
    })
  }
}
