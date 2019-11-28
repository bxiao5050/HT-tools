/**
 * Created by karl.zheng on 2018/3/14.
 */

export const server = {
    appId: 10116,
    // appId: 10085,
    appKey: "b586ea8260744d3bb045b488ed6658af",
    advChannel: 30001,
    fbId: 576748762692133,
    fbSecret: "4385e360eeef81c19c042918006372f5"
    // fbId: 1129581580473410,
    // fbSecret: "e8bf29f91a0c5404cb98f76d481a384c"
};

export const api = {
    //资源
    src: "//sdk-android-vndbjh.bilivfun.com/h5sdk/dbjh/",
    ip: "//sdk-android-vndbjh.bilivfun.com/pocketgames/client/",
    // src: "//sdk-test.changic.net.cn:8191/sdk-demo/",
    // ip: "//sdk-test.changic.net.cn:8191/pocketgames/client/",
    //登录
    login: "user/v3/login",
    //初始化SDK
    initSDK: "config/v3.1/initSDK",
    //注册
    register: "user/v3/register",
    //绑定区服
    bindZone: "user/v3/bindZone",
    //获取支付方式
    getPay: "config/paymentConfig/v4.0",
    //下单接口
    loadPay: "order/create/v4.0",
    //PC下单接口
    pcLoadPay: "//sdk-android-vndbjh.bilivfun.com/pocketgames/web/chargeForwardWeb",
    // pcLoadPay: "//sdk-test.changic.net.cn:8191/pocketgames/web/chargeForwardWeb",
    //修改密码
    changePass: "user/changePwd",
    //获取订单列表
    orderList: "order/getOrderList/",
    //登录后跳转地址
    redirect_uri: "http://res-vndbjh.bilivfun.com/index.html",
    // redirect_uri: "http://wl-hf-dev-vnxkh5.bilivfun.com/index.html",
    //直登页面
    direct_uri: "https://sdk-android-vndbjh.bilivfun.com/h5sdk/dbjh/direct.html",
    // direct_uri: "//sdk-test.changic.net.cn:8191/sdk-demo/direct.html",
    //登录页
    login_uri: "https://sdk-android-vndbjh.bilivfun.com/h5sdk/dbjh/index.html",
    // login_uri: "//sdk-test.changic.net.cn:8191/sdk-demo/index.html",
    //分享页
    share_uri: "http://docbogiangho.bilivfun.com/dbjh/index.html",
    //fb access token
    token_uri: "https://graph.facebook.com/oauth/access_token"
};

