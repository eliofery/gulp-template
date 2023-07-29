import ButtonComponent from '@/components/ButtonComponent'

const button = new ButtonComponent('.button')

button.element.addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('.header').clientHeight,
    behavior: 'smooth',
  })
})
