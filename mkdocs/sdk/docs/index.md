# JavaScript 版 RoyalGame SDK v2.1

提供登录， 绑定区服，支付 等功能

## 快速入门

JavaScript 版 SDK 无需下载和安装任何独立文件，您只需在 HTML 中添加一小段正确的 JavaScript，即可将 SDK 异步加载至您的页面。异步加载不会阻止浏览器加载页面的其他元素。

以下代码片段将提供基础版的 SDK，其中的选项将设置为最常用的默认设置。请直接将此代码片段插入想要加载 SDK 的每个页面的开始 `<body>` 标签之后：

```
window.rgAsyncInit = function () { // SDK has logined completely, please code below
    ````
}
// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://sdk-vn.pocketgamesol.com/jssdk/v2.1/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'royalgame-jssdk'));
```
```
德国的sdk主机域名       https://sdk-de.pocketgamesol.com
新加坡的sdk主机域名     https://sdk-sg.pocketgamesol.com
越南的sdk主机域名       https://sdk-vn.pocketgamesol.com

jssdk静态文件地址       ${HOST}/jssdk/v2.1/sdk.js
```

## 登录

在SDK加载完成以后 SDK会自动调起登录弹窗等相关操作，用户可在弹窗中进行登录注册操作，登录/注册完毕后会将数据保存在本地localstorage中, 然后执行全局初始化函数 rgAsyncInit

* **window.rgAsyncInit**

* 全局的初始化函数


## 获取当前用户信息

* **RG.CurUserInfo**

**方法说明：**

* 获取当前用户信息

**返回参数说明：**

* **userId**: 用户id　　
* **userName**: 用户名　　
* **token**: 用户口令　　

**使用方法：**
```
    var curUser = RG.CurUserInfo()
```

## 绑定区服 

* **RG.BindZone**

**方法说明：**

* 游戏在用户登录创角后需进行区服绑定操作，否则后台无数据

**主要参数说明：**

* **userId**: 用户id
* **gameZoneId**: 区服id
* **createRole**: 是否创角，0为否，1为是
* **roleId**: 角色id
* **level**: 角色等级

**返回参数说明：**

```
    RG.BindZone(data): Promise<Res>

    Res: {
        code: number  // 200 为绑定成功
        error_msg: string
    }
```
**使用方法：**
```
    var data = {
        userId: 25086659,
        gameZoneId: 1,
        createRole: 0,
        roleId: 123,
        level: 1
    }
    RG.BindZone(data).then(data=>{
        if(data.code === 200) { // 绑定完成
            ...
        }
    });
```

## 调起支付 

* **RG.Pay**

<!-- * **RG.hasProducts** -->

**方法说明：**

* 调起支付弹窗

<!-- * RG.hasProducts: boolean 用于判断是否为facebook支付 -->

**主要参数说明：**

* **userId**: 用户id
* **gameZoneId**: 区服id
* **gameOrderId**: 游戏订单id
* **roleId**: 角色id
* **roleName**: 角色名
* **level**: 角色等级
* **gameCoin**: 支付金额
<!-- * **product_id ?(not required)**: 购买的商品ID; 目前只有facebook支付需要用到， 具体的商品id由平台方提供 -->

```
使用方法：
     var data = {
        userId: 25086659,
        gameOrderId: 86353509, // 假设的订单id
        gameZoneId: 1,
        roleId: 1001,
        roleName: "role name",
        level: 12,
        gameCoin: 100
    }

    RG.Pay(data)
```
  <!-- if(RG.hasProducts) {
        data.product_id = "xxxxxxx" // 具体的商品id由平台方提供
        RG.Pay(data)
    } else {
        RG.Pay(data)
    } -->


## 调起FB分享 

* **RG.Share**

**方法说明：**

* 调起FB分享

```
    RG.Share(ShareUrl): Promise<Res>

    Res: {
        code: number  // 200 为分享成功
        error_msg?: string
    }
```
**使用方法：**
```
    RG.Share('https://some-gaming-address-to-share.com').then(data => {
        if(data.code === 200) { // 分享成功
            ...
        }
    })
```

## 打点
 
* **RG.Mark**

**方法说明：**

* 通过调用Mark方法，传入对应的打点名即可完成打点

```
使用方法 RG.Mark(markName: string): void
```

## FB跳转
 
* **RG.Fb**

**方法说明：**

* 当用户安装有FB app时，调起FB app；否则，跳转粉丝页

```
使用方法 RG.Fb()
```

## Messenger跳转 

* **RG.Messager**

**方法说明：**

* 当用户安装有messenger app时，调起messenger app；否则，跳转粉丝页

```
使用方法 RG.Messager()
```

## Install 跳转 web移动端添加桌面收藏 

* **RG.Install**

**方法说明：**

* 跳转至 添加桌面收藏的 引导页面 

```
使用方法:
    RG.Install && RG.Install() // 此方法只能在web端调用
```


