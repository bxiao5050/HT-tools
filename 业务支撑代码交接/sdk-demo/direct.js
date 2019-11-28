const server = {
  appId: 10116,
  appKey: "b586ea8260744d3bb045b488ed6658af",
  advChannel: 30001,
  fbId: 576748762692133
};
const url = "/pocketgames/client/user/v3/login";
const redirect_uri = "http://res-vndbjh.bilivfun.com/index.html";
const login_uri = "./index.html";

const signed = function (params) {
  var str = "";
  for (var key in params) {
    str += params[key];
  }
  return md5(str + server.appKey);
};

const deviceMsg = function () {
  var arr = ["source", "advChannel", "network", "model", "operatorOs", "deviceNo", "device", "version",
    "sdkVersion"
  ];
  var params = {};
  arr.forEach(function (key) {
    params[key] = "0"
  });

  var browser = {
    versions: function () {
      var u = navigator.userAgent;
      return {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
        iPad: u.indexOf('iPad') > -1,
        android: u.indexOf('Android') > -1
      };
    }(),
  };

  if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
    params.source = 0;
    params.deviceNo = "IDFV";
    params.device = "IDFV";
  } else if (browser.versions.android) {
    params.source = 1;
    params.deviceNo = "IMEI";
    params.device = "MAC#ANDRIDID";
  } else {
    params.source = 3;
  }
  params.network = 0;
  params.appId = server.appId;
  params.advChannel = server.advChannel;

  return params;
};

const HTTPUtil = function (url, params) {
  var body = "";

  if (params) {
    var paramsArray = [];
    Object.keys(params).forEach(function (key) {
      paramsArray.push(key + '=' + params[key])
      body = paramsArray.join('&');
    })
  }

  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText), this)
        } else {
          var resJson = {
            code: this.status,
            response: this.response
          }
          reject(resJson, this)
        }
      }
    }
    xhr.send(body);
  }).catch(function (err) {
    console.log(err);
  })
};

const LoginRequest = function (url, params) {
  HTTPUtil(url, params).then(function (res) {
    if (res.code == 200) {
      var data = {
        accountType: res.data.accountType,
        userId: res.data.userId,
        userName: res.data.userName,
        userType: res.data.userType,
        password: account.password,
        token: res.token,
        activeTime: new Date().getTime()
      };

      localStorage.setItem("account", JSON.stringify(data));
      var paramsArray = [];
      var urlData = {
        userId: res.data.userId,
        token: res.token,
        activeTime: new Date().getTime()
      };
      // if (params.source == 0) {
      //   urlData.ch = "IOS"
      // } else if (params.source == 1) {
      //   urlData.ch = "Android"
      // } else {
      //   urlData.ch = "PC"
      // }

      Object.keys(urlData).forEach(function (key) {
        paramsArray.push(key + '=' + urlData[key])
      });
      var url = redirect_uri + '?' + paramsArray.join('&');
      // 请求成功直接登录
      // console.log(url)
      window.location = url;
    } else {
      // 请求失败跳转登录页
      window.location = login_uri;
      // console.log(login_uri);
    }
  })
};

const reqLogin = function (username, password) {
  var data = deviceMsg();
  data.appId = server.appId;
  data.userName = username;
  data.password = password;
  data.sign = signed({
    appId: server.appId,
    userName: username,
    password: password,
    source: data.source
  });
  LoginRequest(url, data)
};

var account = localStorage.getItem("account");
if (account) {
  account = JSON.parse(account);
  if (account.userName && account.password) {
    reqLogin(account.userName, account.password);
  } else {
    window.location.href = login_uri;
  }
} else {
  window.location.href = login_uri;
}
window.test = function () {
  console.log(account);
  console.log(account.userName && account.password);
}
