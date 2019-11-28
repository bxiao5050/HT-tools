import vue from 'vue'
import store  from 'src/store'
import router from 'src/router'

let instance = {
  el: '#app',
  store,
  router,
  template: '<router-view></router-view>'
}

export {
  vue,
  instance
}