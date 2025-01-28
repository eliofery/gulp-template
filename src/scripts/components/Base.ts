export default abstract class Base {
  protected abstract init(): void

  protected abstract bindEvents(): void

  protected getProxyState<T extends Record<string, T[keyof T]>>(initialState: T): T {
    return new Proxy(initialState, {
      get: (target: T, prop: string | symbol) => target[prop as keyof T],
      set: (target: T, prop: string | symbol, newValue: T[keyof T]) => {
        const oldValue = target[prop as keyof T]

        target[prop as keyof T] = newValue

        if (newValue !== oldValue) {
          this.updateUI()
        }

        return true
      },
    })
  }

  protected updateUI() {
    throw new Error('Необходимо реализовать метод updateUI')
  }
}
