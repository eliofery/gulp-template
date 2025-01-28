export type Selectors = {
  root: string
  originalControl: string
  button: string
  dropdown: string
  option: string
}

export type StateAttributes = {
  ariaExpanded: string
  ariaSelected: string
  ariaActiveDescendant: string
}

export type State = {
  isExpanded: boolean
  currentOptionIndex: number | null
  selectedOptionElement: Element | null
}
