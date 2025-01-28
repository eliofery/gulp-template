import Select from '@/components/Select/index'
import { rootSelector } from '@/components/Select/consts'
import { $ } from '@/utils/JQuery'

export default class SelectCollection {
  private readonly rootSelector = rootSelector

  constructor() {
    document.querySelectorAll(this.rootSelector).forEach(element => {
      new Select($(element))
    })
  }
}
