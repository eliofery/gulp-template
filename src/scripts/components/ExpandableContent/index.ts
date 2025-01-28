import Base from '@/components/Base'
import type { JQuery } from '@/utils/JQuery'
import type { Selectors } from '@/components/ExpandableContent/types'
import { rootSelector } from '@/components/ExpandableContent/consts'
import { StateClass } from '@/constants'
import { AnimationParams } from '@/components/ExpandableContent/types'
import { pxToRem } from '@/utils'

export default class ExpandableContent extends Base {
  private buttonElement!: JQuery

  private readonly selectors: Selectors = {
    root: rootSelector,
    button: '[data-js-expandable-content-button]',
  }

  private readonly animationParams: AnimationParams = {
    duration: 500,
    easing: 'ease',
  }

  constructor(private rootElement: JQuery) {
    super()

    this.init()
    this.bindEvents()
  }

  protected init(): void {
    this.buttonElement = this.rootElement.find(this.selectors.button)
  }

  protected bindEvents(): void {
    this.buttonElement.on('click', this.onButtonClick.bind(this))
  }

  private expand() {
    const element = this.rootElement.getElement() as HTMLElement
    const { offsetHeight, scrollHeight } = element

    this.rootElement.classAdd(StateClass.IsExpanded)
    element.animate(
      [
        {
          maxHeight: `${pxToRem(offsetHeight)}rem`,
        },
        {
          maxHeight: `${pxToRem(scrollHeight)}rem`,
        },
      ],
      this.animationParams,
    )
  }

  private onButtonClick() {
    this.expand()
  }
}
