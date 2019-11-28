import template from './tpl/loader.hbs'
import './style.scss'
import loadingTpl from './tpl/loading.hbs'
export default class Loader {



  /**
   * test
   * @type {string}
   */
  static id = 'loader-container';

  static icon = require('src/assets/loader/loading.svg')

  // static jqueryLoader() {
  // System.import('Bower/jquery/src/jquery')
  //   .then(() => {
  //     console.log('jquery is loaded complete')
  //   })
  // }

  // static vueLoader() {
  // System.import('./lazyload.js')
  //   .then(() => {
  //     console.log('vue router vuex .... is loaded complete')
  //   })
  // }

  static getTemplate() {
    return template({
      icon: this.icon
    }
    )
  }


  static loading = (() => {
    let loading = document.createElement('loading')
    loading.classList.add('core-hide')
    document.body.appendChild(loading)
    let cover = document.createElement('div')
    cover.setAttribute('type', 'cover')
    loading.appendChild(cover)
    let dom = document.createElement('div')
    dom.setAttribute('type', 'loading')
    dom.innerHTML = loadingTpl({})
    loading.appendChild(dom)
    return loading
  })()
  static loadCount = 0
  static load() {
    this.loadCount++;
    this.loading.classList.remove('core-hide')
    // console.log(this.loadCount,'add')
  }
  static loadend() {
    this.loadCount--;
    this.loadCount === 0 && this.loading.classList.add('core-hide')
    // console.log(this.loadCount,'sub')
  }
  static loadclose() {
    this.loadCount = 0
    this.loading.classList.add('core-hide')
  }
  static loadclickclose() {
    this.loading.classList.add('core-hide')
  }
}