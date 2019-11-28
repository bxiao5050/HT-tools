/**
 * Created by weiqiang.yu on 2016/3/1.
 */
appServices.factory('$params', function(){
    var params = {};
    var service = {
        getParams: function(){
            return params;
        },
        setParams: function(paramName,paramValue){
            params[paramName] = paramValue;
        },
        query:function(){
            console.log("module is null!");
        }
    }
    return service;
});