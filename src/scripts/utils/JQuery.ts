export class JQuery {
  private readonly rootElement: Element

  constructor(selector: string | Element, rootElement: Element | null = null) {
    if (typeof selector === 'string') {
      if (rootElement) {
        this.rootElement = rootElement.querySelector(selector)!
      } else {
        this.rootElement = document.querySelector(selector)!
      }
    } else {
      this.rootElement = selector
    }

    if (!this.rootElement) {
      throw new Error(`Элемент "${selector}" не найден.`)
    }
  }

  public find(selector: string): JQuery {
    return new JQuery(selector, this.rootElement)
  }

  public findAll(selector: string): JQuery[] {
    const elements: JQuery[] = []

    document.querySelectorAll(selector).forEach(element => {
      elements.push(new JQuery(element))
    })

    if (!elements.length) {
      throw new Error(`Элементы "${selector}" не найдены.`)
    }

    return elements
  }

  public on(action: string, cb: EventListener): JQuery {
    this.rootElement.addEventListener(action, cb)

    return this
  }

  public classToggle(token: string, force?: boolean): JQuery {
    if (force !== undefined) {
      this.rootElement.classList.toggle(token, force)
      return this
    }

    this.rootElement.classList.toggle(token)

    return this
  }

  public classContains(className: string): boolean {
    return this.rootElement.classList.contains(className)
  }

  public classAdd(className: string): JQuery {
    this.rootElement.classList.add(className)

    return this
  }

  public classRemove(className: string): JQuery {
    this.rootElement.classList.remove(className)

    return this
  }

  public attr(qualifiedName: string, value: string): JQuery {
    this.rootElement.setAttribute(qualifiedName, value)

    return this
  }

  public focus(): JQuery {
    ;(this.rootElement as HTMLElement).focus()

    return this
  }

  public play(): JQuery {
    const videoElement = this.rootElement as HTMLVideoElement

    videoElement.play().then()
    videoElement.controls = true

    return this
  }

  public pause(): JQuery {
    const videoElement = this.rootElement as HTMLVideoElement

    videoElement.pause()
    videoElement.controls = false

    return this
  }

  public getElement(): Element {
    return this.rootElement
  }
}

export const $ = (selector: string | Element): JQuery => {
  return new JQuery(selector)
}
