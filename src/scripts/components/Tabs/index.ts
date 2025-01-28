import { type Selectors, State, StateAttributes } from '@/components/Tabs/types'
import { tabsSelector } from '@/components/Tabs/consts'
import type { JQuery } from '@/utils/JQuery'
import { StateClass } from '@/constants'
import Base from '@/components/Base'

export default class Tabs extends Base {
  private buttonElements!: JQuery[]
  private contentElements!: JQuery[]
  private state!: State
  private limitTabsIndex!: number

  private readonly selectors: Selectors = {
    root: tabsSelector,
    button: '[data-js-tabs-button]',
    content: '[data-js-tabs-content]',
  }

  private readonly stateAttributes: StateAttributes = {
    ariaSelected: 'aria-selected',
    tabIndex: 'tabindex',
  }

  constructor(private rootElement: JQuery) {
    super()

    this.init()
    this.bindEvents()
  }

  protected init(): void {
    this.buttonElements = this.rootElement.findAll(this.selectors.button)
    this.contentElements = this.rootElement.findAll(this.selectors.content)

    // Вариант без прокси
    // this.state = {
    //   activeTabIndex: [...this.buttonElements].findIndex(buttonElement =>
    //     buttonElement.classContains(StateClass.IsActive),
    //   ),
    // }

    // Вариант с прокси
    this.state = this.getProxyState({
      activeTabIndex: [...this.buttonElements].findIndex(buttonElement =>
        buttonElement.classContains(StateClass.IsActive),
      ),
    })

    this.limitTabsIndex = this.buttonElements.length - 1
  }

  protected bindEvents(): void {
    this.buttonElements.forEach((buttonElement, index) => {
      buttonElement.on('click', this.onClickButton.bind(this, index))
    })

    this.rootElement.on('keydown', this.onKeyDown.bind(this))
  }

  protected updateUI() {
    this.buttonElements.forEach((buttonElement: JQuery, index: number): void => {
      const { activeTabIndex } = this.state
      const isActive = index === activeTabIndex

      buttonElement.classToggle(StateClass.IsActive, isActive)
      buttonElement.attr(this.stateAttributes.ariaSelected, isActive.toString())
      buttonElement.attr(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
    })

    this.contentElements.forEach((contentElement: JQuery, index: number): void => {
      const { activeTabIndex } = this.state
      const isActive = index === activeTabIndex

      contentElement.classToggle(StateClass.IsActive, isActive)
    })
  }

  private onClickButton(buttonIndex: number) {
    this.state.activeTabIndex = buttonIndex

    // this.updateUI()
  }

  private onKeyDown(event: Event): void {
    const { code, metaKey } = event as KeyboardEvent

    const action = {
      ArrowLeft: this.previousTab.bind(this),
      ArrowRight: this.nextTab.bind(this),
      Home: this.firstTab.bind(this),
      End: this.lastTab.bind(this),
    }[code]

    if (code === 'Home' || code === 'End') {
      event.preventDefault()
    }

    const isMacHomeKey = metaKey && code === 'ArrowLeft'
    if (isMacHomeKey) {
      this.firstTab()
      // this.updateUI()

      return
    }

    const isMacEndKey = metaKey && code === 'ArrowRight'
    if (isMacEndKey) {
      this.lastTab()
      // this.updateUI()

      return
    }

    action?.()
    // this.updateUI()
  }

  private toggleTab(newTabIndex: number) {
    this.state.activeTabIndex = newTabIndex
    this.buttonElements[newTabIndex].focus()
  }

  private previousTab() {
    const newTabIndex = this.state.activeTabIndex === 0 ? this.limitTabsIndex : this.state.activeTabIndex - 1

    this.toggleTab(newTabIndex)
  }

  private nextTab() {
    const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex ? 0 : this.state.activeTabIndex + 1

    this.toggleTab(newTabIndex)
  }

  private firstTab() {
    this.toggleTab(0)
  }

  private lastTab() {
    this.toggleTab(this.limitTabsIndex)
  }
}
