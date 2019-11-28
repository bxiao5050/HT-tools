import Vue from 'vue'
import 'src/scss/style.scss'
import {
  Tag,
  select,
  option,
  DatePicker,
  Card,
  Input,
  Table,
  TableColumn,
  pagination,
  RadioGroup,
  RadioButton,
  Notification,
  Radio,
  Button,
  Tabs,
  TabPane,
  ButtonGroup,
  Checkbox
} from 'element-ui'
Vue.use(Checkbox)
Vue.use(ButtonGroup)
Vue.use(Tag)
Vue.use(select)
Vue.use(Input)
Vue.use(option)
Vue.use(DatePicker)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(pagination)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Radio)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.prototype.$notify = Notification;
import myRow from 'src/component/layout/row'
import myCol from 'src/component/layout/col'
import myCard from 'src/component/ui/card'
Vue.use(myRow)
Vue.use(myCol)
Vue.use(myCard)
import {
  sync
} from 'vuex-router-sync'
import router from 'src/router'
import store from 'src/store'
import VueI18n from 'vue-i18n' //多语言插件
import messages from 'src/lang' // 多语言配置文件
Vue.use(VueI18n)
var lang = localStorage.lang || 'CHS' // 当前语言

Number.prototype.format = String.prototype.format = function (number) {
  var {
    round,
    pow
  } = Math
  if (isNaN(this) || !isFinite(this)) {
    return 0
  } else {
    var rate = pow(10, number)
    return round(this * rate) / rate
  }
}

const i18n = new VueI18n({
  locale: lang, // 当前语言
  fallbackLocale: 'CHS', // 当多语言字段不存在时使用的语言
  messages, // 多语言配置
})
import VueAwesomeSwiper from 'vue-awesome-swiper' //轮播图插件
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
window.daterangepicker = {}
import Loader from 'src/views/system/loader/loader.js'
router.beforeEach((to, from, next) => {
  Loader.load()
  next()
})
router.afterEach(() => {
  Loader.loadclose()
  window.scrollTo(0, 0);
})
// sync(store, router)()
new Vue({
  el: '#app',
  store,
  router,
  i18n,
  template: '<router-view></router-view>',
})


