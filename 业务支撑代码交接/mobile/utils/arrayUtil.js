/**
 * Created by linlin.zhang on 2016/11/21.
 */
module.exports = {
    grep:function(array,callback,handle){
        var result = [];
        if(result)
        array.forEach(function(item){
            if(callback(item))
                result.push(handle(item));
        });
        return result;
    },
    contain:function(array,callback){
        var result = false;
        array.forEach(function(item){
            if(callback(item)){
                result = true;
                return false;
            }
        });
        return result;
    },
    getFirst:function(array,callback){
        for(var i = 0;i<array.length;i++){
            if(callback(array[i])) return array[i];
        }
        return null;
    }
};