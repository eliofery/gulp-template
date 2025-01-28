import type { JQuery } from '@/utils/JQuery'
import type { Selectors, State, StateAttributes } from '@/components/Select/types'
import { rootSelector } from '@/components/Select/consts'
import Base from '@/components/Base'
import { MatchMedia, StateClass } from '@/constants'

/**
 * See: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 */
export default class Select extends Base {
  private originalControlElement!: JQuery
  private buttonElement!: JQuery
  private dropdownElement!: JQuery
  private optionElements!: JQuery[]
  private state!: State

  private readonly selectors: Selectors = {
    root: rootSelector,
    originalControl: '[data-js-select-original-control]',
    button: '[data-js-select-button]',
    dropdown: '[data-js-select-dropdown]',
    option: '[data-js-select-option]',
  }

  private readonly stateAttribute: StateAttributes = {
    ariaExpanded: 'aria-expanded',
    ariaSelected: 'aria-selected',
    ariaActiveDescendant: 'aria-activedescendant',
  }

  private readonly initialState: State = {
    isExpanded: false,
    currentOptionIndex: null,
    selectedOptionElement: null,
  }

  constructor(private rootElement: JQuery) {
    super()

    this.init()
    this.bindEvents()
  }

  protected init() {
    this.originalControlElement = this.rootElement.find(this.selectors.originalControl)
    this.buttonElement = this.rootElement.find(this.selectors.button)
    this.dropdownElement = this.rootElement.find(this.selectors.dropdown)
    this.optionElements = this.dropdownElement.findAll(this.selectors.option)

    const selectedIndex = (this.originalControlElement.getElement() as HTMLSelectElement).selectedIndex
    this.state = this.getProxyState({
      ...this.initialState,
      currentOptionIndex: selectedIndex,
      selectedOptionElement: this.optionElements[selectedIndex].getElement(),
    })

    this.fixDropdownPosition()
    this.updateTabIndexes()
  }

  protected onMobileMatchMediaChange = (evt: MediaQueryListEvent) => {
    this.updateTabIndexes(evt.matches)
  }

  get isNeedToExpand() {
    const isButtonFocused = document.activeElement === this.buttonElement.getElement()

    return !this.state.isExpanded && isButtonFocused
  }

  protected selectCurrentOption = () => {
    if (this.state.currentOptionIndex) {
      this.state.selectedOptionElement = this.optionElements[this.state.currentOptionIndex].getElement()
    }
  }

  protected onButtonClick = () => {
    this.toggleExpandedState()
  }

  protected onClick = (evt: Event) => {
    const target = evt.target as HTMLElement
    const isOutsideDropdownClick = target.closest(this.selectors.dropdown) !== this.dropdownElement.getElement()
    const isButtonClick = target === this.buttonElement.getElement()

    if (!isButtonClick && isOutsideDropdownClick) {
      this.collapse()
      return
    }

    const isOptionClick = target.matches(this.selectors.option)

    if (isOptionClick) {
      this.state.selectedOptionElement = target
      this.state.currentOptionIndex = [...this.optionElements].findIndex(
        optionElement => optionElement.getElement() === target,
      )
      this.collapse()
    }
  }

  protected onArrowUpKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex === null) {
      return
    }

    if (this.state.currentOptionIndex > 0) {
      this.state.currentOptionIndex--
    }
  }

  protected onArrowDownKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    if (this.state.currentOptionIndex === null) {
      return
    }

    if (this.state.currentOptionIndex < this.optionElements.length - 1) {
      this.state.currentOptionIndex++
    }
  }

  protected onSpaceKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collapse()
  }

  protected onEnterKeyDown = () => {
    if (this.isNeedToExpand) {
      this.expand()
      return
    }

    this.selectCurrentOption()
    this.collapse()
  }

  protected onKeyDown = (evt: Event) => {
    const { code } = evt as KeyboardEvent
    const action = {
      ArrowUp: this.onArrowUpKeyDown,
      ArrowDown: this.onArrowDownKeyDown,
      Space: this.onSpaceKeyDown,
      Enter: this.onEnterKeyDown,
    }[code]

    if (action) {
      evt.preventDefault()
      action()
    }
  }

  protected onOriginalControlChange = () => {
    const selectedIndex = (this.originalControlElement.getElement() as HTMLSelectElement).selectedIndex

    this.state.selectedOptionElement = this.optionElements[selectedIndex].getElement()
  }

  protected bindEvents() {
    MatchMedia.mobile.addEventListener('change', this.onMobileMatchMediaChange)
    this.buttonElement.on('click', this.onButtonClick)
    document.addEventListener('click', this.onClick)
    this.rootElement.on('keydown', this.onKeyDown)
    this.originalControlElement.on('change', this.onOriginalControlChange)
  }

  protected toggleExpandedState() {
    this.state.isExpanded = !this.state.isExpanded
  }

  protected expand() {
    this.state.isExpanded = true
  }

  protected collapse() {
    this.state.isExpanded = false
  }

  protected updateUI() {
    const { isExpanded, currentOptionIndex, selectedOptionElement } = this.state
    const newSelectedOptionValue = selectedOptionElement?.textContent?.trim() ?? ''

    const updateOriginalControl = () => {
      const selectElement = this.originalControlElement.getElement() as HTMLSelectElement

      selectElement.value = newSelectedOptionValue
    }

    const updateButton = () => {
      const buttonElement = this.buttonElement.getElement() as HTMLElement

      buttonElement.textContent = newSelectedOptionValue
      buttonElement.classList.toggle(StateClass.IsExpanded, isExpanded)
      buttonElement.setAttribute(this.stateAttribute.ariaExpanded, String(isExpanded))
      buttonElement.setAttribute(
        this.stateAttribute.ariaActiveDescendant,
        (this.optionElements[currentOptionIndex!].getElement() as HTMLElement).id,
      )
    }

    const updateDropdown = () => {
      const dropdownElement = this.dropdownElement.getElement() as HTMLElement

      dropdownElement.classList.toggle(StateClass.IsExpanded, isExpanded)
    }

    const updateOptions = () => {
      this.optionElements.forEach((optionItem, index) => {
        const optionElement = optionItem.getElement()
        const isCurrent = currentOptionIndex === index
        const isSelected = selectedOptionElement === optionElement

        optionElement.classList.toggle(StateClass.IsCurrent, isCurrent)
        optionElement.classList.toggle(StateClass.IsSelected, isSelected)
        optionElement.setAttribute(this.stateAttribute.ariaSelected, String(isSelected))
      })
    }

    updateOriginalControl()
    updateButton()
    updateDropdown()
    updateOptions()
  }

  protected fixDropdownPosition() {
    const viewportWidth = document.documentElement.clientWidth
    const halfViewportX = viewportWidth / 2
    const { width, x } = this.buttonElement.getElement().getBoundingClientRect()
    const buttonCenterX = x + width / 2
    const isButtonOnTheLeftViewportSide = buttonCenterX < halfViewportX

    this.dropdownElement.classToggle(StateClass.IsOnTheLeftSide, isButtonOnTheLeftViewportSide)
    this.dropdownElement.classToggle(StateClass.IsOnTheRightSide, !isButtonOnTheLeftViewportSide)
  }

  protected updateTabIndexes(isMobileDevice = MatchMedia.mobile.matches) {
    ;(this.originalControlElement.getElement() as HTMLElement).tabIndex = isMobileDevice ? 0 : -1
    ;(this.buttonElement.getElement() as HTMLElement).tabIndex = isMobileDevice ? -1 : 0
  }
}
