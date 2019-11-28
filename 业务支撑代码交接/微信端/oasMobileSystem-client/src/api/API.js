/**
 * Created by xiaoyi on 2016/12/26 0026.
 */
import axios from 'axios'
import {axiosConfig} from './config'

export default  {
  request(action, param) {
    action.method = action.method ? action.method : 'get'; // defalut get 请求
    return axios[action.method](action.url, param, axiosConfig);
  }

};
