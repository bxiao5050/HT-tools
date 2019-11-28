/**
 * Created by linlin.zhang on 2016/9/22.
 */
var arrayUtils = {
    grep:function(array,callback){
        var newArray = [];
        for(var i = 0;i< array.length;i++){
            if(callback(array[i],i)){
                newArray.push(array[i]);
            }
        }
        return newArray;
    },
    contain:function(array,value){
        for(var i = 0;i< array.length;i++) {
            if(array[i] == value) return true;
        }
        return false;
    },
    get:function(array,callback){
        for(var i = 0;i<array.length;i++){
            if(callback(array[i],i)) return array[i];
        }
        return null;
    },
    uniquePush:function(array1,array2){
        for(var i = 0;i<array2.length;i++)
        if(this.contain(array1,array2[i]) == false)
            array1.push(array2[i]);
    }
};
module.exports = arrayUtils;