import api from 'src/services/api'
import store  from 'src/store'
// import websocket from 'src/utils/services/websocket'
import commonMethod from 'src/utils/commonMethod'
import router from 'src/router'


const formatMenus = (menus) => {
  var result = menus;
  for (let i = 0; i < menus.length; i++) {
    for (let j = 0; j < result[i].childrenMenu.length; j++) {
      for (let index in menuConfig) {
        if (menus[i].childrenMenu[j].menuId == index) {
          result[i].childrenMenu[j].menuUrl = menuConfig[index];
          break;
        }
      }
    }
  }
  return result;
}

export default {
  changeLanguage() {
    api.user.changeLanguage({
      language: store.state.Language.cur
    }).then(data => {
      // console.log(data)
      if (data.code == 303) {
        commonMethod.getSystemGames();
      } else {
        Utils.Notification.error({
          message: data.message
        })
      }
    })
  },
  getMenus() {
    api.user.getMenus().then(data => {
      if (data.code == 401) {
        if (data.state.length == 0) {
          Utils.Notification.error({
            message: "无任何菜单权限"
          })
          return;
        }
        var menus = formatMenus(data.state)
        store.commit("initMenus", menus)
        store.commit("selectMenu", menus[0].childrenMenu[0])
        if (router.currentRoute.name != "callPage") {
          router.replace({
            name: "callPage",
            params: {
              menu: menus[0].childrenMenu[0].menuUrl
            }
          })
        } else {
          router.push({
            name: menus[0].childrenMenu[0].menuUrl
          })
        }
      } else {
        Utils.Notification.error({
          message: data.message
        })
      }
    })
  }
}