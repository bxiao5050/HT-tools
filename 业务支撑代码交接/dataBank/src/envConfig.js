/**
 * Created by xiaoyi on 2015/12/1.
 * 环境配置（测试服、正式服在一个服务器，目前采用显示配置）
 */

module.exports = (function(){
    var _value = 'production'; // 正式环境
    //var _value = 'development'; // 测试环境
    return function(){ //返回的一个function能访问到_value，所以_value并不是global级别的变量，但是可以通过这个接口访问到
        return _value;
    };
})();//一个立即执行的匿名函数