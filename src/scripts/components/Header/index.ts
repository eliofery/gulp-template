import IBase from '@/components/Base'
import { StateClass } from '@/constants'
import { $, type JQuery } from '@/utils/JQuery'
import { type Selectors } from '@/components/Header/types'

export default class Header extends IBase {
  private rootElement!: JQuery
  private overlayElement!: JQuery
  private burgerButtonElement!: JQuery

  private readonly selectors: Selectors = {
    root: '[data-js-header]',
    overlay: '[data-js-header-overlay]',
    burgerButton: '[data-js-header-burger-button]',
  }

  constructor() {
    super()

    this.init()
    this.bindEvents()
  }

  protected init(): void {
    this.rootElement = $(this.selectors.root)
    this.overlayElement = $(this.selectors.overlay)
    this.burgerButtonElement = $(this.selectors.burgerButton)
  }

  protected bindEvents(): void {
    this.burgerButtonElement.on('click', this.onBurgerButtonClick.bind(this))
  }

  private onBurgerButtonClick() {
    this.burgerButtonElement.classToggle(StateClass.IsActive)
    this.overlayElement.classToggle(StateClass.IsActive)
    document.body.classList.toggle(StateClass.IsLock)
  }
}
