# SDK 对接文档 

SDK文档为游戏接入提供登录，支付等方法

## 引入SDK

在html中引入sdk.js文件，sdk会向html中添加必要的dom元素

```

<body>
    <script type="text/javascript" src="./sdk.js"></script>
</body>

```

## 登录

* **SDK.Login**

**方法说明：**

调起登录弹窗，用户可在弹窗中进行登录注册操作，登录注册完毕后会将数据保存在本地localstorage中

```
使用方法SDK.Login()
```

## 获取用户信息

* **SDK.GetUserInfo**

**方法说明：**

* 获取用户信息

**返回参数说明：**

* **userId**: 用户id　　
* **userName**: 用户名　　
* **token**: 用户口令　　

```
使用方法SDK.GetUserInfo()
```

## 绑定区服 

* **SDK.BindZone**

**方法说明：**

* 游戏在用户登录创角后需进行区服绑定操作，否则后台无数据

**主要参数说明：**

* **userId**: 用户id
* **gameZoneId**: 区服id
* **createRole**: 是否创角，0为否，1为是
* **roleId**: 角色id
* **level**: 角色等级

```
使用方法：
    var data = {
        userId: 25086659,
        gameZoneId: 1,
        createRole: 0,
        roleId: 123,
        level: 1
    }
    SDK.BindZone(data);
```

## 调起支付 

* **SDK.Pay**

**方法说明：**

* 调起支付弹窗

**主要参数说明：**

* **userId**: 用户id
* **gameZoneId**: 区服id
* **gameOrderId**: 游戏订单id
* **roleId**: 角色id
* **roleName**: 角色名
* **level**: 角色等级
* **gameCoin**: 支付金额

```
使用方法：
     var data = {
        userId: 25086659,
        gameOrderId: Math.floor(Math.random()*100000000),//假设的订单id
        gameZoneId: 1,
        roleId: 1001,
        roleName: "karl",
        level: 12,
        gameCoin: 100
    }
    SDK.Pay(data);
```

## 调起fb分享 

* **SDK.Share**

**方法说明：**

* 调起fb分享

```
使用方法SDK.Share()
```

## FB跳转
 
* **SDK.Fb**

**方法说明：**

* 当用户安装有FB app时，调起FB app；否则，跳转粉丝页

```
使用方法SDK.Fb()
```

## Messenger跳转 

* **SDK.Messager**

**方法说明：**

* 当用户安装有messenger app时，调起messenger app；否则，跳转粉丝页

```
使用方法SDK.Messager()
```
