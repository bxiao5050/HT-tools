/**
 * Created by karl.zheng on 2018/2/1.
 */
import 'whatwg-fetch'

const HTTPUtil = function(url, params){
    let body = "";

    if(params){
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key+'='+params[key]))
        // if(url.search(/\?/)==-1){
        //     url += '?' + paramsArray.join('&');
        // }else{
        //     url += '&' +paramsArray.join('&');
        // }
        body = paramsArray.join('&');
    }

    return new Promise(function(resolve, reject){
        // fetch(url, {
        //     method: 'POST',
        //     mode: "no-cors",
        //     cache: 'default',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     credentials: 'include',
        //     body: body
        // }).then((response) => {
        //     console.log(response);
        //     if(response.ok){
        //         return resolve(response.json());
        //     }else{
        //         reject({status: response.status})
        //     }
        // }).then((response) => {
        //     resolve(response)
        // }).catch((err) => {
        //     reject({status: -1});
        // })
        var xhr = new XMLHttpRequest()
        xhr.open("POST", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = { code: this.status, response: this.response }
                    reject(resJson, this)
                }
            }
        }

        xhr.send(body);

    }).catch((err) => {
        console.log(err);
    })
}

//添加Get请求
const HTTPGet = (url, params) => {
    let body = "";
    if(params){
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(params[key]))
        body = paramsArray.join('/');
    }
    url += body;
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest()
        xhr.open("GET", url, true)
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText), this)
                } else {
                    var resJson = {code: this.status, response: this.response}
                    reject(resJson, this)
                }
            }
        }

        xhr.send();
    }).catch((err) => {
        console.log(err);
    })
};

module.exports = {
    HTTPUtil: HTTPUtil,
    HTTPGet: HTTPGet
}