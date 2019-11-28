// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
// import vConsole from 'vconsole'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueX from 'vuex'
import routerConfig from './router'
import store from './vuex/'

import VueTouch from 'vue-touch'
import App from './App'
import MintUI from 'mint-ui'
Vue.use(MintUI)
import {
  Toast
} from 'mint-ui'

Vue.config.debug = true;

Vue.use(VueRouter)
Vue.use(VueX)
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})
Vue.use(VueTouch, {
  name: 'v-touch'
})



const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  // saveScrollPosition: true,
  // suppressTransitionError: true,
  routes: routerConfig
})

// 处理刷新的时候vuex被清空但是用户已经登录的情况
// if (window.sessionStorage.user) {
//   store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.user));
// }

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  var menus = store.state.basestore.menus
  for (var i = 0; i < menus.length; i++) {
    if (to.name == menus[i].menu_url) {
      store.dispatch("setNowMenu", menus[i]);
      break;
    }
  }
  next();
});

window.router = router
new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  store,
})
