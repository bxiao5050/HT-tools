#登录

测试服 `http://10.10.3.144:8081/`    
正式服 `https://activity.pocketgamesol.com/`

##登录流程

![login](/img/login.png)

##接口

| 类型 | URL | 请求方式  | 
| :----:   | :----  | :----: | 
| SDK账号登录    | ${ipport}/user/sdk/login | GET   | 
| facebook登录  | ${ipport}/user/fb/login | GET   | 
| 区服获取    | ${ipport}/user/sdk/zones | GET   | 
| 角色信息获取    | ${ipport}/user/player/list | GET   | 

## SDK账号登录
* 参数信息

请求参数： 

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| userName    | string | true |  用户名 | 
| password    | string | true |  账号密码 | 
| version    | string | true |  版本信息,除法国，德国使用`de`外其余用`v3` | 

返回参数：

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| token    | string | true |  用户认证令牌 | 
| userId   | string | true |  角色Id | 
| userName | string | true |  用户名 | 


* 请求：
```js
$.ajax({
    type: "GET",
    url: config.api.server + config.api.login,
    data: {
        userName: username,
        password: md5(password),
        version: config.data.version
    },
    success: function (result) {
        handleLogin(result);
    },
    error: function (err) {
        console.log(err);
    }
})

```
* 返回数据格式：
```
{
    code: 200,
    state: {
        "userId":"67750133",
        "userName":"Qiong@9266.com",
        "token":"6b65bc6c-5f46-4dbb-893f-107fdfb613f5"
    }
}

```
___


##facebook登录
* 参数信息

请求参数： 

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| clientId    | string | true |  appId | 
| redirectUrl    | string | true |  facebook回调地址 | 
| code    | string | true |  FB授权返回的code值 | 

返回参数同sdk登录


* 跳转授权页：
```
    var random = Math.random() * 1000;
    var loginURL = "https://www.facebook.com/v2.6/dialog/oauth?client_id=" + config.data.fbId
        + "&redirect_uri=" + encodeURIComponent(config.api.redirectUrl) + "&r=" + random;
    window.location.href = loginURL;
    //fbId 位应用id，redirect_uri为回调地址（需在应用内配置）
    
```

* 请求：
 
```
$.ajax({
    type: "GET",
    url: config.api.server+config.api.fbLogin,
    data: {
        clientId: config.data.appId,
        redirectUrl: config.api.redirectUrl,
        code: FB_CODE  //FB授权返回时带回的code
    },
    beforeSend: function(){
        $("#loading").show();
    },
    success: function (result) {
        handleLogin(result);
    },
    error: function (err) {
        console.log(err);
    }
});

``` 
___

##获取区服
* 参数信息

请求参数： 

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| appId    | number | true |  appId | 
| token    | string | true |  用户认证令牌 | 

返回参数：

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| appId    | number | true |  appId | 
| gameZoneId    | number | true |  区服Id | 
| localName    | string | true |  区服名称（部分游戏没有配置） | 
| mainGameZoneId    | number | true |  主区id（获取角色时传这个） | 
| thirdGameZoneId    | string | true |  三方区服id(通常展示这个) | 

* 请求

```
$.ajax({
    type: "GET",
    url: config.api.server+config.api.zone,
    async: false,
    data: {
        appId: config.data.appId,
        token: localStorage.token
    },
    success: function (result) {
        //to do
    },
    error: function (err) {
        console.log(JSON.stringify(err));
    }
});

```

* 返回数据格式：
```
{
    code: 200,
    state: [
        {
            appId: 10052
            gameZoneId: 5,
            localName: "",
            mainGameZoneId: 5,
            thirdGameZoneId:"1"
        }
        ...
    ]

}
```
___
## 获取角色信息

* 参数信息

请求参数： 

| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| appId    | number | true |  appId | 
| gameZoneId    | string | true |  区服Id | 
| token    | string | true |  用户认证令牌 | 

返回参数： 


| 名称 | 类型 | 是否必需  | 备注 |  
| :----:   | :----  | :----: | :----: | 
| createDate    | string | true |  账号创建日期 | 
| lastLoginDate    | string | true |  账号最后一次登录日期 | 
| level    | string | true |  角色等级 | 
| playerId    | string | true |  角色Id | 
| playerName    | string | true |  角色名 | 

* 请求

```
$.ajax({
    type: "GET",
    url: config.api.server+config.api.role,
    data: {
        appId: config.data.appId,
        gameZoneId: zoneId,
        token: localStorage.token
    },
    success: function (result) {
      //to do
    },
    error: function (err) {
        console.log(JSON.stringify(err));
    }
});
```

* 返回数据格式：
```
{
    code: 200,
    state: [
        {
            createDate: "2016-12-27 11:24:04",
            lastLoginDate: "018-07-10 19:28:44",
            level: 12,
            playerId: "c9f88296-734a-4d06-9316-15c93b0d2148",
            playerName: "jia"
        }
        ...
    ]
}

```
___






