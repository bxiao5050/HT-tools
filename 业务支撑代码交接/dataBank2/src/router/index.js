import Vue from 'vue'
import router from 'vue-router'
import store from 'src/store'
import menuConfig from 'src/config/menuConfig'

Vue.use(router);

const routes = [{
    path: '/',
    redirect: '/login',
    component: (resolve) => require(['src/views/layout.vue'], resolve),
    children: [{
        path: 'callPage',
        name: 'callPage',
        component: (resolve) => require(['src/views/modules/callPage.vue'], resolve)
      },
      // {
      //   path:'game-overview',
      //   component: (resolve) => require(['src/views/modules/overview/game-overview'], resolve)
      // }
    ]
  },
  {
    path: '/login',
    component: (resolve) => require(['src/views/system/login/login.vue'], resolve)
  }, {
    path: '*',
    redirect: 'login'
  }
]
for (let i in menuConfig) {
  routes[0]
    .children
    .push({
      path: menuConfig[i].name,
      beforeEnter: Authentication.bind(i),
      component: menuConfig[i].component
    })
}

export default new router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: routes
})

// export { router_ as router, store }

// console.log(router_, '@@@@@@')

function Authentication(to, from, next) {
  if (store.state.common.userInfo === null) {
    // store.state.Common.curPath = to
    // Utils.Notification.error({ message: '用户信息过期，请重新登录' })
    next('login')
  } else {
    //
    next()
  }
}