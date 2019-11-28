/**
 * Created by xiaoyi on 2016/12/26 0026.
 */
export const axiosConfig = {
  baseURL: 'http://wx.data.7road.com/',
  timeout: 5000,
  responseType: 'json', // default
  maxRedirects: 5 // default
}

// method 必须小写
export const actionConfig = {
  user: {
    bind: { // 绑定帐号
      url: 'userPerm',
      method: "post"
    },
    unbind: {
      url: '',
      method: 'post'
    },
    login: {
      url: '',
      method: 'post'
    },
    logout: {
      url: '',
      method: 'post'
    }
  },
  data:{
    realTime:{
      url:''
    },
    wuLi:{
      url:''
    }
  }
}
