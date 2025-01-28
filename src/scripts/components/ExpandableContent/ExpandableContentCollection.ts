import { rootSelector } from '@/components/ExpandableContent/consts'
import { $ } from '@/utils/JQuery'
import ExpandableContent from '@/components/ExpandableContent/index'

export default class ExpandableContentCollection {
  private readonly rootSelector = rootSelector

  constructor() {
    document.querySelectorAll(this.rootSelector).forEach((element: Element) => {
      new ExpandableContent($(element))
    })
  }
}
