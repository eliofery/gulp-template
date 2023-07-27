import ButtonComponent from '@/components/ButtonComponent'

const button = new ButtonComponent('.button')

button.element.addEventListener('click', () => {
  const message = document.createElement('div')

  message.textContent = 'Нажали на кнопку'
  document.body.insertAdjacentElement('beforebegin', message)
})
