# sdk文档

为游戏提供sdk方便对接，包含登录，注册和支付，以及FB分享，调起messenger等方法；  
具体方法可查看[游戏对接文档](http://sdk-test.changic.net.cn:8191/docs/sdk/index.html)  
下面主要介绍部分重点：  

## 登录

登录分为**平台登录**和**FB登录**  

* 平台登录调用登录接口`user/v3/login`即可；
  
* FB登录分为两步：
    * 授权并登录**facebook**，获取**fbId**；
    * 使用**fbId**调用注册接口`user/v3/register`进行登录。  
 
**注:** FB登录方式有两种：
  
* 1.直接使用JSSDK中FB.login方法调起登录窗，    
* 2.跳到授权页，授权后返回code回来，调接口`https://graph.facebook.com/oauth/access_token`，获取accessToken，再通过接口`https://graph.facebook.com/me?access_token`接口获取fbId


    
## 绑定区服

接口:&nbsp;&nbsp;&nbsp;`user/v3/bindZone`  
这个看起来没有并什么用的接口，必须要让游戏调用后台才有数据，切记切记~

## 支付

支付sdk只进行获取支付方式和下单；
  
* 获取支付方式接口：`config/paymentConfig/v4.0`

* 下单接口：`order/create/v4.0`

**注：** `showMethod`决定页面展现方式


## 重点

### PC端FB登录方式

* 由于[PC端](http://docbogiangho.bilivfun.com/dbjh/index.html)游戏页面嵌套在iframe标签中
而授权页无法再iframe中打开，因此，使用第一种FB登录方式，即调用JSSDK的FB.Login登录方法；

* 由于微端（即在webview中），FB的JSSDK无法调起登录窗口，因此必须用第二种登录方式，跳转到授权页，授权回来再进行登录;




