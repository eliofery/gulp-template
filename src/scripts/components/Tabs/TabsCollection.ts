import { tabsSelector } from '@/components/Tabs/consts'
import Tabs from '@/components/Tabs/index'
import { $ } from '@/utils/JQuery'

export default class TabsCollection {
  private readonly rootSelector = tabsSelector

  constructor() {
    document.querySelectorAll(this.rootSelector).forEach((element: Element) => {
      new Tabs($(element))
    })
  }
}
