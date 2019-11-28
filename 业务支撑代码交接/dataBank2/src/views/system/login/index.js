// import template from './login.hbs'
// import language from 'src/components/system/language/index'
// import loader from 'src/components/system/loader/index'
// import store from 'src/store/index'
// import websocket from 'src/utils/services/websocket'
// import commonMethod from 'src/utils/commonMethod'
// import api from 'src/services/api'


// /**
//  * 
//  * this is MyClass description.
//  * @example
//  * 
//  * let myClass = new MyClass();
//  */

// export default class Login {

//   /**
//    * 登录模块的Dom容器的最外层id
//    * 
//    * @type {string}
//    */
//   static id = 'login-container';

//   /**
//    * 默认进入的系统id
//    * 
//    * @type {number}
//    */
//   static defaultSystemId = 2;

//   /**
//    * 登录模块的Dom容器的最外层id
//    * 
//    * @type {alert}
//    */
//   static alert;

//   /**
//    * 返回一个登录模块的背景图地址
//    * 
//    * @returns {string}
//    */
//   static background = (() => {
//     return require('src/assets/login/bg1.jpg')
//   })()

//   /**
//    * 返回登录模块的html模板数据
//    * 
//    * @returns {string}
//    */
//   static template = (() => {
//     return template({
//       language: language.language.login,
//       background: Login.background,
//     })
//   })()

//   /**
//    * 模板数据初始化，开始执行渲染
//    * 
//    * @param {{alert:alert}} [objectPattern] this is object param.
//    */
//   static initRender({
//     alert
//   }) {

//     console.log(12345)

//     Login.alert = alert
//     let section;
//     section = document.createElement('section')
//     section.id = this.id;
//     section.innerHTML = this.template()
//     app.appendChild(section)

//     section = document.createElement('section')
//     section.id = language.id;
//     section.innerHTML = language.getTemplate()
//     app.appendChild(section)

//     section = document.createElement('section')
//     section.id = loader.id;
//     section.innerHTML = loader.getTemplate()
//     app.appendChild(section)

//     language.watchOptionChange(() => {
//       self[this.id].innerHTML = this.template()
//     })

//     // self.toLogin = this.toLogin;
//     // toLogin.call(this)
//   }

//   /**
//    * 登录
//    * 
//    */
//   static toLogin() {
//     var username = 'weiqiang.yu' // self['login-username'].value;
//     var password = 'yu941103' // self['login-password'].value;

//     if (!username || !password) {
//       Login.Utils.Notification.error({
//         msg: '请输入用户名和密码'
//       });
//       return false;
//     }

//     var params = {
//       userName: username,
//       password: password,
//       language: language.curLanguage
//     }
//     api.user
//       .loginSystem(params)
//       .done((data) => {
//         Login.alert.warn({
//           msg: data.message
//         })
//         if (data.code == 301) {
//           websocket.initConnect();
//           let userInfo = {
//             userName: username,
//             nickName: data.state.userName
//           }
//           store.commit('initUserInfo', userInfo)
//           if (data.state.userGame.length > 0) {
//             Login.gamesDataset({
//               userGame: data.state.userGame
//             })
//             commonMethod.changeGame()
//           } else {
//             Login.Utils.Notification.error({
//               msg: "无任何游戏权限!"
//             })
//           }
//         }
//       })
//   }

//   /**
//    * 登录数据初始化
//    * 
//    */
//   static gamesDataset({
//     userGame
//   }) {
//     var systems = {};
//     userGame.forEach(game => {
//       let systemId = game.systemId
//       if (!systems[systemId]) {
//         if (!systems.systemId && !this.defaultSystemId) {
//           systems.systemId = systemId
//         } else if (!systems.systemId && this.defaultSystemId) {
//           systems.systemId = this.defaultSystemId
//         }
//         systems[systemId] = {
//           id: game.systemId,
//           name: game.systemName,
//           children: []
//         }
//         systems[systemId].children.push({
//           id: game.gameId,
//           name: game.GameName
//         })
//       } else {
//         systems[systemId].children.push({
//           id: game.gameId,
//           name: game.GameName
//         })
//       }
//     })
//     store.commit('setSystems', systems)
//   }
// }

{

}