import './scss/style.scss'
import errorTpl from './templates/error.hbs'
import warnTpl from './templates/warn.html'

/**
 * 
 * this is MyClass description.
 * @example
 * let myClass = new MyClass();
 */
export default class alert {

  area;
  cover;

  constructor() {
    this.area = document.createElement('alert')
    this.area.setAttribute('type', 'area')
    document.body.appendChild(this.area)
  }

  error({ msg }) {
    let error = document.createElement('alert')
    error.setAttribute('type', 'error')
    error.innerHTML = errorTpl({
      error: require('src/assets/icons/error-alert.svg'),
      close: require('src/assets/icons/close-alert.svg')
    })
    this.area.appendChild(error)
    error.querySelector('span').innerHTML = msg
    setTimeout(() => {
      error.classList.add('show')
    }, 250)
    let close = error.querySelector('.close')
    close.onclick = () => {
      this.hide(error)
    }
  }

  warn({ msg }) {
    let warn = document.createElement('alert')
    warn.setAttribute('type', 'warn')
    warn.innerHTML = warnTpl
    this.area.appendChild(warn)
    warn.querySelector('span').innerHTML = msg
    setTimeout(() => {
      warn.classList.add('show')
      setTimeout(() => {
        this.hide(warn)
      }, 3000)
    })
  }

  hide(element) {
    element.classList.remove('show')
    setTimeout(() => {
      element.remove()
    }, 300)
  }

}