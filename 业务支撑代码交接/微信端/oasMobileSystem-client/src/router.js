/**
 * Created by jo.chan on 2016/10/31.
 */

export default [{
  path: '/',
  name: 'index',
  component: require('./view/index.vue'),
  children: [
    {
    path: '/fiveForce',
    name: 'fiveForce',
    component: require('./view/module/fiveForce.vue')
  }, {
    path: '/fiveMin',
    name: 'fiveMin',
    component: require('./view/module/fiveMin.vue')
  }, {
    path: '/newUserRetain',
    name: 'newUserRetain',
    component: require('./view/module/newUserRetain.vue')
  },{
    path: '/gameGK',
    name: 'gameGK',
    component: require('./view/module/gameGK.vue')
  }, {
    path: '/dataRepair',
    name: 'dataRepair',
    component: require('./view/module/dataRepair.vue')
  }, {
    path: '/launchReport',
    name: 'launchReport',
    component: require('./view/module/launchReport.vue')
  }, {
      path: '/gameReport',
      name: 'gameReport',
      component: require('./view/module/gameReport.vue')
    }, {
      path: '/hourlyReport',
      name: 'hourlyReport',
      component:resolve => require(['./view/module/hourlyReport.vue'], resolve)
    }]
}, {
  path: '/bind',
  name: 'bind',
  component: require('./view/bind.vue')
}, {
  path: '/checkBind',
  name: 'checkBind',
  component: require('./view/check-bind.vue')
}, {
  path: '/foget',
  name: 'foget',
  component: require('./view/foget.vue')
}, {
  path: '/login',
  name: 'login',
  component: require('./view/login.vue')
}, {
  path: '/game',
  name: 'game',
  component: require('./view/game.vue')
}, {
  path: '/agent',
  name: 'agent',
  component: require('./view/agent.vue')
}, {
  path: '/lanuchArea',
  name: 'lanuchArea',
  component: require('./view/launch-area.vue')
}, {
  path: '*',
  redirect: {
    name: 'login'
  }
}]
